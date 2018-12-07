import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import AddResource from '@/views/AddResource.vue'
import Resource from '@/views/Resource.vue'
import Organization from '@/views/Organization.vue'
import Organizations from '@/views/Organizations.vue'
import About from '@/views/About.vue'
import Error from '@/views/Error.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    { path: '/login',
      name: 'Login',
      component: Login
    },
    { path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/resources/create',
      name: 'AddResource',
      component: AddResource
    },
    {
      path: '/organizations',
      name: 'Organizations',
      component: Organizations
    },
    {
      path: '/organizations/:id',
      name: 'Organization',
      component: Organization
    },
    {
      path: '/resources/:id',
      name: 'Resource',
      component: Resource
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
