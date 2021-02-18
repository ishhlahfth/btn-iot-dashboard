<template>
  <div
    v-if="!src"
    :style="avatarStyle"
    class="bg-midnight rounded-full flex flex-col justify-center items-center"
  >
    <p class="text-white text-subheading font-medium">{{ placeholder[0] }}</p>
  </div>
  <div v-else :style="avatarStyle" class="grid place-items-center">
    <img :src="src" alt="avatar" :style="avatarStyle" class="rounded-full object-cover w-full" />
  </div>
</template>

<script>
export default {
  name: 'HelpAvatar',
  props: {
    size: {
      type: Number,
      default: 64,
    },
    src: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    avatarStyle() {
      return {
        width: `${this.size.toString()}px`,
        height: `${this.size.toString()}px`,
      };
    },
  },
};
</script>

<style></style>
