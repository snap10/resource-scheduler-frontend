<template>
  <div class="home">
    <div class="has-text-centered margin-1">
      <h1 class="title"> Hallo {{user.preferred_username}}</h1>
      <h3 class="subtitle">Hier siehst du alle Resourcen, auf die du Zugriff hast!</h3>
    </div>
    <div class="columns">
      <div class="column">
        <div class="is-flex flex-wrap">
        <div class="resource-card" :key="index" v-for="(resource,index) in resources">
          <router-link :to='"/resources/"+resource.id'>
            <resource-card :resource-for-card="resource"/>
          </router-link>
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
    this.$store.dispatch('loadUsersResources')
  },
  computed: {
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
