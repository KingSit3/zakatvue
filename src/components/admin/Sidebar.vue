<template>
  <!-- logo -->
  <div class="h-[10%] text-white/90">
    <router-link :to="{name: 'home'}" class="flex justify-center items-center space-x-2 pt-5">
      <h1 class="text-xl font-extrabold">Zakat Admin</h1>
    </router-link>
  </div>
  <!-- End logo -->

  <!-- Sidebar -->
  <div class="h-[90%] my-5 space-y-5 px-5 max-h-[490px] overflow-y-auto text-center">

    <!-- Sidebar menu Active -->
    <router-link to="/zakatadmin" :class="[ this.$route.fullPath == '/zakatadmin' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Dashboard</h1>
    </router-link>
    <!-- Sidebar menu Active -->

    <!-- Zakat Fitrah menu -->
    <router-link to="/zakatadmin/fitrah" :class="[ this.$route.name == 'fitrah' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Zakat Fitrah</h1>
    </router-link>
    <router-link to="/zakatadmin/mal" :class="[ this.$route.name == 'mal' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Zakat Mal</h1>
    </router-link>
    <router-link to="/zakatadmin/infaq" :class="[ this.$route.name == 'infaq' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Infaq</h1>
    </router-link>
    <router-link to="/zakatadmin/mustahik" :class="[ this.$route.name == 'mustahik' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Daftar Mustahik</h1>
    </router-link>
    <router-link to="/zakatadmin/transaksi/zakat" :class="[ this.$route.name == 'transaksiZakat' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Transaksi Zakat</h1>
    </router-link>
    <router-link to="/zakatadmin/transaksi/infaq" :class="[ this.$route.name == 'transaksiInfaq' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Transaksi Infaq</h1>
    </router-link>
    <a :href="`${backendEndpoint}fitrahexport`" :class="[ this.$route.name == 'transaksiInfaq' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Laporan Zakat Fitrah</h1>
    </a>
    <a :href="`${backendEndpoint}infaqexport`" :class="[ this.$route.name == 'transaksiInfaq' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
      <h1 class="text-lg font-bold">Laporan Infaq</h1>
    </a>
    <div v-show="role == 'admin' ">
      <router-link to="/zakatadmin/admins" :class="[ this.$route.name == 'admins' ? 'text-blue-500/90 bg-white' : 'text-white/50 hover:text-white/100 duration-150']" class="flex p-1.5 px-5 rounded-full items-center space-x-2 duration-200">
        <h1 class="text-lg font-bold">Admin</h1>
      </router-link>
    </div>
    <!-- Zakat Fitrah menu -->

  </div>
  <!-- End Sidebar -->

  <!-- Footer -->
  <div class="h-[5%] flex items-center justify-between px-10">
    <!-- Footer Option -->
    <button @click="logout()" class="text-right text-white/50 hover:text-white duration-150">Logout</button>
    <h3 class="font-semibold capitalize"> {{ user }} </h3>
    <!-- End Footer Option -->
  </div>
  <!-- End Footer -->
</template>

<script>
import axios from '@/axios.js'

export default {
  data() {
    return {
      user: localStorage.getItem('nama'),
      role: localStorage.getItem('role'),
      backendEndpoint: process.env.VUE_APP_ZAKAT_ENDPOINT,
    }
  },
  methods: {
    logout(){
      // Delete all data in local storage
      axios.zakatAxios.post('http://127.0.0.1:8000/api/logout', {
        name: localStorage.getItem('nama')
      })
      localStorage.clear()
      this.$router.push({name: 'login'})
    }
  },
}
</script>