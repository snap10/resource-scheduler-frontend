import resourceApi from '../../api/resources'
import Vue from 'vue'

// initial state
const state = {
  resources:{}
}

// mutations
const mutations = {
  resources(state,resources){
    if (resources) {
      resources.forEach(res => {
        Vue.set(state.usersResources, res.id, res)
      })
    }
  },
  resource(state,resource){
    if(resource){
      Vue.set(state.resources,resource.id,resource)
    }
  }
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
      console.log('error loading currentUser', e)
    })
  }
}

const getters = {
  resource: state => {
    return id => {
      return state.resources[id] || null
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
