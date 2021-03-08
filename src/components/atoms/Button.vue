<template>
  <button
    class="flex items-center justify-center font-semibold transition-all"
    :class="[
      {
        'bg-midnight text-snow hover:ring-2 hover:ring-midnight hover:ring-offset-1 hover:ring-opacity-75': type === 'primary',
      },
      {
        'bg-snow border-2 border-grey-4 text-grey-1 hover:border-snow hover:ring-2 hover:ring-royal':
          type === 'secondary',
      },
      {
        'bg-flame text-snow hover:bg-flame-dark': type === 'danger',
      },
      iconOnly ? 'p-1 rounded-full' : 'py-2 px-4 rounded-lg',
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
    type: {
      type: String,
      default: 'primary',
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
