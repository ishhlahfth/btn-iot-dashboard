<template>
  <help-modal v-model="bannerForm" permanent>
    <banner-form @close="bannerForm = false" @reload="getBanners(bannerPagination)" />
  </help-modal>

  <help-modal v-model="bannerDetail">
    <banner-detail @close="bannerDetail = false" />
  </help-modal>

  <help-modal v-model="deleteConfirmation">
    <confirmation
      title="Delete confirmation"
      message="This action cannot be undone. Are you sure you want to delete this banner permanently?"
      @close="deleteConfirmation = false"
      @cancel="deleteConfirmation = false"
      @confirm="deleteBanner"
    />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6 auto-rows-max">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Banner</p>
      <div class="grid grid-flow-col gap-4">
        <help-button
          v-if="!reorderMode"
          label="reorder"
          icon="reorder"
          disabled
          @click="reorderMode = true"
        />
        <template v-else>
          <help-button label="cancel" bg-color="flame" @click="reorderMode = false" />
          <help-button label="save" bg-color="mint" />
        </template>
        <help-button label="add" icon="plus" @click="addBanner" />
      </div>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="banners"
        :columns="columns"
        :loading="loading"
        :rows="banners"
        :pagination="bannerPagination"
        @onChangePagination="getBanners($event)"
        @sort="getBanners($event)"
      >
        <template v-slot:body="{ column, row }">
          <div v-if="column === 'banner'" class="grid grid-flow-col gap-2 auto-cols-max">
            <help-thumbnail :src="row.image_url" :height="row.image_url ? '100%' : 72" />
            <div class="flex flex-col justify-between">
              <div>
                <p class="font-semibold">{{ row.title }}</p>
                <a
                  :href="row.hyperlink"
                  target="blank"
                  class="cursor-pointer text-royal hover:underline"
                  >{{ row.hyperlink }}</a
                >
              </div>
              <div class="grid grid-flow-col auto-cols-max gap-2 ">
                <p>{{ row.startDate }}</p>
                <p>-</p>
                <p>{{ row.endDate }}</p>
              </div>
            </div>
          </div>
          <!-- <help-badge
            v-if="column === 'is_active'"
            :label="row.is_active ? 'Active' : 'Inactive'"
            :color="row.is_active ? 'positive' : 'negative'"
          /> -->
          <help-toggle
            v-if="column === 'is_active'"
            v-model="row.is_active"
            @change="toggleBanner($event, row)"
          />
          <div v-if="column === 'actions'" class="grid grid-flow-col gap-1 auto-cols-max">
            <help-button
              bg-color="royal"
              color="white"
              icon="edit"
              icon-only
              @click="editBanner(row)"
            />
            <help-button
              bg-color="flame"
              color="white"
              icon="trash"
              icon-only
              @click="openConfirmation(row.id)"
            />
          </div>
          <p
            v-if="column === 'detail'"
            class="text-royal font-medium cursor-pointer"
            @click="openBannerDetail(row.id)"
          >
            See Detail
          </p>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import BannerDetail from '@/components/modals/BannerDetail.vue';
import BannerForm from '@/components/modals/BannerForm.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
// import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import API from '../apis';

export default {
  name: 'Banner',
  components: {
    BannerDetail,
    BannerForm,
    Confirmation,
    // HelpBadge,
    HelpButton,
    HelpModal,
    HelpTable,
    HelpToggle,
    HelpThumbnail,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      columns: [
        { field: 'banner', label: 'name' },
        { field: 'is_active', label: 'status', align: 'center' },
        { field: 'detail', label: 'detail', align: 'center' },
        { field: 'actions', label: ' ', align: 'center' },
      ],
      banners: [],
      bannerPagination: {
        limit: 10,
        offset: 0,
      },
      loading: false,
      reorderMode: false,
      bannerDetail: false,
      bannerForm: false,
      deleteConfirmation: false,
    };
  },
  computed: {
    bannerId() {
      return this.$store.state.bannerId;
    },
  },
  methods: {
    async getBanners(pagination, withoutLoading = false) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;

      try {
        if (!withoutLoading) this.loading = true;
        const {
          data: { data },
        } = await API.get(`banners?bannerable=GLOBAL&offset=${offset}&limit=${limit}`);
        this.banners = data.map((el) => ({
          ...el,
          startDate: dayjs(el.start_date).format('ddd, D MMM YYYY'),
          endDate: el.end_date ? dayjs(el.end_date).format('ddd, D MMM YYYY') : 'Forever',
          image_url: '',
        }));
        for (let i = 0; i < data.length; i += 1) {
          const response = await this.$store.dispatch('loadImage', data[i].url);
          this.banners[i].image_url = response;
        }
        this.bannerPagination = {
          limit,
          offset,
        };
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    openBannerDetail(bannerId) {
      this.bannerDetail = true;
      this.$store.commit('SET_BANNER_ID', bannerId);
    },
    addBanner() {
      this.bannerForm = true;
      this.$store.commit('SET_FORM_TYPE', 'ADD');
    },
    editBanner(banner) {
      this.bannerForm = true;
      this.$store.commit('SET_BANNER', banner);
      this.$store.commit('SET_FORM_TYPE', 'EDIT');
    },
    openConfirmation(bannerId) {
      this.deleteConfirmation = true;
      this.$store.commit('SET_BANNER_ID', bannerId);
    },
    async toggleBanner(newValue, detail) {
      const payload = {
        start_date: detail.start_date,
        end_date: detail.end_date,
        title: detail.title,
        hyperlink: detail.hyperlink,
        is_active: newValue,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`banners/${detail.id}`, payload);

        const action = data.is_active ? 'enabled' : 'disabled';
        this.toast.success(`Successfully ${action} ${detail.title}`);
        this.getBanners(this.bannerPagination, true);
      } catch (error) {
        this.toast.error(error.message);
      }
    },
    async deleteBanner() {
      console.log(this.bannerId);
      // try {
      //   const {
      //     data: { data },
      //   } = await API.delete(`banners/${this.bannerId}`);

      //   console.log('🌛', data);
      // } catch (error) {
      //   this.toast.error(error.message);
      // }
    },
  },
  mounted() {
    this.getBanners(this.bannerPagination);
  },
};
</script>

<style></style>
