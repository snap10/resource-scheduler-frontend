<template>
  <div class="container">
      <div id="emptyState" v-if="organisationsEmpty">
         <div class="has-text-centered margin-1">
      <h1 class="title"> Hey {{user.preferred_username}},</h1>
      <h3 class="subtitle">scheinbar bist du noch in keiner Organisation aktiv!</h3>
      <h3 class="subtitle">Lege doch einfach eine neue Organisation an!</h3>
      <router-link class="button is-success" :to="'/organisations/create'" >Jetzt erstellen</router-link>
    </div>
      </div>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  export default {
    name: 'organization',
    components: {
      Loader
    },
    data () {
      return {}
    },
    created () {
      if(this.organisations.length==0) this.$router.push('/organisations')
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