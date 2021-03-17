<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 seller-modal-content inner-modal-fixed modal-xl overflow-auto"
  >
    <div class="grid gap-4 auto-rows-max overflow-auto">
      <div class="w-full grid place-items-center py-8">
        <img
          v-if="seller.imageUrl"
          :src="seller.imageUrl"
          alt="menu"
          class="w-44 h-44 object-cover rounded-full"
        />
        <div
          v-else
          class="w-44 h-44 border-2 border-dashed border-grey-4 rounded-full grid place-items-center text-small"
        >
          No Image
        </div>
      </div>
      <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 font-medium">
        <p class="text-grey-2">Name</p>
        <p>{{ seller.name }}</p>
        <p class="text-grey-2">Location</p>
        <p>{{ seller.city }}</p>
        <!-- <p class="text-grey-2">Joined Since</p>
        <p>{{ seller.joinedDate }}</p> -->
        <p class="text-grey-2">Bank</p>
        <p>{{ seller.bank }}</p>
        <p class="text-grey-2">ID No. (KTP)</p>
        <p>{{ seller.idNumber }}</p>
        <p class="text-grey-2">Status</p>
        <p :class="seller.verification_status ? 'text-mint' : 'text-flame'">
          {{ seller.verification_status ? 'Verified' : 'Not Verified' }}
        </p>
      </div>
      <div class="divide-y divide-grey-4">
        <p></p>
        <p></p>
      </div>
      <div class="grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 font-medium">
        <p class="text-grey-2">Finished Orders</p>
        <p>{{ seller.finishedOrders }}</p>
        <p class="text-grey-2">On Going Orders</p>
        <p>{{ seller.ongoingOrders }}</p>
        <p class="text-grey-2">Cancelled Orders</p>
        <p>{{ seller.cancelledOrders }}</p>
      </div>
      <div class="divide-y divide-grey-4 sm:hidden">
        <p></p>
        <p></p>
      </div>
    </div>

    <div class="overflow-auto hide-scrollbar">
      <div v-for="(catalog, i) in seller.menu" :key="i">
        <p class="sm:pl-2 py-1 font-medium">{{ catalog.catalog_name }}</p>
        <div class="divide-y divide-grey-4">
          <menu-card
            v-for="(item, i) in catalog.items"
            :key="i"
            :image-url="item.image_url"
            :name="item.name"
            :category="item.category"
            :description="item.description"
            :price="item.price"
            :availability-status="item.availability_status"
            :is-active="item.is_active"
            :variants="item.variants"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, inject } from 'vue';
import axios from 'axios';
// import dayjs from 'dayjs';
import MenuCard from '@/components/molecules/MenuCard.vue';

export default {
  name: 'SellerDetail',
  components: {
    MenuCard,
  },
  setup() {
    const store = inject('store');
    const seller = ref({
      imageUrl: '',
      name: '',
      city: '',
      joinedDate: '',
      bank: '',
      idNumber: '',
      verificationStatus: false,
      finishedOrders: 0,
      ongoingOrders: 0,
      cancelledOrders: 0,
      menu: [],
    });
    const getSeller = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://buynsell-dev.wehelpyou.xyz/api/v1/merchants/${store.state.modalState.id}`,
          {
            headers: {
              'x-api-key': 'secret-xApiKey-for-developer',
              'x-device-type': 'LINUX',
              'x-device-os-version': 'Ubuntu18.04',
              'x-device-model': '4s-dk0115AU',
              'x-app-version': 'v1.2',
              'x-request-id': '1234',
              'x-device-utc-offset': '+08:00',
              'x-device-lang': 'en',
              'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
            },
          },
        );
        console.log('SELLER DETAIL', data);

        const mapped = {
          imageUrl: data.banners.length ? data.banners[0].url : '',
          name: data.name,
          city: data.address.city.name,
          // joinedDate: dayjs(data.created_at).format('D MMM YYYY'),
          bank: data.account.bank.name,
          // idNumber: data.id_number,
          verificationStatus: data.is_verified,
          finishedOrders: 20300,
          ongoingOrders: 20300,
          cancelledOrders: 20300,
          menu: [],
        };

        seller.value = mapped;
      } catch (error) {
        console.log(error);
      }
    };

    const getMenu = async () => {
      const {
        data: { data: catalogs },
      } = await axios.get(
        `http://buynsell-dev.wehelpyou.xyz/api/v1/merchants/${store.state.modalState.id}/catalogs`,
        {
          headers: {
            'x-api-key': 'secret-xApiKey-for-developer',
            'x-device-type': 'LINUX',
            'x-device-os-version': 'Ubuntu18.04',
            'x-device-model': '4s-dk0115AU',
            'x-app-version': 'v1.2',
            'x-request-id': '1234',
            'x-device-utc-offset': '+08:00',
            'x-device-lang': 'en',
            'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
          },
        },
      );

      catalogs.forEach(async (el) => {
        const {
          data: { data: items },
        } = await axios.get(
          `http://buynsell-dev.wehelpyou.xyz/api/v1/catalogs/${el.id}/items?status=AVAILABLE,UNAVAILABLE,OUT_OF_STOCK`,
          {
            headers: {
              'x-api-key': 'secret-xApiKey-for-developer',
              'x-device-type': 'LINUX',
              'x-device-os-version': 'Ubuntu18.04',
              'x-device-model': '4s-dk0115AU',
              'x-app-version': 'v1.2',
              'x-request-id': '1234',
              'x-device-utc-offset': '+08:00',
              'x-device-lang': 'en',
              'x-device-notification-code': 'secret-xDeviceNotificationCode-for-developer',
            },
          },
        );
        seller.value.menu.push({ catalog_name: el.name, items });
        console.log('ITEMS', items);
      });
    };
    onMounted(() => {
      getSeller();
      getMenu();
    });
    return {
      seller,
      getSeller,
    };
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
.seller-modal-content {
  @apply grid-flow-row;
  @apply auto-rows-max;
  @media screen and (min-width: 640px) {
    grid-template-columns: 400px 1fr;
    grid-auto-rows: initial;
  }
}
</style>
