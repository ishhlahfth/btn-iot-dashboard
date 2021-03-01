<template>
  <div class="p-6 grid gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">The Dummy Page</p>
      <help-button label="filter" @click="clicked" />
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
// import { onMounted } from 'vue';
import HelpButton from '../components/atoms/Button.vue';

export default {
  name: 'TheDummyPage',
  components: {
    HelpButton,
  },
  setup() {
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
    return { clicked };
  },
};
</script>

<style></style>
