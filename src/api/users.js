import client from '../utils/axiosUtils'

export default {
  getUsers () {
    return client().get('accounts/user')
  },
  getUser (id) {
    if (!id) {
      console.error('id hat not been provided to get user')
      return
    }
    //return client().get('account/user/' + id)
    return new Promise((resolve) =>{
      var response = {
       "data": {
        id: id,
        organisations: []
        }
      }
      resolve(response)
   })
  },
  updateUser (id, userObject) {
    if (!id) {
      console.error('id had not been provided to get user')
      return
    }
    return client().put('accounts/user/' + id, userObject)
  },
  getResourcesForUser(userid) {
    if (!userid) {
      console.error('id had not been provided')
      return
    }
    //return client().get(`accounts/user/${userid}/resources`)
    return new Promise((resolve) =>{
      var response = {
       "data": [{
        id: 1,
        responsible_person: "Mustermann",
        main_picture_url: 'https://ffw-baltringen.de/images/stories/testslide/fzg2008.jpg',
        name: 'Feuerwehrauto 1',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      
      }, {
        id: 2,
        responsible_person: "Musterfrau",
        main_picture_url: 'https://ffw-baltringen.de/images/stories/testslide/heim1.jpg',
        name: 'Umkleideraum',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
      }]
     }
      resolve(response)
   })

  }
}
