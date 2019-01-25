<template>
<div class="card">
  <div v-if="resource.picturePath" class="card-image">
    <figure class="image is-4by3">
           <img :src="resource.picturePath" alt="Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{resource.name}}</p>
        <p class="subtitle is-6">von {{owner}}</p>
        <p class="subtitle is-6" v-if="resource.organisationId">Verantwortlich: {{responsibleText}}</p>
      </div>
      <div class="media-right">
        <a href="">
          <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
        </a>
      </div>
    </div>
    <div class="content" v-if="eventsLoaded">
      <div v-if="reservations&&reservations.length>0">
      <p class="subtitle is-7">Neueste Reservierungen</p>
      <ul>
      <li :key="computedResourceId+'-'+res.id" v-for="res in reservations"><time datetime="res.startDatetime">{{res.name}} {{res.startDatetime | moment("from") }}<span v-if="isCurrently(res)" class="has-text-danger">&nbsp;(laufend)</span></time></li>
      </ul>
      </div>
      <p v-else class="subtitle is-7">
        Keine vorhandenen Reservierungen
      </p>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'resource-card',
    props: ['resourceForCard','resourceId'],
    data(){
      return {
        eventsLoaded:false,
        eventsError:false
      }
    }    ,
    created(){
      if(this.resourceId)this.$store.dispatch('loadResource',this.resourceId)
      if(this.resource.organisationId && !this.$store.getters.organisation(this.resource.organisationId))this.$store.dispatch('loadOrganisation',this.resource.organisationId)
      this.$store.dispatch('loadEvents',this.computedResourceId,null,Date.now()).then(
        this.eventsLoaded=true
      ).catch(

        this.eventsError=true
      )
    },
    mounted(){
    },
    computed:{
      computedResourceId(){
        return this.resourceId|| this.resourceForCard.id
      },
      resource(){
        return this.resourceForCard || this.$store.getters.resource(this.resourceId)||{}
      },
      reservations(){
        return this.$store.getters.events(this.computedResourceId)
      },
      responsible(){
        var value = (this.$store.getters.user(this.resource.creatorId))?this.$store.getters.user(this.resource.creatorId).name:null
        value = (!value)?this.resource.creatorId:value
        return value
      },
      responsibleText(){
        return (this.responsible===this.$store.getters.currentUser.sub)?'du':value
      },
      owner(){
        var value = this.resource.organisationId
        value = (value&&this.$store.getters.organisation(value))? this.$store.getters.organisation(value).name:value
        value = (value)?value:this.responsible
        return (value===this.$store.getters.currentUser.sub)?'dir':value
        
      }
    },
    methods:{
      isCurrently(res){
        var start = new Date(res.startDatetime)
        var end = new Date (res.endDatetime)
        var now = Date.now()
        return (start <=now && now <= end)
      },
    }
  }
  </script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
