<template>
  <div
    id="invoice"
    style="padding: 1rem; display: grid; gap: 1rem; position: relative; font-family: Nunito, 'serif';"
    :style="{ 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;': loading }"
  >
    <div style="position: absolute; bottom: 1rem; left: 50%; transform: translateX(-50%)">
      <img src="../assets/sudah-bayar.png" alt="sudah-bayar" style="width: 75vw; max-width: none !important;">
    </div>

    <div style="width: 100%; display: flex; justify-content: center;">
      <img src="../assets/logo-lowres.png" alt="logo" style="width: 128px;">
    </div>

    <div style="width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 1rem; column-gap: 1.5rem; font-size: 12px;" class="sm:gap-x-14">
      <p style="font-weight: 700;">Nomor PO</p>
      <p style="color: rgb(41, 120, 212); text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ poNumber }}</p>
      <p style="font-weight: 700;">Nama Penjual</p>
      <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ merchantName }}</p>
      <p style="font-weight: 700;">Tanggal Pembelian</p>
      <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ orderDate }}</p>
      <p style="font-weight: 700;">Nama Pembeli</p>
      <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ buyerName }}</p>
      <div style="grid-column: span 2 / span 2; display: grid; row-gap: 0.5rem;">
        <p style="font-weight: 700;">Tujuan Pengiriman</p>
        <div style="display: grid; row-gap: 0.25rem;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem; height: 1rem': loading }">
          <p>{{ addressShort }}</p>
          <p>{{ addressFull }}</p>
          <p>{{ phoneNumber }}</p>
        </div>
      </div>
    </div>

    <div class="divide-y divide-grey-1"><p></p><p></p></div>

    <div style="width: 100%;">
      <p style="font-size: 12px; font-weight: 700px;">Detail Pembelian</p>
    </div>

    <div style="width: 100%;">
      <div style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;" class="divide-y divide-grey-1">
        <div style="padding: 0.75rem; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;">
          <p style="grid-column: span 3 / span 3;">Nama Produk</p>
          <p style="grid-column: span 1 / span 1; text-align: right;">Jumlah</p>
          <p style="grid-column: span 2 / span 2; text-align: right;">Harga Barang</p>
          <p style="grid-column: span 2 / span 2; text-align: right;">Subtotal</p>
        </div>
        <div v-for="item in items" :key="item.id" style="padding: 0.75rem; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 0.25rem;">
          <div style="grid-column: span 3 / span 3; display: grid; gap: 0.25rem;">
            <p style="font-weight: 700;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ item.name }}</p>
            <p :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ item.variations.map((el) => el.options[0].name).join(', ') }}</p>
          </div>
          <p style="grid-column: span 1 / span 1; text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ methods.groupDigit(item.qty) }}</p>
          <p style="grid-column: span 2 / span 2; text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ methods.convertToRp(item.price) }}</p>
          <p style="grid-column: span 2 / span 2; text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ methods.convertToRp(item.subtotal_price) }}</p>
        </div>
        <div style="padding: 0.75rem; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;">
          <p style="grid-column: span 3 / span 3; text-align: right;">Subtotal Harga Barang</p>
          <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ subtotalItem }}</p>
        </div>
      </div>
    </div>

    <div style="width: 100%;">
      <div style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;" class="divide-y divide-grey-1">
        <div style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem;">
          <p>{{ deliveryName }}</p>
          <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ deliveryPrice }}</p>
        </div>
        <div style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;">
          <p>Subtotal Pengiriman</p>
          <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ subtotalDelivery }}</p>
        </div>
      </div>
    </div>

    <div style="width: 100%;">
      <div style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;" class="divide-y divide-grey-1">
        <div style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;">
          <p>Total Pembayaran</p>
          <p style="text-align: right;" :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;' : loading }">{{ totalPrice }}</p>
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
    const { methods } = inject('store');
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
        subtotalItem.value = methods.convertToRp(data.subtotal_price) || 'Rp 0';
        deliveryName.value = data.order_type_details.delivery_method.name || 'Unknown Delivery Method';
        deliveryPrice.value = methods.convertToRp(data.order_type_details.delivery_method.price) || 'Rp 0';
        subtotalDelivery.value = deliveryPrice.value;
        totalPrice.value = methods.convertToRp(data.total_price) || 'Rp 0';
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    };

    onMounted(() => {
      getInvoice();
    });

    return {
      methods,
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
  // @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  // font-family: 'Nunito', 'serif';
}
</style>
