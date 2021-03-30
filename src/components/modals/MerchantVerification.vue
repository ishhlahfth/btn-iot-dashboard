<template>
  <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">Verification Status</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>
    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <div>
        <p class="text-grey-2">Seller</p>
        <p>{{ verifDetail.name }}</p>
      </div>
      <div>
        <p class="text-grey-2">Status</p>
        <p
          :class="
            verifDetail.verify_status === 'Terverifikasi'
              ? 'text-mint'
              : verifDetail.verify_status === 'Pending Verifikasi'
              ? 'text-gold'
              : 'text-flame'
          "
        >
          {{ verifDetail.verify_status }}
        </p>
      </div>
      <div>
        <p class="text-grey-2">ID No. (KTP)</p>
        <p v-if="!loading">{{ idNumber }}</p>
        <div v-else class="rounded bg-grey-4 h-4 animate-pulse"></div>
      </div>
      <div v-show="verifDetail.verify_status !== 'Terverifikasi'">
        <p class="text-grey-2">Cause of Failure</p>
        <p>{{ verifDetail.verify_reason || '-' }}</p>
      </div>
      <div class="col-span-2">
        <p class="text-grey-2">ID Card</p>
        <help-thumbnail
          v-if="!loading"
          width="100%"
          use-bg
          :src="idImage"
          :height="screenWidth < 640 ? 196 : 248"
        />
        <div
          v-else
          class="rounded w-full bg-grey-4 animate-pulse"
          :style="screenWidth < 640 ? 'height: 196px;' : 'height: 248px;'"
        ></div>
      </div>
    </div>
    <div
      v-if="verifDetail.verify_status !== 'Terverifikasi'"
      class="flex flex-col sm:flex-row-reverse"
    >
      <help-button
        @click="$emit('openOption')"
        :label="verifDetail.verify_status === 'Pending Verifikasi' ? 'verify' : 'edit status'"
        class="mb-2 sm:mb-0"
      />
    </div>
    <div v-else class="flex flex-col sm:flex-row-reverse">
      <help-button
        @click="$emit('openConfirmSuspend')"
        label="suspend merchant"
        class="mb-2 sm:mb-0"
        bg-color="flame"
      />
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpThumbnail,
  },
  emits: ['close', 'openOption', 'openConfirmSuspend'],
  data() {
    return {
      loading: '',
      idNumber: '',
      idImage: '',
      confirmation: false,
    };
  },
  computed: {
    screenWidth() {
      return this.$store.state.screenWidth;
    },
    verifDetail() {
      return this.$store.state.verifDetail;
    },
    merchantId() {
      return this.$store.state.merchantId;
    },
  },
  methods: {
    async getKTP() {
      this.loading = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${this.verifDetail.id}/sellers`);

        console.log('K T P', data);

        this.idNumber = data[0]?.profile.identity_number || '-';

        if (data[0]?.banners.length) {
          this.idImage = await this.$store.dispatch('loadImage', data[0].banners[0].url);
        }
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getKTP();
  },
};
</script>

<style></style>
