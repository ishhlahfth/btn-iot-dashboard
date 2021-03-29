<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <p class="text-heading4 font-semibold">Edit Commission</p>
    <div class="grid sm:grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Merchant Name</p>
        <p>{{ merchantName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p>{{ commissionDetail.formula.value }} %</p>
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
import API from '@/apis';

export default {
  name: 'Commission',
  components: {
    HelpButton,
    HelpInput,
  },
  emits: ['closeAndRefetch'],
  data() {
    return {
      commissionDetail: {
        formula: { value: 0 },
      },
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
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${this.merchantId}/bill-formulas`);
        if (data) {
          console.log('RESPONSE', data);
          if (data.length) {
            this.commissionDetail = data.filter((el) => el.order_type_id === 4)[0];
          }
        }
      } catch (error) {
        console.log(error);
      }
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
      try {
        const {
          data: { data },
        } = await API.patch(`bill-formulas/${this.commissionDetail.id}`, payload);

        this.$emit('closeAndRefetch');
        console.log('UPDATED', data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getCommission();
  },
};
</script>

<style></style>
