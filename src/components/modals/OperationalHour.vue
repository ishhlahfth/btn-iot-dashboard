<template>
  <div class="grid gap-6 inner-modal-auto modal-md overflow-auto">
    <div class="flex justify-between items-center">
      <p class="text-heading4 font-semibold">{{ merchantName }}</p>
      <help-button
        icon-only
        icon="close"
        bg-color="transparent"
        color="grey-1"
        @click="$emit('close')"
      />
    </div>

    <div class="grid grid-cols-2 auto-rows-max gap-4 sm:gap-6 font-medium">
      <template v-for="(schedule, i) in operationalHours" :key="i">
        <p class="text-grey-2">{{ schedule.day }}</p>
        <p class="place-self-end" v-if="schedule.openHour && schedule.closeHour">
          {{ `${beautify(schedule.openHour)} - ${beautify(schedule.closeHour)}` }}
        </p>
        <p class="place-self-end text-flame" v-else>Off</p>
      </template>
    </div>
  </div>
</template>

<script>
import HelpButton from '@/components/atoms/Button.vue';

export default {
  name: 'OperationalHour',
  components: {
    HelpButton,
  },
  data() {
    return {
      operationalHours: [],
    };
  },
  methods: {
    beautify(raw) {
      let beautified = '';
      if (raw) {
        beautified = `${raw.substring(0, 2)}:${raw.substring(2, 4)}`;
      }
      return beautified;
    },
  },
  computed: {
    opHour() {
      return this.$store.state.opHour;
    },
    merchantName() {
      return this.$store.state.merchantName;
    },
  },
  mounted() {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const operationalHours = [...this.opHour];

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

    this.operationalHours = operationalHours
      .map((el) => ({ ...el, day: days[el.dayOfWeek] }))
      .sort((a, b) => a.dayOfWeek - b.dayOfWeek);
  },
};
</script>

<style></style>
