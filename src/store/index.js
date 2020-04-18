import Vue from 'vue';
import Vuex from 'vuex';
import SpotifyApiService from '../services/spotify-api';
import StorageService from '../services/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: StorageService.getAccessToken(),
  },
  mutations: {
    logout(state) {
      state.loggedIn = false;
      StorageService.removeAccessToken();
    },
    login(state, token) {
      state.loggedIn = true;
      StorageService.saveAccessToken(token);
    },
  },
  actions: {
    goToSpotifyLogin() {
      window.location.href = `${SpotifyApiService.getLoginUrl()}&redirect_uri=${window.location.origin}`;
    },
  },
  modules: {
  },
});
