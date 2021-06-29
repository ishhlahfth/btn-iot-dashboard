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
            translated = 'Tersedia';
            break;
          case 'UNAVAILABLE':
            translated = 'Habis';
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
    convertDateFormat(objDate, params) {
      // adjust 0 before single digit date
      const date = `0${objDate.getDate()}`.slice(-2);
      // current month
      const month = `0${objDate.getMonth() + 1}`.slice(-2);
      // current year
      const year = objDate.getFullYear();
      // current hours
      const hours = objDate.getHours();
      // current minutes
      const minutes = objDate.getMinutes();
      // current seconds
      const seconds = objDate.getSeconds();

      console.log(hours, 'hourssss');
      // 7 days ago
      switch (params) {
        case 'full':
          // prints date & time in YYYY-MM-DD HH:MM:SS format
          return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        default:
          return `${year}-${month}-${date}`;
      }
    },
    checkObjectBlank(obj) {
      let emptyCount = 0;
      Object.entries(obj).forEach(([, value]) => {
        if (value === '') emptyCount += 1;
      });
      const isAllKeysEmpty = emptyCount === Object.keys(obj).length;
      console.log(isAllKeysEmpty);
      return isAllKeysEmpty;
    },
    generatePhoneNumber(number) {
      const parts = number ? number.match(/.{1,4}/g) : '';
      const newValue = parts?.join('-') || '';
      return newValue || '';
    },
    truncate(input) {
      if (input.length > 30) {
        return `${input.substring(0, 30)} ...`;
      }
      return input;
    },
  },
};
