import { createStore } from 'vuex';
export default createStore({
  state: {
    accessToken: null,
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
  },
  actions: {
    login({ commit }, token) {
      commit('setAccessToken', token);
    },
  },
});