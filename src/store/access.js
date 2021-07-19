const state = {
  access: {},
  redirect: [],
};

const mutations = {
  setAccess(stateAccess, payload) {
    stateAccess.access = payload;
  },
  setRedirect(stateRedirect, payload) {
    stateRedirect.redirect = payload;
  },
};

export default {
  state,
  mutations,
};
