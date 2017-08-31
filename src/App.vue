<template>
  <div id="app" class="container">
      <my-nav></my-nav>
      <router-view></router-view>
  </div>
</template>

<script>
import MyNav from './components/My-Nav.vue'

export default {
  name: 'app',
  components: { MyNav }
}
</script>

<style>

</style>
