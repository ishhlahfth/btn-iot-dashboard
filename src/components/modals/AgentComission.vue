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
    <div class="grid sm:grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium" v-if="loading">
      <div class="animate-pulse rounded h-6 bg-grey-4"></div>
      <div class="animate-pulse rounded h-6 bg-grey-4"></div>
      <div class="col-span-2 animate-pulse rounded h-6 bg-grey-4"></div>
      <div class="col-span-2 animate-pulse rounded h-6 bg-grey-4"></div>
    </div>
    <div class="grid sm:grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium" v-else>
      <div>
        <p class="text-grey-2">Agent Name</p>
        <p>{{ agentDetail.fullName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p v-if="currCommType === 'PERCENTAGE'">{{ agentDetail.commission }} %</p>
        <p v-if="currCommType === 'NOMINAL'">Rp {{ agentDetail.commission }}</p>
      </div>
      <div class="sm:col-span-2">
        <p class="text-grey-2">Commission Type</p>
        <div class="flex gap-2 py-2">
          <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio cursor-pointer"
                name="commType"
                value="PERCENTAGE"
                v-model="commType"
              />
              <span class="ml-2">Percentage</span>
          </label>
          <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio cursor-pointer"
                name="commType"
                value="NOMINAL"
                v-model="commType"
              />
              <span class="ml-2">Nominal</span>
          </label>
        </div>
      </div>
      <div class="sm:col-span-2">
        <div class="grid gap-4">
          <help-input
            label="New Commission"
            label-class="text-grey-2"
            type="text"
            v-model="newCommission"
            placeholder="Type new commission value here"
            mask="###########"
          />
          <help-button label="save changes" :loading="loadingSave" loadingLabel="Saving Changes" @click="updateCommission" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import mixin from '@/mixin';
import API from '../../apiext';

export default {
  name: 'Commission',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpInput,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      commissionDetail: {
        formula: { value: 0 },
      },
      agentDetail: {},
      loading: false,
      loadingSave: false,
      newCommission: 0,
      commType: '',
      currCommType: '',
    };
  },
  computed: {
    agentId() {
      return this.$store.state.agentId;
    },
    merchantName() {
      return this.$store.state.commissionDetail.merchantName;
    },
  },
  methods: {
    async getAgent(id) {
      this.loading = true;
      const url = `agents/${id}`;
      try {
        const {
          data: { data },
        } = await API.get(url);
        this.agentDetail.fullName = data.name;
        this.agentDetail.commission = data.commission;
        this.newCommission = data.commission;
        this.commType = data.commission_type;
        this.currCommType = data.commission_type;
        // this.handleCommType(this.commType);
        this.loading = false;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.loading = false;
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.loading = false;
          this.toast.error(error.response?.data?.errors[0]);
        }
      }
    },
    async updateCommission() {
      this.loadingSave = true;
      const payload = {
        commission: parseInt(this.newCommission, 10),
        commission_type: this.commType,
      };
      const url = `agents/${this.agentId}`;
      try {
        const {
          data: { data },
        } = await API.patch(url, payload);
        this.loadingSave = false;
        this.toast.success(
          `Komisi ${data.name} berhasil dirubah menjadi ${this.commType === 'NOMINAL' ? 'Rp' : ''} ${this.newCommission} ${this.commType === 'PERCENTAGE' ? '%' : ''}`,
        );
        this.$emit('finish');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.loadingSave = false;
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.loadingSave = false;
          this.toast.error(error.response?.data?.errors[0]);
        }
      }
    },
    handleCommType(type) {
      if (type === 'NOMINAL') {
        this.commType = false;
      } else {
        this.commType = true;
      }
    },
  },
  watch: {
    commType() {
      console.log('comtype', this.commType);
    },
  },
  mounted() {
    this.getAgent(this.agentId);
  },
};
</script>

<style scoped>
input[type='radio']:after {
  width: 18px;
  height: 18px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  background-color: #ffffff;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 1px solid #004594;
}

input[type='radio']:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 15px;
  position: relative;
  background-color: white;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 5px solid #004594;
}
</style>
