<template>
  <div class="grid gap-6 inner-modal-auto modal-sm">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">
        {{
          verifDetail.verify_status === 'Pending Verifikasi' ? 'Verify a merchant' : 'Edit status'
        }}
      </p>
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
          v-model="selectedStatus"
          :label="
            verifDetail.verify_status === 'Pending Verifikasi'
              ? 'Verify status to'
              : 'Edit status to'
          "
          :options="statuses"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
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
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import API from '@/apis';
import { useToast } from 'vue-toastification';

export default {
  name: 'MerchantVerificationOption',
  components: {
    HelpButton,
    HelpInput,
    HelpSelect,
  },
  emits: ['close', 'closeAndRefetch'],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      selectedStatus: { value: 'SUCCESS', label: 'Terverifikasi' },
      statuses: [
        { value: 'SUCCESS', label: 'Terverifikasi' },
        { value: 'FAIL', label: 'Verifikasi Gagal' },
        { value: 'SUSPEND', label: 'Akun Disabled' },
      ],
      failureReason: '',
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    verifDetail() {
      return this.$store.state.verifDetail;
    },
  },
  methods: {
    async proceed() {
      const payload = {
        verify_status: this.selectedStatus.value,
        verify_reason:
          this.selectedStatus.value === 'SUSPEND'
            ? 'Harap menghubungi customer service'
            : this.failureReason,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`merchants/${this.verifDetail.id}`, payload);

        this.$emit('closeAndRefetch');
        this.toast.success(`Successully updated ${data.name}`);
      } catch (error) {
        this.toast.error(error);
        console.log(error);
      }
    },
  },
  // mounted() {
  //   console.log('🌛', this.verifDetail);
  //   this.selectedStatus = this.statuses.filter((el) => el.label === this.verifDetail.verify_status)[0];
  // },
};
</script>

<style></style>
