<template>
  <help-modal v-model="visibleDetail">
    <role-detail />
  </help-modal>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="w-full flex justify-between">
      <p class="text-heading2 font-semibold">Role</p>
      <!-- <help-button label="filter" icon="filter" @click="handleModal('filter')" /> -->
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
        <template v-slot:body="{ column, data }">
          <p v-if="column === 'name'" class="font-medium">{{ data }}</p>
          <p v-if="column === 'description'">{{ data }}</p>
          <p
            v-if="column === 'permissions'"
            class="text-royal font-medium cursor-pointer"
            @click="handleModal('detail', data)"
          >
            See Detail
          </p>
          <div v-if="column === 'status'">
            <help-toggle />
          </div>
          <div v-if="column === 'actions'">
            <help-button icon-only icon="edit" @click="handleModal('edit')" />
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
import HelpToggle from '@/components/atoms/Toggle.vue';
import RoleDetail from '@/components/modals/RoleDetail.vue';
import HelpInput from '@/components/atoms/Input.vue';

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
        { field: 'status', label: 'STATUS' },
        { field: 'actions', label: '', align: 'center' },
      ],
      rolesPagination: {
        limit: 10,
        offset: 0,
      },
      loading: false,
      visibleDetail: false,
      visibleEdit: false,
      filterModal: false,
    };
  },
  components: {
    HelpTable,
    HelpButton,
    HelpToggle,
    HelpModal,
    HelpInput,
    RoleDetail,
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
    handleModal(params, data) {
      switch (params) {
        case 'detail':
          console.log(data, 'data detail');
          this.$store.commit('SET_PERMISSIONS', data);
          this.visibleDetail = true;
          break;
        default:
          // this.visibleDetail = true;
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
