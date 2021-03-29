export default {
  methods: {
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
    translateItemStatus(value) {
      console.log('TRANSLATE', value);
      let translated = '';
      if (value) {
        switch (value) {
          case 'AVAILABLE':
            translated = 'Available';
            break;
          case 'UNAVAILABLE':
            translated = 'Unavailable';
            break;
          case 'HIDDEN':
            translated = 'Hidden';
            break;
          case 'OUT_OF_STOCK':
            translated = 'Out of Stock';
            break;
          case 'SUSPEND':
            translated = 'Suspend';
            break;
          default:
            translated = '';
            break;
        }
      }
      return translated;
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
  },
};
