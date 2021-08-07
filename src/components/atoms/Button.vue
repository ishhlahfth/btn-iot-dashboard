<template>
  <button
    :type="type"
    :disabled="loading || disabled"
    class="flex items-center justify-center font-semibold transition-all"
    :class="[
      `bg-${bgColor ? bgColor : 'blue-500'} text-${color}`,
      iconOnly ? 'p-1 rounded-full' : 'py-2 px-4 rounded-lg',
      bgColor === 'transparent' ? 'hover:bg-grey-4 hover:bg-opacity-70' : 'hover:bg-opacity-80',
      { 'cursor-not-allowed bg-opacity-80': loading || disabled },
    ]"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div v-if="icon" class="h-full w-full flex items-center justify-center">
        <icon :name="loading ? 'loading' : icon" :class="{ 'animate-spin': loading }" />
      </div>
      <div v-if="!icon && loading" class="h-full w-full flex items-center justify-center">
        <icon name="loading" :class="{ 'animate-spin': loading }" />
      </div>
      <div v-if="label" class="h-full w-full flex items-center">
        <p v-if="!loading" class="text-body">{{ buttonLabel }}</p>
        <template v-else>
          <p v-if="uppercasedLoadingLabel" class="text-body">{{ uppercasedLoadingLabel }}</p>
        </template>
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
    loading: {
      type: Boolean,
      default: false,
    },
    loadingLabel: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    disabled: {
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
    uppercasedLoadingLabel() {
      return this.loadingLabel.toUpperCase();
    },
  },
};
</script>

<style></style>
