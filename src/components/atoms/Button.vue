<template>
  <button
    v-if="type === 'primary'"
    class="rounded-lg bg-midnight py-2 px-4 text-snow font-semibold hover:bg-royal"
  >
    {{ buttonLabel }}
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
  computed: {
    buttonLabel() {
      return this.label.toUpperCase();
    },
  },
};
</script>

<style></style>
