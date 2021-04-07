<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Change Order Status</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <div class="grid gap-1">
      <template v-for="(step, i) in history" :key="step.id">
        <div class="flex justify-between">
          <div class="grid grid-flow-col gap-4 place-items-center">
            <div v-if="step.step_title !== 'Completed'" class="bg-royal rounded-full h-7 w-7" />
            <div v-else class="bg-mint rounded-full h-7 w-7 grid place-items-center">
              <icon name="check" color="white" />
            </div>
            <p class="font-medium">{{ step.step_title }}</p>
          </div>
          <div>
            <p class="text-grey-2">{{ step.process_date }}</p>
          </div>
        </div>
        <div v-if="i !== history.length - 1" class="pl-3">
          <div class="bg-royal w-1 h-5" />
        </div>
      </template>
    </div>
    <!-- <form @submit.prevent="$emit('apply', selectedPayment.value)" class="grid gap-4">
      <div class="w-full">
        <help-select
          v-model="selectedPayment"
          label="Payment Method"
          :options="paymentMethods"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button
          type="button"
          label="cancel"
          bg-color="transparent"
          color="grey-1"
          @click="$emit('close')"
        />
        <help-button label="apply" />
      </div>
    </form> -->
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
// import HelpSelect from '@/components/molecules/Select.vue';
import Icon from '@/components/atoms/Icon.vue';
import API from '@/apis';
import dayjs from 'dayjs';

export default {
  name: 'StatusHistory',
  components: {
    HelpButton,
    // HelpSelect,
    Icon,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      history: [],
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    orderId() {
      return this.$store.state.orderId;
    },
  },
  methods: {
    async getStatusHistory() {
      try {
        const {
          data: { data },
        } = await API.get(`orders/${this.orderId}/history`);
        console.log('HISTORY', data);
        this.history = data.map((el) => ({
          ...el,
          process_date: dayjs(el.process_date).format('DD-MM-YYYY HH:mm:ss'),
        }));
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getStatusHistory();
  },
};
</script>

<style></style>
