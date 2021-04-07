<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Status History</p>
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
    <form
      @submit.prevent="updateStatus"
      class="grid gap-4"
      v-if="actions.length"
    >
      <div class="w-full">
        <help-select
          v-model="selectedAction"
          label="Change order status to"
          :options="actions"
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
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import Icon from '@/components/atoms/Icon.vue';
import API from '@/apis';
import dayjs from 'dayjs';

export default {
  name: 'StatusHistory',
  components: {
    HelpButton,
    HelpSelect,
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
      selectedAction: '',
      actions: [],
      history: [],
      currentStep: {},
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    orderId() {
      return this.$store.state.orderId;
    },
    merchantId() {
      return this.$store.state.merchantId;
    },
  },
  methods: {
    async getStatusHistory() {
      try {
        const {
          data: { data },
        } = await API.get(`orders/${this.orderId}/history`);

        this.history = data.map((el) => ({
          ...el,
          process_date: dayjs(el.process_date).format('DD-MM-YYYY HH:mm:ss'),
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getOrderSteps() {
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${this.merchantId}/order-steps`);

        this.currentStep = this.history[this.history.length - 1];

        const currentStepDetail = data.filter((el) => el.title === this.currentStep.step_title)[0];

        this.actions = currentStepDetail.actions.length
          ? currentStepDetail.actions.map((el) => ({ value: el.id, label: el.title }))
          : [];
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatus() {
      try {
        const {
          data: { data },
        } = await API.post(
          `orders/${this.orderId}/steps/${this.currentStep.id}/actions/${this.selectedAction.value}/next`,
          {},
        );
        console.log('UPDATE: ', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    await this.getStatusHistory();
    this.getOrderSteps();
  },
};
</script>

<style></style>
