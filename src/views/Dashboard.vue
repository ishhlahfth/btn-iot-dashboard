<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="grid sm:grid-flow-col gap-4">
      <div class="w-full flex justify-between">
        <p class="text-heading2 font-semibold">Dashboard</p>
      </div>
      <div class="grid gap-2 sm:flex sm:justify-end">
        <div class="flex justify-end">
          <div class="text-xs sm:text-md w-auto h-10 sm:h-full">
            <flat-pickr
              v-model="date.start"
              :config="config"
              class="form-control text-center border rounded-md h-full w-full"
              placeholder="Select date"
              name="dateStart"
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
          <div class="text-xs sm:text-md w-auto h-10 sm:h-full">
            <flat-pickr
              v-model="date.end"
              :config="config"
              class="form-control text-center border rounded-md h-full w-full"
              placeholder="Select date"
              name="dateEnd"
              @click="showButton = true"
            />
          </div>
        </div>
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
            class="overflow-y-hidden w-auto h-screen py-0"
          />
        </div>
        <div class="flex justify-end">
          <help-button color="white" icon="search" label="OK" @click="loadSearchDate" />
        </div>
      </div>
    </div>
    <div class="grid sm:grid-cols-4 gap-4 mb-3">
      <summary-card
        :loading="loading"
        :totalTransaction="totalTransaction"
        :totalComparison="comparison"
        :paymentMethod="paymentMethod"
        :deliveryMethod="deliveryMethod"
      />
    </div>
    <div class="sm:grid sm:grid-cols-3 gap-4">
      <div>
        <help-table
          :footer="false"
          :columns="columnsMerchant"
          :rows="topTen.merchants"
          :loading="loadingMerchant"
        >
          <template v-slot:body="{ column, row }">
            <div class="justify-self-end" v-if="column === 'total'">
              Rp {{ row?.total ? row.total.toLocaleString('ID') : 0 }}
            </div>
          </template>
        </help-table>
      </div>
      <div>
        <help-table
          :footer="false"
          :columns="columnsSeller"
          :rows="topTen.seller"
          :loading="loadingMerchant"
        >
          <template v-slot:body="{ column, row }">
            <div class="justify-self-end" v-if="column === 'total'">
              {{ row?.total ? row.total.toLocaleString('ID') : 0 }}
            </div>
          </template>
        </help-table>
      </div>
      <div>
        <help-table
          :footer="false"
          :columns="columnsBuyer"
          :rows="topTen.buyer"
          :loading="loadingMerchant"
        >
          <template v-slot:body="{ column, row }">
            <div class="justify-self-end" v-if="column === 'total'">
              {{ row?.total ? row.total.toLocaleString('ID') : 0 }}
            </div>
          </template>
        </help-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
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
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      loading: {
        order: false,
        eat: false,
        delivery: false,
        commission: false,
      },
      loadingMerchant: false,
      checkin: '',
      opened: false,
      options: ['Today', 'Yesterday', 'Last 7 Days', 'This Month', 'Last 30 Days'],
      modelValue: 'Last 7 Days',
      position: ['bottom', 'left'],
      columnsMerchant: [{ field: 'name', label: 'Top 10 Merchant' }, { field: 'total' }],
      columnsSeller: [{ field: 'name', label: 'Top 10 Seller Location' }, { field: 'total' }],
      columnsBuyer: [{ field: 'name', label: 'Top 10 Buyer Location' }, { field: 'total' }],
      totalTransaction: {
        order: 0,
        eat: 0,
        delivery: 0,
        commission: 0,
      },
      comparison: {
        order: 0,
        eat: 0,
        delivery: 0,
        commision: 0,
      },
      topTen: {
        merchants: [],
        seller: [],
        buyer: [],
      },
      paymentMethod: {
        order: [],
        eat: [],
        delivery: [],
      },
      deliveryMethod: {
        order: [],
        eat: [],
        delivery: [],
      },
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
        // locale: 'ID', // locale for this instance only,
        enableTime: true,
        enableSeconds: true,
        disableMobile: 'true',
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
    async getTopTenSellerBuyer(param) {
      try {
        const {
          data: { data },
        } = await API.get(`/order/${param}-location-leader-board?end_time=${this.date.end}&start_time=${this.date.start}`);
        this.topTen[`${param}`] = data;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async getTopTenMerchants() {
      this.loadingMerchant = true;
      try {
        const {
          data: { data },
        } = await API.get(
          `/merchants-leader-board?end_time=${this.date.end}&start_time=${this.date.start}`,
        );
        this.topTen.merchants = data;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loadingMerchant = false;
    },
    async getPaymentDeliveryForDeliveryEat(method, param) {
      try {
        const {
          data: { data },
        } = await API.get(`/order/total/volume/${method}?type=${param}&start_time=${this.date.start}&end_time=${this.date.end}`);
        if (method === 'by-payment') this.paymentMethod[`${param}`] = data;
        this.deliveryMethod[`${param}`] = data;
        console.log(data, 'data payment order', param);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async getPaymentDeliveryOrder(method) {
      try {
        const {
          data: { data },
        } = await API.get(`/order/total/${method}?start_time=${this.date.start}&end_time=${this.date.end}`);
        if (method === 'by-payment') this.paymentMethod.order = data;
        this.deliveryMethod.order = data;
        console.log(data, 'data payment order');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async getTotalOrder() {
      this.loading.order = true;
      this.loading.eat = true;
      this.loading.delivery = true;
      this.loading.commision = true;
      try {
        const {
          data: { data },
        } = await API.get(
          `/order/total/count?start_time=${this.date.start}&end_time=${this.date.end}`,
        );
        this.totalTransaction.order = data.length > 0 ? data[0].totalCount : 0;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading.order = false;
      this.loading.eat = false;
      this.loading.delivery = false;
      this.loading.commision = false;
    },
    async getTotalEatDeliveryCommision(param) {
      try {
        const {
          data: { data },
        } = await API.get(
          `/order/total/volume?type=${param}&start_time=${this.date.start}&end_time=${this.date.end}`,
        );
        switch (param) {
          case 'delivery':
            console.log(data, 'coba ini apa');
            this.totalTransaction.delivery = data.length && data[0].totalTransaction ? String(data[0].totalTransaction).slice(0, -3) : 0;
            break;
          case 'eat':
            this.totalTransaction.eat = data.length && data[0].totalTransaction ? String(data[0].totalTransaction).slice(0, -3) : 0;
            break;
          default:
            this.totalTransaction.commision = data.length && data[0].totalTransaction ? String(data[0].totalTransaction).slice(0, -3) : 0;
            break;
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    generateComparasion(param) {
      if (param === 'order') return API.get(`/order/total/comparison?start_time=${this.date.start}&end_time=${this.date.end}`);
      return API.get(`/order/total/volume-comparison?start_time=${this.date.start}&end_time=${this.date.end}&type=${param}`);
    },
    changeSelected(newItem) {
      this.modelValue = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
      let date = new Date();
      const month = new Date().getMonth();
      switch (newItem) {
        case 'Today':
          date.setHours(0, 0, 0, 0);
          console.log('today', date);
          console.log('type', typeof date);
          this.date.start = typeof date === 'object' ? this.convertDateFormat(new Date(date), 'full') : date;
          break;
        case 'Yesterday':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 1);
          console.log('yesterday', date);
          console.log('type', typeof date);
          this.date.start = typeof date === 'object' ? this.convertDateFormat(new Date(date), 'full') : date;
          break;
        case 'Last 7 Days':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 7);
          console.log('7 days ago', date);
          console.log('type', typeof date);
          this.date.start = typeof date === 'object' ? this.convertDateFormat(new Date(date), 'full') : date;
          break;
        case 'Last 30 Days':
          date.setHours(0, 0, 0, 0);
          date = date.setDate(date.getDate() - 30);
          console.log('30 days ago', date);
          console.log('type', typeof date);
          this.date.start = typeof date === 'object' ? this.convertDateFormat(new Date(date), 'full') : date;
          break;
        default:
          date.setHours(0, 0, 0, 0);
          date.setMonth(month, 1);
          console.log('this month', date);
          console.log('type', typeof date);
          this.date.start = typeof date === 'object' ? this.convertDateFormat(new Date(date), 'full') : date;
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
    async loadSearchDate() {
      this.getTotalOrder();
      this.getTopTenMerchants();
      this.getTopTenSellerBuyer('seller');
      this.getTopTenSellerBuyer('buyer');
      this.getTotalEatDeliveryCommision('delivery');
      this.getTotalEatDeliveryCommision('eat');
      this.getTotalEatDeliveryCommision('commision_fee');
      this.comparison.order = await this.generateComparasion('order');
      this.comparison.eat = await this.generateComparasion('eat');
      this.comparison.delivery = await this.generateComparasion('delivery');
      this.comparison.commision = await this.generateComparasion('commision_fee');
      this.getPaymentDeliveryOrder('by-payment');
      this.getPaymentDeliveryOrder('by-delivery');
      this.getPaymentDeliveryForDeliveryEat('by-payment', 'delivery');
      this.getPaymentDeliveryForDeliveryEat('by-delivery', 'delivery');
      this.getPaymentDeliveryForDeliveryEat('by-payment', 'eat');
      this.getPaymentDeliveryForDeliveryEat('by-delivery', 'eat');
    },
    initiateSearchDate(start, end) {
      const endDate = this.convertDateFormat(new Date(start), 'full');
      const startDate = this.convertDateFormat(new Date(end), 'full');
      this.getTopTenMerchants(startDate, endDate);
    },
  },
  async mounted() {
    this.date.end = this.convertDateFormat(this.date.end, 'full');
    this.date.start = this.convertDateFormat(this.date.start, 'full');
    this.getTopTenMerchants();
    this.getTopTenSellerBuyer('seller');
    this.getTopTenSellerBuyer('buyer');
    this.getTotalOrder();
    this.getTotalEatDeliveryCommision('delivery');
    this.getTotalEatDeliveryCommision('eat');
    this.getTotalEatDeliveryCommision('commision_fee');
    this.comparison.order = await this.generateComparasion('order');
    this.comparison.eat = await this.generateComparasion('eat');
    this.comparison.delivery = await this.generateComparasion('delivery');
    this.comparison.commision = await this.generateComparasion('commision_fee');
    this.getPaymentDeliveryOrder('by-payment');
    this.getPaymentDeliveryOrder('by-delivery');
    this.getPaymentDeliveryForDeliveryEat('by-payment', 'delivery');
    this.getPaymentDeliveryForDeliveryEat('by-delivery', 'delivery');
    this.getPaymentDeliveryForDeliveryEat('by-payment', 'eat');
    this.getPaymentDeliveryForDeliveryEat('by-delivery', 'eat');
  },
};
</script>

<style></style>
