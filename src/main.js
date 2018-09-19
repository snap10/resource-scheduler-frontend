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
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
