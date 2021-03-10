<template>
  <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Header</p>
      <help-button icon-only icon="close" bg-color="transparent" color="grey-1" @click="$emit('close')" />
    </div>
    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Seller</p>
        <p>Ketoprak Mbak Yati Gienis Soole</p>
      </div>
      <div>
        <p class="text-grey-2">Verification Status</p>
        <p>Pending</p>
      </div>
      <div>
        <p class="text-grey-2">ID No. (KTP)</p>
        <p>3510242312960004</p>
      </div>
      <div>
        <p class="text-grey-2">Cause of Failure</p>
        <p>Gambar KTP buram</p>
      </div>
      <div class="col-span-2">
        <p class="text-grey-2">ID Card</p>
        <help-thumbnail width="100%" :height="store.state.screenWidth < 640 ? 196 : 248" />
      </div>
    </div>
    <div class="flex flex-col sm:flex-row-reverse">
      <help-button label="verify" class="mb-2 sm:mb-0" />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';

export default {
  name: 'SellerVerification',
  components: {
    HelpButton,
    HelpThumbnail,
  },
  setup() {
    const store = inject('store');
    return { store };
  },
};
</script>

<style></style>
