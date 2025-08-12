<template>
  <section class="bg-gray-100 pb-10"
  :class="{'lg:pb-28' : dataJadwal.length == 0, 'lg:pb-7': dataJadwal.length > 0}"
  >
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <RouterLink :to="{name: 'consultant.views.assessments'}" class="text-base text-dark hover:text-dark/70">
                    List Assessment
                </RouterLink>
            </ol>
        </div>
        <div v-if="isModalOpen && detailCustomers" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
            <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Assessment</h1>
                <hr class="mt-4">
                <div v-if="detailCustomers" class="w-full p-4 mx-auto">
                    <div>
                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Hasil Test</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Jawaban Terbanyak</span>
                                <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.result }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Tipe Belajar</span>
                                <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.assessment.name }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Dilaksanakan Pada</span>
                                <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.test_date }}</span>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Nama</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.first_name }} {{ detailCustomers.customer.last_name }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Asal Sekolah</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.school_name }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Tempat & Tanggal Lahir</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.birth_place }}, {{ detailCustomers.customer.birth_date.split(' ')[0] }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.number }}
                                </span>
                            </div>
                            <div class="mb-2 flex flex-col">
                                <span class="mb-2 font-myFont font-medium text-dark text-base">Alamat</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailCustomers.customer.address }}
                                </span>
                            </div>
                        </div>
                        </div>
                    </div>
        
                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-end items-center space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                </div>
            </div>

            <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Assessment</h1>
                <hr class="mt-4">
                <div class="flex flex-col justify-center items-center">
                    <div v-if="detailCustomers" class="w-full p-4">
                        <div class="flex flex-row gap-2">
                            <div class="w-full">
                                <h1 class="text-dark text-lg font-myFont font-medium mb-2">Hasil Test</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Dilaksanakan Pada
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.test_date }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Jawaban Terbanyak
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.result }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tipe Belajar
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.assessment.name }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <hr class="my-4">

                                <h1 class="text-dark text-lg font-myFont font-medium mb-2">Customer</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Nama
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.first_name }} {{ detailCustomers.customer.last_name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Jenis Kelamin
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Asal Sekolah
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.school_name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                No Telp
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.number }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tempat Lahir
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.birth_place }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tanggal Lahir
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.birth_date.split(' ')[0] }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Alamat
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.customer.address }}
                                            </p>
                                            <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                {{  }}
                                            </p> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-end items-center space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
          <div class="w-full px-7 mx-auto">
              <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                  <h1 class="font-myFont text-dark text-lg mb-4">List Hasil Assessment</h1>
                  <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                    <div class="relative inline-block text-left">
                          <small class="text-dark font-myFont">Gaya Belajar</small>
                          <div class="flex items-center gap-1 mt-1">
                              <button @click="toggleFilter" ref="dropdownRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                              {{ labelFilter }}
                              <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                              </svg>
                              </button>
                              <button v-if="isFilter" @click="resetFilter" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                          </div>
                          <div v-if="showFilter" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                              <div class="py-1" role="none">
                              <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                              <a @click="filterData('Visual')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Visual</a>
                              <a @click="filterData('Auditori')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Auditori</a>
                              <a @click="filterData('Kinestetik')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Kinestetik</a>
                              <a @click="filterData('Visual dan Auditori')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Visual dan Auditori</a>
                              <a @click="filterData('Visual dan Kinestetik')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Visual dan Kinestetik</a>
                              <a @click="filterData('Auditori dan Kinestetik')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Auditori dan Kinestetik</a>
                              </div>
                          </div>
                      </div>
                      <!-- <span class="font-myFont text-sm text-start lg:text-center text-dark">
                          {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                      </span> -->
                      <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="font-myFont rounded-md border border-gray-300 py-2 px-3 -mb-5" placeholder="Cari Data">
                  </div>

                  <div class="flex justify-center w-full" v-if="loading" >
                      <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                  </div>

                  <div v-else-if="dataJadwal.length > 0 && !loading" class="overflow-x-auto">
                      <table class="w-full text-sm text-left text-gray-500 mt-4">
                          <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                          <tr>
                              <th scope="col" class="py-3 px-6">No</th>
                              <th scope="col" class="py-3 px-6">Nama</th>
                              <th scope="col" class="py-3 px-6">Waktu Test</th>
                              <th scope="col" class="py-3 px-6">Jawaban Terbanyak</th>
                              <th scope="col" class="py-3 px-6">Assessment</th>
                              <th scope="col" class="py-3 px-6">Detail</th>
                          </tr>
                          </thead>
                          <tbody>
                              <tr v-for="(data, index) in dataJadwal" class="bg-white border-b">
                                  <td class="py-4 px-6">
                                      {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                  </td>
                                  <td class="py-4 px-6">
                                      {{ data.customer.first_name }} {{ data.customer.last_name }}
                                  </td>
                                  <td class="py-4 px-6">{{ data.test_date }}</td>
                                  <td class="py-4 px-6">{{ data.result.toUpperCase() }}</td>
                                  <td class="py-4 px-6">{{ data.assessment.name }}</td>
                                  <td class="py-4 pl-6">
                                      <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                          <PhEye :size="22"/>
                                      </button>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>

                  <span v-else-if="dataJadwal.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                  <div class="flex justify-between items-center mt-4">
                      <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                          {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                      </span>
                      <a class="flex items-center font-myFont text-dark text-xs lg:text-base">
                          Halaman
                          <div class="mx-2 flex items-center gap-1">
                              <a @click="prevPages(prevPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                  <PhCaretLeft/>
                              </a>
                              <span class="px-2 py-1 border rounded-lg">
                                  {{ currPage }}
                              </span>
                              <a @click="nextPages(nextPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                  <PhCaretRight/>
                              </a>
                          </div> 
                          Dari {{ totalHalaman }}
                      </a>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api'
import { PhCaretLeft, PhCaretRight, PhEye, PhX, PhPlay, PhFunnel, PhCheck } from '@phosphor-icons/vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {useRouter} from 'vue-router'
import _debounce from 'lodash/debounce';
import Cookies from 'js-cookie'

export default{
  name: 'HasilAssessment',
  components: {PhCaretLeft, PhCaretRight, PhEye, PhX, PhPlay, PhFunnel, PhCheck},
  setup(){
      const router = useRouter()
      const loading = ref(false)
      const totalHalaman = ref('')
      const itemsPerPage = ref(null)
      const currPage = ref(null)
      const nextPage = ref(null)
      const prevPage = ref(null)
      const totalDari = ref(null)
      const totalKe = ref(null)
      const totalData = ref(null)
      const cari = ref(null)
    
      const dataJadwal = ref([])
      const detailCustomers = ref([])
      const isModalOpen = ref(false)

      const showFilter = ref(false)
      const isFilter = ref(false)
      const labelFilter = ref('All')
      const filterStatusCode = ref(null)

      const resetFilter = () => {
          labelFilter.value = 'All'
          isFilter.value = !isFilter.value
          filterStatusCode.value = null
          if(cari.value){
            getSearchData()
          } else {
            getAllData()
          }
      }

      const toggleFilter = () => {
          showFilter.value = !showFilter.value
      }

      const dropdownRef = ref(null);

      const closeDropdown = (e) => {
          if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
              showFilter.value = false;
          }
      };

      onMounted(() => {
          document.body.addEventListener('click', closeDropdown);
      });

      onBeforeUnmount(() => {
          document.body.removeEventListener('click', closeDropdown);
      });

      const filterData = async(params) => {
        labelFilter.value = params
        isFilter.value = true
        filterStatusCode.value = params == 'Visual' ? '1' : params == 'Auditori' ? '2' : params == 'Kinestetik' ? '3' : params == 'Visual dan Auditori' ? '4' : params == 'Visual dan Kinestetik' ? '5' : '6'
        loading.value = !loading.value
        const filterParams = cari.value === null ? 'assessment_id='+filterStatusCode.value : 'search='+cari.value+'&assessment_id='+filterStatusCode.value
        try {
              const token = Cookies.get('token')
              const response = await initAPI('get', 'customers/assessments?'+filterParams, null, token)
            //   console.log('filter scheduled', response.data)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
          } catch (error) {
              Swal.fire({
                  title: "Gagal",
                  text: "Terjadi error saat filter data Scheduled.",
                  icon: "error",
                  timer: 2000,
                  showConfirmButton: false
              });
          }
          loading.value = !loading.value
      }

      const clickDetail = (id) => {
          toggleModal()
        //   console.log(id)
          const unik = dataJadwal.value.find(item => item.id === id);
        //   console.log(`unik`,unik)
          detailCustomers.value = unik
      }

      const toggleModal = () => {
          isModalOpen.value = !isModalOpen.value
      }

      onBeforeMount(async() => {
          getAllData()
      })

      const getAllData = async() => {
          loading.value = !loading.value
          let filterParams = cari.value === null ? '' : '?search='+cari.value
          filterParams = filterStatusCode.value === null ? filterParams : cari.value === null ? filterParams+'?assessment_id='+filterStatusCode.value : filterParams+'&assessment_id='+filterStatusCode.value
          const token = Cookies.get('token')
          const response = await initAPI('get', 'customers/assessments'+filterParams, null, token)
          itemsPerPage.value = response.data.per_page
          currPage.value = response.data.current_page
          nextPage.value = response.data.next_page_url
          prevPage.value = response.data.prev_page_url
          totalDari.value = response.data.from
          totalKe.value = response.data.to
          totalData.value = response.data.total
          totalHalaman.value = response.data.last_page
          dataJadwal.value = response.data.data
          detailCustomers.value = response.data.data.customers 
        //   console.log(`response`,response.data.data)
          // console.log(response.data.data[0].customers)
          loading.value = !loading.value
      }

      const getSearchData = async() => {
          if(cari.value !== '' && cari.value.length >= 2){
              loading.value = !loading.value
              const filterParams = filterStatusCode.value === null ? 'search='+cari.value : 'search='+cari.value+'&assessment_id='+filterStatusCode.value
              const token = Cookies.get('token')
              const query = await initAPI('get', 'customers/assessments?'+filterParams, null, token)
              dataJadwal.value = query.data.data
              totalHalaman.value = query.data.total
              itemsPerPage.value = query.data.per_page
              currPage.value = query.data.current_page
              nextPage.value = query.data.next_page_url
              prevPage.value = query.data.prev_page_url
              totalDari.value = query.data.from
              totalKe.value = query.data.to
              totalData.value = query.data.total
              totalHalaman.value = query.data.last_page
              loading.value = !loading.value
          }else{
              return getAllData() 
          }
      }

      const debouncedGetSearchData = _debounce(getSearchData, 500);

      const prevPages = async(url) => {
          if(url !== null && cari.value && filterStatusCode.value == null){
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url+'&search='+cari.value, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          } else if(url !== null && cari.value && filterStatusCode.value !== null) {
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          } else {
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          }
      }

      const nextPages = async(url) => {
          if(url !== null && cari.value && filterStatusCode.value == null){
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url+'&search='+cari.value, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          } else if(url !== null && cari.value && filterStatusCode.value !== null) {
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          } else {
              loading.value = !loading.value
              const token = Cookies.get('token')
              const response = await initAPI('get', url, null, token)
              itemsPerPage.value = response.data.per_page
              currPage.value = response.data.current_page
              nextPage.value = response.data.next_page_url
              prevPage.value = response.data.prev_page_url
              totalDari.value = response.data.from
              totalKe.value = response.data.to
              totalData.value = response.data.total
              totalHalaman.value = response.data.last_page
              dataJadwal.value = response.data.data
              detailCustomers.value = response.data.data.customers 
            //   console.log(`response`,response.data.data)
              // console.log(response.data.data[0].customers)
              loading.value = !loading.value
          }
      }

      return {
          loading,
          totalHalaman,
          itemsPerPage,
          currPage,
          nextPage,
          prevPage,
          totalDari,
          totalKe,
          totalData,
          cari,
          dataJadwal,
          detailCustomers,
          isModalOpen,
          showFilter,
          isFilter,
          labelFilter,
          filterStatusCode,
          dropdownRef,
          debouncedGetSearchData,
          toggleModal,
          clickDetail,
          toggleFilter,
          filterData,
          resetFilter,
          prevPages,
          nextPages
      }
  }
}
</script>