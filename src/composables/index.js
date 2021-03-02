import { reactive } from 'vue';

const state = reactive({
  mini: true,
});

const methods = {
  setMini(value) {
    state.mini = value;
  },
  groupDigit(value) {
    let grouped = value;
    if (value) {
      if (!Number.isNaN(Number(value)) || value !== 'NaN') {
        grouped = +value;
        if (value % 1 !== 0) {
          grouped = value.toFixed(0);
        }
        return grouped.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
    }
    return '0';
  },
  convertToRp(value) {
    return `Rp ${this.groupDigit(value)}`;
  },
};

export default {
  state,
  methods,
};
