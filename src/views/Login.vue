<template>
  <div class="w-full sm:min-w-min p-8 pt-40 sm:p-24 sm:pb-10 sm:mb-5 overflow-y-scroll">
    <div class="flex flex-col items-center mb-16">
      <img alt="logo" src="../assets/red-no-label.png" style="width: 83px;" />
      <h5 class="m-0 font-semibold text-gray-600 text-center text-3xl">Sign in to continue</h5>
    </div>

    <div class="w-full flex justify-center">
      <form
        @submit.prevent="signIn"
        class="w-full sm:w-96 md:w-98 lg:w-100 grid grid-flow-row auto-rows-max gap-6 p-7 sm:shadow-lg sm:rounded-lg"
      >
        <help-input type="email" label="Email" placeholder="yourmail@email.com" v-model="email" />
        <help-input type="password" label="Password" placeholder="password" v-model="password" />
        <p class="cursor-pointer text-blue-500 text-right font-medium">
          Forgot your password?
        </p>
        <help-button label="sign in" />
      </form>
    </div>
  </div>
</template>

<script>
import HelpButton from '../components/atoms/Button.vue';
import HelpInput from '../components/atoms/Input.vue';

export default {
  name: 'Login',
  components: {
    HelpButton,
    HelpInput,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      alert(`yahuuu ${this.email} & ${this.password}`);
    },
  },
};
</script>

<style></style>
