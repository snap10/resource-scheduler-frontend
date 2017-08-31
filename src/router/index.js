import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Resources from '@/views/Resources.vue'
import Resource from '@/views/Resource.vue'
import About from '@/views/About.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/resources',
      name: 'Resources',
      component: Resources
    },
    {
      path: '/resources/:id',
      name: 'Resource',
      component: Resource
    }
  ]
})
