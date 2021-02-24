<template>
  <nav
    class="bg-midnight grid grid-flow-row auto-rows-max gap-2 h-full fixed inset-y-0 left-0 p-2 text-white font-medium overflow-y-auto overflow-x-hidden transition-all duration-200 ease-in"
    :class="mini ? 'w-14' : 'w-64'"
    @mouseover="testIn"
    @mouseout="testOut"
  >
    <router-link
      exact
      v-for="link in links"
      :key="link.path"
      :to="link.path"
      class="nav-item grid grid-flow-col auto-cols-max place-items-center h-10 rounded-md overflow-x-hidden transform hover:translate-x-1 transition"
    >
      <div class="bg-midnight z-10 h-10 w-10 grid place-items-center">
        <icon :name="link.icon" :size="5" />
      </div>
      <p
        class="transform translate-x-0 transition-all duration-200"
        :class="{ 'transform -translate-x-32': mini }"
      >
        {{ link.label }}
      </p>
    </router-link>
  </nav>
</template>

<script>
import Icon from '../atoms/Icon.vue';

export default {
  name: 'HelpSidebar',
  components: {
    Icon,
  },
  data() {
    return {
      mini: true,
      links: [
        { path: '/', label: 'Components', icon: 'cube' },
        { path: '/uwu', label: 'Dashboard', icon: 'user' },
        { path: '', label: 'Templates', icon: 'photograph' },
      ],
    };
  },
  methods: {
    testIn() {
      console.log('🦀 IN');
      this.mini = false;
    },
    testOut() {
      console.log('🌲 OUT');
      this.mini = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  gap: 0.625rem;
  // &:hover {
  //   @apply bg-midnight-dark;
  //   div {
  //     @apply bg-midnight-dark;
  //   }
  // }
}
</style>
