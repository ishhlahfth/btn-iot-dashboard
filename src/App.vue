<template>
  <help-sidebar />
  <help-navbar />
  <router-view class="ml-14 bg-grey-6" />
</template>

<script>
import HelpNavbar from './components/molecules/Navbar.vue';
import HelpSidebar from './components/molecules/Sidebar.vue';

export default {
  name: 'App',
  components: {
    HelpNavbar,
    HelpSidebar,
  },
};
</script>

<style lang="scss">
body {
  font-size: 14px;
  color: #303B4D;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
table {
  border-collapse: collapse;
}
td, th {
  text-align: left;
  font-weight: inherit;
}
textarea:focus, input:focus {
  outline: none;
}
#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
