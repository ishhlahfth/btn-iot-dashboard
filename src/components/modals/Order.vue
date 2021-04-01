<template>
  <div
    class="grid grid-flow-row sm:grid-flow-col gap-6 merchant-modal-content inner-modal-fixed modal-xl overflow-auto"
  >
    <div class="grid md:grid-flow-col gap-8 auto-rows-max overflow-auto">
      <div class="grid gap-4 md:gap-8">
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 md:text-base">Order</p>
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">PO Number</p>
              <p>O1090F</p>
            </div>
            <div>
              <p class="text-grey-2">Order Date</p>
              <p>23 Apr 2021 11:20</p>
            </div>
            <div>
              <p class="text-grey-2">Last Updated</p>
              <p>23 Apr 2021 11:20</p>
            </div>
            <div>
              <p class="text-grey-2">Status</p>
              <p class="text-royal">Pending</p>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 md:text-base">Delivery</p>
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">PO Number</p>
              <p>O1090F</p>
            </div>
            <div>
              <p class="text-grey-2">Order Date</p>
              <p>23 Apr 2021 11:20</p>
            </div>
            <div>
              <p class="text-grey-2">Last Updated</p>
              <p>23 Apr 2021 11:20</p>
            </div>
            <div>
              <p class="text-grey-2">Status</p>
              <p class="text-royal">Pending</p>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 md:text-base">Seller</p>
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">Name</p>
              <p>Herba Kitchen</p>
            </div>
            <div>
              <p class="text-grey-2">Location</p>
              <p>Jakarta Selatan</p>
            </div>
            <div>
              <p class="text-grey-2">Phone Number</p>
              <p>0896-3340-1529</p>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 md:text-base">Buyer</p>
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">Name</p>
              <p>Kania</p>
            </div>
            <div>
              <p class="text-grey-2">Location</p>
              <p>Jakarta Barat</p>
            </div>
            <div>
              <p class="text-grey-2">Phone Number</p>
              <p>0896-3340-1529</p>
            </div>
          </div>
        </div>
        <div class="divide-y divide-grey-4 font-medium">
          <p class="font-medium pb-4 md:text-base">Product</p>
          <div class="pt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p class="text-grey-2">Name</p>
              <p>Kania</p>
            </div>
            <div>
              <p class="text-grey-2">Price Per Product</p>
              <p>Jakarta Barat</p>
            </div>
            <div>
              <p class="text-grey-2">Category</p>
              <p>0896-3340-1529</p>
            </div>
            <div>
              <p class="text-grey-2">Phone Number</p>
              <p>0896-3340-1529</p>
            </div>
          </div>
        </div>
      </div>
      <div class="divide-y divide-grey-4 font-medium">
        <p class="font-medium pb-4 md:text-base">Payment</p>
        <div class="pt-4 grid grid-cols-2 md:grid-cols-none gap-4 md:gap-8">
          <div>
            <p class="text-grey-2">Delivery Fee</p>
            <p>Rp 8.000</p>
          </div>
          <div>
            <p class="text-grey-2">Item Price</p>
            <p>Rp 31.000</p>
          </div>
          <div>
            <p class="text-grey-2">Commission</p>
            <p>Rp 2.000</p>
          </div>
          <div>
            <p class="text-grey-2">Total Price</p>
            <p>Rp 49.000</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderDetail',
};
</script>

<style></style>
