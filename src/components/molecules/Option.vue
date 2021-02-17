<template>
  <div class="relative w-full" @click="opened = !opened" @blur="opened = false">
    <div
      class="flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer"
      :class="{ 'ring-2 ring-royal': opened }"
    >
      <p class="mr-2 truncate">{{ selected }}</p>
      <icon name="selector" />
    </div>
    <div
      v-if="opened"
      class="absolute left-0 top-12 w-full min-w-max z-10 p-1 bg-snow rounded-lg border border-grey-4 shadow-lg"
    >
      <help-option-item
        v-for="(option, i) in options"
        :key="i"
        :label="option"
        :selected="selected === option"
        @click="changeSelected(option)"
      />
    </div>
  </div>
</template>

<script>
import Icon from '../atoms/Icon.vue';
import HelpOptionItem from '../atoms/OptionItem.vue';

export default {
  name: 'HelpOption',
  components: {
    HelpOptionItem,
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
      // selected: this.default ? this.default : this.options.length > 0 ? this.options[0] : null,
      selected: !this.default ? (this.options.length > 0 ? this.options[0] : null) : this.default,
      opened: false,
    };
  },
  methods: {
    changeSelected(newItem) {
      this.selected = newItem;
    },
  },
};
</script>

<style></style>
