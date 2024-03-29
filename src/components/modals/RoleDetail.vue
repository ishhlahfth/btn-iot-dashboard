<template>
  <div class="grid sm:gap-6 modal-lg px-1 inner-modal-auto">
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
        <div
          :class="[
            {
              'overflow-y-auto': screenWidth < 640,
            },
            {
              'h-64': screenWidth < 640,
            },
            {
              'h-96': screenWidth >= 640,
            },
          ]"
        >
          <help-table
            :footer="false"
            :columns="columns"
            :rows="permissions"
            :height="screenWidth < 640 ? 64 : 96"
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
import { useToast } from 'vue-toastification';
import HelpTable from '@/components/templates/Table.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import API from '@/apis';
import store from '@/store';

export default {
  name: 'RoleDetail',
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
    this.roleName = store.state.role.name;
    this.description = store.state.role.description;
    this.access = store.state.permissions;
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
      let checked = store.state.permissions.filter((e) => row.id === e.id);
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
      return store.state.screenWidth;
    },
  },
};
</script>

<style>
.template-rows-auto-1fr {
  grid-template-rows: auto 1fr;
}
</style>
