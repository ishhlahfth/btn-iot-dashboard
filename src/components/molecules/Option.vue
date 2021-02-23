<template>
  <div
    class="absolute left-0 w-full min-w-max z-10 p-1 bg-snow rounded-lg border border-grey-4 shadow-lg"
    :class="[{ 'top-12': position === 'below' }, { 'bottom-12': position === 'above' }]"
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
      type: String,
      default: 'below',
    },
  },
};
</script>

<style></style>
