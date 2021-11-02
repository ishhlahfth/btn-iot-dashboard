<template>
  <div class="modal-lg inner-modal-auto">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">
        {{ roleType === 'edit' ? 'Edit a role' : 'Add a new role' }}
      </p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>

    <form @submit.prevent="submit">
      <div class="grid gap-4 sm:grid-flow-col grid-rows-12 sm:grid-cols-12 my-4">
        <div class="sm:col-span-5 sm:block col-span-12 grid gap-2">
          <div>
            <help-input
              label="Role Name"
              placeholder="Type a name that represents this role"
              v-model="roleName"
            />
          </div>
          <div class="mt-4">
            <help-input
              label="Description"
              placeholder="Describe this role's ability"
              v-model="description"
            />
          </div>
        </div>

        <div class="sm:col-span-7 col-span-12 grid-row-max grid">
          <p class="font-medium mb-1">Permission</p>
          <div
            :class="[
              'overflow-auto',
              {
                'overflow-y-auto': screenWidth < 640,
              },
              {
                'h-64': screenWidth < 640,
              },
              {
                'h-80': screenWidth >= 640,
              },
            ]"
          >
            <help-table
              :footer="false"
              :columns="columns"
              :rows="permissions"
              :loading="loading.permissions"
            >
              <template v-slot:body="{ column, data, row, loading }">
                <div v-if="loading" class="rounded h-4 bg-grey-4 animate-pulse"></div>
                <div v-else>
                  <p v-if="column === 'name'">{{ data }}</p>
                  <div v-else>
                    <help-checkbox
                      v-model="row.isTrue"
                      :checked="row.isTrue"
                      @click="handleChangeAccess({ row, status: $event.target.checked })"
                    />
                  </div>
                </div>
              </template>
            </help-table>
          </div>
        </div>
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button
          :label="roleType === 'edit' ? 'save' : 'add'"
          :loading="roleType === 'edit' ? loading.editRole : loading.addRole"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';

import API from '@/apis';

export default {
  name: 'RoleAdd',
  components: {
    HelpInput,
    HelpButton,
    HelpTable,
    HelpCheckbox,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      columns: [
        { field: 'name', label: 'MENU' },
        { field: 'access', label: 'ACCESS', align: 'center' },
      ],
      roleName: '',
      description: '',
      loading: {
        permissions: false,
        addRole: false,
        editRole: false,
      },
      permissions: [],
      access: [],
      roleBody: {
        permission: [],
        group: '',
      },
      is_active: false,
    };
  },
  mounted() {
    this.roleName = this.$store.state.role.name;
    this.description = this.$store.state.role.description;
    if (this.$store.state.role.permissions) {
      this.access = this.$store.state.role.permissions.map((el) => el.id);
    }
    this.is_active = this.$store.state.role.is_active;
    if (this.roleType === 'edit') {
      this.$store.state.role.permissions.forEach((el) => {
        this.roleBody.permission.push(String(el.id));
      });
    }
    this.getPermissions();
  },
  methods: {
    async getPermissions() {
      this.loading.permissions = true;
      try {
        const {
          data: { data },
        } = await API.get('/permissions');
        this.permissions = this.roleType !== 'edit' ? data : this.filterAccess(data);
        this.permissions = this.permissions.map((el) => ({
          ...el,
          isTrue: this.access.includes(el.id),
        }));
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading.permissions = false;
    },
    filterAccess(data) {
      return data.map((el) => ({
        ...el,
        access: this.flagging(el),
      }));
    },
    flagging(row) {
      let checked = this.$store.state.permissions.filter((e) => row.id === e.id);
      if (checked.length && checked.length > 0) {
        checked = true;
      } else {
        checked = false;
      }
      return checked;
    },
    submit() {
      const dataPermissionsToSend = [];
      this.permissions.forEach((el) => {
        if (el.isTrue) {
          dataPermissionsToSend.push(`${el.id}`);
        }
      });
      if (this.roleType === 'edit') this.edit(dataPermissionsToSend);
      if (this.roleType === 'add') this.add(dataPermissionsToSend);
    },
    handleChangeAccess({ row, status }) {
      this.permissions = this.permissions.map((el) => ({
        ...el,
        isTrue: el.id === row.id ? status : el.isTrue,
      }));
      row.isTrue = status;
    },
    async add(dataPermissionsToSend) {
      const body = {
        name: this.roleName,
        description: this.description,
        permission: dataPermissionsToSend,
        group: 'INTERNAL_DASHBOARD',
        is_active: 'TRUE',
      };
      this.loading.addRole = true;
      try {
        const {
          data: { data },
        } = await API.post('/roles', body);
        this.toast.success(`${data.name || 'New role'} successfully created`);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading.addRole = false;
      this.$emit('close');
      this.$emit('refetch');
    },
    async edit(dataPermissionsToSend) {
      const body = {
        name: this.roleName,
        description: this.description,
        permission: dataPermissionsToSend,
        group: 'INTERNAL_DASHBOARD',
        is_active: this.is_active ? 'TRUE' : 'FALSE',
      };
      this.loading.addRole = true;
      try {
        const {
          data: { data },
        } = await API.patch(`/roles/${this.$store.state.role.id}`, body);
        this.toast.success(`${data.name || 'role'} successfully edited`);
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.loading.addRole = false;
      this.$emit('close');
      this.$emit('refetch');
    },
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    roleType() {
      return this.$store.state.roleType;
    },
  },
};
</script>

<style>
.template-rows-auto-1fr {
  grid-template-rows: auto 1fr;
}
</style>
