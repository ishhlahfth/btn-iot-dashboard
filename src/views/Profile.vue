<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full grid sm:grid-flow-col gap-4">
      <div class="w-full justify-between">
        <p class="text-heading2 font-semibold">User Profile</p>
      </div>
    </div>
    <div class="w-full grid sm:grid gap-4 bg-white p-5 my-1 rounded-lg">
      <div>
        <div class="flex justify-center p-5">
          <div>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              ref="bannerImageInput"
              @input="handleChangeImg"
            />
            <help-avatar :size="128" :placeholder="form.name" :src="this.form.photo" />
          </div>
        </div>
        <form class="grid gap-4" @submit.prevent="submit">
          <div class="grid auto-rows-max gap-2">
            <help-input label="Name" type="text" placeholder="User's name" v-model="form.name" />
            <p class="text-xsmall text-flame font-medium" v-if="!form.name">
          Your name is required
        </p>
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
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
              label="Address"
              type="text"
              placeholder="User's Address"
              v-model="form.address"
            />
          </div>
          <div class="grid auto-rows-max gap-2">
            <help-input
              label="Phone Number"
              type="text"
              placeholder="User's Phone Number"
              v-model="form.phone_number"
            />
          </div>
          <div class="grid auto-rows-max gap-2">
            <!-- <help-input
              label="Date Of Birth"
              type="text"
              placeholder="User's Date Of Birth"
              v-model="form.date_of_birth"
            /> -->
             <label class="font-medium">Date of Birth</label>
            <flat-pickr
            v-model="form.date_of_birth"
            :config="config"
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
      current_user_id: '',
      form: {
        name: '',
        email: '',
        phone_number: '',
        address: '',
        role_id: '',
        photo: '',
        password: '',
        date_of_birth: '',
      },
      src: '',
      currentPhoto: '',
      currentUser: {},
      visiblePassword: false,
      visiblePasswordRe: false,
    };
  },
  components: {
    HelpButton,
    HelpInput,
    HelpAvatar,
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
      console.log(this.form);
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
        console.log(dataToSend, 'data to send');
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
        console.log(dataToSend, 'data to send');
      }
      try {
        // const {
        //   data: { data },
        // } =
        await API.patch(`/employees/${this.$store.state.currentUser.id}`, dataToSend);
        this.toast.success('Success updating profile !');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
  },
  mounted() {
    this.getProfileData(this.$store.state.currentUser.id);
  },
};
</script>
