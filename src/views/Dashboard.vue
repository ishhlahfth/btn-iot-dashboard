<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Dashboard</p>
    </div>
    <div class="grid sm:grid-flow-col gap-4">
      <div class="bg-white grid grid-flow-row gap-2 p-4">
        <div class="grid grid-cols-3 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-purple-500 rounded-xl">
            <help-icon color="white" name="cube" :size="8" />
          </div>
          <p class="col-span-2 text-sm text-gray-400">Order</p>
          <div class="col-span-2 text-royal font-semibold text-heading4">21668</div>
        </div>
        <div class="flex justify-end items-center p-1">
          <help-badge :color="'positive'" icon="chevron-up" :label="'1.901'" />
        </div>
        <div class="text-center flex flex-row justify-center">
          <p class="text-royal text-xs cursor-pointer">
            See more
          </p>
          <help-icon :name="'chevron-down'" />
        </div>
      </div>
      <div class="bg-white rounded-lg grid grid-flow-row gap-2 p-4">
        <div class="grid grid-cols-3 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-yellow-500 rounded-xl">
            <help-icon color="white" name="cart" :size="8" />
          </div>
          <p class="col-span-2 text-sm text-gray-400">Delivery Fee</p>
          <div class="col-span-2 text-royal font-semibold text-heading4">Rp 18.625.000</div>
        </div>
        <div class="flex justify-end items-center p-1">
          <help-badge :color="'positive'" icon="chevron-up" :label="'1.901'" />
        </div>
        <div class="text-center flex flex-row justify-center">
          <p class="text-royal text-xs font-small cursor-pointer">
            See more
          </p>
          <help-icon :name="'chevron-down'" />
        </div>
      </div>
      <div class="bg-white rounded-md grid grid-flow-row gap-2 p-4">
        <div class="grid grid-cols-3 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-blue-600 rounded-xl">
            <help-icon color="white" name="truck" :size="8" />
          </div>
          <p class="col-span-2 text-sm text-gray-400">Delivery Fee</p>
          <div class="col-span-2 text-royal font-semibold text-heading4">Rp 18.625.000</div>
        </div>
        <div class="flex justify-end items-center p-1">
          <help-badge :color="'positive'" icon="chevron-up" :label="'1.901'" />
        </div>
        <div class="text-center flex flex-row justify-center">
          <p class="text-royal text-xs font-small cursor-pointer">
            See more
          </p>
          <help-icon :name="'chevron-down'" />
        </div>
      </div>
      <div class="bg-white rounded-md grid grid-flow-row gap-2 p-4">
        <div class="grid grid-cols-3 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-orange-500 rounded-xl">
            <help-icon name="cube" :size="8" />
          </div>
          <p class="col-span-2 text-sm text-gray-400">Delivery Fee</p>
          <div class="col-span-2 text-royal font-semibold text-heading4">Rp 18.625.000</div>
        </div>
        <div class="flex justify-end items-center p-1">
          <help-badge :color="'positive'" icon="chevron-up" :label="'1.901'" />
        </div>
        <div class="text-center flex flex-row justify-center">
          <p class="text-royal text-xs font-small cursor-pointer">
            See more
          </p>
          <help-icon :name="'chevron-down'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpIcon from '@/components/atoms/Icon.vue';

export default {
  name: 'Dashboard',
  components: {
    HelpBadge,
    HelpIcon,
  },
};
</script>

<style></style>
