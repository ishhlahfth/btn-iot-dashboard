<template>
  <div class="p-6 grid gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">The Dummy Page</p>
      <help-button label="filter" @click="clicked" />
    </div>
    <div>
      <div class="w-106 bg-snow p-6 grid auto-rows-max gap-4 rounded-lg shadow-custom">
        <p class="font-medium text-subheading">Reset Password</p>
        <p>
          Please enter your email address. You will receive a link to create a new password via
          email
        </p>
        <div class="flex items-center">
          <div class="w-full mr-4">
            <help-input placeholder="Type your email here" v-model="email" />
          </div>
          <div>
            <help-button label="send link" @click="clicked" />
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <p>Content 1</p>
    </div>
    <div class="w-full">
      <p>Content 2</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
    </div>
    <div class="w-full">
      <p>Content 2</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
      <p class="text-grey-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum labore ab illum ipsam
        aliquid quos sapiente nesciunt illo ullam quae quam quisquam dicta quidem suscipit
        voluptatibus eveniet corporis, exercitationem quod?
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// import { onMounted } from 'vue';
import HelpButton from '../components/atoms/Button.vue';
import HelpInput from '../components/atoms/Input.vue';

export default {
  name: 'TheDummyPage',
  components: {
    HelpButton,
    HelpInput,
  },
  setup() {
    const email = ref('');
    const clicked = () => {
      console.log('click!');
    };
    // const getCookie = (cookieName) => {
    //   const name = `${cookieName}=`;
    //   const decodedCookie = decodeURIComponent(document.cookie);
    //   const ca = decodedCookie.split(';');
    //   for (let i = 0; i < ca.length; i += 1) {
    //     let c = ca[i];
    //     while (c.charAt(0) === ' ') {
    //       c = c.substring(1);
    //     }
    //     if (c.indexOf(name) === 0) {
    //       return c.substring(name.length, c.length);
    //     }
    //   }
    //   return '';
    // };

    // onMounted(() => {
    //   let user = getCookie('user');
    //   user = Base64.parse(user);
    //   user = Utf8.stringify(user);
    //   user = JSON.parse(user);
    //   console.log('!!!P!#O!PO#!', user);
    // });
    return { email, clicked };
  },
};
</script>

<style>
.shadow-custom {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
