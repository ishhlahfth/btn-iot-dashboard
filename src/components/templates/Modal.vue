<template>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      class="w-screen h-screen bg-black bg-opacity-50 fixed inset-0 z-50"
      @click="$emit('update:modelValue', false)"
    />
  </transition>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-snow p-6 rounded-lg shadow-custom z-50"
    >
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'HelpModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.shadow-custom {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
