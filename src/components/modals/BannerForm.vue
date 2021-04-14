<template>
  <div
    class="grid gap-6 inner-modal-auto modal-lg overflow-auto"
    :class="{ 'animate-pulse': loading }"
  >
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Add a new banner</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>

    <div class="grid gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
      <div class="md:col-span-5 grid gap-2">
        <help-input label="Title" placeholder="Give your banner a distinctive title" />
        <help-input label="Link to article" placeholder="http://www.redirect-here.wehelpyou.xyz" />
        <div class="grid md:grid-cols-2 gap-4">
          <help-input label="Starts at" placeholder="##-##-##" />
          <help-input label="Ends at" placeholder="##-##-##" />
        </div>
      </div>

      <div class="md:col-span-7">
        <p class="font-medium mb-1">Banner image</p>
        <help-thumbnail src="" width="100%" :height="screenWidth < 640 ? 128 : !src ? '100%' : ''">
          <help-button label="upload" class="mt-2" />
        </help-thumbnail>
      </div>
    </div>

    <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
      <help-button
        type="button"
        label="cancel"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
      <help-button label="save" />
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';

export default {
  name: 'BannerForm',
  components: {
    HelpButton,
    HelpInput,
    HelpThumbnail,
  },
  data() {
    return {
      loading: false,
      src: '',
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
};
</script>

<style></style>
