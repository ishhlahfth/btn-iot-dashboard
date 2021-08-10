<template>
  <add-varian-group v-if="flagAddVarian" @closeAddVarian="flagAddVarian = false" @refetch="generateVarians(merchant.merchant_id)" :isChanged="isChangeVarian" :data="dataVarian" />
  <div v-else class="inner-modal-fixed overflow-auto px-1 modal-md">
    <div class="divide-y divide-grey-4 pb-3">
      <div class="flex justify-between pb-3 items-center">
        <icon
          @click="$emit('closeSelectVarian')"
          name="chevron-left"
          class="text-blue-500 cursor-pointer"
          :size="10"
        />
        <span class="font-semibold text-heading4">{{ isChanged ? 'Change' : 'Select' }} Varian Group</span>
        <span></span>
      </div>
      <p></p>
    </div>
    <div v-if="!loading" class="grid gap-3 my-2">
      <div v-for="(itemVarian, i) in itemVarians" :key="i" class="py-3 px-3 w-full rounded-md cursor-pointer" style="background: #F6F6F6">
        <div class="flex justify-between items-center">
          <span class="font-semibold">{{ itemVarian.name }}</span>
          <div v-if="tempSelectedVarian.includes(itemVarian.id)"></div>
          <div v-if="!tempSelectedVarian.includes(itemVarian.id)">
            <span v-if="!isChanged" class="text-blue-500 font-medium" @click="handleSelectVarian(itemVarian)">Select</span>
            <span v-if="isChanged" @click="handleChangeVarian(true, itemVarian)" class="text-blue-500 font-medium">Change</span>
          </div>
        </div>
        <div class="grid grid-cols-4 gap-1 py-2">
          <span
            v-for="(item) in itemVarian.options"
            :key="item.id"
            class="text-center text-small font-medium bg-blue-500 py-2 px-2 rounded-2xl text-white hover:shadow-md"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
    <div v-else class="grid gap-3 my-2">
      <div class="animate-pulse h-20 w-full bg-grey-4 rounded-md"></div>
      <div class="animate-pulse h-20 w-full bg-grey-4 rounded-md"></div>
      <div class="animate-pulse h-20 w-full bg-grey-4 rounded-md"></div>
    </div>
    <div
      v-if="isChanged"
      @click="handleChangeVarian(false)"
      class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
    >
      <help-button bg-color="blue-500" icon="plus-circle" icon-only />
      <span class="text-center text-small font-medium">Add Variation Group</span>
    </div>
    <div
      v-if="!isChanged"
      @click="isChanged = !isChanged"
      class="w-full flex justify-center items-center bg-blue-500 my-10 py-2 px-2 cursor-pointer rounded-2xl text-white hover:shadow-md"
    >
      <span class="text-center text-small font-medium">Change Variation Group</span>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import Icon from '@/components/atoms/Icon.vue';
import HelpButton from '@/components/atoms/Button.vue';
import AddVarianGroup from '@/components/sub-components/AddVarianGroup.vue';
import API from '../../apis';

export default {
  name: 'VarianGroupOption',
  emits: ['selectVarian', 'closeSelectVarian'],
  components: {
    Icon,
    HelpButton,
    AddVarianGroup,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      flagAddVarian: false,
      itemVarians: [],
      loading: false,
      isChanged: false,
      isChangeVarian: false,
      dataVarian: {},
      tempSelectedVarian: [],
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
  methods: {
    async generateVarians(id) {
      this.isChanged = false;
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${id}/variations`);
        this.itemVarians = data;
      } catch (error) {
        this.toast.error(error.response.data.meta.message);
      }
      this.loading = false;
    },
    handleSelectVarian(payload) {
      this.$emit('selectVarian', payload);
      this.$emit('closeSelectVarian');
    },
    handleChangeVarian(param, payload) {
      this.flagAddVarian = true;
      this.isChangeVarian = param;
      if (payload) {
        this.dataVarian = payload;
      }
    },
  },
  mounted() {
    this.generateVarians(this.merchant.merchant_id);
    if (this.isEdit) {
      this.tempSelectedVarian = this.data.map((el) => el.variation_id || el.id);
    } else {
      this.tempSelectedVarian = this.data.map((el) => el.id);
    }
  },
};
</script>

<style></style>
