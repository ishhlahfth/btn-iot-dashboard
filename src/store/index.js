import { createStore } from 'vuex';
import { useToast } from 'vue-toastification';
import createPersistedState from 'vuex-persistedstate';
import dayjs from 'dayjs';
import API from '../apis';
import access from './access';

export default createStore({
  state: {
    currentUser: {},
    screenWidth: 0,
    mini: true,
    merchantId: 0,
    agentId: 0,
    merchantName: '',
    merchant: {},
    item: {},
    opHour: [],
    verifDetail: {},
    commissionDetail: {},
    orderId: 0,
    bannerId: 0,
    roleId: 0,
    userId: 0,
    banner: {},
    formType: '',
    loading: {
      merchant: false,
      conductTransfer: false,
    },
    resetPasswordToken: '',
    permissions: [],
    roleAdmin: [],
    role: {},
    roleType: '',
    adminDetail: {},
    imageProfile: '',
  },
  mutations: {
    SET_CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },
    SET_SCREEN_WIDTH(state, payload) {
      state.screenWidth = payload;
    },
    SET_MINI(state, payload) {
      state.mini = payload;
    },
    SET_MERCHANT_ID(state, payload) {
      state.merchantId = payload;
    },
    SET_AGENT_ID(state, payload) {
      state.agentId = payload;
    },
    SET_MERCHANT_NAME(state, payload) {
      state.merchantName = payload;
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
    SET_ORDER_ID(state, payload) {
      state.orderId = payload;
    },
    SET_BANNER_ID(state, payload) {
      state.bannerId = payload;
    },
    SET_ROLE_ID(state, payload) {
      state.roleId = payload;
    },
    SET_USER_ID(state, payload) {
      state.userId = payload;
    },
    SET_BANNER(state, payload) {
      state.banner = payload;
    },
    SET_FORM_TYPE(state, payload) {
      state.formType = payload;
    },
    SET_LOADING(state, { type, payload }) {
      state.loading[type] = payload;
    },
    SET_RESET_PASSWORD_TOKEN(state, payload) {
      state.resetPasswordToken = payload;
    },
    SET_PERMISSIONS(state, payload) {
      state.permissions = payload;
    },
    SET_ROLE(state, payload) {
      state.role = payload;
    },
    SET_ROLE_TYPE(state, payload) {
      state.roleType = payload;
    },
    SET_ADMIN_DETAIL(state, payload) {
      state.adminDetail = payload;
    },
    SET_ADMIN_LIST(state, payload) {
      state.roleAdmin = payload;
    },
    SET_IMAGE_PROFILE(state, payload) {
      state.imageProfile = payload;
    },
  },
  actions: {
    async loadMerchant({ commit }, merchantId) {
      commit('SET_LOADING', { type: 'merchant', payload: true });
      let merchant = {};
      try {
        const {
          data: { data },
        } = await API.get(`merchants/${merchantId}`);

        merchant = {
          merchant_id: data.id,
          name: data.name,
          phoneNumber: data.phone_number,
          address: `${data.address?.line_address}, ${data.address?.district}, ${data.address?.city.name}, ${data.address?.state} ${data.address?.zip_code}`,
          location: data.location.coordinates,
          bank: data.account?.bank.name,
          verificationStatus: data.verify_status,
          verificationDate: dayjs(data.verify_date).format('DD-MM-YYYY HH:mm:ss'),
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
          merchant.imageUrl = data.banners[0].image_url;
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
        useToast().error(error.message);
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
        useToast().error(`${error.message} - assadsadsad`);
      }
      return imageURL;
    },
    // async loadKTP(_, )
    translateItemStatus(_, value) {
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
  modules: {
    access,
  },
  plugins: [createPersistedState()],
});
