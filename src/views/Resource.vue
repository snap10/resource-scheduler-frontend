<template>
  <div class="resource container" @keyup.esc="closeEventCreation()" >
    <loader :loaded="!resourceLoading"></loader>
    <div id="quickviewEventCreation" class="quickview"  :class="{'is-active':creatEventQuickview.clicked}">
      <header class="quickview-header">
        <p class="title">Reservierung erstellen</p>
        <a class="button is-danger"  @click="toggleEventCreation()"><i class="fas fa-times"></i></a>
      </header>
      <div class="quickview-body">
        <div class="quickview-block">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
                    <input class="input" type="text" placeholder="Grund" name="name" v-model="futureEvent.name"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Beginn</label>

            <label class="checkbox">
              <input type="checkbox" v-model="futureEvent.withExactTime">
              Mit exakter Uhrzeit
            </label>
            <div class="control">
                <input class="input" @change="validateStartDate" :class="{'is-danger': !futureEventStartDateValid}" :type="futureEvent.withExactTime?'datetime-local':'date'" placeholder="StartDate" name="startdate" v-model="futureEvent.start_datetime"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Ende</label>
            <div class="control">
                <input class="input" @change="validateEndDate" :class="{'is-danger': !futureEventEndDateValid}"   :type="futureEvent.withExactTime?'datetime-local':'date'" placeholder="EndDate" name="enddate" v-model="futureEvent.end_datetime"/>
            </div>
          </div>
          <div class="field">
            <label class="label">Beschreibung</label>
            <div class="control">
              <textarea class="textarea" type="text" placeholder="Beschreibung/Kommentar" name="description" v-model="futureEvent.description"/>
            </div>
          </div>
        </div>
      </div>

      <footer class="quickview-footer">
          <a class="button is-danger" @click="toggleEventCreation()"><i class="fas fa-times"></i></a>
          <a class="button is-warning" @click="resetFutureEvent"><i class="fas fa-redo"></i></a>
          <a class="button is-success" :class="{'is-loading':postingEventPending}" :disabled="!futureEventValid" @click="saveFutureEvent">Speichern</a>
      </footer>
    </div>
    <section>
      <div v-if="resource" class=" has-text-centered">
        <div class="columns is-vcentered">
          <div v-if="resource.main_picture_url" class="column is-5">
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
    <section class="hero is-warning padding-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">TODO</div>
    </section>
    <div class="margin-2"></div>
    <section class="margin-1">
      <div class="level">
        <h1 class="is-size-5">Reservierungen</h1>
        <a class="button is-icon is-danger has-text-white" @click="toggleEventCreation()">
              <i class="fas" :class="{'fa-times': false,'fa-plus':true}"/>&nbsp;Hinzufügen
        </a>
      </div>
      <div class="timeline" :class="{'is-centered':!creatEventQuickview.clicked&&windowWidth>768}" :key="year" v-for="(year) in eventsView.years">
        <header class="timeline-header">
          <span class="tag is-large is-link">{{year}}</span>
        </header>
        <div class="timeline-item"></div>
        <template v-for="(month) in eventsView.monthsInYear[year]">
          <header :key="month+'-month'" class="timeline-header">
            <span class="tag is-link">{{month+"" | moment("MMMM")}}&nbsp;{{year+"" | moment("YY")}}</span>
          </header>
          <div v-for="(event,index) in eventsFiltered(year,month)" :key="year+'-'+month+'-'+index+'-event'" class="timeline-item">
            <a class="timeline-marker is-icon is-danger has-text-white higher" v-if='allowAdd(event,eventsFiltered(year,month)[index+1])'
              @click="toggleEvent(event,index)">
              <i class="fas" :class="{'fa-times': event.clicked,'fa-plus':!event.clicked}"></i>
            </a>
            <div v-if="event.clicked" class="timeline-content">
              <div class="box margin-1 is-paddingless">
                TODO Input Form for Event
              </div>
            </div>
            <div class="timeline-marker is-icon is-link has-text-white">
              <p class="is-size-7">{{event.startDatetime | moment("DD")}}</p>
            </div>
            <div class="timeline-content box margin-1 is-paddingless">
              <div class="padding-1">
                <p class="is-size-6">
                  {{event.startDatetime | moment("calendar", null,{sameElse:"dddDoMMM,HH:mm"})}}
                </p>
                <p class="is-size-6">
                  bis {{event.endDatetime | moment("calendar", null,{sameElse:"dddDoMMM,HH:mm"})}}
                </p>
                <h4 class="is-size-5">{{event.name}}</h4>
                <p>{{event.description}}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
  import ResourceCard from './../components/Resource-Card.vue'
  import Loader from './../components/Loader.vue'
  export default {
    name: 'resource',
    components: {
      ResourceCard,
      Loader
    },
    data() {
      return {
        windowWidth: 1000,
        postingEventPending:false,
        quickviews: null,
        resourceId: {},
        initialFutureEvent:{},
        futureEvent:{},
        creatEventQuickview: {
          clicked: false
        },
        loaded: false,
        toggle: false
      }
    },
    created() {
      this.resourceId = this.$route.params.resid
      this.organisationId = this.$route.params.orgid
      this.$store.dispatch('loadResource', this.resourceId)
      this.$store.dispatch('loadEvents', this.resourceId)

      Date.prototype.toDatetimeLocal =  function toDatetimeLocal() {
          var
            date = this,
            ten = function (i) {
              return (i < 10 ? '0' : '') + i;
            },
            YYYY = date.getFullYear(),
            MM = ten(date.getMonth() + 1),
            DD = ten(date.getDate()),
            HH = ten(date.getHours()),
            II = ten(date.getMinutes()),
            SS = ten(date.getSeconds());
          return YYYY + '-' + MM + '-' + DD + 'T' +HH + ':' + II + ':' + SS;
        };

    },
    mounted(){
      window.addEventListener('keyup',event=>{if(event.key=='Escape')this.closeEventCreation()})
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
    },
    methods: {
      isGreaterThan(date1, date2) {
        return date1 > date2
      },
      isGreaterThanOrEqual(date1, date2) {
        return date1 >= date2
      },
      toggleEventCreation() {
        this.creatEventQuickview.clicked = !this.creatEventQuickview.clicked || false
      },
      closeEventCreation() {
        this.creatEventQuickview.clicked = false
      },
      toggleEvent(evt) {
        evt.clicked = !evt.clicked || false
        this.toggle = !this.toggle
        console.log(evt)
      },
      eventsFiltered(year, month) {
        return this.eventsView.list.filter(evt => {
          return (evt._year === year && evt._month == month)
        })
      },
      allowAdd(event, index) {
        if (!event) return true
        if (event && this.isGreaterThan(new Date(event.start_datetime), new Date().setHours(0,0,0,0))) return true
        return false
      },
      saveFutureEvent(){
        if(!this.futureEvent.withExactTime){
          this.futureEvent.startDatetime=new Date(this.futureEvent.start_datetime).setHours(0,0,0,0)
          this.futureEvent.endDatetime = new Date(this.futureEvent.end_datetime).setHours(23,59,59)
        }else{
           this.futureEvent.startDatetime=new Date(this.futureEvent.start_datetime)
          this.futureEvent.endDatetime = new Date(this.futureEvent.end_datetime)
        }
        if(this.futureEventValid){
          console.log('Posting Reservation')
          this.postingEventPending=true
          this.$store.dispatch('createReservation',{reservation:this.futureEvent,resourceid:this.resourceId})
            .then(()=>{
              this.postingEventPending=false
            })
            .catch(()=>{this.postingEventPending=false})
        }else{
          console.log('TODO not Valid Event')
        }
      },
      resetFutureEvent(){
       this.futureEvent={}
      },
      alignEndDate(){
        var start_datetime = new Date(this.futureEvent.start_datetime)
        var end_datetime = new Date(start_datetime)
        end_datetime.setHours(start_datetime.getHours()+1,0,0,0)
        if(!this.futureEvent.end_datetime||this.isGreaterThan(new Date(this.futureEvent.start_datetime),new Date(this.futureEvent.end_datetime))){
          this.futureEvent.end_datetime = (this.futureEvent.withExactTime)? end_datetime.toDatetimeLocal():this.futureEvent.start_datetime
        }
      },
      validateStartDate(){
        var now = (this.futureEvent.withExactTime)?new Date(): new Date().setHours(0,0,0,0)
        this.futureEvent.start_datetime_invalid = (this.isGreaterThan(now,new Date(this.futureEvent.start_datetime)))?true:false
        if(!this.futureEvent.start_datetime_invalid) this.alignEndDate()
      },
      validateEndDate(){
          this.futureEvent.end_datetime_invalid  = (this.isGreaterThan(new Date(this.futureEvent.start_datetime),new Date(this.futureEvent.end_datetime)))?true:false
      }
    },
    computed: {
      resourceLoading() {
        return this.$store.getters.resourceLoading || false
      },
      resource() {
        return this.$store.getters.resource(this.resourceId) || {}
      },
      events() {
        return this.$store.getters.events(this.resourceId) || []
      },
      eventsView() {
        var monthsInYear = {}
        var years = []
        var newEventsList = []
        this.events.forEach(evt => {
          var tmp = {}
          Object.assign(tmp, evt)
          var startDate = new Date(evt.startDatetime)
          tmp._year = startDate.getFullYear()
          if (years.indexOf(tmp._year) < 0) years.push(tmp._year)
          if (!monthsInYear[tmp._year]) monthsInYear[tmp._year] = []
          tmp._month = startDate.getMonth() + 1
          if (monthsInYear[tmp._year].indexOf(tmp._month) < 0) monthsInYear[tmp._year].push(tmp._month)
          newEventsList.push(tmp)
        })
        return {
          years: years,
          monthsInYear: monthsInYear,
          list: newEventsList
        }
      },
      isAddEventToggled() {
        return date => this.addEventBoxes[date]
      },
      futureEventValid(){
        if(!this.futureEvent.name||this.futureEvent.name.length==0) return false
        if(!this.futureEvent.start_datetime||!this.futureEvent.end_datetime) return false
        if(!this.futureEventStartDateValid||!this.futureEventEndDateValid) return false
        return true
      },
      futureEventStartDateValid(){
            var now = (this.futureEvent.withExactTime)?new Date(): new Date().setHours(0,0,0,0)
            var greater = this.isGreaterThan(now,new Date(this.futureEvent.start_datetime))
        return !greater
      },
      futureEventEndDateValid(){
        var greater =this.isGreaterThan(new Date(this.futureEvent.start_datetime),new Date(this.futureEvent.end_datetime))
          return !greater
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .timeline-marker {
    z-index: 10;
  }

  .higher {
    padding-bottom: -5rem;
  }
  .quickview{
    max-width:calc( 100% - 80px);
  }
  .quickview-block{
    padding:1rem;
  }
</style>