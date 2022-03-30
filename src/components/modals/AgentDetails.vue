<template>
  <div class="modal-lg">
    <div class="flex w-full justify-between">
      <div>
        <p class="text-2xl font-semibold">Agent Detail</p>
      </div>
      <div>
        <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
      </div>
    </div>
    <div class="grid grid-cols-3 gap-2 py-4">
      <div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Status</p>
          <help-badge class="font-semibold"
          :label="agentDetail.statusName"
          :color="
          agentDetail.statusName === 'Terverifikasi'
                ? 'positive'
                : agentDetail.statusName === 'Pending Verifikasi'
                ? 'warning'
                : 'negative'
          "
          />
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Full Name (Based On KTP)</p>
          <p class="font-semibold">{{ agentDetail.fullName }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Email</p>
          <p class="font-semibold">{{ agentDetail.email }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Phone Number</p>
          <p class="font-semibold">{{ agentDetail.phone }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Birth Date</p>
          <p class="font-semibold">{{ agentDetail.birthDate }}</p>
        </div>
      </div>
      <div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Bank</p>
          <p class="font-semibold">{{ agentDetail.bankType }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Account Number</p>
          <p class="font-semibold">{{ agentDetail.accountNumber }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Account Name</p>
          <p class="font-semibold">{{ agentDetail.accountName }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">KTP Photo</p>
          <help-thumbnail
          class="mb-1"
          width="100%"
          :src="agentDetail.srcKtp"
        >
          <div class="grid gap-2 place-items-center text-grey-2 p-4">
            <icon name="photograph" :size="6" />
            <p class="font-medium text-center">
              No image
            </p>
          </div>
        </help-thumbnail>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Selfie with KTP</p>
          <help-thumbnail
          class="mb-1"
          width="100%"
          :src="agentDetail.srcSelfie"
        >
          <div class="grid gap-2 place-items-center text-grey-2 p-4">
            <icon name="photograph" :size="6" />
            <p class="font-medium text-center">
              No image
            </p>
          </div>
        </help-thumbnail>
        </div>
      </div>
      <div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Address</p>
          <p class="font-semibold">{{ agentDetail.address }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Location Detail</p>
          <p class="font-semibold">{{ agentDetail.locationDetail }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">District</p>
          <p class="font-semibold">{{ agentDetail.district }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">City</p>
          <p class="font-semibold">{{ agentDetail.city }}</p>
        </div>
        <div class="grid w-full gap-2 py-2">
          <p class="font-semibold text-gray-400">Postal Code</p>
          <p class="font-semibold">{{ agentDetail.postalCode }}</p>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-end">
      <help-button class="h-full" color="white" :label="agentDetail.statusName === 'Terverifikasi' ? 'Suspend' : 'Verify'" @click="$emit('verify', {uuid: agentId})"  />
    </div>
  </div>
</template>
<script>
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpBadge from '@/components/atoms/Badge.vue';
import { useToast } from 'vue-toastification';
import mixin from '@/mixin';
import ApiAgent from '../../apiext';

export default {
  name: 'AgentDetails',
  mixins: [mixin],
  data() {
    return {
      agentDetail: {
        statusName: '',
        statusId: '',
        fullName: '',
        email: '',
        phone: '',
        birthDate: '',
        bank: '',
        accountNumber: '',
        accountName: '',
        srcKtp: '',
        srcSelfie: '',
        address: '',
        locationDetail: '',
        district: '',
        city: '',
        postalCode: '',
      },
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: {
    HelpThumbnail,
    HelpButton,
    HelpBadge,
  },
  computed: {
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
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
  },
  mounted() {
    this.getAgent(this.agentId);
  },
};
</script>
