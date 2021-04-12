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
        <template v-slot:body="{ column, row }">
          <help-toggle v-if="column === 'is_active'" v-model="row.is_active" />
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';

export default {
  name: 'Payment',
  components: {
    HelpTable,
    HelpToggle,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      columns: [
        { field: 'name', label: 'name' },
        { field: 'is_active', label: 'status' },
      ],
      payments: [],
      paymentPagination: {
        limit: 10,
        offset: 0,
        sort: 'name',
        order: 'asc',
      },
      loading: false,
    };
  },
  methods: {
    async getPayments() {
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get('payments');
        this.payments = data.map((el) => ({
          name: el.name,
          is_active: el.is_active,
        }));
        console.log('🔰 PAYMENTS', data);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getPayments();
  },
};
</script>

<style></style>
