<template>

  <!-- Content -->
  <div class="mt-8">
    
    <!-- Search & Add -->
    <div class="flex justify-between items-center">

      <!-- Tambah Button -->
      <button @click="modalOpen = true; modalHeader = 'tambah'" class="bg-blue-500 p-1.5 px-5 my-2 text-white rounded-lg font-semibold focus:outline-none">Tambah Transaksi Infaq</button>
      <!-- End Tambah Button -->  

      <!-- Search -->
      <div class="flex flex-col items-center relative opacity-75">
        <div class="flex space-x-5">
          <div class="flex items-center flex-col space-y-1">
            <label for="tglawal">Dari Tanggal</label>
            <input v-model="searchStartDate" type="date" id="tglawal" class="p-1.5 focus:outline-none shadow-lg ring-2 ring-trueGray-300 focus:ring-blue-500 duration-150 rounded-md">
          </div>
          <div class="flex items-center flex-col space-y-1">
            <label for="tglakhir">Sampai Tanggal</label>
            <input v-model="searchEndDate" type="date" id="tglakhir" class="p-1.5 focus:outline-none shadow-lg ring-2 ring-trueGray-300 focus:ring-blue-500 duration-150 rounded-md">
          </div>
        </div>
      </div>
      <!-- End Search & Add -->

    </div>
    <!-- End Search -->

    <!-- Content -->
    <div class="mt-10">

      <!-- Table -->
      <table class="w-full table-fixed">

        <!-- Table Header -->
        <thead>
          <tr class="rounded-lg">
            <th class="p-1.5 w-[5%] bg-gray-200 rounded-tl-lg">No</th>
            <th class="w-[20%] bg-gray-200">Jumlah Pengeluaran</th>
            <th class="w-[20%] bg-gray-200">Tanggal</th>
            <th class="w-[35%] bg-gray-200">Keterangan</th>
            <th class="w-[20%] bg-gray-200 rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <!-- End Table Header -->
        
        <!-- Table Content -->
        <!-- If Data -->
        <tbody v-if="items.length > 0 && !isLoading">
          <tr v-for="(item, index) in items" :key="index" class="text-sm mb-16 text-center cursor-default even:bg-gray-100 duration-150">
            <td class="py-2 truncate px-1"> {{ (index + 1)  + (pagination.per_page * (pagination.current_page - 1)) }} </td>
            <td class="truncate px-1"> {{ convertToCurrency(item.jumlah) }} </td>
            <td class="truncate px-1"> {{ item.created_at ? timeFormatter(item.created_at) : '-' }} </td>
            <td class="truncate px-1"> {{ item.ket }} </td>
            <td class="truncate px-1">
              <div class="flex justify-center items-center text-black/40 space-x-4">
                
                <!-- Edit button -->
                <button @click="editData(index)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-yellow-500 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- End Edit button -->

                <!-- Delete button -->
                <button @click="deleteData(item.id)">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <!-- End Delete button -->

              </div>
            </td>
          </tr>
        </tbody>
        <!-- End If Data -->

        <!-- Getting Data -->
        <tbody v-else-if="isLoading">
          <tr>
            <td colspan="6" class="text-center pt-5">Sedang Mengambil data...</td>
          </tr>
        </tbody>
        <!-- End Getting Data -->

        <!-- If No Data -->
        <tbody v-else>
          <tr>
            <td colspan="6" class="text-center text-red-500 text-sm pt-5">Data tidak ditemukan</td>
          </tr>
        </tbody>
        <!-- End If No Data -->
        <!-- End Table Content -->

      </table>
      <!-- End Table -->

      <!-- Pagination -->
      <ul v-if="pagination.next_page_url || pagination.prev_page_url" class="flex justify-end space-x-3 mt-5">
        <li v-for="(item, index) in pagination.links" :key="index">
          <button 
            v-show="item.url" 
            @click="getPagination(item.url)"
            :class="[item.active ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white duration-150']"
            class="ring-2 ring-blue-500 rounded-md p-1.5 px-3" 
            v-html="item.label"></button>
        </li>
      </ul>
      <!-- End Pagination -->
      
    </div>
    <!-- End Content -->

  </div>
  <!-- End Content -->

  <!-- Modal -->
  <div v-show="modalOpen" class="absolute inset-0 flex items-center justify-center">
    <div @click="modalOpen = false; resetData()" class="absolute inset-0 bg-black/50" />
    <div class="relative bg-white pb-3 z-10 rounded-lg shadow-lg">

      <!-- close button -->
      <div class="absolute top-2 right-2">
        <button @click="modalOpen = false; resetData()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <!-- End close button -->

      <!-- Modal Header -->
      <div class="text-center py-2 bg-gray-50 rounded-t-lg">
        <h2 class="text-xl font-semibold capitalize">{{ modalHeader }} Data</h2>
      </div>
      <!-- End Modal Header -->

      <!-- Modal Content -->
      <div class="flex flex-col px-5 py-2 w-[400px]">
        <div class="flex flex-col relative">
          <label for="ket">Keterangan</label>
          <textarea v-model="keterangan" id="ket" rows="3" class="mt-1 ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">

          </textarea>
        </div>
        
        <label for="jumlah" class="pt-2">Jumlah Pengeluaran</label>
        <input v-model="jumlah" type="number" id="jumlah" class="ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
      </div>
      <!-- End Modal Content -->


      <!-- Button -->
      <div class="flex justify-end px-5 pt-3">
        <button
          @click=" modalHeader == 'tambah' ? tambahData() : updateData()"
          :disabled="!keterangan && !jumlah"
          :class="[keterangan && jumlah ? 'bg-blue-600 text-white' : 'text-gray-500' ]"
          class="p-1.5 px-5 font-semibold duration-150 rounded-lg"
        >Simpan</button>
      </div>
      <!-- End Button -->

    </div>
  </div>
  <!-- End Modal -->
  <Toast 
    @trigger-toast-done="triggerToast = false; toastText = ''; toastTimeout = null"
    :text="toastText" 
    :showProps="triggerToast" 
    :timeoutProps="toastTimeout"
  />

</template>

<script>
import axios from '@/axios.js'
import Toast from './parts/Toast.vue'

export default {
  components: {
    Toast
  },
  
  data() {
    return {
      items: {},
      pagination: {},
      
      keterangan: '',
      jumlah: '',
      transaksiId: '',

      searchStartDate: null,
      searchEndDate: null,

      isLoading: false,
      modalHeader: '',
      modalOpen: false,

      triggerToast: false,
      toastText: '',
      toastTimeout: null,

      userRole: localStorage.getItem('role'),

    }
  },

  methods: {
    convertToCurrency(params){
      return  new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'} )
              .format(params)
    },

    getData(){
      this.isLoading = true
      axios.zakatAxios.get('transaksiinfaq')
      
      .then(res => {
        // console.log(res);
        this.isLoading = false
        this.items = res.data.data
        this.pagination = res.data
      })

      .catch(err => {
        console.log(err);
        this.toast('Ups Ada kesalahan', 3000)
        if (err.response.status == 401) {
          return this.$router.push('/login?error=kicked')
        }
      })
    },

    getPagination(url){
      
      // If Search with Date Pagination
      if (this.searchStartDate || this.searchEndDate) {
        axios.zakatAxios.post(url,{
          startDate:  this.searchStartDate,
          endDate: this.searchEndDate,
        })
      
        .then(res => {
          // console.log(res);
          this.items = res.data.data
          this.pagination = res.data
        })

        .catch(err => {
          console.log(err);
          this.toast('Ups Ada kesalahan', 3000)
          if (err.response.status == 401) {
            return this.$router.push('/login?error=kicked')
          }
        })
      } 
      
      // If Normal Pagination
      else {
        axios.zakatAxios.get(url)
        
        .then(res => {
          // console.log(res);
          this.items = res.data.data
          this.pagination = res.data
        })
  
        .catch(err => {
          console.log(err);
          this.toast('Ups Ada kesalahan', 3000)
          if (err.response.status == 401) {
            return this.$router.push('/login?error=kicked')
          }
        })
      }
    
    },

    tambahData(){

      axios.zakatAxios.post('transaksiinfaq', {
        keterangan: this.keterangan,
        jumlah: this.jumlah,
      })

      .then(() => {
        // console.log(res);
        this.toast("Data berhasil Ditambahkan", 3000)
        this.getData()
        this.modalOpen = false
        this.resetData()
      })

      .catch(err => {
        console.log(err);
      })
    },

    deleteData(id){
      axios.zakatAxios.delete('transaksiinfaq/'+id)

      .then(() => {
        // console.log(res);
        this.toast('Data berhasil Dihapus', 3000)
        this.getData()
      })

      .catch(err => {
        console.log(err);
        this.getData()
      })
    },

    editData(index){
      this.modalHeader = 'edit'
      this.modalOpen = true

      this.transaksiId = this.items[index].id
      this.keterangan = this.items[index].ket
      this.jumlah = this.items[index].jumlah
    },

    updateData(){
      axios.zakatAxios.patch('transaksiinfaq/'+this.transaksiId, {
        keterangan: this.keterangan,
        jumlah: this.jumlah,
      })

      .then( () => {
        // console.log(res);
        this.getData()
        this.modalOpen = false
        this.resetData()
        this.toast('Data berhasil Diubah')
      })

      .catch(err => {
        this.toast('Ups, ada kesalahan', 3000)
        console.log(err);
      })
    },

    searchData(){
      this.isLoading = true

      axios.zakatAxios.post('transaksiinfaq/search?', {
        startDate:  this.searchStartDate,
        endDate: this.searchEndDate,
      })
      
      .then(res => {
        console.log(res);
        this.items = res.data.data
        this.pagination = res.data
        this.isLoading = false
      })

      .catch(err => {
        console.log(err);
        this.toast('Ups Ada kesalahan', 3000)
        if (err.response.status == 401) {
          return this.$router.push('/login?error=kicked')
        }
      })
    },

    timeFormatter(param){
      return new Date(param)
            .toLocaleString('id-ID', {year: 'numeric', month: 'short', day: 'numeric', weekday: 'long'}) 
    },

    toast(text, timeout = 2000){
      this.toastText = text
      this.toastTimeout = timeout
      this.triggerToast = true
    },

    resetData(){
      this.keterangan = ''
      this.jumlah = ''
      this.transaksiId = ''
    }
    
  },

  watch: {
    searchStartDate(){
      this.searchStartDate ? this.searchData() : this.getData()
    },
    searchEndDate(){
      this.searchEndDate ? this.searchData() : this.getData()
    }
  },

  mounted() {
    this.getData()
  },
}
</script>