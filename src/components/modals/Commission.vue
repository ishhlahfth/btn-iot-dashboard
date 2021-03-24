<template>
  <div class="grid gap-6 p-1 inner-modal-auto modal-sm">
    <p class="text-heading4 font-semibold">Edit Commission</p>
    <form @submit.prevent="proceed" class="grid gap-4">
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p>{{ verificationDetail.name }}%</p>
      </div>
      <help-input
        label="Reason"
        v-if="selectedStatus === 'FAIL'"
        v-model="failureReason"
        placeholder="Type failure reason here"
      />
      <help-button label="proceed" />
    </form>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
// import HelpSelect from '@/components/molecules/Select.vue';
import API from '@/apis';

export default {
  name: 'Commission',
  components: {
    HelpButton,
    HelpInput,
    // HelpSelect,
  },
  emits: ['closeAndRefetch'],
  setup() {
    const {
      state: {
        modalState: { id },
      },
    } = inject('store');

    const commissionDetail = ref(null);

    const selectedStatus = ref('SUCCESS');
    const failureReason = ref('');

    const getCommission = async () => {
      let commission = null;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${id}/bill-formulas`);
        if (data) {
          if (data.length) {
            commissionDetail.value = data.filter((el) => el.order_type_id === 4)[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
      return commission;
    };

    onMounted(() => {
      getCommission();
    });

    // const proceed = async () => {
    //   const payload = {
    //     verify_status: selectedStatus.value,
    //     verify_reason:
    //       selectedStatus.value === 'SUSPEND'
    //         ? 'Harap menghubungi customer service'
    //         : failureReason.value,
    //   };
    //   try {
    //     const {
    //       data: { data },
    //     } = await API.patch(`merchants/${verificationDetail.id}`, payload);

    //     emit('closeAndRefetch');
    //     console.log('AFTER VERIFY', data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    return {
      selectedStatus,
      failureReason,
    };
  },
};
</script>

<style></style>
