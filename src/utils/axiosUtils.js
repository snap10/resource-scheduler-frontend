import axios from 'axios'
import store from '../vuex/store'

export default () => {
  const defaultOptions = {
    baseURL: `http://localhost/api/`,
    headers: {
      Authorization: store.getters.isLoggedIn ? `Token ${localStorage.getItem('token')}` : ''
    }
  }

  return {
    get: (url, options = {}) => axios.get(url, {...defaultOptions, ...options}),
    post: (url, data, options = {}) => axios.post(url, data, {...defaultOptions, ...options}),
    put: (url, data, options = {}) => axios.put(url, data, {...defaultOptions, ...options}),
    delete: (url, options = {}) => axios.delete(url, {...defaultOptions, ...options})
  }
}

