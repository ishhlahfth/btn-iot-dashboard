import { reactive } from 'vue';
import API from '@/apis';

const state = reactive({
  mini: true,
  modalState: {},
  screenWidth: 0,
});

const methods = {
  setMini(payload) {
    state.mini = payload;
  },
  setModalState(payload) {
    state.modalState = payload;
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
  translateStatus(value) {
    let translated = '';
    if (value) {
      switch (value) {
        case 'PENDING':
          translated = 'Pending Verifikasi';
          break;
        case 'FAIL':
          translated = 'Verifikasi Gagal';
          break;
        case 'SUCCESS':
          translated = 'Terverifikasi';
          break;
        case 'SUSPEND':
          translated = 'Akun Disabled';
          break;
        default:
          translated = '';
          break;
      }
    }
    return translated;
  },
  async loadImage(bnsURL) {
    let imageURL = '';
    try {
      const {
        request: { responseURL },
      } = await API.get(bnsURL);
      imageURL = responseURL;
    } catch (error) {
      console.log(error);
    }
    return imageURL;
  },
};

export default {
  state,
  methods,
};
