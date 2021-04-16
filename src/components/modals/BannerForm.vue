<template>
  <div
    class="grid gap-6 modal-lg overflow-auto"
    :class="[
      { 'animate-pulse': loading },
      screenWidth < 640 ? 'inner-modal-fixed' : 'inner-modal-auto',
    ]"
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

    <form @submit.prevent="submit">
      <div class="grid gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
        <div class="md:col-span-5 grid gap-2">
          <input
            type="file"
            accept="image/*"
            class="hidden"
            ref="bannerImageInput"
            @input="handleChangeImg"
          />
          <help-input
            v-model="title"
            label="Title"
            placeholder="Give your banner a distinctive title"
          />
          <help-input
            v-model="articleURL"
            label="Link to article"
            placeholder="http://www.redirect-here.wehelpyou.xyz"
          />
          <div class="grid md:grid-cols-2 gap-4">
            <help-input v-model="startDate" label="Starts at" placeholder="##-##-##" />
            <help-input v-model="endDate" label="Ends at" placeholder="##-##-##" />
          </div>
          <help-checkbox label="Won't expire" v-model="isPermanent" />
        </div>

        <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
          <p class="font-medium mb-1">Banner image</p>
          <help-thumbnail
            class="mb-1"
            width="100%"
            :src="src"
            :height="screenWidth < 640 && !src ? 128 : ''"
          >
            <div class="grid gap-2 place-items-center text-grey-2 p-4">
              <icon v-if="screenWidth >= 640" name="photograph" :size="6" />
              <p class="font-medium text-center">
                No image selected. You can upload an image up to 2MB.
              </p>
              <help-button
                type="button"
                label="upload"
                class="mt-2"
                @click="$refs.bannerImageInput.click()"
              />
            </div>
          </help-thumbnail>
          <div v-if="src" class="grid grid-flow-col auto-cols-max gap-2 justify-end">
            <span
              class="text-royal cursor-pointer font-medium"
              @click="$refs.bannerImageInput.click()"
            >
              Edit
            </span>
            <span class="text-flame cursor-pointer font-medium" @click="src = ''">Remove</span>
          </div>
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
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import Icon from '@/components/atoms/Icon.vue';
import { useToast } from 'vue-toastification';

export default {
  name: 'BannerForm',
  components: {
    HelpButton,
    HelpCheckbox,
    HelpInput,
    HelpThumbnail,
    Icon,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      title: '',
      articleURL: '',
      startDate: '',
      endDate: '',
      isPermanent: false,
      loading: false,
      src: '',
      imageFile: null,
      config: {
        bucketName: 'wehelpyou-content',
        dirName: 'banners',
        region: 'ap-southeast-1',
        accessKeyId: '',
        secretAccessKey: '',
        s3Url: 'https://wehelpyou-content.s3-ap-southeast-1.amazonaws.com',
      },
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    handleChangeImg(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const fileName = e.target.files[0].name.split('.')[0].replace(/\s+/g, '');
        const url = `${this.config.s3Url}/${this.config.dirName}/${fileName}`;
        this.src = URL.createObjectURL(file);
        this.imageFile = { file, fileName, url };
      }
    },
    submit() {
      this.toast.success('Dummy success response');
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.template-rows-auto-1fr-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
