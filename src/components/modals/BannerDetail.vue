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
          <p>Lorem, ipsum dolor</p>
        </div>

        <div class="grid gap-1">
          <p class="text-grey-2">Link to article</p>
          <p class="text-royal">https://www.something-something.co/</p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-1">
            <p class="text-grey-2">Starts at</p>
            <p>01-01-2021</p>
          </div>
          <div class="grid gap-1">
            <p class="text-grey-2">Ends at</p>
            <p>31-01-2021</p>
          </div>
        </div>
      </div>

      <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
        <p class="font-medium mb-1 text-grey-2">Banner image</p>
        <help-thumbnail
          class="mb-1"
          width="100%"
          :src="src"
          :height="screenWidth < 640 && !src ? 128 : ''"
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

export default {
  name: 'BannerDetail',
  components: {
    HelpButton,
    HelpThumbnail,
    Icon,
  },
  data() {
    return {
      src: 'https://help-bns-bucket.s3-ap-southeast-1.amazonaws.com/Banner--03.png',
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.template-rows-auto-1fr-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
