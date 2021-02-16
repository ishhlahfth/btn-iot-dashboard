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
  background-image: url(../../assets/icons/check.svg);
  border-color: transparent;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}
</style>
