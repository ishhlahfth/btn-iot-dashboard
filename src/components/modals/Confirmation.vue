<template>
  <div class="grid gap-6 p-1 inner-modal-auto modal-sm">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">{{ title }}</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>

    <div class="grid auto-rows-max gap-4 sm:gap-6 font-medium text-grey-2">
      <p>{{ message }}</p>
    </div>

    <div class="flex flex-col sm:flex-row-reverse">
      <help-button @click="$emit('confirm')" label="yes i'm sure" class="mb-2 sm:mb-0" />
      <help-button
        @click="$emit('cancel')"
        label="cancel"
        class="mb-2 sm:mb-0 sm:mr-2"
        bg-color="transparent"
        color="grey-1"
      />
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';

export default {
  name: 'Confirmation',
  props: {
    title: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
  },
  components: {
    HelpButton,
  },
};
</script>

<style></style>
