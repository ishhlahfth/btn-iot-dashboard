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
        <div class="grid grid-flow-col gap-x-4" style="grid-template-columns: auto 1fr auto auto;">
          <div class="w-28 h-28 bg-grey-4 rounded grid place-items-center">img</div>
          <div class="flex flex-col justify-between">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
                  <p class="font-medium">Nasi Ayam Kremes</p>
                  <help-badge label="Available" color="positive" />
                </div>
                <p class="text-small text-grey-3">Minuman</p>
              </div>
              <p class="text-small text-grey-2 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem.
              </p>
            </div>
            <p class="text-small font-medium">Rp 30.000</p>
          </div>
          <div class="h-28 grid grid-flow-col place-items-center gap-2">
            <help-toggle />
            <icon name="chevron-down" class="cursor-pointer" />
          </div>
        </div>

        <div class="grid grid-flow-col gap-x-4" style="grid-template-columns: auto 1fr auto auto;">
          <div class="w-28 h-28 bg-grey-4 rounded grid place-items-center">img</div>
          <div class="flex flex-col justify-between">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
                  <p class="font-medium">Nasi Ayam Kremes</p>
                  <help-badge label="Available" color="positive" />
                </div>
                <p class="text-small text-grey-3">Minuman</p>
              </div>
              <p class="text-small text-grey-2 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem
                reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit.
              </p>
            </div>
            <p class="text-small font-medium">Rp 30.000</p>
          </div>
          <div class="h-28 grid grid-flow-col place-items-center gap-2">
            <help-toggle />
            <icon name="chevron-down" class="cursor-pointer" />
          </div>
        </div>

        <div class="grid grid-flow-col gap-x-4" style="grid-template-columns: auto 1fr auto auto;">
          <div class="w-28 h-28 bg-grey-4 rounded grid place-items-center">img</div>
          <div class="flex flex-col justify-between">
            <div class="grid gap-2">
              <div class="grid gap-1">
                <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
                  <p class="font-medium">Nasi Ayam Kremes</p>
                  <help-badge label="Available" color="positive" />
                </div>
                <p class="text-small text-grey-3">Minuman</p>
              </div>
              <p class="text-small text-grey-2 mb-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam autem
                reprehenderit blanditiis ipsum ea voluptate. Loi adipisicing elit. Laboriosam autem
                reprehenderit blanditiis ipsum ea voluptate. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Molestiae impedit ipsam quisquam ullam pariatur autem nisi aut est
                vel velit, eveniet amet illum error quidem deserunt rem similique! Rem, nam?
              </p>
            </div>
            <p class="text-small font-medium">Rp 30.000</p>
          </div>
          <div class="h-28 grid grid-flow-col place-items-center gap-2">
            <help-toggle />
            <icon name="chevron-down" class="cursor-pointer" />
          </div>
        </div>
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
import Icon from '@/components/atoms/Icon.vue';

export default {
  name: 'Seller',
  components: {
    HelpBadge,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    Icon,
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
