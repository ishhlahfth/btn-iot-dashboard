<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Transfer</p>
      <div class="grid grid-flow-col gap-4">
        <help-button
          v-if="!transferMode"
          label="transfer"
          icon="switch-horizontal"
          @click="transferMode = true"
        />
        <template v-else>
          <help-button label="cancel" bg-color="flame" @click="transferMode = false" />
          <help-button label="transfer" bg-color="mint" @click="transferMode = !transferMode" />
        </template>
      </div>
    </div>
    <!-- <div>
      <form @submit.prevent="getOrders">
        <help-input
          v-model="searchValue"
          placeholder="Search order PO number here"
          right-icon="search"
        />
      </form>
    </div> -->
    <div class="overflow-hidden">
      <help-table
        path="transfer-queues"
        :columns="columns"
        :loading="loading"
        :rows="transfers"
        :pagination="transferPagination"
        @onChangePagination="getTransferData($event)"
        @sort="getTransferData($event)"
      >
        <template v-slot:header="{ column: { field } }">
          <help-checkbox v-if="field === 'checkbox'" />
        </template>
        <template v-slot:body="{ column, row }">
          <help-checkbox v-if="column === 'checkbox'" />
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
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
// import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '@/apis';

export default {
  name: 'Transfer',
  mixins: [mixin],
  components: {
    HelpBadge,
    HelpButton,
    HelpCheckbox,
    // HelpInput,
    HelpTable,
  },
  data() {
    return {
      searchValue: '',
      transferMode: false,
      transfers: [],
      transferPagination: {
        limit: 10,
        offset: 0,
      },
      loading: false,
    };
  },
  computed: {
    columns() {
      const columns = [
        { field: 'order_date', label: 'order date' },
        { field: 'code', label: 'po number' },
        { field: 'transfer_date', label: 'transfer date' },
        { field: 'transfer_status', label: 'transfer status', align: 'center' },
        { field: 'merchant_name', label: 'merchant name' },
        { field: 'customer_name', label: 'buyer name' },
        { field: 'subtotal_price', label: 'item price' },
        { field: 'commission_fee', label: 'commission' },
        { field: 'delivery_price', label: 'delivery price' },
        { field: 'payment_method', label: 'payment method' },
        { field: 'transfer_by', label: 'transfered by' },
        { field: 'result_logs', label: 'log' },
        // { field: 'detail', label: 'detail', align: 'center' },
      ];
      if (this.transferMode) {
        columns.unshift({ field: 'checkbox', label: 'checkbox', align: 'center' });
      }
      return columns;
    },
  },
  methods: {
    async getTransferData(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;

      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get(`transfer-queues?offset=${offset}&limit=${limit}`);

        console.log('TRANSFER: ', data);
        this.transfers = data.map((el) => ({
          id: el.id,
          order_date: dayjs(el.order.date).format('DD-MM-YYYY HH:mm:ss'),
          code: el.order?.code,
          transfer_status: el.order?.transfer_status,
          // result_logs: 'LOGS',
          result_logs: JSON.stringify(el.result_logs, null, 2),
          merchant_name: el.order?.merchant.name,
          customer_name: el.customer?.name,
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
        };
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  async mounted() {
    this.getTransferData(this.transferPagination);
  },
};
</script>
