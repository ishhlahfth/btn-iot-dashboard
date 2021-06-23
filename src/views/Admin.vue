<template>
  <help-modal v-model="detailModal"></help-modal>
  <help-modal v-model="addModal">
    <admin-add-edit @close="handleClose" adminType="add" />
  </help-modal>
  <help-modal v-model="editModal">
    <admin-add-edit @close="handleClose" adminType="edit" />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Admin</p>
      <help-button label="add" icon="plus" @click="addModal = true" />
    </div>
    <!-- <div>
      <form @submit.prevent="getAdmins">
        <help-input v-model="searchValue" placeholder="Search admin name here" search-bar />
      </form>
    </div> -->
    <div class="overflow-hidden">
      <help-table
        path="employees"
        :columns="columns"
        :loading="loading"
        :rows="admins"
        :pagination="adminPagination"
        @onChangePagination="getAdmins($event)"
        @sort="getAdmins($event)"
      >
        <template v-slot:body="{ data, column }">
          <p v-if="column === 'detail'" class="text-royal font-medium cursor-pointer">
            See Detail
          </p>
          <div v-if="column === 'actions'">
            <help-button icon-only icon="edit" @click="editModal = true" />
          </div>
          <p v-if="column === 'phone_number'">{{ escapeRegExp(data) }}</p>
          <p v-if="column === 'role'">{{ data }}</p>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
// import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import AdminAddEdit from '@/components/modals/AdminAddEdit.vue';
import { useToast } from 'vue-toastification';
import API from '../apis';

export default {
  name: 'Admin',
  components: {
    HelpButton,
    // HelpInput,
    HelpModal,
    HelpTable,
    AdminAddEdit,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      searchValue: '',
      columns: [
        { field: 'name', label: 'name' },
        { field: 'email', label: 'email' },
        // { field: 'address', label: 'address' },
        { field: 'phone_number', label: 'phone number' },
        { field: 'role', label: 'role' },
        { field: 'detail', label: 'detail' },
        // { field: 'status', label: 'status', align: 'center' },
        { field: 'actions', label: '', align: 'center' },
      ],
      admins: [],
      roles: [],
      adminPagination: {
        limit: 10,
        offset: 0,
      },
      loading: false,
      detailModal: false,
      addModal: false,
      editModal: false,
    };
  },
  methods: {
    getRoles(id) {
      return API.get(`/roles/${id}`);
    },
    async getAdmins(pagination) {
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(`employees?offset=${offset}&limit=${limit}`);
        console.log('- - - -', data);
        this.admins = data.map((el) => ({
          ...el,
          name: el.profile.name,
          email: el.profile.email,
          phone_number: el.profile.phone_number,
          // role: this.getRoles(el.id) || '',
        }));

        this.adminPagination = {
          limit,
          offset,
        };
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    handleClose() {
      this.addModal = false;
      this.editModal = false;
    },
    escapeRegExp(string) {
      const parts = string ? string.match(/.{1,4}/g) : ('000000000000').match(/.{1,4}/g);
      const newValue = parts.join('-');
      return newValue;
    },
  },

  async mounted() {
    await this.getAdmins(this.adminPagination);
  },
  // setup() {
  //   const getAdmins = async (pagination) => {
  //     // = = REAL = =
  //     // const limit = pagination.rowLimit || 10;
  //     // const page = pagination.page || 1;
  //     // const sort = pagination.sortBy || 'name';
  //     // const order = pagination.order || 'asc;';
  //     // = = REAL = =
  //     try {
  //       // = = REAL = =
  //       // const response = await axios.get(
  //       //   `http://localhost:3000/admin?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  //       // );
  //       // admins.value = response.data
  //       // = = REAL = =

  //       // = = DUMMY = =
  //       admins.value = dummyAdmin;
  //       // = = DUMMY = =
  //       adminPagination.value = {
  //         // = = REAL = =
  //         // totalRows: +response.headers['x-total-count'],
  //         // = = REAL = =
  //         // = = DUMMY = =
  //         totalRows: dummyAdmin.length,
  //         // = = DUMMY = =
  //         rowLimit: pagination.rowLimit,
  //         page: pagination.page,
  //         sortBy: pagination.sortBy,
  //         order: pagination.order,
  //       };
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const adminsTooltipText = (raw) => {
  //     const names = raw.map((el) => el.name);
  //     const hidden = names.length - 4;
  //     if (names.length > 4) {
  //       return `${names.slice(0, 4).join(', ')} and ${hidden} other${hidden > 1 ? 's' : ''}`;
  //     }
  //     return names.join(', ');
  //   };

  //   onMounted(() => {
  //     getAdmins(adminPagination.value);
  //   });
  //   return {
  //     columns,
  //     admins,
  //     adminPagination,
  //     detailModal,
  //     searchValue,
  //     getAdmins,
  //     adminsTooltipText,
  //   };
  // },
};
</script>

<style></style>
