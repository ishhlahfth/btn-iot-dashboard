<template>
  <tfoot class="w-full px-6 py-2 flex items-center justify-between bg-white">
    <p class="text-small">
      <span class="hidden sm:inline">Showing </span>
      <span class="font-medium">{{ firstRow }}</span>
      to
      <span class="font-medium">{{ lastRow }}</span>
      of
      <span class="font-medium">{{ totalRows }}</span>
      <span class="hidden sm:inline"> results</span>
    </p>

    <div class="flex items-center text-small">
      <span class="hidden sm:inline mr-2">Records per page</span>
      <div class="mr-2">
        <help-select
          :options="[10, 25, 50, 100]"
          :position="['top', 'left']"
          v-model="localRowLimit"
        />
      </div>
      <div class="flex bg-white rounded-md divide-x-2 border border-grey-4">
        <div
          class="p-2 rounded-l-md"
          :class="localOffset <= 0 ? 'bg-grey-5 cursor-not-allowed' : 'cursor-pointer'"
          @click="previousPage"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            :fill="localOffset <= 0 ? '#C4C4C4' : 'currentColor'"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div
          class="p-2 rounded-r-md"
          :class="lastRow === totalRows ? 'bg-grey-5 cursor-not-allowed' : 'cursor-pointer'"
          @click="nextPage"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            :fill="lastRow === totalRows ? '#C4C4C4' : 'currentColor'"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  </tfoot>
</template>

<script>
import HelpSelect from './Select.vue';

export default {
  name: 'TableFooter',
  components: {
    HelpSelect,
  },
  props: {
    offset: {
      type: Number,
      required: true,
    },
    rowLimit: {
      type: Number,
      required: true,
    },
    totalRows: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      localRowLimit: 10,
      localOffset: 0,
    };
  },
  computed: {
    firstRow() {
      let firstRow = 0;
      if (this.totalRows !== 0) {
        firstRow = this.offset + 1;
      }
      return firstRow;
    },
    lastRow() {
      let lastRow = 0;
      const ceiledRow = this.offset + this.rowLimit;
      if (ceiledRow > this.totalRows) {
        lastRow = this.totalRows;
      } else {
        lastRow = ceiledRow;
      }
      return lastRow;
    },
  },
  watch: {
    localRowLimit(newValue) {
      this.$emit('onChangePagination', {
        rowLimit: newValue,
        offset: 0,
      });
      this.localOffset = 0;
    },
    localOffset(newValue) {
      this.$emit('onChangePagination', {
        rowLimit: this.localRowLimit,
        offset: newValue,
      });
    },
  },
  methods: {
    nextPage() {
      console.log(this.lastRow);
      console.log(this.totalRows);
      if (this.lastRow !== this.totalRows) {
        console.log('IF');
      } else {
        console.log('ELSE');
      }
      console.log(this.localOffset);
      if (this.lastRow !== this.totalRows) this.localOffset += this.rowLimit;
      console.log(this.localOffset);
    },
    previousPage() {
      if (this.localOffset >= 0) this.localOffset -= this.rowLimit;
    },
  },
  mounted() {
    this.localRowLimit = this.rowLimit;
    this.localOffset = this.offset;
  },
};
</script>

<style></style>
