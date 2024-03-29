<template>
  <div
    class="grid gap-6 modal-lg overflow-auto px-1"
    :class="[screenWidth < 640 ? 'inner-modal-fixed' : 'inner-modal-auto']"
  >
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">
        {{ formType === 'EDIT' ? 'Edit a banner' : 'Add a new banner' }}
      </p>
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
            type="text"
            v-model="form.title"
            label="Title"
            placeholder="Give your banner a distinctive title"
          />
          <help-input
            type="text"
            v-model="form.hyperlink"
            label="Redirect URL"
            placeholder="http://www.redirect-here.wehelpyou.xyz"
          />
          <div class="grid gap-4" :class="{ 'md:grid-cols-2': !form.isPermanent }">
            <help-input
              type="text"
              v-model="form.startDate"
              mask="##-##-####"
              label="Starts at"
              placeholder="DD-MM-YYYY"
            />
            <help-input
              type="text"
              v-if="!form.isPermanent"
              v-model="form.endDate"
              mask="##-##-####"
              label="Ends at"
              placeholder="DD-MM-YYYY"
            />
          </div>
          <help-checkbox label="Won't expire" v-model:checked="form.isPermanent" />
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
        <help-button
          :label="formType === 'EDIT' ? 'save changes' : 'create'"
          :loading="loading"
          :loading-label="formType === 'EDIT' ? 'saving' : 'creating'"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { uuid } from 'uuidv4';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import Icon from '@/components/atoms/Icon.vue';
import store from '@/store';
import API from '../../apis';

dayjs.extend(customParseFormat);

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
        isActive: true,
      },
      loading: false,
      imageFile: null,
      S3BaseURL: process.env.VUE_APP_S3_BASE_URL,
      imageIsChanged: false,
    };
  },
  computed: {
    screenWidth() {
      return store.state.screenWidth;
    },
    formType() {
      return store.state.formType;
    },
    banner() {
      return store.state.banner;
    },
    s3() {
      return new S3Client({
        region: 'ap-southeast-1',
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: 'ap-southeast-1' }),
          identityPoolId: process.env.VUE_APP_ID_POOL_ID,
        }),
      });
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
        this.imageIsChanged = true;
      }
    },
    submit() {
      if (this.formType === 'EDIT') this.edit();
      if (this.formType === 'ADD') this.add();
    },
    async uploadS3(callback) {
      if (this.imageFile.file.size > 2000000) {
        this.toast.error('Oops, your image cannot be larger than 2MB');
      } else {
        this.loading = true; // somehow this doesn't work
        const S3Params = {
          Bucket: 'help-bns-bucket',
          Key: this.imageFile.fileName,
          Body: this.imageFile.file,
          ContentType: this.imageFile.file.type,
        };

        try {
          const S3Response = await this.s3.send(new PutObjectCommand(S3Params));
          if (S3Response) {
            callback(S3Response);
          }
        } catch (error) {
          this.toast.error(error.message);
        }
      }
    },
    add() {
      this.uploadS3(async (S3Response) => {
        const BNSParams = {
          bannerable: {
            type: 'GLOBAL',
          },
          group: 'OTHER',
          start_date: dayjs(this.form.startDate, 'DD-MM-YYYY').valueOf(),
          end_date: dayjs(this.form.endDate, 'DD-MM-YYYY').valueOf(),
          title: this.form.title,
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

        try {
          this.loading = true;
          const {
            data: { data },
          } = await API.post('banners', BNSParams);
          this.$emit('reload');
          this.$emit('close');
          this.toast.success(`${data.title} banner uploaded`);
        } catch (error) {
          this.toast.error(error.message);
        }
      });
      this.loading = false;
    },
    async edit() {
      const payload = {
        start_date: dayjs(this.form.startDate, 'DD-MM-YYYY').valueOf(),
        title: this.form.title,
        hyperlink: this.form.hyperlink,
        is_active: this.banner.is_active,
      };
      payload.end_date = this.form.isPermanent
        ? null
        : dayjs(this.form.endDate, 'DD-MM-YYYY').valueOf();

      if (this.imageIsChanged) {
        this.uploadS3(async (S3Response) => {
          payload.provider = {
            name: 'S3',
            config: {
              location: this.imageFile.url,
              etag: S3Response.ETag.slice(1, -1),
              bucket: 'help-bns-bucket',
              key: this.imageFile.fileName,
            },
          };
          this.patchBNS(payload);
        });
      } else {
        this.patchBNS(payload);
      }
    },
    async patchBNS(payload) {
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.patch(`banners/${this.banner.id}`, payload);
        this.$emit('reload');
        this.$emit('close');
        this.toast.success(`${data.title} has been edited`);
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
    },
  },
  mounted() {
    if (this.formType === 'EDIT') {
      this.form.title = this.banner.title;
      this.form.hyperlink = this.banner.hyperlink;
      this.form.startDate = dayjs(this.banner.start_date).format('DD-MM-YYYY');
      this.form.endDate = dayjs(this.banner.end_date).format('DD-MM-YYYY');
      this.form.src = this.banner.image_url;
      if (!this.banner.end_date) this.form.isPermanent = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.template-rows-auto-1fr-auto {
  grid-template-rows: auto 1fr auto;
}
</style>
