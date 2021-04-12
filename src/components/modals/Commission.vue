<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Edit Commission</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <div class="grid sm:grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Merchant Name</p>
        <p>{{ merchantName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p v-if="!loading">{{ commissionDetail.formula.value }} %</p>
        <div v-else class="rounded bg-grey-4 h-4 animate-pulse"></div>
      </div>
      <div class="sm:col-span-2">
        <form @submit.prevent="proceed" class="grid gap-4">
          <help-input
            label="New Commission"
            label-class="text-grey-2"
            v-model="newCommission"
            placeholder="Type new commission value here"
          />
          <help-button label="save changes" @click="updateCommission" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import { useToast } from 'vue-toastification';
import API from '@/apis';

export default {
  name: 'Commission',
  components: {
    HelpButton,
    HelpInput,
  },
  emits: ['closeAndRefetch', 'close', 'refetch'],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      commissionDetail: {
        formula: { value: 0 },
      },
      loading: false,
      newCommission: '',
    };
  },
  computed: {
    merchantId() {
      return this.$store.state.commissionDetail.merchantId;
    },
    merchantName() {
      return this.$store.state.commissionDetail.merchantName;
    },
  },
  methods: {
    async getCommission() {
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${this.merchantId}/bill-formulas`);
        if (data) {
          if (data.length) {
            this.commissionDetail = data.filter((el) => el.order_type_id === 4)[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async updateCommission() {
      const payload = {
        merchant_id: this.commissionDetail.merchant_id,
        order_type_id: this.commissionDetail.order_type_id,
        seq_no: this.commissionDetail.seq_no,
        label: this.commissionDetail.label,
        formula: { type: 'PERCENT', value: +this.newCommission },
        formula_type: this.commissionDetail.formula_type,
      };
      this.loading = true;
      try {
        await API.patch(`bill-formulas/${this.commissionDetail.id}`, payload);

        this.getCommission();
        this.$emit('refetch');
        this.toast.success(`Successfully updated ${this.merchantName}`);
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getCommission();
  },
};
</script>

<style></style>
