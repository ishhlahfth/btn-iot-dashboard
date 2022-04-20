<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Edit Minimum Value Transaction</p>
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
      <div class="flex gap-6 col-span-2">
      <div >
        <p class="text-grey-2">Agent Name</p>
        <p>{{ agentDetail.fullName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Minimum Value Transaction</p>
        <p v-if="!loading">{{ convertToRp(agentDetail.min_value_trx) }}</p>
      </div>
      </div>
      <div class="sm:col-span-2">
        <div class="grid gap-4">
          <help-input
            label="New Minimum Value Transaction"
            label-class="text-grey-2"
            type="text"
            v-model="newMinValTrx"
            placeholder="Type new minimum value transaction here"
            mask="##########"
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
      agentDetail: {},
      loading: false,
      loadingSave: false,
      newMinValTrx: 0,
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
        this.agentDetail.min_value_trx = data.min_value_trx;
        this.newMinValTrx = data.min_value_trx;
        this.loading = false;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
          this.loading = false;
        } else {
          this.toast.error(error.response?.data?.errors[0]);
          this.loading = false;
        }
      }
    },
    async updateCommission() {
      this.loadingSave = true;
      const payload = {
        min_value_trx: parseInt(this.newMinValTrx, 10),
      };
      const url = `agents/${this.agentId}`;
      try {
        const {
          data: { data },
        } = await API.patch(url, payload);
        this.loadingSave = false;
        this.toast.success(
          `Minimal nilai transaksi ${data.name} berhasil dirubah menjadi ${this.convertToRp(this.newMinValTrx)}`,
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
  },
  mounted() {
    this.getAgent(this.agentId);
  },
};
</script>

<style></style>
