<template>
<div class="resources">
  <ul>
    <li :key="index" v-for="(resource,index) in resources">
      <router-link :to="{name: 'Resource', params: {id: resource.id}}"><resource-card :resource="resource"></resource-card></router-link>
    </li>
  </ul>
</div>
</template>

<script>
  import ResourceCard from './Resource-Card.vue'
  export default {
    name: 'resource-list',
    props: ['resources'],
    components: { ResourceCard },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
