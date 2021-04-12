<template>
  <div class="relative flex tooltip-container">
    <slot class="hoheohe" />
    <div
      class="tooltip bg-grey-2 text-white text-center opacity-0 w-auto rounded py-1 px-3 absolute left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-75"
      style="bottom: 110%;"
    >
      <p class="text-xsmall">{{ text }}</p>
    </div>
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
.tooltip-container {
  > :not(.tooltip):hover {
    ~ .tooltip {
      @apply opacity-100;
    }
  }
}
</style>
