import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import EditResource from '@/views/EditResource.vue'
import Resource from '@/views/Resource.vue'
import Organisation from '@/views/Organisation.vue'
import EditOrganisation from '@/views/EditOrganisation.vue'
import Organisations from '@/views/Organisations.vue'
import About from '@/views/About.vue'
import Account from '@/views/Account.vue'
import AccountCreation from '@/views/AccountCreation.vue'
import Welcome from '@/views/Welcome.vue'
import Error from '@/views/Error.vue'
import store from './../vuex/store'
Vue.use(VueRouter)

const router = new VueRouter({
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
      name: 'AddPrivateResource',
      component: EditResource
    },
    {
      path: '/resources/:resid',
      name: 'Resource',
      component: Resource
    },
    {
      path: '/resources/:resid/edit',
      name: 'EditPrivateResource',
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
      path: '/organisations/:orgid',
      name: 'Organisation',
      component: Organisation
    },
    {
      path: '/organisations/:orgid/edit',
      name: 'EditOrganisation',
      component: EditOrganisation
    },
    {
      path: '/organisations/:orgid/resources/create',
      name: 'AddResource',
      component: EditResource
    },
    {
      path: '/organisations/:orgid/resources/:resid',
      name: 'OrgResource',
      component: Resource
    },
    {
      path: '/organisations/:orgid/resources/:resid/edit',
      name: 'EditResource',
      component: EditResource
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/account/creation',
      name: 'AccountCreation',
      component: AccountCreation
    },
    {
      path:'/account',
      name:'Account',
      component:Account
    },
    {
      path: '*',
      name: 'Error',
      component: Error
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(['Login','Register','Welcome'].indexOf(to.name)>-1){
    next()
  }else if(!store.getters.isLoggedIn){
    next({path:'/welcome'})
  }else{
    next()
  }
})

export default router
