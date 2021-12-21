import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
   path: '/',
   name: 'Home',
   component: Home,
   // kedua di bawah ini variabel custom (untuk di ambil datanya)
   text: "Home",
   mainMenu: true,
  },
  {
    path: '/explore',
    name: 'Explore',
    component: Home,
    // kedua di bawah ini variabel custom (untuk di ambil datanya)
    text: "Explore",
    mainMenu: true,
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: Home,
    // kedua di bawah ini variabel custom (untuk di ambil datanya)
    text: "Notification",
    mainMenu: true,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Home,
    // kedua di bawah ini variabel custom (untuk di ambil datanya)
    // untuk membuat icon yang dinamis
    text: "messages",
    mainMenu: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Home,
    mainMenu: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


