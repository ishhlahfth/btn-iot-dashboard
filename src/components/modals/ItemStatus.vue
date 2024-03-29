<template>
  <div class="grid gap-6 inner-modal-auto modal-sm">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Edit Item Status</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form @submit.prevent="proceed" class="grid gap-4">
      <div class="w-full">
        <help-select
          label="Change status to"
          :options="statuses"
          v-model="selectedStatus"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <help-button label="proceed" />
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import store from '@/store';
import API from '../../apis';

export default {
  name: 'ItemStatus',
  components: {
    HelpButton,
    HelpSelect,
  },
  emits: ['close'],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      statuses: [
        { value: 'AVAILABLE', label: 'Tersedia' },
        { value: 'UNAVAILABLE', label: 'Habis' },
        // { value: 'HIDDEN', label: 'Hidden' },
        // { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
        { value: 'SUSPEND', label: 'Suspend' },
      ],
      selectedStatus: { value: 'AVAILABLE', label: 'Tersedia' },
    };
  },
  computed: {
    item() {
      return store.state.item;
    },
    screenWidth() {
      return store.state.screenWidth;
    },
  },
  methods: {
    async proceed() {
      const payload = {
        status: this.selectedStatus.value, // 'AVAILABLE', 'UNAVAILABLE', 'HIDDEN', 'OUT_OF_STOCK', 'SUSPEND'
        sort_no: this.item.sort_no,
        name: this.item.name,
        description: this.item.description,
        price: this.item.price,
        min_buy_qty: this.item.min_buy_qty,
        catalog_id: this.item.catalog.id,
        group_id: this.item.group.id,
        variations: this.item.variations.map((variation) => ({
          ...variation,
          id: variation.variation_id,
          options: variation.options.map((option) => ({
            ...option,
            id: option.option_id,
          })),
        })),
      };

      try {
        const {
          data: { data },
        } = await API.patch(`items/${this.item.id}`, payload);

        this.toast.success(`Successfully updated ${data.name}`);
        store.dispatch('loadMerchant', store.state.merchantId);
        this.$emit('close');
      } catch (error) {
        this.toast.error(error.message);
      }
    },
  },
};
</script>

<style></style>
