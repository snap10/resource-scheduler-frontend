<template>
  <div>
    <section class="scrolly hero is-link is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <h3 class="title has-text-white">Hallo {{currentUser.username}}</h3>
            <p class="subtitle has-text-white">Wenn du möchtest, kannst du gerne weitere Informationen angeben.</p>
            <div class="box">
              <form @submit.prevent="submitAccount()">
                <div class="field">
                  <label class="label" for="email">KontaktEmail</label>
                  <p :class="{ 'control': true }">
                    <input v-validate="'required|email'" class="" :class="{'input': true, 'is-danger': errors.has('email') }"
                      name="email" type="email" placeholder="Email" v-model="tmpAccount.email">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                  </p>
                </div>
                <div class="field">
                  <p :class="{ 'control': true }">
                    <input class="" :class="{'input': true}" type="text" placeholder="Vorname" v-model="tmpAccount.givenName">
                  </p>
                </div>
                <div class="field">
                  <div class="control">
                    <input class="input" placeholder="Familienname" v-model="tmpAccount.familyName">
                  </div>
                </div>
                <!-- TODO profilePicturePath -->
                <div class="has-text-centered">
                  <button class="button is-info"  :disabled="!checkInputs">Weiter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import accountApi from './../api/account.js'
  export default {
    name: 'account-creation',
    data() {
      return {
        tmpAccount: {
          email:'',
        }
      }
    },
    created() {
      let user = this.$store.getters.currentUser.user
      if (user.email) {
        let string = '' + user.email.valueOf()
        this.tmpAccount.email = string
      }
    },
    computed: {
            checkInputs() {
        return this.isEmail(this.tmpAccount.email)
      },
      currentUser() {
        return this.$store.getters.currentUser.user || {}
      },

    },
    methods: {
      isEmail(text) {
        var re = /\S+@\S+\.\S+/;
        //TODO emit error notification
        return re.test(text);
      },
      submitAccount() {
        if (this.checkInputs) {
          accountApi.syncAccount(localStorage.getItem('id_token'), this.tmpAccount)
            .then((result) => {
              console.log('Created Account', result)
              this.$store.dispatch('loadUserAccount')
              this.$router.replace('/')
            }).catch((err) => {
              console.error(err)
            });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content {
    padding-left: 1rem;
    padding-right: 1rem;
  }
</style>