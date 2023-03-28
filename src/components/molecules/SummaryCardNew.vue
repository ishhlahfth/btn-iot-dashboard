<template>
  <div>
    <div class="bg-white shadow-md hover:shadow-lg rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-gold rounded-xl">
          <btn-icon color="white" name="weather" :size="8" />
        </div>
        <div>
          <p class="text-sm text-gray-400">Weather</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            {{deviceData.weather}}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="bg-white shadow-md hover:shadow-lg rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-mint rounded-xl">
          <btn-icon color="white" name="soil" :size="8" />
        </div>
        <div>
          <p class="text-sm text-gray-400">Soil Humidity</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            {{ deviceData.soil }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="bg-white shadow-md hover:shadow-lg rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-royal rounded-xl">
          <btn-icon color="white" name="water" :size="8" />
        </div>
        <div>
          <p class="text-sm text-gray-400">Watering</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            {{ deviceData.watering }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div class="bg-white shadow-md hover:shadow-lg rounded-lg grid grid-flow-row gap-4 p-4">
      <div class="grid grid-cols-4 grid-flow-row gap-2">
        <div class="shadow row-span-2 h-14 w-14 grid place-items-center bg-grey-1 rounded-xl">
          <btn-icon color="white" name="control" :size="8" />
        </div>
        <div>
          <p class="text-sm text-gray-400">Control</p>
          <div class="text-royal font-semibold text-heading4 sm:text-heading3">
            {{ deviceData.control }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BtnIcon from '@/components/atoms/Icon.vue';
import API from '@/apis';

export default {
  name: 'SummaryCardNew',
  components: {
    BtnIcon,
  },
  data() {
    return {
      deviceData: {
        weather: '',
        soil: '',
        watering: '',
        control: '',
      },
    };
  },
  methods: {
    async fetchData() {
      const payload = {
        mac: process.env.VUE_APP_DEVICE_MAC,
      };
      const url = 'dashboard/fetch_data';
      try {
        const {
          data: { data },
        } = await API.post(url, payload);
        if (data) {
          this.deviceData.soil = data.sensorValue === 1 ? 'WET' : 'DRY';
          this.deviceData.control = data.isManual ? 'MANUAL' : 'AUTO';
          this.deviceData.watering = data.valveStatus;
          this.deviceData.weather = data.rainIntensity;
        }
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
    this.fetchData();
  },
};
</script>
