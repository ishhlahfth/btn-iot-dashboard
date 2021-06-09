<template>
  <VueCtkDateTimePicker v-model="yourValue" />
</template>

<script>
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

export default {
  name: 'DatePicker',
  data() {
    return {
      yourValue: '',
    };
  },
  components: {
    VueCtkDateTimePicker,
  },
};
</script>

<style></style>
