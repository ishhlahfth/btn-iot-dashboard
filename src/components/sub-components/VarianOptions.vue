<template>
  <help-modal v-model="modal.sm" permanent>
    <confirmation
      title="Delete Varian Group"
      :message="`Are you sure you want to delete this ${payloadVarian?.name} group ?`"
      @close="modal.sm = false"
      @cancel="modal.sm = false"
      @confirm="handleDeleteVarian"
    />
  </help-modal>
  <help-modal v-model="modal.close" permanent>
    <confirmation
      title="Cancel Add Varian Group"
      :message="`Are you sure you want to cancel add varian group ?`"
      @close="modal.close = false"
      @cancel="modal.close = false"
      @confirm="$emit('closeVarian')"
    />
  </help-modal>
  <varian-group-option
    v-if="flagSelectVarianGroup"
    @closeSelectVarian="flagSelectVarianGroup = false"
    @selectVarian="handleSelectVarian"
    :data="payloadVarianGroup"
    :isEdit="isEdit"
  />
  <div v-else class="inner-modal-fixed overflow-auto modal-md px-1">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3">
        <span class="font-semibold text-heading4">Varian Options</span>
      </div>
      <p></p>
    </div>
    <section class="grid gap-3 py-2">
      <div
        v-for="(itemVarian, i) in selectVarians"
        :key="i"
        class="border rounded-md p-4 grid gap-3 shadow-md"
      >
        <div class="flex justify-between">
          <div class="w-full">
            <span v-if="itemVarian" class="font-semibold">Varian {{ i + 1 }}</span>
            <div v-else class="rounded bg-grey-4 h-6 w-32 animate-pulse"></div>
          </div>
          <span
            @click="confirmDelete(itemVarian)"
            v-if="itemVarian?.name"
            class="font-semibold text-red-600 cursor-pointer"
            >Delete</span
          >
          <span v-if="!itemVarian?.name" class="font-semibold text-grey-4 cursor-pointer"
            >Delete</span
          >
        </div>
        <div
          class="py-2 px-2 w-full rounded-md flex justify-between items-center cursor-pointer"
          style="background: #F6F6F6"
          @click="handleAddVarian(false, itemVarian)"
        >
          <div class="grid grid-flow-row gap-1">
            <span class="font-semibold">Grup Variasi</span>
            <span v-if="!itemVarian?.name" class="text-gray-500">Belum Pilih Grup Variasi</span>
            <span v-if="itemVarian?.name" class="text-gray-700">{{ itemVarian?.name }}</span>
          </div>
          <icon name="chevron-right" class="text-blue-500" :size="10" />
        </div>
        <template v-if="itemVarian?.name">
          <div class="flex justify-between">
            <span class="text-gray-500 text-sm">Is varian required ?</span>
            <help-toggle
              v-model="itemVarian.is_mandatory"
              @change="itemVarian.is_mandatory = !itemVarian.is_mandatory"
            />
          </div>
        </template>
        <template v-if="itemVarian?.name">
          <div class="flex justify-between">
            <span class="text-gray-500">Choosed more than 1 choice ?</span>
            <help-toggle
              v-model="itemVarian.multiple_choice"
              @change="itemVarian.multiple_choice = !itemVarian.multiple_choice"
            />
          </div>
        </template>
        <div v-if="itemVarian?.options" class="grid grid-flow-col divide-y divide-grey-4">
          <p></p>
          <div class="grid gap-2 py-3">
            <div class="flex pb-2">
              <span class="font-semibold">Varian Options</span>
            </div>
            <div v-for="item in itemVarian.options" :key="item.id" class="grid grid-flow-col gap-3">
              <help-checkbox v-model:checked="item.picked" />
              <help-input
                type="text"
                placeholder="Varian item name here"
                v-model="item.name"
                disabled
              />
              <help-input v-model="item.price" type="number" placeholder="Additional price here" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="my-5">
      <span
        v-if="selectVarians[0].name"
        @click="handleAddVarian(true)"
        class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md flex items-center justify-center"
        ><icon name="plus-circle" :size="6" />&nbsp;Add Varian</span
      >
      <span
        v-if="!selectVarians[0].name"
        class="font-medium bg-grey-4 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md flex items-center justify-center"
        ><icon name="plus-circle" :size="6" />&nbsp;Add Varian</span
      >
    </section>
    <div class="divide-y divide-grey-4 py-8">
      <p></p>
      <div class="flex justify-end pt-8">
        <span
          @click="modal.close = true"
          class="font-medium shadow-sm py-2 px-6 rounded-2xl cursor-pointer border hover:shadow-md"
          >Cancel</span
        >&nbsp;
        <span
          v-if="selectVarians[0].name"
          @click="handleSaveVarian"
          class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md"
          >Save Product</span
        >
        <span
          v-if="!selectVarians[0].name"
          class="font-medium bg-grey-4 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md"
          >Save Product</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/atoms/Icon.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import VarianGroupOption from '@/components/sub-components/VarianGroupOption.vue';
import HelpModal from '@/components/templates/Modal.vue';
import Confirmation from '@/components/modals/Confirmation.vue';

export default {
  name: 'VarianOptions',
  emits: ['closeVarian', 'getSelectVarian'],
  components: {
    HelpToggle,
    HelpInput,
    HelpCheckbox,
    VarianGroupOption,
    Icon,
    HelpModal,
    Confirmation,
  },
  props: {
    flagEditVarian: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isTrue: true,
      flagSelectVarianGroup: '',
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
      selectVarians: [
        {
          name: '',
        },
      ],
      modal: {
        sm: false,
        close: false,
      },
      isAdded: false,
      indexAdded: 0,
      payloadVarian: {},
      payloadVarianGroup: [],
      tempFlag: {},
    };
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  mounted() {
    if (this.data.length) {
      this.selectVarians = this.data.map((el) => ({
        ...el,
        options: el.options.map((e) => ({
          ...e,
          picked: true,
        })),
      }));
      this.payloadVarianGroup = this.selectVarians;
    }
  },
  methods: {
    handleSelectVarian(payload) {
      if (this.isAdded) {
        this.indexAdded += 1;
        this.selectVarians.push(payload);
      } else {
        this.selectVarians[this.indexAdded] = payload;
      }
      console.log(payload, 'select varian');
      if (this.payloadVarianGroup.length === 0) {
        this.payloadVarianGroup.push(payload);
      } else {
        switch (this.isAdded) {
          case true:
            this.payloadVarianGroup.push(payload);
            break;
          default:
            this.payloadVarianGroup[this.payloadVarianGroup.findIndex((el) => el.id === this.tempFlag.id)] = payload;
            break;
        }
      }
    },
    handleAddVarian(param, payload) {
      this.flagSelectVarianGroup = true;
      this.isAdded = param;
      if (payload) {
        if (payload.name) {
          this.tempFlag = payload;
        }
      }
    },
    handleDeleteVarian() {
      if (this.selectVarians.length === 1) {
        this.selectVarians = [
          {
            name: '',
          },
        ];
        this.payloadVarianGroup = [];
        this.indexAdded = 0;
      } else {
        this.selectVarians = this.selectVarians.filter((el) => el.id !== this.payloadVarian.id);
        this.payloadVarianGroup = this.payloadVarianGroup.filter((el) => el.id !== this.payloadVarian.id);
      }
      this.modal.sm = false;
    },
    confirmDelete(payload) {
      this.payloadVarian = payload;
      this.modal.sm = true;
    },
    handleSaveVarian() {
      const payloadToSend = this.selectVarians.map((el) => ({
        ...el,
        is_mandatory: el.is_mandatory || false,
        multiple_choice: el.multiple_choice || false,
        sort_no: 1,
        options: el.options.map((e) => ({
          ...e,
          price: +e.price || 0,
          is_mandatory: false,
          is_default: false,
          picked: e.picked || false,
        })),
      }));
      this.$emit('getSelectVarian', payloadToSend);
      this.$emit('closeVarian');
    },
  },
};
</script>

<style></style>
