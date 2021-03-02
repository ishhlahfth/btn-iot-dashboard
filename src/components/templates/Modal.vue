<template>
  <div
    class="w-screen h-screen bg-black bg-opacity-50 absolute top-0 left-0 z-50"
    v-if="modelValue"
    @click="$emit('update:modelValue', false)"
  ></div>
  <div
    v-if="modelValue"
    class="w-106 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-snow p-6 grid auto-rows-max gap-4 rounded-lg shadow-custom z-50"
  >
    <p class="font-medium text-subheading">Reset Password</p>
    <p>
      Please enter your email address. You will receive a link to create a new password via email
    </p>
    <div class="flex items-center">
      <div class="w-full mr-4">
        <help-input placeholder="Type your email here" v-model="email" />
      </div>
      <div>
        <help-button label="send link" />
      </div>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';

export default {
  name: 'HelpModal',
  components: {
    HelpButton,
    HelpInput,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      email: '',
      // modalOpened: false,
    };
  },
};
</script>

<style>
.shadow-custom {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.15);
}
</style>
