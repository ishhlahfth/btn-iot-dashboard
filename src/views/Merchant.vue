<template>
  <help-modal v-model="detailModal" permanent>
    <merchant-detail @openItemStatusModal="handleItemStatus" @closeMerchant="detailModal = false" @deleteItemCatalog="handleDeleteItem" />
  </help-modal>

  <help-modal v-model="filterModal">
    <merchant-filter :filter="merchantFilter" @apply="applyFilter" @close="filterModal = false" />
  </help-modal>

  <help-modal v-model="opHourModal">
    <operational-hour @close="opHourModal = false" />
  </help-modal>

  <help-modal v-model="verificationModal">
    <merchant-verification
      @openOption="verificationOptionModal = true"
      @openConfirmSuspend="confirmSuspendModal = true"
      @close="verificationModal = false"
      :updateAccess="merchantAccess.update"
    />
  </help-modal>

  <help-modal v-model="verificationOptionModal">
    <merchant-verification-option
      @close="verificationOptionModal = false"
      @closeAndRefetch="closeAndRefetch"
    />
  </help-modal>

  <help-modal v-model="confirmSuspendModal" permanent>
    <confirmation
      title="Changes confirmation"
      message="Are you sure you want to suspend this merchant?"
      @close="confirmSuspendModal = false"
      @cancel="confirmSuspendModal = false"
      @confirm="suspendMerchant"
    />
  </help-modal>

  <help-modal v-model="commissionModal">
    <commission
      @close="commissionModal = false"
      @refetch="getMerchants({ pagination: merchantPagination, filter: merchantFilter })"
    />
  </help-modal>

  <help-modal v-model="deleteItem">
    <confirmation
      title="Delete confirmation"
      message="This action cannot be undone. Are you sure you want to delete this catalog item permanently?"
      @close="deleteItem = false"
      @cancel="deleteItem = false"
      @confirm="deleteMerchantItem"
    />
  </help-modal>

  <help-modal v-model="itemStatusModal" permanent>
    <item-status @close="itemStatusModal = false" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Merchant</p>
      <div class="grid grid-flow-col gap-2">
        <help-button label="filter" icon="filter" @click="filterModal = true" />
        <export-excel
          :fetch="exportMerchant"
          :before-start="showStartExportToast"
          :before-finish="showFinishExportToast"
          :name="`Exported_Merchant_${merchantFilter.verificationStatus}.xls`"
        >
          <help-button class="h-full" label="export" />
        </export-excel>
      </div>
    </div>
    <div>
      <form @submit.prevent="getMerchants({ filter: merchantFilter })">
        <help-input
          type="text"
          v-model="searchValue"
          placeholder="Search merchant by name, phone number, email or bank account here"
          search-bar
        />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="merchants"
        :columns="columns"
        :loading="loading"
        :rows="merchants"
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
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import Commission from '@/components/modals/Commission.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import ItemStatus from '@/components/modals/ItemStatus.vue';
import OperationalHour from '@/components/modals/OperationalHour.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';
import MerchantFilter from '@/components/modals/MerchantFilter.vue';
import MerchantVerification from '@/components/modals/MerchantVerification.vue';
import MerchantVerificationOption from '@/components/modals/MerchantVerificationOption.vue';
import mixin from '@/mixin';
import API from '../apis';

export default {
  name: 'Merchant',
  mixins: [mixin],
  components: {
    Commission,
    Confirmation,
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    ItemStatus,
    OperationalHour,
    MerchantDetail,
    MerchantFilter,
    MerchantVerification,
    MerchantVerificationOption,
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
        { field: 'name', label: 'name', sortable: true },
        { field: 'city', label: 'city', sortable: true },
        { field: 'phone_number', label: 'phone number' },
        {
          field: 'verify_status',
          label: 'verification status',
          align: 'center',
          sortable: true,
        },
        { field: 'verify_date', label: 'status last updated', sortable: true },
        { field: 'commission', label: 'commission (%)', align: 'right' },
        { field: 'menu', label: 'merchant detail', align: 'center' },
        { field: 'operational_detail', label: 'operational time', align: 'center' },
      ],
      merchants: [],
      exportedMerchants: [],
      merchantPagination: {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      },
      merchantFilter: {
        verificationStatus: '',
      },
      appliedFilter: {
        verificationStatus: '',
      },
      loading: false,
      detailModal: false,
      filterModal: false,
      opHourModal: false,
      verificationModal: false,
      verificationOptionModal: false,
      commissionModal: false,
      confirmSuspendModal: false,
      itemStatusModal: false,
      merchantAccess: {
        update: false,
        costumerRead: false,
        catalogItem: {
          read: false,
          update: false,
        },
      },
      deleteItem: false,
    };
  },
  computed: {
    verifDetail() {
      return this.$store.state.verifDetail;
    },
    item() {
      return this.$store.state.item;
    },
  },
  methods: {
    async getNumRows({
      offset, limit, sort, order, search, filter,
    }) {
      let url = `/merchants/count/num-rows?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`;
      if (filter?.verificationStatus) url += `&verify_status=${filter?.verificationStatus}`;
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
    async getCommission(merchantId) {
      let commission = null;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${merchantId}/bill-formulas`);
        if (data) {
          if (data.length) {
            const {
              formula: { value },
            } = data.filter((el) => el.order_type_id === 4)[0];
            commission = value;
          }
        }
      } catch (error) {
        this.toast.error(error.message);
      }
      return commission;
    },
    async getMerchants({ pagination, filter }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      const sort = pagination?.sort || 'name';
      const order = pagination?.order || 'asc';
      const search = this.searchValue || '';

      this.getNumRows({
        offset, limit, sort, order, search, filter,
      });

      let url = `merchants?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`;

      if (filter?.verificationStatus) url += `&verify_status=${filter?.verificationStatus}`;

      try {
        this.loading = true;
        const {
          data: { data: currentMerchants },
        } = await API.get(url);

        this.merchants = currentMerchants.map((el) => ({
          id: el.id,
          name: el.name,
          city: el.address.city.name,
          verify_status: this.translateStatus(el.verify_status),
          verify_reason: el.verify_reason,
          verify_date: dayjs(el.verify_date).format('DD-MM-YYYY HH:mm:ss'),
          phone_number: el.phone_number,
          operational_hours: el.operational_hours.map(
            ({ open_hour: openHour, close_hour: closeHour, day_of_week: dayOfWeek }) => ({
              openHour,
              closeHour,
              dayOfWeek,
            }),
          ),
        }));

        this.merchants.forEach(async (merchant) => {
          const clone = merchant;
          const commission = await this.getCommission(merchant.id);
          clone.commission = commission || '-';
        });

        this.merchantPagination = {
          limit,
          offset,
          sort,
          order,
        };
        this.merchantFilter = filter;
        if (!this.checkObjectBlank(filter)) {
          this.getExportedMerchant(this.appliedFilter);
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
    async getExportedMerchant(filter) {
      const sort = 'name';
      const order = 'asc';
      const search = '';

      let url = `merchants?sort=${sort}&order=${order}&search=${search}`;
      if (filter?.verificationStatus) url += `&verify_status=${filter?.verificationStatus}`;

      try {
        this.loading = true;
        const {
          data: { data: currentMerchants },
        } = await API.get(url);

        this.exportedMerchants = currentMerchants.map((el) => ({
          id: el.id,
          name: el.name,
          city: el.address.city.name,
          verify_status: this.translateStatus(el.verify_status),
          verify_reason: el.verify_reason,
          verify_date: dayjs(el.verify_date).format('DD-MM-YYYY HH:mm:ss'),
          phone_number: el.phone_number,
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
    openMerchantDetail(merchantId) {
      if (this.merchantAccess.catalogItem.read) {
        this.detailModal = true;
        this.$store.commit('SET_MERCHANT_ID', merchantId);
      } else {
        this.toast.error('You don`t have access to read this merchant catalog`s item !');
      }
    },
    openOpHourDetail({ opHour, merchantName }) {
      this.opHourModal = true;
      this.$store.commit('SET_OP_HOUR', opHour);
      this.$store.commit('SET_MERCHANT_NAME', merchantName);
    },
    openMerchantVerivication(verifDetail) {
      if (this.merchantAccess.costumerRead) {
        this.verificationModal = true;
        this.$store.commit('SET_VERIF_DETAIL', verifDetail);
      } else {
        this.toast.error('You don`t have access to read customer data !');
      }
    },
    openCommissionModal(commissionDetail) {
      if (this.merchantAccess.update) {
        this.commissionModal = true;
        this.$store.commit('SET_COMMISSION_DETAIL', commissionDetail);
      } else {
        this.toast.error('You don`t have access to update merchants !');
      }
    },
    closeAndRefetch() {
      this.getMerchants({ pagination: this.merchantPagination, filter: this.merchantFilter });
      this.verificationOptionModal = false;
      this.verificationModal = false;
      this.commissionModal = false;
      this.itemStatusModal = false;
      this.detailModal = false;
    },
    applyFilter($event) {
      const pagination = {
        ...this.merchantPagination,
        offset: 0,
      };
      const filter = {
        ...this.merchantFilter,
        verificationStatus: $event.verificationStatus,
      };
      this.appliedFilter = filter;
      this.getMerchants({ pagination, filter });
      this.filterModal = false;
    },
    async suspendMerchant() {
      const payload = {
        verify_status: 'SUSPEND',
        verify_reason: 'Harap menghubungi customer service',
      };
      try {
        const {
          data: { data },
        } = await API.patch(`merchants/${this.verifDetail.id}`, payload);

        this.toast.success(`Successfully suspended ${data.name}`);
        this.confirmSuspendModal = false;
        this.verificationModal = false;
        this.getMerchants({ pagination: this.merchantPagination, filter: this.merchantFilter });
      } catch (error) {
        this.toast.error(error.message);
      }
    },
    async deleteMerchantItem() {
      try {
        await API.delete(`items/${this.item.id}`);
        this.deleteItem = false;
        await this.$store.dispatch('loadMerchant', this.$store.state.merchantId);
        this.toast.success(`Successfully delete item ${this.item.name?.toLowerCase()}`);
      } catch (error) {
        this.toast.error(error.message);
      }
    },
    exportMerchant() {
      return this.exportedMerchants;
    },
    showStartExportToast() {
      this.toast.success('Exporting Report...');
    },
    showFinishExportToast() {
      this.toast.success('Finished Exporting, Download in progress...');
    },
    handleItemStatus() {
      if (this.merchantAccess.catalogItem.update) {
        this.itemStatusModal = true;
      } else {
        this.toast.error('You don`t have access to update this merchant catalog`s item !');
      }
    },
    handleDeleteItem() {
      this.deleteItem = true;
    },
  },
  mounted() {
    this.getMerchants({
      pagination: this.merchantPagination,
      filter: this.merchantFilter,
    });
    this.$store.state.access.access.permissions.forEach((el) => {
      switch (el.module) {
        case 'MERCHANT':
          if (el.action === 'UPDATE' || el.id === 43) {
            this.merchantAccess.update = true;
          }
          break;
        case 'CUSTOMER':
          if (el.action === 'READ') {
            this.merchantAccess.costumerRead = true;
          }
          break;
        case 'CATALOG-ITEM':
          if (el.action === 'READ') {
            this.merchantAccess.catalogItem.read = true;
          }
          if (el.action === 'UPDATE') {
            this.merchantAccess.catalogItem.update = true;
          }
          break;
        default:
          break;
      }
    });
  },
};
</script>
