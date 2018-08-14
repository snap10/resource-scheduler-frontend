<template>
  <div class="box">
    <article class="media">
      <div class="media-left">
        <figure class="image is-128x128">
          <img :src="event.resource.url" alt="Image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{event.resource.name}}</p>
        <p class="subtitle is-6">@{{event.user.username}}</p>
        <div class="content">
          <p>
            {{event.description}}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  export default {
    name: 'event-box',
    props: ['event']
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.box{
  margin:1rem
}

</style>
