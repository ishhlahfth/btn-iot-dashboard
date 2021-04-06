<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Filter Order</p>
      <help-button icon-only icon="close" bg-color="transparent" color="grey-1" />
    </div>
    <form @submit.prevent="$emit('apply', selectedPayment)" class="grid gap-4">
      <div class="w-full">
        <help-select
          v-model="selectedPayment"
          label="Payment Method"
          :options="paymentMethods"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button label="cancel" bg-color="transparent" color="grey-1" />
        <help-button label="apply" type="submit" />
      </div>
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';

export default {
  name: 'OrderFilter',
  components: {
    HelpButton,
    HelpSelect,
  },
  data() {
    return {
      selectedPayment: '',
      paymentMethods: ['Gopay', 'ShopeePay', 'Ovo', 'Dana'],
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    apply() {
      console.log('Ngantuk');
    },
  },
};
</script>

<style></style>
