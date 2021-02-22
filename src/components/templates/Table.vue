<template>
  <div class="overflow-x-auto overflow-y-hidden rounded-lg border border-grey-4 divide-y-2">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="border-b border-grey-4 whitespace-nowrap min-w-full">
          <tr class="bg-white uppercase">
            <th
              v-for="(column, i) in columns"
              :key="i"
              class="py-3 px-6 text-small font-medium text-grey-2"
            >
              <p
                :class="[
                  { 'text-center': column.align === 'center' },
                  { 'text-right': column.align === 'right' },
                ]"
              >
                {{ column.label }}
              </p>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-grey-4 whitespace-nowrap">
          <tr v-for="(row, i) in rows" :key="i" class="bg-white">
            <td v-for="(data, i) in row" :key="i" class="py-3 px-6 text-small">
              <div
                class="w-full grid"
                :class="[
                  { 'place-items-center': columnAlignment(i) === 'center' },
                  { 'place-items-end': columnAlignment(i) === 'right' },
                ]"
              >
                <slot :column="i" :row="row" :data="data">
                  <!-- default, when there is no slot -->
                  <p>{{ data }}</p>
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <table-footer />
  </div>
</template>

<script>
import TableFooter from '../molecules/TableFooter.vue';

export default {
  name: 'HelpTable',
  components: {
    TableFooter,
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
  methods: {
    columnAlignment(columnName) {
      let alignment = '';
      console.log(columnName);
      const filtered = this.columns.filter((el) => el.field === columnName)[0];
      console.log(filtered, '🚀');
      if (filtered.align) {
        alignment = filtered.align;
      } else {
        alignment = 'left';
      }
      return alignment;
    },
  },
};
</script>

<style></style>
