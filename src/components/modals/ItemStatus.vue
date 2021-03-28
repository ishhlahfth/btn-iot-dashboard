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
import { inject, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpSelect,
  },
  emits: ['closeAndRefetch'],
  setup(props, { emit }) {
    const {
      state: {
        modalState: { itemDetail },
      },
    } = inject('store');

    const statuses = [
      { value: 'AVAILABLE', label: 'Available' },
      { value: 'UNAVAILABLE', label: 'Unavailable' },
      { value: 'HIDDEN', label: 'Hidden' },
      { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
      { value: 'SUSPEND', label: 'Suspend' },
    ];
    const selectedStatus = ref({ value: 'AVAILABLE', label: 'Available' });

    const proceed = async () => {
      const payload = {
        status: selectedStatus.value.value, // 'AVAILABLE', 'UNAVAILABLE', 'HIDDEN', 'OUT_OF_STOCK', 'SUSPEND'
        sort_no: itemDetail.sort_no,
        name: itemDetail.name,
        description: itemDetail.description,
        price: itemDetail.price,
        min_buy_qty: itemDetail.min_buy_qty,
        catalog_id: itemDetail.catalog.id,
        group_id: itemDetail.group.id,
        variations: itemDetail.variations.map((variation) => ({
          ...variation,
          id: variation.variation_id,
          options: variation.options.map((option) => ({
            ...option,
            id: option.option_id,
          })),
        })),
      };

      console.log('= = PAYLOAD = =', payload);
      try {
        const {
          data: { data },
        } = await API.patch(`items/${itemDetail.id}`, payload);

        emit('closeAndRefetch');
        console.log('AFTER EDIT', data);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      itemDetail,
      statuses,
      selectedStatus,
      proceed,
    };
  },
};
</script>

<style></style>
