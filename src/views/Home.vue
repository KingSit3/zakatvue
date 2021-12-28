<template>
  <Header />
  <div class="flex gap-10 justify-center container mx-auto px-20">
    <router-link to="/calculate">
      <div class="p-10 bg-[#1dad52] rounded-lg text-white font-semibold">
        Hitung Zakat
      </div>
    </router-link>
    <router-link to="/zakatadmin">
      <div class="p-10 bg-[#1dad52] rounded-lg text-white font-semibold">
        Halaman Admin
      </div>
    </router-link>
    <router-link to="/cari">
      <div class="p-10 bg-[#1dad52] rounded-lg text-white font-semibold">
        Cek Status Zakat
      </div>
    </router-link>
  </div>
</template>

<script>
import Header from '../components/calculate/ZakatHeader.vue'

export default {
  components:{
    Header,
  }
}
</script>

<style>

</style>