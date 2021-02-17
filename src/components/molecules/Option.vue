<template>
  <div
    class="absolute left-0 top-12 w-full min-w-max z-10 p-1 bg-snow rounded-lg border border-grey-4 shadow-lg"
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
      type: String,
      default: '',
    },
  },
};
</script>

<style></style>
