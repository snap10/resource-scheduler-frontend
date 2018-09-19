import client from '../utils/axiosUtils'
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
  getResourcesForOrganization(orgid) {
    if (!orgid) {
      console.error('id hat not been provided')
      return
    }
    return resources
    //return client().get(`organization/${orgid}/resources/`)
  },
  getOrganization(orgid){
    if (!orgid) {
      console.error('id hat not been provided')
      return
    }
    //return client().get(`organization/${orgid}`)
    return {
      id:"xyz",
      name: "TestOrg",
      created_at: 230923704,
      profile_picture_path: "path.to.image.de"
    }
  }

}