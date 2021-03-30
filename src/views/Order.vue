<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Order</p>
      <!-- <div class="grid grid-flow-col gap-4">
        <help-button
          v-if="!transferMode"
          label="transfer"
          icon="switch-horizontal"
          @click="transferMode = true"
        />
        <template v-else>
          <help-button label="cancel" bg-color="flame" @click="transferMode = false" />
          <help-button label="transfer" bg-color="mint" @click="transferMode = !transferMode" />
        </template>
      </div> -->
    </div>
    <!-- <div>
      <form @submit.prevent="getOrders">
        <help-input
          v-model="searchValue"
          placeholder="Search order PO number here"
          right-icon="search"
        />
      </form>
    </div> -->
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
        <!-- <template v-slot:header="{ column: { field } }">
          <help-checkbox v-if="field === 'checkbox'" />
        </template> -->
        <template v-slot:body="{ column, row }">
          <!-- <help-checkbox v-if="column === 'checkbox'" /> -->
          <help-badge
            v-if="column === 'current_step'"
            :label="row.current_step"
            :color="
              row.current_step === 'Pesanan Selesai'
                ? 'positive'
                : row.current_step === 'Sedang Dikirim' ||
                  row.current_step === 'Menunggu Konfirmasi'
                ? 'warning'
                : 'negative'
            "
            @click="openMerchantVerivication(row)"
          />
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
import HelpBadge from '@/components/atoms/Badge.vue';
// import HelpButton from '@/components/atoms/Button.vue';
// import HelpCheckbox from '@/components/atoms/Checkbox.vue';
// import HelpInput from '@/components/atoms/Input.vue';
import HelpTable from '@/components/templates/Table.vue';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '@/apis';

export default {
  name: 'Order',
  mixins: [mixin],
  components: {
    HelpBadge,
    // HelpButton,
    // HelpCheckbox,
    // HelpInput,
    HelpTable,
  },
  data() {
    return {
      searchValue: '',
      columns: [
        { field: 'date', label: 'order date' },
        { field: 'code', label: 'PO Number' },
        { field: 'current_step', label: 'status', align: 'center' },
        { field: 'merchant_name', label: 'merchant name' },
        { field: 'customer_name', label: 'buyer name' },
        { field: 'subtotal_price', label: 'item price' },
        { field: 'commission_fee', label: 'commission' },
        { field: 'delivery_price', label: 'delivery price' },
        { field: 'payment_method', label: 'payment method' },
        { field: 'detail', label: 'detail', align: 'center' },
      ],
      transferMode: false,
      date: '',
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
  // computed: {
  //   columns() {
  //     const columns = [
  //       { field: 'date', label: 'order date' },
  //       { field: 'code', label: 'PO Number' },
  //       { field: 'current_step', label: 'status', align: 'center' },
  //       { field: 'merchant_name', label: 'merchant name' },
  //       { field: 'customer_name', label: 'buyer name' },
  //       // { field: 'failure_reason', label: 'failure reason' },
  //       // { field: 'subtotal_price', label: 'item price' },
  //       { field: 'commission_fee', label: 'commission' },
  //       { field: 'delivery_price', label: 'delivery price' },
  //       { field: 'payment_method', label: 'payment method' },
  //       { field: 'detail', label: 'detail', align: 'center' },
  //       // { field: 'actions', label: ' ' },
  //     ];
  //     // if (this.transferMode) {
  //     //   columns.unshift({ field: 'checkbox', label: 'checkbox', align: 'center' });
  //     // }
  //     return columns;
  //   },
  // },
  methods: {
    async getOrders(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      const sort = pagination.sort || 'date';
      const order = pagination.order || 'asc';
      const search = this.searchValue || '';
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(
          `orders?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}&search=${search}`,
        );

        this.orders = data.map((el) => ({
          id: el.id,
          code: el.code,
          date: dayjs(el.date).format('DD-MM-YYYY HH:mm:ss') || '-',
          current_step: el.current_step.title,
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
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
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
