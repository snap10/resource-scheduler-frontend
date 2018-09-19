import client from '../utils/axiosUtils'
var resources ={
    1:{
      id: 1,
      responsible_person: "Mustermann",
      main_picture_url: 'https://ffw-baltringen.de/images/stories/testslide/fzg2008.jpg',
      name: 'Feuerwehrauto 1',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
     },
    2:{
      id: 2,
      responsible_person: "Musterfrau",
      main_picture_url: 'https://ffw-baltringen.de/images/stories/testslide/heim1.jpg',
      name: 'Umkleideraum',
      description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      }
}
export default {
  getResources() {
    //return client().get(`resources`)
    return new Promise((resolve,reject) =>{
      var response = {
       "data": Object.values(resources)
     }
      resolve(response)
   })
  },
  getResource(resourceid) {
    if(!resourceid){
      console.error('resourceid hat not been provided')
      return
    }
   //return client().get(`resources/${resourceid}`)
   return new Promise((resolve,reject) =>{
    var response = {
     "data": resources[resourceid]
   }
    resolve(response)
 })
  }

}