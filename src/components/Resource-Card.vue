<template>
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
           <img :src="resourceForCard.main_picture_url" alt="Image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{resourceForCard.name}}</p>
        <p class="subtitle is-6">Verantwortlich: {{resourceForCard.responsible_person}}</p>
      </div>
      <div class="media-right">
        <a href="">
          <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
        </a>
      </div>
    </div>
    <div class="content">
      <p class="subtitle is-7">Nächste Reservierungen</p>
      <ul>
      <li><time datetime="2016-1-1">11:09 PM - 1 Jan 2019</time></li>
      <li><time datetime="2016-1-1">11:09 PM - 1 Jan 2019</time></li>
      <li><time datetime="2016-1-1">11:09 PM - 1 Jan 2019</time></li>
      </ul>
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
