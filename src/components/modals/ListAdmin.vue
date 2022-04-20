<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">List Admin</p>
    </div>
    <div class="md:col-span-8 grid template-rows-auto-1fr overflow-y-auto max-h-30">
        <div>
         <table class=" table-auto w-full">
           <tbody class="">
              <tr class="divide-y align-middle" v-for="(item) in admins" :key="item">
                <td class="p-2 flex flex-row">
                  <help-avatar
                  :src="item.banner.location"
                  :placeholder="item.profile.name"
                  :size="32"
                  />
                  <p class="p-1 pl-3 ">{{ item.profile.name }}</p>
                </td>
                <hr>
              </tr>
              <tr v-if="admins.length < 1"  class="divide-y align-middle">
                <p class="align-center">No User Listed</p>
              </tr>
           </tbody>
         </table>
        </div>
      </div>

  </div>
</template>

<script>
// import HelpButton from '@/components/atoms/Button.vue';
import HelpAvatar from '@/components/atoms/Avatar.vue';
import mixin from '@/mixin';
import store from '@/store';

export default {
  name: 'ListAdmin',
  mixins: [mixin],
  components: {
    // HelpButton,
    HelpAvatar,
  },
  setup() {
    return {};
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      columns: [
        { field: 'avatar', label: 'AVATAR' },
        { field: 'name', label: 'NAME' },
      ],
      config: {
        wrap: true,
        locale: 'ID',
        disableMobile: 'true',
      },
      loading: false,
      admins: [],
    };
  },
  computed: {
    screenWidth() {
      return store.state.screenWidth;
    },
    roleAdmin() {
      return store.state.roleAdmin;
    },
  },
  mounted() {
    this.admins = this.roleAdmin;
  },
};
</script>

<style></style>
