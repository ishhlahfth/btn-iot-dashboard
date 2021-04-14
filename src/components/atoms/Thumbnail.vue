<template>
  <div
    v-if="!src"
    :style="bannerStyle"
    class="border-2 border-grey-4 border-dashed rounded-md flex flex-col justify-center items-center"
  >
    <icon name="photograph" />
    <p class="text-xsmall font-medium">No Image</p>
    <slot></slot>
  </div>
  <div v-else :style="bannerStyle" class="grid place-items-center rounded">
    <img v-if="!useBg" :src="src" alt="banner" class="rounded object-cover" />
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
      type: [Number, String],
      default: 160,
    },
    height: {
      type: [Number, String],
      default: 90,
    },
    src: {
      type: String,
      default: '',
    },
    useBg: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    bannerStyle() {
      return {
        width: typeof this.width === 'string' ? this.width : `${this.width.toString()}px`,
        height: typeof this.height === 'string' ? this.height : `${this.height.toString()}px`,
        'background-image': this.useBg ? `url(${this.src})` : 'none',
        'background-position': this.useBg ? 'center' : 'none',
        'background-size': this.useBg ? 'cover' : 'none',
      };
    },
  },
};
</script>
