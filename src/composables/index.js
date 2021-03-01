import { reactive } from 'vue';

const state = reactive({
  mini: true,
});

const methods = {
  setMini(value) {
    state.mini = value;
  },
};

export default {
  state,
  methods,
};
