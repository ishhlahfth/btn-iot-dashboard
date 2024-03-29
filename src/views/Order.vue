<template>
  <help-modal v-model="detailModal">
    <order-detail />
  </help-modal>

  <help-modal v-model="filterModal">
    <order-filter :filter="orderFilter" @apply="applyFilter" @close="filterModal = false" />
  </help-modal>

  <help-modal v-model="statusHistoryModal">
    <status-history @close="closeAndRefetch" :currentPropStep="currentPropStep" :updateAccess="orderAccess.update" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Order</p>
      <div class="grid grid-flow-col gap-2">
        <help-button label="filter" icon="filter" @click="filterModal = true" />
        <export-excel
          :fetch="checkExportLimit"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Order_${namingStart}-${namingEnd}.xls`"
        >
          <help-button class="h-full" label="export" />
        </export-excel>
      </div>
    </div>
    <div>
      <form @submit.prevent="getOrders({ filter: orderFilter })">
        <help-input v-model="searchValue" placeholder="Search order PO number here" search-bar />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="orders"
        :columns="columns"
        :loading="loading"
        :rows="orders"
        :pagination="orderPagination"
        :count="count"
        :isCountActive="true"
        @onChangePagination="getOrders({ pagination: $event, filter: orderFilter })"
        @sort="getOrders({ pagination: $event, filter: orderFilter })"
      >
        <template v-slot:body="{ column, row }">
          <help-badge
            class="cursor-pointer"
            v-if="column === 'current_step'"
            :label="row.current_step"
            :color="
              row.current_step === 'Pesanan Selesai'
                ? 'positive'
                : row.current_step === 'Menunggu Konfirmasi' ||
                  row.current_step === 'Menunggu Pembayaran' ||
                  row.current_step === 'Mengajukan Komplain' ||
                  row.current_step === 'Sedang Dikirim' ||
                  row.current_step === 'Pesanan Tiba'
                ? 'warning'
                : 'negative'
            "
            @click="openStatusHistory({ id: row.id, merchantId: row.merchant_id, currentStep: row.current_step })"
          />
          <p v-if="column === 'type'">
            {{ row.order_category }}
          </p>
          <p
            v-if="column === 'detail'"
            class="text-royal font-medium cursor-pointer"
            @click="openOrderDetail(row.id)"
          >
            See Detail
          </p>
          <p v-if="column === 'discounts'" class="text-flame font-semibold">
            {{ row.discounts ? `- Rp ${Number(row.discounts.slice(1)).toLocaleString('ID')}` : '' }}
          </p>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import Moment from 'moment/moment';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import OrderDetail from '@/components/modals/OrderDetail.vue';
import OrderFilter from '@/components/modals/OrderFilter.vue';
import StatusHistory from '@/components/modals/StatusHistory.vue';
import mixin from '@/mixin';
import API from '../apis';

export default {
  name: 'Order',
  mixins: [mixin],
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    OrderDetail,
    OrderFilter,
    StatusHistory,
  },
  setup() {
    const toast = useToast();
    const pickedStart = ref();
    const pickedEnd = ref();

    return {
      toast,
      pickedStart,
      pickedEnd,
    };
  },
  data() {
    const min = new Date();
    min.setDate(min.getDate() - 7);
    min.setHours(9);
    min.setMinutes(0);
    min.setSeconds(0);
    const max = new Date();
    max.setDate(max.getDate() + 7);
    max.setHours(18);
    max.setMinutes(0);
    max.setSeconds(0);
    return {
      currentPropStep: '',
      exportLimit: 31,
      searchValue: '',
      columns: [
        { field: 'date', label: 'order date', sortable: true },
        { field: 'code', label: 'po number', align: 'center' },
        { field: 'type', label: 'order type' },
        {
          field: 'current_step',
          label: 'status',
          align: 'center',
          sortable: true,
        },
        { field: 'merchant_name', label: 'merchant name', sortable: true },
        { field: 'customer_name', label: 'buyer name', sortable: true },
        { field: 'subtotal_price', label: 'item price' },
        { field: 'commission_fee', label: 'commission' },
        { field: 'initial_price', label: 'delivery price' },
        { field: 'discounts', label: 'discount' },
        { field: 'service_fee', label: 'service fee' },
        { field: 'payment_method', label: 'payment method', sortable: true },
        { field: 'grand_total', label: 'grand total', sortable: false },
        { field: 'detail', label: 'detail', align: 'center' },
      ],
      transferMode: false,
      date: '',
      namingStart: '',
      namingEnd: '',
      orders: [],
      exportOrders: [],
      orderPagination: {
        limit: 10,
        offset: 0,
        sort: 'date',
        order: 'desc',
      },
      orderFilter: {
        orderStatus: '',
        paymentMethod: '',
        merchantName: '',
        selectedStart: '',
        selectedEnd: '',
      },
      appliedFilter: {
        orderStatus: '',
        paymentMethod: '',
        merchantName: '',
        selectedStart: '',
        selectedEnd: '',
      },
      loading: false,
      detailModal: false,
      filterModal: false,
      statusHistoryModal: false,
      count: 0,
      sDate: null,
      configStart: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'Y-m-d',
        altInput: true,
        maxDate: '',
        dateFormat: 'Y-m-d',
      },
      configEnd: {
        wrap: true, // set wrap to true only when using 'input-group'
        altFormat: 'Y-m-d',
        altInput: true,
        minDate: '',
        dateFormat: 'Y-m-d',
      },
      orderAccess: {
        update: false,
      },
    };
  },
  methods: {
    async getNumRows({
      offset, limit, sort, order, search, filter,
    }) {
      let startDate;
      let endDate;
      let url = `/orders/count/num-rows?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`;
      if (filter?.selectedStart) {
        startDate = Moment(filter?.selectedStart).format('YYYY-MM-D');
      }
      if (filter?.selectedEnd) {
        endDate = Moment(filter?.selectedEnd).format('YYYY-MM-D');
      }
      if (startDate && endDate) {
        url += `&summary_date_range=${startDate}to-${endDate}`;
      }
      if (filter?.paymentMethod) url += `&payment_method=${filter?.paymentMethod}`;
      if (filter?.merchantName) url += `&merchant=${filter?.merchantName}`;
      if (filter?.orderStatus) url += `&sequence=${filter?.orderStatus}`;
      try {
        const {
          data: { data },
        } = await API.get(url);
        this.count = data;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async getOrders({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'date';
      const order = pagination?.order || 'desc';
      const search = this.searchValue || '';
      let startDate;
      let endDate;

      this.getNumRows({
        offset, limit, sort, order, search, filter,
      });

      let url = `orders?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&code=${search}`;
      if (filter?.selectedStart) {
        startDate = Moment(filter?.selectedStart).format('YYYY-MM-D');
      }
      if (filter?.selectedEnd) {
        endDate = Moment(filter?.selectedEnd).format('YYYY-MM-D');
      }

      if (startDate && endDate) {
        url += `&summary_date_range=${startDate}to-${endDate}`;
      }

      if (filter?.paymentMethod) url += `&payment_method=${filter?.paymentMethod}`;
      if (filter?.merchantName) url += `&merchant=${filter?.merchantName}`;
      if (filter?.orderStatus) url += `&sequence=${filter?.orderStatus}`;

      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(url);

        this.orders = data.map((el) => ({
          id: el.id,
          merchant_id: el.merchant_id,
          code: el.code,
          date: dayjs(el.date).format('DD-MM-YYYY HH:mm:ss') || '-',
          current_step: el.current_step.title,
          merchant_name: el.merchant?.name,
          customer_name: el.customer?.profile?.name,
          order_category: el.order_category,
          commission_fee: this.convertToRp(el.commission_fee),
          subtotal_price: this.convertToRp(el.subtotal_price),
          payment_method: el.payment?.name,
          discounts: el.discounts
            ? String(el.discounts?.total)
            : '',
          initial_price: this.convertToRp(el.order_type_details?.delivery_method?.initial_price),
          service_fee: this.convertToRp(el.order_type_details?.delivery_method?.service_fee),
          grand_total: el.order_type === 'Delivery' ? this.convertToRp((el.subtotal_price + el.order_type_details?.delivery_method?.initial_price + el.order_type_details?.delivery_method?.service_fee) - (Math.abs(el.discounts ? el.discounts.total : 0))) : this.convertToRp(el.subtotal_price),
        }));

        this.orderPagination = {
          limit,
          offset,
          sort,
          order,
        };
        this.orderFilter = filter;
        if (!this.checkObjectBlank(filter)) {
          this.getExportedOrder(this.appliedFilter);
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    async getExportedOrder(filter) {
      const sort = 'date';
      const order = 'desc';
      const search = this.searchValue || '';
      let startDate;
      let endDate;

      let url = `orders?&sort=${sort}&order=${order}&code=${search}`;
      if (filter?.selectedStart) {
        startDate = Moment(filter?.selectedStart).format('YYYY-MM-D');
      }
      if (filter?.selectedEnd) {
        endDate = Moment(filter?.selectedEnd).format('YYYY-MM-D');
      }
      if (startDate && endDate) {
        url += `&summary_date_range=${startDate}to-${endDate}`;
      }
      if (filter?.paymentMethod) url += `&payment_method=${filter?.paymentMethod}`;
      if (filter?.merchantName) url += `&merchant=${filter?.merchantName}`;
      if (filter?.orderStatus) url += `&sequence=${filter?.orderStatus}`;

      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(url);

        this.exportOrders = data.map((el) => ({
          id: el.id,
          delivery_po_number: el.delivery_code,
          merchant_id: el.merchant_id,
          code: el.code,
          delivery_type: el.order_type_details?.delivery_method?.name,
          date: dayjs(el.date).format('DD-MM-YYYY HH:mm:ss') || '-',
          current_step: el.current_step.title,
          merchant_name: el.merchant?.name,
          customer_name: el.customer?.profile?.name,
          item_price: this.convertToRp(el.subtotal_price),
          commission: this.convertToRp(el.commission_fee),
          delivery_price: this.convertToRp(el.order_type_details?.delivery_method?.initial_price),
          discount: el.discounts?.total
            ? String(el.discounts?.total)
            : '0',
          service_fee: el.order_type_details?.delivery_method?.service_fee,
          grand_total: el.order_type === 'Delivery' ? (el.subtotal_price + el.order_type_details?.delivery_method?.initial_price + el.order_type_details?.delivery_method?.service_fee) - (Math.abs(el.discounts ? el.discounts.total : 0)) : el.subtotal_price,
          payment_method: el.payment.name,
        }));
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    showStartExportToast() {
      this.toast.success('Exporting Report...');
    },
    showFinishExportToast() {
      this.toast.success('Finished Exporting, Download in progress...');
    },
    openOrderDetail(orderId) {
      this.detailModal = true;
      this.$store.commit('SET_ORDER_ID', orderId);
    },
    openStatusHistory({ id, merchantId, currentStep }) {
      this.currentPropStep = currentStep;
      this.statusHistoryModal = true;
      this.$store.commit('SET_ORDER_ID', id);
      this.$store.commit('SET_MERCHANT_ID', merchantId);
    },
    applyFilter($event) {
      const pagination = {
        ...this.orderPagination,
        offset: 0,
      };
      const filter = {
        ...this.orderFilter,
        paymentMethod: $event.paymentMethod,
        merchantName: $event.merchantName,
        orderStatus: $event.orderStatus,
        selectedStart: $event.selectedStart,
        selectedEnd: $event.selectedEnd,
      };
      this.appliedFilter = filter;
      this.namingStart = Moment(this.appliedFilter.selectedStart).format('D-MM-YYYY');
      this.namingEnd = Moment(this.appliedFilter.selectedEnd).format('D-MM-YYYY');
      this.getOrders({ pagination, filter });
      this.filterModal = false;
    },
    closeAndRefetch() {
      this.statusHistoryModal = false;
      this.getOrders({
        pagination: this.orderPagination,
        filter: this.orderFilter,
      });
    },
    changeEndMin(date) {
      this.configEnd.minDate = date;
    },
    changeEndStart(date) {
      this.configStart.maxDate = date;
    },
    checkExportLimit() {
      const exportEndDate = Moment(this.appliedFilter.selectedEnd);
      const exportStartDate = this.appliedFilter.selectedStart
        ? Moment(this.appliedFilter.selectedStart)
        : Moment(this.appliedFilter.selectedEnd).subtract(this.exportLimit + 1, 'd');
      const difference = Math.abs(exportEndDate.diff(exportStartDate, 'days'));
      if (difference > this.exportLimit) {
        this.toast.error(
          `You can only export the data with maximum ${this.exportLimit} days date range.`,
        );
      } else if (Number.isNaN(difference)) {
        this.toast.error(
          `You can only export the data with maximum ${this.exportLimit} days date range.`,
        );
      } else {
        return this.exportOrders;
      }
      return null;
    },
  },
  async mounted() {
    this.getOrders({
      pagination: this.orderPagination,
      filter: this.orderFilter,
    });
    this.$store.state.access.access.permissions.forEach((el) => {
      if (el.module === 'ORDER-TYPE' && el.action === 'UPDATE') {
        this.orderAccess.update = true;
      }
    });
  },
};
</script>
