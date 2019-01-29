<template>
  <div class="home">
    <div id="emptyState" v-if="organisationsEmpty">
         <div class="has-text-centered padding-1">
          <h1 class="title"> Hallo {{user.username}}</h1>
          <p class="heading">scheinbar bist du noch in keiner Organisation aktiv! Lege doch einfach eine neue Organisation an!</p>
          <router-link class="button is-link" :to="'/organisations/create'" >Organisation erstellen</router-link>
        </div>
    </div>
    <div v-if="!organisationsEmpty">
    <div class="has-text-centered padding-1">
      <h1 class="title"> Hallo {{user.username}}</h1>
      <h3 class="subtitle">Hier siehst du alle Resourcen, auf die du Zugriff hast!</h3>
    </div>
    <div class="columns padding-1">
        <div class=" column is-one-third resource-card" :key="index" v-for="(resource,index) in resourcesList">
          <router-link v-if="resource" :to="resourceLink(resource)">
          <!-- <router-link :to="{name: 'OrgResource', params: {resid: resource.id, orgid:resource.organisationId}}"> -->
            <resource-card :resourceForCard="resource"/>
          </router-link>
        </div>
    </div>
    </div>
    <div v-if="!resourcesList.length" class=" container has-text-centered">
      <p class="heading ">Scheinbar hast du noch keinen Zugriff auf irgendwelche Ressourcen. Trete einer Organisation bei oder lege jetzt eine neue Ressource an.</p>
     <router-link class="button is-link" :to="'/resources/create'" >Ressource erstellen</router-link>
    </div>
    <div class="height-2"></div>
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
  mounted () {
    if(this.$store.getters.account){
      this.$store.getters.account.resourceIds.forEach(element => {
        this.$store.dispatch('loadResource',element)
      });
    }
  },
  computed: {
      organisationsEmpty(){
        return  Object.keys(this.organisations).length==0;
      },
      organisations(){
          return this.$store.getters.organisations||[]
      },
      resourcesList(){
          return Object.values(this.$store.getters.resources)||[]
      },
      user() {
        return this.$store.getters.currentUser.user||{}
      }
  },
  methods: {
    resourceLink(resource){
       var link = (resource.organisationId)?{name: 'OrgResource', params: {resid: resource.id,orgid:resource.organisationId}}:{name:'Resource',params:{resid:resource.id}}
       return link
     },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang=scss scoped>
.flex-wrap{
  flex-wrap: wrap
}
</style>
