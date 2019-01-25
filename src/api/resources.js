import client from '../utils/axiosUtils'

export default {
  getResources() {
    return client().get(`resources/`)
  },
  getResource(resourceid) {
    if(!resourceid){
      console.error('resourceid hat not been provided')
      return
    }
   return client().get(`resources/${resourceid}`)
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