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
import HelpNavbar from './components/molecules/Navbar.vue';
import HelpSidebar from './components/molecules/Sidebar.vue';

export default {
  name: 'App',
  components: {
    HelpNavbar,
    HelpSidebar,
  },
  setup() {
    provide('store', store);
  },
};
</script>

<style lang="scss">
body {
  font-size: 14px;
  color: #303b4d;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
}
td,
th {
  text-align: left;
  font-weight: inherit;
}
textarea:focus,
input:focus {
  outline: none;
}
#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
