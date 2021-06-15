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
        <help-badge
          :color="
            totalComparison.order.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'
          "
          :icon="
            totalComparison.order.data?.data[0].totalComparison > 0 ? 'chevron-up' : 'chevron-down'
          "
          :label="
            `${
              totalComparison.order.data?.data.length > 0
                ? totalComparison.order.data?.data[0].totalComparison.toLocaleString('ID')
                : 0
            }`
          "
        />
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
        <template v-if="paymentMethod?.order.length || deliveryMethod?.order.length">
          <template v-if="!next.order">
            <template v-for="(payment, i) in paymentMethod.order" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-1/2 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${payment.name.toUpperCase().toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{ payment.totalCount ? payment.totalCount.toLocaleString('ID') : 0 }}
                  </p>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="(delivery, i) in deliveryMethod.order" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-1/2 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${delivery.name.toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{
                      delivery.totalCount ? delivery.totalCount.toLocaleString('ID') : 0
                    }}
                  </p>
                </div>
              </div>
            </template>
          </template>
        </template>
        <div class="flex justify-between">
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.order" @click="show.order = false" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small">
                Hide
              </p>
              <help-icon :name="'chevron-up'" />
            </div>
            <div v-else class="flex cursor-pointer">
              <help-icon :name="'chevron-left'" />
              <p class="text-royal text-xs font-small" @click="next.order = false">
                Previous
              </p>
            </div>
          </div>
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.order" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small" @click="next.order = true">
                Next
              </p>
              <help-icon :name="'chevron-right'" />
            </div>
            <div v-else>
              <div
                class="text-center flex flex-row justify-center cursor-pointer"
                @click="show.order = false"
              >
                <p class="text-royal text-xs font-small">
                  Hide
                </p>
                <help-icon :name="'chevron-up'" />
              </div>
            </div>
          </div>
        </div>
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
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            Rp {{ totalTransaction?.eat ? Number(totalTransaction.eat).toLocaleString('ID') : 0 }}
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge
          :icon="
            totalComparison.eat.data?.data[0].totalComparison > 0
              ? 'chevron-up'
              : 'chevron-down'
          "
          :color="
            totalComparison.eat.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'
          "
          :label="
            `Rp ${
              totalComparison.eat.data?.data.length > 0
                ? totalComparison.eat.data?.data[0].totalComparison.toLocaleString('ID')
                : 0
            }`
          "
        />
      </div>
      <div
        :class="[
          'text-center flex flex-row justify-center',
          {
            hidden: show.eat,
            visible: !show.eat,
          },
        ]"
        @click="show.eat = true"
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
            hidden: !show.eat,
          },
        ]"
      >
        <template v-if="paymentMethod?.eat.length || deliveryMethod?.eat.length">
          <template v-if="!next.eat">
            <template v-for="(payment, i) in paymentMethod.eat" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-3/4 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${payment.name.toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{
                      payment.totalTransaction
                        ? `Rp ${Number(String(payment.totalTransaction).slice(0, -3)).toLocaleString('ID')}`
                        : 0
                    }}
                  </p>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="(delivery, i) in deliveryMethod.eat" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-3/4 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${delivery.name.toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{
                      delivery.totalTransaction
                        ? `Rp ${Number(String(delivery.totalTransaction).slice(0, -3)).toLocaleString(
                            'ID',
                          )}`
                        : 0
                    }}
                  </p>
                </div>
              </div>
            </template>
          </template>
        </template>
        <div class="flex justify-between">
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.eat" @click="show.eat = false" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small">
                Hide
              </p>
              <help-icon :name="'chevron-up'" />
            </div>
            <div v-else class="flex cursor-pointer">
              <help-icon :name="'chevron-left'" />
              <p class="text-royal text-xs font-small" @click="next.eat = false">
                Previous
              </p>
            </div>
          </div>
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.eat" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small" @click="next.eat = true">
                Next
              </p>
              <help-icon :name="'chevron-right'" />
            </div>
            <div v-else>
              <div
                class="text-center flex flex-row justify-center cursor-pointer"
                @click="show.eat = false"
              >
                <p class="text-royal text-xs font-small">
                  Hide
                </p>
                <help-icon :name="'chevron-up'" />
              </div>
            </div>
          </div>
        </div>
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
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            Rp
            {{
              Number(totalTransaction.delivery).toLocaleString('ID')
            }}
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge
          :icon="
            totalComparison.delivery.data?.data[0].totalComparison > 0
              ? 'chevron-up'
              : 'chevron-down'
          "
          :color="
            totalComparison.delivery.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'
          "
          :label="
            `Rp ${
              totalComparison.delivery.data?.data.length > 0
                ? totalComparison.delivery.data?.data[0].totalComparison.toLocaleString('ID')
                : 0
            }`
          "
        />
      </div>
      <div
        :class="[
          'text-center flex flex-row justify-center',
          {
            hidden: show.delivery,
            visible: !show.delivery,
          },
        ]"
        @click="show.delivery = true"
      >
        <p class="text-royal text-xs font-small cursor-pointer">
          See more
        </p>
        <help-icon name="chevron-down" />
      </div>
      <div
        :class="[
          'bg-white rounded-lg grid grid-flow-row gap-4 tracking-wider',
          {
            hidden: !show.delivery,
          },
        ]"
      >
        <template v-if="paymentMethod?.delivery.length || deliveryMethod?.delivery.length">
          <template v-if="!next.delivery">
            <template v-for="(payment, i) in paymentMethod.delivery" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-3/4 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${payment.name.toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{
                      payment.totalTransaction
                        ? `Rp ${Number(String(payment.totalTransaction).slice(0, -3)).toLocaleString('ID')}`
                        : 0
                    }}
                  </p>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <template v-for="(delivery, i) in deliveryMethod.delivery" :key="i">
              <div class="rounded-xl p-2 border border-gray-200 shadow-sm mb-2">
                <div class="w-3/4 flex flex-row items-center justify-between">
                  <div>
                    <help-avatar
                      :src="require(`@/assets/partnerlogo/${delivery.name.toUpperCase()}-logo-circle.png`)"
                      class="mx-2"
                      :size="48"
                    />
                  </div>
                  <p class="text-heading3 font-medium">
                    {{
                      delivery.totalTransaction
                        ? `Rp ${Number(String(delivery.totalTransaction).slice(0, -3)).toLocaleString(
                            'ID',
                          )}`
                        : 0
                    }}
                  </p>
                </div>
              </div>
            </template>
          </template>
        </template>
        <div class="flex justify-between">
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.delivery" @click="show.delivery = false" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small">
                Hide
              </p>
              <help-icon :name="'chevron-up'" />
            </div>
            <div v-else class="flex cursor-pointer">
              <help-icon :name="'chevron-left'" />
              <p class="text-royal text-xs font-small" @click="next.delivery = false">
                Previous
              </p>
            </div>
          </div>
          <div class="text-center flex flex-row justify-center">
            <div v-if="!next.delivery" class="flex cursor-pointer">
              <p class="text-royal text-xs font-small" @click="next.delivery = true">
                Next
              </p>
              <help-icon :name="'chevron-right'" />
            </div>
            <div v-else>
              <div
                class="text-center flex flex-row justify-center cursor-pointer"
                @click="show.delivery = false"
              >
                <p class="text-royal text-xs font-small">
                  Hide
                </p>
                <help-icon :name="'chevron-up'" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
  </div>
  <div>
    <div v-if="!loading?.commision" class="bg-white rounded-md grid grid-flow-row gap-4 p-4 h-44">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-flame rounded-xl">
          <help-icon name="minus" color="white" :size="8" />
        </div>
        <div class="col-span-2 grid grid-flow-row gap-1 auto-cols-max">
          <p class="text-sm text-gray-400">Commission</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            Rp
            {{
              Number(totalTransaction.commision).toLocaleString('ID')
            }}
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center p-1">
        <help-badge
          :color="
            totalComparison.commision.data?.data[0].totalComparison > 0 ? 'positive' : 'negative'
          "
          :icon="
            totalComparison.commision.data?.data[0].totalComparison > 0 ? 'chevron-up' : 'chevron-down'
          "
          :label="
            `Rp ${
              totalComparison.commision.data?.data.length > 0
                ? totalComparison.commision.data?.data[0].totalComparison.toLocaleString('ID')
                : 0
            }`
          "
        />
      </div>
    </div>
    <div v-else class="rounded-lg p-4 animate-pulse bg-grey-4 h-44"></div>
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
      next: {
        order: false,
        eat: false,
        delivery: false,
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
    paymentMethod: {
      type: Object,
    },
    deliveryMethod: {
      type: Object,
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
  mounted() {
    console.log(this.totalComparison);
    this.show.order = false;
    this.show.eat = false;
    this.show.delivery = false;
  },
};
</script>

<style></style>
