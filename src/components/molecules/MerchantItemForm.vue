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
    <div class="inner-modal-fixed modal-md overflow-auto px-1 grid gap-3">
      <div class="divide-y divide-grey-4">
        <div class="flex justify-between pb-3">
          <span class="font-semibold text-heading4"
            >{{ flagEditVarian ? 'EDIT' : 'ADD' }} VARIAN GROUP</span
          >
        </div>
        <p></p>
      </div>
      <help-input
        type="text"
        label="Varian Group Name"
        v-model="form.varianGroup.name"
        placeholder="Varian group name here"
        left-icon="clipboard-outline"
      />
      <template class="flex justify-between">
        <span class="text-gray-500">Required ?</span>
        <help-toggle
          v-model="form.varianGroup.required"
          @change="form.varianGroup.required = !form.varianGroup.required"
        />
      </template>
      <template class="flex justify-between">
        <span class="text-gray-500">Multiple Choice ?</span>
        <help-toggle
          v-model="form.varianGroup.multipleChoice"
          @change="form.varianGroup.multipleChoice = !form.varianGroup.multipleChoice"
        />
      </template>
      <div class="grid grid-flow-col divide-y divide-grey-4">
        <p></p>
        <div class="grid gap-2 py-3">
          <div class="grid grid-cols-2 gap-4">
            <label class="font-medium">Varian Item Name</label>
            <label class="font-medium">Additional Price (Rp)</label>
          </div>
          <div v-for="(itemVarian, i) in itemVarians" :key="i" class="grid grid-flow-col gap-3">
            <help-input
              type="text"
              placeholder="Varian item name here"
              v-model="itemVarian.varianItemName"
              left-icon="shopping-bag"
            />
            <help-input
              type="number"
              placeholder="Additional price here"
              v-model="itemVarian.additionalPrice"
              left-icon="price"
            />
          </div>
        </div>
      </div>
      <help-button bg-color="blue-500" icon="plus-circle" icon-only @click="handleAddVarian" />
      <div class="divide-y divide-grey-4">
        <p></p>
        <div class="flex justify-end pt-4">
          <help-button
            bg-color="bg-white"
            color="black-500"
            :label="flagEditVarian ? 'Cancel' : 'Reset'"
            @click="handleResetVarian"
          />&nbsp;
          <help-button bg-color="blue-500" :label="screenWidth <= 780 ? 'Save' : 'Save Varian'" @click="submitVarian" />
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="flagItemCatalog">
    <div class="inner-modal-fixed modal-md overflow-auto px-1 grid gap-4">
      <div class="divide-y divide-grey-4">
        <div class="flex justify-between pb-3">
          <span class="font-semibold text-heading4">PRODUCT CATALOG</span>
        </div>
        <p></p>
      </div>
      <form @submit.prevent="handleAddCatalog" class="grid grid-cols-4 gap-2">
        <help-input
          v-model="newCatalog"
          class="w-full col-span-3"
          type="text"
          placeholder="Catalog name here"
        />
        <help-button
          bg-color="blue-500"
          icon="plus-circle"
          class="h-full w-full"
          label="Add"
          type="submit"
        />
      </form>
      <div class="grid gap-4">
        <template v-if="itemCatalogs.length">
          <div v-for="(itemCatalog, i) in itemCatalogs" :key="i" class="flex items-center">
            <help-input
              class="w-full"
              type="text"
              v-model="itemCatalog.value"
              :bgColor="itemCatalog.color"
              :disabled="itemCatalog.disabled"
            />
            <div class="flex items-center">
              <template v-if="itemCatalog.editable">
                <icon
                  name="plus-circle"
                  :size="5"
                  class="absolute right-10 cursor-pointer hover:text-blue-500"
                  @click="handleEditCatalog(itemCatalog, 'edit-name')"
                />
              </template>
              <template v-else>
                <icon
                  name="edit"
                  :size="5"
                  class="absolute right-16 cursor-pointer hover:text-mint"
                  @click="handleEditCatalog(itemCatalog)"
                />
                <icon
                  name="trash"
                  :size="5"
                  class="absolute right-10 cursor-pointer hover:text-red-600"
                  @click="handleDeleteCatalog(itemCatalog)"
                />
              </template>
            </div>
          </div>
        </template>
        <template v-else>
          <p class="sm:px-2 sm:ml-2 py-2 text-gold-dark bg-gold-soft rounded-sm text-center inline">
            No variant group found please add some
          </p>
        </template>
      </div>
      <div class="divide-y divide-grey-4">
        <p></p>
        <div class="flex justify-end pt-3">
          <help-button
            bg-color="bg-white"
            color="black-500"
            label="Close"
            class="border"
            @click="flagItemCatalog = false"
          />
        </div>
      </div>
    </div>
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
          :position="['bottom', 'right']"
          left-icon="status-stock"
        />
        <help-input
          type="number"
          label="Minimum Order"
          placeholder="Product Minimum to Order"
          left-icon="cart-outline"
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
                v-if="screenWidth <= 768"
                bg-color="blue-500"
                icon="plus-circle"
                class="h-full w-11/12 md:w-full"
                label="Add"
                @click="flagItemCatalog = true"
              />
              <help-button
                v-else
                bg-color="blue-500"
                icon="plus-circle"
                class="h-full w-11/12 md:w-full"
                label="Add Item"
                @click="flagItemCatalog = true"
              />
            </div>
          </div>
        </template>
      </div>
      <div class="py-5 grid gap-2">
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
        <help-button
          bg-color="blue-500"
          icon="plus-circle"
          label="Add Varian Group"
          @click="flagVarianGroup = !flagVarianGroup"
        />
      </div>
      <div class="divide-y divide-grey-4">
        <p></p>
        <div class="flex justify-end pt-4">
          <help-button
            bg-color="bg-white"
            color="black-500"
            label="Reset"
            @click="$emit('close')"
          />&nbsp;
          <help-button bg-color="blue-500" :label="screenWidth <= 780 ? 'Save' : 'Save Product'" @click="$emit('close')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import HelpModal from '@/components/templates/Modal.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import mixin from '@/mixin';
import { uuid } from 'uuidv4';

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
    HelpToggle,
  },
  data() {
    return {
      stocks: [
        {
          value: 'stock 1',
          label: 'stock 1',
        },
        {
          value: 'stock 2',
          label: 'stock 2',
        },
      ],
      imageFile: null,
      imageIsChanged: false,
      form: {
        src: '',
        productCatalog: 'Pilih Katalog',
        varianGroup: {
          name: '',
          required: false,
          multipleChoice: false,
        },
      },
      productImages: [],
      itemCatalogs: [
        {
          value: 'Paket Nasi',
          label: 'Paket Nasi',
          disabled: true,
          editable: false,
          color: 'gray-100',
        },
        {
          value: 'Paket Minuman',
          label: 'Paket Minuman',
          disabled: true,
          editable: false,
          color: 'gray-100',
        },
        {
          value: 'Paket Dessert',
          label: 'Paket Dessert',
          disabled: true,
          editable: false,
          color: 'gray-100',
        },
        {
          value: 'Paket Beverages',
          label: 'Paket Beverages',
          disabled: true,
          editable: false,
          color: 'gray-100',
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
};
</script>

<style></style>
