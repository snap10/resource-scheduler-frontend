// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import 'vue-event-calendar/dist/style.css' // ^1.1.10, CSS has been extracted as one file, so you can easily update it.
import vueEventCalendar from 'vue-event-calendar'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
Vue.config.productionTip = false
Vue.use(vueEventCalendar, {locale: 'en'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
