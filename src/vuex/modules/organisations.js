import organisationsApi from '../../api/organisations'
import Vue from 'vue'
// var jwtDecode = require('jwt-decode')

// initial state
const state = {
  organisations:{},
  usersOrganisationsLoading: false,
  organisationLoading:false

}

// mutations
const mutations = {
  saveOrganisation(state,organisation){
    if(organisation){
      Vue.set(state.organisations,organisation.id,organisation)
    } 
  },
  usersOrganisations(state,orgs){
    if (orgs) {
      orgs.forEach(res => {
        Vue.set(state.organisations, res.id, res)
      })
    }
  },
  usersOrganisatinosLoading(state,bool){
    state.usersOrganisationsLoading=bool
  }

}

const actions = {
  loadOrganisation ({commit},id){
    return new Promise((resolve,reject) =>{
      organisationsApi.getOrganisation(id)
      .then(response=>{
        if(response.data){
          commit('saveOrganisation',response.data)
          resolve(response.data)
        }else{
          throw Error('No content in response')
        }
      })
      .catch(err=>{
        console.error(err)
        reject(err)
      })
    })
  }
}

const getters = {
  organisation: state => {
    return id => {
      return state.organisations[id] || null
    }
  }, 
  organisations: state => {
   return state.organisations||{}
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}
