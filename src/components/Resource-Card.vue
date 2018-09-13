<template>
  <div class="resource-card">
  <div class="card-image">
    <figure class="image">
      <img :src="resourceForCard.url" alt="Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{resourceForCard.name}}</p>
        <p class="subtitle is-6">@TODO</p>
      </div>
    </div>

    <div class="content">
     {{resourceForCard.description}}
    </div>
  </div>
  <vue-event-calendar :events="demoEvents">
      <template slot-scope="props">
        <div :key="index" v-for="(event, index) in props.showEvents" class="event-item">
          <!-- In here do whatever you want, make you owner event template -->
          {{event}}
        </div>
      </template>
    </vue-event-calendar>
</div>
</template>

<script>
  export default {
    name: 'resource-card',
    props: ['resourceForCard'],
    data () {
      return {
        demoEvents: [{
          date: '2016/12/15',
          title: 'eat',
          desc: 'longlonglong description'
        }, {
          date: '2016/11/12',
          title: 'this is a title'
        }]
      }
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
