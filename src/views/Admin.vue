<template>
  <help-modal v-model="addModal">
    <admin-add-edit
      @close="handleClose"
      @reload="generateFetchData"
      adminType="add"
      :roles="selectRoles"
    />
  </help-modal>
  <help-modal v-model="editModal">
    <admin-add-edit
      @close="handleClose"
      @reload="generateFetchData"
      adminType="edit"
      :roles="selectRoles"
    />
  </help-modal>
  <help-modal v-model="detailModal">
    <admin-detail />
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
        <template v-slot:body="{ data, column, row }">
          <p
            v-if="column === 'detail'"
            class="text-royal font-medium cursor-pointer"
            @click="handleDetail(row, 'detail')"
          >
            See Detail
          </p>
          <p v-if="column === 'phone_number'">{{ generatePhoneNumber(data) }}</p>
          <p v-if="column === 'role'">{{ generateRoleName(row) }}</p>
          <div v-if="column === 'actions'">
            <help-button icon-only icon="edit" @click="handleDetail(row, 'edit')" />
          </div>
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
import AdminDetail from '@/components/modals/AdminDetail.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import API from '@/apis';

export default {
  name: 'Admin',
  mixins: [mixin],
  components: {
    HelpButton,
    // HelpInput,
    HelpModal,
    HelpTable,
    AdminAddEdit,
    AdminDetail,
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
        { field: 'address', label: 'address' },
        { field: 'phone_number', label: 'phone number' },
        { field: 'role', label: 'role' },
        { field: 'detail', label: 'detail' },
        // { field: 'status', label: 'status', align: 'center' },
        { field: 'actions', label: '', align: 'center' },
      ],
      admins: [],
      roles: [],
      selectRoles: [],
      admin: {},
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
    async getRoles() {
      try {
        const {
          data: { data },
        } = await API.get('/roles?offset=0&limit=10&group=INTERNAL_DASHBOARD');
        this.roles = data.map((el) => ({
          id: el.id,
          name: el.name,
        }));
        this.selectRoles = data.map((el) => ({
          value: el.id,
          label: el.name,
        }));
        console.log(this.roles, 'roles');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async getAdmins(pagination) {
      console.log(pagination, 'pagination');
      const limit = pagination.limit || 10;
      const offset = pagination.offset || 0;
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(`employees?offset=${offset}&limit=${limit}&group=INTERNAL_DASHBOARD`);
        this.admins = data.map((el) => ({
          ...el,
          name: el.profile.name,
          email: el.profile.email,
          role: el.id || '',
          phone_number: el.profile.phone_number,
          address: el.profile.address,
        }));
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
      if (this.addModal) {
        this.addModal = false;
      } else {
        this.editModal = false;
      }
    },
    generateRoleName(row) {
      const filtered = this.roles.filter((el) => el.id === row.role_id);
      return filtered.length ? filtered[0].name : '';
    },
    handleDetail(row, params) {
      if (params === 'edit') {
        this.editModal = true;
      } else {
        this.detailModal = true;
      }
      row.role = this.generateRoleName(row);
      this.$store.commit('SET_ADMIN_DETAIL', row);
    },
    async generateFetchData() {
      await this.getAdmins(this.adminPagination);
      await this.getRoles();
    },
  },
  mounted() {
    this.generateFetchData();
  },
};
</script>

<style></style>
