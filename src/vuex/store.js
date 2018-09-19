import Vuex from 'vuex'
import Vue from 'vue'
import users from './modules/users'
import auth from './modules/auth'
import resources from './modules/resources'
import organizations from './modules/organizations'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth,
    users,
    organizations,
    resources
  },
  strict: debug
})
