<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full grid sm:grid-flow-col gap-4">
      <div class="w-full justify-between">
        <p class="text-heading2 font-semibold">Copy Merchant</p>
      </div>
    </div>
    <div class="w-full grid sm:flex gap-4 p-5 my-1 rounded-md">
      <!-- style="background: #F6F6F6" -->
      <section class="auto-rows-max grid grid-flow-row rounded-md shadow-md px-4 bg-grey-4 w-full">
        <div class="p-5 flex justify-center">
          <h1 class="font-medium text-subheading">Merchant A</h1>
        </div>
        <section class="grid grid-flow-row gap-2 divide-y divide-grey-4">
          <form @submit.prevent="searchMerchant" class="flex gap-3">
            <help-input
              class="w-full"
              type="text"
              placeholder="Search merchant here"
              v-model="search"
              right-icon="search"
            />
            <section class="flex float-right">
              <icon
                class="bg-white items-center p-1 rounded-md cursor-pointer text-blue-500 shadow-md hover:shadow-lg h-full"
                name="plus-circle"
                :size="10"
              />&nbsp;
              <icon
                class="bg-white items-center p-1 rounded-md cursor-pointer text-mint shadow-md hover:shadow-lg h-full"
                name="refresh"
                :size="10"
              />&nbsp;
              <icon
                class="bg-white items-center p-1 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg h-full"
                name="trash"
                :size="10"
              />
            </section>
          </form>
          <p></p>
        </section>
        <section class="h-100 overflow-y-auto mb-4 py-4 rounded-md">
          <div class="flex py-2">
            <help-checkbox />&nbsp;&nbsp;
            <div class="bg-white rounded-md shadow-md">
              <menu-card
                :isForProduct="false"
                image-url="https://help-bns-bucket.s3.ap-southeast-1.amazonaws.com/84DA268F-ABEA-4E96-8CC6-1622D674D12D.jpg"
                name="Java"
                description="Our signature caffe latte with intense coffee and creamy condensed milk."
                price="50000"
                category="Makanan & Minuman"
                class="bg-white"
              />
            </div>
          </div>
          <div class="flex py-2">
            <help-checkbox />&nbsp;&nbsp;
            <div class="bg-white rounded-md shadow-md">
              <menu-card
                :isForProduct="false"
                image-url="https://help-bns-bucket.s3.ap-southeast-1.amazonaws.com/84DA268F-ABEA-4E96-8CC6-1622D674D12D.jpg"
                name="Java"
                description="Our signature caffe latte with intense coffee and creamy condensed milk."
                price="50000"
                category="Makanan & Minuman"
                class="bg-white"
              />
            </div>
          </div>
          <div class="flex py-2">
            <help-checkbox />&nbsp;&nbsp;
            <div class="bg-white rounded-md shadow-md">
              <menu-card
                :isForProduct="false"
                image-url="https://help-bns-bucket.s3.ap-southeast-1.amazonaws.com/84DA268F-ABEA-4E96-8CC6-1622D674D12D.jpg"
                name="Java"
                description="Our signature caffe latte with intense coffee and creamy condensed milk."
                price="50000"
                category="Makanan & Minuman"
                class="bg-white"
              />
            </div>
          </div>
          <div class="flex py-2">
            <help-checkbox />&nbsp;&nbsp;
            <div class="bg-white rounded-md shadow-md">
              <menu-card
                :isForProduct="false"
                image-url="https://help-bns-bucket.s3.ap-southeast-1.amazonaws.com/84DA268F-ABEA-4E96-8CC6-1622D674D12D.jpg"
                name="Java"
                description="Our signature caffe latte with intense coffee and creamy condensed milk."
                price="50000"
                category="Makanan & Minuman"
                class="bg-white"
              />
            </div>
          </div>
        </section>
      </section>
      <icon
        class="bg-white items-center p-1 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg self-center w-10"
        name="double-chevron-right"
        :size="14"
      />
      <section class="auto-rows-max grid grid-flow-row justify-center h-102 w-full bg-white rounded-md">
        <div class="p-5 text-center">
          <h1 class="font-medium text-subheading">Merchant B</h1>
        </div>
        <p class="py-10 text-center text-gold-dark bg-gold-soft rounded-md w-100">
          No variations available for this item
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import MenuCard from '@/components/molecules/MenuCard.vue';

export default {
  name: 'CopyMerchant',
  components: {
    HelpInput,
    Icon,
    MenuCard,
    HelpCheckbox,
  },
  data() {
    return {
      search: '',
    };
  },
  methods: {
    searchMerchant() {
      console.log('search');
    },
  },
};
</script>

<style></style>
