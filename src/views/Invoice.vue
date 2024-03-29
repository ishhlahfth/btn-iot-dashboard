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
    :class="{ 'animate-pulse': loading }"
    class="p-4 pb-16 grid gap-4 relative"
    style="font-family: Nunito, 'serif';"
  >
    <div v-if="!loading" class="absolute bottom-20 left-1/2 transform -translate-x-1/2">
      <img
        src="../assets/sudah-bayar.png"
        alt="sudah-bayar"
        class="w-64"
        style="max-width: none !important;"
      />
    </div>

    <div class="w-full flex justify-center">
      <img src="../assets/logo-lowres.png" alt="logo" style="width: 128px; height: 37.69px;" />
    </div>

    <div class="w-full grid grid-cols-2 gap-4 text-small sm:gap-x-14">
      <p class="font-bold">Nomor PO</p>
      <p v-if="!loading" class="text-royal text-right">{{ poNumber }}</p>
      <div v-else class="bg-grey-4 rounded h-4" />

      <p class="font-bold">Nama Penjual</p>
      <p v-if="!loading" class="text-right">{{ merchantName }}</p>
      <div v-else class="bg-grey-4 rounded h-4" />

      <p class="font-bold">Tanggal Pembelian</p>
      <p v-if="!loading" class="text-right">{{ orderDate }}</p>
      <div v-else class="bg-grey-4 rounded h-4" />

      <p class="font-bold">Nama Pembeli</p>
      <p v-if="!loading" class="text-right">{{ buyerName }}</p>
      <div v-else class="bg-grey-4 rounded h-4" />

      <div class="col-span-2 grid gap-2">
        <p class="font-bold">Tujuan Pengiriman</p>
        <template class="grid gap-2">
          <template v-if="!loading">
            <p>{{ addressShort }}</p>
            <p>{{ addressFull }}</p>
            <p>{{ phoneNumber }}</p>
          </template>
          <template v-else>
            <div class="bg-grey-4 rounded h-4 w-16 mb-2"></div>
            <div class="bg-grey-4 rounded h-4"></div>
            <div class="bg-grey-4 rounded h-4 w-3/4 mb-2"></div>
            <div class="bg-grey-4 rounded h-4 w-16"></div>
          </template>
        </template>
      </div>
    </div>

    <div class="divide-y divide-grey-1">
      <p></p>
      <p></p>
    </div>

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
        <template v-if="!loading">
          <div v-for="item in items" :key="item.id" class="p-3 grid grid-cols-8 gap-1">
            <div class="col-span-3 grid gap-1">
              <p class="font-bold">
                {{ item.name }}
              </p>
              <div class="grid" v-if="item.variations.length > 0">
                <div v-for="variation in item.variations" :key="variation.id">
                  <p  v-for="each in variation.options" :key="each.id">
                    {{each.name}}
                  </p>
                </div>
              </div>
            </div>
            <p class="col-span-1 text-right">
              {{ groupDigit(item.qty) }}
            </p>
            <div class="col-span-2 text-right">
              <p>
                {{ convertToRp(calculateItemPrice(item)) }}
              </p>
              <div class="grid" v-if="item.variations.length > 0">
                <div v-for="variation in item.variations" :key="variation.id">
                  <p  v-for="each in variation.options" :key="each.id">
                    + {{ convertToRp(each.price) }}
                  </p>
                </div>
              </div>
            </div>
            <p class="col-span-2 text-right">
              {{ convertToRp(item.subtotal_price) }}
            </p>
          </div>
          <div v-if="discountOrder" class="p-3 grid grid-cols-2 gap-1 text-red-600">
            <p>Wehelpyou</p>
            <p v-if="!loading" class="text-right">{{ discountOrder ? `- ${convertToRp(discountOrder.substring(1))}` : '- Rp 0' }}</p>
            <div v-else class="bg-grey-4 rounded h-4" />
          </div>
        </template>
        <template v-else>
          <div v-for="i in 2" :key="i" class="p-3 grid grid-cols-8 gap-2">
            <div class="col-span-3 bg-grey-4 rounded h-4" />
            <div class="col-span-1 bg-grey-4 rounded h-4" />
            <div class="col-span-2 bg-grey-4 rounded h-4" />
            <div class="col-span-2 bg-grey-4 rounded h-4" />
          </div>
        </template>
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Subtotal Harga Barang</p>
          <p v-if="!loading" class="text-right">{{ subtotalItem }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-2 gap-1">
          <template v-if="!loading">
            <p>{{ deliveryName }}</p>
            <p class="text-right">{{ deliveryPrice }}</p>
          </template>
          <template v-else>
            <div class="bg-grey-4 rounded h-4 w-32" />
            <div class="bg-grey-4 rounded h-4" />
          </template>
        </div>
        <div v-if="discountDelivery" class="p-3 grid grid-cols-2 gap-1 text-red-600">
          <p>Wehelpyou</p>
          <p v-if="!loading" class="text-right">{{ discountDelivery ? `- ${convertToRp(discountDelivery.substring(1))}` : '- Rp 0' }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
        </div>
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Subtotal Pengiriman</p>
          <p v-if="!loading" class="text-right">{{ subtotalDelivery }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div class="p-3 grid grid-cols-2 gap-1">
          <template v-if="!loading">
            <p>Biaya Layanan</p>
            <p class="text-right">{{ serviceFee }}</p>
          </template>
          <template v-else>
            <div class="bg-grey-4 rounded h-4 w-32" />
            <div class="bg-grey-4 rounded h-4" />
          </template>
        </div>
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Subtotal Biaya Layanan</p>
          <p v-if="!loading" class="text-right">{{ serviceFee }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
        </div>
      </div>
    </div>

    <div class="w-full">
      <div class="rounded-lg border border-grey-1 text-xsmall divide-y divide-grey-1">
        <div v-if="discountTotal" class="p-3 grid grid-cols-2 gap-1 text-red-600">
          <p>Wehelpyou</p>
          <p v-if="!loading" class="text-right">{{ discountTotal ? `- ${convertToRp(discountTotal.substring(1))}` : '- Rp 0' }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
        </div>
        <div class="p-3 grid grid-cols-2 gap-1 font-bold">
          <p>Total Pembayaran</p>
          <p v-if="!loading" class="text-right">{{ totalPrice }}</p>
          <div v-else class="bg-grey-4 rounded h-4" />
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
import { useToast } from 'vue-toastification';
import axios from 'axios';
import dayjs from 'dayjs';
import html2pdf from 'html2pdf.js';
import HelpButton from '@/components/atoms/Button.vue';
import HelpModal from '@/components/templates/Modal.vue';
import mixin from '@/mixin';

export default {
  name: 'Invoice',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpModal,
  },
  setup() {
    const toast = useToast();
    return { toast };
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
      discountDelivery: 0,
      discountOrder: 0,
      discountTotal: 0,
      subtotalDelivery: '',
      serviceFee: '',
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
        } = await axios.get(`${process.env.VUE_APP_BASE_URL}v1/orders/${this.$route.params.id}`, {
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
        });

        this.poNumber = data.code || '-';
        this.merchantName = data.merchant.name || '-';
        this.orderDate = dayjs(data.date).format('DD-MM-YYYY HH:mm:ss') || '-';
        this.buyerName = data.customer?.profile.name || '-';
        this.addressShort = data.order_type_details.shipping_address.name || '-';
        this.addressFull = data.order_type_details.shipping_address.line_address || '-';
        this.phoneNumber = data.order_type_details.shipping_address.contact_person_hp || '-';
        this.items = data.items || [];
        this.subtotalItem = this.convertToRp(data.total_price_without_tax) || 'Rp 0';
        this.deliveryName = data.order_type_details.delivery_method.name || 'Unknown Delivery Method';
        this.deliveryPrice = this.convertToRp(data.order_type_details.delivery_method.initial_price) || 'Rp 0';
        this.subtotalDelivery = this.convertToRp(
          data.order_type_details.delivery_method.price
          - (Number(data.order_type_details?.delivery_method?.service_fee) || 0),
        ) || 'Rp 0';
        this.serviceFee = this.convertToRp(data.order_type_details?.delivery_method?.service_fee) || 'Rp 0';
        this.totalPrice = this.convertToRp(data.total_price) || 'Rp 0';
        if (data.discounts) {
          this.discountDelivery = data.discounts.detail[0].type === 2 ? String(data.discounts.detail[0].value.discount) : '';
          this.discountOrder = data.discounts.detail[0].type === 3 ? String(data.discounts.detail[0].value.discount) : '';
          this.discountTotal = data.discounts.detail[0].type === 4 ? String(data.discounts.detail[0].value.discount) : '';
        }
      } catch (error) {
        this.toast.error(error.message);
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
          for (let j = 0; j < item.variations[i].options.length; j += 1) {
            subtotal += item.variations[i].options[j].price;
          }
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
