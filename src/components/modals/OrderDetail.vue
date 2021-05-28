<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
    :class="{ 'animate-pulse': loading }"
  >
    <div class="grid lg:grid-flow-col gap-8 lg:grid-cols-12 overflow-auto">
      <div class="lg:col-span-4 lg:block grid gap-4 lg:gap-8">
        <div>
          <template v-if="!loading">
            <div class="divide-y divide-grey-4 font-medium">
              <p class="font-medium pb-4 lg:text-base">Order</p>
              <div class="pt-4 grid sm:grid-rows-2 lg:grid-rows-4 gap-4">
                <div>
                  <p class="text-heading1 font-semibold">{{ order.code }}</p>
                </div>
                <div>
                  <p class="text-grey-2">Status</p>
                  <p
                    :class="
                      order.current_step?.title === 'Pesanan Selesai'
                        ? 'text-mint'
                        : order.current_step?.title === 'Menunggu Konfirmasi' ||
                          order.current_step?.title === 'Menunggu Pembayaran' ||
                          order.current_step?.title === 'Mengajukan Komplain' ||
                          order.current_step?.title === 'Sedang Dikirim' ||
                          order.current_step?.title === 'Pesanan Tiba'
                        ? 'text-gold'
                        : 'text-flame'
                    "
                  >
                    {{ order.current_step?.title }}
                  </p>
                </div>
                <div class="grid gap-4 grid-flow-col">
                  <div>
                    <p class="text-grey-2">Order Date</p>
                    <p>{{ formatTime(order.date) }}</p>
                  </div>
                  <div>
                    <p class="text-grey-2">Last Updated</p>
                    <p>{{ formatTime(order.date) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div v-for="i in 6" :key="i" class="divide-y divide-grey-4">
              <div class="rounded bg-grey-4 h-4 w-32 mb-4" />
              <div class="pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="rounded bg-grey-4 h-4" />
                <div class="rounded bg-grey-4 h-4" />
                <div class="rounded bg-grey-4 h-4" />
                <div class="rounded bg-grey-4 h-4" />
              </div>
            </div>
          </template>
        </div>
        <div class="divide-y divide-grey-4">
          <p class="pb-4 lg:text-base">Delivery</p>
          <div class="pt-4 grid grid-cols-2 lg:grid-cols-none gap-4 lg:gap-8">
            <div>
              <p class="text-grey-2">Delivery PO Number</p>
              <p>{{ order.delivery_code ? order.delivery_code : '-' }}</p>
            </div>
            <div>
              <p class="text-grey-2">Delivery Type</p>
              <p>{{ order.order_type_details?.delivery_method?.name }}</p>
            </div>
            <template v-if="order.order_type_details?.driver?.driver_name">
              <div class="col-span-2 lg:col-span-1">
                <p class="text-grey-2">Driver</p>
                <template v-if="screenWidth < 640">
                  <div class="grid grid-flow-col auto-cols-max gap-2">
                    <help-avatar
                      :src="order.order_type_details?.driver?.driver_photo"
                      :size="80"
                      class="my-2"
                    />
                    <div>
                      <p>{{ order.order_type_details?.driver?.driver_name }}</p>
                      <p>{{ order.order_type_details?.driver?.vehicle_number }}</p>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <p>{{ order.order_type_details?.driver?.driver_name }}</p>
                  <help-avatar
                    :src="order.order_type_details?.driver?.driver_photo"
                    :size="80"
                    class="my-2"
                  />
                  <p>{{ order.order_type_details?.driver?.vehicle_number }}</p>
                </template>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="lg:col-span-8 grid auto-rows-max gap-8">
        <div class="grid grid-flow-col gap-4 lg:gap-8">
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Merchant</p>
            <div class="pt-4 grid gap-4">
              <div class="grid grid-flow-row gap-4">
                <div>
                  <p class="text-grey-2">Name</p>
                  <p>{{ order.merchant?.name }}</p>
                </div>
                <div>
                  <p class="text-grey-2">Phone Number</p>
                  <p>{{ order.merchant?.phone_number }}</p>
                </div>
                <div class="lg:col-span-2">
                  <p class="text-grey-2">Address</p>
                  <p>
                    {{
                      `${order.merchant?.address?.line_address}, ${order.merchant?.address?.district}, ${order.merchant?.address?.city}`
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Buyer</p>
            <div class="pt-4 grid gap-4">
              <div>
                <p class="text-grey-2">Name</p>
                <p>{{ order.customer?.profile?.name }}</p>
              </div>
              <div>
                <p class="text-grey-2">Phone Number</p>
                <p>{{ order.customer?.profile?.phone_number }}</p>
              </div>
            </div>
          </div>
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Recipient</p>
            <div class="pt-4 grid gap-4">
              <div class="grid grid-flow-row gap-4">
                <div>
                  <p class="text-grey-2">Name</p>
                  <p>{{ order.order_type_details?.shipping_address?.contact_person }}</p>
                </div>
                <div>
                  <p class="text-grey-2">Phone Number</p>
                  <p>{{ order.order_type_details?.shipping_address?.contact_person_hp }}</p>
                </div>
                <div class="lg:col-span-2">
                  <p class="text-grey-2">Shipping Address</p>
                  <p>
                    {{
                      `${order.order_type_details?.shipping_address.line_address}, ${order.order_type_details?.shipping_address.district}, ${order.order_type_details?.shipping_address.city}`
                    }}
                  </p>
                  <p class="font-light text-grey-2">
                    {{ order.order_type_details?.shipping_address.location.coordinates }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid">
          <help-table :columns="columns" :rows="items" :footer="false">
            <template v-slot:body="{ column, data }">
              <p v-if="column === 'price' || column === 'subtotal_price'">
                Rp {{ data ? data.toLocaleString('ID') : 0 }}
              </p>
            </template>
          </help-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpTable from '@/components/templates/Table.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '../../apis';

export default {
  name: 'OrderDetail',
  components: {
    HelpTable,
    // HelpAvatar,
    // HelpThumbnail,
  },
  mixins: [mixin],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      order: {},
      loading: false,
      items: [],
      columns: [
        { field: 'item', label: 'item' },
        { field: 'price', label: 'item price' },
        { field: 'qty', label: 'quantity' },
        { field: 'subtotal_price', label: 'subtotal' },
      ],
    };
  },
  computed: {
    orderId() {
      return this.$store.state.orderId;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    async getOrder() {
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(`orders/${this.orderId}`);

        this.order = data;

        for (let i = 0; i < data.items.length; i += 1) {
          if (data.items[i].banners) {
            for (let j = 0; j < data.items[i].banners.length; j += 1) {
              const image = await this.$store.dispatch('loadImage', data.items[i].banners[j].url);
              this.order.items[i].image_url = image;
            }
          }
        }
        this.items = this.order.items;
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
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
    formatTime(unix) {
      return dayjs(unix).format('DD-MM-YYYY HH:mm:ss');
    },
  },
  mounted() {
    this.getOrder();
  },
};
</script>

<style></style>
