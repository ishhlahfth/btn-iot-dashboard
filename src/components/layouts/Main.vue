<template>
  <help-sidebar />
  <help-navbar />
  <div class="sm:ml-14 bg-grey-6">
    <router-view />
  </div>
</template>

<script>
import HelpNavbar from '@/components/molecules/Navbar.vue';
import HelpSidebar from '@/components/molecules/Sidebar.vue';

export default {
  name: 'Main',
  components: {
    HelpNavbar,
    HelpSidebar,
  },
};
</script>

<style></style>
