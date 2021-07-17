<template>
  <help-modal v-model="modal.detail">
    <role-detail />
  </help-modal>
  <help-modal v-model="modal.add">
    <role-add @close="getRoles({ pagination: rolesPagination, modal: 'add' })" />
  </help-modal>
  <help-modal v-model="modal.edit" @editable="true">
    <role-add @close="getRoles({ pagination: rolesPagination, modal: 'edit' })" />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Role</p>
      <help-button
        label="add"
        icon="plus"
        @click="handleModal({ params: 'add', data: [], row: {} })"
      />
    </div>
    <div class="overflow-hidden">
      <help-table
        path="roles"
        :columns="columns"
        :rows="dataRoles"
        :loading="loading"
        :pagination="rolesPagination"
        @onChangePagination="getRoles({ pagination: $event })"
        @sort="getRoles({ pagination: $event })"
      >
        <template v-slot:body="{ column, data, row }">
          <p v-if="column === 'name'" class="font-medium">{{ data }}</p>
          <p v-if="column === 'description'">{{ data }}</p>
          <p
            v-if="column === 'permissions'"
            class="text-royal font-medium cursor-pointer"
            @click="handleModal({ params: 'detail', data, row })"
          >
            See Detail
          </p>
          <div v-if="column === 'admin'">
            <div class="w-full flex gap-1">
              <div v-for="(item, index) in employee[`${row.name}`]" :key="item">
                <help-avatar
                  class="has-tooltip"
                  v-if="index < max_employee"
                  :src="item.banner.location"
                  :placeholder="item.profile.name"
                  :size="32"
                >
                  <span class="tooltip rounded shadow-lg p-1 bg-white-100 text-blue-500 -mt-8"
                    >{{ item.profile.name }}</span
                  >
                </help-avatar>
              </div>
              <div v-if="employee[`${row.name}`].length > max_employee - 1">
                <div
                  v-if="employee[`${row.name}`].length - max_employee != 0"
                  class="border-solid border-2 border-light-blue-500 p-1 bg-white"
                >
                  <p class="font-small">+ {{ employee[`${row.name}`].length - max_employee }}</p>
                </div>
              </div>
            </div>
            <div></div>
          </div>
          <div v-if="column === 'is_active'">
            <help-toggle :modelValue="is_active[`${row.name}`]" @change="handleActiveRole(row)" />
          </div>
          <div v-if="column === 'actions'">
            <help-button
              icon-only
              icon="edit"
              @click="handleModal({ params: 'edit', data: row.permissions, row })"
            />
          </div>
        </template>
      </help-table>
    </div>
  </div>
</template>
<style>
.tooltip {
  @apply invisible absolute;
}
.has-tooltip:hover .tooltip {
  @apply visible z-50;
}
</style>

<script>
import HelpTable from '@/components/templates/Table.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import RoleDetail from '@/components/modals/RoleDetail.vue';
import RoleAdd from '@/components/modals/RoleAdd.vue';

import { useToast } from 'vue-toastification';
import API from '../apis';

export default {
  name: 'Role',
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      dataRoles: [],
      columns: [
        { field: 'name', label: 'ROLE NAME' },
        { field: 'description', label: 'DESCRIPTIONS' },
        { field: 'admin', label: 'ADMIN' },
        { field: 'permissions', label: 'PERMISSION' },
        { field: 'is_active', label: 'STATUS' },
        { field: 'actions', label: '', align: 'center' },
      ],
      rolesPagination: {
        limit: 10,
        offset: 0,
      },
      loading: false,
      modal: {
        detail: false,
        add: false,
        edit: false,
      },
      filterModal: false,
      is_active: {},
      employee: [],
      max_employee: 4,
    };
  },
  components: {
    HelpTable,
    HelpButton,
    HelpToggle,
    HelpModal,
    HelpAvatar,
    RoleDetail,
    RoleAdd,
  },
  methods: {
    async getRoles({ pagination, modal }) {
      if (modal) {
        switch (modal) {
          case 'add':
            this.modal.add = false;
            break;
          default:
            this.modal.edit = false;
            break;
        }
      }
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      this.loading = true;
      this.rolesPagination = {
        limit,
        offset,
      };
      try {
        const {
          data: { data },
        } = await API.get(`/roles?offset=${offset}&limit=${limit}&group=INTERNAL_DASHBOARD`);
        this.dataRoles = data;
        data.forEach((el) => {
          this.is_active[`${el.name}`] = el.is_active;
          this.employee[`${el.name}`] = el.employee;
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
    handleModal({ params, data, row }) {
      this.$store.commit('SET_PERMISSIONS', data);
      this.$store.commit('SET_ROLE_TYPE', params);
      this.$store.commit('SET_ROLE', row);
      switch (params) {
        case 'detail':
          this.modal.detail = true;
          break;
        case 'edit':
          this.modal.edit = true;
          break;
        default:
          this.modal.add = true;
          break;
      }
    },
    async handleActiveRole(row) {
      this.is_active[`${row.name}`] = !this.is_active[`${row.name}`];
      row.is_active = this.is_active[`${row.name}`] && this.is_active[`${row.name}`] === true ? 'TRUE' : 'FALSE';
      const payload = {
        name: row.name,
        description: row.description,
        permission: row.permissions.map((el) => `${el.id}`),
        group: row.group,
        is_active: row.is_active,
      };
      try {
        const {
          data: { data },
        } = await API.patch(`/roles/${row.id}`, payload);
        console.log('success', data);
        this.toast.success(
          `Success ${data.is_active === true ? 'enable' : 'disable'} role status !`,
        );
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.getRoles({ pagination: this.rolesPagination });
    },
  },
  async mounted() {
    this.loading = true;
    await this.getRoles({ pagination: this.rolesPagination });
  },
};
</script>

<style></style>
