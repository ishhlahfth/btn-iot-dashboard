<template>
  <div class="flex flex-col">
    <label>{{ label }}</label>
    <input
      class="border border-gray-300 py-2.5 px-3 text-grey-darkest rounded-lg focus:ring-2 focus:ring-blue-500"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'HelpInput',
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
  },
};
</script>

<style></style>
