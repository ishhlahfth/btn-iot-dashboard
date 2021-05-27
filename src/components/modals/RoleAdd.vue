<template>
  <div
    class="grid gap-6 modal-lg overflow-auto px-1"
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
            :loading="loading"
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
        <help-button :label="roleType === 'edit' ? 'save' : 'add'" />
      </div>
    </form>
  </div>
</template>

<script>
import HelpInput from '@/components/atoms/Input.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpTable from '@/components/templates/Table.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';

import API from '../../apis';

export default {
  name: 'RoleAdd',
  components: {
    HelpInput,
    HelpButton,
    HelpTable,
    HelpCheckbox,
  },
  data() {
    return {
      columns: [
        { field: 'name', label: 'MENU' },
        { field: 'access', label: 'ACCESS' },
      ],
      roleName: '',
      description: '',
      loading: false,
      permissions: [],
      access: [],
      roleBody: {
        permission: [],
        group: '',
        merchant_id: 0,
      },
    };
  },
  mounted() {
    this.roleName = this.$store.state.role.name;
    this.description = this.$store.state.role.description;
    this.access = this.$store.state.role.permissions;
    this.getPermissions();
  },
  methods: {
    async getPermissions() {
      this.loading = true;
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
      this.loading = false;
    },
    filterAccess(data) {
      return data.map((el) => ({
        ...el,
        access: this.access.length && this.access.map((e) => el.id === e.id)[0],
      }));
    },
    submit() {
      if (this.roleType === 'edit') this.edit();
      if (this.roleType === 'add') this.add();
    },
    handleChangeAccess({ row, status }) {
      console.log(row, 'ini row');
      console.log(status, 'ini status');
      this.roleBody.group = row.module;
      this.roleBody.permission.push(String(row.id));
    },
    async add() {
      const body = {
        name: this.roleName,
        description: this.description,
        permission: this.roleBody.permission,
        group: this.roleBody.group,
      };
      try {
        const {
          data: { data },
        } = API.post('/roles', body);
        console.log(data, 'data success kirim');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
      this.$emit('close');
    },
    async edit() {
      const body = {
        name: 'Administrators',
        description: 'Administrator role for internal dashboard ENS',
        permission: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        group: 'INTERNAL_DASHBOARD',
        merchant_id: 2,
      };
      try {
        const {
          data: { data },
        } = API.post('/roles', body);
        console.log(data, 'data success kirim');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
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
