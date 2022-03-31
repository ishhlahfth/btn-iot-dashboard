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
        <p class="text-grey-2">Agent Name</p>
        <p>{{ agentDetail.fullName }}</p>
      </div>
      <div>
        <p class="text-grey-2">Current Commission</p>
        <p v-if="!loading">{{ agentDetail.commission }} %</p>
        <div v-else class="rounded bg-grey-4 h-4 animate-pulse"></div>
      </div>
      <div class="sm:col-span-2">
        <form @submit.prevent="proceed" class="grid gap-4">
          <help-input
            label="New Commission"
            label-class="text-grey-2"
            type="number"
            v-model="newCommission"
            placeholder="Type new commission value here"
          />
          <help-button label="save changes" :loading="loading" loadingLabel="Saving Changes" @click="updateCommission" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import HelpButton from '@/components/atoms/Button.vue';
import HelpInput from '@/components/atoms/Input.vue';
import API from '../../apiext';

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
      agentDetail: {},
      loading: false,
      newCommission: 0,
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
      const url = `agents/${id}`;
      try {
        const {
          data: { data },
        } = await API.get(url);
        this.agentDetail.fullName = data.name;
        this.agentDetail.commission = data.commission;
        this.newCommission = data.commission;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.response?.data?.errors[0]);
        }
      }
    },
    async updateCommission() {
      this.loading = true;
      const payload = {
        commission: this.newCommission,
      };
      const url = `agents/${this.agentId}`;
      try {
        const {
          data: { data },
        } = await API.patch(url, payload);
        this.loadingVerify = false;
        this.toast.success(
          `Komisi ${data.name} berhasil dirubah menjadi ${this.selectedStatus.label} %`,
        );
        this.$emit('finish');
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
  },
  mounted() {
    this.getAgent(this.agentId);
  },
};
</script>

<style></style>
