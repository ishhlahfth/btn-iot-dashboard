<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Filter Agent</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form
      @submit.prevent="$emit('apply', { merchantName, verificationStatus: selectedStatus?.value })"
      class="grid gap-4"
    >
      <div class="w-full">
        <help-select
          v-model="selectedStatus"
          label="Verification Status"
          :options="agentStatus"
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
import mixin from '@/mixin';

export default {
  name: 'OrderFilter',
  mixins: [mixin],
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
      agentName: '',
      selectedStatus: { value: '', label: 'All' },
      agentStatus: [
        { value: '', label: 'All' },
        { value: '2', label: 'Terverifikasi' },
        { value: '1', label: 'Pending' },
        { value: '3', label: 'Verifikasi Gagal' },
        { value: '4', label: 'Akun Disabled' },
      ],
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
    this.agentName = this.filter.agentName;
    this.selectedStatus = this.agentStatus.filter(
      (el) => el.value === this.filter.agentStatus,
    )[0];
  },
};
</script>

<style></style>
