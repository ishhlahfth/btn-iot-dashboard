<template>
  <router-link :to="menu.path" custom v-slot="{ href, navigate, isActive }">
    <div
      :active="isActive"
      :href="href"
      @click="navigate"
      class="nav-item h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
      :class="{ 'bg-grey-1 not-selectable': isActive }"
    >
      <div class="flex items-center whitespace-nowrap select-none">
        <div class="w-6 h-5 flex items-center justify-center mr-2">
          <icon :name="menu.icon" :size="5" />
        </div>
        <div>
          <p class="font-medium">{{ menu.label }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';
import Icon from './Icon.vue';

export default {
  name: 'HelpNavItem',
  components: {
    Icon,
    RouterLink,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  &:hover {
    background: rgba($color: #a1a1a1, $alpha: .3);
  }
}
.not-selectable {
  &:hover {
    background: rgba($color: #a1a1a1, $alpha: 1);
  }
}
</style>
