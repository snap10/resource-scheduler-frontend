import accountApi from '../../api/account'

// initial state
const state = {
  keycloak: {},
}

// mutations
const mutations = {
  setKeycloak(state,keycloak){
    state.keycloak=keycloak
  }
}

const actions = {
  logout ({ state,commit, dispatch }) {
    state.keycloak.logout()
  },
  loadUserAccount({commit},idtoken){
    return new Promise((resolve,reject) =>{
      accountApi.syncAccount(idtoken)
      .then(response =>{
          commit('usersResources', response.data.available_resources)
          commit('usersOrganisations', response.data.associated_organisations)
          resolve()
      })
      .catch(err =>{
          reject(err)
      })
    })
    
  }
}

const getters = {
  isLoggedIn: state => {
    return state.keycloak.authenticated
  },
  currentUser: state => {
    return state.keycloak.idTokenParsed
  },
  keycloak: state => {
    return state.keycloak
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
