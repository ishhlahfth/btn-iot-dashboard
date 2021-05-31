<template>
  <div class="grid sm:gap-6 modal-lg px-1 inner-modal-fixed">
    <div class="grid gap-4 md:grid-flow-col md:grid-cols-12 mb-4">
      <div class="md:col-span-4">
        <div>
          <p class="text-grey-2 font-medium">Role Name</p>
          <p>{{ roleName }}</p>
        </div>
        <div class="mt-4">
          <p class="text-grey-2 font-medium">Description</p>
          <p>{{ description }}</p>
        </div>
      </div>
      <div class="md:col-span-8 grid template-rows-auto-1fr">
        <p class="text-grey-2 font-medium mb-1">Permission</p>
        <div class="overflow-hidden">
          <help-table
            :footer="false"
            :columns="columns"
            :rows="permissions"
            :height="screenWidth < 640 ? 80 : 100"
            :loading="loading"
          >
            <template v-slot:body="{ column, data }">
              <div>
                <p v-if="column === 'name'">{{ data }}</p>
                <div v-else>
                  <help-checkbox :checked="data" :disabled="true" />
                </div>
              </div>
            </template>
          </help-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';

import API from '../../apis';

export default {
  name: 'RoleDetail',
  data() {
    return {
      columns: [
        { field: 'name', label: 'MENU' },
        { field: 'access', label: 'ACCESS', align: 'center' },
      ],
      roleName: '',
      description: '',
      loading: false,
      access: [],
      permissions: [],
    };
  },
  components: {
    HelpTable,
    HelpCheckbox,
  },
  mounted() {
    this.roleName = this.$store.state.role.name;
    this.description = this.$store.state.role.description;
    this.access = this.$store.state.permissions;
    this.getPermissions();
  },
  methods: {
    async getPermissions() {
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get('/permissions');
        this.permissions = data.map((el) => ({
          ...el,
          access: this.flagging(el),
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
    flagging(row) {
      let checked = this.$store.state.permissions.filter((e) => row.id === e.id);
      if (checked.length && checked.length > 0) {
        checked = true;
      } else {
        checked = false;
      }
      return checked;
    },
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
};
</script>

<style>
.template-rows-auto-1fr {
  grid-template-rows: auto 1fr;
}
</style>
