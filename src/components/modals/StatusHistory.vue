<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Change Order Status</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <div class="grid gap-1">
      <div class="flex justify-between">
        <div class="grid grid-flow-col gap-4 place-items-center">
          <div class="bg-royal rounded-full h-7 w-7"></div>
          <p class="font-medium">New</p>
        </div>
        <div>
          <p class="text-grey-2">23-10-2021 18:20</p>
        </div>
      </div>
      <div class="pl-3">
        <div class="bg-royal w-1 h-5"></div>
      </div>

      <div class="flex justify-between">
        <div class="grid grid-flow-col gap-4 place-items-center">
          <div class="bg-royal rounded-full h-7 w-7"></div>
          <p class="font-medium">Pending Payment</p>
        </div>
        <div>
          <p class="text-grey-2">23-10-2021 18:20</p>
        </div>
      </div>
      <div class="pl-3">
        <div class="bg-royal w-1 h-5"></div>
      </div>

      <div class="flex justify-between">
        <div class="grid grid-flow-col gap-4 place-items-center">
          <div class="bg-mint rounded-full h-7 w-7 grid place-items-center">
            <icon name="check" color="white" />
          </div>
          <p class="font-medium">Finished</p>
        </div>
        <div>
          <p class="text-grey-2">23-10-2021 18:20</p>
        </div>
      </div>
    </div>
    <!-- <form @submit.prevent="$emit('apply', selectedPayment.value)" class="grid gap-4">
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
    </form> -->
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
// import HelpSelect from '@/components/molecules/Select.vue';
import Icon from '@/components/atoms/Icon.vue';

export default {
  name: 'OrderFilter',
  components: {
    HelpButton,
    // HelpSelect,
    Icon,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedPayment: { value: '', label: 'All' },
      paymentMethods: [
        { value: '', label: 'All' },
        { value: 'Gopay', label: 'Gopay' },
        { value: 'ShopeePay', label: 'ShopeePay' },
        { value: 'Ovo', label: 'Ovo' },
        { value: 'Dana', label: 'Dana' },
      ],
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  // mounted() {
  //   this.selectedPayment = this.paymentMethods.filter(
  //     (el) => el.value === this.filter.paymentMethod,
  //   )[0];
  // },
};
</script>

<style></style>
