<template>
  <thead class="border-b border-grey-4 whitespace-nowrap min-w-full">
    <tr class="bg-white uppercase">
      <th
        v-for="(column, i) in columns"
        :key="i"
        class="py-3 px-6 text-small font-medium text-grey-2"
      >
        {{ column }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'TableHeader',
  props: {
    columns: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
};
</script>
