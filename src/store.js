import Vuex from 'vuex'
import Vue from 'vue'
import {client} from './utils/axiosUtils'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isLoggedIn: localStorage.getItem('token')
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({
      state,
      commit,
      rootState
    }, creds) {
      console.log('login...', creds)
      commit(LOGIN) // show spinner
      return new Promise(resolve => {
        client().post('auth/login', {data: {email: creds.email, password: creds.password}})
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.setItem('token', response.data.data.token)
          localStorage.setItem('currentuser', response.data.data.user)
          commit(LOGIN_SUCCESS)
          resolve()
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
      })
    },
    logout ({
      commit
    }) {
      localStorage.removeItem('token')
      localStorage.removeItem('currentuser')
      commit(LOGOUT)
    }
  },
  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    }
  }
})

