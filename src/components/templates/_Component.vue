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
            class="highlight mr-1"
          >
            {{ example }}
          </code>
        </div>
      </template>
    </help-table>

    <template v-if="events?.length">
      <div class="divide-y divide-grey-4 grid gap-2">
        <p class="font-semibold">Events</p>
        <p></p>
      </div>
      <help-table
        :footer="false"
        :columns="[
          { field: 'event', label: 'Events' },
          { field: 'description', label: 'Description' },
          { field: 'parameters', label: 'Parameters' },
        ]"
        :rows="events"
      >
        <template v-slot:body="{ column, row }">
          <ol class="list-disc list-outside" v-if="column === 'parameters'">
            <li v-for="(param, index) in row.parameters" :key="index">
              <span class="highlight mr-1">{{ param.name }}</span>:
              <span>{{ param.param }}</span>
            </li>
          </ol>
        </template>
      </help-table>
    </template>

    <template v-if="slots?.length">
      <div class="divide-y divide-grey-4 grid gap-2">
        <p class="font-semibold">Slots</p>
        <p></p>
      </div>
      <help-table
        :footer="false"
        :columns="[
          { field: 'slot', label: 'slot name' },
          { field: 'description', label: 'description' },
          { field: 'props', label: 'slot props' },
        ]"
        :rows="slots"
      >
        <template v-slot:body="{ column, row }">
          <ol class="list-disc list-outside" v-if="column === 'props'">
            <li v-for="(prop, index) in row.props" :key="index">
              <span class="highlight mr-1">{{ prop.name }}</span>:
              <span>{{ prop.definition }}</span>
            </li>
          </ol>
        </template>
      </help-table>
    </template>

    <div v-if="hasUpdateGuideSlot" class="divide-y divide-grey-4 grid gap-2">
      <p class="font-semibold">Update Guide</p>
      <p></p>
    </div>
    <slot name="update-guide"></slot>
  </section>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Component',
  props: ['id', 'title', 'props', 'events', 'slots'],
  components: {
    HelpTable,
  },
  computed: {
    hasUpdateGuideSlot() {
      return !!this.$slots['update-guide'];
    },
  },
};
</script>

<style></style>
