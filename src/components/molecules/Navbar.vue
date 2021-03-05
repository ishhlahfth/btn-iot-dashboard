<template>
  <div
    class="w-full bg-snow flex justify-between items-center p-4 sm:px-6 border-b border-grey-4"
  >
    <div>
      <icon
        name="menu"
        :size="6"
        @click="store.methods.setMini(false)"
        class="block sm:hidden cursor-pointer"
      />
    </div>
    <div class="flex justify-end items-center">
      <p class="font-medium">Name</p>
      <help-avatar
        src="https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg"
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
      if (menu === 'Logout') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>
