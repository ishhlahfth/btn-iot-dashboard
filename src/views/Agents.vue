<template>
  <help-modal v-model="modals.filter" permanent>
    <agent-filter :filter="agentFilter" @apply="applyFilter" @close="modals.filter = false" />
  </help-modal>
  <help-modal v-model="modals.detail" class="modal-lg" permanent>
    <agent-details @close="modals.detail = false" @verify="openVerifyAgent" />
  </help-modal>
  <help-modal v-model="modals.verify" class="modal-md" permanent>
    <agent-verification @close="modals.verify = false" @finish="closeVerifyAgent" />
  </help-modal>
  <help-modal v-model="modals.comission" class="modal-md" permanent>
    <agent-commission @close="modals.comission = false" @finish="closeComission" />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Agents</p>
      <div class="grid grid-flow-col gap-2">
        <help-button label="filter" icon="filter" @click="modals.filter = true" />
        <export-excel
          :fetch="getAgentsExport"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Agent.xls`"
        >
        <help-button class="h-full" label="export" />
        </export-excel>
      </div>
    </div>
    <div>
      <form @submit.prevent="getAgents({ filter: agentFilter })">
        <help-input
          type="text"
          v-model="searchValue"
          placeholder="Search agent name OR agent's phone number here"
          search-bar
        />
      </form>
    </div>
        <div class="overflow-hidden">
      <help-table-new
        path="agents"
        :columns="columns"
        :loading="loading"
        :rows="agents"
        :pagination="agentsPagination"
        :isCountActive="true"
        :count="count"
        @onChangePagination="getAgents({pagination: $event, filter: agentFilter})"
        @sort="getAgents({pagination: $event, filter: agentFilter})"
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
              @click="openComissionAgent(row.uuid)"
            />
          </div>
          <help-toggle v-if="column === 'is_hidden'" v-model="row.is_hidden" />
          <help-badge
            v-if="column === 'status'"
            class="cursor-pointer"
            :label="row.status"
            :color="
              row.status === 'Terverifikasi'
                ? 'positive'
                : row.status === 'Pending Verifikasi'
                ? 'warning'
                : 'negative'
            "
            @click="openMerchantVerivication(row)"
          />
          <div v-if="column === 'agent_detail'">
            <p class="font-semibold cursor-pointer" @click="openAgentDetail(row.uuid)">See Detail</p>
          </div>
          <div v-if="column === 'created_at'">
            <p class="font-semibold">{{row.created_at}}</p>
          </div>
        </template>
      </help-table-new>
    </div>
  </div>
</template>

<script>
import Moment from 'moment/moment';
import { useToast } from 'vue-toastification';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpTableNew from '@/components/templates/TableNew.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import AgentFilter from '@/components/modals/AgentFilter.vue';
import AgentDetails from '@/components/modals/AgentDetails.vue';
import AgentVerification from '@/components/modals/AgentVerification.vue';
import AgentCommission from '@/components/modals/AgentComission.vue';
import mixin from '@/mixin';
// import dayjs from 'dayjs';
import ApiAgent from '../apiext';

export default {
  name: 'Agents',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
    HelpTableNew,
    HelpModal,
    HelpBadge,
    AgentFilter,
    AgentDetails,
    AgentVerification,
    AgentCommission,
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
        { field: 'name', label: 'Agent Name', sortable: true },
        { field: 'phone_number', label: 'phone number' },
        {
          field: 'status',
          label: 'verification status',
          align: 'center',
          sortable: true,
        },
        { field: 'updated_at', label: 'status last updated', sortable: true },
        { field: 'commission', label: 'commission (%)', align: 'right' },
        { field: 'agent_detail', label: 'Agent Detail', align: 'center' },
      ],
      agents: [],
      exportedAgents: [],
      agentsPagination: {
        limit: 10,
        offset: 0,
        sort: 'DESC',
        order: 'created_at',
      },
      modals: {
        filter: false,
        detail: false,
        verify: false,
        comission: false,
      },
      agentDetails: null,
      agentFilter: {
        status: '',
      },
      appliedFilter: {},
    };
  },
  methods: {
    async getAgents({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'DESC';
      const order = pagination?.order || 'created_at';
      const search = this.searchValue || '';

      let url = `agents?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}`;
      if (search !== '') url += `&search=${search}`;
      console.log('status', filter?.status);
      if (filter?.status) {
        url += `&status=${filter?.status}`;
      }
      try {
        const {
          data: { data },
        } = await ApiAgent.get(url);
        console.log(data);
        this.agentsPagination.totalPage = data.totalPage;
        this.count = data.totalLength;
        this.agentsPagination.rowLength = data.rowLength;
        this.agents = data.row.map((el) => ({
          uuid: el.uuid,
          name: el.name,
          phone_number: el.phone_number,
          status: el.verification_status?.name,
          updated_at: Moment(el.updated_at).format('D-MM-YYYY HH:mm:ss'),
          commission: el.commission,
        }));

        console.log('lastRowLen', this.agentsPagination.rowLength);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.response?.data?.errors[0]);
        }
      }
    },
    async getExportedAgents({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'DESC';
      const order = pagination?.order || 'created_at';
      const search = this.searchValue || '';

      let url = `agents?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}`;
      if (search !== '') url += `&search=${search}`;
      console.log('status', filter?.status);
      if (filter?.status) {
        url += `&status=${filter?.status}`;
      }

      try {
        this.loading = true;
        const {
          data: { data },
        } = await ApiAgent.get(url);

        this.exportedMerchants = data.row.map((el) => ({
          uuid: el.uuid,
          name: el.name,
          phone_number: el.phone_number,
          status: el.verification_status?.name,
          updated_at: Moment(el.updated_at).format('D-MM-YYYY HH:mm:ss'),
          commission: el.commission,
        }));
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    getAgentsExport() {
      return this.agents;
    },
    showStartExportToast() {
      this.toast.success('Exporting Report...');
    },
    showFinishExportToast() {
      this.toast.success('Finished Exporting, Download in progress...');
    },
    applyFilter($event) {
      const pagination = {
        ...this.agentsPagination,
        offset: 0,
      };
      const filter = {
        status: $event.verificationStatus || '',
      };
      this.appliedFilter = filter;
      this.getAgents({ pagination, filter });
      this.modals.filter = false;
    },
    openAgentDetail(id) {
      this.$store.commit('SET_AGENT_ID', id);
      this.modals.detail = true;
    },
    openVerifyAgent($event) {
      this.$store.commit('SET_AGENT_ID', $event.uuid);
      this.modals.detail = false;
      this.modals.verify = true;
    },
    closeVerifyAgent() {
      this.modals.verify = false;
      this.getAgents(this.agentsPagination);
    },
    closeCommission() {
      this.modals.comission = false;
      this.getAgents(this.agentsPagination);
    },
    openComissionAgent(id) {
      console.log('ini ID ku', id);
      this.$store.commit('SET_AGENT_ID', id);
      this.modals.comission = true;
    },
  },
  mounted() {
    this.getAgents(this.agentsPagination);
  },
};
</script>

<style></style>
