<template>
  <div class="resource container">
    <loader :loaded="!resourceLoading"></loader>
    <section>
      <div v-if="resource" class=" has-text-centered">
                <div class="columns is-vcentered">
                    <div class="column is-5">
                        <figure class="image is-4by3">
                            <img :src="resource.main_picture_url" alt="Description">
                        </figure>
                    </div>
                    <div class="column is-6 is-offset-1">
                        <h1 class="title is-2">
                            {{resource.name}}
                        </h1>
                        <article class="is-4">
                            {{resource.description}}
                        </article>

                    </div>
                </div>
            </div>
    </section>
        <div class="margin-2"></div>
    <section class="hero is-warning margin-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">TODO</div>
    </section>
    <div class="margin-2"></div>
    <section class="margin-1">
      <h1 class="is-size-5">Reservierungen</h1>
     <div class="timeline">
       <div  :key="year" v-for="(yearObject,year) in eventsByYearMonth">
      <header class="timeline-header">
        <span class="tag is-large is-primary">{{year}}</span>
      </header>
      <div class="timeline-item"></div>
      <div :key="month" v-for="(monthObject,month) in yearObject">
          <header class="timeline-header">
            <span class="tag is-primary">{{month}}</span>
          </header>
       
          <div :key="index" v-for="(event,index) in monthObject">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content box margin-1 is-paddingless">
                <div class="padding-1">
                <p class="is-size-6">{{event.start_datetime | moment("calendar", null,{sameElse:"dddDoMMM, HH:mm"})}}</p>
                <p class="is-size-6"> bis {{event.end_datetime |  moment("calendar", null,{sameElse:"dddDoMMM, HH:mm"})}}</p>
                 <h4 class="is-size-5">{{event.name}}</h4>
                <p>{{event.description}}</p>
                </div>
              </div>
            </div>
             <div v-if='(!monthObject[index+1]&&isGreaterThan(new Date(year,12,31),new Date()))||(monthObject[index+1]&&isGreaterThan(new Date(monthObject[index+1].start_datetime),new Date()))' class="timeline-item">
              <a @click="toggleEvent(event)"><span class="timeline-marker is-icon is-danger has-text-white">  <i class="fas" :class="{'fa-times': event.clicked,'fa-plus':!event.clicked}"></i></span></a>              <div v-if="event.clicked" class="timeline-content">
                <div class="timeline-content box margin-1 is-paddingless">
                   TODO Input Form for Event
                </div>
              </div>
              <div v-if="toggle" class="is-hidden"></div>
            </div>
          </div>
          <div class="timeline-item"></div>

      </div>
  </div>
</div>

    </section>
  </div>
</template>

<script>
import ResourceCard from './../components/Resource-Card.vue'
import Loader from './../components/Loader.vue'
export default {
  name: 'resource',
  components: { ResourceCard, Loader },
  data () {
    return {
      resourceid: {},
      loaded: false,
      toggle:false
    }
  },
  created () {
    this.resourceid = this.$route.params.id
    this.$store.dispatch('loadResource',this.resourceid)

  },
  methods:{
    isGreaterThan(date1,date2){
      console.log(date1,date2)
      return date1>date2
    },
    toggleEvent(evt){
      evt.clicked=!evt.clicked||false
      this.toggle=!this.toggle
      console.log(evt)
    }
  },
  computed:{
    resourceLoading(){
      return this.$store.getters.resourceLoading||false
    },
    resource(){
      return this.$store.getters.resource(this.resourceid)||{}
    },
    eventsByYearMonth(){
      var event = {
        userid: "xzy",
        status: 0,
        name: "TestEvent",
        description: "Testdescription =) Testdescription =)",
        created_at: "2017-07-16T19:20:30+01:00",
        start_datetime: "2017-07-20T19:00:00+01:00",
        end_datetime: "2017-07-20T23:00:00+01:00",
      }
      return {
        2017:{
          "Januar":[{
            userid: "xzy",
            status: 0,
            name: "TestEvent",
            description: "Testdescription =) Testdescription =)",
            created_at: "2017-01-16T19:20:30+01:00",
            start_datetime: "2017-01-18T19:40:00+01:00",
            end_datetime: "2017-01-22T23:00:00+01:00",
          }],
          "Juli":[{
            userid: "xzy",
            status: 0,
            name: "TestEvent",
            description: "Testdescription =) Testdescription =)",
            created_at: "2017-07-16T19:20:30+01:00",
            start_datetime: "2017-07-19T19:30:00+01:00",
            end_datetime: "2017-07-21T23:00:00+01:00",
          },
          {
            userid: "xzy",
            status: 0,
            name: "TestEvent",
            description: "Testdescription =) Testdescription =)",
            created_at: "2017-07-16T20:20:30+01:00",
            start_datetime: "2017-07-24T19:30:00+01:00",
            end_datetime: "2017-07-24T23:00:00+01:00",
          }],
      
        },
        2018:{
          "September":[{
            userid: "xzy",
            status: 0,
            name: "TestEvent",
            description: "Testdescription =) Testdescription =)",
            created_at: "2018-08-16T19:20:30+01:00",
            start_datetime: "2018-09-20T19:00:00+01:00",
            end_datetime: "2018-09-23T23:00:00+01:00",
          }],
          "November":[{
            userid: "xzy",
            status: 0,
            name: "TestEvent",
            description: "Testdescription =) Testdescription =)",
            created_at: "2018-11-16T19:20:30+01:00",
            start_datetime: "2018-11-20T19:00:00+01:00",
            end_datetime: "2018-11-23T23:00:00+01:00",
          }],
        },
        2019:{
        }
      }
    },
    isAddEventToggled(){
      return date=>this.addEventBoxes[date]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.timeline-marker{
  z-index: 100;
}
</style>
