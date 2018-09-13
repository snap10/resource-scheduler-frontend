import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/users'
import auth from './modules/auth'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    auth,
    users
  },
  strict: debug,
  state: {
    searchLatLng: null,
    mapCenter: null,
    mapBounds: null,
    zoom: 5
  },
  mutations: {},
  getters: {}
})
