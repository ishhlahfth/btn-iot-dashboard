<template>
  <help-modal v-model="modal.sm" permanent>
    <confirmation
      title="Delete Photo Product"
      message="Are you sure you want to delete this photo product ?"
      bgColor="red-500"
      @close="modal.sm = false"
      @cancel="modal.sm = false"
      @confirm="confirmDelete"
    />
  </help-modal>
  <div v-if="flagVarianGroup">
    <varian-options @closeVarian="flagVarianGroup = false" @handleAddVarian="handleAddVarian" @handleResetVarian="handleResetVarian" @submitVarian="submitVarian" :flagEditVarian="flagEditVarian" :itemVarians="itemVarians" />
  </div>
  <div v-else-if="flagItemCatalog">
    <product-catalog @handleAddCatalog="handleAddCatalog" @handleEditCatalog="handleEditCatalog" @handleDeleteCatalog="handleDeleteCatalog" :itemCatalogs="itemCatalogs" @close="flagItemCatalog = false" />
  </div>
  <div v-else>
    <div class="inner-modal-fixed overflow-auto px-1">
      <div class="divide-y divide-grey-4">
        <div class="flex justify-between py-2">
          <span class="font-semibold text-heading4">ADD PRODUCT</span>
        </div>
        <p></p>
      </div>
      <div class="py-2 lg:py-5 grid gap-2">
        <span class="font-semibold text-heading5">PRODUCT IMAGES (0/5)</span>
        <div
          class="py-2 lg:py-3 h-20 lg:h-26 xl:h-32 px-2 lg:px-3 border border-grey-4 rounded grid grid-cols-5 gap-1 md:gap-2 lg:gap-2"
        >
          <div
            v-for="(productImage, i) in productImages"
            :key="i"
            class="bg-grey-4 flex items-center justify-center rounded-md lg:w-full lg:h-full"
            @mouseover="handleHover(i, true)"
            @mouseleave="handleHover(i, false)"
          >
            <help-thumbnail
              :key="i"
              use-bg
              class="hover:opacity-50"
              width="100%"
              height="100%"
              :src="
                productImage
                  ? productImage
                  : 'https://www.couvee.co.id/wp-content/uploads/2019/11/CF4566E9-0DC2-43F1-ABC9-F1BED1F0A9CE-768x768.jpg'
              "
            />
            <help-button
              :key="i"
              v-if="photoHover[`${i}`]"
              icon-only
              icon="trash"
              bg-color="red-600"
              class="absolute top-34"
              @click="handleDeletePhoto(productImage)"
            />
          </div>
          <div
            @click="$refs.photoProduct.click()"
            class="relative bg-gray-300 flex items-center justify-center rounded-md w-16 h-16 lg:h-20 lg:w-20 xl:w-26 xl:h-26 hover:bg-gray-400 cursor-pointer"
            :class="{
              hidden: productImages.length === 5,
            }"
          >
            <icon name="plus-circle" :size="32" color="#ffffff" />
            <input
              ref="photoProduct"
              type="file"
              accept="image/*"
              class="h-full w-full opacity-0 hidden"
              @input="handleChangeImg"
            />
          </div>
        </div>
      </div>
      <div class="grid gap-2">
        <span class="font-semibold text-heading5">PRODUCT DETAIL</span>
        <help-input
          type="text"
          label="Product Name"
          placeholder="Product Name here"
          left-icon="template-outline"
        />
        <help-input
          type="text"
          label="Product Description"
          placeholder="Product Description here"
          left-icon="description"
        />
        <help-input
          type="number"
          label="Product Price (Rp)"
          placeholder="Rp 1.000.000"
          left-icon="price"
        />
        <help-select
          label="Stock Status"
          :options="stocks"
          v-model="form.status"
          :position="['bottom', 'right']"
          left-icon="status-stock"
        />
        <help-input
          type="number"
          label="Minimum Order"
          placeholder="Product Minimum to Order"
          left-icon="cart-outline"
        />
        <help-select
          label="Product Category"
          :options="itemCategories"
          v-model="form.catalog_id"
          :position="['bottom', 'right']"
          left-icon="tag"
        />
        <template class="grid grid-cols-4 gap-2">
          <help-select
            class="col-span-3"
            label="Product Catalog"
            :options="itemCatalogs"
            v-model="form.productCatalog"
            :position="['bottom', 'right']"
            left-icon="catalog"
          />
          <div class="w-full outline-none grid">
            <label class="font-medium"></label>
            <div class="flex items-center justify-start pt-5 cursor-pointer">
              <help-button
                bg-color="blue-500"
                icon="plus-circle"
                class="h-full w-11/12 md:w-full"
                label="Catalog"
                @click="flagItemCatalog = true"
              />
            </div>
          </div>
        </template>
      </div>
      <div class="py-5 grid grid-flow-row gap-3">
        <span class="font-semibold text-heading5">PRODUCT VARIAN GROUP</span>
        <template v-if="payloadVarian.length">
          <div v-for="(payload, i) in payloadVarian" :key="i" class="flex items-center">
            <help-input
              class="w-full"
              type="text"
              v-model="payload.name"
              :bgColor="'gray-100'"
              :disabled="true"
              right-icon="chevron-right"
              :pointer="true"
              @click="handleEditVarian(payload, i)"
            />
          </div>
        </template>
        <template v-else>
          <p class="sm:px-2 sm:ml-2 py-2 text-gold-dark bg-gold-soft rounded-sm text-center inline">
            No variant group found please add some
          </p>
        </template>
        <div class="flex justify-center">
          <span @click="flagVarianGroup = !flagVarianGroup" class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer hover:bg-blue-400">Set Variation Options</span>
        </div>
      </div>
      <div class="divide-y divide-grey-4">
        <p></p>
        <div class="flex justify-end py-4">
          <span @click="$emit('close')" class="font-medium shadow-sm py-2 px-6 rounded-2xl cursor-pointer border hover:shadow-md">Cancel</span>&nbsp;
          <span @click="$emit('close')" class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md">Save Product</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import HelpModal from '@/components/templates/Modal.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import VarianOptions from '@/components/sub-components/VarianOptions.vue';
import ProductCatalog from '@/components/sub-components/ProductCatalog.vue';
import mixin from '@/mixin';
import { uuid } from 'uuidv4';
import API from '@/apis';

export default {
  name: 'MerchantItemForm',
  mixins: [mixin],
  components: {
    Icon,
    HelpButton,
    HelpThumbnail,
    HelpInput,
    HelpSelect,
    HelpModal,
    Confirmation,
    VarianOptions,
    ProductCatalog,
  },
  data() {
    return {
      stocks: [
        {
          value: 'AVAILABLE',
          label: 'Tersedia',
        },
        {
          value: 'UNAVAILABLE',
          label: 'Habis',
        },
      ],
      imageFile: null,
      imageIsChanged: false,
      form: {
        src: '',
        productCatalog: 'Pilih Katalog',
        catalog_id: 'Pilih Kategori',
        status: 'Pilih Status',
        varianGroup: {
          name: '',
          required: false,
          multipleChoice: false,
        },
      },
      productImages: [],
      itemCategories: [],
      itemCatalogs: [
        {
          value: 'Paket Nasi',
          label: 'Paket Nasi',
          disabled: true,
          editable: false,
          color: 'grey-7',
        },
        {
          value: 'Paket Minuman',
          label: 'Paket Minuman',
          disabled: true,
          editable: false,
          color: 'grey-7',
        },
        {
          value: 'Paket Dessert',
          label: 'Paket Dessert',
          disabled: true,
          editable: false,
          color: 'grey-7',
        },
        {
          value: 'Paket Beverages',
          label: 'Paket Beverages',
          disabled: true,
          editable: false,
          color: 'grey-7',
        },
      ],
      itemVarians: [
        {
          varianItemName: '',
          additionalPrice: '',
        },
      ],
      payloadVarian: [],
      index: 0,
      photoHover: {},
      modal: {
        sm: false,
      },
      payloadPhoto: '',
      isExistVarian: false,
      flagVarianGroup: false,
      flagEditVarian: false,
      flagItemCatalog: false,
      colorItem: 'gray-100',
      newCatalog: '',
    };
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    },
    loading() {
      return this.$store.state.loading.merchant;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    async generateCatalogs() {
      const {
        data: { data },
      } = await API.get('item-groups');
      this.itemCategories = data.map((el) => ({
        ...el,
        value: el.id,
        label: el.name,
      }));
    },
    async generateVarians() {
      const {
        data: { data },
      } = await API.get('variations');
      console.log(data, 'tes');
    },
    handleChangeImg(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const fileName = `${uuid()}.${e.target.files[0].type.split('/')[1]}`;
        const url = `${this.S3BaseURL}/${fileName}`;
        this.productImages.push(URL.createObjectURL(file));
        this.photoHover[`${this.productImages.length - 1}`] = false;
        this.index += 1;
        this.imageFile = { file, fileName, url };
        this.imageIsChanged = true;
      }
    },
    handleDeletePhoto(payload) {
      this.modal.sm = true;
      this.payloadPhoto = payload;
    },
    handleDeleteCatalog(payload) {
      this.itemCatalogs = this.itemCatalogs.filter((el) => el.value !== payload.value);
    },
    handleAddCatalog() {
      this.itemCatalogs.unshift({
        value: this.newCatalog,
        label: this.newCatalog,
        disabled: true,
        color: 'gray-100',
      });
      this.newCatalog = '';
    },
    handleAddVarian() {
      this.itemVarians.unshift({
        varianItemName: '',
        additionalPrice: '',
      });
    },
    handleEditVarian(payload, i) {
      this.flagVarianGroup = true;
      this.flagEditVarian = true;
      this.form.varianGroup = {
        id: i,
        name: payload.name,
        multipleChoice: payload.multipleChoice,
        required: payload.required,
      };
      this.itemVarians = payload.varians;
    },
    handleResetVarian() {
      if (this.flagEditVarian) {
        this.flagVarianGroup = false;
      } else {
        this.form.varianGroup = {
          name: '',
          required: false,
          multipleChoice: false,
        };
        this.itemVarians = [
          {
            varianItemName: '',
            additionalPrice: '',
          },
        ];
      }
    },
    submitVarian() {
      const {
        id, name, multipleChoice, required,
      } = this.form.varianGroup;
      if (!this.flagEditVarian) {
        this.payloadVarian.push({
          id: this.itemVarians.length - 1,
          name,
          multipleChoice,
          required,
          varians: this.itemVarians,
        });
      } else {
        this.payloadVarian.forEach((el) => {
          console.log(el.id);
          console.log(id);
          if (el.id === id) {
            el.name = name;
            el.multipleChoice = multipleChoice;
            el.required = required;
            el.varians = this.itemVarians;
          }
        });
      }
      this.flagVarianGroup = false;
      this.flagEditVarian = false;
      this.handleResetVarian();
    },
    confirmDelete() {
      if (this.productImages.length === 0) {
        this.productImages = [];
      } else {
        this.productImages = this.productImages.filter((el) => el !== this.payloadPhoto);
      }
      this.modal.sm = false;
    },
    handleHover(index, param) {
      this.photoHover[`${index}`] = param;
    },
    handleEditCatalog(payload, param) {
      payload.label = payload.value;
      if (param === 'edit-name') {
        payload.color = 'gray-100';
        payload.editable = false;
        payload.disabled = true;
      } else {
        payload.color = 'white';
        payload.editable = true;
        payload.disabled = false;
      }
    },
  },
  mounted() {
    this.generateCatalogs();
    this.generateVarians();
  },
};
</script>

<style></style>
