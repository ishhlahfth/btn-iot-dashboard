<template>
  <help-modal v-model="detailModal">
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Admin</p>
      <help-button label="filter" />
    </div>
    <div>
      <help-input v-model="searchValue" placeholder="Search admin name here" right-icon="search" />
    </div>
    <div class="overflow-hidden">
      <help-table
        :columns="columns"
        :rows="admins"
        :pagination="adminPagination"
        @onChangePagination="getAdmins($event)"
        @sort="getAdmins($event)"
      >
        <template v-slot="{ column, row }">
          <p v-if="column === 'detail'" class="text-royal font-medium cursor-pointer">
            See Detail
          </p>
          <help-toggle v-if="column === 'status'" v-model="row.status" />
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
// import axios from 'axios';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';

// = = DUMMY = =
import { admin as dummyAdmin } from '../../dummy.json';
// = = DUMMY = =

export default {
  name: 'Admin',
  components: {
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    HelpToggle,
  },
  setup() {
    // const store = inject('store');
    const searchValue = ref('');
    const columns = [
      { field: 'name', label: 'name', sortable: true },
      { field: 'email', label: 'email' },
      { field: 'address', label: 'address' },
      { field: 'phone_number', label: 'phone number' },
      { field: 'role', label: 'role' },
      { field: 'detail', label: 'detail' },
      { field: 'status', label: 'status', align: 'center' },
    ];
    const admins = ref([]);
    const adminPagination = ref({
      totalRows: 0,
      rowLimit: 10,
      page: 1,
      sortBy: 'id',
      order: 'asc',
    });
    const detailModal = ref(false);

    const getAdmins = async (pagination) => {
      // = = REAL = =
      // const limit = pagination.rowLimit || 10;
      // const page = pagination.page || 1;
      // const sort = pagination.sortBy || 'name';
      // const order = pagination.order || 'asc;';
      // = = REAL = =
      try {
        // = = REAL = =
        // const response = await axios.get(
        //   `http://localhost:3000/admin?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
        // );
        // admins.value = response.data
        // = = REAL = =

        // = = DUMMY = =
        admins.value = dummyAdmin;
        // = = DUMMY = =
        adminPagination.value = {
          // = = REAL = =
          // totalRows: +response.headers['x-total-count'],
          // = = REAL = =
          // = = DUMMY = =
          totalRows: dummyAdmin.length,
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
      getAdmins(adminPagination.value);
    });
    return {
      columns,
      admins,
      adminPagination,
      detailModal,
      searchValue,
      getAdmins,
      adminsTooltipText,
    };
  },
};
</script>

<style></style>
