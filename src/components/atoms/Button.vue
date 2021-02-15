<template>
  <button
    v-if="type === 'primary'"
    class="flex items-center justify-center rounded-lg bg-midnight py-2 px-4 text-snow font-semibold hover:bg-royal"
  >
    <div class="grid grid-flow-col auto-cols-max gap-2">
      <div class="h-full w-full flex items-center justify-center">
        <icon />
      </div>
      <div class="h-full w-full flex items-center">
        {{ buttonLabel }}
      </div>
    </div>
  </button>
  <button
    v-if="type === 'secondary'"
    class="rounded-lg bg-snow border-2 border-grey-4 py-2 px-4 text-grey-1 font-semibold hover:border-snow hover:ring-2 hover:ring-royal"
  >
    {{ buttonLabel }}
  </button>
  <button
    v-if="type === 'danger'"
    class="rounded-lg bg-flame py-2 px-4 text-snow font-semibold hover:bg-flame-dark"
  >
    {{ buttonLabel }}
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
