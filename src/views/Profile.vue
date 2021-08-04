<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full grid sm:grid-flow-col gap-4">
      <div class="w-full justify-between">
        <p class="text-heading2 font-semibold">User Profile</p>
      </div>
    </div>
    <div class="w-full grid sm:grid gap-4 bg-white p-5 my-1 rounded-lg">
      <div>
        <div class="flex items-center justify-center p-5">
          <div @mouseover="editPhoto = true" @mouseleave="editPhoto = false">
            <input
              type="file"
              accept="image/*"
              class="hidden"
              ref="bannerImageInput"
              @input="handleChangeImg"
            />
            <help-avatar
              :size="132"
              :placeholder="form.name"
              :src="src"
              class="hover:opacity-70 relative"
            >
              <icon
                @click="$refs.bannerImageInput.click()"
                v-if="editPhoto"
                name="camera-outline"
                class="absolute text-midnight cursor-pointer"
                :size="8"
              />
            </help-avatar>
          </div>
        </div>
        <form class="grid gap-4" @submit.prevent="submit">
          <div class="grid auto-rows-max gap-2">
            <help-input
              :disabled="true"
              label="Name"
              type="text"
              placeholder="User's name"
              v-model="form.name"
            />
            <p class="text-xsmall text-flame font-medium" v-if="!form.name">
              Your name is required
            </p>
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
              :disabled="true"
              label="Email"
              type="text"
              placeholder="User's Email Address"
              v-model="form.email"
            />
            <p class="text-xsmall text-flame font-medium" v-if="!form.email">
              Your email is required
            </p>
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
              :disabled="true"
              label="Address"
              type="text"
              placeholder="User's Address"
              v-model="form.address"
            />
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
              :disabled="true"
              label="Phone Number"
              type="text"
              placeholder="User's Phone Number"
              v-model="form.phone_number"
            />
          </div>
          <div class="grid auto-rows-max gap-2">
            <label class="font-medium">Date of Birth</label>
            <flat-pickr
              v-model="form.date_of_birth"
              class="form-control my-1 rounded-md w-full p-2.5 border text-md cursor-pointer"
              placeholder="Select Date.."
              name="dateBirth"
            />
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
              label="Change Password"
              :type="visiblePassword ? 'text' : 'password'"
              placeholder="Password"
              v-model="form.password"
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
              Only fill if you want to change your password
            </p>
          </div>
          <div class="grid grid-flow-col gap-2 auto-cols-max justify-center py-2">
            <help-button label="Save" :loading="loading" :loading-label="'Saving'" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { uuid } from 'uuidv4';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import Icon from '@/components/atoms/Icon.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';
import mixin from '@/mixin';

export default {
  name: 'Profile',
  mixins: [mixin],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      editPhoto: false,
      loading: false,
      current_user_id: '',
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
      src: '',
      S3BaseURL: process.env.VUE_APP_S3_BASE_URL,
      imageFile: null,
      hyperlink: '',
      currentPhoto: '',
      currentUser: {},
      visiblePassword: false,
      visiblePasswordRe: false,
      bannerId: 0,
    };
  },
  components: {
    HelpButton,
    HelpInput,
    HelpAvatar,
    Icon,
  },
  computed: {
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
    async getProfileData(id) {
      try {
        const {
          data: { data },
        } = await API.get(`/employees/${id}`);
        if (data.profile) {
          this.form.name = data.profile.name;
          this.form.email = data.profile.email;
          this.form.address = data.profile.address;
          this.form.date_of_birth = data.profile.date_of_birth;
          this.form.phone_number = data.profile.phone_number;
          this.form.role_id = data.role_id;
          this.form.photo = data.banner.location;
          this.src = data.banner.location;
          this.bannerId = data.banner.id;
        }
        if (data.banner?.location) {
          this.form.photo = data.banner.location;
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async submit() {
      let dataToSend = {};
      if (this.form.password) {
        dataToSend = {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          role_id: this.form.role_id,
          is_active: 'TRUE',
          phone_number: this.form.phone_number,
          date_of_birth: this.form.date_of_birth,
          password: this.form.password,
        };
      } else {
        dataToSend = {
          name: this.form.name,
          address: this.form.address,
          email: this.form.email,
          role_id: this.form.role_id,
          is_active: 'TRUE',
          phone_number: this.form.phone_number,
          date_of_birth: this.form.date_of_birth,
        };
      }
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.patch(`/employees/${this.$store.state.currentUser.id}`, dataToSend);
        this.handleEditAdmin(data.id);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
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
    async patchBNS(payload) {
      try {
        const {
          data: { data },
        } = await API.patch(`banners/${this.bannerId}`, payload);
        console.log(data, 'result banner');
        this.$store.commit('SET_IMAGE_PROFILE', data.image_url);
        this.toast.success(`${this.form.name}'s profile has been successfully edited !`);
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
      this.form.password = '';
    },
  },
  mounted() {
    this.getProfileData(this.$store.state.currentUser.id);
  },
};
</script>
