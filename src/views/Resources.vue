<template>
  <div class="resources">
    <loader :loaded="loaded"></loader>
    <resource-list :resources="resources"></resource-list>
  </div>
</template>

<script>
import ResourceList from './../components/Resource-List.vue'
import Loader from './../components/Loader.vue'
export default {
  name: 'resources',
  components: { ResourceList, Loader },
  data () {
    return {
      resources: null,
      loaded: false
    }
  },
  created () {
    fetch('https://demo9053447.mockable.io/api/resources')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          return
        }
        // Examine the data
        response.json().then((data) => {
          console.log('Data: ', data)
          this.resources = data
          this.loaded = true
        })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader {
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>
