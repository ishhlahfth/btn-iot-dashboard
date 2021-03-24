<template>
  <div class="grid gap-6 p-1 inner-modal-auto modal-sm">
    <p class="text-heading4 font-semibold">Verify a merchant</p>
    <form @submit.prevent="proceed" class="grid gap-4">
      <div class="w-full">
        <help-select label="Verify status to" :options="statuses" v-model="selectedStatus" />
      </div>
      <help-input
        label="Reason"
        v-if="selectedStatus.value === 'FAIL'"
        v-model="failureReason"
        placeholder="Type failure reason here"
      />
      <help-button label="proceed" />
    </form>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpInput,
    HelpSelect,
  },
  emits: ['closeAndRefetch'],
  setup(_, { emit }) {
    const {
      state: {
        modalState: { verificationDetail },
      },
    } = inject('store');

    const statuses = [
      { value: 'SUCCESS', label: 'Terverifikasi' },
      { value: 'FAIL', label: 'Verifikasi Gagal' },
      { value: 'SUSPEND', label: 'Akun Disabled' },
    ];
    const selectedStatus = ref({ value: 'SUCCESS', label: 'Terverifikasi' });
    const failureReason = ref('');

    const proceed = async () => {
      const payload = {
        verify_status: selectedStatus.value.value,
        verify_reason:
          selectedStatus.value.value === 'SUSPEND'
            ? 'Harap menghubungi customer service'
            : failureReason.value,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`merchants/${verificationDetail.id}`, payload);

        emit('closeAndRefetch');
        console.log('AFTER VERIFY', data);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      verificationDetail,
      statuses,
      selectedStatus,
      failureReason,
      proceed,
    };
  },
};
</script>

<style></style>
