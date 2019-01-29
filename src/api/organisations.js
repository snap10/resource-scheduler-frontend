import client from '../utils/axiosUtils'
var organisationsApi = ""//"organisationsapi/"

export default {
  postOrganisation(org){
    if(!org){
      console.log('Object not specified')
    }
    return client().post(`${organisationsApi}organisations/`,org
    )
  },
  saveOrganisation(org){
    if(!org)      return Promise.reject('Object not specified')
    if(!org.id)      return Promise.reject('Object id not specified')
    return client().put(`${organisationsApi}organisations/${org.id}`,org)
  },
  postResource(resource){
    if(!resource){
      console.error('resource has not been provided')
      return
    }
    return client().post(`${organisationsApi}organisations/${resource.organisationsId}/resources`,resource)
  },
  getResourcesForOrganisation(orgid) {
    if (!orgid) {
      console.error('id had not been provided')
      return
    }
   return client().get(`${organisationsApi}organisations/${orgid}/resources/`)
  },
  getMembersForOrganisation(orgid) {
    if (!orgid) {
      console.error('id had not been provided')
      return
    }
   return client().get(`${organisationsApi}organisations/${orgid}/members/`)
  },
  deleteMemberForOrganisation(orgid,memberid) {
    if(!orgid)      return Promise.reject('Orgid not specified')
    if(!memberid)      return Promise.reject('Member id id not specified')
   return client().delete(`${organisationsApi}organisations/${orgid}/members/${memberid}`)
  },
  getJoinInvitations(orgid){
    if(!orgid) return Promise.reject('Orgid is not specified')
    return client().get(`${organisationsApi}organisations/${orgid}/joinInvitations/`)
  },
  inviteEmails(orgid,emails){
    if(!orgid) return Promise.reject('Orgid is not specified')
    if(!emails || emails.length==0) return Promise.reject('Emails Array is not present or empty')
    return client().post(`${organisationsApi}organisations/${orgid}/joinInvitations`,emails)
    
  },
  deleteJoinInvitationsForOrganisation(orgid,invid){
    if(!orgid)      return Promise.reject('Orgid not specified')
    if(!invid)      return Promise.reject('Member id id not specified')
   return client().delete(`${organisationsApi}organisations/${orgid}/joinInvitations/${invid}`)
  },
  getOrganisation(orgid){
    if (!orgid) {
      console.error('id had not been provided')
      return
    }
    return client().get(`${organisationsApi}organisations/${orgid}`)
  },
  getOrganisationsForUser(userid){
    if (!userid) {
      console.error('userid had not been provided')
      return
    }
    //return client().get(`${organizationsApi}organization/${orgid}`)
    return {
      id: 2,
      name: "TestOrg",
      created_at: 230923704,
      profile_picture_path: "path.to.image.de"
    }
  }

}