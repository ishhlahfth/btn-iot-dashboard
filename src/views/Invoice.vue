<template>
  <div class="p-4 grid gap-4" id="invoice">
    <div class="w-full flex justify-center">
      <p class="text-heading2 font-bold text-flame">Wehelpyou</p>
    </div>
    <div class="w-full grid grid-cols-2 gap-y-4 gap-x-6 sm:gap-x-14 text-small">
      <p class="font-bold">Nomor PO</p>
      <p class="text-royal text-right">ALHD3N93FJAO9U9</p>
      <p class="font-bold">Nama Penjual</p>
      <p class="text-right">Toko Powerbank</p>
      <p class="font-bold">Tanggal Pembelian</p>
      <p class="text-right">17 Juli 2020 09.00 WIB</p>
      <p class="font-bold">Nama Pembeli</p>
      <p class="text-right">Felix</p>
      <div class="col-span-2 grid gap-y-2">
        <p class="font-bold">Tujuan Pengiriman</p>
        <p>Jalan Mekar Bakti</p>
        <p>Jl. Mekar Bakti Graha, Mekar Bakti, Kec. Panongan Kab. Tangerang, Banten</p>
        <p>08110000222</p>
      </div>
    </div>
    <div class="w-full">
      <p class="font-bold">Detail Pembelian</p>
    </div>
    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-8 gap-1 font-bold">
          <p class="col-span-3">Nama Produk</p>
          <p class="col-span-1 text-right">Jumlah</p>
          <p class="col-span-2 text-right">Harga Barang</p>
          <p class="col-span-2 text-right">Subtotal</p>
        </div>
        <div class="p-3 grid grid-cols-8 gap-1">
          <div class="col-span-3 grid gap-1">
            <p class="font-bold">Nasi Ayam Goreng Sereh Berempah</p>
            <p>small, tempe</p>
          </div>
          <p class="col-span-1 text-right">2</p>
          <p class="col-span-2 text-right">Rp 20.000</p>
          <p class="col-span-2 text-right">Rp 40.000</p>
        </div>
        <div class="p-3 grid grid-cols-8 gap-1">
          <p class="col-span-3 font-bold">Nasi Semur Telur</p>
          <p class="col-span-1 text-right">1</p>
          <p class="col-span-2 text-right">Rp 30.000</p>
          <p class="col-span-2 text-right">Rp 30.000</p>
        </div>
        <div class="p-3 grid grid-cols-4 gap-1 font-bold">
          <p class="col-span-3 text-right">Subtotal Harga Barang</p>
          <p class="text-right">Rp 70.000</p>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-2 gap-1">
          <p>Grab Instant Motor</p>
          <p class="text-right">Rp 20.000</p>
        </div>
        <div class="p-3 grid grid-cols-2 gap-1">
          <p>Subtotal Pengiriman</p>
          <p class="text-right">Rp 20.000</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Invoice',
  setup() {
    const getInvoice = async () => {
      try {
        const {
          data: { data },
        } = await axios.get('http://buynsell-dev.wehelpyou.xyz/api/v1/orders/350');
        console.log('INVOICE', data);
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      getInvoice();
    });
  },
};
</script>

<style lang="scss" scoped>
#invoice {
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap');
  font-family: 'Nunito', 'serif';
}
</style>
