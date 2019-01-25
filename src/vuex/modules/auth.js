import accountApi from '../../api/account'

// initial state
const state = {
  keycloak: {},
  account:{
    loaded:false
  }
}

// mutations
const mutations = {
  setKeycloak(state,keycloak){
    state.keycloak=keycloak
  },
  setAccount(state,account){
    state.account.organisations=account.organisations
    state.account.resourceIds = account.resourceIds
    state.account.loaded=true
  }
}

const actions = {
  logout ({ state}) {
    state.keycloak.logout()
  },
  loadUserAccount({commit},idtoken){
    return new Promise((resolve,reject) =>{
      accountApi.syncAccount(idtoken)
      .then(response =>{
          commit('setAccount', {organisations:response.data.associatedOrganisationIds,
          resourceIds: response.data.availableResourceIds})
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
  account: state=>{
    return state.account
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
