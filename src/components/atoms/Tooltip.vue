<template>
  <!-- <div class="relative inline-block tooltip-container">
    <slot />
    <div
      class="tooltip bg-grey-2 text-white text-center w-auto opacity-0 rounded py-1 px-3 absolute bottom-full left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-200 delay-200"
    >
      <p class="text-xsmall">{{ text }}</p>
    </div>
  </div> -->
  <div
    class="tooltip bg-grey-2 text-white text-center w-auto rounded py-1 px-3"
  >
    <p class="text-xsmall">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelpTooltip',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
// .tooltip-container:hover {
//   .tooltip {
//     opacity: 100%;
//   }
// }
</style>
