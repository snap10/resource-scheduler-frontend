import './scss/style.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './vuex/store'
import './registerServiceWorker'
import moment from 'moment'
require('moment/locale/de')
Vue.config.productionTip = false
Vue.use(require('vue-moment'),{moment});
var v = new Vue({
  router,
  store,
  render: h => h(App)
})

var keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required',checkLoginIframe: false}).success(function(authenticated) {
        console.log('Authenticated?',authenticated)
        if(!authenticated) router.push('Error')
        else{
          store.commit('setKeycloak',keycloak)
          store.dispatch('loadUserAccount',keycloak.idToken)
          .then(()=>{
            
          })
          .catch(() =>{
            router.push('Error')
          })

        }
        v.$mount('#app')
        
        return authenticated
    }).error(function() {
      router.push('Error')
      v.$mount('#app')
    });