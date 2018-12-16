import client from '../utils/axiosUtils'
var organisationsApi = ""//"organisationsapi/"
var resources =[{
  id: 1,
  responsible_person: "Mustermann",
  url: 'https://ffw-baltringen.de/images/stories/testslide/fzg2008.jpg',
  name: 'Feuerwehrauto 1',
  description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

}, {
  id: 2,
  responsible_person: "Musterfrau",
  url: 'https://ffw-baltringen.de/images/stories/testslide/heim1.jpg',
  name: 'Umkleideraum',
  description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
}]
export default {
  postOrganisation(org){
    if(!org){
      console.log('Object not specified')
    }
    return client().post(`${organisationsApi}organisations/`,org
    )
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