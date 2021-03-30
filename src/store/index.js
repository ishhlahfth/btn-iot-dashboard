import { createStore } from 'vuex';
import API from '@/apis';

export default createStore({
  state: {
    screenWidth: 0,
    mini: true,
    merchantId: 0,
    merchant: {},
    item: {},
    opHour: [],
    verifDetail: {},
    commissionDetail: {},
    loading: {
      merchant: false,
    },
  },
  mutations: {
    SET_SCREEN_WIDTH(state, payload) {
      state.screenWidth = payload;
    },
    SET_MINI(state, payload) {
      state.mini = payload;
    },
    SET_MERCHANT_ID(state, payload) {
      state.merchantId = payload;
    },
    SET_MERCHANT(state, payload) {
      state.merchant = payload;
    },
    SET_ITEM(state, payload) {
      state.item = payload;
    },
    SET_OP_HOUR(state, payload) {
      state.opHour = payload;
    },
    SET_VERIF_DETAIL(state, payload) {
      state.verifDetail = payload;
    },
    SET_COMMISSION_DETAIL(state, payload) {
      state.commissionDetail = payload;
    },
    SET_LOADING(state, { type, payload }) {
      state.loading[type] = payload;
    },
  },
  actions: {
    async loadMerchant({ commit, dispatch }, merchantId) {
      commit('SET_LOADING', { type: 'merchant', payload: true });
      let merchant = {};
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${merchantId}`);

        merchant = {
          name: data.name,
          city: data.address?.city.name,
          bank: data.account?.bank.name,
          verificationStatus: data.verify_status,
          summary: {
            canceled: data.total_summary?.canceled_order,
            completed: data.total_summary?.completed,
            deliveryFailed: data.total_summary?.delivery_failed,
            paymentExpired: data.total_summary?.payment_expired,
            paymentFailure: data.total_summary?.payment_failure,
            refunded: data.total_summary?.refunded_order,
            rejected: data.total_summary?.rejected_order,
            sold: data.total_summary?.sold_items,
          },
          menu: [],
        };
        if (data.banners?.length) {
          merchant.imageUrl = await dispatch('loadImage', data.banners[0].url);
        }

        const {
          data: { data: KTP },
        } = await API.get(`merchants/${merchantId}/sellers`);

        if (KTP.length) {
          merchant.idNumber = KTP[0].profile.identity_number || '-';
        }

        const {
          data: { data: catalogs },
        } = await API.get(`merchants/${merchantId}/catalogs`);

        for (let i = 0; i < catalogs.length; i += 1) {
          const {
            data: { data: items },
          } = await API.get(
            `catalogs/${catalogs[i].id}/items?status=AVAILABLE,UNAVAILABLE,OUT_OF_STOCK,SUSPEND,HIDDEN`,
          );
          merchant.menu.push({ catalog_name: catalogs[i].name, items });
        }

        commit('SET_MERCHANT', merchant);
      } catch (error) {
        console.log(error);
      }
      commit('SET_LOADING', { type: 'merchant', payload: false });
    },
    async loadImage(_, bnsURL) {
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
    // async loadKTP(_, )
    translateItemStatus(_, value) {
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
    groupDigit(_, value) {
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
    convertToRp({ dispatch }, value) {
      return `Rp ${dispatch('groupDigit', value)}`;
    },
  },
  modules: {},
});
