<template>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleResize() {
      this.$store.commit('SET_SCREEN_WIDTH', window.innerWidth);
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
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

ul,
ol {
  @apply pl-4;
  li {
    @apply mb-2;
  }
}

textarea:focus,
input:focus {
  outline: none;
}

#app {
  font-family: Inter, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.Vue-Toastification__toast.custom-toast {
  padding-top: 8px;
  padding-bottom: 8px;
  min-height: 56px;
  @sceen sm {
    min-width: 480px;
  }
}

.Vue-Toastification__toast-body.custom-body {
  font-family: Inter, sans-serif;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.highlight {
  @apply rounded;
  @apply bg-grey-4;
  @apply bg-opacity-50;
  @apply px-2;
}
</style>
