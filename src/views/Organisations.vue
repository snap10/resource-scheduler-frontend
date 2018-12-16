<template>
  <div class="container">
    <div class="level margin-1">
          <router-link class="button is-success" :to="'/organisations/create'" >Organisation erstellen</router-link>
    </div>
    <div id="emptyState" v-if="organisationsEmpty">
         <div class="has-text-centered margin-1">
          <h1 class="title"> Hey {{user.preferred_username}},</h1>
          <h3 class="subtitle">scheinbar bist du noch in keiner Organisation aktiv!</h3>
          <h3 class="subtitle">Lege doch einfach eine neue Organisation an!</h3>
        </div>
    </div>
    <div v-if="!organisationsEmpty">
        <div v-for="(organisation,index) in organisations" :key="index">
          <div>
            {{organisation}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  export default {
    name: 'organisations',
    components: {
      Loader
    },
    data () {
      return {}
    },
    created () {
      
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
<style scoped>
  
</style>