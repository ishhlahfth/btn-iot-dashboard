<template>
  <merchant-item-form
  v-if="addProductActive"
  @close="addProductActive = false"
  />
  <template v-else>
    <div class="divide-y divide-grey-4 pb-2">
      <div class="grid grid-flow-row sm:grid-cols-2 py-2 items-center">
        <span class="font-semibold text-heading4 text-center sm:text-left">MERCHANT DETAIL</span>
        <div class="flex justify-center pt-3 sm:pt-0 sm:justify-end">
          <span @click="addProductActive = !addProductAcrive" class="font-medium shadow-sm py-2 px-6 rounded-2xl cursor-pointer border hover:shadow-md flex items-center"><icon name="plus-circle" :size="6" />&nbsp;<p class="md:text-medium text-small">Add Product</p></span>&nbsp;
          <span @click="$emit('closeMerchant')" class="font-medium bg-red-600 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md flex items-center"><icon name="close" :size="5" />&nbsp;<p class="md:text-medium text-small">Close</p></span>
        </div>
      </div>
      <p></p>
    </div>
    <div
      class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
      :class="{ 'animate-pulse': loading }"
    >
      <div class="grid gap-4 auto-rows-max overflow-auto">
        <div class="w-full grid place-items-center py-8">
          <template v-if="!loading">
            <img
              v-if="merchant.imageUrl"
              :src="merchant.imageUrl"
              alt="menu"
              class="w-44 h-44 object-cover rounded-full"
            />
            <div
              v-else
              class="w-44 h-44 border-2 border-dashed border-grey-4 rounded-full grid place-items-center text-small"
            >
              No Image
            </div>
          </template>
          <template v-else>
            <div class="w-44 h-44 rounded-full bg-grey-4"></div>
          </template>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 font-medium">
          <template v-if="!loading">
            <p class="text-grey-2">Name</p>
            <p>{{ merchant.name }}</p>
            <p class="text-grey-2">Address</p>
            <p>
              {{ merchant.address }}
              <icon
                name="location-marker"
                class="text-flame inline hover:text-red-300 transition-all cursor-pointer"
                @click="seeLocation"
              />
            </p>
            <p class="text-grey-2">Phone No.</p>
            <p>{{ merchant.phoneNumber }}</p>
            <p class="text-grey-2">Bank</p>
            <p>{{ merchant.bank }}</p>
            <p class="text-grey-2">ID No. (KTP)</p>
            <p>{{ merchant.idNumber }}</p>
            <p class="text-grey-2">Verification Status</p>
            <p
              :class="
                translateStatus(merchant.verificationStatus) === 'Terverifikasi'
                  ? 'text-mint'
                  : translateStatus(merchant.verificationStatus) === 'Pending Verifikasi'
                  ? 'text-gold'
                  : 'text-flame'
              "
            >
              {{ translateStatus(merchant.verificationStatus) }}
            </p>
            <p class="text-grey-2">Status Last Updated</p>
            <p>{{ merchant.verificationDate }}</p>
          </template>
          <template v-else>
            <div v-for="i in 10" :key="i" class="rounded bg-grey-4 h-4"></div>
          </template>
        </div>
        <div class="divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 font-medium">
          <template v-if="!loading">
            <p class="text-grey-2">Order Completed</p>
            <p>{{ merchant.summary?.completed }}</p>
            <p class="text-grey-2">Order Canceled</p>
            <p>{{ merchant.summary?.canceled }}</p>
            <p class="text-grey-2">Order Rejected</p>
            <p>{{ merchant.summary?.rejected }}</p>
            <p class="text-grey-2">Payment Expired</p>
            <p>{{ merchant.summary?.paymentExpired }}</p>
            <p class="text-grey-2">Payment Failure</p>
            <p>{{ merchant.summary?.paymentFailure }}</p>
            <p class="text-grey-2">Delivery Failed</p>
            <p>{{ merchant.summary?.deliveryFailed }}</p>
            <p class="text-grey-2">Order Refunded</p>
            <p>{{ merchant.summary?.refunded }}</p>
          </template>
          <template v-else>
            <div v-for="i in 6" :key="i" class="rounded bg-grey-4 h-4"></div>
          </template>
        </div>
        <div class="divide-y divide-grey-4">
          <p></p>
          <p></p>
        </div>
        <div class="grid grid-cols-2 gap-y-4 gap-x-6 font-medium">
          <template v-if="!loading">
            <p class="text-grey-2">Items Sold</p>
            <p>{{ merchant.summary?.sold }}</p>
          </template>
          <template v-else>
            <div class="rounded bg-grey-4 h-4"></div>
          </template>
        </div>
        <div class="divide-y divide-grey-4 sm:hidden">
          <p></p>
          <p></p>
        </div>
      </div>

      <div class="overflow-auto hide-scrollbar">
        <template v-if="!loading">
          <template v-if="merchant.menu?.length">
            <div v-for="(catalog, i) in merchant.menu" :key="i">
              <p class="sm:pl-2 py-1 font-medium">{{ catalog.catalog_name }}</p>
              <div class="divide-y divide-grey-4">
                <template v-if="catalog.items.length">
                  <menu-card
                    v-for="(item, i) in catalog.items"
                    :key="i"
                    :raw="item"
                    :image-url="item.banners.length ? item.banners[0].url : ''"
                    :name="item.name"
                    :category="item.group.name"
                    :description="item.description"
                    :price="item.price"
                    :availability-status="translateItemStatus(item.status)"
                    :is-active="item.is_active"
                    :variants="item.variations"
                    @openItemStatusModal="$emit('openItemStatusModal')"
                  />
                </template>
                <template v-else>
                  <p class="sm:px-2 sm:ml-2 py-1 text-gold-dark bg-gold-soft rounded-md inline">
                    No items found in this catalog
                  </p>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <p class="sm:px-2 sm:ml-2 py-8 text-center text-gold-dark bg-gold-soft rounded-md">
              No catalogs found in this merchant
            </p>
          </template>
        </template>
        <template v-else>
          <div>
            <div class="sm:pl-2 py-1">
              <div class="rounded bg-grey-4 h-4 w-32"></div>
            </div>
            <div class="divide-y divide-grey-4">
              <menu-card v-for="i in 5" :key="i" :loading="loading" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </template>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
// import HelpButton from '@/components/atoms/Button.vue';
import MenuCard from '@/components/molecules/MenuCard.vue';
import MerchantItemForm from '@/components/molecules/MerchantItemForm.vue';
import mixin from '@/mixin';

export default {
  name: 'MerchantDetail',
  mixins: [mixin],
  emits: ['openItemStatusModal', 'closeMerchant'],
  data() {
    return {
      addProductActive: false,
    };
  },
  components: {
    Icon,
    MenuCard,
    // HelpButton,
    MerchantItemForm,
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    },
    loading() {
      return this.$store.state.loading.merchant;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    seeLocation() {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${this.merchant.location[0]},${this.merchant.location[1]}`,
      );
    },
  },
  async mounted() {
    await this.$store.dispatch('loadMerchant', this.$store.state.merchantId);
  },
};
</script>

<style lang="scss" scoped>
.template-cols-auto-1fr {
  grid-template-columns: auto 1fr;
}
.template-cols-fixed-1fr {
  grid-template-columns: 400px 1fr;
}
.merchant-modal-content {
  @apply grid-flow-row;
  @apply auto-rows-max;
  @media screen and (min-width: 640px) {
    grid-template-columns: 400px 1fr;
    grid-auto-rows: initial;
  }
}
</style>
