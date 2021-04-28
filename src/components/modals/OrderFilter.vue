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
      @submit.prevent="$emit('apply', { merchantName, paymentMethod: selectedPayment.value })"
      class="grid gap-4"
    >
      <div class="w-full">
        <help-input v-model="merchantName" label="Merchant Name" placeholder="Type a merchant" />
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
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';

export default {
  name: 'OrderFilter',
  components: {
    HelpButton,
    HelpInput,
    HelpSelect,
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
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  mounted() {
    this.merchantName = this.filter.merchantName;
    this.selectedPayment = this.paymentMethods.filter(
      (el) => el.value === this.filter.paymentMethod,
    )[0];
  },
};
</script>

<style></style>
