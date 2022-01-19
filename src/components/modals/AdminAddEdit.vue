<template>
  <help-modal v-model="modal.deletePhoto" permanent>
    <confirmation
      :title="`Delete Confirmation`"
      :message="`This action cannot be undone, and the picture will permanently deleted, are you sure want to delete ?`"
      @close="modal.deletePhoto = false"
      @cancel="modal.deletePhoto = false"
      @confirm="deletePhoto"
      :confirmLoading="loadingDelete"
      labelOk="Delete"
      labelCancel="Cancel"
    />
  </help-modal>
  <div class="modal-md inner-modal-fixed overflow-auto grid gap-6 p-1">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">
        {{ adminType === 'edit' ? 'Edit a new admin' : 'Add a new admin' }}
      </p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form class="grid gap-4" @submit.prevent="submit">
      <div class="grid auto-rows-max gap-2">
        <help-input label="Name" type="text" placeholder="Input admin's name" v-model="form.name" />
        <p class="text-xsmall text-flame font-medium" v-if="!form.name">
          Your name is required
        </p>
      </div>
      <div class="grid auto-rows-max gap-2">
        <help-input
          label="Email"
          type="email"
          placeholder="Input admin's email"
          v-model="form.email"
        />
        <p class="text-xsmall text-flame font-medium" v-if="!form.email">
          Your email is required
        </p>
      </div>
      <div class="grid auto-rows-max gap-2" v-if="adminType === 'add'">
        <help-input
          v-model="form.password"
          label="Password"
          :type="visiblePassword ? 'text' : 'password'"
          placeholder="Input admin's password"
        >
          <help-button
            type="button"
            icon-only
            :icon="visiblePassword ? 'eye-off' : 'eye'"
            bg-color="transparent"
            color="grey-3"
            @click="visiblePassword = !visiblePassword"
          />
        </help-input>
        <p class="text-xsmall text-flame font-medium" v-if="!form.password">
          Your password is required
        </p>
      </div>
      <div class="grid auto-rows-max gap-2">
        <help-input
          label="Phone Number"
          type="number"
          placeholder="Input admin's phone number"
          v-model="form.phone_number"
        />
        <p class="text-xsmall text-flame font-medium" v-if="!form.phone_number">
          Your phone number is required
        </p>
      </div>
      <div class="grid auto-rows-max gap-2">
        <help-input
          label="Address"
          type="textarea"
          placeholder="Input admin's address"
          v-model="form.address"
        />
        <p class="text-xsmall text-flame font-medium" v-if="!form.address">
          Your address is required
        </p>
      </div>
      <div class="grid auto-rows-max gap-2">
        <div>
          <label class="font-medium">Date of Birth</label>
          <flat-pickr
            v-model="form.date_of_birth"
            :config="config"
            class="form-control my-1 rounded-md w-full p-2.5 border text-md cursor-pointer"
            placeholder="Select Date.."
            name="dateBirth"
          />
        </div>
        <p class="text-xsmall text-flame font-medium" v-if="!form.date_of_birth">role
          Your date birth is required
        </p>
      </div>
      <div>
        <input
          type="file"
          accept="image/*"
          class="hidden"
          ref="bannerImageInput"
          @input="handleChangeImg"
        />
        <help-input
          v-if="adminType === 'add'"
          label="Profile Picture"
          type="file"
          placeholder="Input admin's picture"
          v-model="form.photo"
        />
        <div v-else>
          <label class="font-medium">Profile Picture</label>
          <help-thumbnail class="my-1" width="100%" height="100%" :src="src" />
          <div
            v-if="adminType === 'edit'"
            class="grid grid-flow-col auto-cols-max gap-2 justify-end"
          >
            <span
              class="text-royal cursor-pointer font-medium"
              @click="$refs.bannerImageInput.click()"
            >
              Edit
            </span>
            <span v-if="adminType !== 'edit'" class="text-flame cursor-pointer font-medium" @click="src = ''">Remove</span>
            <span v-if="adminType === 'edit'" class="text-flame cursor-pointer font-medium" @click="modal.deletePhoto = true">Remove</span>
          </div>
        </div>
      </div>
      <div class="grid auto-rows-max gap-2">
        <help-select
          v-model="selectedStatus"
          label="Role"
          :options="roles"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
        <p class="text-xsmall text-flame font-medium" v-if="!selectedStatus">
          Your role is required
        </p>
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end py-2">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button
          :label="adminType === 'edit' ? 'save changes' : 'add'"
          :loading="loading"
          :loading-label="adminType === 'edit' ? 'saving' : 'adding'"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { uuid } from 'uuidv4';
import { useToast } from 'vue-toastification';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import HelpModal from '@/components/templates/Modal.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import API from '../../apis';

export default {
  name: 'AdminAddEdit',
  props: {
    adminType: {
      type: String,
      default: 'add',
    },
    roles: {
      type: Array,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loading: false,
      selectedStatus: { value: '', label: 'Select Admin Role' },
      S3BaseURL: process.env.VUE_APP_S3_BASE_URL,
      imageFile: null,
      hyperlink: '',
      src: '',
      imageIsChanged: false,
      form: {
        name: '',
        email: '',
        phone_number: '',
        address: '',
        role_id: '',
        photo: {},
        password: '',
        date_of_birth: '',
      },
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        // altFormat: 'y M D',
        // altInput: true,
        // dateFormat: 'y-m-d h:m:s',
        // locale: 'ID', // locale for this instance only,
        enableTime: false,
        enableSeconds: false,
        disableMobile: 'true',
      },
      visiblePassword: false,
      modal: {
        deletePhoto: false,
      },
      loadingDelete: false,
      bannerID: null,
    };
  },
  components: {
    HelpInput,
    HelpButton,
    HelpSelect,
    HelpModal,
    HelpThumbnail,
    Confirmation,
  },

  methods: {
    handleChangeImg(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const fileName = `${uuid()}.${e.target.files[0].type.split('/')[1]}`;
        const url = `${this.S3BaseURL}/${fileName}`;
        this.src = URL.createObjectURL(file);
        this.imageFile = { file, fileName, url };
        this.imageIsChanged = true;
      }
    },
    async deletePhoto() {
      this.loadingDelete = true;
      try {
        await API.delete(`banners/${this.bannerID}`);
        this.toast.success('Product images successfully deleted !');
        this.bannerID = null;
      } catch (error) {
        this.toast.error(error.response?.data?.meta?.message);
      }
      this.src = '';
      this.modal.deletePhoto = false;
      this.loadingDelete = false;
    },
    async submit() {
      // if(!this.form.name)
      if (this.form.photo.length) {
        const file = this.form.photo[0];
        const fileName = `${uuid()}.${this.form.photo[0].type.split('/')[1]}`;
        const url = `${this.S3BaseURL}/${fileName}`;
        this.hyperlink = url;
        this.imageFile = { file, fileName, url };
      }
      if (this.adminType === 'edit') {
        this.form.role_id = this.selectedStatus.value || this.form.role_id;
        const dataToSend = {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          role_id: this.form.role_id,
          is_active: 'TRUE',
          phone_number: this.form.phone_number,
          date_of_birth: this.form.date_of_birth,
        };
        try {
          const {
            data: { data },
          } = await API.patch(`/employees/${this.$store.state.adminDetail.id}`, dataToSend);
          if (this.bannerID) {
            this.handleEditAdmin(data.id);
          } else {
            this.handleAddAdmin(data.id, `${this.form.name}'s profile has been successfully edited !`);
          }
        } catch (error) {
          if (error.response?.data?.meta) {
            this.toast.error(error.response.data.meta.message);
          } else {
            this.toast.error(error.message);
          }
        }
      } else {
        this.form.role_id = this.selectedStatus.value;
        const dataToSend = {
          ...this.form,
          group: 'INTERNAL_DASHBOARD',
          is_active: 'TRUE',
        };
        const {
          data: { data },
        } = await API.post('/employees', dataToSend);
        this.handleAddAdmin(data.id, 'success create admin');
      }
    },
    async uploadS3(callback) {
      if (this.imageFile.file.size > 2000000) {
        this.toast.error('Oops, your image cannot be larger than 2MB');
      } else {
        this.loading = true;
        const S3Params = {
          Bucket: 'help-bns-bucket',
          Key: this.imageFile.fileName,
          Body: this.imageFile.file,
          ContentType: this.imageFile.type,
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
    handleAddAdmin(id, successMessage) {
      this.uploadS3(async (S3Response) => {
        const BNSParams = {
          title: this.form.name,
          hyperlink: this.hyperlink,
          bannerable: {
            id,
            type: 'EMPLOYEE',
          },
          group: 'COVER',
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
          await API.post('/banners', BNSParams);
          this.$emit('reload');
          this.$emit('close');
          this.toast.success(successMessage);
        } catch (error) {
          this.toast.error(error.message);
        }
      });
      this.loading = false;
    },
    handleEditAdmin(id) {
      const payload = {
        title: this.form.name,
        hyperlink: this.hyperlink,
        bannerable: {
          id,
          type: 'EMPLOYEE',
        },
        group: 'COVER',
      };
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
        await API.patch(`banners/${this.bannerID}`, payload);
        this.$emit('reload');
        this.$emit('close');
        this.toast.success(`${this.form.name}'s profile has been successfully edited !`);
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
    },
  },
  mounted() {
    if (this.adminType === 'edit') {
      this.bannerID = this.$store.state.adminDetail.banner.id;
      this.form.name = this.$store.state.adminDetail.name || '';
      this.form.email = this.$store.state.adminDetail.email || '';
      this.form.phone_number = this.$store.state.adminDetail.phone_number || '';
      this.form.address = this.$store.state.adminDetail.address || '';
      this.form.role_id = this.$store.state.adminDetail.role_id || '';
      this.selectedStatus.label = this.$store.state.adminDetail.role || '';
      this.form.date_of_birth = this.$store.state.adminDetail.profile.date_of_birth || null;
      this.src = this.$store.state.adminDetail.banner
        ? this.$store.state.adminDetail.banner.location
        : '';
    }
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
          identityPoolId: process.env.VUE_APP_ID_POOL_ID,
        }),
      });
    },
  },
};
</script>

<style></style>
