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
  <help-modal v-model="modal.create" permanent>
    <confirmation
      title="Add Product Confirmation"
      message="This action cannot be undone. Are you sure want to create this item product ?"
      bgColor="blue-500"
      @close="modal.create = false"
      @cancel="modal.create = false"
      @confirm="postItemProduct"
      :confirmLoading="loadingAdd"
    />
  </help-modal>
  <help-modal v-model="modal.close" permanent>
    <confirmation
      title="Cancel Add Product"
      :message="`Are you sure you want to cancel add item product ?`"
      bgColor="red-500"
      @close="modal.close = false"
      @cancel="modal.close = false"
      @confirm="$emit('close')"
    />
  </help-modal>
  <div v-if="flagVarianGroup">
    <varian-options @closeVarian="flagVarianGroup = false" @getSelectVarian="submitSelectVarian" :flagEditVarian="flagEditVarian" />
  </div>
  <div v-else-if="flagItemCatalog">
    <product-catalog @handleAddCatalog="generateCatalogs(merchant.merchant_id)" :itemCatalogs="itemCatalogs" @close="flagItemCatalog = false" />
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
                  ? productImage.src
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
          v-model="payloadToSend.name"
        />
        <help-input
          type="textarea"
          :rows="3"
          label="Product Description"
          placeholder="Product Description here"
          left-icon="description"
          v-model="payloadToSend.description"
        />
        <help-input
          type="number"
          label="Product Price (Rp)"
          placeholder="Rp 1.000.000"
          left-icon="price"
          v-model="payloadToSend.price"
        />
        <help-select
          label="Stock Status"
          :options="stocks"
          :position="['bottom', 'right']"
          left-icon="status-stock"
          v-model="payloadToSend.status"
        />
        <help-input
          type="number"
          label="Minimum Order"
          placeholder="Product Minimum to Order"
          left-icon="cart-outline"
          v-model="payloadToSend.min_buy_qty"
        />
        <help-select
          label="Product Category"
          :options="itemCategories"
          :position="['bottom', 'right']"
          left-icon="tag"
          v-model="payloadToSend.group_id"
        />
        <div class="flex items-center relative">
          <help-select
            class="w-11/12 mr-12"
            label="Product Catalog"
            :options="itemCatalogs"
            v-model="payloadToSend.catalog_id"
            :position="['bottom', 'right']"
            left-icon="catalog"
          />
          <icon @click="flagItemCatalog = true" class="absolute items-center right-0 mt-6 p-1 rounded-md cursor-pointer text-blue-500 shadow-md hover:shadow-lg" name="plus-circle" :size="10" />
        </div>
      </div>
      <div class="py-5 grid grid-flow-row gap-3">
        <span class="font-semibold text-heading5">PRODUCT VARIAN GROUP</span>
        <template v-if="payloadToSend.variations.length">
          <div v-for="(itemVarian, i) in payloadToSend.variations" :key="i" class="flex items-center">
            <div
              class="py-2 px-2 sm:py-3 sm:px-3 w-full rounded-md flex justify-between items-center hover:shadow-md"
              style="background: #F6F6F6"
            >
              <div class="grid grid-flow-row gap-1">
                <span class="font-medium text-blue-500">{{ itemVarian.name }}</span>
                <span v-for="(item) in itemVarian?.options" :key="item.id" class="text-gray-500">{{ item.name }}</span>
              </div>
              <div class="grid grid-flow-row gap-1">
                <span class="font-medium text-blue-500">{{ itemVarian.is_mandatory ? 'Wajib' : '' }}{{ itemVarian.is_mandatory ? ',' : '' }} {{ itemVarian.multiple_choice ? 'Pilih lebih dari 1' : 'Hanya pilih 1' }}</span>
                <span v-for="(item) in itemVarian?.options" :key="item.id" class="text-gray-500 text-right">+ {{ item.price }}</span>
              </div>
            </div>
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
        <div class="flex justify-end py-5">
          <span @click="modal.close = true" class="font-medium shadow-sm py-2 px-6 rounded-2xl cursor-pointer border hover:shadow-md">Cancel</span>&nbsp;
          <span @click="modal.create = true" class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md">Save Product</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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
  emits: ['close'],
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
  setup() {
    const toast = useToast();
    return { toast };
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
      itemCatalogs: [],
      itemVarians: [],
      payloadVarian: [],
      index: 0,
      photoHover: {},
      modal: {
        sm: false,
        close: false,
        create: false,
      },
      payloadPhoto: {},
      isExistVarian: false,
      flagVarianGroup: false,
      flagEditVarian: false,
      flagItemCatalog: false,
      colorItem: 'gray-100',
      newCatalog: '',
      payloadToSend: {
        catalog_id: 'Pilih Katalog',
        group_id: 'Pilih Kategori',
        name: '',
        status: 'Pilih Status',
        sort_no: 1,
        price: null,
        description: '',
        min_buy_qty: null,
        variations: [],
      },
      loadingAdd: false,
      S3BaseURL: process.env.VUE_APP_S3_BASE_URL,
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
    s3() {
      return new S3Client({
        region: 'ap-southeast-1',
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: 'ap-southeast-1' }),
          identityPoolId: process.env.VUE_APP_ID_POOL_ID,
        }),
      });
    },
  },
  methods: {
    async postItemProduct() {
      this.loadingAdd = true;
      this.payloadToSend = {
        ...this.payloadToSend,
        price: +this.payloadToSend.price,
        min_buy_qty: +this.payloadToSend.min_buy_qty,
        status: this.payloadToSend.status.value,
        catalog_id: this.payloadToSend.catalog_id.id,
        group_id: this.payloadToSend.group_id.id,
      };
      const payloadToSend = this.payloadToSend;
      try {
        const {
          data: { data },
        } = await API.post('items', payloadToSend);
        console.log(data, 'success add item');
        if (this.imageFile) {
          console.log('masuk sini ga', this.imageFile);
          this.imageFile.forEach((el) => {
            this.handleAddPhoto(data, el);
          });
        }
        setTimeout(async () => {
          this.toast.success(`Item ${data.name} has been created successfully !`);
          this.$emit('close');
          await this.$store.dispatch('loadMerchant', this.$store.state.merchantId);
        }, 1000);
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
    },
    async generateCategories() {
      const {
        data: { data },
      } = await API.get('item-groups');
      this.itemCategories = data.map((el) => ({
        ...el,
        value: el.id,
        label: el.name,
      }));
    },
    async generateCatalogs(id) {
      const {
        data: { data },
      } = await API.get(`merchants/${id}/catalogs`);
      this.itemCatalogs = data.map((el) => ({
        ...el,
        value: el.id,
        label: el.name,
        disabled: true,
        editable: false,
        color: 'grey-7',
      }));
    },
    handleChangeImg(e) {
      if (e.target.files.length) {
        const file = e.target.files[0];
        const fileName = `${uuid()}.${e.target.files[0].type.split('/')[1]}`;
        const url = `${this.S3BaseURL}/${fileName}`;
        this.productImages.push({
          url,
          src: URL.createObjectURL(file),
        });
        // this.productImages.push(URL.createObjectURL(file));
        this.photoHover[`${this.productImages.length - 1}`] = false;
        this.index += 1;
        if (!this.imageFile) {
          this.imageFile = [{ file, fileName, url }];
        } else {
          this.imageFile.push({ file, fileName, url });
        }
        // this.imageFile = { file, fileName, url };
        this.imageIsChanged = true;
      }
    },
    handleDeletePhoto(payload) {
      this.modal.sm = true;
      this.payloadPhoto = payload;
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
        this.imageFile = [];
      } else {
        this.productImages = this.productImages.filter((el) => el.src !== this.payloadPhoto.src);
        this.imageFile = this.imageFile.filter((el) => el.url !== this.payloadPhoto.url);
      }
      this.modal.sm = false;
    },
    handleHover(index, param) {
      this.photoHover[`${index}`] = param;
    },
    submitSelectVarian(payload) {
      console.log(payload, 'dari bawah');
      const finalPayload = payload.map((el) => ({
        ...el,
        options: el.options.filter((e) => e.picked),
      }));
      console.log(finalPayload, 'masuk ke atas');
      this.payloadToSend.variations = finalPayload;
    },
    // percobaan
    async uploadS3(imageFile, callback) {
      if (imageFile.file.size > 2000000) {
        this.toast.error('Oops, your image cannot be larger than 2MB');
      } else {
        const S3Params = {
          Bucket: 'help-bns-bucket',
          Key: imageFile.fileName,
          Body: imageFile.file,
          ContentType: imageFile.type,
        };

        try {
          const S3Response = await this.s3.send(new PutObjectCommand(S3Params));
          if (S3Response) {
            callback(S3Response);
          }
        } catch (error) {
          this.toast.error(error.message);
        }
      }
    },
    handleAddPhoto(payload, imageFile) {
      this.uploadS3(imageFile, async (S3Response) => {
        const BNSParams = {
          title: payload.name,
          hyperlink: imageFile.url,
          bannerable: {
            id: payload.id,
            type: 'CATALOG_ITEM',
          },
          group: 'COVER',
          provider: {
            name: 'S3',
            sort_no: payload.sort_no,
            config: {
              location: imageFile.url,
              etag: S3Response.ETag.slice(1, -1),
              bucket: 'help-bns-bucket',
              key: imageFile.fileName,
            },
          },
        };

        try {
          const {
            data: { data },
          } = await API.post('/banners', BNSParams);
          console.log(data);
        } catch (error) {
          this.toast.error(error.message);
        }
      });
      this.loading = false;
    },
    async patchBNS(payload) {
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.patch(`banners/${this.$store.state.adminDetail.banner.id}`, payload);
        this.$emit('reload');
        this.$emit('close');
        console.log(data);
        this.toast.success(`${this.form.name}'s profile has been successfully edited !`);
      } catch (error) {
        this.toast.error(error.message);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.generateCategories();
    this.generateCatalogs(this.merchant.merchant_id);
  },
};
</script>

<style></style>
