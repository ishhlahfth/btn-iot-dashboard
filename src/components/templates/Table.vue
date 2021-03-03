<template>
  <div class="overflow-x-auto overflow-y-hidden rounded-lg border border-grey-4 divide-y-2">
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="border-b border-grey-4 whitespace-nowrap min-w-full">
          <tr class="bg-white uppercase">
            <th
              v-for="(column, i) in columns"
              :key="i"
              class="py-3 px-6 text-small font-medium text-grey-2"
            >
              <div
                class="w-full flex justify-between select-none"
                :class="[
                  { 'text-grey-1': pagination.sortBy === column.field },
                  { 'hover:opacity-50 cursor-pointer': column.sortable },
                ]"
                @click="sort(column)"
              >
                <icon
                  v-if="
                    pagination.sortBy === column.field &&
                      column.sortable &&
                      column.align === 'right'
                  "
                  :name="pagination.order === 'asc' ? 'chevron-up' : 'chevron-down'"
                  class="mr-1"
                />
                <p
                  :class="[
                    { 'text-center': column.align === 'center' },
                    { 'text-right': column.align === 'right' },
                  ]"
                >
                  {{ column.label }}
                </p>
                <icon
                  v-if="
                    pagination.sortBy === column.field &&
                      column.sortable &&
                      column.align !== 'right'
                  "
                  :name="pagination.order === 'asc' ? 'chevron-up' : 'chevron-down'"
                  class="ml-1"
                />
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-grey-4 whitespace-nowrap">
          <template v-if="processedTableData.length > 0">
            <tr v-for="(row, i) in processedTableData" :key="i" class="bg-white">
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
          </template>
          <template v-else>
            <div class="bg-white py-3 px-6 text-small">
              <p class="text-flame-dark font-medium">No data received</p>
            </div>
          </template>
        </tbody>
      </table>
    </div>
    <table-footer
      :totalRows="pagination.totalRows"
      :rowLimit="pagination.rowLimit"
      :page="pagination.page"
      @onChangePagination="onChangePagination"
    />
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import TableFooter from '@/components/molecules/TableFooter.vue';

export default {
  name: 'HelpTable',
  components: {
    Icon,
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
    pagination: {
      type: Object,
      default() {
        return {
          totalRows: 10,
          rowLimit: 10,
          page: 1,
          sortBy: '',
          order: 'asc',
        };
      },
    },
  },
  methods: {
    columnAlignment(columnName) {
      let alignment = '';
      const filtered = this.columns.filter((el) => el.field === columnName)[0];
      if (filtered.align) {
        alignment = filtered.align;
      } else {
        alignment = 'left';
      }
      return alignment;
    },
    onChangePagination(updatedPagination) {
      this.$emit('onChangePagination', updatedPagination);
    },
    sort({ field: newField, sortable }) {
      if (sortable) {
        const { order, sortBy } = this.pagination;
        let newOrder = order;
        if (newField === sortBy) {
          if (order === 'asc') {
            newOrder = 'desc';
          } else {
            newOrder = 'asc';
          }
        } else {
          newOrder = 'asc';
        }
        const updatedPagination = {
          ...this.pagination,
          sortBy: newField,
          order: newOrder,
        };
        this.$emit('sort', updatedPagination);
      }
    },
  },
  computed: {
    processedTableData() {
      // columns' field should be the same as backend API response keys
      const columnLibrary = {};

      this.columns.forEach((el) => {
        columnLibrary[el.field] = null;
      });

      const matchedByColumns = [];

      this.rows.forEach((row) => {
        const temporaryRow = { ...columnLibrary };
        for (const rowKey in row) {
          if (rowKey) {
            for (const columnName in columnLibrary) {
              if (columnName) {
                if (rowKey === columnName) {
                  temporaryRow[columnName] = row[rowKey];
                }
              }
            }
          }
        }
        matchedByColumns.push(temporaryRow);
      });

      return matchedByColumns;
    },
  },
};
</script>

<style></style>
