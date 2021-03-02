<template>
  <div class="p-6 grid gap-6">
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
      >
        <template v-slot="{ column, row }">
          <p v-if="column === 'detail'" class="text-royal font-medium cursor-pointer">See Detail</p>
          <p v-if="column === 'operational_detail'" class="text-royal font-medium cursor-pointer">
            See Detail
          </p>
          <help-toggle v-if="column === 'suspension_status'" v-model="row.suspension_status" />
          <help-badge
            v-if="column === 'verification_status'"
            :label="row.verification_status ? 'Verified' : 'Not Verified'"
            :color="row.verification_status ? 'positive' : 'negative'"
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
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';

export default {
  name: 'Seller',
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpTable,
    HelpToggle,
  },
  setup() {
    const store = inject('store');
    const searchValue = ref('');
    const columns = [
      { field: 'name', label: 'store name' },
      { field: 'city', label: 'city' },
      { field: 'finished_orders', label: 'finished orders', align: 'right' },
      { field: 'verification_status', label: 'verification status', align: 'center' },
      { field: 'detail', label: 'seller detail', align: 'center' },
      { field: 'operational_detail', label: 'operational time', align: 'center' },
      { field: 'suspension_status', label: 'status' },
    ];
    const sellers = ref([]);
    const sellerPagination = ref({
      totalRows: 0,
      rowLimit: 10,
      page: 1,
    });

    const getSellers = async (pagination) => {
      const limit = pagination.rowLimit || 10;
      const page = pagination.page || 1;
      try {
        const response = await axios.get(
          `http://localhost:3000/seller?_page=${page}&_limit=${limit}`,
        );
        sellers.value = response.data.map((el) => ({
          ...el,
          finished_orders: store.methods.groupDigit(el.finished_orders),
        }));
        sellerPagination.value = {
          totalRows: +response.headers['x-total-count'],
          rowLimit: pagination.rowLimit,
          page: pagination.page,
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
      searchValue,
      getSellers,
    };
  },
};
</script>

<style></style>
