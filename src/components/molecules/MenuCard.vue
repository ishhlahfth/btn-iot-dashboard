<template>
  <div class="grid grid-flow-col gap-x-4 py-2 sm:p-2 menu-card">
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="menu"
      class="w-20 h-20 sm:w-26 sm:h-26 object-cover rounded"
    />
    <div
      v-else
      class="w-20 h-20 sm:w-26 sm:h-26 border-2 border-dashed border-grey-4 rounded grid place-items-center text-small"
    >
      No Image
    </div>
    <div class="flex flex-col justify-between">
      <div class="grid gap-1 sm:gap-2">
        <div class="grid sm:gap-1">
          <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
            <p class="font-medium">{{ name }}</p>
            <help-badge
              :label="availabilityStatus ? 'Available' : 'Unavailable'"
              :color="availabilityStatus ? 'positive' : 'negative'"
            />
          </div>
          <p class="text-small text-grey-3">{{ category }}</p>
        </div>
        <p class="text-small text-grey-2 mb-2 sm-truncate">
          {{ description }}
        </p>
      </div>
      <p class="text-small font-medium">{{ store.methods.convertToRp(price) }}</p>
    </div>
    <div class="hidden h-26 sm:grid grid-flow-col place-items-center gap-2">
      <help-toggle />
      <icon name="chevron-down" class="cursor-pointer" @click="variantOpened = !variantOpened" />
    </div>
  </div>

  <transition name="slide" appear>
    <template v-if="variantOpened">
      <div class="grid text-small divide-y divide-grey-4">
        <template v-for="(variant, i) in variants" :key="i">
          <div class="p-2">
            <p class="mb-2">{{ variant.variant_name }}</p>
            <div class="grid sm:grid-cols-4 text-grey-2">
              <template v-for="(variantItem, i) in variant.variant_items" :key="i">
                <help-checkbox v-if="variant.multiple_choice" :label="variantItem" disabled />
                <help-radio v-else :label="variantItem" disabled />
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
  </transition>
</template>

<script>
import { inject, ref } from 'vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpCheckbox from '@/components/atoms/Checkbox.vue';
import HelpRadio from '@/components/atoms/Radio.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import Icon from '@/components/atoms/Icon.vue';

export default {
  name: 'MenuCard',
  components: {
    HelpBadge,
    HelpCheckbox,
    HelpRadio,
    HelpToggle,
    Icon,
  },
  props: {
    imageUrl: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'Untitled',
    },
    category: {
      type: String,
      default: '-',
    },
    description: {
      type: String,
      default: '-',
    },
    price: {
      type: Number,
      default: 0,
    },
    availabilityStatus: {
      type: Boolean,
      default: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    variants: {
      type: Array,
      default: () => [],
    },
  },
  setup() {
    const store = inject('store');
    const variantOpened = ref(false);
    return { store, variantOpened };
  },
};
</script>

<style lang="scss" scoped>
.sm-truncate {
  @apply truncate;
  @media screen and (min-width: 640px) {
    overflow: initial;
    text-overflow: initial;
    white-space: initial;
  }
}
.menu-card {
  grid-template-columns: auto 1fr;
  @media screen and (min-width: 640px) {
    grid-template-columns: auto 1fr auto auto;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
