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
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
  </div>
  <div>
    <div v-if="!loading?.eat" class="bg-white rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-yellow-500 rounded-xl">
          <help-icon color="white" name="cart" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Eat Transaction</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp {{ totalTransaction.eat ? Number(totalTransaction.eat).toLocaleString('ID') : 0 }}</div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge :color="totalComparison.delivery.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'" icon="chevron-up" :label="`Rp ${totalComparison.eat.data?.data.length > 0 ? totalComparison.eat.data?.data[0].totalComparison.toLocaleString('ID') : 0}`" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon :name="'chevron-down'" />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
  </div>
  <div>
    <div v-if="!loading?.delivery" class="bg-white rounded-md grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-blue-600 rounded-xl">
          <help-icon color="white" name="truck" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Delivery Fee</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp {{ totalTransaction.delivery ? Number(totalTransaction.delivery).toLocaleString('ID') : 0 }}</div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge :color="totalComparison.delivery.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'" icon="chevron-up" :label="`Rp ${totalComparison.delivery.data?.data.length > 0 ? totalComparison.delivery.data?.data[0].totalComparison.toLocaleString('ID') : 0}`" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon name="chevron-down" />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
  </div>
  <div>
    <div v-if="!loading?.commision" class="bg-white rounded-md grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-flame rounded-xl">
          <help-icon name="minus" color="white" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Commission</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">Rp {{ totalTransaction.commision ? Number(totalTransaction.commision).toLocaleString('ID') : 0 }}</div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge :color="totalComparison.commision.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'" icon="chevron-up" :label="`Rp ${totalComparison.commision.data?.data.length > 0 ? totalComparison.commision.data?.data[0].totalComparison.toLocaleString('ID') : 0}`" />
      </div>
      <div class="text-center flex flex-row justify-center">
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon :name="'chevron-down'" />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
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
    totalComparison: {
      type: Object,
    },
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  mounted() {
    console.log(this.totalComparison);
  },
};
</script>

<style></style>
