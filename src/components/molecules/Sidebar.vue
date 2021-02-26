<template>
  <nav
    class="h-full fixed inset-y-0 left-0 grid gap-2 auto-rows-max bg-midnight z-50 p-2 transition-all duration-200 overflow-hidden"
    :class="mini ? 'w-14' : 'w-64'"
    @mouseover="mini = false"
    @mouseleave="mini = true"
  >
    <template v-for="link in links" :key="link.path">
      <nav-item v-if="!link.subMenu" :menu="link" />
      <nav-expandable-item v-else :menu="link" ref="expandableItem" :miniSidebar="mini" />
    </template>
  </nav>
</template>

<script>
import NavExpandableItem from '../atoms/NavExpandableItem.vue';
import NavItem from '../atoms/NavItem.vue';

export default {
  name: 'HelpSidebar',
  components: {
    NavExpandableItem,
    NavItem,
  },
  data() {
    return {
      collapsed: true,
      mini: true,
      links: [
        {
          path: '/',
          label: 'Components',
          icon: 'cube',
          subMenu: [
            { path: '/hore', label: 'Molecules', icon: '' },
            { path: '/uwu', label: 'Templates', icon: '' },
          ],
        },
        { path: '/uwus', label: 'Dashboard', icon: 'user' },
        { path: '/nanana', label: 'Templates', icon: 'photograph' },
        {
          path: '/s',
          label: 'Router',
          icon: 'filter',
          subMenu: [
            { path: '/hore2', label: 'Banner', icon: '' },
            { path: '/uwu3', label: 'Inbox', icon: '' },
          ],
        },
        { path: '/hores', label: 'Molecules', icon: 'shield' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.rotate {
  transform: rotate(180deg);
}
</style>
