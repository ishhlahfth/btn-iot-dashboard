<template>
  <div class="grid gap-6 p-1 inner-modal-auto modal-md">
    <p class="text-heading4 font-semibold">Edit Commission</p>
    <div class="grid sm:grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Merchant Name</p>
        <p>{{ merchantName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p>{{ commissionDetail.formula.value }} %</p>
      </div>
      <div class="sm:col-span-2">
        <form @submit.prevent="proceed" class="grid gap-4">
          <help-input
            label="New Commission"
            label-class="text-grey-2"
            v-model="newCommission"
            placeholder="Type new commission value here"
          />
          <help-button label="save changes" @click="updateCommission" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import API from '@/apis';

export default {
  name: 'Commission',
  components: {
    HelpButton,
    HelpInput,
  },
  emits: ['closeAndRefetch'],
  setup(_, { emit }) {
    const {
      state: {
        modalState: { merchantId, merchantName },
      },
    } = inject('store');

    const commissionDetail = ref({
      formula: { value: 0 },
    });

    const selectedStatus = ref('SUCCESS');
    const newCommission = ref('');

    const getCommission = async () => {
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${merchantId}/bill-formulas`);
        if (data) {
          console.log('RESPONSE', data);
          if (data.length) {
            commissionDetail.value = data.filter((el) => el.order_type_id === 4)[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const updateCommission = async () => {
      const payload = {
        merchant_id: commissionDetail.value.merchant_id,
        order_type_id: commissionDetail.value.order_type_id,
        seq_no: commissionDetail.value.seq_no,
        label: commissionDetail.value.label,
        formula: { type: 'PERCENT', value: +newCommission.value },
        formula_type: commissionDetail.value.formula_type,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`bill-formulas/${commissionDetail.value.id}`, payload);

        emit('closeAndRefetch');
        console.log('UPDATED', data);
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getCommission();
    });

    return {
      merchantName,
      commissionDetail,
      selectedStatus,
      newCommission,
      updateCommission,
    };
  },
};
</script>

<style></style>
