<template>
  <div class="grid gap-6 inner-modal-auto modal-md">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Verify Agent ({{agentDetail.fullName}})</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <form
      @submit.prevent="
        $emit('apply', {
          merchantName,
          paymentMethod: selectedPayment.value,
          orderStatus: selectedStatus.value,
          selectedStart: pickedStart,
          selectedEnd: pickedEnd,
        })
      "
      class="grid gap-4"
    >
      <div class="w-full">
        <help-select
          v-model="selectedStatus"
          label="Verify status to:"
          :options="agentStatus"
          :position="screenWidth < 640 ? ['top', 'right'] : ['bottom', 'right']"
        />
      </div>
      <div class="grid grid-flow-col gap-2 auto-cols-max justify-end">
        <help-button label="Proceed" class="w-full" :loading="loadingVerify" :loadingLabel="'Memproses'" @click="verifyAgent" />
      </div>
    </form>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpSelect from '@/components/molecules/Select.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import ApiAgent from '../../apiext';

export default {
  name: 'AgentVerification',
  mixins: [mixin],
  components: {
    HelpButton,
    HelpSelect,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      agentName: '',
      selectedStatus: { value: '', label: 'All' },
      agentStatus: [
        { value: 1, label: 'Pending Verifikasi' },
        { value: 2, label: 'Terverifikasi' },
        { value: 3, label: 'Verifikasi Gagal' },
        { value: 4, label: 'Akun Disabled' },
      ],
      config: {
        wrap: true,
        locale: 'ID',
        disableMobile: 'true',
      },
      agentDetail: {},
      loadingVerify: false,
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    agentId() {
      return this.$store.state.agentId;
    },
  },
  methods: {
    async getAgent(id) {
      const url = `agents/${id}`;
      try {
        const {
          data: { data },
        } = await ApiAgent.get(url);
        this.agentDetail.statusId = data.verification_status.id;
        this.agentDetail.statusName = data.verification_status.name;
        this.agentDetail.fullName = data.name;
        this.agentDetail.email = data.email;
        this.agentDetail.phone = data.phone_number;
        this.agentDetail.birthDate = data.dob;
        this.agentDetail.bank = data.bank_type;
        this.agentDetail.accountNumber = data.bank_account_number;
        this.agentDetail.accountName = data.bank_account_name;
        this.agentDetail.srcKtp = data.image_id_card;
        this.agentDetail.srcSelfie = data.image_selfie_id_card;
        this.agentDetail.address = data.address;
        this.agentDetail.locationDetail = data.address_detail;
        this.agentDetail.district = data.district;
        this.agentDetail.city = data.city;
        this.agentDetail.postalCode = data.zip_code;
        this.selectedStatus.value = this.agentDetail.statusId;
        this.selectedStatus.label = this.agentDetail.statusName;
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.response?.data?.errors[0]);
        }
      }
    },
    async verifyAgent() {
      this.loadingVerify = true;
      const payload = {
        verification_status_id: this.selectedStatus.value,
      };
      const url = `agents/${this.agentId}`;
      try {
        const {
          data: { data },
        } = await ApiAgent.patch(url, payload);
        this.loadingVerify = false;
        this.toast.success(`Status ${data.name} berhasil dirubah menjadi ${this.selectedStatus.label}`);
        this.$emit('finish');
      } catch (error) {
        if (error.message === 'Network Error') {
          this.loadingVerify = false;
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.loadingVerify = false;
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
