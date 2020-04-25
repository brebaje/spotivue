import Vue from 'vue';
import Vuex from 'vuex';
import router from '../router';
import SpotifyApiService from '../services/spotify-api';
import StorageService from '../services/storage';

Vue.use(Vuex);

const HISTORY_LIMIT = 5;
const SESSION_EXPIRED_ERROR = 'Session expired, please sign in again';
const UNEXPECTED_ERROR = 'Something went wrong, please try again';
const USER_FETCH_ERROR = 'Error fetching user data, please try signing in again';

export default new Vuex.Store({
  state: {
    alertDismissed: true,
    error: false,
    errorMessage: null,
    lastSearches: [],
    lastSearchTerm: null,
    loading: false,
    loggedIn: !!StorageService.getAccessToken(),
    resultsFilters: ['artists', 'albums', 'tracks'],
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
    removeRecentSearch(state, searchTerm) {
      if (state.lastSearches.includes(searchTerm)) {
        state.lastSearches.splice(state.lastSearches.indexOf(searchTerm), 1);
      }
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
    setResultsFilters(state, activeFilters) {
      state.resultsFilters = activeFilters;
    },
    setSearchResults(state, data) {
      // since data isn't going to change, we freeze the objects for performance
      state.searchResults = Object.freeze(data);
    },
    setUser(state, userData) {
      state.user = userData;
    },
    updateRecentSearches(state, searchTerm) {
      if (!state.lastSearches.includes(searchTerm)) {
        // array full, remove the oldest search term
        if (state.lastSearches.length === HISTORY_LIMIT) {
          state.lastSearches.shift();
        }
      }
      else {
        // remove already existent search term to put it back in as last one
        state.lastSearches.splice(state.lastSearches.indexOf(searchTerm), 1);
      }

      state.lastSearches.push(searchTerm);
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
          commit('updateRecentSearches', searchTerm);
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
