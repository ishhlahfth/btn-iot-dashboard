<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6 grid-cols-3 inner-modal-auto modal-lg">
    <div class="grid gap-y-2">
      <div>
        <p class="text-grey-2 font-medium">Role Name</p>
        <p>Admin</p>
      </div>
      <div>
        <p class="text-grey-2 font-medium">Description</p>
        <p>Allowed to access anything exept role management</p>
      </div>
    </div>
    <div class="col-span-2">
      <p class="text-grey-2 font-medium">Permission</p>
      <help-table :footer="false" :columns="columns" :rows="permissions" />
    </div>
  </div>
</template>

<script>
import HelpTable from '@/components/templates/Table.vue';

export default {
  name: 'RolesDetail',
  data() {
    return {
      columns: [
        { field: 'name', label: 'MENU' },
        { field: 'view', label: 'VIEW' },
        { field: 'create', label: 'CREATE' },
        { field: 'edit', label: 'EDIT' },
        { field: 'delete', label: 'DELETE' },
      ],
    };
  },
  props: ['descriptions'],
  components: {
    HelpTable,
  },
  mounted() {
    console.log(this.props, 'props');
  },
  computed: {
    permissions() {
      return this.$store.state.permissions;
    },
  },
};
</script>

<style></style>
