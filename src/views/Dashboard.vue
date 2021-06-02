<template>
  <div class="p-4 sm:p-6 grid gap-4 sm:gap-6">
    <div class="grid sm:grid-flow-col gap-4">
      <div class="w-full flex justify-between">
        <p class="text-heading2 font-semibold">Dashboard</p>
      </div>
      <div class="grid sm:grid-flow-col gap-2 sm:w-1/2-screen">
        <div class="grid gap-4 sm:flex sm:justify-end">
          <template v-if="!loading">
            <help-input type="date" />
            <help-icon
              name="minus"
              :class="[
                'mx-2 my-auto sm:visible',
                {
                  hidden: screenWidth < 640,
                },
              ]"
            />
            <help-input type="date" />
            <div
              :class="[
                'relative outline-none sm:ml-2',
                {
                  'w-2/5': screenWidth < 640,
                  'ml-auto': screenWidth < 640,
                },
              ]"
              :tabindex="0"
              @blur="opened = false"
            >
              <div
                class="bg-white flex justify-between items-center border border-grey-4 py-2.5 px-3 rounded-lg cursor-pointer select-none"
                :class="{ 'ring-2 ring-royal': opened }"
                @click="opened = !opened"
              >
                <p class="mr-2 truncate">{{ checkSelected(selected) }}</p>
                <help-icon name="selector" />
              </div>
              <help-option
                :class="{ hidden: !opened }"
                :options="options"
                :position="position"
                :selected="modelValue"
                @changeSelected="changeSelected"
              />
            </div>
          </template>
          <template v-else>
            <div class="h-8 animate-pulse bg-grey-4 sm:w-2/5 sm:ml-auto" />
            <div class="h-8 animate-pulse bg-grey-4 sm:w-2/5 sm:ml-auto" />
            <div class="h-8 animate-pulse bg-grey-4 w-2/5 ml-auto" />
          </template>
        </div>
      </div>
    </div>
    <div class="grid sm:grid-flow-col gap-4 mb-3">
      <summary-card :loading="loading" />
    </div>
  </div>
</template>

<script>
// import { VueDatePicker } from '@mathieustan/vue-datepicker';
import SummaryCard from '@/components/molecules/SummaryCard.vue';
import HelpIcon from '@/components/atoms/Icon.vue';
import HelpOption from '@/components/molecules/Option.vue';
import HelpInput from '../components/atoms/Input.vue';

export default {
  name: 'Dashboard',
  data() {
    return {
      loading: false,
      checkin: '',
      opened: false,
      options: ['Today', 'Yesterday', 'This Month', 'Last 7 Days', 'Last 30 Days'],
      modelValue: 'Today',
      position: ['bottom', 'right'],
    };
  },
  components: {
    SummaryCard,
    HelpOption,
    HelpIcon,
    HelpInput,
    // VueDatePicker,
  },
  computed: {
    selected: {
      get() {
        return !this.modelValue
          ? this.options.length > 0
            ? this.options[0]
            : null
          : this.modelValue;
      },
      set(value) {
        return value;
      },
    },
    screenWidth() {
      return this.$store.state.screenWidth;
    },
  },
  methods: {
    changeSelected(newItem) {
      this.modelValue = newItem;
      this.opened = false;
      this.$emit('update:modelValue', newItem);
    },
    checkSelected(selected) {
      let result = selected;
      if (selected && typeof selected === 'object') {
        result = selected.label;
      }
      return result;
    },
  },
};
</script>

<style></style>
