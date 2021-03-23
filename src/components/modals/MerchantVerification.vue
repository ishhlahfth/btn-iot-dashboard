<template>
  <help-modal v-model="confirmation">
    <div class="grid gap-6 p-1 inner-modal-auto modal-md">
      <p class="text-heading4 font-semibold">Verify a merchant</p>
      <form @submit.prevent="proceed" class="grid gap-4">
        <div class="w-full">
          <help-select
            label="Verify status to"
            :options="['SUCCESS', 'FAIL', 'SUSPEND']"
            v-model="selectedStatus"
          />
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
  </help-modal>
  <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Verification Status</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Seller</p>
        <p>{{ verificationDetail.name }}</p>
      </div>
      <div>
        <p class="text-grey-2">Status</p>
        <p>{{ verificationDetail.verify_status }}</p>
      </div>
      <div>
        <p class="text-grey-2">ID No. (KTP)</p>
        <p>-</p>
      </div>
      <div>
        <p class="text-grey-2">Cause of Failure</p>
        <p>{{ verificationDetail.verify_reason || '-' }}</p>
      </div>
      <div class="col-span-2">
        <p class="text-grey-2">ID Card</p>
        <help-thumbnail width="100%" :height="screenWidth < 640 ? 196 : 248" />
      </div>
    </div>
    <div class="flex flex-col sm:flex-row-reverse">
      <help-button @click="confirmation = true" label="verify" class="mb-2 sm:mb-0" />
    </div>
  </div>
</template>

<script>
import { inject, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpInput,
    HelpModal,
    HelpSelect,
    HelpThumbnail,
  },
  emits: ['close'],
  setup(_, { emit }) {
    const {
      state: {
        screenWidth,
        modalState: { verificationDetail },
      },
    } = inject('store');

    const confirmation = ref(false);

    const selectedStatus = ref('SUCCESS');
    const failureReason = ref('');

    const proceed = async () => {
      const payload = {
        verify_status: selectedStatus.value,
        verify_reason:
          selectedStatus.value === 'SUSPEND'
            ? 'Harap menghubungi customer service'
            : failureReason.value,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`merchants/${verificationDetail.id}`, payload);

        emit('close', true);
        console.log('AFTER VERIFY', data);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      screenWidth,
      verificationDetail,
      confirmation,
      selectedStatus,
      failureReason,
      proceed,
    };
  },
};
</script>

<style></style>
