import usersApi from '../../api/users'
import Vue from 'vue'
// initial state
const state = {
  users: [],
  usersLoadStatus: 0
}

// mutations
const mutations = {
  setUsersLoadStatus (state, status) {
    state.usersLoadStatus = status
  },
  setUsers (state, users) {
    if (users) {
      Object.keys(users).forEach(key => {
        Vue.set(state.users, users[key].id, users[key])
      })
    }
  },
  setUser (state, user) {
    if (user && user.id) Vue.set(state.users, user.id, user)
  }
}

const actions = {
  loadUsers ({commit}, data) {
    commit('setUsersLoadStatus', 1)

    usersApi.getUsers()
      .then(function (response) {
        commit('setUsers', response.data.data)
        commit('setUsersLoadStatus', 2)
      })
      .catch(function () {
        // commit('setUsers', {})
        commit('setUsersLoadStatus', 3)
      })
  }
}

const getters = {
  users: state => {
    return state.users
  },
  user: state => {
    return id => {
      return state.users[id] || null
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
