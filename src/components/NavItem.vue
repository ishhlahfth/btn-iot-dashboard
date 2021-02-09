<template>
  <router-link exact :to="to" class="flex items-center bg-blue-900 hover:bg-blue-700 w-56 p-2 rounded-md">
    <svg
      class="w-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path :d="path" />
    </svg>
    <p>{{ label }}</p>
  </router-link>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
    to: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss">
.router-link-active {
  background: goldenrod;
}
</style>
