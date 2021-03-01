<template>
  <div
    v-if="!src"
    :style="bannerStyle"
    class="border-2 border-grey-4 border-dashed rounded-md flex flex-col justify-center items-center"
  >
    <icon name="photograph" />
    <p class="text-xsmall font-medium">No Image</p>
  </div>
  <div v-else :style="bannerStyle" class="grid place-items-center">
    <img :src="src" alt="banner" class="rounded" />
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'HelpThumbnail',
  components: {
    Icon,
  },
  props: {
    width: {
      type: Number,
      default: 160,
    },
    height: {
      type: Number,
      default: 90,
    },
    src: {
      type: String,
      default: '',
    },
  },
  computed: {
    bannerStyle() {
      return {
        width: `${this.width.toString()}px`,
        height: `${this.height.toString()}px`,
      };
    },
  },
};
</script>
