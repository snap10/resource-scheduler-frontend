<template>
<div>
  <section class="scrolly hero is-link is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-white">Registrieren</h3>
          <p class="subtitle has-text-white">Erstelle deinen Account hier.</p>
          <div class="box">
            <form @submit.prevent="register({ email, password1 })">
              <div class="field">
                <label class="label" for="email">Email</label>
                <p :class="{ 'control': true }">
                    <input v-validate="'required|email'" class="" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="email" placeholder="Email" v-model="email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </p>
              </div>
              <div class="field">
                <label class="label" for="username">Benutzername</label>
                <p :class="{ 'control': true }">
                    <input class="" :class="{'input': true, 'is-danger': !usernameAvailable }" @name="username" type="text" placeholder="Benutzername" v-model="username">
                    <span v-show="!usernameAvailable" class="help is-danger">Benutzername nicht verfügbar</span>
                </p>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Dein Password" v-model="password1">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Wiederhole Password" v-model="password2">
                </div>
              </div>
              <div class="has-text-centered">
              <button class="button is-info " :disabled="checkPassword">Registrieren</button>
              </div>
            </form>
          </div>
           <p class="subtitle has-text-centered">
            <router-link  :to="'/login'">Einloggen</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
            <router-link  :to="'/'">Home</router-link>
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
 </template>

 <script>

  import client from '../utils/axiosUtils'
  import authApi from '../api/auth.js'
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
        client().post(`auth/user`, {username: this.username, email: this.email, password: this.password1})
        .then(response => {
          // JSON responses are automatically parsed.
          this.$store.dispatch('login',{username: this.username, email: this.email, password: this.password1})
          .then((result) => {
            this.$router.push('/account/creation')
          }).catch((err) => {
            
          });
          
        })
        .catch(e => {
          console.error(e)
        })
      },
      userNameRequest () {
       authApi.checkUsernameAvailable(this.username)
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response.data)
          this.usernameAvailable = response.data.available
        })
        .catch(e => {
          console.error(e)
          //TODO notification
        })
      }
    },
    watch: {
      username: function () {
        this.userNameRequest()
      }
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
