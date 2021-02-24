<template>
  <div class="w-full bg-snow flex justify-end items-center py-4 px-8">
    <p class="font-medium">Name</p>
    <help-avatar
      src="https://instagram.fjog3-1.fna.fbcdn.net/v/t51.2885-15/fr/e15/s1080x1080/66827581_515397049002415_3097204635080124637_n.jpg?_nc_ht=instagram.fjog3-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=8W0W1Qiyo2wAX8f_PRo&tp=1&oh=4d9fe038537653efbb8b6cf3c30bf4c5&oe=6055D48F"
      :size="32"
      :tabindex="0"
      class="ml-3 cursor-pointer relative outline-none"
      @click="opened = !opened"
      @blur="opened = false"
    >
      <help-option
        :class="{ hidden: !opened }"
        :options="['Profile', 'Logout']"
        :position="['bottom', 'left']"
        @changeSelected="navigate"
      />
    </help-avatar>
  </div>
</template>

<script>
import HelpAvatar from '../atoms/Avatar.vue';
import HelpOption from './Option.vue';

export default {
  name: 'HelpNavbar',
  components: {
    HelpAvatar,
    HelpOption,
  },
  data() {
    return {
      opened: false,
    };
  },
  methods: {
    navigate(menu) {
      console.log('🔰', menu);
    },
  },
};
</script>

<style></style>
