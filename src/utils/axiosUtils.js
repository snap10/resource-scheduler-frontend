import axios from 'axios'
import store from '../vuex/store'


axios.interceptors.request.use((config) => {
  console.log('intercepted', config)
  let originalRequest = config;
  if (store.access_token_expired && store.isLoggedIn) {
    return store.dispatch('refreshAccessToken').then((token) => {
      originalRequest['Authorization'] = 'Bearer ' + token;
      return Promise.resolve(originalRequest);
    });
  }
  return config;
}, (err) => {
  return Promise.reject(err);
});


export default () => {
  let token = localStorage.getItem('access_token')
  const defaultOptions = {
    baseURL: `/api/`,
    headers: {
        Authorization: token
    },
    
  }

  return {
    get: (url, options = {}) =>{
      return axios.get(url, {...defaultOptions, ...options})
    }, 
    post: (url, data, options = {}) => axios.post(url, data, {...defaultOptions, ...options}),
    put: (url, data, options = {}) => axios.put(url, data, {...defaultOptions, ...options}),
    delete: (url, options = {}) => axios.delete(url, {...defaultOptions, ...options})
  }
}

