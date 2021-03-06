import RequestService from './request';

const { VUE_APP_CLIENT_ID } = process.env;
const AUTHORIZE_URL = 'https://accounts.spotify.com/authorize';
const SCOPES = ['user-read-email'];

export default {
  getLoginUrl() {
    return `${AUTHORIZE_URL}?client_id=${VUE_APP_CLIENT_ID}&scope=${SCOPES.join('%20')}&response_type=token&show_dialog=true`;
  },
  getUserData() {
    return RequestService.get('/me');
  },
  searchFor(term) {
    const url = `/search?q=${term}&type=album,artist,track&limit=10`;
    return RequestService.get(url);
  },
  searchForNext(url) {
    return RequestService.customRequest({
      method: 'get',
      url,
    });
  },
  setAccessToken(token) {
    RequestService.setHeader(token);
  },
};
