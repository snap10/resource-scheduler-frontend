<template>
  <div class="home">
    <div id="emptyState" v-if="organisationsEmpty">
         <div class="has-text-centered margin-1">
          <h1 class="title"> Hey {{user.preferred_username}},</h1>
          <h3 class="subtitle">scheinbar bist du noch in keiner Organisation aktiv!</h3>
          <h3 class="subtitle">Lege doch einfach eine neue Organisation an!</h3>
          <router-link class="button is-success" :to="'/organisations/create'" >Organisation erstellen</router-link>
        </div>
    </div>
    <div v-if="!organisationsEmpty">
    <div class="has-text-centered margin-1">
      <h1 class="title"> Hallo {{user.preferred_username}}</h1>
      <h3 class="subtitle">Hier siehst du alle Resourcen, auf die du Zugriff hast!</h3>
    </div>
    <div class="columns">
      <div class="column">
        <div class="is-flex flex-wrap">
        <div class="resource-card" :key="index" v-for="(resource,index) in resources">
          <router-link :to='`/organisations/${resource.organisationId}/resources/${resource.id}`'>
            <resource-card :resource-for-card="resource"/>
          </router-link>
        </div>
          
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import ResourceCard from './../components/Resource-Card.vue'
export default {
  name: 'home',
  components: {ResourceCard},
  data () {
    return {}
  },
  created () {
    //if(this.organisationsEmpty) this.$router.push('/organisations')
  
  },
  computed: {
     organisationsEmpty(){
        return this.organisations.length==0;
      },
      organisations(){
          return this.$store.getters.usersOrganisations||[]
      },
      resources(){
          return this.$store.getters.usersResources||[]
      },
      user() {
        return this.$store.getters.currentUser||{}
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss scoped>
.flex-wrap{
  flex-wrap: wrap
}
</style>
