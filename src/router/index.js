import { createRouter, createWebHistory } from 'vue-router'


import detailes_component from '@/components/detailes_component.vue'
import cart_component from '@/components/cart_component.vue'
import home_component from '@/components/home_component.vue'
import wishlist_component from '@/components/wishlist_component.vue'

const routes = [
    { path: '/', name: 'Home', component: home_component },
    { path: '/home', name: 'HomePage', redirect: '/'  },
    // { path: ' /about', name: 'About', component: About },
    { path: '/wishlist', name: 'wishlist', component: wishlist_component  },
    { path: '/cart', name: 'Cart', component: cart_component  },
    // { path: '/contact', name: 'Contact', component: Contact },
    { path: '/product/:id', name: 'ProductDetails', component: detailes_component, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
  })
  
  export default router