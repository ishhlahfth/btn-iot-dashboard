<template>
  <div
    class="grid grid-flow-col gap-6"
    style="width: 85vw; height: 87.5vh; grid-template-columns: 400px 1fr;"
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
      <div class="grid grid-cols-2 gap-y-4 gap-x-14 font-medium">
        <p class="text-grey-2">Name</p>
        <p>{{ seller.name }}</p>
        <p class="text-grey-2">Location</p>
        <p>{{ seller.city }}</p>
        <p class="text-grey-2">Joined Since</p>
        <p>{{ seller.joinedDate }}</p>
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
      <div class="grid grid-cols-2 gap-y-4 gap-x-14 font-medium">
        <p class="text-grey-2">Finished Orders</p>
        <p>12.031</p>
        <p class="text-grey-2">On Going Orders</p>
        <p>221</p>
        <p class="text-grey-2">Cancelled Orders</p>
        <p>457</p>
      </div>
    </div>

    <div class="overflow-auto">
      <div v-for="(catalog, i) in seller.menu" :key="i">
        <p class="pl-2 py-1 font-medium">{{ catalog.catalog_name }}</p>
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuCard from '@/components/molecules/MenuCard.vue';

export default {
  name: 'SellerDetail',
  components: {
    MenuCard,
  },
  setup() {
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
      const id = 1;
      console.log(dayjs().format('D MMM YYYY'));
      try {
        const { data } = await axios.get(`http://localhost:3000/seller/${id}`);

        const mapped = [data].map((el) => ({
          imageUrl: el.image_url,
          name: el.name,
          city: el.city,
          joinedDate: dayjs(el.created_at).format('D MMM YYYY'),
          bank: el.bank,
          idNumber: el.id_number,
          verificationStatus: el.verification_status,
          finishedOrders: el.finished_orders,
          ongoingOrders: el.ongoing_orders,
          cancelledOrders: el.cancelled_orders,
          menu: el.menu,
        }));

        seller.value = mapped[0];
        console.log('🔰', seller.value);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getSeller();
    });
    return {
      seller,
      getSeller,
    };
  },
};
</script>

<style></style>
