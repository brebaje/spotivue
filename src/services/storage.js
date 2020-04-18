const TOKEN_KEY = 'spotify_token';

export default {
  getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeAccessToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  saveAccessToken(accessToken) {
    localStorage.setItem(TOKEN_KEY, accessToken);
  },
};
