<template>
<div>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Register</h3>
          <p class="subtitle has-text-white">Create an Account here.</p>
          <div class="box">
            <form @submit.prevent="register({ email, password1 })">
              <div class="field">
                <label class="label" for="email">Email</label>
                <p :class="{ 'control': true }">
                    <input v-validate="'required|email'" class="is-large" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Email" v-model="email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
              </div>
              <div class="field">
                <label class="label" for="username">Username</label>
                <p :class="{ 'control': true }">
                    <input class="is-large" :class="{'input': true, 'is-danger': !usernameAvailable }" @name="username" type="text" placeholder="Username" v-model="username">
                    <span v-show="!usernameAvailable" class="help is-danger">Username is not available</span>
                </p>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password" v-model="password1">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Your Password" v-model="password2">
                </div>
              </div>
              <button class="button is-block is-info is-large" :disabled="checkPassword">Register</button>
            </form>
          </div>
           <p class="subtitle has-text-centered">
            <router-link  :to="'/login'">Login</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link  :to="'/'">Home</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
 </template>

 <script>
 /* eslint-disable */
  import client from '../utils/axiosUtils'
  export default {
    name: 'register',
    data () {
      return {
        email: '',
        username: '',
        password1: '',
        password2: '',
        usernameAvailable: true
      }
    },
    computed: {
      checkPassword () {
        if (!this.errors.has('email') && this.email !== '' && this.password1 !== '' && this.password1 === this.password2) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      checkUsername () {
        this.userNameRequest()
      },
      register () {
        client().post(`auth/register`, {data: {username: this.username, email: this.email, password: this.password1}})
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.$router.push('/login')
        })
        .catch(e => {
          console.log(e)
          this.errors.push(e)
        })
      },
      userNameRequest () {
        client().get(`auth/register/available?username=${this.username}`)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data.data)
          this.usernameAvailable = response.data.data.available
        })
        .catch(e => {
          this.errors.push(e)
        })
      }
    },
    watch: {
      username: function (val, oldVal) {
        this.userNameRequest()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
