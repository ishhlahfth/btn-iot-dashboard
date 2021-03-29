<template>
  <button
    class="flex items-center justify-center font-semibold transition-all"
    :class="[
      `bg-${bgColor} text-${color}`,
      { bordered: outlined },
      iconOnly ? 'p-1 rounded-full' : 'py-2 px-4 rounded-lg',
      bgColor === 'transparent'
        ? 'hover:bg-grey-4 hover:bg-opacity-70'
        : 'hover:bg-opacity-80',
    ]"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div v-if="icon" class="h-full w-full flex items-center justify-center">
        <icon :name="icon" />
      </div>
      <div v-if="label" class="h-full w-full flex items-center">
        <p class="text-body">{{ buttonLabel }}</p>
      </div>
    </div>
  </button>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'HelpButton',
  props: {
    bgColor: {
      type: String,
      default: 'midnight',
    },
    color: {
      type: String,
      default: 'white',
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconOnly: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Icon,
  },
  computed: {
    buttonLabel() {
      return this.label.toUpperCase();
    },
  },
};
</script>

<style></style>
