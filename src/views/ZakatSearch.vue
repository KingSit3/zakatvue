<template>

  <Header />

  <main class="relative max-w-[1400px] mx-auto min-h-[313px] max-h-full">
    <div class="w-1/2 mx-auto justify-center">
      <div class="text-center space-y-2">
        <h2 class="text-2xl font-bold">Sudahkah Anda Berzakat?</h2>
        <div>
          
          <!-- Textbox Jumlah Zakat -->
          <div class="flex flex-col w-1/2 mx-auto">
            <label for="no_telp">Nomor Telepon Anda</label>
            <div class="space-x-4">
            <input
              id="no_telp"
              type="number"
              v-model="noTelp"
              class="ring-2 ring-trueGray-300 focus:ring-[#1dad52] rounded-lg p-1.5 focus:outline-none outline-none duration-150 mt-1" 
              placeholder="081xxxx"
            >
            <button 
              @click="cari()"
              :disabled="!noTelp" 
              :class="[noTelp ? 'ring-[#1dad52] text-[#1dad52] hover:text-white hover:bg-[#1dad52]' : 'ring-gray-500 text-gray-500' ,'font-semibold ring-2 p-1.5 px-5 rounded-xl duration-150']" 
            >Cari</button>
            </div>
          </div>
          <!-- End Textbox Jumlah Zakat -->

        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="transform translate-y-10 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-10 opacity-0"
    >
    <div v-show="openResult" class="relative flex justify-center items-center mt-40">
      <div class="absolute bg-white rounded-xl shadow-xl w-3/5 min-h-full mx-40 pt-10 pb-5 px-5">
        
        <!-- If No data -->
        <div v-if="items.length == 0" class="text-center">
          Data tidak ditemukan!
        </div>
        <!-- End If No data -->

        <!-- Table Content -->
        <table v-else class="table-fixed w-full">
          <thead class="font-semibold">
            <td class="w-[10%]">No</td>
            <td class="w-[30%]">Nama</td>
            <td class="w-[20%]">Jenis Zakat</td>
            <td class="w-[20%]">Jumlah Zakat</td>
            <td class="w-[20%]">Tanggal Zakat</td>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="item.id" class="odd:bg-green-50">
              <td class="truncate">{{ index+1 }}</td>
              <td class="truncate">{{ item.nama }}</td>
              <td class="truncate">{{ item.jenis }}</td>
              <td class="truncate">{{  item.jenis == 'uang' ? convertToCurrency(item.jumlah) : item.jumlah + " L" }}</td>
              <td class="truncate">{{ timeFormatter(item.updated_at) }}</td>
            </tr>
          </tbody>
        </table>
        <!-- End Table Content -->

        <!-- Close Button -->
        <button @click="openResult = false; data = {}" class="text-xl font-bold text-red-500 absolute top-0 right-5">X</button>
        <!-- End Close Button -->

      </div>
    </div>
    </transition>

  </main>

  <Footer />

  <Toast 
    @trigger-toast-done="triggerToast = false; toastText = ''; toastTimeout = null"
    :text="toastText" 
    :showProps="triggerToast" 
    :timeoutProps="toastTimeout"
  />

</template>

<script>
import Header from '@/components/calculate/ZakatHeader.vue'
import Footer from '@/components/calculate/ZakatFooter.vue'
import Toast from '@/components/admin/parts/Toast.vue'
import axios from '@/axios.js'

export default {
  data() {
    return {
      items: {},
      openResult: false,
      noTelp: null,

      triggerToast: false,
      toastText: '',
      toastTimeout: null,
    }
  },

  components: {
    Header,
    Footer,
    Toast
  },

  methods: {
    cari(){

      const number = parseInt(this.noTelp)

      // Validation If not Number
      axios.zakatAxios.get('cekstatuszakat/'+number)
      .then(res => {
        console.log(res);
        this.items = res.data
        this.openResult = true
      })

      .catch(err => {
        this.toast("Ups Ada Kesalahan")
        console.log(err);
      })
    },

    toast(text, timeout = 2000){
      this.toastText = text
      this.toastTimeout = timeout
      this.triggerToast = true
    },

    timeFormatter(param){
      return new Date(param)
            .toLocaleString('id-ID', {year: 'numeric', month: 'short', day: 'numeric', weekday: 'long'}) 
    },

    convertToCurrency(params){
      return  new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'} )
              .format(params)
    },
  },

}
</script>