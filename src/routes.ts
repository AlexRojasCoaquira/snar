import { createWebHistory, createRouter } from 'vue-router'

// import Auth from './pages/auth/Auth.vue'
import Home from '@/pages/Home.vue'
import Orders from '@/pages/Orders.vue'
import Products from '@/pages/Products.vue'

import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import NotFound from '@/pages/NotFound.vue'

import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: '',
        component: Login,
      },
      {
        path: 'sign-up',
        name: 'register',
        component: Register,
      },
      // {
      //   path: 'forgot',
      //   component: Forgot,
      // },
    ],
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        name: 'home',
        path: '/users',
        component: Home,
      },
      {
        name: 'products',
        path: '/products',
        component: Products,
      },
      {
        name: 'orders',
        path: '/orders',
        component: Orders,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
