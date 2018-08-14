<template>
  <div id="app" >
      <my-nav  v-if="!(['Login','Register'].indexOf($route.name)>-1)"></my-nav>
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
