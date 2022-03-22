<template>
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
            <help-button label="transfer" bg-color="mint" @click="confirmTransferModal = true" />
          </template>
        </div>
        <help-button label="filter" icon="filter" @click="filterModal = true" />
        <!-- <export-excel
          :fetch="exportMerchant"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Merchant_${merchantFilter.verificationStatus}.xls`"
        > -->
        <help-button class="h-full" label="export" />
        <!-- </export-excel> -->
      </div>
    </div>
    <div>
      <form @submit.prevent="getMerchants({ filter: merchantFilter })">
        <help-input
          type="text"
          v-model="searchValue"
          placeholder="Search agent name OR agent's phone number here"
          search-bar
        />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="agents"
        :columns="columns"
        :loading="loading"
        :rows="agents"
        :pagination="merchantPagination"
        :count="count"
        :isCountActive="true"
        @onChangePagination="getMerchants({ pagination: $event, filter: merchantFilter })"
        @sort="getMerchants({ pagination: $event, filter: merchantFilter })"
      >
        <template v-slot:body="{ column, row }">
          <p
            v-if="column === 'menu'"
            class="text-royal font-medium cursor-pointer"
            @click="openMerchantDetail(row.id)"
          >
            See Detail
          </p>
          <div v-if="column === 'commission'" class="grid grid-flow-col gap-2 place-items-center">
            <p>{{ row.commission }}</p>
            <help-button
              icon-only
              icon="dots-vertical"
              bg-color="transparent"
              color="grey-1"
              @click="openCommissionModal({ merchantId: row.id, merchantName: row.name })"
            />
          </div>
          <p
            v-if="column === 'operational_detail'"
            class="text-royal font-medium cursor-pointer"
            @click="openOpHourDetail({ opHour: row.operational_hours, merchantName: row.name })"
          >
            See Detail
          </p>
          <help-toggle v-if="column === 'is_hidden'" v-model="row.is_hidden" />
          <help-badge
            v-if="column === 'verify_status'"
            class="cursor-pointer"
            :label="row.verify_status"
            :color="
              row.verify_status === 'Terverifikasi'
                ? 'positive'
                : row.verify_status === 'Pending Verifikasi'
                ? 'warning'
                : 'negative'
            "
            @click="openMerchantVerivication(row)"
          />
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
// import dayjs from 'dayjs';
// import API from '../apis';

export default {
  name: 'Agents',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
    HelpTable,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchValue: '',
      count: 0,
      transferAccess: {
        update: true,
      },
      transferMode: false,
      confirmTransferModal: false,
      columns: [
        { field: 'order_date', label: 'Order Date', sortable: true },
        { field: 'po_number', label: 'PO Number' },
        { field: 'transfer_date', label: 'Transfer Date', sortable: true },
        {
          field: 'transfer_status',
          label: 'Transfer Status',
          align: 'center',
          sortable: true,
        },
        { field: 'merchant_name', label: 'Merchant Name', align: 'right' },
        { field: 'agent_name', label: 'Agent Name', align: 'center' },
      ],
      agents: [],
      exportedAgents: [],
      agentsPagination: {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      },
    };
  },
};
</script>

<style></style>
