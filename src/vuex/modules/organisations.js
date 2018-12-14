import organisationsApi from '../../api/organisations'
import Vue from 'vue'
// var jwtDecode = require('jwt-decode')

// initial state
const state = {
  usersOrganisations: {},
  organisations:{},
  usersOrganisationsLoading: false

}

// mutations
const mutations = {
  
  usersOrganisations(state,orgs){
    if (orgs) {
      orgs.forEach(res => {
        Vue.set(state.usersOrganisations, res.id, res)
        Vue.set(state.organisations, res.id, res)
      })
    }else{
      state.usersOrganisations={}
    }
  },
  usersOrganisatinosLoading(state,bool){
    state.usersOrganisationsLoading=bool
  },

}

const actions = {
  
}

const getters = {
  organisation: state => {
    return id => {
      return state.organisations[id] || null
    }
  }, 
  usersOrganisations: state => {
   return state.usersOrganisations
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
