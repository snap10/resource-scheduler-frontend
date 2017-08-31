<template>
  <div class="resource">
    <loader :loaded="loaded"></loader>
    <resource-card :resourceForCard="resource"></resource-card>
  </div>
</template>

<script>
import ResourceCard from './../components/Resource-Card.vue'
import Loader from './../components/Loader.vue'
export default {
  name: 'resource',
  components: { ResourceCard, Loader },
  data () {
    return {
      resource: null,
      loaded: false
    }
  },
  created () {
    fetch('https://demo9053447.mockable.io/api/resources/1')
      .then((response) => {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status)
          return
        }
        // Examine the data
        response.json().then((data) => {
          console.log('Data: ', data)
          this.resource = data
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
