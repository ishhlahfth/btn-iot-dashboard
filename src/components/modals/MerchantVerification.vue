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
        <p>{{ verificationDetail.name }}</p>
      </div>
      <div>
        <p class="text-grey-2">Status</p>
        <p
          :class="
            verificationDetail.verify_status === 'Terverifikasi'
              ? 'text-mint'
              : verificationDetail.verify_status === 'Pending Verifikasi'
              ? 'text-gold'
              : 'text-flame'
          "
        >
          {{ verificationDetail.verify_status }}
        </p>
      </div>
      <div>
        <p class="text-grey-2">ID No. (KTP)</p>
        <p>{{ idNumber }}</p>
      </div>
      <div v-show="verificationDetail.verify_status !== 'Terverifikasi'">
        <p class="text-grey-2">Cause of Failure</p>
        <p>{{ verificationDetail.verify_reason || '-' }}</p>
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
      v-if="verificationDetail.verify_status !== 'Terverifikasi'"
      class="flex flex-col sm:flex-row-reverse"
    >
      <help-button @click="$emit('openOption')" label="verify" class="mb-2 sm:mb-0" />
    </div>
  </div>
</template>

<script>
import { inject, onMounted, ref } from 'vue';
import HelpButton from '@/components/atoms/Button.vue';
import HelpThumbnail from '@/components/atoms/Thumbnail.vue';
import API from '@/apis';

export default {
  name: 'MerchantVerification',
  components: {
    HelpButton,
    HelpThumbnail,
  },
  emits: ['close', 'openOption'],
  setup() {
    const {
      state: {
        screenWidth,
        modalState: { verificationDetail },
      },
      methods,
    } = inject('store');

    const idNumber = ref('');
    const idImage = ref('');

    const loading = ref(false);

    const confirmation = ref(false);

    const getKTP = async () => {
      loading.value = true;
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${verificationDetail.id}/sellers`);

        idNumber.value = data[0].profile.identity_number || '-';

        if (data[0].banners.length) {
          idImage.value = await methods.loadImage(data[0].banners[0].url);
        }
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    };

    onMounted(() => {
      getKTP();
    });

    return {
      screenWidth,
      verificationDetail,
      idNumber,
      idImage,
      loading,
      confirmation,
    };
  },
};
</script>

<style></style>
