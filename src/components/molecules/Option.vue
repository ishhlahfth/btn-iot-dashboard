<template>
  <div
    class="absolute w-full min-w-max max-h-52 overflow-y-auto p-1 bg-snow rounded-lg border border-grey-4 shadow-lg"
    style="z-index: 999;"
    :class="[
      { 'top-12': position[0] === 'bottom' },
      { 'bottom-12': position[0] === 'top' },
      { 'left-0': position[1] === 'right' },
      { 'right-0': position[1] === 'left' },
    ]"
  >
    <help-option-item
      v-for="(option, i) in options"
      :key="i"
      :label="checkLabel(option)"
      :selected="selected === checkValue(option)"
      @click="$emit('changeSelected', option)"
    />
  </div>
</template>

<script>
import HelpOptionItem from '../atoms/OptionItem.vue';

export default {
  name: 'HelpOption',
  components: {
    HelpOptionItem,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      default: '',
    },
    selected: {
      type: [String, Number, Object],
      default: '',
    },
    position: {
      type: Array,
      default() {
        return ['bottom', 'right'];
      },
    },
  },
  methods: {
    checkLabel(option) {
      let result = option;
      if (typeof option === 'object') {
        result = option.label;
      }
      return result;
    },
    checkValue(option) {
      let result = option;
      if (typeof option === 'object') {
        result = option.value;
      }
      return result;
    },
  },
};
</script>

<style></style>
