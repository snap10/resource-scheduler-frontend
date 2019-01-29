import accountApi from '../../api/account'
import authApi from '../../api/auth'
import jwtDecode from 'jwt-decode'



var refreshDataFromTokens = () => {
  try {
    user = jwtDecode(localStorage.getItem('id_token'))

  } catch {
    user = null
  }
  try {
    access_token = jwtDecode(localStorage.getItem('access_token'))
  } catch {
    access_token = null
  }
  try {
    refresh_token = jwtDecode(localStorage.getItem('refresh_token'))
  } catch {
    refresh_token = null
  }

  return {
    user: user,
    access_token: access_token,
    refresh_token: refresh_token
  }

}
// initial state
var initialData = refreshDataFromTokens()
var user
var access_token
var refresh_token

const state = {
  currentUser: initialData.user,
  access_token: initialData.access_token,
  refresh_token: initialData.refresh_token,
  pendingLogin: false,
  account: {
    loaded: false
  }
}

// mutations
const mutations = {
  login(state) {
    state.pendingLogin = true
  },
  loginSuccess(state) {
    state.pendingLogin = false
    var data = refreshDataFromTokens()
    state.currentUser = data.user
    state.access_token = data.access_token
    state.refresh_token = data.refresh_token
  },
  logout(state) {
    state.isLoggedIn = false
    state.currentUser = null
    state.access_token = null
    state.refresh_token = null

  },
  setCurrentUser(state, user) {
    state.currentUser = user
    if (user.role_level !== 'guest') {
      state.isLoggedIn = true
    } else {
      state.isLoggedIn = false
    }
  },
  setAccount(state, account) {
    state.account.userInformation = account.userInformation
    state.account.resourceIds = account.resourceIds
    state.account.loaded = true
  }
}

const actions = {
  login({
    commit,
    dispatch
  }, creds) {
    commit('login') // show spinner
    return new Promise((resolve, reject) => {
      authApi.login(creds, true)
        .then(response => {
          // JSON responses are automatically parsed.
          localStorage.setItem('id_token', response.data.id_token)
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          var decoded = jwtDecode(response.data.id_token)
          if (decoded) commit('loginSuccess', decoded)
          dispatch('loadUserAccount')
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  logout({
    commit
  }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('id_token')
    commit('logout')
  },
  loadUserAccount({
    commit
  }) {
    return new Promise((resolve, reject) => {
      accountApi.getAccount()
        .then(response => {
          commit('setAccount', {
            resourceIds: response.data.availableResourceIds,
            userInformation: response.data.userInformation
          })
          resolve()
        })
        .catch(err => {
            reject(err)
        })
    })

  },
  refreshAccessToken({commit}){
    return new Promise((resolve,reject)=>{
      var refresh_token = localStorage.getItem('refresh_token')
        authApi.refreshAccessToken({refresh_token:refresh_token})
        .then(response => {
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          commit('tokenRefresh', response.data)
          resolve()
        })
        .catch(() => {
          reject()
        })
    })
  }
}

const getters = {
  isLoggedIn: state => {
    var notExpired = (state.refresh_token) ? Math.floor(new Date().getTime() / 1000) < state.refresh_token.exp : false
    return notExpired
  },
  access_token_expired: state => {
    var notExpired = (state.access_token) ? Math.floor(new Date().getTime() / 1000) < state.access_token.exp : false
    return !notExpired
  },

  currentUser: state => {
    return state.currentUser
  },
  account: state => {
    return state.account
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}