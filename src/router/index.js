import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/commonuse/login.vue'
import userreg from '@/views/users/reg/register.vue'
import shangjiarreg from '@/views/shangjia/reg/register.vue'
import shangjiaindex from '@/views/shangjia/managepage/index.vue'
import userindex from '@/views/users/userindex/index.vue'
import shangjiadetail from '@/views/users/shangjiapage/shangjiadetail.vue'
import cart from '@/views/users/shangjiapage/cart.vue'
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
  },{
    path:"/shangjiaindex",
    name:"shangjiaindex",
    component:shangjiaindex,
    children:[
      {
        path:'dishesshow',
        name:'dishesshow',
        component:()=>import('@/views/shangjia/managepage/dishesshow.vue'),
      },
      {
        path:'shangjiainfo',
        name:'shangjiainfo',
        component:()=>import('@/views/shangjia/managepage/shangjiainfo.vue'),
        alias:'',
      },
      {
        path:'dishesadd',
        name:'dishesadd',
        component:()=>import('@/views/shangjia/managepage/dishesadd.vue'),
      },
      {
        path:'disheschange',
        name:'disheschange',
        component:()=>import('@/views/shangjia/managepage/disheschange.vue'),
      },{
        path:"ordershow",
        name:"ordershow",
        component:()=>import("@/views/shangjia/managepage/ordershow.vue"),
      }
      
    ],
  },
  {
    path:"/userindex",
    name:"userindex",
    component:userindex,
  },{
    path:"/shangjiadetail",
    name:"shangjiadetail",
    component:shangjiadetail,
  },{
    path:"/cart",
    name:"cart",
    component:cart,
  }
]

const router = new VueRouter({
  mode:"history",
  base:process.env.BASE_URL,
  routes
})

export default router
