import 'buefy/dist/buefy.css'
import './scss/style.scss'
import Vue from 'vue'
import Buefy from 'buefy'
import App from './App.vue'
import router from './router/index'
import store from './vuex/store'
import './registerServiceWorker'
import Notifications from 'vue-notification'
import VeeValidate from 'vee-validate'
var VueTruncate = require('vue-truncate-filter')
Vue.use(Notifications)
Vue.use(VueTruncate)
Vue.use(VeeValidate)
Vue.use(Buefy)
Vue.use(require('vue-moment'),{moment});
import moment from 'moment'
require('moment/locale/de')
Vue.config.productionTip = false
var v = new Vue({
  router,
  store,
  render: h => h(App)
})

checkToken()
function checkToken () {
  if(['Login','Register','Welcome'].indexOf(router.currentRoute.name)>-1){
    console.log('Accessing non-protected route')
  }else if(!store.getters.isLoggedIn){
    console.log('Redirecting to default')
    router.replace('/welcome')
  }else if (store.getters.access_token_expired) {
    store.dispatch('refreshAccessToken')
    .then(()=>{
      store.dispatch('loadUserAccount')
      .then(() => {
        
      }).catch((err) => {
        if(err.response.status==404){
          //Account not yet present
          router.replace('/account/creation')
        }
      });
    })
    .catch(()=>{
      console.log('Redirecting to default')
      router.replace('/welcome')
    
    })
  }else{
    store.dispatch('loadUserAccount')
    .then(() => {
        
    }).catch((err) => {
      if(err.response.status==404){
        //Account not yet present
        router.replace('/account/creation')
      }
    });
  }
  v.$mount('#app')
}