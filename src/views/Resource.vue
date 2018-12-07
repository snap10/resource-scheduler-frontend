<template>
  <div class="resource container">
    <loader :loaded="!resourceLoading"></loader>
    <div id="quickviewEventCreation" class="quickview">
      <header class="quickview-header">
        <p class="title">Reservierung erstellen</p>
        <a @click="toggleEventCreation()"><span class="delete is-left" data-dismiss="quickview"></span></a>
      </header>

      <div class="quickview-body">
        <div class="quickview-block">
          ...
        </div>
      </div>

      <footer class="quickview-footer">

      </footer>
    </div>
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
    <section class="hero is-warning padding-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">TODO</div>
    </section>
    <div class="margin-2"></div>
    <section class="margin-1">
      <h1 class="is-size-5">Reservierungen</h1>
      <div class="timeline" :class="{'is-centered':!futureEvent.clicked&&windowWidth>768}" >
        <header class="timeline-header">
          <span class="tag is-large is-link">Zukunft</span>
        </header>
        <div class="timeline-item">
          <a class="timeline-marker is-icon is-danger has-text-white" @click="toggleEventCreation()" data-show="quickview" data-target="quickviewEventCreation">
              <i class="fas" :class="{'fa-times': futureEvent.clicked,'fa-plus':!futureEvent.clicked}"></i>
          </a>
        </div>
        <div class="timeline-item"></div>
      </div>
      <div class="timeline" :class="{'is-centered':!futureEvent.clicked&&windowWidth>768}" :key="year" v-for="(year) in eventsView.years">
        <header class="timeline-header">
          <span class="tag is-large is-link">{{year}}</span>
        </header>
        <div class="timeline-item"></div>
        <template v-for="(month) in eventsView.monthsInYear[year]">
          <header :key="month" class="timeline-header">
            <span class="tag is-link">{{month+"" | moment("MMMM")}}&nbsp;{{year+"" | moment("YY")}}</span>
          </header>
          <div v-for="(event,index) in eventsFiltered(year,month)" :key="index" class="timeline-item">
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
              <p class="is-size-7">{{event.start_datetime | moment("DD")}}</p>
            </div>
            <div class="timeline-content box margin-1 is-paddingless">
              <div class="padding-1">
                <p class="is-size-6">
                  {{event.start_datetime | moment("calendar", null,{sameElse:"dddDoMMM,HH:mm"})}}
                </p>
                <p class="is-size-6">
                  bis {{event.end_datetime | moment("calendar", null,{sameElse:"dddDoMMM,HH:mm"})}}
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
  import bulmaQuickview from './../../node_modules/bulma-quickview/dist/js/bulma-quickview.min.js'
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
        quickviews: null,
        resourceid: {},
        futureEvent: {
          clicked: false
        },
        loaded: false,
        toggle: false
      }
    },
    created() {
      this.resourceid = this.$route.params.id
      this.$store.dispatch('loadResource', this.resourceid)
      this.$store.dispatch('loadEvents', this.resourceid)
    },
    methods: {
      isGreaterThan(date1, date2) {
        console.log(date1, date2)
        return date1 > date2
      },
      toggleEventCreation() {
        this.futureEvent.clicked = !this.futureEvent.clicked || false
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
        if (event && this.isGreaterThan(new Date(event.start_datetime), new Date())) return true
        return false

      }
    },
    mounted(){
      this.quickviews = bulmaQuickview.attach()
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth
      });
    })
    },
    computed: {
      resourceLoading() {
        return this.$store.getters.resourceLoading || false
      },
      resource() {
        return this.$store.getters.resource(this.resourceid) || {}
      },
      events() {
        return this.$store.getters.events(this.resourceid) || []
      },
      eventsView() {
        var monthsInYear = {}
        var years = []
        var newEventsList = []
        this.events.forEach(evt => {
          var tmp = {}
          Object.assign(tmp, evt)
          var startDate = new Date(evt.start_datetime)
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
</style>