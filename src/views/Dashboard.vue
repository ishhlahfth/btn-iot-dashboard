<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="grid sm:grid-flow-col gap-4">
      <div class="w-full flex justify-between">
        <p class="text-heading2 font-semibold">Dashboard</p>
      </div>
      <div class="grid sm:grid-flow-col gap-2 sm:w-1/2-screen">
        <div class="grid gap-4 sm:flex sm:justify-end">
          <template v-if="!loading">
            <help-input type="date" />
            <help-icon
              name="minus"
              :class="[
                'mx-2 my-auto sm:visible',
                {
                  hidden: screenWidth < 640,
                },
              ]"
            />
            <help-input type="date" />
            <div
              :class="[
                'relative outline-none sm:ml-2',
                {
                  'w-2/5': screenWidth < 640,
                  'ml-auto': screenWidth < 640,
                },
              ]"
              :tabindex="0"
              @blur="opened = false"
            >
              <div
                class="bg-white flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
                :class="{ 'ring-2 ring-royal': opened }"
                @click="opened = !opened"
              >
                <p class="mr-2 truncate">{{ checkSelected(selected) }}</p>
                <help-icon name="selector" />
              </div>
              <help-option
                :class="{ hidden: !opened }"
                :options="options"
                :position="position"
                :selected="modelValue"
                @changeSelected="changeSelected"
              />
            </div>
          </template>
          <template v-else>
            <div class="h-8 animate-pulse bg-grey-4 sm:w-2/5 sm:ml-auto" />
            <div class="h-8 animate-pulse bg-grey-4 sm:w-2/5 sm:ml-auto" />
            <div class="h-8 animate-pulse bg-grey-4 w-2/5 ml-auto" />
          </template>
        </div>
      </div>
    </div>
    <summary-card :loading="loading" />
    <div class="grid sm:grid-flow-col gap-3">
      <help-table :footer="false" :columns="columns" :rows="rows">
        <template v-slot:body="{ column, row }">
          <div v-if="column === 'price'">{{ row.price }}</div>
        </template>
      </help-table>
      <help-table :footer="false" :columns="columns2" :rows="rows2">
        <template v-slot:body="{ column, row }">
          <div v-if="column === 'qty'">{{ row.qty }}</div>
        </template>
      </help-table>
      <help-table :footer="false" :columns="columns3" :rows="rows3">
        <template v-slot:body="{ column, row }">
          <div v-if="column === 'qty'">{{ row.qty }}</div>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
// import { VueDatePicker } from '@mathieustan/vue-datepicker';
import SummaryCard from '@/components/molecules/SummaryCard.vue';
import HelpIcon from '@/components/atoms/Icon.vue';
import HelpOption from '@/components/molecules/Option.vue';
import HelpInput from '../components/atoms/Input.vue';
import HelpTable from '../components/templates/Table.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      checkin: '',
      opened: false,
      options: ['Today', 'Yesterday', 'This Month', 'Last 7 Days', 'Last 30 Days'],
      modelValue: 'Today',
      position: ['bottom', 'right'],
      columns: [{ field: 'name', label: 'Top 10 Merchant' }, { field: 'price' }],
      columns2: [{ field: 'name', label: 'Top 10 Seller Location' }, { field: 'qty' }],
      columns3: [{ field: 'name', label: 'Top 10 Buyer Location' }, { field: 'qty' }],
      rows: [
        {
          name: 'Madam Soo Kitchen',
          price: 'Rp 92.558.000',
        },
        {
          name: 'Nasi Uduk Palagan',
          price: 'Rp 87.205.000',
        },
        {
          name: 'Arah Kopi',
          price: 'Rp 87.111.000',
        },
        {
          name: 'Chatime',
          price: 'Rp 85.258.500',
        },
      ],
      rows2: [
        {
          name: 'Kota Jakarta Selatan',
          qty: '867',
        },
        {
          name: 'Kota Jakarta Barat',
          qty: '822',
        },
        {
          name: 'Kota Bandung',
          qty: '781',
        },
        {
          name: 'Kota Tanggerang',
          qty: '726',
        },
      ],
      rows3: [
        {
          name: 'Kota Jakarta Selatan',
          qty: '912',
        },
        {
          name: 'Kota Jakarta Barat',
          qty: '840',
        },
        {
          name: 'Kota Bandung',
          qty: '773',
        },
        {
          name: 'Kota Jakarta Pusat',
          qty: '725',
        },
      ],
    };
  },
  components: {
    SummaryCard,
    HelpOption,
    HelpIcon,
    HelpInput,
    HelpTable,
  },
  computed: {
    selected: {
      get() {
        return !this.modelValue
          ? this.options.length > 0
            ? this.options[0]
            : null
          : this.modelValue;
      },
      set(value) {
        return value;
      },
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    changeSelected(newItem) {
      this.modelValue = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
    },
    checkSelected(selected) {
      let result = selected;
      if (selected && typeof selected === 'object') {
        result = selected.label;
      }
      return result;
    },
  },
};
</script>

<style></style>
