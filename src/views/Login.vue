<template>
<div>
  <section class="hero is-link is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
      <h1 class="title is-size-1 brand-name">DingTeiler</h1>
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Login</h3>
          <p class="subtitle has-text-white">Please login to proceed.</p>
          <div class="box">
            <form @submit.prevent="login({ email, password })">
              <div class="field">
                <div class="control">
                <p :class="{ 'control': true }">
                    <input class="is-medium" :class="{'input': true}" name="email" type="email" placeholder="Email" v-model="email">
                </p>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password" v-model="password">
                </div>
              </div>
              <button class="button is-block is-info is-medium" :disabled="!checkFields">Login</button>
            </form>
          </div>
          <p class="subtitle has-text-centered">
            <router-link  :to="'/register'" >Register</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link  :to="'/'">Home</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
 </template>

 <script>
  export default {
    name: 'login',
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      checkFields () {
        return true
      }
    },
    methods: {
      login () {
        this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        }).then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
