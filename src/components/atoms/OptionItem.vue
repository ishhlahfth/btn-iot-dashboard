<template>
  <p
    class="rounded py-2.5 px-4 w-full min-w-max cursor-pointer font-medium select-none"
    :class="selected ? 'bg-midnight text-white' : 'hover:bg-grey-6'"
  >
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
