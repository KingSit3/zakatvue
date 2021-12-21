<template>
  <div class="flex flex-col w-full">
    
    <!-- Top Content -->
    <div class="flex justify-between">

      <!-- Left Content -->
      <div class="w-4/6">
        <table>
          <tr>
            <td class="font-semibold">Nama Keluarga Mustahik</td>
            <td class="px-2">:</td>
            <td>{{ mustahik.nama_keluarga }}</td>
          </tr>
          <tr>
            <td class="font-semibold">Jumlah Anggota Keluarga</td>
            <td class="px-2">:</td>
            <td>{{ mustahik.jumlah_anggota_keluarga }} Orang</td>
          </tr>
          <tr>
            <td class="font-semibold">Status</td>
            <td class="px-2">:</td>
            <td>{{ mustahik.deleted_at == null ? 'Aktif' : 'Tidak Aktif' }}</td>
          </tr>
          <tr>
            <td class="font-semibold">Total terima Zakat</td>
            <td class="px-2">:</td>
            <td>
              <span v-show="totalZakatBeras"> {{ totalZakatBeras + ' Liter beras' }} </span>
              <span v-show="totalZakatBeras"> {{ totalZakatBeras && totalZakatUang ? ' & ' : ' - ' }} </span>
              <span v-show="totalZakatUang">{{ totalZakatUang }}</span>
            </td>
          </tr>
        </table>
      </div>
      <!-- End Left Content -->

      <!-- Right Content -->
      <div class="w-4/12">
        <span class="font-semibold">Alamat</span>
        <p class="capitalize"> {{ mustahik.alamat + ' Rt' + mustahik.rt + ' Rw' + mustahik.rw + ' Kel.' + mustahik.kelurahan + ' Kec.' + mustahik.kecamatan }} </p>
      </div>
      <!-- End Right Content -->
      
    </div>
    <!-- End Top Content -->

    <!-- Bottom Content -->
    <div class="pt-5">

      <!-- Add Button -->
      <button @click="modalOpen = true; modalHeader = 'tambah'" class="bg-blue-500 p-1.5 px-5 my-2 text-white rounded-lg font-semibold focus:outline-none">Tambah Transaksi</button>
      <!-- End Add Button -->
      
      <!-- Table -->
      <table class="w-full table-fixed">

        <!-- Table Header -->
        <thead>
          <tr class="rounded-lg">
            <th class="p-1.5 w-[10%] bg-gray-200 rounded-tl-lg">No</th>
            <th class="w-[30%] bg-gray-200">Jenis Zakat</th>
            <th class="w-[30%] bg-gray-200">Jumlah</th>
            <th class="w-[30%] bg-gray-200">Tanggal</th>
            <th class="w-[30%] bg-gray-200 rounded-tr-lg">Aksi</th>
          </tr>
        </thead>
        <!-- End Table Header -->
        
        <!-- Table Content -->
        <!-- If Data -->
        <tbody v-if="items.length > 0 && !isLoading">
          <tr v-for="(item, index) in items" :key="index" class="text-sm mb-16 text-center cursor-default even:bg-gray-100 duration-150">
            <td class="py-2 truncate px-1"> {{ (index + 1)  + (pagination.per_page * (pagination.current_page - 1)) }} </td>
            <td class="py-2 truncate px-1"> {{ item.jenis_zakat }} </td>
            <td class="truncate px-1"> {{ item.jenis_zakat == 'beras' ? item.jumlah+' Liter' : convertToCurrency(item.jumlah) }} </td>
            <td class="truncate px-1"> {{ item.created_at ? timeFormatter(item.created_at) : '-' }} </td>
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
    <!-- End Bottom Content -->

    <!-- Modal -->
    <div v-show="modalOpen" class="absolute inset-0 flex items-center justify-center">
      <div @click="modalOpen = false; resetData()" class="absolute inset-0 bg-black/50" />
      <div class="relative w-4/12 bg-white pb-3 z-10 rounded-lg shadow-lg">

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
        <div class="flex flex-col px-10 py-2">
          <div class="flex flex-col relative">
            <label for="nama">Nama keluarga Mustahik</label>
            <input v-model="mustahik.nama_keluarga" type="text" id="nama" disabled class="ring-2 bg-trueGray-300 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
          </div>
          
          <label for="jenis" class="pt-2">Jenis Zakat</label>
          <select v-model="jenis" name="jenis" id="" class="ring-2 ring-trueGray-300 bg-white focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
            <option value="beras" selected>Beras</option>
            <option value="uang">Uang</option>
          </select>

          <label for="jumlah" class="pt-2">Jumlah Zakat</label>
          <input v-model="jumlah" type="number" id="jumlah" class="ring-2 ring-trueGray-300 focus:ring-blue-600 rounded-lg p-1.5 focus:outline-none outline-none duration-150">
        </div>
        <!-- End Modal Content -->

        <!-- Button -->
        <div class="flex justify-end px-10 pt-3">
          <button
            @click=" modalHeader == 'tambah' ? tambahData() : updateData()"
            :disabled="!jumlah && !jenis"
            :class="[jumlah && jenis ? 'bg-blue-600 text-white' : 'text-gray-500' ]"
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

  </div>
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
      mustahik: {},

      transaksiId: '',
      jumlah: '',
      jenis: '',

      isLoading: '',

      modalOpen: false,
      modalHeader: false,

      triggerToast: false,
      toastText: '',
      toastTimeout: null,

    }
  },

  methods: {
    convertToCurrency(param){
      return new Intl.NumberFormat('id-ID', {style:'currency', currency:'IDR'})
            .format(param)
    },

    getData(id){
      this.isLoading = true
      axios.zakatAxios.get('mustahik/detail/'+id)
      
      .then(res => {
        // console.log(res);
        this.items = res.data.transaksi.data
        this.pagination = res.data.transaksi
        this.mustahik = res.data.mustahik
        
        this.isLoading = false
      })

      .catch(err => {
        console.log(err);

        if (err.response.status == 401) {
          return this.$router.push('/login?error=kicked')
        }
      })
    },

    deleteData(id){
      axios.zakatAxios.delete('transaksizakat/'+id)

      .then(() => {
        // console.log(res);
        this.toast('Data berhasil Dihapus', 3000)
        this.getData(this.$route.params.id)
      })

      .catch(err => {
        console.log(err);
        this.toast("Ups, ada kesalahan", 3000)
      })
    },

    tambahData(){

      axios.zakatAxios.post('transaksizakat', {
        mustahik_id: this.$route.params.id,
        jenis_zakat: this.jenis,
        jumlah: this.jumlah,
      })

      .then(() => {
        // console.log(res);
        this.toast("Data berhasil Ditambahkan", 3000)
        this.getData(this.$route.params.id)
        this.modalOpen = false
        this.resetData()
      })

      .catch(err => {
        console.log(err);
      })
    },

    editData(index){
      this.jumlah = this.items[index].jumlah
      this.jenis = this.items[index].jenis_zakat
      this.transaksiId = this.items[index].id

      this.modalHeader = 'edit'
      this.modalOpen = true
    },

    updateData(){
      axios.zakatAxios.patch('transaksizakat/'+this.transaksiId, {
        mustahik_id: this.$route.params.id,
        jenis_zakat: this.jenis,
        jumlah: this.jumlah,
      })

      .then( () => {
        // console.log(res);
        this.getData(this.$route.params.id)
        this.modalOpen = false
        this.resetData()
      })

      .catch(err => {
        this.toast('Ups, ada kesalahan', 3000)
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

    resetData(){
      this.jumlah = ''
      this.jenis = ''
    }

  },

  computed: {
    totalZakatBeras(){
      if (this.items.length > 0) {
        return this.items
            .filter((el) => {return el.jenis_zakat == 'beras'})
            .reduce((sum, index) => {return  sum += parseFloat(index.jumlah) }, 0)
      }

      return false
    },

    totalZakatUang(){
      if (this.items.length > 0) {
        return this.convertToCurrency(
          this.items
            .filter((el) => {return el.jenis_zakat == 'uang'})
            .reduce((sum, index) => {return  sum += parseInt(index.jumlah) }, 0)
        )
      }

      return false
    }
  },

  mounted() {
    this.getData(this.$route.params.id)
  },

  unmounted() {
    this.totalZakatBeras()
    this.totalZakatUang()
  },
}
</script>

<style>

</style>