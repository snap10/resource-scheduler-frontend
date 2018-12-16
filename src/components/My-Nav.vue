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
          <div class="navbar-item " @click="isActive = false">
            <img src="/assets/logo.png" alt="Logo" style="margin:0.1rem;height:2.7rem">

            <h1 class="subtitle brand-name has-text-white">DingTeiler</h1>
          </div>
        </router-link>
        <div class="navbar-burger burger" @click="isActive = !isActive">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="nav-menu" v-bind:class="{ 'is-active': isActive }" class="navbar-menu" @click="navClick">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="'/organisations'">
            Your Organisations
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link v-if="!isLoggedIn" class="navbar-item is-hoverable" @click="isActive = false" :to="'/login'">
            Login
          </router-link>
          <router-link v-if="!isLoggedIn" class="navbar-item is-hoverable" @click="isActive = false" :to="'/register'">
            Register
          </router-link>
          <div v-if="isLoggedIn" class="">

            <div class="navbar-item navbar-item navbar-link is-arrowless" :class="{'is-active':activeProfile}" @click="activeProfile = !activeProfile">
              <figure class="avatar">
                <img src="https://placehold.it/128x128">
              </figure>
              <p class="username">
                {{user.preferred_username}}
              </p>

              <div class="navbar-dropdown">

                <router-link :to="'/profile'" class="navbar-item">
                  Profile
                </router-link>
                <a href="https://keycloak.auth.134.60.152.98.xip.io/auth/realms/dingteiler/account/" class="navbar-item">
                  Account
                </a>
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
    components: {
      SendReportModal
    },
    data() {
      return {
        isActive: false,
        activeAbout: false,
        activeProfile: false,
        reportModal: false
      }
    },
    methods: {
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
      navClick() {
        if (this.isActive) this.isActive = false
      },
      logout(){
        this.$store.dispatch('logout');
      }
    },
    computed: {
      isLoggedIn() {
        return this.$store.getters.isLoggedIn
      },
      user() {
        return this.$store.getters.currentUser || {}
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

  .navbar-dropdown {
    z-index: 600;
  }
</style>