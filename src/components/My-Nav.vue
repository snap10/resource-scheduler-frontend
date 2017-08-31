<template>
  <div class="my-nav">
    <nav class="navbar ">
      <div class="navbar-brand">
        <div class="navbar-item title">Share-My-Resources</div>
        <div class="navbar-burger burger" @click="isActive = !isActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

  <div id="navMenubd-example" v-bind:class="{ 'is-active': isActive }" class="navbar-menu">
    <div class="navbar-start">
      <div class="navbar-item is-hoverable" @click="isActive = false">
        <router-link class="navbar-link" :to="'/'" >
          Home
        </router-link>
      </div>
      <div class="navbar-item is-hoverable" @click="isActive = false">
        <router-link class="navbar-link" :to="'/resources'" >
          Resources
        </router-link>
      </div>
      <div class="navbar-item is-hoverable" @click="isActive = false">
        <router-link class="navbar-link" :to="'/about'" >
          About
        </router-link>
      </div>
    </div>
  </div>
  </nav>
  <div class="hero is-primary">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {{this.$route.name}}
        </h1>
      </div>
    </div>
    
  </div>
  </div>
</template>

<script>
  export default {
    name: 'my-nav',
    data () {
      return {
        isActive: false
      }
    },
    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
