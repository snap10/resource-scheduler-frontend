import client from '../utils/axiosUtils'

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
  },
  postResource(resource){
    if(!resource){
      console.error('resource has not been provided')
      return
    }
    return client().post(`resources`,resource)
  },
  updateResource(resource){
    if(!resource){
      console.error('resource has not been provided')
      return
    }
    if(!resource.id){
      console.error('resource has not been provided')
      return
    }
    return client().put(`resources/${resource.id}`,resource)
  }

}