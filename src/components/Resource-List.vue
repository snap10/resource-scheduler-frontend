<template>
<div class="resources">
  <ul>
    <li v-for="resource in resources">
      <router-link :to="{name: 'Resource', params: {id: resource.id}}"><resource-box :resource="resource"></resource-box></router-link>
    </li>
  </ul>
</div>
</template>

<script>
  import ResourceBox from './Resource-Box.vue'
  export default {
    name: 'resource-list',
    props: ['resources'],
    components: { ResourceBox },
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
