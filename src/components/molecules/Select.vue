<template>
  <div class="w-full outline-none grid" :class="{ 'gap-1': label }">
    <label class="font-medium">{{ label }}</label>
    <div class="relative w-full outline-none" :tabindex="0" @blur="opened = false">
      <div
        class="flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
        :class="[`bg-${bgColor}`, { 'ring-2 ring-royal': opened }]"
        @click="opened = !opened"
      >
        <div class="grid grid-flow-col gap-3">
          <icon v-if="leftIcon" :name="leftIcon" class="justify-self-center self-center" />
          <p class="mr-2 truncate">{{ checkSelected(selected) }}</p>
        </div>
        <icon :name="iconName" />
      </div>
      <help-option
        :class="{ hidden: !opened }"
        :options="options"
        :position="position"
        :selected="typeof modelValue === 'object' ? modelValue.value : modelValue"
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
    leftIcon: {
      type: String,
      default: '',
    },
    position: {
      type: Array,
      default() {
        return ['bottom', 'right'];
      },
    },
    bgColor: {
      type: String,
      default: 'white',
    },
    iconName: {
      type: String,
      default: 'selector',
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
      this.selected = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
    },
    checkSelected(selected) {
      let result = selected;
      if (selected && typeof selected === 'object') {
        result = selected.label;
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped></style>
