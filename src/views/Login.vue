<template>
  <div class="w-full sm:min-w-min p-8 pt-40 sm:p-24 sm:pb-10 sm:mb-5 bg-snow">
    <div class="flex flex-col items-center mb-16">
      <img alt="logo" src="../assets/red-no-label.png" style="width: 83px;" />
      <h5 class="m-0 font-semibold text-gray-600 text-center text-3xl">Sign in to continue</h5>
    </div>

    <div class="w-full flex justify-center">
      <form
        @submit.prevent="signIn"
        class="bg-snow w-full sm:w-96 md:w-98 lg:w-100 grid grid-flow-row auto-rows-max gap-6 p-7 sm:shadow-lg sm:rounded-lg"
      >
        <help-input type="email" label="Email" placeholder="yourmail@email.com" v-model="email" />
        <help-input type="password" label="Password" placeholder="password" v-model="password" />
        <p class="cursor-pointer text-royal text-right font-medium">
          Forgot your password?
        </p>
        <help-button label="sign in" />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import HelpButton from '../components/atoms/Button.vue';
import HelpInput from '../components/atoms/Input.vue';

export default {
  name: 'Login',
  components: {
    HelpButton,
    HelpInput,
  },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const setCookie = ({ cookieName, cookieValue, expiresIn }) => {
      const date = new Date();
      date.setTime(date.getTime() + expiresIn * 24 * 60 * 60 * 1000);
      const expiredDate = `expires=${date.toUTCString()}`;
      document.cookie = `${cookieName}=${cookieValue};${expiredDate};path=/`;
    };

    const signIn = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/login/0');
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
        console.log(error);
      }
    };

    return { email, password, signIn };
  },
};
</script>

<style></style>
