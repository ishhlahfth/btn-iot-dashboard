<template>
  <div>
    <div v-if="!loading?.order" class="bg-white rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-purple-500 rounded-xl">
          <help-icon color="white" name="cube" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Order</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            {{ totalTransaction.order.toLocaleString('ID') }}
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge color="positive" icon="chevron-up" :label="'1.901'" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon :name="'chevron-down'" />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
  </div>
  <div>
    <div v-if="!loading?.eat" class="bg-white rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-yellow-500 rounded-xl">
          <help-icon color="white" name="cart" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Eat Transaction</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp {{ totalTransaction.eat ? totalTransaction.eat.toLocaleString('ID') : 0 }}</div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge color="positive" icon="chevron-up" :label="'1.901'" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon :name="'chevron-down'" />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
  </div>
  <div class="bg-white rounded-md grid grid-flow-row gap-4 p-4">
    <div class="grid grid-cols-4 grid-flow-row gap-2">
      <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-blue-600 rounded-xl">
        <help-icon color="white" name="truck" :size="8" />
      </div>
      <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
        <p class="text-sm text-gray-400">Delivery Fee</p>
        <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp 18.625.000</div>
      </div>
    </div>
    <div class="flex justify-end items-center p-1">
      <help-badge color="positive" icon="chevron-up" :label="'1.901'" />
    </div>
    <div class="text-center flex flex-row justify-center">
      <p class="text-royal text-xs font-small cursor-pointer">
        See more
      </p>
      <help-icon name="chevron-down" />
    </div>
  </div>
  <div>
    <div class="bg-white rounded-md grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-flame rounded-xl">
          <help-icon name="minus" color="white" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Commission</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp 18.625.000</div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge color="positive" icon="chevron-up" :label="'1.901'" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon :name="'chevron-down'" />
      </div>
    </div>
  </div>
</template>

<script>
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpIcon from '@/components/atoms/Icon.vue';

export default {
  name: 'SummaryCard',
  components: {
    HelpBadge,
    HelpIcon,
  },
  props: {
    loading: {
      order: {
        type: Boolean,
        default: false,
      },
      eat: {
        type: Boolean,
        default: false,
      },
      delivery: {
        type: Boolean,
        default: false,
      },
      commission: {
        type: Boolean,
        default: false,
      },
    },
    totalTransaction: {
      type: Object,
    },
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  mounted() {
    if (this.totalTransaction.order) {
      console.log(this.totalTransaction, 'totalllll');
    }
    console.log(this.loading);
  },
};
</script>

<style></style>
