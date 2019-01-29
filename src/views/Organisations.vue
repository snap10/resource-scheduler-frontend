<template>
  <div class="has-background-light">
    <div class="container">
      <div class="level padding-1">
        <router-link class="button is-success" :to="'/organisations/create'">Organisation erstellen</router-link>
      </div>
      <div id="emptyState" v-if="organisationsEmpty">
        <div class="has-text-centered padding-1">
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
                <figure class="image is-3by1">
                  <img :src="organisation.picturePath" alt="Image">
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{organisation.name}}</p>
                    <p class="is-5">Verantwortlich: {{toResponsibleText(organisation)}}</p>
                    <p v-if="organisation.description" class="is-6">{{organisation.description | truncate(283)}}</p>
                  </div>
                  <div class="media-right">
                    <a href="">
                      <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

          </router-link>

        </div>
      </div>
    </div>
    <div class="height-2"></div>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  export default {
    name: 'organisations',
    components: {
      Loader
    },
    data() {
      return {}
    },
    created() {
      if (this.$store.getters.account.userInformation.organisationIds) {
        this.$store.getters.account.userInformation.organisationIds.forEach(id => {
          this.$store.dispatch('loadOrganisation', id)
        });
      }
    },
    computed: {
      organisationsEmpty() {
        return Object.keys(this.organisations).length==0;
      },
      organisations() {
        return this.$store.getters.organisations || []
      },
      resources() {
        return this.$store.getters.resources || []
      },
      user() {
        return this.$store.getters.currentUser || {}
      }
    },
    methods: {
      toResponsibleText(org) {
        return (this.user.sub == org.currentOwner) ? 'du' : org.currentOwnerObj.username || org.currentOwner || org.createdBy
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img { 
  object-fit: cover;
}
</style>