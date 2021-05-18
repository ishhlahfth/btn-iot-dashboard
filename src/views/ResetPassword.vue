<template>
  <div class="w-full sm:min-w-min p-8 sm:p-24 sm:pb-10 sm:mb-5 bg-snow absolute top-12">
    <div class="flex flex-col items-center mb-16">
      <!-- <img alt="logo" src="../assets/red-no-label.png" style="width: 83px;" /> -->
      <h5 class="m-0 font-semibold text-gray-600 text-center text-heading3 sm:text-3xl">
        Create new password
      </h5>
    </div>

    <div class="w-full flex justify-center">
      <form
        @submit.prevent="resetPassword"
        class="bg-snow w-full sm:w-96 md:w-98 grid grid-flow-row auto-rows-max gap-6 sm:p-7 sm:shadow-lg sm:rounded-lg"
      >
        <div class="grid auto-rows-max gap-2">
          <help-input
            type="password"
            label="Password"
            placeholder="create new password"
            v-model="password"
          />
          <p class="text-xsmall text-flame font-medium" v-if="invalid">
            Your password is required
          </p>
        </div>
        <div class="grid auto-rows-max gap-2">
          <help-input
            type="password"
            label="Confirm Password"
            placeholder="confirm your new password"
            v-model="confirmationPassword"
          />
          <p class="text-xsmall text-flame font-medium" v-if="invalid">
            Your password is required
          </p>
        </div>
        <help-button label="confirm" :loading="loading" loading-label="creating password" />
        <help-button label="abort" bg-color="flame" type="button" @click="$router.push('/')" />
      </form>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import { useToast } from 'vue-toastification';
import axios from 'axios';

export default {
  name: 'ResetPassword',
  components: {
    HelpButton,
    HelpInput,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      password: '',
      confirmationPassword: '',
      invalid: false,
      loading: false,
    };
  },
  computed: {
    resetPasswordToken() {
      return this.$store.state.resetPasswordToken;
    },
  },
  methods: {
    async resetPassword() {
      const payload = {
        token: this.resetPasswordToken,
        password: this.confirmationPassword,
      };
      const auth = `Basic ${Buffer.from('CMS:12345').toString('base64')}`;
      try {
        this.loading = true;
        await axios.patch(
          `${process.env.VUE_APP_BASE_URL}dashboard/authentications/reset-password`,
          payload,
          {
            headers: {
              'x-device-type': 'LINUX',
              'x-device-os-version': 'Ubuntu18.04',
              'x-device-model': '4s-dk0115AU',
              'x-app-version': 'v1.2',
              'x-request-id': '1234',
              'x-device-utc-offset': '+07:00',
              'x-device-lang': 'en',
              'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
              authorization: auth,
            },
          },
        );
        this.toast.success('Successfully created new password');
        this.$router.push('/');
      } catch (error) {
        if (error.response.data.meta.message === 'Resources not found: token') {
          this.toast.error('Token not found. Try resending email.');
        } else {
          this.toast.error(error.response.data.meta.message);
        }
      }
      this.loading = false;
    },
  },
};
</script>
