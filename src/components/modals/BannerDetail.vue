<template>
  <div
    class="grid gap-6 modal-lg inner-modal-auto overflow-auto"
    :class="[{ 'animate-pulse': loading }]"
  >
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Banner detail</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>

    <div class="grid gap-2 md:gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
      <div class="md:col-span-5 grid gap-2 md:gap-8 font-medium">
        <div class="grid gap-1">
          <p class="text-grey-2">Title</p>
          <p>{{ banner.title }}</p>
        </div>

        <div class="grid gap-1">
          <p class="text-grey-2">Redirect URL</p>
          <a
            :href="banner.hyperlink"
            target="blank"
            class="text-royal cursor-pointer hover:underline"
            >{{ banner.hyperlink }}</a
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-1">
            <p class="text-grey-2">Starts at</p>
            <p>{{ banner.start_date }}</p>
          </div>
          <div class="grid gap-1">
            <p class="text-grey-2">Ends at</p>
            <p>{{ banner.end_date }}</p>
          </div>
        </div>
      </div>

      <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
        <p class="font-medium mb-1 text-grey-2">Banner image</p>
        <help-thumbnail
          class="mb-1"
          width="100%"
          :src="banner.image_url"
          :height="screenWidth < 640 && !banner.image_url ? 128 : ''"
        >
          <div class="grid gap-2 place-items-center text-grey-2 p-4">
            <icon name="photograph" :size="6" />
            <p class="font-medium text-center">
              No image
            </p>
          </div>
        </help-thumbnail>
      </div>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import Icon from '@/components/atoms/Icon.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';
import dayjs from 'dayjs';

export default {
  name: 'BannerDetail',
  components: {
    HelpButton,
    HelpThumbnail,
    Icon,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      banner: {},
      loading: false,
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    bannerId() {
      return this.$store.state.bannerId;
    },
  },
  methods: {
    async getBanner() {
      try {
        const {
          data: { data },
        } = await API.get(`banners/${this.bannerId}`);

        if (data) {
          this.banner = {
            ...data,
            start_date: dayjs(data.start_date).format('ddd, D MMM YYYY'),
            end_date: dayjs(data.end_date).format('ddd, D MMM YYYY'),
          };
          const response = await this.$store.dispatch('loadImage', data.url);
          this.banner.image_url = response;
          console.log('IMG', response);
        }
      } catch (error) {
        this.toast.error(error.message);
      }
    },
  },
  mounted() {
    this.getBanner();
  },
};
</script>

<style lang="scss" scoped>
.template-rows-auto-1fr-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
