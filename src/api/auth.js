import client from '../utils/axiosUtils'

export default {
  login (creds) {
    return client().post('auth/token', { email: creds.email, password: creds.password })
  },
  loginGuest () {
    return client().post('auth/token?guest', { data: {} })
  },
  resetPassword (email, username) {
    return client().post('auth/password', {email, username})
  },
  changePassword (userid, oldpassword, newpassword) {
    return client().put('auth/user/' + userid + '/password', { id: userid, old_password: oldpassword, new_password: newpassword })
  },
  checkUsernameAvailable (userName) {
    return client().get('auth/register/available?username=' + userName)
  }
}
