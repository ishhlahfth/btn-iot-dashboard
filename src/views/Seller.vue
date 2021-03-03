<template>
  <help-modal v-model="detailModal">
    <div
      class="grid grid-flow-col gap-6"
      style="width: 85vw; height: 87.5vh; grid-template-columns: auto 1fr;"
    >
      <div class="grid gap-4 auto-rows-max overflow-auto">
        <div class="w-full grid place-items-center py-8">
          <div class="w-44 h-44 rounded-full bg-grey-4 grid place-items-center">store_img</div>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-14 font-medium">
          <p class="text-grey-2">Name</p>
          <p>Couvee Tj. Duren</p>
          <p class="text-grey-2">Location</p>
          <p>Jakarta Barat</p>
          <p class="text-grey-2">Joined Since</p>
          <p>3 Jan 2021</p>
          <p class="text-grey-2">Bank</p>
          <p>BCA</p>
          <p class="text-grey-2">ID No. (KTP)</p>
          <p>3510242312960003</p>
          <p class="text-grey-2">Status</p>
          <p class="text-mint">Verivied</p>
        </div>
        <div class="divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-14 font-medium">
          <p>Finished Orders</p>
          <p>12.031</p>
          <p>On Going Orders</p>
          <p>221</p>
          <p>Cancelled Orders</p>
          <p>457</p>
        </div>
      </div>

      <div class="grid gap-y-4 overflow-auto auto-rows-max">
        <menu-card
          image-url="https://www.couvee.co.id/wp-content/uploads/2019/11/CF4566E9-0DC2-43F1-ABC9-F1BED1F0A9CE-768x768.jpg"
          name="Aren Latte"
          category="Minuman"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit."
          :price="20000"
          :availability-status="true"
          :is-active="true"
        />
        <menu-card
          image-url="https://www.couvee.co.id/wp-content/uploads/2019/07/211B2BBB-7277-487F-9752-92AE422460FD-768x768.jpg"
          name="Aren Latte"
          category="Minuman"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit."
          :price="20000"
          :availability-status="true"
          :is-active="true"
        />
        <menu-card
          image-url=""
          name="Aren Latte"
          category="Minuman"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit."
          :price="20000"
          :availability-status="true"
          :is-active="true"
        />
        <menu-card
          image-url="https://www.couvee.co.id/wp-content/uploads/2020/01/5D3778CC-43E0-4CC7-8102-CC0B4984FD61-768x768.jpeg"
          name="White"
          category="Minuman"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit."
          :price="20000"
          :availability-status="true"
          :is-active="true"
        />
      </div>
    </div>
  </help-modal>
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
        @sort="getSellers($event)"
      >
        <template v-slot="{ column, row }">
          <p
            v-if="column === 'detail'"
            class="text-royal font-medium cursor-pointer"
            @click="detailModal = true"
          >
            See Detail
          </p>
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
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import MenuCard from '@/components/molecules/MenuCard.vue';

export default {
  name: 'Seller',
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    MenuCard,
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
        field: 'verification_status',
        label: 'verification status',
        align: 'center',
        sortable: true,
      },
      { field: 'detail', label: 'seller detail', align: 'center' },
      { field: 'operational_detail', label: 'operational time', align: 'center' },
      { field: 'suspension_status', label: 'status' },
    ];
    const sellers = ref([]);
    const sellerPagination = ref({
      totalRows: 0,
      rowLimit: 10,
      page: 1,
      sortBy: 'name',
      order: 'asc',
    });
    const detailModal = ref(false);

    const getSellers = async (pagination) => {
      const limit = pagination.rowLimit || 10;
      const page = pagination.page || 1;
      const sort = pagination.sortBy || 'name';
      const order = pagination.order || 'asc;';
      try {
        const response = await axios.get(
          `http://localhost:3000/seller?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
        );
        sellers.value = response.data.map((el) => ({
          ...el,
          finished_orders: store.methods.groupDigit(el.finished_orders),
        }));
        sellerPagination.value = {
          totalRows: +response.headers['x-total-count'],
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
      searchValue,
      getSellers,
    };
  },
};
</script>

<style></style>
