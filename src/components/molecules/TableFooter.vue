<template>
  <tfoot class="w-full px-6 py-2 flex items-center justify-between">
    <p class="text-small">
      Showing
      <span class="font-medium">1</span>
      to
      <span class="font-medium">10</span>
      of
      <span class="font-medium">117.390</span>
      results
    </p>

    <div class="flex items-center text-small">
      <span class="mr-2">Records per page</span>
      <div class="mr-2">
        <help-select :options="[10, 25, 50, 100]" />
      </div>
      <div class="flex bg-white rounded-md divide-x-2 border border-grey-4">
        <div class="p-2">
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div class="p-2">
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
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
};
</script>

<style></style>
