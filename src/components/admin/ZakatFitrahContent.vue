<template>

  <!-- Content -->
  <div class="mt-8">

    <!-- Tab & Search -->
    <div class="flex justify-between">
      
      <!-- Left Tab -->
      <div class="space-x-5">
        <button @click="tab = 'beras'" :class="[ tab == 'beras' ? 'border-blue-500' : 'border-transparent opacity-50 hover:opacity-100 duration-150' ]" class="border-b-2 font-semibold capitalize">Fitrah Beras</button>
        <button @click="tab = 'uang'" :class="[ tab == 'uang' ? 'border-blue-500' : 'border-transparent opacity-50 hover:opacity-100 duration-150' ]" class="border-b-2 font-semibold capitalize">Fitrah Uang</button>
        <button v-show="userAccess.role == 'admin'" @click="tab = 'deleted'" :class="[ tab == 'deleted' ? 'border-red-500' : 'border-transparent opacity-50 hover:opacity-100 duration-150' ]" class="border-b-2 font-semibold capitalize">Data Terhapus</button>
      </div>
      <!-- End Left Tab -->

      <!-- Search -->
      <div class="flex relative items-center opacity-75">
        <input v-model="keyword" type="text" class="pl-6 focus:outline-none shadow-lg focus:ring-2 ring-blue-500 duration-150 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 absolute left-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <!-- End Search -->

    </div>
    <!-- End Tab & Search -->

    <!-- Content -->
    <div class="mt-10">

      <!-- Table -->
      <table class="w-full table-fixed">

        <!-- Table Header -->
        <thead>
          <tr class="rounded-lg">
            <th class="p-1.5 w-[5%] bg-gray-200 rounded-tl-lg">No</th>
            <th class="w-[25%] bg-gray-200">Nama</th>
            <th class="w-[15%] bg-gray-200">No Telp</th>
            <th class="w-[10%] bg-gray-200">Jenis Zakat</th>
            <th class="w-[15%] bg-gray-200">Jumlah</th>
            <th class="w-[15%] bg-gray-200">Tanggal Zakat</th>
            <th class="w-[15%] bg-gray-200 rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <!-- End Table Header -->
        
        <!-- Table Content -->
        <!-- If Data -->
        <tbody v-if="items.length > 0 && !isLoading">
          <tr v-for="(item, index) in items" :key="index" class="text-sm mb-16 text-center cursor-default even:bg-gray-100 duration-150">
            <td class="py-2 truncate px-1"> {{ (index + 1)  + (pagination.per_page * (pagination.current_page - 1)) }} </td>
            <td class="py-2 truncate px-1"> {{ item.nama ? item.nama : '-'  }} </td>
            <td class="truncate px-1"> {{ item.no_telp ? item.no_telp : '-'  }} </td>
            <td class="truncate px-1"> {{ item.jenis ? item.jenis : '-'  }} </td>
            <td class="truncate px-1"> {{ item.jenis == 'uang' ? convertToCurrency(item.jumlah) : item.jumlah }} </td>
            <td class="truncate px-1"> {{ item.created_at ? timeFormatter(item.created_at) : '-' }} </td>
            <td class="truncate px-1">
              <div class="flex justify-center items-center text-black/40 space-x-4">
                
                <!-- Edit button -->
                <button v-show="tab != 'deleted'" @click="populateModal(index)" title="Edit Button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-yellow-500 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <!-- End Edit button -->

                <!-- Delete button -->
                <button v-show="tab != 'deleted'" @click="deleteData(item.id)" title="Delete Button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-red-500 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
                <!-- End Delete button -->

                <!-- Restore button -->
                <button v-show="tab == 'deleted'" @click="restoreData(item.id)" title="Restore Button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-500 duration-150" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
                  </svg>
                </button>
                <!-- End Restore button -->

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
    <div @click="modalOpen = false" class="absolute inset-0 bg-black/50" />
    <div class="relative bg-white w-1/3 h-3/5 z-10 rounded-lg shadow-lg">

      <!-- close button -->
      <div class="absolute top-2 right-2">
        <button @click="modalOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <!-- End close button -->

      <!-- Modal Header -->
      <div class="text-center py-2 bg-gray-50 rounded-t-lg">
        <h2 class="text-xl font-semibold">Edit Data</h2>
      </div>
      <!-- End Modal Header -->

      <!-- Modal Content -->
      <div class="flex flex-col w-full px-10 py-2">
        <label for="nama">Nama</label>
        <input v-model="nama" type="text" id="nama" class="ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">

        <label for="noTelp">Nomor Telepon</label>
        <input v-model="noTelp" type="text" id="noTelp" class="ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
        
        <label for="jenis" class="pt-2">Jenis Zakat</label>
        <select v-model="jenis" id="jenis" class="ring-2 ring-trueGray-300  rounded-lg p-1.5 focus:outline-none outline-none duration-150">
          <option value="beras">beras</option>
          <option value="uang">uang</option>
        </select>
        
        <label for="jumlah" class="pt-2">Jumlah Zakat</label>
        <input v-model="jumlah" type="number" id="jumlah" class="ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
      </div>
      <!-- End Modal Content -->

      <!-- Button -->
      <div class="flex justify-end px-10 pt-3">
        <button
          v-show="!flashMessage"
          @click="updateData()"
          :disabled="!nama || !jenis || !jumlah"
          :class="[nama && jenis && jumlah ? 'bg-blue-600 text-white' : 'text-gray-500' ]"
          class="p-1.5 px-5 font-semibold duration-150 rounded-lg"
        >Simpan</button>
      </div>
      <p class="font-semibold text-center"> {{ flashMessage }} </p>
      <!-- End Button -->

    </div>
  </div>
  <!-- End Modal -->

  <Toast 
    @trigger-toast-done="triggerToast = false; toastText = ''; triggerToast = null"
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
      tab: 'beras',
      items: {},
      pagination: {},

      isLoading: false,
      modalOpen: false,
      flashMessage: '',

      userAccess: {
        nama: '',
        role: '',
      },

      triggerToast: false,
      toastText: '',
      toastTimeout: 2000,

      nama: '',
      jenis: '',
      jumlah: '',
      noTelp: '',
      id: '',

      keyword: '',
      delaySearch: true
    }
  },

  methods: {
    convertToCurrency(params){
      return  new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'} )
              .format(params)
    },

    resetData(){
      this.nama = ''
      this.jenis = ''
      this.jumlah = ''
      this.id = ''
      this.flashMessage = ''
    },

    populateModal(id){
      this.modalOpen = true
      this.nama = this.items[id].nama
      this.jenis = this.items[id].jenis
      this.jumlah = this.items[id].jumlah
      this.id = this.items[id].id
      this.noTelp = this.items[id].no_telp
    },

    updateData(){
      axios.zakatAxios.put('fitrah/' + this.id, {
        nama: this.nama,
        jenis: this.jenis,
        jumlah: this.jumlah,
        no_telp: this.noTelp
      })
        
      .then(() => {
          this.getDataZakat(this.tab)
          this.modalOpen = false
          this.resetData()
          this.toast('Data berhasil Diubah', 3000)
      })

      .catch((err) => {
        console.log(err.response);
      })
    },

    deleteData(id){
      axios.zakatAxios.delete('fitrah/' + id)
        
      .then(() => {
        this.getDataZakat(this.tab)

        this.toast('Data berhasil Dihapus', 3000)
      })

      .catch((err) => {
        console.log(err.response);
      })
    },

    getDataZakat(params){
      this.items = {}
      // Is Loading
      this.isLoading = true

      axios.zakatAxios.get('fitrah/'+params)
      
      .then((res) => {
        // console.log(res);
        this.pagination = res.data
        this.items = res.data.data
        // console.log(this.pagination);
        return this.isLoading = false
      })

      .catch((err) => {
        
        this.isLoading = false
        console.log(err.response);
        if (err.response.status == 401) {
          // console.log('lala');
          return this.$router.push('/login?error=kicked')
        }
      })
    },

    getPagination(url){
      // Is Loading
      this.isLoading = true

      axios.zakatAxios.get(url)
      
      .then((res) => {
        // console.log(res.data);
        this.pagination = res.data
        this.items = res.data.data
        return this.isLoading = false
      })

      .catch((err) => {
        this.isLoading = false
        console.log(err.response);
      })
    },

    searchData(params){
      // Is Loading
      this.isLoading = true

      axios.zakatAxios.get('fitrah/'+params+'/'+this.keyword)

      .then((res) => {
        // console.log(res.data.data);
        this.pagination = res.data
        this.items = res.data.data
        return this.isLoading = false
      })

      .catch((err) => {
        this.isLoading = false
        console.log(err.response);
      })
    },

    searchDeletedData(){
      // Is Loading
      this.isLoading = true

      axios.zakatAxios.get('fitrah/deleted/'+this.keyword)

      .then((res) => {
        // console.log(res.data.data)
        this.pagination = res.data
        this.items = res.data.data
        return this.isLoading = false
      })

      .catch((err) => {
        this.isLoading = false
        console.log(err.response);
      })
    },

    restoreData(id){
      axios.zakatAxios.get('fitrah/restore/'+id)

      .then(() => {
        // console.log(res);
        this.toast('Data berhasil Dikembalikkan', 3000)
        this.getDataZakat(this.tab)
      })

      .catch((err) => {
        console.log(err);
      })
    },

    timeFormatter(param){
      return new Date(param)
            .toLocaleString('id-ID', {year: 'numeric', month: 'short', day: 'numeric', weekday: 'long'}) 
    },

    toast(text, timeout = null){
      this.toastText = text
      this.timeout = timeout
      this.triggerToast = true
    }
  },

  watch: {
    tab(){
      this.getDataZakat(this.tab)
    },

    keyword(){
      if (this.delaySearch) {
        setTimeout(() => {
          this.tab == 'deleted' ? this.searchDeletedData() : this.searchData(this.tab)
          this.delaySearch = true
        }, 1000);
      }
      
      this.delaySearch = false
    },
  },

  mounted(){
    this.getDataZakat(this.tab)

    this.userAccess.nama = localStorage.getItem('nama')
    this.userAccess.role = localStorage.getItem('role')
  },
}
</script>
