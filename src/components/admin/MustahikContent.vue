<template>
  
  <!-- Content -->
  <div>
    <!-- Tambah Button -->
    <button @click="modalOpen = true; modalHeader = 'tambah'" class="bg-blue-500 p-1.5 px-5 my-2 text-white rounded-lg font-semibold focus:outline-none">Tambah Mustahik</button>
    <!-- End Tambah Button -->

    <!-- Tab & Search -->
    <div class="flex justify-between">
      
      <!-- Left Tab -->
      <div class="space-x-5">
        <button @click="tab = 'data'" :class="[ tab == 'data' ? 'border-blue-500' : 'border-transparent opacity-50 hover:opacity-100 duration-150' ]" class="border-b-2 font-semibold capitalize">Data</button>
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
            <th class="w-[25%] bg-gray-200">Nama keluarga</th>
            <th class="w-[30%] bg-gray-200">Alamat</th>
            <th class="w-[20%] bg-gray-200">Jumlah Anggota Keluarga</th>
            <th class="w-[20%] bg-gray-200 rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <!-- End Table Header -->

        <!-- Table Content -->
        <!-- If Data -->
        <tbody v-if="items.length > 0 && !isLoading">
          <tr v-for="(item, index) in items" :key="index" class="text-sm mb-16 text-center cursor-default even:bg-gray-100 duration-150">
            <td class="py-2 truncate px-1"> {{ (index + 1)  + (pagination.per_page * (pagination.current_page - 1)) }} </td>
            <td><router-link :to="'/zakatadmin/mustahik/'+item.id" class="hover:text-blue-500 duration-150 font-semibold">{{ item.nama_keluarga }} </router-link></td>
            <td class="truncate px-1 capitalize"> {{ item.alamat ? item.alamat+' Rt'+item.rt+'/'+item.rw+' Kel. '+item.kelurahan+' Kec. '+item.kecamatan : '-'  }} </td>
            <td class="truncate px-1"> {{ item.jumlah_anggota_keluarga ? item.jumlah_anggota_keluarga+' Orang' : '-' }} </td>
            <td class="truncate px-1">
              <div class="flex justify-center items-center text-black/40 space-x-4">
                
                <!-- Detail Button -->
                <button @click="populateModal(index, 'detail')">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-blue-500 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <!-- End Detail Button -->

                <!-- Edit button -->
                <button v-show="tab != 'deleted'" @click="populateModal(index, 'edit')" title="Edit Button">
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
        <li v-for="(page, index) in pagination.links" :key="index">
          <button 
            v-show="page.url" 
            @click="getPagination(page.url)"
            :class="[page.active ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white duration-150']"
            class="ring-2 ring-blue-500 rounded-md p-1.5 px-3" 
            v-html="page.label"></button>
        </li>
      </ul>
      <!-- End Pagination -->

    </div>
    <!-- End Content -->
  </div>
  <!-- End Content -->

  <!-- Modal -->
  <div v-show="modalOpen" class="absolute inset-0 flex items-center justify-center">
    
    <!-- Overlay -->
    <div @click="modalOpen = false; resetData()" class="absolute inset-0 bg-black/50" />
    <!-- End Overlay -->

    <!-- Modal Content -->
    <div class="relative bg-white w-1/2 min-h-1/2 max-h-[80%] z-10 rounded-lg shadow-lg">

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

      <!-- Modal Form -->
      <div class="flex flex-col w-full px-10 py-5 pb-20 space-y-4">
        <!-- Forms -->
        <div class="flex space-x-5">
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="namaKeluarga">Nama Keluarga</label>
            <input v-model="namaKeluarga" :disabled="modalHeader == 'detail'" type="text" id="namaKeluarga" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'zakat-input-text']">
          </div>
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="jumlahAnggotaKeluarga">Jumlah Anggota Keluarga</label>
            <input v-model="jumlahAnggotaKeluarga" :disabled="modalHeader == 'detail'" type="number" id="jumlahAnggotaKeluarga" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'zakat-input-text w-3/4']">
          </div>
        </div>
        <div class="flex space-x-5">
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="alamat">Alamat</label>
            <textarea v-model="alamat" id="alamat" :disabled="modalHeader == 'detail'" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'zakat-input-text']" />
          </div>
          <div class="flex flex-col space-y-1">
            <label for="rt">RT/RW</label>
            <div class="flex space-x-3">
              <input v-model="rt" type="text" id="rt" :disabled="modalHeader == 'detail'" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'w-14 zakat-input-text']" placeholder="001">
              <span class="text-xl">/</span>
              <input v-model="rw" type="text" id="rw" :disabled="modalHeader == 'detail'" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'w-14 zakat-input-text']" placeholder="010">
            </div>
          </div>
        </div>
        <div class="flex space-x-5">
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="Kelurahan">Kelurahan</label>
            <input v-model="kelurahan" type="text" id="Kelurahan" :disabled="modalHeader == 'detail'" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'zakat-input-text']">
          </div>
          <div class="flex flex-col w-1/2 space-y-1">
            <label for="Kecamatan">Kecamatan</label>
            <input v-model="kecamatan" type="text" id="Kecamatan" :disabled="modalHeader == 'detail'" :class="[modalHeader == 'detail' ? 'bg-trueGray-300' : '' , 'zakat-input-text']">
          </div>
        </div>
        <!-- End Forms -->

      </div>
      <!-- End Modal Form -->

      <!-- Button -->
      <div class="absolute bottom-0 right-0 flex p-3">
        <button
          v-show="modalHeader != 'detail'"
          :disabled="!formValidation"
          @click=" modalHeader == 'tambah' ? tambahData() : updateData() "
          :class="[formValidation ? 'bg-blue-600 text-white' : 'text-gray-500' ]"
          class="p-1.5 px-5 font-semibold duration-150 rounded-lg"
        >{{ modalHeader == 'tambah' ? 'Simpan' : 'Update' }}</button>
      </div>
      <!-- End Button -->

    </div>
    <!-- End Modal Content -->

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
    Toast,
  },
  data() {
    return {
      tab: 'data',
      items: {},
      pagination: {},

      namaKeluarga: '',
      jumlahAnggotaKeluarga: '',
      alamat: '',
      rt: '',
      rw: '',
      kelurahan: '',
      kecamatan: '',
      id: '',

      isLoading: false,
      modalOpen: false,
      modalHeader: '',

      keyword: '',

      triggerToast: false,
      toastText: '',
      toastTimeout: 3000,

      userAccess: {
        role: localStorage.getItem('role'),
      },

    }
  },

  methods: {
    getData(){
      this.items = {}

      // Is Loading
      this.isLoading = true
      const getUrl = (this.tab == 'data') ? 'mustahik' : 'mustahik/deleted'

      axios.zakatAxios.get(getUrl)
      .then((res) => {
        this.pagination = res.data
        this.items = res.data.data
        // console.log(this.items);
        return this.isLoading = false
      })
      .catch((err) => {
        this.isLoading = false
        this.toastText = 'Ups, ada kesalahan'
        console.log(err.response);
        if (err.response.status == 401) {
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
        // console.log(this.pagination);
        return this.isLoading = false
      })

      .catch((err) => {
        this.isLoading = false
        console.log(err.response);
      })
    },

    searchData(){
      // Is Loading
      this.isLoading = true

      axios.zakatAxios.get('mustahik/'+this.keyword)

      .then((res) => {
        // console.log(res.data.data);
        this.pagination = res.data
        this.items = res.data.data
        // console.log(this.pagination);
        return this.isLoading = false
      })

      .catch((err) => {
        this.isLoading = false
        console.log(err.response);
      })
    },

    searchDeletedData(){
      this.isLoading = true

      axios.zakatAxios.get('mustahik/deleted/'+this.keyword)

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

    populateModal(index, header){
      this.modalOpen = true
      this.modalHeader = header
      
      this.namaKeluarga = this.items[index].nama_keluarga
      this.jumlahAnggotaKeluarga = this.items[index].jumlah_anggota_keluarga
      this.alamat = this.items[index].alamat
      this.rt = this.items[index].rt
      this.rw = this.items[index].rw
      this.kelurahan = this.items[index].kelurahan
      this.kecamatan = this.items[index].kecamatan
      this.id = this.items[index].id

    },

    tambahData(){
      axios.zakatAxios.post('mustahik', {
          namaKeluarga: this.namaKeluarga,
          jumlahAnggotaKeluarga: this.jumlahAnggotaKeluarga,
          alamat: this.alamat,
          rt: this.formattingNumberRtRw(this.rt),
          rw: this.formattingNumberRtRw(this.rw),
          kelurahan: this.kelurahan,
          kecamatan: this.kecamatan,
        }
      )
      .then((res) => {
        console.log(res);
        this.toast('Data Berhasil Ditambahkan', 3000)
        this.resetData()
        this.modalOpen = false
        this.getData(this.tab)
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == 401) {
          return this.$router.push('/login?error=kicked')
        }
      })
    },

    updateData(){
      axios.zakatAxios.patch('mustahik/'+this.id, {
        namaKeluarga: this.namaKeluarga,
        jumlahAnggotaKeluarga: this.jumlahAnggotaKeluarga,
        alamat: this.alamat,
        rt: this.formattingNumberRtRw(this.rt),
        rw: this.formattingNumberRtRw(this.rw),
        kelurahan: this.kelurahan,
        kecamatan: this.kecamatan,
      })

      .then(res => {
        console.log(res)
        this.getData()
        this.modalOpen = false
        this.toast('Data berhasil Diubah', 2000)
        this.resetData()
      })
      .catch(err => {
        console.log(err);
      })
    },

    deleteData(id){
      axios.zakatAxios.delete('mustahik/'+id)

      .then(res => {
        console.log(res)
        this.toast('Data berhasil Dihapus', 6000)
        this.getData()
      })

      .catch(err => {
        console.log(err);
      })
    },

    restoreData(id){
      axios.zakatAxios.get('mustahik/restore/'+id)
      
      .then(res => {
        console.log(res);
        this.toast('Data berhasil Dikembalikkan', 6000)
        this.getData()
      })

      .catch(err => {
        console.log(err);
      })
    },

    resetData(){
      this.namaKeluarga = ''
      this.jumlahAnggotaKeluarga = ''
      this.alamat = ''
      this.rt = ''
      this.rw = ''
      this.kelurahan = ''
      this.kecamatan = ''
      this.id = ''
    },

    convertToCurrency(params){
      return  new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'} )
              .format(params)
    },

    formattingNumberRtRw(number){
      return new Intl.NumberFormat('id-ID', {
        minimumIntegerDigits: 3,
        maximumFractionDigits: 0
      })
      .format(number)
    },

    toast(text, timeout = null){
      this.toastText = text
      this.timeout = timeout
      this.triggerToast = true
    }

  },

  computed: {
    formValidation(){
      // Return false
      if(!this.namaKeluarga){
        return false
      } 
      if(!this.jumlahAnggotaKeluarga){
        return false
      } 
      if(!this.alamat){
        return false
      } 
      if(!this.rt){
        return false
      } 
      if(!this.rw){
        return false
      } 
      if(!this.kelurahan){
        return false
      } 
      if(!this.kecamatan){
        return false
      } 

      return true
    },

  },

  mounted() {
    this.getData()
  },

  watch: {
    tab(){
      this.getData()
    },

    keyword(){
      let delaySearch = true

      if (delaySearch) {
        setTimeout(() => {
          this.tab == 'deleted' ? this.searchDeletedData() : this.searchData()
          delaySearch = true
        }, 1000);
      }
      
      delaySearch = false
    },
  }

}
</script>