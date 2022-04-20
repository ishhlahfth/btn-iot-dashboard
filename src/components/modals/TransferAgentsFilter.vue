<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Filter Transfer Agent</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form
      @submit.prevent="$emit('apply', { merchantName, transferStatus: selectedStatus?.value })"
      class="grid gap-4"
    >
      <div class="w-full">
        <help-select
          v-model="selectedStatus"
          label="Verification Status"
          :options="transferStatus"
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
  name: 'TransferAgentFilter',
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
      selectedStatus: { value: '', label: 'All' },
      transferStatus: [
        { value: '', label: 'All' },
        { value: 'SUCCESS', label: 'Sukses' },
        { value: 'PENDING', label: 'Pending' },
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
    this.selectedStatus = this.transferStatus.filter(
      (el) => el.value === this.filter.status,
    )[0];
  },
};
</script>

<style></style>
