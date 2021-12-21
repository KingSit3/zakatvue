<template>
  <div class="flex flex-col min-h-screen bg-gray-800 text-white">

    <!-- header, main, footer itu namanya Semantic HTML -->
    <header class="flex items-center border-b border-gray-600">
      <!-- Router link to itu semacam a href, cuma ini dari VUE -->
      <router-link to="/profile" class="p-4 mr-3 text-green-500 text-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </router-link>
      <!-- Pakai $ untuk mengambil data route.name yang dilooping dari v-for-->
      <div class="text-2xl font-bold">{{ $route.name }}</div>
    </header>

    <main class="flex-1 overflow-scroll">
      <router-view />
      <!-- {{ routes }} -->
    </main>

    <footer class="grid grid-cols-4 border-t border-gray-600">
       <!-- Pakai backtick `` agar bisa menulis javascript -->
       <!-- Jika route.name v-for == route.name yang sedang aktif-->
       <!-- Ini untuk tombol aktif di navbar -->
      <router-link 
        v-for="(route, id) in routes" :key="id"
        :to="route.path " 
        :class="`p-4 text-center text-2xl ${(route.name == $route.name) ? 'text-green-500' : '' } `">
          <!-- Untuk mengambil dari file VUE router, lalu ambil text -->
          {{ route.text }}
      </router-link>
    </footer>
  </div>
</template>

<script>
import {ref, onBeforeMount} from 'vue';
import {useRouter} from 'vue-router';

export default {
  setup(){
    const routes = ref([]);
    // Untuk pakai komponen Vue Router
    const router = useRouter();

    // Sebelum halaman ini dibuka, jalankan fungsi ini dulu
    onBeforeMount(() => {
      // Jika mainMenu = true, maka masukkan ke routes.value
      routes.value = router.options.routes.filter(r => r.mainMenu)
    });

    return {
      routes
    }
  }
}
</script>