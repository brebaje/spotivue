import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import SpotifyApiService from '../services/spotify-api';
import StorageService from '../services/storage';

Vue.use(Vuex);

const SESSION_EXPIRED_ERROR = 'Session expired, please sign in again';
const UNEXPECTED_ERROR = 'Something went wrong, please try again';
const USER_FETCH_ERROR = 'Error fetching user data, please try signing in again';

export default new Vuex.Store({
  state: {
    alertDismissed: true,
    error: false,
    errorMessage: null,
    lastSearchTerm: null,
    loading: false,
    loggedIn: !!StorageService.getAccessToken(),
    searchResults: null,
    user: null,
  },
  mutations: {
    hideAlert(state) {
      state.alertDismissed = true;
    },
    logout(state) {
      state.loggedIn = false;
      StorageService.removeAccessToken();
    },
    login(state, token) {
      state.loggedIn = true;
      StorageService.saveAccessToken(token);
      // set access token in header for requests
      SpotifyApiService.setAccessToken(token);
    },
    setError(state, message) {
      state.alertDismissed = false;
      state.error = true;
      state.errorMessage = message || UNEXPECTED_ERROR;
    },
    setLastSearchTerm(state, term) {
      state.lastSearchTerm = term;
    },
    setLoading(state) {
      state.loading = true;
    },
    setSearchResults(state, data) {
      // since data isn't going to change, we freeze the objects for performance
      state.searchResults = Object.freeze(data);
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
        if (userData && userData.data) {
          commit('setUser', userData.data);
        }
      }
      catch (error) {
        commit('logout');
        commit('setError', USER_FETCH_ERROR);
        router.replace('login');
      }
      finally {
        commit('unsetLoading');
      }
    },
    async getSearchResults({ commit }, searchTerm) {
      commit('unsetError');
      commit('setLoading');

      try {
        const searchData = await SpotifyApiService.searchFor(searchTerm);
        if (searchData && searchData.data) {
          commit('setLastSearchTerm', searchTerm);
          commit('setSearchResults', searchData.data);
        }
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
    onTokenExpired({ commit }) {
      commit('logout');
      commit('setError', SESSION_EXPIRED_ERROR);
      router.replace('/login');
    },
  },
  modules: {
  },
});
