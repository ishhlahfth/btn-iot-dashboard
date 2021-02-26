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

  <template v-for="subMenu in menu.subMenu" :key="subMenu.path">
    <router-link :to="subMenu.path" custom v-slot="{ href, navigate, isActive }">
      <div
        :active="isActive"
        :href="href"
        @click="navigate"
        v-if="!collapsed"
        class="not-selected directly-selectable h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
        :class="{ 'bg-midnight-dark': isActive }"
      >
        <div class="flex items-center whitespace-nowrap select-none">
          <div class="w-6 h-5 flex items-center justify-center mr-2">
            <!-- <icon name="" :size="5" /> -->
          </div>
          <div>
            <p class="font-medium">{{ subMenu.label }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </template>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'HelpNavExpandableItem',
  components: {
    Icon,
  },
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      collapsed: true,
    };
  },
};
</script>

<style></style>
