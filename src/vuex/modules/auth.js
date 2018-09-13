import authApi from '../../api/auth'
import userApi from '../../api/users'
// var jwtDecode = require('jwt-decode')

// initial state
const state = {
  currentUser: null,
  isLoggedIn: false,
  pendingLogin: false
}
const types = {
  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGOUT: 'LOGOUT'
}

// mutations
const mutations = {
  [types.LOGIN] (state) {
    state.pendingLogin = true
  },
  [types.LOGIN_SUCCESS] (state, guest, user) {
    state.pendingLogin = false
    if (guest) {
      state.isLoggedIn = false
    } else {
      state.isLoggedIn = true
      state.currentUser = user
    }
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false
    state.currentUser = null
  },
  setCurrentUser (state, user) {
    state.currentUser = user
    if (user.role_level !== 'guest') {
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
  }
}

const actions = {
  login ({ state, commit, rootState }, creds) {
    console.log('login...', creds)
    commit(types.LOGIN) // show spinner
    return new Promise(resolve => {
      authApi.login(creds)
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('currentuser', JSON.stringify(response.data.user))
          commit(types.LOGIN_SUCCESS, response.data.user)
          resolve()
        })
        .catch(e => {
          console.log(e)
        })
    })
  },
  loadCurrentUser ({ state, commit, rootState }, id) {
    return new Promise(resolve => {
      userApi.getUser(id)
        .then(response => {
          localStorage.setItem('currentuser', JSON.stringify(response.data))
          commit(types.LOGIN_SUCCESS, response.data.data)
          resolve()
        })
        .catch(e => {
          console.log('error loading currentUser', e)
        })
    })
  },
  loginGuest ({ state, commit, rootState }) {
    console.log('login guest...')
    commit(types.LOGIN) // show spinner
    return new Promise(resolve => {
      authApi.loginGuest()
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.setItem('access_token', response.data.access_token)
          commit(types.LOGIN_SUCCESS, true)
          resolve()
        })
        .catch(e => {
          console.log(e)
        })
    })
  },
  logout ({ commit, dispatch }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('currentuser')
    dispatch('loginGuest')
    // TODO loginGuest
    commit(types.LOGOUT)
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  currentUser: state => {
    return state.currentUser
  },
  tokenPresent: state => {
    console.log('user is present, check for token')
    return (localStorage.getItem('access_token') || false)
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
