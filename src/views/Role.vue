<template>
  <help-modal v-model="detailModal">
    <merchant-detail />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Role</p>
      <help-button label="filter" />
    </div>
    <div>
      <help-input v-model="searchValue" placeholder="Search role name here" right-icon="search" />
    </div>
    <div class="overflow-hidden">
      <help-table
        :columns="columns"
        :rows="roles"
        :pagination="rolePagination"
        @onChangePagination="getRoles($event)"
        @sort="getRoles($event)"
      >
        <template v-slot="{ column, row }">
          <p v-if="column === 'permissions'" class="text-royal font-medium cursor-pointer">
            See Detail
          </p>

          <div v-if="column === 'admins'" class="stacked-avatars">
            <help-tooltip :text="adminsTooltipText(row.admins)">
              <div
                v-for="(admin, i) in row.admins.slice(0, 4)"
                :key="i"
                class="rounded-full ring-2 ring-white"
              >
                <help-avatar :src="admin.img_url" :size="32" :placeholder="admin.name" />
              </div>
            </help-tooltip>
            <p v-if="row.admins.length > 4">{{ `+${row.admins.length - 4}` }}</p>
          </div>

          <help-toggle v-if="column === 'is_active'" v-model="row.is_active" />
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpTooltip from '@/components/atoms/Tooltip.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';

export default {
  name: 'Role',
  components: {
    HelpAvatar,
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
    HelpTooltip,
    MerchantDetail,
  },
};
</script>

<style lang="scss" scoped>
.stacked-avatars {
  display: flex;
  align-items: center;
  div:not(:first-child) {
    margin-left: -10px;
  }
  > p {
    @apply font-medium;
    @apply text-grey-1;
    @apply text-body;
    @apply ml-1;
  }
}
</style>
