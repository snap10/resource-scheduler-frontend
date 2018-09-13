<template>
  <div id="my-nav">
    <nav class="navbar is-fixed-top is-link">
      <div class="navbar-brand">
        <a class="is-white navbar-item" v-if="$route.path!='/'" @click="$router.back()">
          <span>
            <i class="fa fa-2x fa-arrow-left"></i>
          </span>
        </a>
        <router-link class="is-white" :to="'/'">
          <img src="/static/assets/logo.png" alt="Noisemap logo" style="margin:0.1rem;height:2.7rem">
        </router-link>
        <div class="navbar-item " @click="isActive = false">
          <router-link class="is-white" :to="'/'">
            <h1 class="title is-white">DingTeiler</h1>
          </router-link>
        </div>
        <div class="navbar-burger burger" @click="isActive = !isActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-menu" v-bind:class="{ 'is-active': isActive }" class="navbar-menu" @click="navClick">
        <div class="navbar-start">
          <div class="navbar-item">
            <router-link class="navbar-link" :to="'/resources'">
                Meine Ressourcen
            </router-link>
          </div>
          <div class="navbar-item has-dropdown" :class="{'is-active':activeAbout}" @click="activeAbout = !activeAbout">
            <p class="navbar-link is-size-5">
                  About
            </p>
            <div class="navbar-dropdown">
                  <a class="navbar-item" @click:prevent="openReportModal">
                    Send Report
                  </a>
                  <router-link :to="'/datenschutzerklaerung'" class="navbar-item">
                    Datenschutzerklärung
                  </router-link>
                  <router-link :to="'/agb'" class="navbar-item">
                    AGBs
                  </router-link>
                  <router-link :to="'/impressum'" class="navbar-item">
                    Impressum
                  </router-link>
            </div>
        </div>
        </div>
        <div class="navbar-end">
          <div v-if="!isLoggedIn" class="navbar-item is-hoverable" @click="isActive = false">
            <router-link class=" navbar-link" :to="'/login'">
              Login
            </router-link>
          </div>
          <div v-if="!isLoggedIn" class="navbar-item is-hoverable" @click="isActive = false">
            <router-link class="navbar-link" :to="'/register'">
              Register
            </router-link>
          </div>
          <div v-if="isLoggedIn" class="">

            <div class="navbar-item has-dropdown" :class="{'is-active':activeProfile}" @click="activeProfile = !activeProfile">
              <a class="navbar-link is-size-5">
                Hello {{user.username}}
              </a>
              <div class="navbar-dropdown">

                <router-link :to="'/profile'" class="navbar-item">
                  Profile
                </router-link>
                <router-link :to="'/settings'" class="navbar-item">
                  Settings
                </router-link>
                <hr class="navbar-divider">
                <a class="navbar-item has-text-danger" @click="logout">
                  Logout
                </a>

              </div>
            </div>
          </div>
        </div>

      </div>
    </nav>
    <send-report-modal @closeReportModal="closeReportModal" :active="reportModal"></send-report-modal>
  </div>
</template>
<script>
  import SendReportModal from './modals/SendReportModal.vue'
  export default {
    name: 'my-nav',
    components:  {
      SendReportModal
    },
    data() {
      return {
        isActive:false,
        activeAbout: false,
        activeProfile: false,
        reportModal: false
      }
    },
    methods: {
      logout() {
        this.$store.dispatch("logout")
        this.$store.dispatch("loginGuest")
      },
      openReportModal() {
        this.reportModal = true
      },
      closeReportModal() {
        this.reportModal = false
      },
      deactivate() {
        console.log('deactivating')
        this.activeAbout = false
        this.activeProfile = false
      },
      navClick(){
      if(this.isActive) this.isActive=false
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      user() {
        return this.$store.getters.currentUser
      }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (max-width: 1023px) {
    #nav-profile-view {
      color: black
    }
  }

  .navbar-item {
    height: 100%
  }

  a.is-white,
  .title.is-white {
    color: white;
  }

  .height-70p {
    height: 2rem;
  }

  .flex.flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .margin-right-1 {
    margin-right: 1rem
  }

  .margin-left-1 {
    margin-left: 1rem
  }
  #nav-menu {
    z-index: 600;
  }
  .navbar-dropdown{
    z-index: 600;
  }
</style>
