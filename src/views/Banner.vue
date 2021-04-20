<template>
  <help-modal v-model="bannerForm">
    <banner-form @close="bannerForm = false" @reload="getBanners(bannerPagination)" />
  </help-modal>

  <help-modal v-model="bannerDetail">
    <banner-detail @close="bannerDetail = false" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6 auto-rows-max">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Banner</p>
      <div class="grid grid-flow-col gap-4">
        <help-button
          v-if="!reorderMode"
          label="reorder"
          icon="reorder"
          @click="reorderMode = true"
        />
        <template v-else>
          <help-button label="cancel" bg-color="flame" @click="reorderMode = false" />
          <help-button label="save" bg-color="mint" />
        </template>
        <help-button label="add" icon="plus" @click="bannerForm = true" />
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
                <a href="#" class=" text-royal">{{ row.hyperlink }}</a>
              </div>
              <div class="grid grid-flow-col auto-cols-max gap-2 ">
                <p>{{ row.start_date }}</p>
                <p>-</p>
                <p>{{ row.end_date }}</p>
              </div>
            </div>
          </div>
          <help-toggle v-if="column === 'is_active'" />
          <div v-if="column === 'actions'" class="grid grid-flow-col gap-1 auto-cols-max">
            <help-button bg-color="royal" color="white" icon="edit" icon-only />
            <help-button bg-color="flame" color="white" icon="trash" icon-only />
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
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';
import dayjs from 'dayjs';

export default {
  name: 'Banner',
  components: {
    BannerDetail,
    BannerForm,
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
        // sort: 'id',
        // order: 'asc',
      },
      loading: false,
      reorderMode: false,
      bannerDetail: false,
      bannerForm: false,
    };
  },
  methods: {
    async getBanners(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      // const sort = pagination.sort || 'name';
      // const order = pagination.order || 'asc';

      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(`banners?bannerable=GLOBAL&offset=${offset}&limit=${limit}`);
        this.banners = data.map((el) => ({
          ...el,
          start_date: dayjs(el.start_date).format('ddd, D MMM YYYY'),
          end_date: dayjs(el.end_date).format('ddd, D MMM YYYY'),
          image_url: '',
        }));
        for (let i = 0; i < data.length; i += 1) {
          console.log(data[i].url);
          const response = await this.$store.dispatch('loadImage', data[i].url);
          this.banners[i].image_url = response;
          // this.banners[i].image_url = 'https://help-bns-bucket.s3-ap-southeast-1.amazonaws.com/Banner--03.png';
          console.log('IMG', response);
        }
        this.bannerPagination = {
          limit,
          offset,
        };
        console.log('🔰 BANNERS', data);
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
  },
  mounted() {
    this.getBanners(this.bannerPagination);
  },
};
</script>

<style></style>
