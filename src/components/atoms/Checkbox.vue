<template>
  <input
    @input="$emit('update:modelValue', !modelValue)"
    type="checkbox"
    :value="modelValue"
    class="help-checkbox appearance-none h-5 w-5 m-1 border text-royal border-grey-2 checked:bg-royal rounded focus:outline-none cursor-pointer"
  />
</template>

<script>
export default {
  name: 'HelpCheckbox',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.help-checkbox:checked {
  background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0id2hpdGUiPgogIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTE2LjcwNyA1LjI5M2ExIDEgMCAwMTAgMS40MTRsLTggOGExIDEgMCAwMS0xLjQxNCAwbC00LTRhMSAxIDAgMDExLjQxNC0xLjQxNEw4IDEyLjU4Nmw3LjI5My03LjI5M2ExIDEgMCAwMTEuNDE0IDB6IiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIC8+Cjwvc3ZnPg==);
  border-color: transparent;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}
</style>
