<template>
  <div id="app">
      <my-nav  v-if="!(['Login','Register'].indexOf($route.name)>-1)"></my-nav>
      <loader :loaded="setupFinished||globalError"></loader>
      <router-view v-if="setupFinished&&!globalError"  :key="$route.path" class="" :class="{'has-navbar-fixed-top':!(['Login','Register'].indexOf($route.name)>-1)}" id="content"></router-view>
      <div v-if="globalError">
        <section class="hero is-link is-fullheight">
          <div class="hero-body">
            <div class="container has-text-centered">
              <p class="is-size-1">&#128543;</p>
            <h1 class="title is-size-1 brand-name">DingTeiler Error</h1>
            <h1 class="subtitle is-size-1 brand-name">Oops, something went wrong!</h1>
            <p>{{globalError}}</p>
            </div>
          </div>
        </section>
      </div>
  </div>
</template>

<script>
import MyNav from './components/My-Nav.vue'
import Loader from './components/Loader.vue'
export default {
  name: 'app',
  components: { MyNav, Loader },
  data() {
    return {
    }
  },
  computed: {
    setupFinished(){
      return this.$store.getters.account.loaded||['Login','Register','Welcome','AccountCreation'].indexOf(this.$route.name)>-1
    },
    globalError(){
      return this.$store.getters.globalError
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
  padding-top: 3.25rem;
}

</style>