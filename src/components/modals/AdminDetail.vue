<template>
  <div class="grid grid-flow-rows gap-6 modal-md p-6">
    <div class="flex justify-center pb-6">
      <help-avatar :size="160" src="https://cdn.pixabay.com/photo/2017/07/19/17/22/test-external-2519783_1280.jpg"/>
    </div>
    <div class="grid grid-cols-2">
      <div>
        <p class="font-medium text-grey-2">Name</p>
        <p class="font-medium">Kiara</p>
      </div>
      <div>
        <p class="font-medium text-grey-2">Email</p>
        <p class="font-medium">Kiaradong@mail</p>
      </div>
    </div>
    <div class="grid grid-cols-2">
      <div>
        <p class="font-medium text-grey-2">Role</p>
        <p class="font-medium">Admin</p>
      </div>
      <div>
        <p class="font-medium text-grey-2">Phone Number</p>
        <p class="font-medium">081271062214</p>
      </div>
    </div>
    <div>
      <p class="font-medium text-grey-2">Address</p>
      <p class="font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident explicabo ut mollitia, omnis voluptatum repudiandae, fugit ipsum voluptates saepe esse quidem quasi dolores, blanditiis ullam neque id earum illo a.</p>
    </div>
  </div>
</template>

<script>
import HelpAvatar from '@/components/atoms/Avatar.vue';

export default {
  name: 'AdminDetail',
  components: {
    HelpAvatar,
  },
};
</script>

<style></style>
