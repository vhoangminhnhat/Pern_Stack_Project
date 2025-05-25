import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL!,
  timeout: 60000,
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('thesis-cms-token');
    const request = config;

    if (token) {
      request.headers = {
        Authorization: `Bearer ${token}`,
      } as any;
    }

    return config;
  },
  error => Promise.reject(error),
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Return JSON data
    if (response.data) {
      return response.data;
    }
    return response;
  },
  error => {
    // Attempt to get the actual error returned from API
    const err = error.response || error;
    if (error?.response?.status === 403) {
      if (!!localStorage.getItem('thesis-cms-token')) {
        localStorage.clear();
        window.location.href = '/login'; //relative to domain
      }
    }
    return Promise.reject(err.data); // Propagate rejection back to caller
  },
);

export default api;
