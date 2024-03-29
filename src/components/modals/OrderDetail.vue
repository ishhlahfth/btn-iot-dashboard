<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
  >
    <div class="grid lg:grid-flow-col gap-8 lg:grid-cols-12 overflow-auto">
      <div class="lg:col-span-2 lg:block grid gap-4 lg:gap-8">
        <div>
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4">Order</p>
            <div class="pt-4 grid sm:grid-rows-2 lg:grid-rows-4 gap-4">
              <div>
                <p v-if="!loading" class="text-heading1 font-semibold">{{ order.code }}</p>
                <div v-else class="h-8 rounded bg-grey-4 animate-pulse" />
              </div>
              <div>
                <p class="text-grey-2">Status</p>
                <p
                  v-if="!loading"
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
                <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
              </div>
              <div>
                <p class="text-grey-2">Order Date</p>
                <p v-if="!loading">{{ formatTime(order.date) }}</p>
                <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4" v-if="order.order_type_details?.delivery_method">
          <p class="font-medium pb-4">Delivery</p>
          <div class="pt-4 grid grid-cols-2 lg:grid-cols-none gap-4">
            <div>
              <p class="font-medium text-grey-2">Delivery PO Number</p>
              <p v-if="!loading" class="font-medium">
                {{ order.delivery_code ? order.delivery_code : '-' }}
              </p>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <div>
              <p class="font-medium text-grey-2">Delivery Type</p>
              <p v-if="!loading" class="font-medium">
                {{ order.order_type_details?.delivery_method?.name }}
              </p>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <template v-if="order.order_type_details?.driver?.driver_name">
              <div class="col-span-2 lg:col-span-1">
                <p class="font-medium text-grey-2">Driver</p>
                <p v-if="!loading" class="font-medium text-grey-2">
                  {{ order.order_type_details?.driver?.driver_name }}
                </p>
                <div v-else class="h-4 mb-2 rounded bg-grey-4 animate-pulse" />
                <help-avatar
                  v-if="!loading"
                  :src="order.order_type_details?.driver?.driver_photo"
                  :size="80"
                  class="my-2"
                />
                <div v-else class="h-20 w-20 rounded-full bg-grey-4 animate-pulse" />
              </div>
              <div>
                <p class="font-medium text-grey-2">License number</p>
                <p v-if="!loading" class="font-medium">
                  {{ order.order_type_details?.driver?.vehicle_number }}
                </p>
                <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="lg:col-span-10 grid auto-rows-max gap-8">
        <div class="grid md:grid-cols-3 gap-4 lg:gap-8">
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4">Merchant</p>
            <div class="pt-4 grid gap-4">
              <div class="grid grid-flow-row gap-4">
                <div>
                  <p class="text-grey-2">Name</p>
                  <p v-if="!loading">{{ order.merchant?.name }}</p>
                  <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
                </div>
                <div>
                  <p class="text-grey-2">Phone Number</p>
                  <p v-if="!loading">{{ order.merchant?.phone_number }}</p>
                  <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
                </div>
                <div class="lg:col-span-2">
                  <p class="text-grey-2">Address</p>
                  <p v-if="!loading">
                    {{
                      `${order.merchant?.address?.line_address}, ${order.merchant?.address?.district}, ${order.merchant?.address?.city}`
                    }}
                  </p>
                  <template v-else>
                    <div class="h-4 rounded bg-grey-4 animate-pulse mb-2" />
                    <div class="h-4 rounded bg-grey-4 animate-pulse mb-2" />
                    <div class="h-4 rounded w-16 bg-grey-4 animate-pulse" />
                  </template>
                </div>
              </div>
            </div>
          </div>

          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4">Buyer</p>
            <div class="pt-4 grid gap-4">
              <div>
                <p class="text-grey-2">Name</p>
                <p v-if="!loading">{{ order.customer?.profile?.name }}</p>
                <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
              </div>
              <div>
                <p class="text-grey-2">Phone Number</p>
                <p v-if="!loading">{{ order.customer?.profile?.phone_number }}</p>
                <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
              </div>
            </div>
          </div>

          <div class="divide-y divide-grey-4 font-medium" v-if="order.order_type_details?.shipping_address">
            <p class="font-medium pb-4">Recipient</p>
            <div class="pt-4 grid gap-4">
              <div class="grid grid-flow-row gap-4">
                <div>
                  <p class="text-grey-2">Name</p>
                  <p v-if="!loading">
                    {{ order.order_type_details?.shipping_address?.contact_person }}
                  </p>
                  <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
                </div>
                <div>
                  <p class="text-grey-2">Phone Number</p>
                  <p v-if="!loading">
                    {{ order.order_type_details?.shipping_address?.contact_person_hp }}
                  </p>
                  <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
                </div>
                <div class="lg:col-span-2">
                  <p class="text-grey-2">Shipping Address</p>
                  <tempalte v-if="!loading">
                    <p>
                      {{
                        `${order.order_type_details?.shipping_address?.line_address}, ${order.order_type_details?.shipping_address?.district}, ${order.order_type_details?.shipping_address?.city}`
                      }}
                    </p>
                    <p class="font-light text-grey-2">
                      {{ order.order_type_details?.shipping_address?.location.coordinates }}
                    </p>
                  </tempalte>
                  <template v-else>
                    <div class="h-4 rounded bg-grey-4 animate-pulse mb-2" />
                    <div class="h-4 rounded bg-grey-4 animate-pulse mb-2" />
                    <div class="h-4 rounded w-16 bg-grey-4 animate-pulse" />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="grid overflow-hidden">
          <help-table :columns="columns" :rows="order.items" :footer="false" :loading="loading">
            <template v-slot:body="{ column, row, data }">
              <div v-if="column === 'item'" class="grid grid-flow-col gap-4 auto-cols-max">
                <help-thumbnail :src="row.image_url" :width="64" :height="64" />
                <div class="flex flex-col justify-between">
                  <div class="grid">
                    <p class="font-medium text-grey-1">{{ row.name }}</p>
                    <div class="grid" v-if="row.variations.length > 0">
                    <div v-for="variation in row.variations" :key="variation.id">
                      <div v-for="each in variation.options" :key="each.id">
                        {{ each.name }}
                      </div>
                    </div>
                </div>
                  </div>
                  <div>
                    <span v-if="row.note" class="px-2 py-1 border rounded text-xsmall w-auto">
                      {{ row.note }}
                    </span>
                  </div>
                </div>
              </div>
              <div v-if="column === 'price'" class="grid">
                <div>
                  Rp {{ data ? data.toLocaleString('ID') : 0 }}
                </div>
                <div class="grid" v-if="row.variations.length > 0">
                <div v-for="variation in row.variations" :key="variation.id">
                  <div v-for="each in variation.options" :key="each.id">
                    + Rp {{ each.price.toLocaleString('ID') }}
                  </div>
                </div>
                </div>
              </div>
              <div v-if="column === 'subtotal_price'" >
                <div>
                  Rp {{ data ? data.toLocaleString('ID') : 0 }}
                </div>
              </div>
            </template>
          </help-table>
        </div>
        <div class="grid md:place-content-end mx-5 divide-y divide-grey-4">
          <div class="grid gap-4 mb-4">
            <div class="grid gap-8 grid-cols-2">
              <span>Item Total Price</span>
              <span v-if="!loading" class="font-medium text-right">
                {{ convertToRp(order?.subtotal_price) }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <div class="grid gap-8 grid-cols-2" v-if="order.order_type_details?.delivery_method">
              <span>Delivery Fee</span>
              <span v-if="!loading" class="font-medium text-right">
                {{ convertToRp(order.order_type_details?.delivery_method?.initial_price) }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <div class="grid gap-8 grid-cols-2" v-if="order.order_type_details?.delivery_method">
              <span>Commission</span>
              <span v-if="!loading" class="font-medium text-right">
                {{ convertToRp(order?.commission_fee) }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <div class="grid gap-8 grid-cols-2" v-if="order.order_type_details?.delivery_method">
              <span>Service Fee</span>
              <span v-if="!loading" class="font-medium text-right">
                {{ convertToRp(order.order_type_details?.delivery_method?.service_fee) }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
            <div class="grid gap-8 grid-cols-2" v-if="order.order_type_details?.delivery_method">
              <span>Discount</span>
              <span v-if="!loading" class="font-medium text-right text-flame">
                {{
                  order.discounts?.total
                    ? `- Rp ${Number((String(order.discounts?.total)).slice(1)).toLocaleString('ID')}`
                    : '- Rp 0'
                }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
          </div>
          <div class="pt-4">
            <div class="grid gap-8 grid-cols-2">
              <span>Grand total</span>
              <span v-if="!loading" class="font-bold text-right">
                {{ convertToRp(order?.total_price) }}
              </span>
              <div v-else class="h-4 rounded bg-grey-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import mixin from '@/mixin';
import API from '@/apis';

export default {
  name: 'OrderDetail',
  components: {
    HelpTable,
    HelpAvatar,
    HelpThumbnail,
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
      columns: [
        { field: 'item', label: 'item' },
        { field: 'price', label: 'item price', align: 'right' },
        { field: 'qty', label: 'quantity', align: 'center' },
        { field: 'subtotal_price', label: 'subtotal', align: 'right' },
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
              const image = await this.$store.dispatch('loadImage', data.items[i].banners[j].image_url);
              this.order.items[i].image_url = image;
            }
          }
        }
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
