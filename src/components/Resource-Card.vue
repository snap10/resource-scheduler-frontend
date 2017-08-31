<template>
  <div class="resource-card">
  <div class="card-image">
    <figure class="image">
      <img :src="resourceForCard.url" alt="Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{resourceForCard.name}}</p>
        <p class="subtitle is-6">@TODO</p>
      </div>
    </div>

    <div class="content">
     {{resourceForCard.description}}
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'resource-card',
    props: ['resourceForCard']
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  
</style>
