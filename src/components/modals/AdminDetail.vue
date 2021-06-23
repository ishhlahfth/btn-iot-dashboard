<template>
  <div class="grid grid-flow-rows sm:gap-6 gap-4 modal-md sm:p-6 p-2 mb-4 sm:mb-0">
    <div class="flex justify-center pb-6">
      <help-avatar
        :size="160"
        :src="photo"
      />
    </div>
    <div class="grid sm:grid-cols-2 grid-flow-row gap-4 sm:gap-0">
      <div>
        <p class="font-medium text-grey-2">Name</p>
        <p class="font-medium">{{ name }}</p>
      </div>
      <div>
        <p class="font-medium text-grey-2">Email</p>
        <p class="font-medium">{{ email }}</p>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div>
        <p class="font-medium text-grey-2">Role</p>
        <p class="font-medium">{{ role }}</p>
      </div>
      <div>
        <p class="font-medium text-grey-2">Phone Number</p>
        <p class="font-medium">{{ phone_number }}</p>
      </div>
    </div>
    <div>
      <p class="font-medium text-grey-2">Address</p>
      <p class="font-medium">
        {{ address }}
      </p>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '@/components/atoms/Avatar.vue';
import API from '../../apis';

export default {
  name: 'AdminDetail',
  data() {
    return {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      role: '',
      photo: '',
    };
  },
  components: {
    HelpAvatar,
  },
  methods: {
    async getProfilePicture(id) {
      try {
        const {
          data: { data },
        } = await API.get(`/employees/${id}`);
        if (data.banner?.location) {
          this.photo = data.banner.location;
        }
        console.log(data, 'ini data');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
  },
  mounted() {
    this.name = this.$store.state.adminDetail.name || '';
    this.email = this.$store.state.adminDetail.email || '';
    this.phone_number = this.$store.state.adminDetail.phone_number || '';
    this.address = this.$store.state.adminDetail.address || '';
    this.role = this.$store.state.adminDetail.role || '';
    this.getProfilePicture(this.$store.state.adminDetail.id);
  },
};
</script>

<style></style>
