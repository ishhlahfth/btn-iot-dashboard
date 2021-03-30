<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Order</p>
      <!-- <help-button label="transfer" /> -->
    </div>
    <div>
      <form @submit.prevent="getOrders">
        <help-input
          v-model="searchValue"
          placeholder="Search order PO number here"
          right-icon="search"
        />
      </form>
    </div>
    <div class="overflow-hidden">
      <help-table
        path="orders"
        :columns="columns"
        :loading="loading"
        :rows="orders"
        :pagination="orderPagination"
        @onChangePagination="getOrders($event)"
        @sort="getOrders($event)"
      >
        <template v-slot="{ column, row }">
          <p
            v-if="column === 'detail'"
            class="text-royal font-medium cursor-pointer"
            @click="openOrderDetail(row.id)"
          >
            See Detail
          </p>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '@/apis';

export default {
  name: 'Order',
  mixins: [mixin],
  components: {
    HelpInput,
    HelpTable,
  },
  data() {
    return {
      searchValue: '',
      columns: [
        { field: 'date', label: 'order date', sortable: true },
        { field: 'code', label: 'PO Number', sortable: true },
        { field: 'merchant_name', label: 'merchant name', sortable: true },
        { field: 'customer_name', label: 'buyer name', sortable: true },
        {
          field: 'transfer_status',
          label: 'transfer status',
          align: 'center',
          sortable: true,
        },
        { field: 'failure_reason', label: 'failure reason' },
        { field: 'subtotal_price', label: 'item price', sortable: true },
        { field: 'commission_fee', label: 'commission', sortable: true },
        { field: 'delivery_price', label: 'delivery price', sortable: true },
        { field: 'payment_method', label: 'payment method', sortable: true },
        { field: 'updated_at', label: 'last updated', sortable: true },
        { field: 'updated_by', label: 'updated by', sortable: true },
        { field: 'detail', label: 'detail', align: 'center' },
        // { field: 'actions', label: ' ' },
      ],
      orders: [],
      orderPagination: {
        limit: 10,
        offset: 0,
        sort: 'date',
        order: 'asc',
      },
      loading: false,
    };
  },
  methods: {
    async getOrders(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      const sort = pagination.sort || 'date';
      const order = pagination.order || 'asc';
      const search = this.searchValue || '';
      try {
        const {
          data: { data },
        } = await API.get(
          `orders?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`,
        );

        this.orders = data.map((el) => ({
          id: el.id,
          code: el.code,
          date: dayjs(el.date).format('DD-MM-YYYY HH:mm:ss') || '-',
          merchant_name: el.merchant?.name,
          customer_name: el.customer?.profile?.name,
          commission_fee: this.convertToRp(el.commission_fee),
          subtotal_price: this.convertToRp(el.subtotal_price),
          delivery_price: this.convertToRp(el.order_type_details?.delivery_method?.price),
          payment_method: el.payment.name,
        }));

        this.orderPagination = {
          limit,
          offset,
          sort,
          order,
        };
        console.log('ORDERS:', data);
      } catch (error) {
        console.log(error);
      }
    },
    openOrderDetail() {
      console.log('OPEN ORDER DETAIL');
    },
  },
  async mounted() {
    this.getOrders(this.orderPagination);
  },
};
</script>
