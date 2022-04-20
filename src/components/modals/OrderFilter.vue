<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Filter Order</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form
      @submit.prevent="$emit('apply', { merchantName, paymentMethod: selectedPayment.value, orderStatus: selectedStatus.value,selectedStart: pickedStart, selectedEnd: pickedEnd })"
      class="grid gap-4"
    >
    <div class="w-full">
      <help-input type="text" v-model="merchantName" label="Merchant Name" placeholder="Merchant Name To Be Filtered" />
    </div>
      <div class="w-full">
        <help-select
          v-model="selectedStatus"
          label="Order Status"
          :options="orderStatus"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 justify-between py-3">
        <div>
          <label><strong>Start Date</strong></label>
            <div class="text-xs sm:text-md w-auto h-10 sm:h-full">
            <flat-pickr
              v-model="pickedStart"
              :config="config"
              class="form-control text-center border rounded-md h-full w-full"
              placeholder="Select date"
              name="dateStart"
              @click="showButton = true"
            />
          </div>
        </div>
        <div>
          <label><strong>End Date</strong></label>
            <div class="text-xs sm:text-md w-auto h-10 sm:h-full">
            <flat-pickr
              v-model="pickedEnd"
              :config="config"
              class="form-control text-center border rounded-md h-full w-full"
              placeholder="Select date"
              name="dateStart"
              @click="showButton = true"
            />
          </div>
        </div>
      </div>
      <div class="w-full">
        <help-select
          v-model="selectedPayment"
          label="Payment Method"
          :options="paymentMethods"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button label="apply" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import FlatPickr from 'vue-flatpickr-component';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import mixin from '@/mixin';
import store from '@/store';

export default {
  name: 'OrderFilter',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
    HelpSelect,
    FlatPickr,
  },
  setup() {
    const pickedStart = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const pickedEnd = ref(new Date());
    return {
      pickedStart,
      pickedEnd,
    };
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      merchantName: '',
      selectedPayment: { value: '', label: 'All' },
      paymentMethods: [
        { value: '', label: 'All' },
        { value: 'Gopay', label: 'Gopay' },
        { value: 'ShopeePay', label: 'ShopeePay' },
        { value: 'OVO', label: 'Ovo' },
        { value: 'Dana', label: 'Dana' },
      ],
      selectedStatus: { value: '', label: 'All' },
      orderStatus: [
        { value: '', label: 'All' },
        { value: 'NEW', label: 'Menunggu Konfirmasi' },
        { value: 'PENDING', label: 'Menunggu Pembayaran' },
        { value: 'PAYMENT_EXPIRED', label: 'Pembayaran Kadaluarsa' },
        { value: 'PAYMENT_FAILURE', label: 'Pembayaran Gagal' },
        { value: 'CANCELED', label: 'Pesanan Dibatalkan' },
        { value: 'MIDDLE', label: 'Dalam Proses Pengiriman' },
        { value: 'REJECTED', label: 'Pesanan Ditolak' },
        { value: 'ISSUED_COMPLAINT', label: 'Mengajukan Komplain' },
        { value: 'REFUNDED', label: 'Pesanan Gagal' },
        { value: 'COMPLETED', label: 'Pesanan Selesai' },
      ],
      date: {
        start: ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        end: ref(new Date()),
      },
      selectedStart: '',
      selectedEnd: '',
      config: {
        wrap: true,
        locale: 'ID',
        disableMobile: 'true',
      },
    };
  },
  computed: {
    screenWidth() {
      return store.state.screenWidth;
    },
  },
  mounted() {
    this.merchantName = this.filter.merchantName;
    this.selectedPayment = this.paymentMethods.filter(
      (el) => el.value === this.filter.paymentMethod,
    )[0];
    this.selectedStatus = this.orderStatus.filter(
      (el) => el.value === this.filter.orderStatus,
    )[0];
    this.selectedStart = this.date.start;
    this.selectedEnd = this.date.end;
  },
};
</script>

<style></style>
