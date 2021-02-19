<template>
  <tbody class="divide-y divide-grey-4 whitespace-nowrap">
    <tr v-for="(row, i) in rows" :key="i" class="bg-white">
      <td v-for="(data, i) in row" :key="i" class="py-3 px-6 text-small">
        {{ data }}
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody',
  props: {
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

<style lang="scss" scoped>
td:first-child {
  font-weight: 600;
}
</style>
