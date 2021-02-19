<template>
  <div class="overflow-x-auto rounded-lg">
    <table class="min-w-full">
      <table-header :columns="columns" />
      <table-body :rows="rows" />
    </table>
  </div>
</template>

<script>
import TableBody from '../molecules/TableBody.vue';
import TableHeader from '../molecules/TableHeader.vue';

export default {
  name: 'HelpTable',
  components: {
    TableBody,
    TableHeader,
  },
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    rows: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>

<style></style>
