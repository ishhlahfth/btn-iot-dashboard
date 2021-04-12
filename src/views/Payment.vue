<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Payment</p>
      <!-- <help-button label="filter" /> -->
    </div>
    <div class="overflow-hidden">
      <help-table
        path="payments"
        :columns="columns"
        :loading="loading"
        :rows="payments"
        :pagination="paymentPagination"
        @onChangePagination="getPayments($event)"
        @sort="getPayments($event)"
      >
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';

export default {
  name: 'Payment',
  components: {
    HelpTable,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      columns: [
        { field: 'id', label: 'id' },
        { field: 'name', label: 'name' },
        { field: 'is_active', label: 'status' },
      ],
      payments: [],
      paymentPagination: {
        limit: 10,
        offset: 0,
        sort: 'id',
        order: 'asc',
      },
      loading: false,
    };
  },
  methods: {
    async getPayments() {
      try {
        const {
          data: { data },
        } = await API.get('payments');
        console.log('🔰 PAYMENTS', data);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
  },
  mounted() {
    this.getPayments();
  },
};
</script>

<style></style>
