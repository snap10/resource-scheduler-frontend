import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import EditResource from '@/views/EditResource.vue'
import Resource from '@/views/Resource.vue'
import Organisation from '@/views/Organisation.vue'
import EditOrganisation from '@/views/EditOrganisation.vue'
import Organisations from '@/views/Organisations.vue'
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
      component: EditResource
    },
    {
      path: '/organisations',
      name: 'Organisations',
      component: Organisations
    },
    {
      path: '/organisations/create',
      name: 'AddOrganisation',
      component: EditOrganisation
    },
    {
      path: '/organisations/:id',
      name: 'Organisation',
      component: Organisation
    },
    {
      path: '/organisations/:id/edit',
      name: 'EditOrganisation',
      component: EditOrganisation
    },
    {
      path: '/resources/:id',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/resources/:id/edit',
      name: 'EditResource',
      component: EditResource
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})
