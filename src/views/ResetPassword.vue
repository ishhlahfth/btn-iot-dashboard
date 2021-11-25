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
            :type="visible.password ? 'text' : 'password'"
            label="Password"
            placeholder="create new password"
            v-model="password"
          >
            <help-button
              type="button"
              icon-only
              :icon="visible.password ? 'eye-off' : 'eye'"
              bg-color="transparent"
              color="grey-3"
              @click="visible.password = !visible.password"
            />
          </help-input>
          <p class="text-xsmall text-flame font-medium" v-if="invalid.password">
            Your new password is required
          </p>
        </div>
        <div class="grid auto-rows-max gap-2">
          <help-input
            :type="visible.confirmationPassword ? 'text' : 'password'"
            label="Confirm Password"
            placeholder="confirm your new password"
            v-model="confirmationPassword"
          >
            <help-button
              type="button"
              icon-only
              :icon="visible.confirmationPassword ? 'eye-off' : 'eye'"
              bg-color="transparent"
              color="grey-3"
              @click="visible.confirmationPassword = !visible.confirmationPassword"
            />
          </help-input>
          <p
            class="text-xsmall text-flame font-medium"
            v-if="confirmationPassword && invalid.confirmationPassword"
          >
            Password incorrect
          </p>
        </div>
        <div class="grid gap-2">
          <help-button label="confirm" :loading="loading" loading-label="creating password" />
          <help-button label="abort" bg-color="flame" type="button" @click="$router.push('/')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import axios from 'axios';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';

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
      invalid: {
        password: false,
        confirmationPassword: true,
      },
      visible: {
        password: false,
        confirmationPassword: false,
      },
      loading: false,
    };
  },
  computed: {
    resetPasswordToken() {
      return this.$store.state.resetPasswordToken;
    },
  },
  watch: {
    password() {
      if (this.password) {
        this.invalid.password = false;
      } else {
        this.invalid.password = true;
      }
    },
    confirmationPassword(newValue) {
      if (newValue !== this.password) {
        this.invalid.confirmationPassword = true;
      } else {
        this.invalid.confirmationPassword = false;
      }
    },
  },
  methods: {
    async resetPassword() {
      const payload = {
        token: this.resetPasswordToken,
        password: this.confirmationPassword,
      };
      const auth = `Basic ${Buffer.from('CMS:12345').toString('base64')}`;
      if (!this.confirmationPassword) {
        this.toast.warning('Please re-type your password');
      } else if (!this.invalid.password && !this.invalid.confirmationPassword) {
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
      }
    },
  },
};
</script>
