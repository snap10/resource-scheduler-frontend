<template>
  <div class="resources">
    <ul>
      <li :key="index" v-for="(resource,index) in resources">
        <router-link :to="(resource.organisationId)?{name: 'Resource', params: {resid: resource.id}}:{name: 'OrgResource', params: {resid: resource.id, orgid:resource.organisationId}}">
          <resource-card :resourceForCard="resource"></resource-card>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import ResourceCard from './Resource-Card.vue'
  export default {
    name: 'resource-list',
    props: ['resources'],
    components: {
      ResourceCard
    },
    data() {
      return {}
    },
    created(){
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>