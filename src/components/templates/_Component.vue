<template>
  <section :id="id" class="grid gap-8 auto-rows-max">
    <p class="text-heading2 font-semibold text-midnight">{{ title }}</p>

    <slot name="description">-</slot>

    <div class="divide-y divide-grey-4 grid gap-2">
      <p class="font-semibold">Design</p>
      <!-- <div class="flex justify-between">
        <p class="font-semibold">Design</p>
        <help-button icon-only icon="code" bg-color="transparent" color="grey-1" />
      </div> -->
      <p></p>
    </div>

    <slot name="design">-</slot>

    <div class="divide-y divide-grey-4 grid gap-2">
      <p class="font-semibold">Props</p>
      <p></p>
    </div>
    <help-table
      :footer="false"
      :columns="[
        { field: 'prop', label: 'Prop' },
        { field: 'description', label: 'Description' },
        { field: 'type', label: 'Type' },
        { field: 'default', label: 'Default' },
        { field: 'examples', label: 'Examples' },
      ]"
      :rows="props"
    >
      <template v-slot:body="{ column, row }">
        <div v-if="column === 'examples'">
          <code
            v-for="(example, index) in row.examples"
            :key="index"
            class="rounded bg-grey-4 bg-opacity-50 mr-1 px-2"
          >
            {{ example }}
          </code>
        </div>
      </template>
    </help-table>
  </section>
</template>

<script>
// import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Component',
  props: ['id', 'title', 'props'],
  components: {
    // HelpButton,
    HelpTable,
  },
};
</script>

<style></style>
