import client from '../utils/axiosUtils'

export default {
  getAccount () {
    return client().get('account/')
  },
  getAccountResources () {
    return client().get('account/resources')
  },
  getAccountOrganisations(){
    return client().get('account/organisations')
  },
  syncAccount (idtoken,account) {
    return client().post('account/',{idToken:idtoken,account:account})
  }
}