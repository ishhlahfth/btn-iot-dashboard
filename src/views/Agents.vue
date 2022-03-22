<template>
  <help-modal v-model="modals.filter" permanent>
    <agent-filter :filter="agentFilter" @apply="applyFilter" @close="modals.filter = false" />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Agents</p>
      <div class="grid grid-flow-col gap-2">
        <help-button label="filter" icon="filter" @click="modals.filter = true" />
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
import HelpModal from '@/components/templates/Modal.vue';
import { useToast } from 'vue-toastification';
import AgentFilter from '@/components/modals/AgentFilter.vue';
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
    HelpModal,
    AgentFilter,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchValue: '',
      count: 0,
      columns: [
        { field: 'agent_name', label: 'Agent Name', sortable: true },
        { field: 'phone_number', label: 'phone number' },
        {
          field: 'verify_status',
          label: 'verification status',
          align: 'center',
          sortable: true,
        },
        { field: 'verify_date', label: 'status last updated', sortable: true },
        { field: 'commission', label: 'commission (%)', align: 'right' },
        { field: 'agent_detail', label: 'Agent Detail', align: 'center' },
      ],
      agents: [],
      exportedAgents: [],
      agentsPagination: {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      },
      modals: {
        filter: false,
      },
      agentFilter: {
        agentName: '',
      },
    };
  },
  methods: {
    applyFilter() {
      console.log('applyFilter');
    },
  },
};
</script>

<style></style>
