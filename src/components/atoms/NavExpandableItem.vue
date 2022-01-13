<template>
  <div
    @click="collapsed = !collapsed"
    class="not-selected h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
  >
    <div class="flex items-center whitespace-nowrap select-none">
      <div class="w-6 h-5 flex items-center justify-center mr-2">
        <icon name="photograph" :size="5" />
      </div>
      <div>
        <p class="font-medium">{{ menu.label }}</p>
      </div>
    </div>
    <div class="w-5 h-5 grid place-items-center">
      <icon name="chevron-down" :size="5" class="transition-all" :class="{ rotate: !collapsed }" />
    </div>
  </div>

  <template v-for="(subMenu, i) in menu.subMenu" :key="i">
    <router-link :to="subMenu.path" custom v-slot="{ href, navigate, isActive }">
      <div
        :active="isActive"
        :href="href"
        @click="navigate"
        v-if="!collapsed"
        class="nav-item h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
        :class="{ 'bg-midnight-dark not-selectable': isActive }"
      >
        <div class="flex items-center whitespace-nowrap select-none">
          <div class="w-6 h-5 flex items-center justify-center mr-2"></div>
          <div>
            <p>{{ subMenu.label }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </template>
</template>

<script>
import { RouterLink } from 'vue-router';
import Icon from './Icon.vue';

export default {
  name: 'HelpNavExpandableItem',
  components: {
    Icon,
    RouterLink,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
    miniSidebar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
  watch: {
    miniSidebar() {
      if (this.miniSidebar) this.collapsed = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  &:hover {
    background: rgba($color: #003168, $alpha: .3);
  }
}
.not-selectable {
  &:hover {
    background: rgba($color: #003168, $alpha: 1);
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.rotate {
  transform: rotate(180deg);
}
</style>
