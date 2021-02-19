<template>
  <div class="grid grid-flow-col auto-rows-auto gap-x-16 py-3 px-6 bg-white uppercase">
    <p v-for="(column, i) in columns" :key="i">{{ column }}</p>
  </div>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    columns: {
      type: Array,
      required: true,
    },
  },
};
</script>
