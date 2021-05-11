<template>
  <div class="w-full bg-snow flex justify-between items-center p-4 sm:px-6 border-b border-grey-4">
    <div>
      <icon
        name="menu"
        :size="6"
        @click="$store.commit('SET_MINI', false)"
        class="block sm:hidden cursor-pointer"
      />
    </div>
    <div class="flex justify-end items-center">
      <p class="font-medium">{{ currentUser.profile?.name }}</p>
      <help-avatar
        src=""
        :size="32"
        :tabindex="0"
        :placeholder="currentUser.profile?.name"
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
  data() {
    return {
      opened: false,
    };
  },
  computed: {
    mini() {
      return this.$store.state.mini;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
  },
  methods: {
    navigate(menu) {
      console.log('🔰', menu);
      if (menu === 'Logout') {
        document.cookie = 'user=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
        this.$router.push('/');
      }
    },
  },
};
</script>

<style></style>
