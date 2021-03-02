<template>
  <div class="p-6 grid gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Seller</p>
      <help-button label="filter" />
    </div>
    <div>
      <help-input v-model="searchValue" placeholder="Search seller name here" right-icon="search" />
    </div>
    <div>
      <help-table :columns="columns" :rows="sellers" :pagination="sellerPagination"></help-table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'Seller',
  components: {
    HelpButton,
    HelpInput,
    HelpTable,
  },
  setup() {
    const searchValue = ref('');
    const columns = [
      { field: 'nameelele', label: 'store name' },
      { field: 'city', label: 'city' },
      { field: 'finished_orders', label: 'finished orders' },
      { field: 'verification_status', label: 'verification status', align: 'center' },
      { field: 'detail', label: 'seller detail' },
      { field: 'operational_detail', label: 'operational time' },
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
        sellers.value = response.data;
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
