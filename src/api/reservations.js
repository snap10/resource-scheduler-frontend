import client from '../utils/axiosUtils'
var eventsApi = ""
export default {
  getEvents(resourceid,before,after) {
    var query = ''
    if(after) query=`?after=${after}`
    if(before) query=`?before=${before}`
    return client().get(`${eventsApi}resources/${resourceid}/reservations/${query}`)
  },
  getEvent(resourceid,eventid) {
    if(!eventid){
      console.error('eventid hat not been provided')
      return
    }
   return client().get(`${eventsApi}resources/${resourceid}/reservations/${eventid}`)

  },
  postReservation(resourceid, newevent){
    if(!newevent||!resourceid){
      console.error('event or resourceid has not been provided',resourceid,newevent)
      return
    }
    return client().post(`${eventsApi}resources/${resourceid}/reservations`,newevent)
  }

}