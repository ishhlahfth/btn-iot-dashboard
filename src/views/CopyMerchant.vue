<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full grid sm:grid-flow-col gap-4">
      <div class="w-full justify-between ml-4">
        <p class="text-heading2 font-semibold">Copy Merchant</p>
      </div>
    </div>
    <div class="w-full grid sm:flex gap-4 p-3 my-1 rounded-md">
      <section class="auto-rows-max grid grid-flow-row rounded-md shadow-md border border-gray-300 px-4 bg-gray-300 w-full">
        <div class="p-5 flex justify-center">
          <h1 class="font-medium text-subheading">Merchant A</h1>
        </div>
        <section class="grid grid-flow-row gap-2">
          <form @submit.prevent="searchMerchantA" class="flex gap-3">
            <help-input
              class="w-full"
              type="text"
              placeholder="Search merchant source"
              v-model="search.merchantA"
              right-icon="search"
            />
            <section class="flex float-right">
              <icon
                class="bg-white items-center p-1 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg h-full"
                name="trash"
                :size="10"
                @click="handleClear('A')"
              />
            </section>
          </form>
          <p></p>
        </section>
        <section class="h-100 overflow-y-auto mb-4 py-4 rounded-md relative">
          <div
            v-if="loading.merchantA"
            class="flex items-center justify-center space-x-2 animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
          <div v-if="merchantA.length === 0" class="flex flex-col justify-center items-center w-full h-3/4">
            <p class="text-heading1">404</p>
            <p>Merchant Sources Not Found</p>
          </div>
          <div class="flex py-2 cursor-pointer w-full" v-for="(merchant, i) in merchantA" :key="i">
            <div class="rounded-lg grid place-items-center antialiased text-gray-900 gap-4 sm:gap-6 w-full" :class="{
            'bg-blue-50': merchant.checked,
              'bg-white': !merchant.checked,
            }">
              <div class="w-full relative rounded-lg">
                <div class="sm:flex relative w-full">
                  <help-badge class="absolute top-2 left-2" :label="merchant.status" :color="merchant.status === 'OPEN' ? 'positive' : 'negative'" />
                  <img
                    :src="merchant.banners.length ? merchant.banners[0].image_url : `${require('../assets/no_image.png')}`"
                    alt="random imgee"
                    class="object-cover object-center shadow-md sm:w-44 h-44 w-full rounded-t-lg"
                  />
                  <div class="py-3 px-6">
                    <h4 class="my-1 text-subheading font-semibold uppercase leading-tight truncate">
                      {{ merchant.name }}
                    </h4>
                    <div class="my-1 grid grid-flow-col justify-start items-center">
                      <icon name="location-marker" />&nbsp;
                      <span class="text-gray-600 text-xs"> {{ `${merchant.address?.line_address}, ${merchant.address?.district}, ${merchant.address?.city.name}, ${merchant.address?.state} ${merchant.address?.zip_code}` }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="phone" />&nbsp;
                      <span class="text-xs text-gray-600">{{ merchant.phone_number }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="bank" />&nbsp;
                      <span class="text-xs text-gray-600">{{ `${merchant.account.bank.name} - ${merchant.account.no} (${merchant.account.name})` }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="badge-checked" />&nbsp;
                      <span class="text-xs" :class="{ 'text-mint' : merchant.verify_status === 'SUCCESS', 'text-flame' : merchant.verify_status !== 'SUCCESS' }">{{ merchant.verify_status }}</span>
                    </div>
                    <div class="flex justify-between w-full">
                      <div class="flex justify-center items-center cursor-pointer m-2 p-1 px-4 py-2 rounded-xl shadow-md hover:shadow-lg bg-white" @click="handleMerchantDetail(merchant, 'A')">
                        <icon :name="merchant.modal ? 'double-chevron-up' : 'double-chevron-down'" />&nbsp;
                        <p class="text-small text-gray-600">{{generateName('Detail')}}</p>
                      </div>&nbsp;
                      <div class="flex justify-center items-center cursor-pointer m-2 p-1 px-4 py-2 rounded-xl shadow-md hover:shadow-lg bg-blue-500" @click="handleCheckMerchantA(merchant)">
                        <icon name="check-circle" color="white" />&nbsp;
                        <p class="text-small text-white">{{merchant.checked ? generateName('Unselect') : generateName('Select')}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="merchant.modal" class="bg-white rounded-md shadow-md w-full px-4 pb-4">
                <div class="overflow-y-auto">
                  <template v-if="!loading.productA">
                    <template v-if="merchant.items && merchant.items.length">
                      <div v-for="(catalog, i) in merchant.items" :key="i">
                        <p class="sm:pl-2 py-1 font-medium">{{ catalog.name }}</p>
                        <div class="divide-y divide-grey-4">
                          <template v-if="catalog.items && catalog.items.length">
                            <menu-card
                              v-for="(item, i) in catalog.items"
                              :key="i"
                              :raw="item"
                              :is-edit="false"
                              :image-url="item.banners.length ? item.banners[0].image_url : ''"
                              :name="item.name"
                              :category="item.group.name"
                              :description="item.description"
                              :price="item.price"
                              :is-active="item.is_active"
                              :variants="item.variations"
                              style="width: 75vw"
                            />
                          </template>
                          <template v-else>
                            <p class="sm:px-2 sm:ml-2 py-1 text-gold-dark bg-gold-soft rounded-md inline">
                              No items found in this catalog
                            </p>
                          </template>
                        </div>
                      </div>
                    </template>
                    <template v-else >
                      <p class="sm:px-2 sm:ml-2 py-8 text-center text-gold-dark bg-gold-soft rounded-md">
                        No catalogs found in this merchant
                      </p>
                    </template>
                  </template>
                  <template v-else>
                    <div>
                      <div class="sm:pl-2 py-1">
                        <div class="rounded bg-grey-4 h-4 w-32"></div>
                      </div>
                      <div class="divide-y divide-grey-4">
                        <menu-card :is-edit="false" v-for="i in 5" :key="i" :loading="true"  style="width: 75vw" />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
      <div class="bg-white flex items-center justify-center rounded-md cursor-pointer shadow-md hover:shadow-lg self-center p-4" @click="copyMerchantAtoB">
        <help-button :loading="loading.transfering" :icon-size="6" bg-color="white" icon-only :icon="screenWidth > 640 ? 'double-chevron-right' : 'double-chevron-down'" class="items-center p-1 text-flame" />
      </div>
      <!-- <icon
        v-if="screenWidth > 640"
        class="bg-white iems-center p-1 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg self-center w-10"
        :name="loading.transfering ? 'loading' : 'double-chevron-right'"
        :size="14"
        @click="copyMerchantAtoB"
        :class="{ 'animate-spin': loading.transfering }"
      />
      <icon
        v-if="screenWidth < 640"
        class="bg-white items-center p-1 mx-auto sm:mx-0 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg self-center w-10"
        :name="loading.transfering ? 'loading' : 'double-chevron-down'"
        :size="14"
        @click="copyMerchantAtoB"
        :class="{ 'animate-spin': loading.transfering }"
      /> -->
      <section class="auto-rows-max grid grid-flow-row rounded-md shadow-md px-4 bg-white w-full">
        <div class="p-5 text-center">
          <h1 class="font-medium text-subheading">Merchant B</h1>
        </div>
        <section class="grid grid-flow-row gap-2 w-full">
          <form @submit.prevent="searchMerchantB" class="flex gap-3">
            <help-input
              class="w-full"
              type="text"
              placeholder="Search merchant destination"
              v-model="search.merchantB"
              right-icon="search"
            />
            <section class="flex float-right">
              <icon
                @click="handleClear('B')"
                class="bg-white items-center p-1 rounded-md cursor-pointer text-flame shadow-md hover:shadow-lg h-full"
                name="trash"
                :size="10"
              />
            </section>
          </form>
          <p></p>
        </section>
        <section class="h-100 overflow-y-auto mb-4 py-4 rounded-md relative">
          <div
            v-if="loading.merchantB"
            class="flex items-center justify-center space-x-2 animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
            <div class="w-8 h-8 bg-blue-400 rounded-full"></div>
          </div>
          <div v-if="merchantB.length === 0" class="flex flex-col justify-center items-center w-full h-3/4">
            <p class="text-heading1">404</p>
            <p>Merchant Destination Not Found</p>
          </div>
          <div class="flex py-2 cursor-pointer w-full rounded-t-lg" v-for="(merchant, i) in merchantB" :key="i">
            <div class="grid place-items-center antialiased text-gray-900 gap-4 sm:gap-6 w-full" :class="{
              'bg-blue-50': merchant.checked,
              'bg-white': !merchant.checked,
            }">
              <div class="w-full relative rounded-lg" :class="{ 'shadow-lg': !merchant.modal }">
                <div class="sm:flex relative w-full">
                  <help-badge class="absolute top-2 left-2" :label="merchant.status" :color="merchant.status === 'OPEN' ? 'positive' : 'negative'" />
                  <img
                    :src="merchant.banners.length ? merchant.banners[0].image_url : `${require('../assets/no_image.png')}`"
                    alt="random imgee"
                    class="object-cover object-center shadow-md sm:w-44 h-44 w-full rounded-t-lg"
                  />
                  <div class="py-3 px-6">
                    <h4 class="my-1 text-subheading font-semibold uppercase leading-tight truncate">
                      {{ merchant.name }}
                    </h4>
                    <div class="my-1 grid grid-flow-col justify-start items-center">
                      <icon name="location-marker" />&nbsp;
                      <span class="text-gray-600 text-xs"> {{ `${merchant.address?.line_address}, ${merchant.address?.district}, ${merchant.address?.city.name}, ${merchant.address?.state} ${merchant.address?.zip_code}` }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="phone" />&nbsp;
                      <span class="text-xs text-gray-600">{{ merchant.phone_number }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="bank" />&nbsp;
                      <span class="text-xs text-gray-600">{{ `${merchant.account.bank.name} - ${merchant.account.no} (${merchant.account.name})` }}</span>
                    </div>
                    <div class="my-1 flex items-center">
                      <icon name="badge-checked" />&nbsp;
                      <span class="text-xs" :class="{ 'text-mint' : merchant.verify_status === 'SUCCESS', 'text-flame' : merchant.verify_status !== 'SUCCESS' }">{{ merchant.verify_status }}</span>
                    </div>
                    <div class="flex justify-between w-full">
                      <div class="flex justify-center items-center cursor-pointer m-2 p-1 px-4 py-2 rounded-xl shadow-md hover:shadow-lg bg-white" @click="handleMerchantDetail(merchant, 'B')">
                        <icon :name="merchant.modal ? 'double-chevron-up' : 'double-chevron-down'" />&nbsp;
                        <p class="text-small text-gray-600">{{generateName('Detail')}}</p>
                      </div>&nbsp;
                      <div class="flex justify-center items-center cursor-pointer m-2 p-1 px-4 py-2 rounded-xl shadow-md hover:shadow-lg bg-blue-500" @click="handleCheckMerchantB(merchant)">
                        <icon name="check-circle" color="white" />&nbsp;
                        <p class="text-small text-white">{{merchant.checked ? generateName('Unselect') : generateName('Select')}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="merchant.modal" class="bg-white rounded-md shadow-md w-full px-4 pb-4">
                <div class="overflow-y-auto">
                  <template v-if="!loading.productB">
                    <template v-if="merchant.items && merchant.items.length">
                      <div v-for="(catalog, i) in merchant.items" :key="i">
                        <p class="sm:pl-2 py-1 font-medium">{{ catalog.name }}</p>
                        <div class="divide-y divide-grey-4">
                          <template v-if="catalog.items && catalog.items.length">
                            <menu-card
                              v-for="(item, i) in catalog.items"
                              :key="i"
                              :raw="item"
                              :is-edit="false"
                              :image-url="item.banners.length ? item.banners[0].image_url : ''"
                              :name="item.name"
                              :category="item.group.name"
                              :description="item.description"
                              :price="item.price"
                              :is-active="item.is_active"
                              :variants="item.variations"
                               style="width: 75vw"
                            />
                          </template>
                          <template v-else>
                            <p class="sm:px-2 sm:ml-2 py-1 text-gold-dark bg-gold-soft rounded-md inline">
                              No items found in this catalog
                            </p>
                          </template>
                        </div>
                      </div>
                    </template>
                    <template v-else >
                      <p class="sm:px-2 sm:ml-2 py-8 text-center text-gold-dark bg-gold-soft rounded-md">
                        No catalogs found in this merchant
                      </p>
                    </template>
                  </template>
                  <template v-else>
                    <div>
                      <div class="sm:pl-2 py-1">
                        <div class="rounded bg-grey-4 h-4 w-32"></div>
                      </div>
                      <div class="divide-y divide-grey-4">
                        <menu-card :is-edit="false" v-for="i in 5" :key="i" :loading="true"  style="width: 75vw" />
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import Icon from '@/components/atoms/Icon.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import MenuCard from '@/components/molecules/MenuCard.vue';
import store from '@/store';
import API from '../apis';

export default {
  name: 'CopyMerchant',
  components: {
    HelpInput,
    Icon,
    MenuCard,
    HelpBadge,
    HelpButton,
  },
  computed: {
    screenWidth() {
      return store.state.screenWidth;
    },
  },
  data() {
    return {
      search: {
        merchantA: '',
        merchantB: '',
      },
      loading: {
        merchantA: false,
        merchantB: false,
        productA: false,
        productB: false,
        transfering: false,
      },
      modal: {
        merchantA: false,
        searchMerchantB: false,
      },
      merchantA: [],
      merchantB: [],
      tempMerchantA: [],
      tempMerchantB: [],
      detailProductA: [],
      detailProductB: [],
      idMerchantA: null,
      idMerchantB: null,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    generateName(param) {
      return this.screenWidth < 640 ? param : `${param} Product`;
    },
    async searchMerchantA() {
      this.loading.merchantA = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants?search=${this.search.merchantA}`);
        this.merchantA = data;
        this.tempMerchantA = data;
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading.merchantA = false;
    },
    async searchMerchantB() {
      this.loading.merchantB = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants?search=${this.search.merchantB}`);
        this.merchantB = data;
        this.tempMerchantB = data;
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading.merchantB = false;
    },
    async copyMerchantAtoB() {
      this.loading.transfering = true;
      try {
        await API.post(`items/from/${this.idMerchantA}/to/${this.idMerchantB}/duplicate`, {});
        this.toast.success('successfully copy item !');
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading.transfering = false;
    },
    handleClear(param) {
      this[`merchant${param}`] = [];
      this.search[`merchant${param}`] = '';
    },
    handleCheckMerchantA(payload) {
      if (payload.checked) {
        payload.checked = false;
        this.merchantA = this.tempMerchantA;
      } else {
        this.idMerchantA = payload.id;
        this.merchantA = this.merchantA.filter((el) => el.id === payload.id);
        this.merchantA[0].checked = true;
      }
    },
    handleCheckMerchantB(payload) {
      if (payload.checked) {
        payload.checked = false;
        this.merchantB = this.tempMerchantB;
      } else {
        this.idMerchantB = payload.id;
        this.merchantB = this.merchantB.filter((el) => el.id === payload.id);
        this.merchantB[0].checked = true;
      }
    },
    async handleMerchantDetail(payload, param) {
      const id = payload.id;
      if (param === 'A') {
        payload.modal = !payload.modal;
        this.loading.productA = !this.loading.productA;
      } else {
        payload.modal = !payload.modal;
        this.loading.productB = !this.loading.productB;
      }
      try {
        const responseItems = await API.get(`merchants/${id}/items?cache=false`);
        const responseCatalogs = await API.get(`merchants/${id}/catalogs`);
        const finalData = responseCatalogs.data.data.map((el) => {
          const filtered = responseItems.data.data.filter((e) => e.catalog.id === el.id);
          return {
            ...el,
            items: filtered,
          };
        });
        payload.items = finalData;
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading.productA = false;
      this.loading.productB = false;
    },
  },
};
</script>

<style></style>
