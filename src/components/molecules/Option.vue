<template>
  <div
    class="absolute w-full min-w-max max-h-52 overflow-y-scroll z-10 p-1 bg-snow rounded-lg border border-grey-4 shadow-lg"
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
      :label="option"
      :selected="selected === option"
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
      type: [String, Number],
      default: '',
    },
    position: {
      type: Array,
      default() {
        return ['bottom', 'right'];
      },
    },
  },
};
</script>

<style></style>
