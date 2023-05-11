import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/commonuse/login.vue'
import userreg from '@/views/users/reg/register.vue'
import shangjiarreg from '@/views/shangjia/reg/register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'userlogin',
    component: login,
  },{
    path:'/userreg',
    name:'commonuserreg',
    component:userreg,
  },{
    path:'/shangjiareg',
    name:'shangjiareg',
    component:shangjiarreg,
  },
]

const router = new VueRouter({
  mode:"history",
  base:process.env.BASE_URL,
  routes
})

export default router
