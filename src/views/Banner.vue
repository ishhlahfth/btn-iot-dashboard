<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Banner</p>
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
            <div>
              <p>{{ row.start_date }}</p>
              <p>{{ row.end_date }}</p>
            </div>
          </div>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';

export default {
  name: 'Banner',
  components: {
    HelpTable,
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
        { field: 'status', label: 'status' },
      ],
      banners: [],
      bannerPagination: {
        limit: 10,
        offset: 0,
        // sort: 'id',
        // order: 'asc',
      },
      loading: false,
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
        } = await API.get(
          `banners?bannerable=GLOBAL&offset=${offset}&limit=${limit}`,
        );
        this.banners = data.map((el) => ({
          ...el,
          image_url: '',
        }));
        for (let i = 0; i < data.length; i += 1) {
          console.log(data[i].url);
          const response = await this.$store.dispatch('loadImage', data[i].url);
          this.banners[i].image_url = response;
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
  },
  mounted() {
    this.getBanners(this.bannerPagination);
  },
};
</script>

<style></style>
