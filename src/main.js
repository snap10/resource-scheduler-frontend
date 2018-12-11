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
        if(authenticated){
          store.commit('setKeycloak',keycloak)
        }
        v.$mount('#app')
        if(!authenticated) router.push('Error')
        return authenticated
    }).error(function() {
      window.location = "/error.html";

    });