<template>
  <help-modal v-model="detailModal">
    <merchant-detail @openItemStatusModal="itemStatusModal = true" />
  </help-modal>

  <help-modal v-model="opHourModal">
    <operational-hour />
  </help-modal>

  <help-modal v-model="verificationModal">
    <merchant-verification
      @openOption="verificationOptionModal = true"
      @openConfirmSuspend="confirmSuspendModal = true"
      @close="verificationModal = false"
    />
  </help-modal>

  <help-modal v-model="verificationOptionModal">
    <merchant-verification-option
      @close="verificationOptionModal = false"
      @closeAndRefetch="closeAndRefetch"
    />
  </help-modal>

  <help-modal v-model="confirmSuspendModal">
    <confirmation
      title="Changes confirmation"
      message="Are you sure you want to suspend this merchant?"
      @close="confirmSuspendModal = false"
      @cancel="confirmSuspendModal = false"
      @confirm="suspendMerchant"
    />
  </help-modal>

  <help-modal v-model="commissionModal">
    <commission @close="commissionModal = false" @refetch="getMerchants(merchantPagination)" />
  </help-modal>

  <help-modal v-model="itemStatusModal">
    <item-status @close="itemStatusModal = false" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Merchant</p>
      <!-- <help-button label="filter" /> -->
    </div>
    <div>
      <form @submit.prevent="getMerchants">
        <help-input
          v-model="searchValue"
          placeholder="Search merchant name here"
          right-icon="search"
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
        @onChangePagination="getMerchants($event)"
        @sort="getMerchants($event)"
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
            @click="openOpHourDetail(row.operational_hours)"
          >
            See Detail
          </p>
          <help-toggle v-if="column === 'is_hidden'" v-model="row.is_hidden" />
          <div class="grid grid-flow-col auto-cols-max gap-2" v-if="column === 'verify_status'">
            <help-badge
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
          </div>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
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
import MerchantVerification from '@/components/modals/MerchantVerification.vue';
import MerchantVerificationOption from '@/components/modals/MerchantVerificationOption.vue';
import mixin from '@/mixin';
import API from '@/apis';

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
    MerchantVerification,
    MerchantVerificationOption,
  },
  data() {
    return {
      searchValue: '',
      columns: [
        { field: 'name', label: 'name', sortable: true },
        { field: 'city', label: 'city', sortable: true },
        {
          field: 'verify_status',
          label: 'verification status',
          align: 'center',
          sortable: true,
        },
        { field: 'commission', label: 'commission (%)', align: 'right' },
        { field: 'menu', label: 'merchant detail', align: 'center' },
        { field: 'operational_detail', label: 'operational time', align: 'center' },
      ],
      merchants: [],
      merchantPagination: {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      },
      loading: false,
      detailModal: false,
      opHourModal: false,
      verificationModal: false,
      verificationOptionModal: false,
      commissionModal: false,
      confirmSuspendModal: false,
      itemStatusModal: false,
    };
  },
  computed: {
    verifDetail() {
      return this.$store.state.verifDetail;
    },
  },
  methods: {
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
        console.log(error);
      }
      return commission;
    },
    async getMerchants(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      const sort = pagination.sort || 'name';
      const order = pagination.order || 'asc';
      const search = this.searchValue || '';
      try {
        this.loading = true;
        const {
          data: { data: currentMerchants },
        } = await API.get(
          `merchants?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`,
        );

        console.log(currentMerchants);

        this.merchants = currentMerchants.map((el) => ({
          id: el.id,
          name: el.name,
          city: el.address.city.name,
          verify_status: this.translateStatus(el.verify_status),
          verify_reason: el.verify_reason,
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
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    openMerchantDetail(merchantId) {
      this.detailModal = true;
      this.$store.commit('SET_MERCHANT_ID', merchantId);
    },
    openOpHourDetail(operationalHours) {
      this.opHourModal = true;
      this.$store.commit('SET_OP_HOUR', operationalHours);
    },
    openMerchantVerivication(verifDetail) {
      this.verificationModal = true;
      this.$store.commit('SET_VERIF_DETAIL', verifDetail);
    },
    openCommissionModal(commissionDetail) {
      this.commissionModal = true;
      this.$store.commit('SET_COMMISSION_DETAIL', commissionDetail);
    },
    closeAndRefetch() {
      this.getMerchants(this.merchantPagination);
      this.verificationOptionModal = false;
      this.verificationModal = false;
      this.commissionModal = false;
      this.itemStatusModal = false;
      this.detailModal = false;
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
        console.log('SUSPEND OK', data);
        this.confirmSuspendModal = false;
        this.verificationModal = false;
        this.getMerchants(this.merchantPagination);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getMerchants(this.merchantPagination);
  },
};
</script>
