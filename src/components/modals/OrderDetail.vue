<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
    :class="{ 'animate-pulse': loading }"
  >
    <div class="grid lg:grid-flow-col gap-8 lg:grid-cols-12 overflow-auto">
      <div class="lg:col-span-9 grid gap-4 lg:gap-8">
        <template v-if="!loading">
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Order</p>
            <div class="pt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p class="text-grey-2">Buy &#38; Sell PO Number</p>
                <p>{{ order.code }}</p>
              </div>
              <div>
                <p class="text-grey-2">Order Date</p>
                <p>{{ formatTime(order.date) }}</p>
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
            </div>
          </div>
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Merchant</p>
            <div class="pt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Buyer</p>
            <div class="pt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            <div class="pt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div class="divide-y divide-grey-4 font-medium">
            <p class="font-medium pb-4 lg:text-base">Items</p>
            <div v-if="screenWidth < 640" class="pt-4 grid gap-2">
              <template v-for="item in order.items" :key="item.id">
                <div class="grid gap-2">
                  <p class="text-grey-2">Item</p>
                  <div class="grid grid-flow-col gap-2 auto-cols-max">
                    <help-thumbnail :src="item.image_url" :height="80" :width="80" />
                    <div>
                      <div class="mb-1">
                        <p class="truncate">{{ item?.name }}</p>
                        <p class="text-xsmall font-light text-grey-2">
                          {{ item.variations.map((el) => el.options[0].name).join(', ') }}
                        </p>
                      </div>
                      <p
                        v-if="item.note"
                        class="border border-grey-4 rounded py-1 px-2 text-xsmall font-light text-grey-2"
                      >
                        {{ item.note ? item.note : '-' }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="grid grid-flow-col gap-2">
                  <div class="grid gap-2">
                    <p class="text-grey-2">Quantity</p>
                    <p>{{ item?.qty }}</p>
                  </div>
                  <div class="grid gap-2">
                    <p class="text-grey-2">Item Price</p>
                    <p>{{ convertToRp(calculateItemPrice(item)) }}</p>
                  </div>
                  <div class="grid gap-2">
                    <p class="text-grey-2">Subtotal</p>
                    <p>{{ convertToRp(item?.subtotal_price) }}</p>
                  </div>
                </div>
              </template>
            </div>
            <div v-else class="pt-4 grid grid-cols-2 gap-4">
              <p class="text-grey-2">Item</p>
              <div class="grid grid-flow-col gap-4 grid-cols-3">
                <p class="text-grey-2">Quantity</p>
                <p class="text-grey-2">Item Price</p>
                <p class="text-grey-2">Subtotal</p>
              </div>
              <template v-for="item in order.items" :key="item.id">
                <div class="grid grid-flow-col gap-2 auto-cols-max">
                  <help-thumbnail :src="item.image_url" :height="80" :width="80" />
                  <div>
                    <div class="mb-1">
                      <p>{{ item?.name }}</p>
                      <p class="text-xsmall font-light text-grey-2">
                        {{ item.variations.map((el) => el.options[0].name).join(', ') }}
                      </p>
                    </div>
                    <p
                      v-if="item.note"
                      class="border border-grey-4 rounded py-1 px-2 text-xsmall font-light text-grey-2"
                    >
                      {{ item.note ? item.note : '-' }}
                    </p>
                  </div>
                </div>
                <div class="grid grid-flow-col grid-cols-3 gap-4">
                  <p>{{ item?.qty }}</p>
                  <p>{{ convertToRp(calculateItemPrice(item)) }}</p>
                  <p>{{ convertToRp(item?.subtotal_price) }}</p>
                </div>
              </template>
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
      <div class="lg:col-span-3 font-medium grid gap-8 auto-rows-max">
        <template v-if="!loading">
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
          <div class="divide-y divide-grey-4">
            <p class="font-medium pb-4 lg:text-base">Payment</p>
            <div class="pt-4 grid grid-cols-2 lg:grid-cols-none gap-4 lg:gap-8">
              <div>
                <p class="text-grey-2">Delivery Fee</p>
                <p>{{ convertToRp(order.order_type_details?.delivery_method.price) }}</p>
              </div>
              <div>
                <p class="text-grey-2">Item Price</p>
                <p>{{ convertToRp(order?.subtotal_price) }}</p>
              </div>
              <div>
                <p class="text-grey-2">Commission</p>
                <p>{{ convertToRp(order?.commission_fee) }}</p>
              </div>
              <div>
                <p class="text-grey-2">Total Price</p>
                <p>{{ convertToRp(order?.total_price) }}</p>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="rounded bg-grey-4 h-4 w-32 mb-4" />
          <div class="pt-4 grid grid-cols-2 lg:grid-cols-none gap-4 lg:gap-6">
            <div class="rounded bg-grey-4 h-4" />
            <div class="rounded bg-grey-4 h-4" />
            <div class="rounded bg-grey-4 h-4" />
            <div class="rounded bg-grey-4 h-4" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import dayjs from 'dayjs';
import API from '../../apis';

export default {
  name: 'OrderDetail',
  components: {
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
