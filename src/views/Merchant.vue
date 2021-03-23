<template>
  <help-modal v-model="detailModal">
    <merchant-detail />
  </help-modal>
  <help-modal v-model="opHourModal">
    <operational-hour />
  </help-modal>
  <help-modal v-model="verificationModal">
    <merchant-verification @close="closeMerchantVerification" />
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
              :label="row.verify_status === 'SUCCESS' ? 'Verified' : 'Not Verified'"
              :color="row.verify_status === 'SUCCESS' ? 'positive' : 'negative'"
            />
            <help-button
              icon-only
              icon="dots-vertical"
              bg-color="grey-6"
              color="grey-1"
              v-if="row.verify_status !== 'SUCCESS'"
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
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import OperationalHour from '@/components/modals/OperationalHour.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';
import MerchantVerification from '@/components/modals/MerchantVerification.vue';
import API from '@/apis';

export default {
  name: 'Merchant',
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    OperationalHour,
    MerchantDetail,
    MerchantVerification,
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
      { field: 'commission_percentage', label: 'commission (%)', align: 'right' },
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
          verify_status: el.verify_status,
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
    const closeMerchantVerification = (refetch) => {
      let refetchMerchant = refetch;

      if (refetch === undefined) {
        refetchMerchant = false;
      }

      if (refetchMerchant) {
        getMerchants(merchantPagination);
      }
      verificationModal.value = false;
    };

    onMounted(() => {
      getMerchants(merchantPagination.value);
    });
    return {
      columns,
      merchants,
      merchantPagination,
      detailModal,
      loading,
      opHourModal,
      verificationModal,
      searchValue,
      openMerchantDetail,
      openOpHourDetail,
      openMerchantVerivication,
      closeMerchantVerification,
      getMerchants,
    };
  },
};
</script>
