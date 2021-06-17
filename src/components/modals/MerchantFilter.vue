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
      @submit.prevent="$emit('apply', { verificationStatus: selectedStatus.value })"
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
import { ref } from 'vue';

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
  setup() {
    const pickedStart = ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    const pickedEnd = ref(new Date());
    return {
      pickedStart,
      pickedEnd,
    };
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
      date: {
        start: ref(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)),
        end: ref(new Date()),
      },
      selectedStart: '',
      selectedEnd: '',
      config: {
        wrap: true,
        locale: 'ID',
        disableMobile: 'true',
      },
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
