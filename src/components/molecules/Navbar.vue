<template>
  <div
    class="w-full bg-snow flex justify-between items-center py-4 px-6 sm:px-8 border-b border-grey-4"
  >
    <div>
      <icon
        name="reorder"
        :size="6"
        @click="store.methods.setMini(false)"
        class="block sm:hidden cursor-pointer"
      />
    </div>
    <div class="flex justify-end items-center">
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
  </div>
</template>

<script>
import { ref, inject } from 'vue';
import HelpAvatar from '../atoms/Avatar.vue';
import HelpOption from './Option.vue';
import Icon from '../atoms/Icon.vue';

export default {
  name: 'HelpNavbar',
  components: {
    HelpAvatar,
    HelpOption,
    Icon,
  },
  setup() {
    const store = inject('store');
    const opened = ref(false);
    return {
      store,
      opened,
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
