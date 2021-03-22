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
import { onMounted, ref } from 'vue';
// import axios from 'axios';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpTooltip from '@/components/atoms/Tooltip.vue';
import MerchantDetail from '@/components/modals/MerchantDetail.vue';

// = = DUMMY = =
import { role as dummyRole } from '../../dummy.json';
// = = DUMMY = =

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
  setup() {
    // const store = inject('store');
    const searchValue = ref('');
    const columns = [
      { field: 'name', label: 'role name', sortable: true },
      { field: 'description', label: 'description' },
      { field: 'admins', label: 'admins' },
      {
        field: 'permissions',
        label: 'permission',
        align: 'center',
      },
      { field: 'is_active', label: 'status', align: 'center' },
    ];
    const roles = ref([]);
    const rolePagination = ref({
      totalRows: 0,
      rowLimit: 10,
      page: 1,
      sortBy: 'id',
      order: 'asc',
    });
    const detailModal = ref(false);

    const getRoles = async (pagination) => {
      // = = REAL = =
      // const limit = pagination.rowLimit || 10;
      // const page = pagination.page || 1;
      // const sort = pagination.sortBy || 'name';
      // const order = pagination.order || 'asc;';
      // = = REAL = =
      try {
        // = = REAL = =
        // const response = await axios.get(
        //   `http://localhost:3000/role?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
        // );
        // roles.value = response.data
        // = = REAL = =

        // = = DUMMY = =
        roles.value = dummyRole;
        // = = DUMMY = =
        rolePagination.value = {
          // = = REAL = =
          // totalRows: +response.headers['x-total-count'],
          // = = REAL = =
          // = = DUMMY = =
          totalRows: dummyRole.length,
          // = = DUMMY = =
          rowLimit: pagination.rowLimit,
          page: pagination.page,
          sortBy: pagination.sortBy,
          order: pagination.order,
        };
      } catch (error) {
        console.log(error);
      }
    };

    const adminsTooltipText = (raw) => {
      const names = raw.map((el) => el.name);
      const hidden = names.length - 4;
      if (names.length > 4) {
        return `${names.slice(0, 4).join(', ')} and ${hidden} other${hidden > 1 ? 's' : ''}`;
      }
      return names.join(', ');
    };

    onMounted(() => {
      getRoles(rolePagination.value);
    });
    return {
      columns,
      roles,
      rolePagination,
      detailModal,
      searchValue,
      getRoles,
      adminsTooltipText,
    };
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
