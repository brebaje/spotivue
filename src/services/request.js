import axios from 'axios';
import StorageService from './storage';

const RequestService = {
  init(baseURL) {
    const token = StorageService.getAccessToken();
    axios.defaults.baseURL = baseURL;

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
};

export default RequestService;
