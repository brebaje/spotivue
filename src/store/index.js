import Vue from 'vue';
import Vuex from 'vuex';
import RequestService from '../services/request';
import SpotifyApiService from '../services/spotify-api';
import StorageService from '../services/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    error: false,
    loading: false,
    loggedIn: !!StorageService.getAccessToken(),
    user: null,
  },
  mutations: {
    logout(state) {
      state.loggedIn = false;
      StorageService.removeAccessToken();
    },
    login(state, token) {
      state.loggedIn = true;
      StorageService.saveAccessToken(token);
      // set access token in header for requests
      RequestService.setHeader(token);
    },
    setError(state) {
      state.error = true;
    },
    setLoading(state) {
      state.loading = true;
    },
    setUser(state, userData) {
      state.user = userData;
    },
    unsetError(state) {
      state.error = false;
    },
    unsetLoading(state) {
      state.loading = false;
    },
  },
  actions: {
    async getUser({ commit }) {
      commit('unsetError');
      commit('setLoading');

      try {
        const userData = await SpotifyApiService.getUserData();
        commit('setUser', userData.data);
      }
      catch (error) {
        commit('setError');
      }
      finally {
        commit('unsetLoading');
      }
    },
    goToSpotifyLogin() {
      window.location.href = `${SpotifyApiService.getLoginUrl()}&redirect_uri=${window.location.origin}`;
    },
  },
  modules: {
  },
});
