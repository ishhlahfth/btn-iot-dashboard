<template>
  <nav
    class="h-full fixed inset-y-0 left-0 grid gap-2 auto-rows-max bg-midnight z-50 p-2 transition-all duration-200 overflow-hidden"
    :class="mini ? 'w-14' : 'w-64'"
    @mouseover="mini = false"
    @mouseleave="mini = true"
  >
    <template v-for="link in links" :key="link.path">
      <template v-if="!link.subMenu">
        <div
          class="h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
        >
          <div class="flex items-center whitespace-nowrap select-none">
            <div class="w-6 h-5 flex items-center justify-center mr-2">
              <icon :name="link.icon" :size="5" />
            </div>
            <div>
              <p class="font-medium">{{ link.label }}</p>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div
          @click="collapsed = !collapsed"
          class="not-selected h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
        >
          <div class="flex items-center whitespace-nowrap select-none">
            <div class="w-6 h-5 flex items-center justify-center mr-2">
              <icon name="photograph" :size="5" />
            </div>
            <div>
              <p class="font-medium">Parent Menu</p>
            </div>
          </div>
          <div class="w-5 h-5 grid place-items-center">
            <icon
              name="chevron-down"
              :size="5"
              class="transition-all"
              :class="{ rotate: !collapsed }"
            />
          </div>
        </div>

        <transition v-for="subMenu in link.subMenu" :key="subMenu.path" name="slide-fade">
          <div
            v-if="!collapsed"
            class="not-selected directly-selectable h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
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
        </transition>
      </template>
    </template>

    <!-- <div
      class="h-10 w-full rounded-md bg-midnight-dark text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
    >
      <div class="flex items-center whitespace-nowrap select-none">
        <div class="w-6 h-5 flex items-center justify-center mr-2">
          <icon name="home" :size="5" />
        </div>
        <div>
          <p class="font-medium">Selected</p>
        </div>
      </div>
      <div class="w-5 h-5 grid place-items-center">
        <icon name="chevron-down" :size="5" />
      </div>
    </div> -->

    <!-- <div
      @click="collapsed = !collapsed"
      class="not-selected h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
    >
      <div class="flex items-center whitespace-nowrap select-none">
        <div class="w-6 h-5 flex items-center justify-center mr-2">
          <icon name="photograph" :size="5" />
        </div>
        <div>
          <p class="font-medium">Parent Menu</p>
        </div>
      </div>
      <div class="w-5 h-5 grid place-items-center">
        <icon
          name="chevron-down"
          :size="5"
          class="transition-all"
          :class="{ rotate: !collapsed }"
        />
      </div>
    </div>

    <transition name="slide-fade">
      <div
        v-if="!collapsed"
        class="not-selected directly-selectable h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
      >
        <div class="flex items-center whitespace-nowrap select-none">
          <div class="w-6 h-5 flex items-center justify-center mr-2">
            <icon name="" :size="5" />
          </div>
          <div>
            <p class="font-medium">Child Menu</p>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div
        v-if="!collapsed"
        class="not-selected directly-selectable h-10 w-full rounded-md text-white p-2 flex items-center justify-between overflow-hidden cursor-pointer"
      >
        <div class="flex items-center whitespace-nowrap">
          <div class="w-6 h-5 flex items-center justify-center mr-2">
            <icon name="" :size="5" />
          </div>
          <div>
            <p class="font-medium">Child Menu</p>
          </div>
        </div>
      </div>
    </transition> -->
  </nav>
</template>

<script>
import Icon from '../atoms/Icon.vue';

export default {
  name: 'HelpSidebar',
  components: {
    Icon,
  },
  data() {
    return {
      collapsed: true,
      mini: true,
      links: [
        {
          path: '/',
          label: 'Components',
          icon: 'cube',
          subMenu: [
            { path: '/hore', label: 'Molecules', icon: '' },
            { path: '/uwu', label: 'Templates', icon: '' },
          ],
        },
        { path: '/uwu', label: 'Dashboard', icon: 'user' },
        { path: '/nanana', label: 'Templates', icon: 'photograph' },
        { path: '/hore', label: 'Molecules', icon: 'shield' },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  gap: 0.625rem;
}
nav {
  .active-menu {
    @apply bg-midnight-dark;
    div {
      @apply bg-midnight-dark;
    }
  }
  .nav-item {
    &:not(.active-menu) {
      @apply transform;
      @apply transition-transform;
      &:hover {
        @apply translate-x-1;
      }
    }
  }
}
// .not-selected.directly-selectable {
//   @apply translate-x-0;
//   @apply transition-transform;
//   &:hover {
//     @apply translate-x-1;
//   }
// }
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}

// .slide-fade-leave-active {
//   transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
// }

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
// .slide-fade-enter-active,
// .slide-fade-leave-active {
//   // @apply transition-all;
//   // @apply duration-300;
//   // @apply ease-in;
//   transition: all .75s ease;
//   // transition: all 0.3s ease;
// }
// .slide-fade-enter,
// .slide-fade-leave-to {
//   // opacity: 0;
//   // @apply transform;
//   // @apply -translate-y-3;
//   // @apply opacity-0;
//   transform: translateY(-100px);
//   opacity: 0;
// }

.rotate {
  transform: rotate(180deg);
}
</style>
