<template>
  <div
    class="grid gap-6 modal-lg overflow-auto md:overflow-hidden px-1"
    :class="[screenWidth < 640 ? 'inner-modal-fixed' : 'inner-modal-auto']"
  >
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
      <div class="grid gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
        <div class="md:col-span-5 md:block grid gap-2">
          <input type="file" accept="image/*" class="hidden" ref="bannerImageInput" />
          <div>
            <help-input
              label="Role Name"
              placeholder="Type a name that represents this role"
              v-model="roleName"
            />
          </div>
          <div class="md:mt-4">
            <help-input
              label="Description"
              placeholder="Describe this role's ability"
              v-model="description"
            />
          </div>
        </div>

        <div class="md:col-span-7 md:grid template-rows-auto-1fr-auto">
          <p class="font-medium mb-1">Permission</p>
          <help-table
            :footer="false"
            :columns="columns"
            :rows="permissions"
            :height="screenWidth < 640 ? 64 : 80"
            :loading="loading.permissions"
          >
            <template v-slot:body="{ column, data, row, loading }">
              <div v-if="loading" class="rounded h-4 bg-grey-4 animate-pulse"></div>
              <div v-else>
                <p v-if="column === 'name'">{{ data }}</p>
                <div v-else>
                  <help-checkbox
                    :checked="data"
                    @click="handleChangeAccess({ row, status: $event.target.checked })"
                  />
                </div>
              </div>
            </template>
          </help-table>
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
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';

import { useToast } from 'vue-toastification';
import API from '../../apis';

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
        { field: 'access', label: 'ACCESS' },
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
    };
  },
  mounted() {
    this.roleName = this.$store.state.role.name;
    this.description = this.$store.state.role.description;
    this.access = this.$store.state.role.permissions;
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
      if (this.roleType === 'edit') this.edit();
      if (this.roleType === 'add') this.add();
    },
    handleChangeAccess({ row, status }) {
      console.log(row, 'ini row');
      console.log(status, 'ini status');
      if (status === true) {
        this.roleBody.permission.push(String(row.id));
      } else {
        this.roleBody.permission.splice(
          this.roleBody.permission.findIndex((el) => String(el.id) === String(row.id)),
          1,
        );
      }
    },
    async add() {
      const body = {
        name: this.roleName,
        description: this.description,
        permission: this.roleBody.permission,
        group: 'INTERNAL_DASHBOARD',
      };
      this.loading.addRole = true;
      console.log(body, 'body add');
      try {
        const {
          data: { data },
        } = await API.post('/roles', body);
        this.toast.success('New role successfully created');
        console.log(data, 'data success kirim');
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
    async edit() {
      const body = {
        name: this.roleName,
        description: this.description,
        permission: this.roleBody.permission,
        group: 'INTERNAL_DASHBOARD',
      };
      this.loading.addRole = true;
      console.log(body, 'body edit');
      try {
        const {
          data: { data },
        } = await API.patch(`/roles/${this.$store.state.role.id}`, body);
        console.log(data, 'data success kirim');
        this.toast.success('role successfully edited');
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
    roleType() {
      return this.$store.state.roleType;
    },
  },
};
</script>

<style></style>
