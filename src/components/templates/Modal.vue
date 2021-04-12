<template>
  <transition name="fade" appear>
    <div
      v-if="modelValue"
      class="w-screen h-screen bg-black bg-opacity-50 fixed inset-0 z-50"
      @click="overlayClick"
    />
  </transition>
  <transition :name="screenWidth < 640 ? 'mobile-slide-up' : 'slide-up'" appear>
    <div
      v-if="modelValue"
      class="fixed modal-style p-4 sm:p-6 rounded-t-2xl sm:rounded-lg shadow-custom z-50 transition-colors duration-500 transform"
      :class="violated ? 'bg-flame-soft' : 'bg-snow'"
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
    permanent: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      violated: false,
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    overlayClick() {
      if (!this.permanent) {
        this.$emit('update:modelValue', false);
      } else {
        this.violated = true;
        setTimeout(() => {
          this.violated = false;
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss">
.shadow-custom {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}

.slide-up-enter-active,
.slide-up-leave-active,
.mobile-slide-up-enter-active,
.mobile-slide-up-leave-active {
  transition: all 0.25s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  top: 100vh !important;
  transform: translateY(100vh) !important;
  transform: translateX(-50%) !important;
}

.mobile-slide-up-enter-from,
.mobile-slide-up-leave-to {
  transform: translateY(100vh) !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.modal-style {
  @apply bottom-0;
  @apply inset-x-0;
  @screen sm {
    @apply bottom-auto;
    @apply right-auto;
    @apply top-1/2;
    @apply left-1/2;
    transform: translate(-50%, -50%);
  }
  .inner-modal-fixed {
    height: 85vh;
  }
  .inner-modal-auto {
    height: auto;
  }
  .modal-xl {
    @screen sm {
      width: 85vw;
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
      min-width: 440px;
      max-width: 27.5vw;
      height: auto;
      max-height: 75.5vh;
    }
  }
  .modal-sm {
    @screen sm {
      min-width: 320px;
      max-width: 27.5vw;
      height: auto;
      max-height: 75.5vh;
    }
  }
}
</style>
