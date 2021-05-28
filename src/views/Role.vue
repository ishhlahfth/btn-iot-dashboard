<template>
  <help-modal v-model="modal.detail">
    <role-detail />
  </help-modal>
  <help-modal v-model="modal.add">
    <role-add @close="modal.add = false" @refetch="getRoles({ pagination: rolesPagination })" />
  </help-modal>
  <help-modal v-model="modal.edit" @editable="true">
    <role-add @close="modal.edit = false" @refetch="getRoles({ pagination: rolesPagination })" />
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
          <!-- <div v-if="column === 'admin'">
            <help-avatar />
          </div> -->
          <!-- <div v-if="column === 'status'">
            <help-toggle />
          </div> -->
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

<script>
import HelpTable from '@/components/templates/Table.vue';
import HelpModal from '@/components/templates/Modal.vue';
import HelpButton from '@/components/atoms/Button.vue';
// import HelpToggle from '@/components/atoms/Toggle.vue';
// import HelpAvatar from '@/components/atoms/Avatar.vue';
import RoleDetail from '@/components/modals/RoleDetail.vue';
import RoleAdd from '@/components/modals/RoleAdd.vue';

import API from '../apis';

export default {
  name: 'Role',
  data() {
    return {
      dataRoles: [],
      columns: [
        { field: 'name', label: 'ROLE NAME' },
        { field: 'description', label: 'DESCRIPTIONS' },
        // { field: 'admin', label: 'ADMIN' },
        { field: 'permissions', label: 'PERMISSION' },
        // { field: 'status', label: 'STATUS' },
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
    };
  },
  components: {
    HelpTable,
    HelpButton,
    // HelpToggle,
    HelpModal,
    // HelpAvatar,
    RoleDetail,
    RoleAdd,
  },
  methods: {
    async getRoles({ pagination }) {
      const limit = pagination?.limit || 10;
      const offset = pagination?.offset || 0;
      try {
        const {
          data: { data },
        } = await API.get(`/roles?offset=${offset}&limit=${limit}&group=INTERNAL_DASHBOARD`);
        this.dataRoles = data;
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
  },
  async mounted() {
    this.loading = true;
    await this.getRoles({ pagination: this.rolesPagination });
  },
};
</script>

<style></style>
