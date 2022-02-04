<template>
  <div class="overflow-x-auto overflow-y-hidden rounded-lg border border-grey-4 divide-y-2">
    <div class="overflow-x-auto" :class="heightClass">
      <table class="min-w-full bg-white">
        <thead class="border-b border-grey-4 whitespace-nowrap min-w-full">
          <tr class="bg-white uppercase">
            <th
              v-for="(column, i) in columns"
              :key="i"
              class="py-3 px-6 text-small font-medium text-grey-2"
            >
              <div
                class="flex select-none"
                v-if="column.field !== 'id'"
                :class="[
                  { 'text-grey-1': pagination.sort === column.field },
                  { 'hover:opacity-50 cursor-pointer': column.sortable },
                  { 'justify-center': column.align === 'center' },
                  { 'justify-end': column.align === 'right' },
                ]"
                @click="sort(column)"
              >
                <slot name="header" :column="column">
                  <!-- default, when there is no slot -->
                  <icon
                    v-if="
                      pagination.sort === column.field &&
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
                      pagination.sort === column.field &&
                        column.sortable &&
                        column.align !== 'right'
                    "
                    :name="pagination.order === 'asc' ? 'chevron-up' : 'chevron-down'"
                    class="ml-1"
                  />
                </slot>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-grey-4 whitespace-nowrap">
          <template v-if="!loading">
            <template v-if="processedTableData.length > 0">
              <tr v-for="(row, i) in processedTableData" :key="i" class="bg-white">
                <template v-for="(data, i) in row" :key="i">
                  <td v-if="matchColumn(i)" class="py-3 px-6 text-small text-grey-2">
                    <div
                      class="w-full grid"
                      :class="[
                        { 'place-items-center': columnAlignment(i) === 'center' },
                        { 'place-items-end': columnAlignment(i) === 'right' },
                      ]"
                    >
                      <slot name="body" :column="i" :row="row" :data="data">
                        <!-- default, when there is no slot -->
                        <p>{{ data }}</p>
                      </slot>
                    </div>
                  </td>
                </template>
              </tr>
            </template>
            <template v-else>
              <div class="bg-white py-3 px-6 text-small">
                <p class="text-flame-dark font-medium">No data received</p>
              </div>
            </template>
          </template>
          <template v-else>
            <tr v-for="i in 10" :key="i">
              <template v-for="(column, i) in columns" :key="i">
                <td class="py-3 px-6">
                  <div class="rounded h-4 bg-grey-4 animate-pulse"></div>
                </td>
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <table-footer
      v-if="footer"
      :limit="pagination.limit"
      :offset="pagination.offset"
      :sort="pagination.sort"
      :order="pagination.order"
      :more-data-available="moreDataAvailable"
      :current-row-count="rows.length"
      :count="count"
      :isCountActive="isCountActive"
      @onChangePagination="onChangePagination"
    />
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import Icon from '@/components/atoms/Icon.vue';
import TableFooter from '@/components/molecules/TableFooter.vue';
import API from '../../apis';

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
    isCountActive: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: 0,
    },
    pagination: {
      type: Object,
      default() {
        return {
          limit: 10,
          offset: 0,
          sort: '',
          order: 'asc',
        };
      },
    },
    path: {
      type: String,
      // required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    height: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      nextArrayIsEmpty: false,
    };
  },
  methods: {
    columnAlignment(columnName) {
      let alignment = '';

      const filtered = this.columns.filter((el) => el.field === columnName)[0];
      if (filtered && filtered.hasOwnProperty('align')) {
        if (filtered.align) {
          alignment = filtered.align;
        } else {
          alignment = 'left';
        }
      }
      return alignment;
    },
    onChangePagination(updatedPagination) {
      this.$emit('onChangePagination', updatedPagination);
    },
    sort({ field: newField, sortable }) {
      if (sortable) {
        const { order, sort } = this.pagination;
        let newOrder = order;
        if (newField === sort) {
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
          sort: newField,
          order: newOrder,
        };
        this.$emit('sort', updatedPagination);
      }
    },
    matchColumn(columnName) {
      // match looped column with existing column name
      const columnLibrary = this.columns.map((el) => el.field);
      if (columnLibrary.includes(columnName)) {
        return true;
      }
      return false;
    },
  },
  computed: {
    processedTableData() {
      // add new keys based on column name with null value
      const columnLibrary = {};
      for (let i = 0; i < this.columns.length; i += 1) {
        columnLibrary[this.columns[i].field] = null;
      }

      // override value if key already exists
      const matchedByColumns = [];
      for (let i = 0; i < this.rows.length; i += 1) {
        matchedByColumns.push({ ...columnLibrary, ...this.rows[i] });
      }

      return matchedByColumns;
    },
    moreDataAvailable() {
      if (this.rows.length < this.pagination.limit || this.nextArrayIsEmpty) {
        return false;
      }
      return true;
    },
    heightClass() {
      return this.height ? `h-${this.height} overflow-y-auto` : '';
    },
  },
  watch: {
    async rows() {
      // fetch next page to define whether there is more row or not
      const limit = this.pagination.limit || 10;
      const offset = this.pagination.offset || 0;

      if (this.path) {
        try {
          const {
            data: { data },
          } = await API.get(`${this.path}?offset=${offset + limit}&limit=${limit}`);

          if (data.length === 0) {
            this.nextArrayIsEmpty = true;
          } else {
            this.nextArrayIsEmpty = false;
          }
        } catch (error) {
          this.toast.error(error.message);
        }
      }
    },
  },
};
</script>

<style></style>
