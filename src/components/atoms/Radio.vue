<template>
  <div class="grid grid-flow-col auto-cols-max gap-1 place-items-center">
    <input
      @input="$emit('update:modelValue', !modelValue)"
      type="radio"
      :value="modelValue"
      :name="group"
      class="help-radio appearance-none relative h-5 w-5 m-1 border text-royal border-grey-2 rounded-full checked:bg-royal checked:border-transparent focus:outline-none cursor-pointer"
    />
    <label v-if="label" class="font-medium">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'HelpRadio',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    group: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.help-radio:checked {
  &::after {
    content: '';
    width: 35%;
    height: 35%;
    background: white;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }
}
</style>
