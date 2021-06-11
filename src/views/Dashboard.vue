<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="grid sm:grid-flow-col gap-4">
      <div class="w-full flex justify-between">
        <p class="text-heading2 font-semibold">Dashboard</p>
      </div>
      <div class="grid sm:grid-flow-col gap-2 sm:w-1/2-screen">
        <div class="grid gap-4 sm:flex sm:justify-end">
          <template v-if="!loading">
            <div>
              <flat-pickr
                v-model="date.start"
                :config="config"
                class="form-control text-center border rounded-md h-full w-full"
                placeholder="Select date"
                name="date"
                @click="showButton = true"
              />
            </div>
            <help-icon
              name="minus"
              :class="[
                'mx-2 my-auto sm:visible',
                {
                  hidden: screenWidth < 640,
                },
              ]"
            />
            <div>
              <flat-pickr
                v-model="date.end"
                :config="config"
                class="form-control text-center border rounded-md h-full w-full"
                placeholder="Select date"
                name="date"
                @click="showButton = true"
              />
            </div>
            <help-button color="white" icon="search" label="OK" @click="loadSearchDate" />
            <div
              :class="[
                'relative outline-none',
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
                class="overflow-y-hidden h-screen py-0"
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
    <div class="grid sm:grid-flow-col gap-4 mb-3">
      <summary-card :loading="loading" />
    </div>
    <div class="grid grid-cols-3 gap-4">
      <div>
        <help-table
          :footer="false"
          :columns="columns"
          :rows="topTenMerchants"
          :loading="loadingMerchant"
        >
          <template v-slot:body="{ column, row }">
            <div class="justify-self-end" v-if="column === 'total'">
              Rp {{ row?.total ? row.total.toLocaleString('ID') : 0 }}
            </div>
          </template>
        </help-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import SummaryCard from '@/components/molecules/SummaryCard.vue';
import HelpIcon from '@/components/atoms/Icon.vue';
import HelpOption from '@/components/molecules/Option.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';
import API from '@/apis';
import mixin from '@/mixin';

export default {
  name: 'Dashboard',
  mixins: [mixin],
  data() {
    return {
      loading: false,
      loadingMerchant: false,
      checkin: '',
      opened: false,
      options: ['Today', 'Yesterday', 'This Month', 'Last 7 Days', 'Last 30 Days'],
      modelValue: 'Last 7 Days',
      position: ['bottom', 'left'],
      columns: [{ field: 'name', label: 'Top 10 Merchant' }, { field: 'total' }],
      topTenMerchants: [],
      date: {
        start: ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        end: ref(new Date()),
      },
      showButton: false,
      // Get more form https://flatpickr.js.org/options/
      config: {
        wrap: true, // set wrap to true only when using 'input-group'
        // altFormat: 'y M D',
        // altInput: true,
        // dateFormat: 'y-m-d h:m:s',
        locale: 'ID', // locale for this instance only,
        enableTime: true,
      },
    };
  },
  components: {
    SummaryCard,
    HelpOption,
    HelpIcon,
    HelpButton,
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
      let date = new Date();
      const month = new Date().getMonth();
      switch (newItem) {
        case 'Today':
          date.setHours(0, 0, 0, 0);
          this.date.start = this.convertDateFormat(new Date(date), 'full');
          break;
        case 'Yesterday':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 1);
          this.date.start = this.convertDateFormat(new Date(date), 'full');
          break;
        case 'Last 7 Days':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 7);
          this.date.start = this.convertDateFormat(new Date(date), 'full');
          break;
        case 'Last 30 Days':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 30);
          this.date.start = this.convertDateFormat(new Date(date), 'full');
          break;
        default:
          date.setHours(0, 0, 0, 0);
          date.setMonth(month, 1);
          this.date.start = this.convertDateFormat(new Date(date), 'full');
          break;
      }
    },
    checkSelected(selected) {
      let result = selected;
      if (selected && typeof selected === 'object') {
        result = selected.label;
      }
      return result;
    },
    loadSearchDate() {
      const endDate = this.convertDateFormat(new Date(this.date.end), 'full');
      const startDate = this.convertDateFormat(new Date(this.date.start), 'full');
      console.log(startDate, 'start date');
      this.getTopTenMerchants(startDate, endDate);
    },
    initiateSearchDate(start, end) {
      const endDate = this.convertDateFormat(new Date(start), 'full');
      const startDate = this.convertDateFormat(new Date(end), 'full');
      this.getTopTenMerchants(startDate, endDate);
    },
    async getTopTenMerchants(startDate, endDate) {
      console.log('masukkkk');
      this.loadingMerchant = true;
      try {
        console.log('masuk try');
        console.log(this.date.start, 'date start');
        console.log(this.date.end, 'date end');
        const {
          data: { data },
        } = await API.get(`/merchants-leader-board?end_time=${endDate}&start_time=${startDate}`);
        console.log(data, 'ini data');
        this.topTenMerchants = data;
      } catch (error) {
        console.log('masuk error', error);
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loadingMerchant = false;
    },
  },
  mounted() {
    const endDate = this.convertDateFormat(this.date.end, 'full');
    const startDate = this.convertDateFormat(this.date.start, 'full');
    this.getTopTenMerchants(startDate, endDate);
  },
};
</script>

<style></style>
