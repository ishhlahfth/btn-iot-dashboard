<template>
  <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
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
    <div class="grid gap-1" :class="{ 'animate-pulse': loading.history }">
      <template v-if="!loading.history">
        <template v-for="(step, i) in history" :key="step.id">
          <div class="flex justify-between items-center">
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
      </template>
      <template v-else>
        <template v-for="i in 3" :key="i">
          <div class="flex justify-between items-center">
            <div class="grid grid-flow-col gap-4 place-items-center">
              <div class="bg-grey-4 rounded-full h-7 w-7" />
              <div class="rounded bg-grey-4 h-4 w-36 sm:w-44"></div>
            </div>
            <div>
              <div class="rounded bg-grey-4 h-4 w-24 sm:w-36"></div>
            </div>
          </div>
          <div v-if="i !== 3" class="pl-3">
            <div class="bg-grey-4 w-1 h-5" />
          </div>
        </template>
      </template>
    </div>
    <form @submit.prevent="updateStatus" class="grid gap-4" v-if="actions.length">
      <div class="w-full">
        <help-select
          v-model="selectedAction"
          label="Choose action"
          :options="actions"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="w-full" v-if="needsReason">
        <help-select
          v-model="selectedReason"
          label="Choose cancel reason"
          :options="reasons"
          :position="['top', 'right']"
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
        <help-button label="update" :loading="loading.update" loading-label="updating" />
      </div>
    </form>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import dayjs from 'dayjs';
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import Icon from '@/components/atoms/Icon.vue';
import API from '../../apis';

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
    currentPropStep: {
      type: String,
      default: '',
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      selectedAction: {
        /* value: '', label: '' */
      },
      actions: [],
      history: [],
      currentStep: {},
      loading: {
        history: false,
        steps: false,
        update: false,
      },
      needsReason: false,
      selectedReason: {
        /* value: '', label: '' */
      },
      reasons: [],
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
      this.loading.history = true;
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
      this.loading.history = false;
    },
    async getOrderSteps() {
      this.loading.steps = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${this.merchantId}/order-steps`);
        const currentStepDetail = data.filter((el) => el.title.toLowerCase() === this.currentPropStep.toLowerCase())[0];
        this.currentStep = currentStepDetail;
        this.actions = currentStepDetail.actions.length
          ? currentStepDetail.actions.map((el) => ({ value: el.id, label: el.title }))
          : [];
        this.selectedAction = this.actions.length ? this.actions[0] : {};
      } catch (error) {
        console.log(error);
      }
      this.loading.steps = false;
    },
    async updateStatus() {
      this.loading.update = true;

      const payload = {};
      if (this.needsReason) {
        payload.cancel_reason_id = this.selectedReason.value;
      }

      try {
        await API.post(
          `orders/${this.orderId}/steps/${this.currentStep.id}/actions/${this.selectedAction.value}/next`,
          payload,
        );
        this.toast.success('Successfully updated status');
        await this.getStatusHistory();
        this.getOrderSteps();
      } catch (error) {
        this.toast.error(error);
        console.log(error);
      }
      this.loading.update = false;
      this.$emit('close');
    },
  },
  watch: {
    selectedAction: {
      deep: true,
      async handler() {
        if (this.selectedAction.label === 'Batalkan Pesanan') {
          this.needsReason = true;
          try {
            const {
              data: { data },
            } = await API.get('order-cancel-reasons');
            this.reasons = data.map((el) => ({ value: el.id, label: el.reason }));
            this.selectedReason = this.reasons[0];
          } catch (error) {
            console.log(error);
          }
        } else {
          this.needsReason = false;
        }
      },
    },
  },
  async mounted() {
    await this.getStatusHistory();
    this.getOrderSteps();
  },
  unmounted() {
    this.$emit('closeAndRefetch');
  },
};
</script>

<style></style>
