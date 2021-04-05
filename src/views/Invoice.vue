<template>
  <help-modal v-model="notification">
    <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
      <div class="flex justify-between items-center">
        <p class="text-heading4 font-semibold">Notification</p>
        <help-button
          icon-only
          icon="close"
          bg-color="transparent"
          color="grey-1"
          @click="notification = false"
        />
      </div>
      <div>
        <p>
          Invoice {{ poNumber }} has been downloaded successfully. Please kindly check your
          downloads folder to open the invoice.
        </p>
      </div>
    </div>
  </help-modal>
  <div
    id="invoice"
    style="padding: 1rem 1rem 4rem 1rem; display: grid; gap: 1rem; position: relative; font-family: Nunito, 'serif';"
    :style="{ 'animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;': loading }"
  >
    <div style="position: absolute; bottom: 5rem; left: 50%; transform: translateX(-50%);">
      <img
        src="../assets/sudah-bayar.png"
        alt="sudah-bayar"
        style="width: 16rem; max-width: none !important;"
      />
    </div>

    <div style="width: 100%; display: flex; justify-content: center;">
      <img src="../assets/logo-lowres.png" alt="logo" style="width: 128px; height: 37.69px;" />
    </div>

    <div
      style="width: 100%; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 1rem; column-gap: 1.5rem; font-size: 12px;"
      class="sm:gap-x-14"
    >
      <p style="font-weight: 700;">Nomor PO</p>
      <p
        style="color: rgb(41, 120, 212); text-align: right;"
        :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
      >
        {{ poNumber }}
      </p>
      <p style="font-weight: 700;">Nama Penjual</p>
      <p
        style="text-align: right;"
        :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
      >
        {{ merchantName }}
      </p>
      <p style="font-weight: 700;">Tanggal Pembelian</p>
      <p
        style="text-align: right;"
        :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
      >
        {{ orderDate }}
      </p>
      <p style="font-weight: 700;">Nama Pembeli</p>
      <p
        style="text-align: right;"
        :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
      >
        {{ buyerName }}
      </p>
      <div style="grid-column: span 2 / span 2; display: grid; row-gap: 0.5rem;">
        <p style="font-weight: 700;">Tujuan Pengiriman</p>
        <div
          style="display: grid; row-gap: 0.25rem;"
          :style="{
            'background-color: rgb(210, 214, 219); border-radius: 0.25rem; height: 1rem': loading,
          }"
        >
          <p>{{ addressShort }}</p>
          <p>{{ addressFull }}</p>
          <p>{{ phoneNumber }}</p>
        </div>
      </div>
    </div>

    <div class="divide-y divide-grey-1">
      <p></p>
      <p></p>
    </div>

    <div style="width: 100%;">
      <p style="font-size: 12px; font-weight: 700;">Detail Pembelian</p>
    </div>

    <div style="width: 100%;">
      <div
        style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;"
        class="divide-y divide-grey-1"
      >
        <div
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;"
        >
          <p style="grid-column: span 3 / span 3;">Nama Produk</p>
          <p style="grid-column: span 1 / span 1; text-align: right;">Jumlah</p>
          <p style="grid-column: span 2 / span 2; text-align: right;">Harga Barang</p>
          <p style="grid-column: span 2 / span 2; text-align: right;">Subtotal</p>
        </div>
        <div
          v-for="item in items"
          :key="item.id"
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(8, minmax(0, 1fr)); gap: 0.25rem;"
        >
          <div style="grid-column: span 3 / span 3; display: grid; gap: 0.25rem;">
            <p
              style="font-weight: 700;"
              :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
            >
              {{ item.name }}
            </p>
            <p
              :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
            >
              {{ item.variations.map((el) => el.options[0].name).join(', ') }}
            </p>
          </div>
          <p
            style="grid-column: span 1 / span 1; text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ groupDigit(item.qty) }}
          </p>
          <p
            style="grid-column: span 2 / span 2; text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ convertToRp(calculateItemPrice(item)) }}
          </p>
          <p
            style="grid-column: span 2 / span 2; text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ convertToRp(item.subtotal_price) }}
          </p>
        </div>
        <div
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;"
        >
          <p style="grid-column: span 3 / span 3; text-align: right;">Subtotal Harga Barang</p>
          <p
            style="text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ subtotalItem }}
          </p>
        </div>
      </div>
    </div>

    <div style="width: 100%;">
      <div
        style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;"
        class="divide-y divide-grey-1"
      >
        <div
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem;"
        >
          <p>{{ deliveryName }}</p>
          <p
            style="text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ deliveryPrice }}
          </p>
        </div>
        <div
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;"
        >
          <p>Subtotal Pengiriman</p>
          <p
            style="text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ subtotalDelivery }}
          </p>
        </div>
      </div>
    </div>

    <div style="width: 100%;">
      <div
        style="border-radius: 0.5rem; border: 1px solid rgba(48, 59, 77); font-size: 10px;"
        class="divide-y divide-grey-1"
      >
        <div
          style="padding: 0.75rem; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0.25rem; font-weight: 700;"
        >
          <p>Total Pembayaran</p>
          <p
            style="text-align: right;"
            :style="{ 'background-color: rgb(210, 214, 219); border-radius: 0.25rem;': loading }"
          >
            {{ totalPrice }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="p-4">
    <button
      class="hidden w-full py-2 px-4 bg-flame text-white font-semibold rounded-full"
      @click="generatePDF"
      id="exportButton"
    >
      Export PDF
    </button>
  </div>
  <router-view></router-view>
</template>

<script>
import axios from 'axios';
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';

export default {
  name: 'Invoice',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpModal,
  },
  data() {
    return {
      poNumber: '',
      merchantName: '',
      orderDate: '',
      buyerName: '',
      addressShort: '',
      addressFull: '',
      phoneNumber: '',
      items: [],
      subtotalItem: '',
      deliveryName: '',
      deliveryPrice: '',
      subtotalDelivery: '',
      totalPrice: '',

      notification: false,
      loading: false,
    };
  },
  methods: {
    async getInvoice() {
      try {
        this.loading = true;
        const {
          data: { data },
        } = await axios.get(
          `http://buynsell-dev.wehelpyou.xyz/api/v1/orders/${this.$route.params.id}`,
          {
            headers: {
              'x-api-key': `${this.$route.query.key}`,
              'x-device-type': 'LINUX',
              'x-device-os-version': 'Ubuntu18.04',
              'x-device-model': '4s-dk0115AU',
              'x-app-version': 'v1.2',
              'x-request-id': '1234',
              'x-device-utc-offset': '+07:00',
              'x-device-lang': 'en',
              'x-device-notification-code': `${this.$route.query.code}`,
            },
          },
        );

        this.poNumber = data.code || '-';
        this.merchantName = data.merchant.name || '-';
        this.orderDate = dayjs(data.date).format('DD-MM-YYYY HH:mm:ss') || '-';
        this.buyerName = data.customer.profile.name || '-';
        this.addressShort = data.order_type_details.shipping_address.name || '-';
        this.addressFull = data.order_type_details.shipping_address.line_address || '-';
        this.phoneNumber = data.order_type_details.shipping_address.contact_person_hp || '-';
        this.items = data.items || [];
        this.subtotalItem = this.convertToRp(data.subtotal_price) || 'Rp 0';
        this.deliveryName = data.order_type_details.delivery_method.name || 'Unknown Delivery Method';
        this.deliveryPrice = this.convertToRp(data.order_type_details.delivery_method.price) || 'Rp 0';
        this.subtotalDelivery = this.deliveryPrice;
        this.totalPrice = this.convertToRp(data.total_price) || 'Rp 0';
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    generatePDF() {
      const element = document.getElementById('invoice');
      const options = {
        filename: `wehelpyou-invoice-${this.poNumber}.pdf`,
        html2pdf: { scale: 2, height: 812, width: 375 },
        jsPDF: { format: 'legal', orientation: 'portrait' },
      };
      html2pdf()
        .set(options)
        .from(element)
        .save()
        .then(() => {
          this.notification = true;
        });
    },
    calculateItemPrice(item) {
      let subtotal = item.price;
      if (item.variations.length) {
        for (let i = 0; i < item.variations.length; i += 1) {
          subtotal += item.variations[i].options[0].price;
        }
      }
      return subtotal;
    },
  },
  mounted() {
    this.getInvoice();
  },
};
</script>
