<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Filter Merchant</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form
      @submit.prevent="$emit('apply', { verificationStatus: selectedStatus })"
      class="grid gap-4"
    >
      <div class="w-full">
        <help-select
          v-model="selectedStatus"
          label="Verification Status"
          :options="statuses"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button label="apply" />
      </div>
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';

export default {
  name: 'MerchantFilter',
  components: {
    HelpButton,
    HelpSelect,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedStatus: { value: '', label: 'All' },
      statuses: [
        { value: '', label: 'All' },
        { value: 'SUCCESS', label: 'Terverifikasi' },
        { value: 'PENDING', label: 'Pending' },
        { value: 'FAIL', label: 'Verifikasi Gagal' },
        { value: 'SUSPEND', label: 'Akun Disabled' },
      ],
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  mounted() {
    this.selectedStatus = this.statuses.filter(
      (el) => el.value === this.filter.verificationStatus,
    )[0];
  },
};
</script>

<style></style>
