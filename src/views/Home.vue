<template>
  <div class="home container">
     <vue-event-calendar :events="demoEvents">
      <template scope="props">
        <div v-for="(event, index) in props.showEvents" class="event-item">
          <!-- In here do whatever you want, make you owner event template -->
          <event-box
          :event="event">
          </event-box>
        </div>
      </template>
    </vue-event-calendar>
  </div>
</template>

<script>
import ResourceList from './../components/Resource-List.vue'
import EventBox from './../components/Event-Box.vue'
export default {
  name: 'home',
  components: { ResourceList, EventBox },
  data () {
    return {
      demoEvents: [{
        date: '2016/12/15',
        title: 'eat',
        user: {
          username: 'HansPeter72'
        },
        description: 'longlonglong description',
        resource: {
          id: 1,
          url: 'https://ffw-baltringen.de/images/stories/testslide/fzg2008.jpg',
          name: 'Feuerwehrauto 1',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        }
      }, {
        date: '2016/11/12',
        title: 'this is a title',
        user: {
          username: 'HansPeter13'
        },
        resource: {
          id: 1,
          url: 'https://ffw-baltringen.de/images/stories/testslide/heim1.jpg',
          name: 'Umkleideraum',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        },
        description: 'TestDescription'
      }]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding: 1rem;
}
</style>
