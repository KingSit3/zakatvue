import { createRouter, createWebHistory } from 'vue-router'

import ZakatAdmin from '../views/ZakatAdmin.vue'
  import FitrahAdmin from '../components/admin/ZakatFitrahContent.vue'
  import MalAdmin from '../components/admin/ZakatMalContent.vue'
  import InfaqAdmin from '../components/admin/InfaqContent.vue'
  import Mustahik from '../components/admin/MustahikContent.vue'
  import MustahikDetail from '../components/admin/MustahikDetail.vue'
  import Dashboard from '../components/admin/Dashboard.vue'
  import TransaksiZakat from '../components/admin/TransaksiZakat.vue'
  import TransaksiInfaq from '../components/admin/TransaksiInfaq.vue'
  import Admins from '../components/admin/Admins.vue'
  
import zakatHome from '../views/Home.vue'
import zakatCalculate from '../views/ZakatCalculate.vue'
import ZakatSearch from '../views/ZakatSearch.vue'
import Login from '../views/Login.vue'

const routes = [
  // Zakat Page Links
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/calculate',
    name: 'zakatCalculate',
    component: zakatCalculate,
    meta: { requiresToken: true }
  },
  {
    path: '/',
    name: 'home',
    component: zakatHome,
  },
  {
    path: '/cari',
    name: 'zakatSearch',
    component: ZakatSearch,
    meta: { requiresToken: true }
  },
  {
    path: '/zakatadmin',
    name: 'ZakatAdmin',
    component: ZakatAdmin,
    meta: { requiresToken: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresToken: true }
      },
      {
        path: 'fitrah',
        name: 'fitrah',
        component: FitrahAdmin,
        meta: { requiresToken: true }
      },
      {
        path: 'mal',
        name: 'mal',
        component: MalAdmin,
        meta: { requiresToken: true }
      },
      {
        path: 'infaq',
        name: 'infaq',
        component: InfaqAdmin,
        meta: { requiresToken: true }
      },
      {
        path: 'mustahik',
        name: 'mustahik',
        component: Mustahik,
        meta: { requiresToken: true }
      },
      {
        path: 'mustahik/:id',
        name: 'mustahikDetail',
        component: MustahikDetail,
        meta: { requiresToken: true }
      },
      {
        path: 'transaksi/zakat',
        name: 'transaksiZakat',
        component: TransaksiZakat,
        meta: { requiresToken: true }
      },
      {
        path: 'transaksi/infaq',
        name: 'transaksiInfaq',
        component: TransaksiInfaq,
        meta: { requiresToken: true }
      },
      {
        path: 'admins',
        name: 'admins',
        component: Admins,
        meta: { requiresToken: true }
      },
    ]
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


