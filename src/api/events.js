import client from '../utils/axiosUtils'
var eventsApi = "eventsapi/"
var eventsList = [
  {
    id: 126,
    userid: "xzy",
    status: 0,
    name: "TestEvent in 2019",
    description: "Testdescription =) Testdescription =)",
    created_at: "2018-12-16T19:20:30+01:00",
    start_datetime: "2019-01-20T19:00:00+01:00",
    end_datetime: "2019-01-21T23:00:00+01:00",
  },
  {
    id: 125,
    userid: "xzy",
    status: 0,
    name: "TestEvent in 2019",
    description: "Testdescription =) Testdescription =)",
    created_at: "2018-12-16T19:20:30+01:00",
    start_datetime: "2019-01-19T19:00:00+01:00",
    end_datetime: "2019-01-20T06:00:00+01:00",
  },
  {
    id: 123,
    userid: "xzy",
    status: 0,
    name: "TestEvent",
    description: "Testdescription =) Testdescription =)",
    created_at: "2018-11-16T19:20:30+01:00",
    start_datetime: "2018-11-20T19:00:00+01:00",
    end_datetime: "2018-11-23T23:00:00+01:00",
  },
  {
    id: 122,
    userid: "xzy",
    status: 0,
    name: "TestEvent",
    description: "Testdescription =) Testdescription =)",
    created_at: "2018-08-16T19:20:30+01:00",
    start_datetime: "2018-09-20T19:00:00+01:00",
    end_datetime: "2018-09-23T23:00:00+01:00",
  },{
    id: 121,
    userid: "xzy",
    status: 0,
    name: "TestEvent",
    description: "Testdescription =) Testdescription =)",
    created_at: "2017-07-16T20:20:30+01:00",
    start_datetime: "2017-07-24T19:30:00+01:00",
    end_datetime: "2017-07-24T23:00:00+01:00",
  },{
    id: 120,
    userid: "xzy",
    status: 0,
    name: "TestEvent",
    description: "Testdescription =) Testdescription =)",
    created_at: "2017-07-16T19:20:30+01:00",
    start_datetime: "2017-07-19T19:30:00+01:00",
    end_datetime: "2017-07-21T23:00:00+01:00",
  },
  {
    id: 119,
    userid: "xzy",
    status: 0,
    name: "TestEvent",
    description: "Testdescription =) Testdescription =)",
    created_at: "2017-01-16T19:20:30+01:00",
    start_datetime: "2017-01-18T19:40:00+01:00",
    end_datetime: "2017-01-22T23:00:00+01:00",
  }
]
var events ={
  2019:{
  },
  2018:{
    "November":[{
      id: 123,
      userid: "xzy",
      status: 0,
      name: "TestEvent",
      description: "Testdescription =) Testdescription =)",
      created_at: "2018-11-16T19:20:30+01:00",
      start_datetime: "2018-11-20T19:00:00+01:00",
      end_datetime: "2018-11-23T23:00:00+01:00",
    }],
    "September":[{
      id: 122,
      userid: "xzy",
      status: 0,
      name: "TestEvent",
      description: "Testdescription =) Testdescription =)",
      created_at: "2018-08-16T19:20:30+01:00",
      start_datetime: "2018-09-20T19:00:00+01:00",
      end_datetime: "2018-09-23T23:00:00+01:00",
    }],
  },
  2017:{
    "Juli":[
    {
      id: 121,
      userid: "xzy",
      status: 0,
      name: "TestEvent",
      description: "Testdescription =) Testdescription =)",
      created_at: "2017-07-16T20:20:30+01:00",
      start_datetime: "2017-07-24T19:30:00+01:00",
      end_datetime: "2017-07-24T23:00:00+01:00",
    },{
      id: 120,
      userid: "xzy",
      status: 0,
      name: "TestEvent",
      description: "Testdescription =) Testdescription =)",
      created_at: "2017-07-16T19:20:30+01:00",
      start_datetime: "2017-07-19T19:30:00+01:00",
      end_datetime: "2017-07-21T23:00:00+01:00",
    }],
    "Januar":[{
      id: 119,
      userid: "xzy",
      status: 0,
      name: "TestEvent",
      description: "Testdescription =) Testdescription =)",
      created_at: "2017-01-16T19:20:30+01:00",
      start_datetime: "2017-01-18T19:40:00+01:00",
      end_datetime: "2017-01-22T23:00:00+01:00",
    }],
  }
}
export default {
  getEvents(resourceid) {
    //return client().get(`${eventsApi}resources/${resourceid}/events`)
    return new Promise((resolve) =>{
      var response = {
       "data": eventsList
     }
      resolve(response)
   })
  },
  getEvent(eventid) {
    if(!eventid){
      console.error('eventid hat not been provided')
      return
    }
   //return client().get(`${eventsApi}resources/${resourceid}/events/${eventid}`)
   return new Promise((resolve) =>{
    var response = {
     "data": events[eventid]
   }
    resolve(response)
 })
  },
  postEvent(resourceid,newevent){
    if(!newevent||!resourceid){
      console.error('event or resourceid has not been provided')
      return
    }
    return client().post(`${eventsApi}resources/${resourceid}/events/`,newevent)
  }

}