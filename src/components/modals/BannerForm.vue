<template>
  <div
    class="grid gap-6 modal-lg overflow-auto"
    :class="[screenWidth < 640 ? 'inner-modal-fixed' : 'inner-modal-auto']"
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
            v-model="form.title"
            label="Title"
            placeholder="Give your banner a distinctive title"
          />
          <help-input
            v-model="form.hyperlink"
            label="Link to article"
            placeholder="http://www.redirect-here.wehelpyou.xyz"
          />
          <div class="grid md:grid-cols-2 gap-4">
            <help-input v-model="form.startDate" label="Starts at" placeholder="##-##-##" />
            <help-input v-model="form.endDate" label="Ends at" placeholder="##-##-##" />
          </div>
          <help-checkbox label="Won't expire" v-model="form.isPermanent" />
        </div>

        <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
          <p class="font-medium mb-1">Banner image</p>
          <help-thumbnail
            class="mb-1"
            width="100%"
            :src="form.src"
            :height="screenWidth < 640 && !form.src ? 128 : ''"
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
          <div v-if="form.src" class="grid grid-flow-col auto-cols-max gap-2 justify-end">
            <span
              class="text-royal cursor-pointer font-medium"
              @click="$refs.bannerImageInput.click()"
            >
              Edit
            </span>
            <span class="text-flame cursor-pointer font-medium" @click="form.src = ''">Remove</span>
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
        <help-button label="save" :loading="loading" loading-label="uploading" />
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
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { uuid } from 'uuidv4';
import dayjs from 'dayjs';
import API from '@/apis';

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
      form: {
        title: '',
        hyperlink: '',
        startDate: '',
        endDate: '',
        isPermanent: false,
        src: '',
      },
      loading: false,
      imageFile: null,
      S3BaseURL: 'https://help-bns-bucket.s3-ap-southeast-1.amazonaws.com',
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    s3() {
      return new S3Client({
        region: 'ap-southeast-1',
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: 'ap-southeast-1' }),
          identityPoolId: 'ap-southeast-1:b5e549ab-effd-404c-823e-d32df1c8f64e',
        }),
      });
    },
  },
  watch: {
    startDate(newValue) {
      console.log('# # # # #');
      console.log(dayjs(newValue).valueOf());
    },
  },
  methods: {
    handleChangeImg(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const fileName = `${uuid()}.${e.target.files[0].type.split('/')[1]}`;
        const url = `${this.S3BaseURL}/${fileName}`;
        this.form.src = URL.createObjectURL(file);
        this.imageFile = { file, fileName, url };
        console.log('🏓');
        console.log(this.imageFile);
      }
    },
    async submit() {
      const S3Params = {
        Bucket: 'help-bns-bucket',
        Key: this.imageFile.fileName,
        Body: this.imageFile.file,
        ContentType: this.imageFile.file.type,
      };
      console.log(S3Params);
      try {
        this.loading = true;
        const S3Response = await this.s3.send(new PutObjectCommand(S3Params));
        console.log('-----');
        console.log(S3Response);
        if (S3Response) {
          const BNSParams = {
            bannerable: {
              type: 'GLOBAL',
            },
            group: 'OTHER',
            start_date: dayjs(this.form.startDate).valueOf(),
            end_date: dayjs(this.form.endDate).valueOf(),
            title: this.form.title,
            sort_no: 12, // to be deleted
            hyperlink: this.form.hyperlink,
            provider: {
              name: 'S3',
              config: {
                location: this.imageFile.url,
                etag: S3Response.ETag.slice(1, -1),
                bucket: 'help-bns-bucket',
                key: this.imageFile.fileName,
              },
            },
          };

          console.log('BNSParams - - - -');
          console.log(BNSParams);
          try {
            const {
              data: { data },
            } = await API.post('banners', BNSParams);
            console.log('BNS RESPONSE', data);
            this.$emit('reload');
            this.$emit('close');
            this.toast.success(`${data.title} banner uploaded`);
          } catch (error) {
            this.toast.error(error.message);
          }
        }
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.template-rows-auto-1fr-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
