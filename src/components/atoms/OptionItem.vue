<template>
  <p
    v-if="selected"
    class="rounded py-3 px-4 w-full min-w-max bg-midnight text-white cursor-pointer font-medium select-none"
  >
    {{ label }}
  </p>
  <p v-else class="rounded py-3 px-4 w-full min-w-max hover:bg-grey-6 cursor-pointer font-medium select-none">
    {{ label }}
  </p>
</template>

<script>
export default {
  name: 'HelpOptionItem',
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number],
      default: '',
    },
  },
};
</script>

<style></style>
