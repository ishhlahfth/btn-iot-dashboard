<template>
  <div class="relative w-full outline-none" :tabindex="tabindex" @blur="opened = false">
    <div
      class="flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
      :class="{ 'ring-2 ring-royal': opened }"
      @click="opened = !opened"
    >
      <p class="mr-2 truncate">{{ selected }}</p>
      <icon name="selector" />
    </div>
    <help-option
      :class="{ 'hidden': !opened }"
      :options="options"
      :selected="selected"
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
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selected: !this.default ? (this.options.length > 0 ? this.options[0] : null) : this.default,
      opened: false,
    };
  },
  methods: {
    changeSelected(newItem) {
      this.selected = newItem;
      this.opened = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
