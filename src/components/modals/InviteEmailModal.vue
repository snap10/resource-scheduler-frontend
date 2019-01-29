<template>
  <div class="modal" :class="{ 'is-active':active  }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Invite by Email</p>
        <button @click="closeModal" class="" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <b-field label="Emails eingeben">
          <b-taginput v-model="emails" :allow-new="true" placeholder="Email hinzufügen" type="is-link" :before-adding="isEmail"
            attached>
          </b-taginput>
        </b-field>
        <button class="button is-success" :class="{'is-loading':inviteLoading}" @click="inviteEmails(emails)">Einladen</button>


        <div class="height-2"></div>
        <h3 class=""><strong>Bestehende Einladungen</strong></h3>
        <div class="height-1"></div>
        <progress v-if="joinInvitationsPending" class="progress is-small is-link" max="100">15%</progress>

        <div class="is-fullwidth" :key="`invitation-${index}`" v-for="(invitation,index) in joinInvitations">
          <b-checkbox class="is-fullwidth" :native-value="invitation.id" v-model="checkedInvitations">
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="heading is-size-6">{{invitation.email}}</p>
                    <p class="is-size-6">{{invitation.status}}</p>
                    <p class="is-size-7">{{invitation.errorReason}}</p>
                  </div>
                  <div class="media-right">
                    <a href="">
                      <span class="is-invisible icon"><i class="fas fa-ellipsis-v has-text-grey"></i></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </b-checkbox>
        </div>
   <div class="height-1"></div>
        <button class="button is-danger" :class="{'is-loading':removeInvitationsPending}" :disabled="checkedInvitations.length==0"
          @click="removeInvitationsClick(checkedInvitations)">{{checkedInvitations.length}} Einladungen zurückziehen</button>

        <div class="height-2"></div>
        <h3 class=""><strong>Benutzer entfernen</strong></h3>
        <div class="height-1"></div>
        <div class="is-fullwidth" :key="index" v-for="(member,index) in organisationMembers">
          <b-checkbox class="is-fullwidth" :disabled="member.id==organisation.currentOwner" :native-value="member.id"
            v-model="checkedUsers">
            <user-card class="" :text-third-row="member.email" :user-for-card="member"></user-card>
          </b-checkbox>
        </div>
        <div class="height-1"></div>
        <button class="button is-danger" :class="{'is-loading':removePending}" :disabled="checkedUsers.length==0"
          @click="removeUsersClick(checkedUsers)">{{checkedUsers.length}} Entfernen</button>

      </section>

      <footer class="modal-card-foot">
        <button @click="closeModal" class="button is-pulled-left is-outlined">Close</button>
      </footer>
    </div>
  </div>
</template>
<script>
  import organisationsApi from './../../api/organisations.js'
  import UserCard from './../User-Card.vue'

  export default {
    name: 'invite-by-email-modal',
    components: {
      UserCard
    },
    props: ['active', 'organisation', 'organisationMembers'],
    data() {
      return {
        inviteLoading: false,
        joinInvitationsPending: false,
        removeInvitationsPending: false,
        removePending: false,
        emails: [],
        joinInvitations: [],
        checkedInvitations: [],
        checkedUsers: [],
      }
    },
    watch:{
      active(){
        if(this.active)this.getJoinInvitations(this.organisation.id)
      }
    },
    methods: {
      closeModal() {
        this.$emit('closeModal')
      },
      inviteEmails(emails) {
        if (emails.length > 0) {
          this.inviteLoading = true
          organisationsApi.inviteEmails(this.organisation.id, emails)
            .then(() => {
              this.inviteLoading = false
              this.emails = []
              this.getJoinInvitations()
              this.$emit('emails-invited')
            })
            .catch(err => {
              this.inviteLoading = false
              console.error(err.response.statusText)
            })
        }
      },
      getJoinInvitations(orgid) {
        this.joinInvitationsPending = true
        organisationsApi.getJoinInvitations(orgid)
          .then((result) => {
            this.joinInvitationsPending = false
            this.joinInvitations = result.data
          }).catch((err) => {
            //TODO
            console.error(err.response.statusText)
            this.joinInvitationsPending = false
          });
      },
      removeUsersClick(userids) {
        var calls = []
        userids.forEach(id => {
          this.removePending = true
          var p = organisationsApi.deleteMemberForOrganisation(this.organisation.id, id)
            .then(() => {
              this.$emit('member-deleted', id)
            }).catch((err) => {
              //TODO show error notifcation
              console.error(err.response.statusText)
            });
          calls.push(p)
        })
        Promise.all(calls)
          .then(() => {
            this.removePending = false
            this.checkedUsers = []

          }).catch((err) => {
            this.removePending = false
            console.error(err.response.statusText)
console.error(err.response.statusText)
          });

      },
      removeInvitationsClick(invitationIds) {
        var calls = []
        invitationIds.forEach(id => {
          this.removeInvitationsPending = true
          var p = organisationsApi.deleteJoinInvitationsForOrganisation(this.organisation.id, id)
            .then(() => {
              this.$emit('invitation-deleted', id)
              this.getJoinInvitations(this.organisation.id)
            }).catch((err) => {
              //TODO show error notifcation
              console.error(err.response.statusText)
            });
          calls.push(p)
        })
        Promise.all(calls)
          .then(() => {
            this.removeInvitationsPending = false
            this.checkedInvitations = []

          }).catch((err) => {
            this.removeInvitationsPending = false
            console.error(err.response.statusText)
          });

      },
      isEmail(text) {
        var re = /\S+@\S+\.\S+/;
        //TODO emit error notification
        return re.test(text);
      }
    }
  }
</script>
<style>
  .b-checkbox.checkbox .control-label {
    width: 100%;
  }
</style>