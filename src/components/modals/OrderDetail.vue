<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
  >
    <div class="grid lg:grid-flow-col gap-8 lg:grid-cols-12 overflow-auto">
      <div class="lg:col-span-9 grid gap-4 lg:gap-8">
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
                  order.current_step?.title === 'Completed' || order.current_step?.title === 'New'
                    ? 'text-mint'
                    : order.current_step?.title === 'In-Progress' ||
                      order.current_step?.title === 'Pending'
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
          <p class="font-medium pb-4 lg:text-base">Delivery</p>
          <div class="pt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">Delivery PO Number</p>
              <p>{{ order.delivery_code }}</p>
            </div>
            <div>
              <p class="text-grey-2">Delivery Type</p>
              <p>{{ order.order_type_details?.delivery_method?.name }}</p>
            </div>
            <div>
              <p class="text-grey-2">Driver Name</p>
              <p>{{ order.order_type_details?.driver?.driver_name }}</p>
            </div>
            <div>
              <p class="text-grey-2">Vehicle Number</p>
              <p>{{ order.order_type_details?.driver?.vehicle_number }}</p>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 lg:text-base">Seller</p>
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
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 lg:text-base">Product</p>
          <div class="pt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <p class="text-grey-2">Name</p>
            <p class="text-grey-2">Quantity</p>
            <p class="text-grey-2">Item Price</p>
            <p class="text-grey-2">Subtotal</p>
            <template v-for="item in order.items" :key="item.id">
              <div>
                <div class="mb-1">
                  <p>{{ item?.name }}</p>
                  <p class="text-xsmall font-light text-grey-2">
                    {{ item.variations.map((el) => el.options[0].name).join(', ') }}
                  </p>
                </div>
                <p
                  class="border border-grey-4 rounded py-1 px-2 text-xsmall font-light text-grey-2"
                >
                  {{ item.note ? item.note : '-' }}
                </p>
              </div>
              <p>{{ item?.qty }}</p>
              <p>{{ convertToRp(calculateItemPrice(item)) }}</p>
              <p>{{ convertToRp(item?.subtotal_price) }}</p>
            </template>
          </div>
        </div>
      </div>
      <div class="lg:col-span-3 divide-y divide-grey-4 font-medium">
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
    </div>
  </div>
</template>

<script>
import API from '@/apis';
import mixin from '@/mixin';
import dayjs from 'dayjs';

export default {
  name: 'OrderDetail',
  mixins: [mixin],
  data() {
    return {
      order: {},
    };
  },
  computed: {
    orderId() {
      return this.$store.state.orderId;
    },
  },
  methods: {
    async getOrder() {
      try {
        const {
          data: { data },
        } = await API.get(`orders/${this.orderId}`);

        this.order = data;

        console.log(data);
      } catch (error) {
        console.log(error);
      }
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
