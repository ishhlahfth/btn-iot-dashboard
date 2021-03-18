<template>
  <div class="p-4 grid gap-4 relative" :class="{ 'animate-pulse': loading }" id="invoice">
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
      <img src="../assets/sudah-bayar.png" alt="sudah-lunas" style="width: 75vw; max-width: none !important;">
    </div>

    <div class="w-full flex justify-center">
      <img src="../assets/logo-lowres.png" alt="logo" style="width: 128px;">
    </div>

    <div class="w-full grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 text-small">
      <p class="font-bold">Nomor PO</p>
      <p class="text-royal text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ poNumber }}</p>
      <p class="font-bold">Nama Penjual</p>
      <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ merchantName }}</p>
      <p class="font-bold">Tanggal Pembelian</p>
      <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ orderDate }}</p>
      <p class="font-bold">Nama Pembeli</p>
      <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ buyerName }}</p>
      <div class="col-span-2 grid gap-y-2">
        <p class="font-bold">Tujuan Pengiriman</p>
        <div class="grid gap-y-1" :class="{ 'bg-grey-4 rounded h-4': loading }">
          <p>{{ addressShort }}</p>
          <p>{{ addressFull }}</p>
          <p>{{ phoneNumber }}</p>
        </div>
      </div>
    </div>

    <div class="divide-y divide-grey-1"><p></p><p></p></div>

    <div class="w-full">
      <p class="text-small font-bold">Detail Pembelian</p>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-8 gap-1 font-bold">
          <p class="col-span-3">Nama Produk</p>
          <p class="col-span-1 text-right">Jumlah</p>
          <p class="col-span-2 text-right">Harga Barang</p>
          <p class="col-span-2 text-right">Subtotal</p>
        </div>
        <div v-for="item in items" :key="item.id" class="p-3 grid grid-cols-8 gap-1">
          <div class="col-span-3 grid gap-1">
            <p class="font-bold" :class="{ 'bg-grey-4 rounded': loading }">{{ item.name }}</p>
            <p :class="{ 'bg-grey-4 rounded': loading }">{{ item.variations.map((el) => el.options[0].name).join(', ') }}</p>
          </div>
          <p class="col-span-1 text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ store.methods.groupDigit(item.qty) }}</p>
          <p class="col-span-2 text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ store.methods.convertToRp(item.price) }}</p>
          <p class="col-span-2 text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ store.methods.convertToRp(item.subtotal_price) }}</p>
        </div>
        <div class="p-3 grid grid-cols-4 gap-1 font-bold">
          <p class="col-span-3 text-right">Subtotal Harga Barang</p>
          <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ subtotalItem }}</p>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-2 gap-1">
          <p>{{ deliveryName }}</p>
          <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ deliveryPrice }}</p>
        </div>
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Subtotal Pengiriman</p>
          <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ subtotalDelivery }}</p>
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Total Pembayaran</p>
          <p class="text-right" :class="{ 'bg-grey-4 rounded': loading }">{{ totalPrice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import API from '@/apis';
import { useRoute } from 'vue-router';

export default {
  name: 'Invoice',
  setup() {
    const store = inject('store');
    const route = useRoute();

    const poNumber = ref('');
    const merchantName = ref('');
    const orderDate = ref('');
    const buyerName = ref('');
    const addressShort = ref('');
    const addressFull = ref('');
    const phoneNumber = ref('');
    const items = ref([]);
    const subtotalItem = ref('');
    const deliveryName = ref('');
    const deliveryPrice = ref('');
    const subtotalDelivery = ref('');
    const totalPrice = ref('');

    const loading = ref(false);

    const getInvoice = async () => {
      try {
        loading.value = true;
        const {
          data: { data },
        } = await API.get(`orders/${route.params.id}`);

        poNumber.value = data.delivery_code || '-';
        merchantName.value = data.merchant.name || '-';
        orderDate.value = data.date || '-';
        buyerName.value = data.customer.profile.name || '-';
        addressShort.value = data.order_type_details.shipping_address.name || '-';
        addressFull.value = data.order_type_details.shipping_address.line_address || '-';
        phoneNumber.value = data.order_type_details.shipping_address.contact_person_hp || '-';
        items.value = data.items || [];
        subtotalItem.value = store.methods.convertToRp(data.subtotal_price) || 'Rp 0';
        deliveryName.value = data.order_type_details.delivery_method.name || 'Unknown Delivery Method';
        deliveryPrice.value = store.methods.convertToRp(data.order_type_details.delivery_method.price) || 'Rp 0';
        subtotalDelivery.value = deliveryPrice.value;
        totalPrice.value = store.methods.convertToRp(data.total_price) || 'Rp 0';
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    };

    onMounted(() => {
      getInvoice();
    });

    return {
      store,
      poNumber,
      merchantName,
      orderDate,
      buyerName,
      addressShort,
      addressFull,
      phoneNumber,
      items,
      subtotalItem,
      deliveryName,
      deliveryPrice,
      subtotalDelivery,
      totalPrice,
      loading,
    };
  },
};
</script>

<style lang="scss" scoped>
#invoice {
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  font-family: 'Nunito', 'serif';
}
</style>
