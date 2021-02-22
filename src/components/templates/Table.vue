<template>
  <div class="overflow-x-auto rounded-lg">
    <table class="min-w-full">
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
      <tbody class="divide-y divide-grey-4 whitespace-nowrap">
        <tr v-for="(row, i) in rows" :key="i" class="bg-white">
          <td v-for="(data, i) in row" :key="i" class="py-3 px-6 text-small">
            <slot :column="i" :row="row" :data="data">
              {{ data }} <!-- default, when there is no slot -->
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'HelpTable',
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
