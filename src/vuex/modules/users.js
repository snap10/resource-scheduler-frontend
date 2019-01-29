import usersApi from '../../api/users'
import organisationsApi from '../../api/organisations'
import Vue from 'vue'

// initial state
const state = {
  users: [],
  usersLoadStatus: 0
}

// mutations
const mutations = {
  setUsersLoadStatus(state, status) {
    state.usersLoadStatus = status
  },
  setUsers(state, users) {
    if (users) {
      Object.keys(users).forEach(key => {
        Vue.set(state.users, users[key].id, users[key])
      })
    }
  },
  setUser(state, user) {
    if (user && user.id) Vue.set(state.users, user.id, user)
  }

}

const actions = {
  loadUsers({
    commit
  }) {
    commit('setUsersLoadStatus', 1)

    usersApi.getUsers()
      .then(function (response) {
        commit('setUsers', response.data)
        commit('setUsersLoadStatus', 2)
      })
      .catch(function () {
        // commit('setUsers', {})
        commit('setUsersLoadStatus', 3)
      })
  },
  getMembersForOrganisation({commit},orgid){
    commit('setUsersLoadStatus', 1)
    return new Promise((resolve,reject) =>{
      organisationsApi.getMembersForOrganisation(orgid)
      .then(response=>{
        if(response.data){
          commit('setUsers',response.data)
          commit('setUsersLoadStatus', 2)
          resolve(response.data)
        }else{
          throw Error('No content in response')
        }
      })
      .catch(err=>{
        console.error(err)
        commit('setUsersLoadStatus', 3)
        reject(err)
      })
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
  },
  usersFiltered: state=>{
    return idList=>{
      return Object.values(state.users).filter(user => idList.indexOf(user.id)>-1)
    }
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}