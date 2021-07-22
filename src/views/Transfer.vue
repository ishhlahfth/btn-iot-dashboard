<template>
  <help-modal v-model="confirmTransferModal" permanent>
    <confirmation
      title="Transfer confirmation"
      :message="
        `Are you sure you want to transfer to the selected orders with total amount of
         ${convertToRp(totalAmount)}? This action cannot be undone`
      "
      :confirm-loading="conductTransferLoading"
      loading-label="transfering"
      @close="confirmTransferModal = false"
      @cancel="confirmTransferModal = false"
      @confirm="conductTransfer"
    />
  </help-modal>

  <help-modal v-model="filterModal">
    <transfer-filter :filter="transferFilter" @apply="applyFilter" @close="filterModal = false" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Transfer</p>
      <div class="grid grid-flow-col gap-4">
        <div v-if="transferAccess.update" class="grid grid-flow-col gap-4">
          <help-button
            v-if="!transferMode"
            label="transfer"
            icon="switch-horizontal"
            @click="transferMode = true"
          />
          <template v-else>
            <help-button label="cancel" bg-color="flame" @click="transferMode = false" />
            <help-button label="transfer" bg-color="mint" @click="confirmTransferModal = true" />
          </template>
        </div>
        <help-button label="filter" icon="filter" @click="filterModal = true" />
        <export-excel
          :fetch="exportTransfer"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Transfer_${appliedFilter.merchantName}.xls`"
        >
          <help-button class="h-full" label="export" />
        </export-excel>
      </div>
    </div>
    <div>
      <form @submit.prevent="getTransferData({ filter: transferFilter })">
        <help-input v-model="searchValue" placeholder="Search order PO number here" search-bar />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="transfer-queues"
        :columns="columns"
        :loading="loading"
        :rows="transfers"
        :pagination="transferPagination"
        :count="count"
        :isCountActive="true"
        @onChangePagination="getTransferData({ pagination: $event, filter: transferFilter })"
        @sort="getTransferData({ pagination: $event, filter: transferFilter })"
      >
        <template v-slot:header="{ column: { field } }">
          <help-checkbox
            v-if="field === 'is_checked'"
            v-model:checked="checkAll"
            @click="toggleAll"
          />
        </template>
        <template v-slot:body="{ column, row, data }">
          <template v-if="column === 'is_checked'">
            <help-checkbox
              v-if="row.transfer_status !== 'SUCCESS'"
              v-model:checked="row.is_checked.val"
            />
            <div v-else class="h-5 w-5"></div>
          </template>
          <help-badge
            v-if="column === 'transfer_status'"
            :label="row.transfer_status"
            :color="
              row.transfer_status === 'SUCCESS'
                ? 'positive'
                : row.transfer_status === 'PENDING'
                ? 'warning'
                : 'negative'
            "
          />
          <code class="bg-grey-6" v-if="column === 'result_logs'">{{ row.result_logs }}</code>
          <p v-if="column === 'amount'">{{ convertToRp(data) }}</p>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import Confirmation from '@/components/modals/Confirmation.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';
import TransferFilter from '@/components/modals/TransferFilter.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '../apis';

export default {
  name: 'Transfer',
  mixins: [mixin],
  components: {
    Confirmation,
    HelpBadge,
    HelpButton,
    HelpCheckbox,
    HelpModal,
    HelpInput,
    HelpTable,
    TransferFilter,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchValue: '',
      transferMode: false,
      transfers: [],
      exportedTransfer: [],
      transferPagination: {
        limit: 10,
        offset: 0,
        sort: 'order_date',
        order: 'desc',
      },
      transferFilter: {
        merchantName: '',
      },
      appliedFilter: {},
      loading: false,
      checkAll: false,
      confirmTransferModal: false,
      filterModal: false,
      count: 0,
      transferAccess: {
        update: false,
      },
    };
  },
  computed: {
    columns() {
      const columns = [
        { field: 'order_date', label: 'order date', sortable: true },
        { field: 'code', label: 'po number' },
        { field: 'transfer_date', label: 'transfer date', sortable: true },
        {
          field: 'transfer_status',
          label: 'transfer status',
          align: 'center',
          sortable: true,
        },
        { field: 'merchant_name', label: 'merchant name', sortable: true },
        { field: 'customer_name', label: 'buyer name' },
        { field: 'amount', label: 'transfer amount' },
        { field: 'subtotal_price', label: 'item price' },
        { field: 'commission_fee', label: 'commission' },
        { field: 'delivery_price', label: 'delivery price' },
        { field: 'payment_method', label: 'payment method', sortable: true },
        { field: 'transfer_by', label: 'transfered by' },
        { field: 'result_logs', label: 'log' },
        // { field: 'detail', label: 'detail', align: 'center' },
      ];
      if (this.transferMode) {
        columns.unshift({ field: 'is_checked', label: 'checkbox', align: 'center' });
      }
      return columns;
    },
    queue() {
      return this.transfers.filter((el) => el.is_checked.val);
    },
    totalAmount() {
      let sumTransferAmount = 0;
      for (let i = 0; i < this.queue.length; i += 1) {
        sumTransferAmount += this.queue[i].amount;
      }
      return sumTransferAmount;
    },
    conductTransferLoading() {
      return this.$store.state.loading.conductTransfer;
    },
  },
  methods: {
    async getNumRows({
      offset, limit, sort, order, search, filter,
    }) {
      // eslint-disable-next-line max-len
      let url = `/transfer-queues/count/num-rows?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&order_code=${search}`;
      if (filter?.merchantName) url += `&merchant_name=${filter?.merchantName}`;
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
    async getTransferData({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'order_date';
      const order = pagination?.order || 'desc';
      const search = this.searchValue || '';

      this.getNumRows({
        offset,
        limit,
        sort,
        order,
        search,
        filter,
      });

      let url = `transfer-queues?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&order_code=${search}`;

      if (filter?.merchantName) url += `&merchant_name=${filter?.merchantName}`;

      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(url);

        this.transfers = data.map((el) => ({
          id: el.id,
          amount: el.amount,
          order_date: dayjs(el.order.date).format('DD-MM-YYYY HH:mm:ss'),
          code: el.order?.code,
          transfer_status: el.order?.transfer_status,
          result_logs: JSON.stringify(el.result_logs, null, 2),
          merchant_name: el.order?.merchant.name,
          customer_name: el.order?.customer?.name,
          subtotal_price: this.convertToRp(el.order?.subtotal_price),
          commission_fee: this.convertToRp(el.order?.commission_fee),
          delivery_price: this.convertToRp(el.order?.delivery_fee),
          payment_method: el.order?.payment_method,
          transfer_date: dayjs(el.transfer_date).format('DD-MM-YYYY HH:mm:ss'),
          transfer_by: el.transfer_by,
          is_checked: el.order?.transfer_status !== 'SUCCESS' ? { val: false } : { val: null },
        }));

        this.transferPagination = {
          limit,
          offset,
          sort,
          order,
        };
        this.transferFilter = filter;

        if (this.checkObjectBlank(filter)) {
          this.getExportedTransferData({
            pagination: this.transferPagination,
            filter: this.appliedFilter,
          });
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
    async getExportedTransferData({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'order_date';
      const order = pagination?.order || 'desc';
      const search = this.searchValue || '';

      let url = `transfer-queues?sort=${sort}&order=${order}&order_code=${search}`;

      if (filter?.merchantName) url += `&merchant_name=${filter?.merchantName}`;

      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(url);

        this.exportedTransfer = data.map((el) => ({
          id: el.id,
          amount: el.amount,
          order_date: dayjs(el.order.date).format('DD-MM-YYYY HH:mm:ss'),
          code: el.order?.code,
          transfer_status: el.order?.transfer_status,
          merchant_name: el.order?.merchant.name,
          customer_name: el.order?.customer?.name,
          subtotal_price: this.convertToRp(el.order?.subtotal_price),
          commission_fee: this.convertToRp(el.order?.commission_fee),
          delivery_price: this.convertToRp(el.order?.delivery_fee),
          payment_method: el.order?.payment_method,
          transfer_date: dayjs(el.transfer_date).format('DD-MM-YYYY HH:mm:ss'),
          transfer_by: el.transfer_by,
        }));

        this.transferPagination = {
          limit,
          offset,
          sort,
          order,
        };
        this.transferFilter = filter;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error('Error: Check your network');
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    async conductTransfer() {
      try {
        this.$store.commit('SET_LOADING', { type: 'conductTransfer', payload: true });
        if (this.queue.length) {
          for (let i = 0; i < this.queue.length; i += 1) {
            // const {
            //   data: { data },
            // } =
            await API.post(`transfer-queues/${this.queue[i].id}/retry`, {});
            this.toast.success('Transfer success !');
          }
        }
        this.$store.commit('SET_LOADING', { type: 'conductTransfer', payload: false });
        this.getTransferData({
          pagination: this.transferPagination,
          filter: this.transferFilter,
        });
        this.confirmTransferModal = false;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
          this.$store.commit('SET_LOADING', { type: 'conductTransfer', payload: false });
          this.confirmTransferModal = false;
        } else {
          this.toast.error(error.message);
          this.$store.commit('SET_LOADING', { type: 'conductTransfer', payload: false });
          this.confirmTransferModal = false;
        }
      }
    },
    toggleAll() {
      for (let i = 0; i < this.transfers.length; i += 1) {
        if (this.transfers[i].is_checked.val !== null) {
          this.transfers[i].is_checked.val = !this.checkAll;
        }
      }
    },
    applyFilter($event) {
      const pagination = {
        ...this.transferPagination,
        offset: 0,
      };
      const filter = {
        ...this.transferFilter,
        merchantName: $event.merchantName,
      };
      this.appliedFilter = filter;
      this.getTransferData({ pagination, filter });
      this.filterModal = false;
    },
    exportTransfer() {
      return this.exportedTransfer;
    },
    changeEndMin(date) {
      this.configEnd.minDate = date;
    },
    changeEndStart(date) {
      this.configStart.maxDate = date;
    },
  },
  async mounted() {
    this.getTransferData({
      pagination: this.transferPagination,
      filter: this.transferFilter,
    });
    this.$store.state.access.access.permissions.forEach((el) => {
      if (el.module === 'TRANSFER_QUEUES' && el.action === 'UPDATE') {
        this.transferAccess.update = true;
      }
    });
  },
};
</script>
