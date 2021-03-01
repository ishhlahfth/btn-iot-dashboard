<template>
  <help-sidebar />
  <help-navbar />
  <div class="sm:ml-14 bg-grey-6">
    <router-view />
  </div>
</template>

<script>
import { provide } from 'vue';
import store from '@/composables';
import HelpNavbar from '@/components/molecules/Navbar.vue';
import HelpSidebar from '@/components/molecules/Sidebar.vue';

export default {
  name: 'Main',
  components: {
    HelpNavbar,
    HelpSidebar,
  },
  setup() {
    provide('store', store);
  },
};
</script>

<style></style>
