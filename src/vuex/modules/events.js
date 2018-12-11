import eventApi from '../../api/events'
import Vue from 'vue'

// initial state
const state = {
  events:{}
}

// mutations
const mutations = {
  events(state,data){
    if (data.resourceid&&data.events) {
        Vue.set(state.events, data.resourceid, data.events)
    }
  }
}

const actions = {
  loadEvents({commit},resourceid){
    eventApi.getEvents(resourceid)
      .then(response => {
 
        commit('events',{resourceid:resourceid,events:response.data})
      })
      .catch(e => {
        console.log('error loading events', e)
      })
  },
  loadEvent({commit},resourceid,evtid){
    eventApi.getEvent(evtid)
    .then(response => {
      commit('event', response.data)
    })
    .catch(e => {
      console.log('error loading event', e)
    })
  },
  createEvent({dispatch}, {event, resourceid}){
    return new Promise((resolve,reject) => {
      eventApi.postEvent(resourceid, event)
      .then(() => {
        dispatch('loadEvents', resourceid)
        resolve()
      })
      .catch(e => {
        console.log('error posting event', e)
        reject()
      })
    })
  }
}

const getters = {
  events: state => {
    return resourceid => {
      return state.events[resourceid] || null
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
