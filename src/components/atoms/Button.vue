<template>
  <button
    class="flex items-center justify-center rounded-lg py-2 px-4 font-semibold"
    :class="[
      {
        'bg-midnight text-snow hover:bg-royal': type === 'primary',
      },
      {
        'bg-snow border-2 border-grey-4 text-grey-1 hover:border-snow hover:ring-2 hover:ring-royal':
          type === 'secondary',
      },
      {
        'bg-flame text-snow hover:bg-flame-dark': type === 'danger',
      },
    ]"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div v-if="icon" class="h-full w-full flex items-center justify-center">
        <icon :name="icon" />
      </div>
      <div class="h-full w-full flex items-center">
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
      default: 'ok',
    },
    icon: {
      type: String,
      default: '',
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
