<template>
  <div class="container">
    <div class="level margin-1">
          <router-link class="button is-success" :to="'/organisations/create'" >Organisation erstellen</router-link>
    </div>
    <div id="emptyState" v-if="organisationsEmpty">
         <div class="has-text-centered margin-1">
          <h1 class="title"> Hey {{user.preferred_username}},</h1>
          <h3 class="subtitle">scheinbar bist du noch in keiner Organisation aktiv!</h3>
          <h3 class="subtitle">Lege doch einfach eine neue Organisation an!</h3>
        </div>
    </div>
    <div v-if="!organisationsEmpty">
        <div v-for="(organisation,index) in organisations" :key="index">
          <router-link :to="{name:'Organisation', params:{orgid:organisation.id}}">
          <div class="card">
            <div v-if="organisation.picturePath" class="card-image">
              <figure class="image is-4by3">
                    <img :src="organisation.picturePath" alt="Image">
              </figure>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-4">{{organisation.name}}</p>
                  <p class="subtitle is-6">Verantwortlich: {{organisation.currentOwner||organisation.createdBy}}</p>
                </div>
                <div class="media-right">
                  <a href="">
                    <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
                  </a>
                </div>
              </div>
              <div class="content">
                {{organisation.description}}
              </div>
            </div>
          </div>

          </router-link>
        </div>
    </div>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  export default {
    name: 'organisations',
    components: {
      Loader
    },
    data () {
      return {}
    },
    created () {
      
    },
    computed: {
      organisationsEmpty(){
        return this.organisations.length==0;
      },
      organisations(){
          return this.$store.getters.usersOrganisations||[]
      },
      resources(){
          return this.$store.getters.usersResources||[]
      },
      user() {
        return this.$store.getters.currentUser||{}
      }
  }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>