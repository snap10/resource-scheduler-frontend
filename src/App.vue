<template>
  <div id="app">
      <my-nav  v-if="!(['Login','Register'].indexOf($route.name)>-1)"></my-nav>
      <loader :loaded="setupFinished"></loader>
      <router-view v-if="setupFinished"  :key="$route.path" class="fullscreen" :class="{'has-navbar-fixed-top':!(['Login','Register'].indexOf($route.name)>-1)}" id="content"></router-view>
  </div>
</template>

<script>
var jwtDecode = require('jwt-decode')
import MyNav from './components/My-Nav.vue'
import Loader from './components/Loader.vue'
export default {
  name: 'app',
  components: { MyNav, Loader },
  created(){
    var currentString = localStorage.getItem('currentuser')
    var currentUser = (currentString)?JSON.parse(currentString):null
    if(currentUser){
      this.$store.commit('setCurrentUser',currentUser)
    }
  },
  computed: {
    setupFinished() {
        if(!(['Login','Register'].indexOf(this.$route.name)>-1)&&!this.$store.getters.isLoggedIn){
          this.$router.push({name:"Login"})
        }
        return true
    }
  }
}
</script>

<style>
  .brand-name{
    font-family: "Comic Sans MS", cursive, sans-serif
  }
fieldset, label { margin: 0; padding: 0; border:none; }
.bodyFixed {
  position: fixed;
  overflow: hidden;
  width: 100%;
}
.has-navbar-fixed-top {
  margin-top: 3.5rem;
}
.is-half{
  width: 50%;
}
.center {
  left: auto;
  right: auto;
}
.scrolly {
  overflow-y: scroll;
}
.fullscreen{
  height: calc(100vh - 3.5rem);
  position: relative;
}
.scrollx {
  overflow-x: scroll;
}
.noscrollx {
  overflow-x: hidden;
}
.height-5{
  height: 5rem;
}
.height-0{
  height:0;
}
.height-1{
  height: 1rem;
}
.height-100p{
  height: 100%;
}
.height-20p{
  height: 20%;
}
.height-75p{
  height: 75%;
}
.no-left-margin {
  margin-left: 0;
}
.ap-icon-clear {
  display:none;
}
.margin-1 {
    margin: 1rem;
  }
.margin-2 {
    margin: 2rem;
  }
.margin-3{
  margin:3rem;
}
.margin-bottom-2{
  margin-bottom: 2rem;
}
.margin-bottom-1{
  margin-bottom: 1rem;
}
.margin-top-3{
  margin-top: 3rem;
}
.margin-top-2{
  margin-top: 2rem;
}
.margin-top-1{
  margin-top: 1rem;
}
.padding-1{
  padding: 1rem
}
.transparent-black-10{
      background-color: rgba(0,0,0,0.1)
}
.transparent-black-20{
      background-color: rgba(0,0,0,0.2)
}
@media screen and (min-width: 769px) {
.fixed-top-right{
  position:fixed;
  right: 0;
  top: 3.25rem;
}
}
</style>