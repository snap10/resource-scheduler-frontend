import axios from 'axios'
import store from '../vuex/store'

export default () => {
  var token  = store.getters.keycloak.authenticated ? `Bearer ${store.getters.keycloak.token}` : ''
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

