<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img :src="resource.url" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-2">{{resource.name}}</p>
        <div class="content">
          <p>
            {{resource.description}}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'resource-box',
    props: ['resource']
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box{
  margin:1rem
}

</style>
