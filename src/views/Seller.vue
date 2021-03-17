<template>
  <help-modal v-model="detailModal">
    <seller-detail />
  </help-modal>
  <help-modal v-model="opHourModal">
    <operational-hour />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Seller</p>
      <help-button label="filter" />
    </div>
    <div>
      <help-input v-model="searchValue" placeholder="Search seller name here" right-icon="search" />
    </div>
    <div class="overflow-hidden">
      <help-table
        :columns="columns"
        :rows="sellers"
        :pagination="sellerPagination"
        @onChangePagination="getSellers($event)"
        @sort="getSellers($event)"
      >
        <template v-slot="{ column, row }">
          <p
            v-if="column === 'menu'"
            class="text-royal font-medium cursor-pointer"
            @click="openSellerDetail(row.id)"
          >
            See Detail
          </p>
          <p
            v-if="column === 'operational_detail'"
            class="text-royal font-medium cursor-pointer"
            @click="openOpHourDetail(row.id)"
          >
            See Detail
          </p>
          <help-toggle v-if="column === 'is_hidden'" v-model="row.is_hidden" />
          <help-badge
            v-if="column === 'is_verified'"
            :label="row.is_verified ? 'Verified' : 'Not Verified'"
            :color="row.is_verified ? 'positive' : 'negative'"
          />
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue';
import axios from 'axios';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import OperationalHour from '@/components/modals/OperationalHour.vue';
import SellerDetail from '@/components/modals/SellerDetail.vue';

export default {
  name: 'Seller',
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    OperationalHour,
    SellerDetail,
  },
  setup() {
    const store = inject('store');
    const searchValue = ref('');
    const columns = [
      { field: 'name', label: 'store name', sortable: true },
      { field: 'city', label: 'city', sortable: true },
      {
        field: 'finished_orders',
        label: 'finished orders',
        align: 'right',
        sortable: true,
      },
      {
        field: 'is_verified',
        label: 'verification status',
        align: 'center',
        sortable: true,
      },
      { field: 'menu', label: 'seller detail', align: 'center' },
      { field: 'operational_detail', label: 'operational time', align: 'center' },
      { field: 'is_hidden', label: 'status', align: 'center' },
    ];
    const sellers = ref([]);
    const sellerPagination = ref({
      totalRows: 0,
      rowLimit: 10,
      page: 0,
      sortBy: 'name',
      order: 'asc',
    });
    const detailModal = ref(false);
    const opHourModal = ref(false);

    const openSellerDetail = (id) => {
      detailModal.value = true;
      store.methods.setModalState({ id });
    };
    const openOpHourDetail = (id) => {
      opHourModal.value = true;
      store.methods.setModalState({ id });
    };

    const getSellers = async (pagination) => {
      const limit = pagination.rowLimit || 10;
      const page = pagination.page || 0;
      const sort = pagination.sortBy || 'name';
      const order = pagination.order || 'asc';
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://buynsell-dev.wehelpyou.xyz/api/v1/merchants?offset=${page}&limit=${limit}&sort=${sort}&order=${order}`,
          {
            headers: {
              'x-api-key': 'secret-xApiKey-for-developer',
              'x-device-type': 'LINUX',
              'x-device-os-version': 'Ubuntu18.04',
              'x-device-model': '4s-dk0115AU',
              'x-app-version': 'v1.2',
              'x-request-id': '1234',
              'x-device-utc-offset': '+08:00',
              'x-device-lang': 'en',
              'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
            },
          },
        );
        sellers.value = data.map((el) => ({
          id: el.id,
          name: el.name,
          city: el.address.city.name,
          is_verified: el.is_verified,
          is_hidden: el.is_hidden,
        }));
        console.log('RESPONSE', data);

        sellerPagination.value = {
          totalRows: 100, // total row count is not provided
          rowLimit: pagination.rowLimit,
          page: pagination.page,
          sortBy: pagination.sortBy,
          order: pagination.order,
        };
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getSellers(sellerPagination.value);
    });
    return {
      columns,
      sellers,
      sellerPagination,
      detailModal,
      opHourModal,
      searchValue,
      openSellerDetail,
      openOpHourDetail,
      getSellers,
    };
  },
};
</script>

<style></style>
