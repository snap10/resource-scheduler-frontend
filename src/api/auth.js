import client from '../utils/axiosUtils'

export default {
  login (creds,withOpenid) {
    var querystring=(withOpenid)?'?openid':''
    return client().post(`auth/token${querystring}`, { email: creds.email,username: creds.username, password: creds.password })
  },
  refreshAccessToken(refreshToken){
    return client().post(`auth/token?refresh`,refreshToken)
  },
  getUser (id) {
    if (!id) {
      console.error('userid hat not been provided to get user')
      return
    }
    return client().get('auth/user/' + id)
  },
  resetPassword (email, username) {
    return client().post('auth/password', {email, username})
  },
  changePassword (userid, oldpassword, newpassword) {
    return client().put('auth/user/' + userid + '/password', { id: userid, old_password: oldpassword, new_password: newpassword })
  },
  checkUsernameAvailable (userName) {
    return client().get('auth/usernameavailability?username=' + userName)
  }
}