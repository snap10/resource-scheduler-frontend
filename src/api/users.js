import client from '../utils/axiosUtils'

export default {
  getUsers () {
    return client().get('account/user')
  },
  getUser (id) {
    if (!id) {
      console.error('userid hat not been provided to get user')
      return
    }
    return client().get('account/user/' + id)
  },
  updateUser (id, userObject) {
    if (!id) {
      console.error('userid hat not been provided to get user')
      return
    }
    return client().put('account/user/' + id, userObject)
  }
}
