import reservationsAPI from '../../api/reservations'
import Vue from 'vue'

// initial state
const state = {
  events:{},
  currentEvent:null
}

// mutations
const mutations = {
  events(state,data){
    if (data.resourceid&&data.events) {
        Vue.set(state.events, data.resourceid, data.events)
    }
  },
  event(state,data){
    if (data.resourceid&&data.event) {
        state.currentEvent = data.event
    }
  }
}

const actions = {
  loadEvents({commit},resourceid,before,after){
     var p = reservationsAPI.getEvents(resourceid,before,after)
      .then(response => {
        commit('events',{resourceid:resourceid,events:response.data})
      })
      .catch(e => {
        console.log('error loading events', e)
      })
      return p
  },
  loadEvent({commit},resourceid,evtid){
    reservationsAPI.getEvent(resourceid,evtid)
    .then(response => {
      commit('event', {resourceid:resourceid,event:response.data})
    })
    .catch(e => {
      console.log('error loading event', e)
    })
  },
  createReservation({dispatch}, {reservation, resourceid}){
    return new Promise((resolve,reject) => {
      reservationsAPI.postReservation(resourceid, reservation)
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
  },
  currentEvent: state => {
    return state.currentEvent;
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
