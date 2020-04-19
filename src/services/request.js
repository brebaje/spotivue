import axios from 'axios';
import StorageService from './storage';

const RequestService = {
  // stores the 401 interceptor so that it can be later ejected if needed
  interceptor401: null,
  // stores a reference to vuex in order to avoid dependency cycle
  store: null,

  init(baseURL, store) {
    const token = StorageService.getAccessToken();
    axios.defaults.baseURL = baseURL;
    this.store = store;
    this.mount401Interceptor();

    if (token) {
      this.setHeader(token);
    }
  },

  setHeader(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },

  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },

  /**
   * Perform a custom axios request.
   *
   * data is an object containing the following properties:
   *  - method
   *  - url
   *  - data ... request payload
   * */
  customRequest(data) {
    return axios(data);
  },

  mount401Interceptor() {
    this.interceptor401 = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401 && this.store) {
          // handle access token expired
          this.store.dispatch('onTokenExpired');
        }
        else {
          throw error;
        }
      },
    );
  },
};

export default RequestService;
