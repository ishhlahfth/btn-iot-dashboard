<template>
  <div class="grid inner-modal-auto modal-md overflow-auto">
    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <template v-for="(schedule, i) in operationalHours" :key="i">
        <p class="text-grey-2">{{ schedule.day }}</p>
        <p class="place-self-end" v-if="schedule.openHour && schedule.closeHour">
          {{ `${beautify(schedule.openHour)} - ${beautify(schedule.closeHour)}` }}
        </p>
        <p class="place-self-end" v-else>Off</p>
      </template>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  name: 'OperationalHour',
  setup() {
    const store = inject('store');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const operationalHours = store.state.modalState.operationalHours;

    for (let i = 0; i < 7; i += 1) {
      let hasDayProperty = false;

      operationalHours.forEach((el) => {
        if (i === el.dayOfWeek) hasDayProperty = true;
      });

      if (!hasDayProperty) {
        operationalHours.push({
          openHour: null,
          closeHour: null,
          dayOfWeek: i,
        });
      }
    }

    const beautify = (raw) => {
      let beautified = '';
      if (raw) {
        beautified = `${raw.substring(0, 2)}:${raw.substring(2, 4)}`;
      }
      return beautified;
    };

    return {
      operationalHours: operationalHours
        .map((el) => ({ ...el, day: days[el.dayOfWeek] }))
        .sort((a, b) => a.dayOfWeek - b.dayOfWeek),
      beautify,
    };
  },
};
</script>

<style></style>
