<template>
  <nav
    class="h-full fixed inset-y-0 left-0 sm:grid gap-2 auto-rows-max bg-midnight overflow-hidden z-50 sm:p-2 transition-all duration-200"
    :class="mini ? 'w-0 sm:w-14' : 'p-2 w-64'"
    @mouseover="$store.commit('SET_MINI', false)"
    @mouseleave="$store.commit('SET_MINI', true)"
  >
    <template v-for="(link, i) in links" :key="i">
      <nav-item v-if="!link.subMenu" :menu="link" />
      <nav-expandable-item v-else :menu="link" ref="expandableItem" :miniSidebar="mini" />
    </template>
  </nav>
  <div
    v-if="!mini"
    @click="$store.commit('SET_MINI', true)"
    class="sm:hidden absolute top-0 right-0 bg-black bg-opacity-40 h-full w-full z-20"
  ></div>
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
      links: [
        { path: '/bns/merchant', label: 'Merchant', icon: 'user' },
        { path: '/bns/order', label: 'Order', icon: 'cube' },
        { path: '/bns/transfer', label: 'Transfer', icon: 'switch-horizontal' },
        { path: '/bns/payment', label: 'Payment', icon: 'credit-card' },
        { path: '/bns/banner', label: 'Banner', icon: 'photograph' },
        // { path: '/bns/admin', label: 'Admin', icon: 'shield' },
        // { path: '/bns/role', label: 'Role', icon: 'user-group' },
        // { path: '/bns/home', label: 'Home', icon: 'home' },
        // { path: '/bns/another-page', label: 'Components', icon: 'template' },
        // {
        //   path: '/',
        //   label: 'Dummy Page',
        //   icon: 'cube',
        //   subMenu: [
        //     { path: '/bns/dummy-page-1', label: 'First', icon: '' },
        //     { path: '/bns/dummy-page-2', label: 'Second', icon: '' },
        //     { path: '/bns/dummy-page-3', label: 'Third', icon: '' },
        //   ],
        // },
      ],
    };
  },
  computed: {
    mini() {
      return this.$store.state.mini;
    },
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
// nav {
//   &::before {
//     content: '';
//     position: absolute;
//     right: -50%;
//     top: 0;
//     height: 100vh;
//     width: 100%;
//     background: rgba($color: #000000, $alpha: 0.4);
//   }
// }
</style>
