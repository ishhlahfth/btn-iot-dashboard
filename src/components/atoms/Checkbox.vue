<template>
  <div class="grid grid-flow-col auto-cols-max gap-1 place-items-center">
    <input
      @change="(event) => $emit('update:checked', event.target.checked)"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      :class="{ 'cursor-pointer': !disabled }"
      class="bg-white help-checkbox appearance-none h-5 w-5 m-1 border text-royal border-grey-2 checked:bg-royal rounded focus:outline-none"
    />
    <label v-if="label" class="font-medium">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'HelpCheckbox',
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
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
