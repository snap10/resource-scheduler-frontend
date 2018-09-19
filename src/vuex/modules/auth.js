import authApi from '../../api/auth'
import userApi from '../../api/users'
import Vue from 'vue'

var jwtDecode = require('jwt-decode')

// initial state
const state = {
  currentUser: {},
  usersResources:{},
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
  [types.LOGIN_SUCCESS] (state, user) {
    state.pendingLogin = false
    if (user){
      state.currentUser = user
      state.isLoggedIn=true
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
  },
  usersResources(state,resources){
    if (resources) {
      resources.forEach(res => {
        Vue.set(state.usersResources, res.id, res)
      })
    }
  },
  usersResourcesLoading(state,bool){
    state.usersResourcesLoading=bool
  }

}

const actions = {
  login ({ state, commit, rootState, dispatch }, creds) {
    console.log('login...', creds)
    commit(types.LOGIN) // show spinner
    authApi.login(creds,false)
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          var token=jwtDecode(response.data.access_token)
          console.log("Token",token)
          dispatch('loadCurrentUser',token.sub)
        })
        .catch(e => {
          console.log(e)
        })
  },
  loadCurrentUser ({ state, commit, rootState }, id) {
    return new Promise(resolve => {
      authApi.userinfo(id)
        .then(response => {
          localStorage.setItem('currentuser', JSON.stringify(response.data))
          commit(types.LOGIN_SUCCESS, response.data)
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
  },
  loadUsersResources({    state,commit  }) {
    commit('usersResourcesLoading', true)
    userApi.getResourcesForUser(state.currentUser.id)
      .then(response => {
        // JSON responses are automatically parsed.
        if (response.data) {
          commit('usersResources', response.data)
        }
        commit('usersResourcesLoading', false)
      })
      .catch(e => {
        console.error(e)
        commit('usersResourcesLoading', false)
      })
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  },
  currentUser: state => {
    return state.currentUser
  },
  usersResources: state => {
   return state.usersResources
  },
  tokenPresent: () => {
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
