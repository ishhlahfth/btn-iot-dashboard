<template>
  <div class="grid sm:grid-cols-4 gap-4 relative">
    <template v-if="!loading">
      <div
        :class="[
          'bg-white rounded-lg grid grid-flow-row gap-4 p-4',
          {
            grid: show.eat || show.delivery || show.commision,
            'grid-flow-row': show.eat || show.delivery || show.commision,
            'sm:h-1/3': show.eat || show.delivery || show.commision,
          },
        ]"
      >
        <div class="grid grid-cols-4 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-purple-500 rounded-xl">
            <help-icon color="white" name="cube" :size="8" />
          </div>
          <div class="col-span-2 grid grid-flow-row gap-1">
            <p class="text-sm text-gray-400">Order</p>
            <div
              class="text-royal font-semibold text-heading4 sm:text-heading3 lg:text-heading4 leading-relaxed"
            >
              Rp 18.625.000
            </div>
          </div>
        </div>
        <div class="flex justify-end items-center p-1">
          <help-badge color="positive" icon="chevron-up" :label="'1.901'" />
        </div>
        <div
          :class="[
            'text-center flex flex-row justify-center',
            {
              hidden: show.order,
              visible: !show.order,
            },
          ]"
          @click="show.order = true"
        >
          <p class="text-royal text-xs font-small cursor-pointer">
            See more
          </p>
          <help-icon :name="'chevron-down'" />
        </div>
        <div
          :class="[
            'bg-white rounded-lg grid grid-flow-row gap-4 tracking-wider',
            {
              hidden: !show.order,
            },
          ]"
        >
          <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
            <div class="w-1/2 flex flex-row items-center justify-around">
              <help-avatar
                :src="'https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg'"
                class="mx-2"
              />
              <p class="text-heading3 font-medium">1231</p>
            </div>
          </div>
          <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
            <div class="w-1/2 flex flex-row items-center justify-around">
              <help-avatar
                :src="'https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg'"
                class="mx-2"
              />
              <p class="text-heading3 font-medium">1231</p>
            </div>
          </div>
          <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
            <div class="w-1/2 flex flex-row items-center justify-around">
              <help-avatar
                :src="'https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg'"
                class="mx-2"
              />
              <p class="text-heading3 font-medium">1231</p>
            </div>
          </div>
          <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
            <div class="w-1/2 flex flex-row items-center justify-around">
              <help-avatar
                :src="'https://www.whiteboardjournal.com/wp-content/uploads/2020/07/Fathia-12.jpg'"
                class="mx-2"
              />
              <p class="text-heading3 font-medium">1231</p>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="text-center flex flex-row justify-center" @click="show.order = false">
              <p class="text-royal text-xs font-small cursor-pointer">
                Hide
              </p>
              <help-icon :name="'chevron-up'" />
            </div>
            <div class="text-center flex flex-row justify-center">
              <p class="text-royal text-xs font-small cursor-pointer">
                Next
              </p>
              <help-icon :name="'chevron-right'" />
            </div>
          </div>
        </div>
      </div>
      <div
        :class="[
          'bg-white rounded-lg grid grid-flow-row gap-4 p-4',
          {
            grid: show.order || show.delivery || show.commision,
            'grid-flow-row': show.order || show.delivery || show.commision,
            'sm:h-1/3': show.order || show.delivery || show.commision,
          },
        ]"
      >
        <div class="grid grid-cols-4 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-yellow-500 rounded-xl">
            <help-icon color="white" name="cart" :size="8" />
          </div>
          <div class="col-span-2 grid grid-flow-row gap-1">
            <p class="text-sm text-gray-400">Eat Transaction</p>
            <div
              class="text-royal font-semibold text-heading4 sm:text-heading3 lg:text-heading4 leading-relaxed"
            >
              Rp 18.625.000
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
      <div
        :class="[
          'bg-white rounded-lg grid grid-flow-row gap-4 p-4',
          {
            grid: show.eat || show.order || show.commision,
            'grid-flow-row': show.eat || show.order || show.commision,
            'sm:h-1/3': show.eat || show.order || show.commision,
          },
        ]"
      >
        <div class="grid grid-cols-4 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-blue-600 rounded-xl">
            <help-icon color="white" name="truck" :size="8" />
          </div>
          <div class="col-span-2 grid grid-flow-row gap-1">
            <p class="text-sm text-gray-400">Delivery Fee</p>
            <div
              class="text-royal font-semibold text-heading4 sm:text-heading3 lg:text-heading4 leading-relaxed"
            >
              Rp 18.625.000
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
          <help-icon name="chevron-down" />
        </div>
      </div>
      <div
        :class="[
          'bg-white rounded-lg grid grid-flow-row gap-4 p-4',
          {
            grid: show.eat || show.delivery || show.order,
            'grid-flow-row': show.eat || show.delivery || show.order,
            'sm:h-1/3': show.eat || show.delivery || show.order,
          },
        ]"
      >
        <div class="grid grid-cols-4 grid-flow-row">
          <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-flame rounded-xl">
            <help-icon name="minus" color="white" :size="8" />
          </div>
          <div class="col-span-2 grid grid-flow-row gap-1">
            <p class="text-sm text-gray-400">Commission</p>
            <div
              class="text-royal font-semibold text-heading4 sm:text-heading3 lg:text-heading4 leading-relaxed"
            >
              Rp 18.625.000
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
    </template>
    <template v-else>
      <div class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
      <div class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
      <div class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
      <div class="rounded-lg p-4 animate-pulse bg-grey-4 h-40"></div>
    </template>
  </div>
</template>

<script>
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpIcon from '@/components/atoms/Icon.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';

export default {
  name: 'SummaryCard',
  data() {
    return {
      show: {
        order: false,
        eat: false,
        delivery: false,
        commision: false,
      },
    };
  },
  components: {
    HelpBadge,
    HelpIcon,
    HelpAvatar,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    partnerLogo() {
      return '@/assets/logo.png';
    },
  },
};
</script>

<style></style>
