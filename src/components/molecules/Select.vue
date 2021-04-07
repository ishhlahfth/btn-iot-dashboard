<template>
  <div class="w-full outline-none grid" :class="{ 'gap-1': label }">
    <label class="font-medium">{{ label }}</label>
    <div class="relative w-full outline-none" :tabindex="0" @blur="opened = false">
      <div
        class="bg-white flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
        :class="{ 'ring-2 ring-royal': opened }"
        @click="opened = !opened"
      >
        <p class="mr-2 truncate">{{ checkSelected(selected) }}</p>
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
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object],
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
      opened: false,
    };
  },
  computed: {
    selected: {
      get() {
        return !this.modelValue
          ? this.options.length > 0
            ? this.options[0]
            : null
          : this.modelValue;
      },
      set(value) {
        return value;
      },
    },
  },
  methods: {
    changeSelected(newItem) {
      console.log(9999, newItem);
      this.selected = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
    },
    checkSelected(selected) {
      let result = selected;
      if (typeof selected === 'object') {
        result = selected.label;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
