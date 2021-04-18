<template>
  <div
    @click="onToggle"
    class="w-11 p-0.5 flex rounded-full cursor-pointer transition-all duration-200 ease-in-out"
    :class="{ ' justify-end': modelValue }"
    :style="modelValue ? 'background: #60D66A;' : 'background: #E4E7EB;'"
  >
    <input
      :value="modelValue"
      type="checkbox"
      class="appearance-none cursor-pointer transition-all duration-200 ease-in-out"
      @change="onToggle"
    />
    <label class="w-5 h-5 rounded-full bg-white shadow cursor-pointer" />
  </div>
</template>

<script>
export default {
  name: 'HelpToggle',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onToggle() {
      this.$emit('change', !this.modelValue);
    },
  },
};
</script>
