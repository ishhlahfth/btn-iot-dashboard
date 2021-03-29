<template>
  <div class="grid gap-6 p-1 inner-modal-auto modal-sm">
    <p class="text-heading4 font-semibold">Edit Item Status</p>
    <form @submit.prevent="proceed" class="grid gap-4">
      <div class="w-full">
        <help-select label="Change status to" :options="statuses" v-model="selectedStatus" />
      </div>
      <help-button label="proceed" />
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpSelect,
  },
  emits: ['close'],
  data() {
    return {
      statuses: [
        { value: 'AVAILABLE', label: 'Available' },
        { value: 'UNAVAILABLE', label: 'Unavailable' },
        { value: 'HIDDEN', label: 'Hidden' },
        { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
        { value: 'SUSPEND', label: 'Suspend' },
      ],
      selectedStatus: { value: 'AVAILABLE', label: 'Available' },
    };
  },
  computed: {
    item() {
      return this.$store.state.item;
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

        console.log('SUCCESSFULLY EDITED', data);
        this.$store.dispatch('loadMerchant', this.$store.state.merchantId);
        this.$emit('close');
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
