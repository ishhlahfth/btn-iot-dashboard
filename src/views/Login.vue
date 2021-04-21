<template>
  <help-modal v-model="resetPasswordModal">
    <div class="grid auto-rows-max gap-4">
      <p class="font-medium text-subheading">Reset Password</p>
      <p>
        Please enter your email address. You will receive a link to create a new password via email
      </p>
      <div class="flex items-center">
        <div class="w-full mr-4">
          <help-input placeholder="Type your email here" v-model="resetEmail" />
        </div>
        <div>
          <help-button label="send link" @click="sendResetPasswordLink" />
        </div>
      </div>
    </div>
  </help-modal>
  <div class="w-full sm:min-w-min p-8 sm:p-24 sm:pb-10 sm:mb-5 bg-snow absolute top-12">
    <div class="flex flex-col items-center mb-16">
      <img alt="logo" src="../assets/red-no-label.png" style="width: 83px;" />
      <h5 class="m-0 font-semibold text-gray-600 text-center text-heading3 sm:text-3xl">
        Sign in to continue
      </h5>
    </div>

    <div class="w-full flex justify-center">
      <form
        @submit.prevent="signIn"
        class="bg-snow w-full sm:w-96 md:w-98 grid grid-flow-row auto-rows-max gap-6 sm:p-7 sm:shadow-lg sm:rounded-lg"
      >
        <div class="grid auto-rows-max gap-2">
          <help-input type="email" label="Email" placeholder="yourmail@email.com" v-model="email" />
          <p class="text-xsmall text-flame font-medium" v-if="invalid.email">
            Your email is required
          </p>
        </div>
        <div class="grid auto-rows-max gap-2">
          <help-input type="password" label="Password" placeholder="password" v-model="password" />
          <p class="text-xsmall text-flame font-medium" v-if="invalid.password">
            Your password is required
          </p>
        </div>
        <p
          class="cursor-pointer text-royal text-right font-medium"
          @click="resetPasswordModal = true"
        >
          Forgot your password?
        </p>
        <help-button label="sign in" :loading="loading" loading-label="signing in" />
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import { AUTH_API } from '@/apis';

export default {
  name: 'Login',
  components: {
    HelpButton,
    HelpInput,
    HelpModal,
  },
  setup() {
    const router = useRouter();

    const toast = useToast();

    const email = ref('');
    const password = ref('');
    const resetEmail = ref('');
    const invalid = ref({
      email: false,
      password: false,
    });
    const loading = ref(false);
    const resetPasswordModal = ref(false);

    const sendResetPasswordLink = () => {
      console.log(`Link has been sent to ${email.value}`);
      resetPasswordModal.value = false;
    };

    const setCookie = ({ cookieName, cookieValue, expiresIn }) => {
      const date = new Date();
      date.setTime(date.getTime() + expiresIn * 24 * 60 * 60 * 1000);
      const expiredDate = `expires=${date.toUTCString()}`;
      document.cookie = `${cookieName}=${cookieValue};${expiredDate};path=/`;
    };

    watch(email, () => {
      if (email.value) {
        invalid.value.email = false;
      } else {
        invalid.value.email = true;
      }
    });

    watch(password, () => {
      if (password.value) {
        invalid.value.password = false;
      } else {
        invalid.value.password = true;
      }
    });

    const signIn = async () => {
      if (!email.value) invalid.value.email = true;
      if (!password.value) invalid.value.password = true;
      if (!invalid.value.email && !invalid.value.password) {
        const payload = {
          email: email.value,
          password: password.value,
        };

        loading.value = true;
        try {
          const {
            data: { data },
          } = await AUTH_API.post(
            `${process.env.VUE_APP_BASE_URL}authentications/dashboard/login`,
            payload,
          );

          if (data) {
            let user = Utf8.parse(JSON.stringify(data));
            user = Base64.stringify(user);
            setCookie({
              cookieName: 'user',
              cookieValue: user,
              expiresIn: 3,
            });
            router.push('/bns');
          }
        } catch (error) {
          toast.error(error.response.data.meta.message);
        }
        loading.value = false;
      }
    };

    return {
      email,
      password,
      resetEmail,
      invalid,
      signIn,
      loading,
      resetPasswordModal,
      sendResetPasswordLink,
    };
  },
};
</script>

<style></style>
