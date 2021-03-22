<template>
  <div
    class="flex justify-center max-w-min self-start rounded-full font-medium text-center text-xsmall py-1 px-2"
    :class="[
      { 'px-4': !icon },
      { 'text-mint-dark bg-mint-soft': color === 'positive' },
      { 'text-flame-dark bg-flame-soft': color === 'negative' },
    ]"
  >
    <div class="grid grid-flow-col auto-cols-max gap-1">
      <div v-if="icon" class="h-full w-full flex items-center justify-center">
        <icon :name="icon" />
      </div>
      <div class="h-full w-full flex items-center">
        <p class="capitalize">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'HelpBadge',
  components: {
    Icon,
  },
  props: {
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: 'negative',
    },
  },
};
</script>
