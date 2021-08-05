<template>
  <varian-group-option v-if="flagSelectVarianGroup" @closeSelectVarian="flagSelectVarianGroup = false" />
  <div v-else class="inner-modal-fixed overflow-auto px-1">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3">
        <span class="font-semibold text-heading4">VARIAN OPTIONS</span>
      </div>
      <p></p>
    </div>
    <section class="grid gap-3">
      <div class="border rounded-md p-4 grid gap-3 shadow-md">
        <div class="flex justify-between">
          <span class="font-semibold">Varian 1</span>
          <span class="font-semibold text-red-600 cursor-pointer">Delete</span>
        </div>
        <div
          class="py-2 px-2 w-full rounded-md flex justify-between items-center cursor-pointer"
          style="background: #F6F6F6"
          @click="flagSelectVarianGroup = true"
        >
          <div class="grid grid-flow-row gap-1">
            <span class="font-semibold">Grup Variasi</span>
            <span class="text-gray-500">Ukuran</span>
          </div>
          <icon name="chevron-right" class="text-blue-500" :size="10" />
        </div>
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
            <div class="flex pb-2">
              <span class="font-semibold">Varian Options</span>
            </div>
            <div v-for="(itemVarian, i) in itemVarians" :key="i" class="grid grid-flow-col gap-3">
              <help-checkbox />
              <help-input
                type="text"
                placeholder="Varian item name here"
                v-model="itemVarian.varianItemName"
              />
              <help-input
                type="number"
                placeholder="Additional price here"
                v-model="itemVarian.additionalPrice"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="border rounded-md p-4 grid gap-3 shadow-md">
        <div class="flex justify-between">
          <span class="font-semibold">Varian 2</span>
          <span class="font-semibold text-red-600 cursor-pointer">Delete</span>
        </div>
        <div
          class="py-2 px-2 w-full rounded-md flex justify-between items-center cursor-pointer"
          style="background: #F6F6F6"
          @click="flagSelectVarianGroup = true"
        >
          <div class="grid grid-flow-row gap-1">
            <span class="font-semibold">Grup Variasi</span>
            <span class="text-gray-500">Ukuran</span>
          </div>
          <icon name="chevron-right" class="text-blue-500" :size="10" />
        </div>
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
            <div class="flex pb-2">
              <span class="font-semibold">Varian Options</span>
            </div>
            <div v-for="(itemVarian, i) in itemVarians" :key="i" class="grid grid-flow-col gap-3">
              <help-checkbox />
              <help-input
                type="text"
                placeholder="Varian item name here"
                v-model="itemVarian.varianItemName"
              />
              <help-input
                type="number"
                placeholder="Additional price here"
                v-model="itemVarian.additionalPrice"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="border rounded-md p-4 grid gap-3 shadow-md">
        <div class="flex justify-between">
          <span class="font-semibold">Varian 3</span>
          <span class="font-semibold text-red-600 cursor-pointer">Delete</span>
        </div>
        <div
          class="py-2 px-2 w-full rounded-md flex justify-between items-center cursor-pointer"
          style="background: #F6F6F6"
          @click="flagSelectVarianGroup = true"
        >
          <div class="grid grid-flow-row gap-1">
            <span class="font-semibold">Grup Variasi</span>
            <span class="text-gray-500">Ukuran</span>
          </div>
          <icon name="chevron-right" class="text-blue-500" :size="10" />
        </div>
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
            <div class="flex pb-2">
              <span class="font-semibold">Varian Options</span>
            </div>
            <div v-for="(itemVarian, i) in itemVarians" :key="i" class="grid grid-flow-col gap-3">
              <help-checkbox />
              <help-input
                type="text"
                placeholder="Varian item name here"
                v-model="itemVarian.varianItemName"
              />
              <help-input
                type="number"
                placeholder="Additional price here"
                v-model="itemVarian.additionalPrice"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="divide-y divide-grey-4 py-8">
      <p></p>
      <div class="flex justify-end pt-8">
        <span
          @click="$emit('closeVarian')"
          class="font-medium shadow-sm py-2 px-6 rounded-2xl cursor-pointer border hover:shadow-md"
          >Cancel</span
        >&nbsp;
        <span
          @click="$emit('closeVarian')"
          class="font-medium bg-blue-500 shadow-sm py-2 px-6 rounded-2xl text-white cursor-pointer border hover:shadow-md"
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

export default {
  name: 'VarianOptions',
  components: {
    HelpToggle,
    HelpInput,
    HelpCheckbox,
    VarianGroupOption,
    Icon,
  },
  props: {
    flagEditVarian: {
      type: Boolean,
      default: false,
    },
    itemVarians: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
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
};
</script>

<style></style>
