<template>
  <nav
    class="bg-midnight grid grid-flow-row auto-rows-max gap-2 h-full fixed inset-y-0 left-0 p-2 text-white font-medium overflow-y-auto overflow-x-hidden transition-all duration-150 ease-in z-50"
    :class="mini ? 'w-14' : 'w-64'"
    @mouseover="mini = false"
    @mouseout="mini = true"
  >
    <router-link
      exact
      v-for="link in links"
      exact-active-class="active-menu"
      :key="link.path"
      :to="link.path"
      class="nav-item grid grid-flow-col auto-cols-max place-items-center h-10 rounded-md overflow-x-hidden"
    >
      <div class="bg-midnight z-10 h-10 w-10 grid place-items-center">
        <icon :name="link.icon" :size="5" />
      </div>
      <p
        class="transform translate-x-0 transition-all duration-150"
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
        { path: '/nanana', label: 'Templates', icon: 'photograph' },
        { path: '/hore', label: 'Molecules', icon: 'shield' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  gap: 0.625rem;
}
nav {
  .active-menu {
    @apply bg-midnight-dark;
    div {
      @apply bg-midnight-dark;
    }
  }
  .nav-item {
    &:not(.active-menu) {
      @apply transform;
      @apply transition-transform;
      &:hover {
        @apply translate-x-1;
      }
    }
  }
}
</style>
