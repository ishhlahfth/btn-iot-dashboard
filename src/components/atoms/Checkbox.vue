<template>
  <input
    @input="$emit('update:modelValue', !modelValue)"
    type="checkbox"
    :value="modelValue"
    class="form-tick appearance-none h-5 w-5 m-1 border text-royal border-grey-2 rounded checked:bg-blue-600 checked:border-transparent focus:outline-none"
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
.form-tick:checked {
  background-image: url(../../assets/icons/check.svg);
  border-color: transparent;
  background-color: currentColor;
  background-size: 100% 100%;
  background-position: 50%;
  background-repeat: no-repeat;
}
</style>
