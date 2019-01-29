<template>
  <div>
    <section class="scrolly hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-white">Einloggen</h3>
            <p class="subtitle has-text-white">Bitte einloggen um fortzufahren.</p>
            <div class="box">
              <form @submit.prevent="login({ email, password })">
                <div class="field">
                  <div class="control">
                    <p :class="{ 'control': true }">
                      <input v-validate="'required'" class="" :class="{'input': true, 'is-danger': errors.has('user') }"
                        name="user" type="text" placeholder="Email oder Benutzername" v-model="email">
                      <span v-show="errors.has('user')" class="help is-danger">{{ errors.first('user') }}</span>
                    </p>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" type="password" placeholder="Your Password" v-model="password">
                  </div>
                </div>
                <div class="has-text-centered">

                <button class="button is-info" type="submit" :disabled="checkFields">Einloggen</button>
                </div>
              </form>
            </div>
            <p class="subtitle has-text-centered">
              <router-link :to="'/register'">Registrieren</router-link>&nbsp;&nbsp;&nbsp;&nbsp;
              <router-link :to="'/'">Home</router-link>
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
    created() {
      if (this.$store.getters.isLoggedIn) {
        this.redirect()
      }
    },
    computed: {
      checkFields () {
        if (!this.errors.has('email') && this.email !== '' && this.password !== '') {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      login () {
        let username=null
        let email = this.email
        if(!this.email.indexOf('@')>-1){
          //We assume a username
          username = this.email
          email = null
        }
        this.$store.dispatch('login', {
          username: username,
          email: email,
          password: this.password
        }).then(() => {
          this.redirect()
        })
      },
      redirect() {
        if (this.$route.query.redirect) this.$router.replace(this.$route.query.redirect)
        else
          this.$router.replace('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
