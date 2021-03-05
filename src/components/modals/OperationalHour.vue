<template>
  <div class="grid inner-modal-auto modal-md overflow-auto">
    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <template v-for="(schedule, i) in operationalHours" :key="i">
        <p class="text-grey-2">{{ schedule.day }}</p>
        <p class="place-self-end" v-if="schedule.open_hour && schedule.close_hour">
          {{ `${schedule.open_hour} - ${schedule.close_hour}` }}
        </p>
        <p class="place-self-end" v-else>Off</p>
      </template>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
// import axios from 'axios';

// = = DUMMY = =
import { seller as dummySeller } from '../../../dummy.json';
// = = DUMMY = =

export default {
  name: 'OperationalHour',
  setup() {
    // const store = inject('store');
    const operationalHours = ref([]);

    const getOperationalHours = async () => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      try {
        // = = REAL = =
        // const { data } = await axios.get(
        //   `http://localhost:3000/seller/${store.state.modalState.id}`,
        // );
        // operationalHours.value = data.operational_hours.map((el, i) => ({
        //   ...el,
        //   day: days[i],
        // }));
        // = = REAL = =

        // = = DUMMY = =
        operationalHours.value = dummySeller[0].operational_hours.map((el, i) => ({
          ...el,
          day: days[i],
        }));
        // = = DUMMY = =
      } catch (error) {
        console.log(error);
      }
    };

    onMounted(() => {
      getOperationalHours();
    });

    return {
      operationalHours,
    };
  },
};
</script>

<style></style>
