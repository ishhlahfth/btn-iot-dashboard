<template>
  <div class="modal-md inner-modal-fixed overflow-auto grid gap-6 p-1">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">
        {{ adminType === 'edit' ? 'Edit a new admin' : 'Add a new admin' }}
      </p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form class="grid gap-4">
      <help-input label="Name" placeholder="Input admin's name" />
      <help-input label="Email" type="email" placeholder="Input admin's email" />
      <help-input label="Phone Number" placeholder="Input admin's phone number" />
      <help-input label="Address" type="textarea" placeholder="Input admin's address" />
      <help-input label="Profile Picture" type="file" placeholder="Input admin's address" />
      <help-select
        v-model="selectedStatus"
        label="Role"
        :options="orderStatus"
        :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
      />
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end py-2">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button
          :label="adminType === 'EDIT' ? 'save changes' : 'add'"
          :loading="loading"
          :loading-label="adminType === 'EDIT' ? 'saving' : 'adding'"
        />
      </div>
    </form>
  </div>
</template>

<script>
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';

export default {
  name: 'AdminAddEdit',
  props: {
    adminType: {
      type: String,
      default: 'add',
    },
  },
  data() {
    return {
      loading: false,
      selectedStatus: { value: '', label: 'Select Admin Role' },
      orderStatus: [
        { value: 'ADMIN', label: 'Admin' },
        { value: 'SUPER_ADMIN', label: 'Super Admin' },
        { value: 'MARKETING', label: 'Marketing' },
        { value: 'OPERATIONAL', label: 'Operasional' },
        { value: 'MERCHANTS_ACQUISITION', label: 'Merchant Acquisition' },
        { value: 'TECH', label: 'Technology Team' },
      ],
    };
  },
  components: {
    HelpInput,
    HelpButton,
    HelpSelect,
  },
};
</script>

<style></style>
