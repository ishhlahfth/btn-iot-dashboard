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
      class="fixed modal-style bg-snow p-6 rounded-t-2xl sm:rounded-lg shadow-custom z-50"
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

<style lang="scss">
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
.modal-style {
  @apply bottom-0;
  @apply inset-x-0;
  @screen sm {
    @apply bottom-auto;
    @apply right-auto;
    @apply top-1/2;
    @apply left-1/2;
    @apply transform;
    @apply -translate-x-1/2;
    @apply -translate-y-1/2;
  }
  .inner-modal {
    width: 85vw;
    height: 85vh;
  }
  .modal-xl {
    @screen sm {
      height: 87.5vh;
    }
  }
  .modal-lg {
    @screen sm {
      width: 57.5vw;
      height: 75vh;
    }
  }
  .modal-md {
    @screen sm {
      width: 25vw;
      height: auto;
      max-height: 75.5vh;
    }
  }
}
</style>
