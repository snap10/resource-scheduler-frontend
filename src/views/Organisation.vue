<template>
  <div class=" has-background-light">
    <div class="height-2"></div>

    <div class="container">


      <loader v-if="!loaded"></loader>

      <div v-if="isAdministrator" class="level padding-1">
        <div class="level-left">
          Du bist Verwalter dieser Organisation und kannst details bearbeiten.
        </div>
        <div class="level-right">
          <router-link :to="`/organisations/${organisationid}/edit`" class="level-item button is-link">Edit</router-link>
        </div>
      </div>

      <section class="has-background-white padding-1">
        <div v-if="organisation" class=" has-text-centered">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title is-2">
                {{organisation.name}}
              </h1>
              <article class="is-4">
                {{organisation.description}}
              </article>

            </div>
            <div class="column">
              <figure v-if="organisation.picturePath" class="image is-4by3">
                <img :src="organisation.picturePath" alt="Description">
              </figure>
            </div>

          </div>
        </div>
      </section>
      <div class="margin-2"></div>
      <section class="has-background-white padding-1">
        <h1 class="is-size-5">Details</h1>
        <span class="level">
          <div class="level-item">
            <p class="heading"> Verantwortlich:</p>
          </div>
          <div class="level-item">
            <user-card class="" :user-for-card="organisation.currentOwnerObj"></user-card>
          </div>
        </span>
        <div class="margin-1"></div>
        <span class="level">
          <div class="level-item">
            <p class="heading"> Erstellt:</p>
          </div>
          <div class="level-item">
            <p class="card padding-1">{{organisation.createdAt |moment("MMM YYYY")}}</p>
          </div>
        </span>
      </section>
      <div class="margin-2"></div>

      <section class="has-background-white padding-1">
        <div class="level">
          <h1 class="is-size-5">Mitglieder</h1>
          <button v-if="isAdministrator" class="button is-icon is-link has-text-white" @click="inviteModalActive=true">
            <i class="fas fa-edit" />&nbsp;Verwalten
          </button>
        </div>
        <div class="columns is-multiline">
          <loader v-if="!membersLoaded"></loader>
          <div class="resource-card column is-half" :key="index" v-for="(member,index) in organisationMembers">
            <router-link :to='`/users/${member.id}`'>
              <user-card :user-for-card="member"></user-card>
            </router-link>
          </div>
        </div>
      </section>
      <div class="margin-2"></div>
      <section class="has-background-white padding-1">
        <div class="level">
          <h1 class="is-size-5">Ressourcen</h1>
          <router-link v-if="isAdministrator" :to="`/organisations/${organisationid}/resources/create`" class="button is-icon is-link has-text-white">
            <i class="fas fa-plus" />&nbsp;Hinzufügen
          </router-link>
        </div>
        <div class="columns is-multiline">
          <loader v-if="!resourcesLoaded"></loader>
          <div class="resource-card column is-half" :key="index" v-for="(resource,index) in organisationResources">
            <router-link :to='`/organisations/${resource.organisationId}/resources/${resource.id}`'>
              <resource-card :resource-for-card="resource" />
            </router-link>
          </div>
        </div>
      </section>
      <div class="height-2"></div>

    </div>
    <invite-email-modal @member-deleted="removeMember" :organisation="organisation" :organisation-members="organisationMembers"
      :active="inviteModalActive" @closeModal="inviteModalActive=false"></invite-email-modal>
  </div>
</template>

<script>
  import Loader from './../components/Loader.vue'
  import InviteEmailModal from './../components/modals/InviteEmailModal.vue'
  import ResourceCard from './../components/Resource-Card.vue'
  import UserCard from './../components/User-Card.vue'
  export default {
    name: 'organisation',
    components: {
      Loader,
      ResourceCard,
      InviteEmailModal,
      UserCard
    },
    data() {
      return {
        organisationid: null,
        inviteModalActive: false,
        loaded: false,
        resourcesLoaded: false,
        membersLoaded: false
      }
    },
    created() {
      this.organisationid = this.$route.params.orgid
      if (this.organisationid) {
        if (!this.$store.getters.organisations[this.organisationid]) {
          this.$store.dispatch('loadOrganisation', this.organisationid)
            .then(resp => {
              this.loaded = true
            })
            .catch(err => {
              //TODO signal error
              this.loaded = true
            })
        } else {
          this.loaded = true
        }
        this.loadMembers(this.organisationid)
        this.loadResources(this.organisationid)

      }

    },
    methods: {
      loadMembers(orgid) {
        this.$store.dispatch('getMembersForOrganisation', orgid)
          .then(members => {
            this.membersLoaded = true
          })
          .catch(err => {
            this.membersLoaded = true
          })
      },
      loadResources(orgid) {
        this.$store.dispatch('loadResourcesForOrganisation', orgid)
          .then(resp => {
            this.resourcesLoaded = true

          })
          .catch(err => {
            //TODO signal error
            this.resourcesLoaded = true
          })
      },
      removeMember(memberid) {
        this.organisation.members= this.organisation.members.filter(id=> id!==memberid)
      }
    },
    computed: {
      organisation() {
        return this.$store.getters.organisation(this.organisationid) || {}
      },
      organisationResources() {
        return this.$store.getters.organisationResources(this.organisationid) || []
      },
      organisationMembers() {
        return (this.organisation) ? this.$store.getters.usersFiltered(this.organisation.members) : []
      },
      isAdministrator() {
        return (this.organisation.currentOwner == this.$store.getters.currentUser.sub)
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>