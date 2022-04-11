<template>
  <help-modal v-model="modals.confirmTransfer" permanent>
    <confirmation
      title="Transfer confirmation"
      :message="
        `Are you sure you want to transfer to the selected orders with total amount of
         ${convertToRp(totalAmounts)}? This action cannot be undone`
      "
      :confirm-loading="conductTransferLoading"
      loading-label="transfering"
      @close="modals.confirmTransfer = false"
      @cancel="modals.confirmTransfer = false"
      @confirm="conductTransfer"
    />
  </help-modal>
  <help-modal v-model="modals.filter" permanent>
    <transfer-agents-filter :filter="transactionFilter" @apply="applyFilter" @close="modals.filter = false" />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Transfer Agent</p>
      <div class="grid grid-flow-col gap-2">
        <div v-if="transferAccess.update" class="grid grid-flow-col gap-4">
          <help-button
            v-if="!transferMode"
            label="transfer"
            icon="switch-horizontal"
            @click="transferMode = true"
          />
          <template v-else>
            <help-button label="cancel" bg-color="flame" @click="transferMode = false" />
            <help-button label="transfer" bg-color="mint" @click="modals.confirmTransfer = true" />
          </template>
        </div>
        <help-button label="filter" icon="filter" @click="modals.filter = true" />
        <export-excel
          :fetch="getTransactionExports"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Agent_Transfer.xls`"
        >
        <help-button class="h-full" label="export" />
        </export-excel>
      </div>
    </div>
    <div>
      <form @submit.prevent="getTransactions({ filter: merchantFilter })">
        <help-input
          type="text"
          v-model="searchValue"
          placeholder="Search agent's phone number"
          search-bar
        />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="agents/transactions"
        :columns="columns"
        :loading="loading"
        :rows="transactions"
        :pagination="agentsPagination"
        :isCountActive="true"
        :count="count"
        @onChangePagination="getTransactions({pagination: $event, filter: agentFilter})"
        @sort="getTransactions({pagination: $event, filter: agentFilter})"
      >
        <template v-slot:header="{ column: { field } }">
          <help-checkbox
            v-if="field === 'is_checked'"
            v-model:checked="checkAll"
            @click="toggleAll"
          />
        </template>
        <template v-slot:body="{ column, row }">
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
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import Moment from 'moment/moment';
import { useToast } from 'vue-toastification';
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import TransferAgentsFilter from '@/components/modals/TransferAgentsFilter.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpTable from '@/components/templates/TableNew.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import mixin from '@/mixin';
// import dayjs from 'dayjs';
import ApiAgent from '../apiext';

export default {
  name: 'Agents',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
    HelpTable,
    HelpBadge,
    HelpModal,
    HelpCheckbox,
    Confirmation,
    TransferAgentsFilter,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchValue: '',
      count: 0,
      loading: false,
      transferAccess: {
        update: true,
      },
      transferMode: false,
      confirmTransferModal: false,
      transactions: [],
      exportedAgents: [],
      transactionFilter: {
        status: '',
      },
      transactionsPagination: {
        limit: 10,
        offset: 0,
        sort: 'ASC',
        order: 'trf_status',
      },
      modals: {
        filter: false,
      },
      appliedFilter: {},
      checkAll: false,
      conductTransferLoading: false,
    };
  },
  computed: {
    columns() {
      const columns = [
        { field: 'order_date', label: 'Order Date', sortable: true },
        { field: 'transfer_date', label: 'Transfer Date', sortable: true },
        {
          field: 'transfer_status',
          label: 'Transfer Status',
          align: 'center',
          sortable: true,
        },
        { field: 'merchant_name', label: 'Merchant Name', align: 'center' },
        { field: 'agent_name', label: 'Agent Name', align: 'center' },
        { field: 'agent_phone_number', label: 'Agent Phone Number', align: 'center' },
        { field: 'item_price', label: 'Item Price', align: 'center' },
        { field: 'agent_commision', label: 'Agent Commision', align: 'center' },
        { field: 'transfer_by', label: 'Transferred By', align: 'center' },
        { field: 'log', label: 'Log', align: 'left' },
      ];
      if (this.transferMode) {
        columns.unshift({ field: 'is_checked', label: 'checkbox', align: 'center' });
      }
      return columns;
    },
    queue() {
      return this.transactions.filter((el) => el.is_checked.val);
    },
    totalAmounts() {
      let sumTransferAmount = 0;
      for (let i = 0; i < this.queue.length; i += 1) {
        sumTransferAmount += this.queue[i].amount;
      }
      return sumTransferAmount;
    },
  },
  methods: {
    async getTransactions({ pagination, filter }) {
      this.loading = true;
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'DESC';
      const order = pagination?.order || 'created_at';
      const search = this.searchValue || '';
      let url = `agents/transactions?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}`;
      if (search !== '') url += `&search=${search}`;
      if (filter?.status) {
        url += `&status=${filter?.status}`;
      }

      try {
        const {
          data: { data },
        } = await ApiAgent.get(url);
        this.transactionsPagination.totalPage = data.totalPage;
        this.count = data.totalLength;
        this.transactionsPagination.rowLength = data.rowLength;
        this.transactions = data.row.map((el) => ({
          uuid: el.uuid,
          amount: el.agent_commision,
          order_date: Moment(el.order_date).format('DD-MM-YYYY hh:mm:ss'),
          transfer_date: Moment(el.trf_date).format('DD-MM-YYYY hh:mm:ss'),
          transfer_status: el.trf_status,
          merchant_name: el.agent_seller?.merchant_name,
          agent_commision: this.convertToRp(el.agent_commision),
          agent_name: el.agent?.name,
          agent_phone_number: el.agent?.phone_number,
          item_price: this.convertToRp(el.amount),
          transfer_by: el.trf_by,
          log: JSON.stringify(el.log),
          is_checked: el.trf_status !== 'SUCCESS' ? { val: false } : { val: null },
        }));
        this.loading = false;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
          this.loading = false;
        } else {
          this.toast.error(error.response?.data?.errors[0]);
          this.loading = false;
        }
      }
    },
    async conductTransfer() {
      this.conductTransferLoading = true;
      console.log(this.queue);
      const payload = {
        items: [],
      };
      for (let i = 0; i < this.queue.length; i += 1) {
        payload.items.push({ uuid: this.queue[i].uuid });
      }
      const url = 'agents/transfer_transactions';
      try {
        const {
          data: { data },
        } = await ApiAgent.post(url, payload);
        console.log(data);
        this.toast.success('Successfully updated');
        this.getTransactions(this.transactionsPagination);
        this.conductTransferLoading = false;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
          this.conductTransferLoading = false;
        } else {
          this.toast.error(error.response?.data?.errors[0]);
          this.conductTransferLoading = false;
        }
      }
    },
    applyFilter($event) {
      const pagination = {
        ...this.transactionsPagination,
        offset: 0,
      };
      const filter = {
        status: $event.transferStatus || '',
      };
      this.appliedFilter = filter;
      this.getTransactions({ pagination, filter });
      this.modals.filter = false;
    },
    getTransactionExports() {
      return this.transactions;
    },
    showStartExportToast() {
      this.toast.success('Exporting Report...');
    },
    showFinishExportToast() {
      this.toast.success('Finished Exporting, Download in progress...');
    },
    toggleAll() {
      for (let i = 0; i < this.transactions.length; i += 1) {
        if (this.transactions[i].is_checked.val !== null) {
          this.transactions[i].is_checked.val = !this.checkAll;
        }
      }
    },
  },
  mounted() {
    this.getTransactions(this.transactionsPagination);
  },
};
</script>

<style></style>
