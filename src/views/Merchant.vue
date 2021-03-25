<template>
  <help-modal v-model="detailModal">
    <merchant-detail />
  </help-modal>

  <help-modal v-model="opHourModal">
    <operational-hour />
  </help-modal>

  <help-modal v-model="verificationModal">
    <merchant-verification
      @openOption="verificationOptionModal = true"
      @close="verificationModal = false"
    />
  </help-modal>

  <help-modal v-model="verificationOptionModal">
    <merchant-verification-option @closeAndRefetch="closeAndRefetch" />
  </help-modal>

  <help-modal v-model="commissionModal">
    <commission @closeAndRefetch="closeAndRefetch" />
  </help-modal>

  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Merchant</p>
      <help-button label="filter" />
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
        <template v-slot="{ column, row }">
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
              bg-color="grey-6"
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
import { onMounted, ref, inject } from 'vue';
import Commission from '@/components/modals/Commission.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import OperationalHour from '@/components/modals/OperationalHour.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';
import MerchantVerification from '@/components/modals/MerchantVerification.vue';
import MerchantVerificationOption from '@/components/modals/MerchantVerificationOption.vue';
import API from '@/apis';

export default {
  name: 'Merchant',
  components: {
    Commission,
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    OperationalHour,
    MerchantDetail,
    MerchantVerification,
    MerchantVerificationOption,
  },
  setup() {
    const store = inject('store');
    const searchValue = ref('');
    const columns = [
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
      { field: 'is_hidden', label: 'status', align: 'center' },
    ];
    const merchants = ref([]);
    const merchantPagination = ref({
      limit: 10,
      offset: 0,
      sort: 'name',
      order: 'asc',
    });
    const loading = ref(false);
    const detailModal = ref(false);
    const opHourModal = ref(false);
    const verificationModal = ref(false);
    const verificationOptionModal = ref(false);
    const commissionModal = ref(false);

    const getCommission = async (merchantId) => {
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
    };

    const getMerchants = async (pagination) => {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      const sort = pagination.sort || 'name';
      const order = pagination.order || 'asc';
      const search = searchValue.value || '';
      try {
        loading.value = true;
        const {
          data: { data: currentMerchants },
        } = await API.get(
          `merchants?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`,
        );

        console.log(currentMerchants);

        merchants.value = currentMerchants.map((el) => ({
          id: el.id,
          name: el.name,
          city: el.address.city.name,
          verify_status: store.methods.translateStatus(el.verify_status),
          verify_reason: el.verify_reason,
          is_hidden: !el.is_hidden,
          operational_hours: el.operational_hours.map(
            ({ open_hour: openHour, close_hour: closeHour, day_of_week: dayOfWeek }) => ({
              openHour,
              closeHour,
              dayOfWeek,
            }),
          ),
        }));

        merchants.value.forEach(async (merchant) => {
          const clone = merchant;
          const commission = await getCommission(merchant.id);
          clone.commission = commission || '-';
        });

        merchantPagination.value = {
          limit,
          offset,
          sort,
          order,
        };
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    };

    const openMerchantDetail = (id) => {
      detailModal.value = true;
      store.methods.setModalState({ id });
    };
    const openOpHourDetail = (operationalHours) => {
      opHourModal.value = true;
      store.methods.setModalState({ operationalHours });
    };
    const openMerchantVerivication = (verificationDetail) => {
      verificationModal.value = true;
      store.methods.setModalState({ verificationDetail });
    };
    const closeAndRefetch = () => {
      getMerchants(merchantPagination);
      verificationOptionModal.value = false;
      verificationModal.value = false;
      commissionModal.value = false;
    };
    const openCommissionModal = ({ merchantId, merchantName }) => {
      console.log(merchantId, merchantName);
      commissionModal.value = true;
      store.methods.setModalState({ merchantId, merchantName });
    };

    onMounted(() => {
      getMerchants(merchantPagination.value);
    });

    return {
      store,
      columns,
      merchants,
      merchantPagination,
      searchValue,
      loading,

      detailModal,
      opHourModal,
      verificationModal,
      verificationOptionModal,
      commissionModal,

      openMerchantDetail,
      openOpHourDetail,
      openMerchantVerivication,
      openCommissionModal,

      closeAndRefetch,

      getMerchants,
    };
  },
};
</script>
