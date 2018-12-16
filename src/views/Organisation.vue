<template>
  <div class="container">
    <loader v-if="!loaded"></loader>
     <section>
      <div v-if="organisation" class=" has-text-centered">
        <!-- <div class="columns is-vcentered"> -->
          <!-- <div class="column is-5"> -->
            <!-- <figure class="image is-4by3"> -->
              <!-- <img :src="organisation.main_picture_url" alt="Description"> -->
            <!-- </figure> -->
          <!-- </div> -->
          <div class="column is-6 is-offset-1">
            <h1 class="title is-2">
              {{organisation.name}}
            </h1>
            <article class="is-4">
              {{organisation.description}}
            </article>

          </div>
      </div>
    </section>
    <div class="margin-2"></div>
    <section class="hero is-warning padding-1">
      <h1 class="is-size-5">Details</h1>
      <div class="">{{organisation}}</div>
    </section>
    <section class="margin-1">
      <div class="level">
        <h1 class="is-size-5">Ressourcen</h1>
        <router-link  :to="`/organisations/${organisationid}/resources/create`" class="button is-icon is-danger has-text-white">
          <i class="fas fa-plus"  />&nbsp;Hinzufügen
        </router-link>
      </div>
        <div class="is-flex flex-wrap">
          <loader v-if="!resourcesLoaded"></loader>
          <div class="resource-card" :key="index" v-for="(resource,index) in organisationResources">
            <router-link :to='`/organisations/${resource.organisationId}/resources/${resource.id}`'>
              <resource-card :resource-for-card="resource"/>
            </router-link>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  import ResourceCard from './../components/Resource-Card.vue'
  export default {
    name: 'organisation',
    components: {
      Loader, ResourceCard
    },
    data() {
      return {
        organisationid:null,
        loaded: false,
        resourcesLoaded: false
      }
    },
    created() {
    this.organisationid = this.$route.params.orgid
    if(this.organisationid){
      this.$store.dispatch('loadOrganisation',this.organisationid)
      .then(resp =>{
        this.loaded=true
      })
      .catch(err=>{
        //TODO signal error
        this.loaded=true
      })
      this.$store.dispatch('loadResourcesForOrganisation',this.organisationid)
      .then(resp =>{
        this.resourcesLoaded=true
      })
      .catch(err=>{
        //TODO signal error
        this.resourcesLoaded=true
      })
    }

    },
    methods: {
    },
    computed:{
      organisation(){
        return this.$store.getters.organisation(this.organisationid)||{}
      },
      organisationResources(){
        return this.$store.getters.organisationResources(this.organisationid)||[]

      }
    }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>