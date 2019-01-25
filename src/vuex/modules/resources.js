import resourceApi from '../../api/resources'
import accountApi from '../../api/account'
import organisationsApi from '../../api/organisations'
import Vue from 'vue'

// initial state
const state = {
  resources:{},
  usersResourcesLoading: false


}

// mutations
const mutations = {
  resources(state,resources){
    if (resources) {
      resources.forEach(res => {
        Vue.set(state.resources, res.id, res)

      })
    }
  },
  resource(state,resource){
    if(resource){
      Vue.set(state.resources,resource.id,resource)
    }
  },
  usersResourcesLoading(state,bool){
    state.usersResourcesLoading=bool
  },
}

const actions = {
  loadResources(){

  },
  loadResource({commit},id){
    resourceApi.getResource(id)
    .then(response => {
      commit('resource', response.data)
    })
    .catch(e => {
      console.log('error loading resource', e)
    })
  },
  loadUsersResources({state,commit  }) {
    commit('usersResourcesLoading', true)
    accountApi.getResourcesForUser(state.keycloak.idTokenParsed.sub)
      .then(response => {
        // JSON responses are automatically parsed.
        if (response.data) {
          commit('resources', response.data)
        }
        commit('usersResourcesLoading', false)
      })
      .catch(e => {
        console.error(e)
        commit('usersResourcesLoading', false)
      })
  },
  loadResourcesForOrganisation({commit},orgid){
    return new Promise((resolve,reject)=>{
      organisationsApi.getResourcesForOrganisation(orgid)
    .then(response=>{
      if(response.data){
        commit('resources',response.data)
        resolve(response.data)
      }else{
        throw Error('No Responsedata')
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
  resource: state => {
    return id => {
      return state.resources[id] || null
    }
  },
  resources: state =>{
    return state.resources||{}
  },
  organisationResources: state =>{
    return orgid =>{
      return Object.values(state.resources).filter(res=> res.organisationId===orgid)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
