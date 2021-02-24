<template>
  <div class="relative w-full outline-none" :tabindex="0" @blur="opened = false">
    <div
      class="flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
      :class="{ 'ring-2 ring-royal': opened }"
      @click="opened = !opened"
    >
      <p class="mr-2 truncate">{{ selected }}</p>
      <icon name="selector" />
    </div>
    <help-option
      :class="{ hidden: !opened }"
      :options="options"
      :position="position"
      :selected="modelValue"
      @changeSelected="changeSelected"
    />
  </div>
</template>

<script>
import Icon from '../atoms/Icon.vue';
import HelpOption from './Option.vue';

export default {
  name: 'HelpSelect',
  components: {
    HelpOption,
    Icon,
  },
  props: {
    modelValue: {
      type: [String, Number],
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    position: {
      type: Array,
      default() {
        return ['bottom', 'right'];
      },
    },
  },
  data() {
    return {
      selected: !this.modelValue
        ? this.options.length > 0
          ? this.options[0]
          : null
        : this.modelValue,
      opened: false,
    };
  },
  methods: {
    changeSelected(newItem) {
      this.selected = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
    },
  },
};
</script>

<style lang="scss" scoped></style>
