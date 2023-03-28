<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="grid sm:grid-flow-col gap-4">
      <div class="w-full flex justify-between">
        <p class="text-heading2 font-semibold">Dashboard And Controller</p>
      </div>
      <div class="grid gap-2 sm:flex sm:justify-end">
        <div class="flex justify-end">
          <div class="flex items-center gap-2">
            <p class="text-heading4">Last Fetch : {{lastFetch}}</p>
            <div class="rounded-lg bg-royal p-1 cursor-pointer" @click="fetchData">
              <btn-icon color="white" name="refresh" :size="4" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid sm:grid-cols-4 gap-4 mb-3">
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
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="mb-4">
        <div class="bg-white p-4 shadow-md rounded-lg">
          <p class="text-heading4 p-2">Logs</p>
          <hr>
          <div class="flex items-center">
            <p class="p-2">Coming Soon</p>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div class="bg-white p-4 shadow-md rounded-lg">
          <p class="text-heading4 p-2">Control</p>
          <hr>
          <div class="grid grid-cols-2 p-2">
            <div>
              Manual Control
            </div>
            <div>
              <help-toggle
                v-model="payload.isManual"
                @change="toggleStatus"
              />
            </div>
          </div>
          <div v-if="payload.isManual">
            <p class="text-heading4 p-2">Watering Valve</p>
          <hr>
          <template v-for="(v,i) in payload.valve" :key="i">
            <div class="grid grid-cols-2 p-2">
            <div>
               <p>{{ v.name }}</p>
            </div>
            <div>
              <help-toggle
                v-model="v.stat"
                @change = "toggleValve($event, v)"
              />
            </div>
          </div>
          </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useToast } from 'vue-toastification';
import HelpToggle from '@/components/atoms/Toggle.vue';
import BtnIcon from '@/components/atoms/Icon.vue';
import API from '@/apis';
// import API from '@/apis';
import mixin from '@/mixin';

export default {
  name: 'Dashboard',
  mixins: [mixin],
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      payload: {
        isManual: false,
        valve: [],
      },
      lastFetch: '',
      deviceData: {
        weather: '',
        soil: '',
        watering: '',
        control: '',
      },
    };
  },
  components: {
    BtnIcon,
    HelpToggle,
  },
  computed: {},
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
          this.deviceData.weather = data.rainIntensity ? 'CLEAR' : 'RAIN';
          this.payload.isManual = data.isManual;
          this.payload.valve = data.valveStatus.split('|').map((el, i) => ({
            name: `Kran ${i + 1}`,
            stat: parseInt(el, 2) === 1,
          }));
          this.lastFetch = data.fetchTime;
        }
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async toggleStatus() {
      const payload = {
        mac: process.env.VUE_APP_DEVICE_MAC,
        is_manual: `${!this.payload.isManual}`,
      };
      const url = 'dashboard/update_device';
      try {
        const {
          data: { data },
        } = await API.post(url, payload);
        this.toast.success(`Berhasil Update Kontrol Menjadi ${data.isManual === 'true' ? 'Manual' : 'Otomatis'}`);
        this.fetchData();
      } catch (error) {
        if (error.message === 'Network Error') {
          this.toast.error("Error: Check your network or it's probably a CORS error");
        } else {
          this.toast.error(error.message);
        }
      }
    },
    async toggleValve($event, detail) {
      this.payload.valve.find((v) => v.name === detail.name).stat = $event;
      let valveStats = '';
      for (let i = 0; i < this.payload.valve.length; i += 1) {
        const state = this.payload.valve[i].stat ? '1' : '0';
        valveStats += state;
        if (i !== this.payload.valve.length - 1) {
          valveStats += '|';
        }
      }
      const payload = {
        mac: process.env.VUE_APP_DEVICE_MAC,
        valve_status: valveStats,
      };
      const url = 'dashboard/update_device';
      try {
        const {
          data: { data },
        } = await API.post(url, payload);
        this.toast.success(`Berhasil Ubah Posisi Kran ${detail.name}`);
        console.log(data);
        this.fetchData();
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

<style></style>
