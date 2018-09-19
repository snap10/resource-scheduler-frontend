<template>
  <div class="home container">
    <div class="columns">
      <div class="column">
        <div :key="index" v-for="(resource,index) in resources">
          <router-link :to='"/resources/"+resource.id'>
            <resource-card class="resource-card" :resource-for-card="resource"/>
          </router-link>
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
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  padding: 1rem;
}
.resource-card{
  margin-bottom: 2rem;
}
</style>
