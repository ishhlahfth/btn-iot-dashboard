<template>
  <div class="grid grid-flow-col gap-x-4 p-2" style="grid-template-columns: auto 1fr auto auto;">
    <img v-if="imageUrl" :src="imageUrl" alt="menu" class="w-28 h-28 object-cover rounded" />
    <div
      v-else
      class="w-28 h-28 border-2 border-dashed border-grey-4 rounded grid place-items-center text-small"
    >
      No Image
    </div>
    <div class="flex flex-col justify-between">
      <div class="grid gap-2">
        <div class="grid gap-1">
          <div class="grid grid-flow-col gap-2 auto-cols-max place-items-center">
            <p class="font-medium">{{ name }}</p>
            <help-badge
              :label="availabilityStatus ? 'Available' : 'Unavailable'"
              :color="availabilityStatus ? 'positive' : 'negative'"
            />
          </div>
          <p class="text-small text-grey-3">{{ category }}</p>
        </div>
        <p class="text-small text-grey-2 mb-2">
          {{ description }}
        </p>
      </div>
      <p class="text-small font-medium">{{ store.methods.convertToRp(price) }}</p>
    </div>
    <div class="h-28 grid grid-flow-col place-items-center gap-2">
      <help-toggle />
      <icon name="chevron-down" class="cursor-pointer" />
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import HelpToggle from '@/components/atoms/Toggle.vue';
import Icon from '@/components/atoms/Icon.vue';

export default {
  name: 'MenuCard',
  components: {
    HelpBadge,
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
  },
  setup() {
    const store = inject('store');
    return { store };
  },
};
</script>

<style></style>
