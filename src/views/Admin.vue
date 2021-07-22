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
  <help-modal v-model="deleteConfirmation">
    <confirmation
      title="Delete confirmation"
      message="This action cannot be undone. Are you sure you want to delete this user permanently?"
      :confirm-loading="deleteLoading"
      loading-label="deleting"
      @close="deleteConfirmation = false"
      @cancel="deleteConfirmation = false"
      @confirm="deleteUser"
    />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Admin</p>
      <help-button label="add" icon="plus" @click="addModal = true" v-if="adminAccess.create" />
    </div>
    <div>
      <form @submit.prevent="getAdmins">
        <help-input v-model="searchValue" placeholder="Search admin name here" search-bar />
      </form>
    </div>
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
          <p v-if="column === 'address'">{{ data ? truncate(data) : '' }}</p>
          <p v-if="column === 'phone_number'">{{ generatePhoneNumber(data) }}</p>
          <p v-if="column === 'role'">{{ generateRoleName(row) }}</p>
          <div v-if="column === 'is_active'">
            <help-toggle
            :modelValue="is_active[`${row.id}`]"
            @change="handleActiveAdmin(row)"
            />
          </div>
          <div v-if="column === 'actions'" class="grid grid-flow-col gap-1 auto-cols-max">
            <help-button icon-only icon="edit" @click="handleDetail(row, 'edit')" v-if="adminAccess.update" />
            <help-button
            v-if="adminAccess.delete"
            bg-color="flame"
            color="white"
            icon="trash"
            icon-only
            @click="openConfirmation(row.id)" />
          </div>
        </template>
      </help-table>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpTable from '@/components/templates/Table.vue';
import AdminAddEdit from '@/components/modals/AdminAddEdit.vue';
import AdminDetail from '@/components/modals/AdminDetail.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import Confirmation from '@/components/modals/Confirmation.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import API from '@/apis';

export default {
  name: 'Admin',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
    HelpModal,
    HelpTable,
    AdminAddEdit,
    HelpToggle,
    AdminDetail,
    Confirmation,
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
        { field: 'is_active', label: 'status', align: 'center' },
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
      is_active: {},
      addModal: false,
      editModal: false,
      adminAccess: {
        create: false,
        update: false,
        delete: false,
      },
      deleteConfirmation: false,
      deleteLoading: false,
    };
  },
  methods: {
    async getRoles() {
      try {
        const {
          data: { data },
        } = await API.get('/roles?offset=0&limit=100&group=INTERNAL_DASHBOARD');
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
      const search = this.searchValue || '';
      this.adminPagination = {
        limit,
        offset,
      };
      try {
        this.loading = true;
        const {
          data: { data },
        } = await API.get(
          `employees?offset=${offset}&limit=${limit}&group=INTERNAL_DASHBOARD&order=desc&sort=id&search=${search}`,
        );
        this.admins = data.map((el) => ({
          ...el,
          name: el.profile.name,
          email: el.profile.email,
          role: el.id || '',
          phone_number: el.profile.phone_number,
          address: el.profile.address,
          is_active: el.is_active,
        }));
        data.forEach((el) => {
          this.is_active[`${el.id}`] = el.is_active;
        });
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading = false;
    },
    async deleteUser() {
      try {
        this.deleteLoading = true;
        await API.delete(`employees/${this.userId}`);

        this.getAdmins(this.adminPagination);
        this.deleteConfirmation = false;
        this.toast.success('User successfully deleted');
      } catch (error) {
        this.toast.error(error.message);
      }
      this.deleteLoading = false;
    },
    openConfirmation(userId) {
      this.deleteConfirmation = true;
      this.$store.commit('SET_USER_ID', userId);
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
    async handleActiveAdmin(row) {
      this.is_active[`${row.id}`] = !this.is_active[`${row.id}`];
      row.is_active = this.is_active[`${row.id}`] && this.is_active[`${row.id}`] === true ? 'TRUE' : 'FALSE';
      const payload = {
        role_id: row.role_id,
        name: row.profile.name,
        is_active: row.is_active,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`/employees/${row.id}`, payload);
        this.toast.success(
          `Success ${data.is_active === true ? 'enable' : 'disable'} admin status !`,
        );
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async generateFetchData() {
      await this.getAdmins(this.adminPagination);
      await this.getRoles();
    },
  },
  mounted() {
    this.generateFetchData();
    this.$store.state.access.access.permissions.forEach((el) => {
      switch (el.id) {
        case 84:
          this.adminAccess.create = true;
          break;
        case 85:
          this.adminAccess.update = true;
          break;
        case 86:
          this.adminAccess.delete = true;
          break;
        default:
          break;
      }
    });
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
};
</script>

<style></style>
