<template>
  <section class="bg-gray-100 pb-10"
  :class="{'lg:pb-28' : dataSoal.length == 0, 'lg:pb-7': dataSoal.length > 0}"
  >
          <div class="mx-4 pt-4">
              <ol class="flex text-gray-500 font-semibold">
                  <li class="before:px-1.5">
                      <a class="text-dark text-base cursor-default">
                          Beranda
                      </a>
                  </li>
              </ol>
          </div>
          <!-- tinggal tambah modalnya disini dit -->
          <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
              <div class="w-full px-7 mx-auto">
                  <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                      <h1 class="font-myFont text-dark text-lg mb-4">List Soal Assessment</h1>
                      <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-end mb-3">
                          <input v-model="cari" @input="debouncedGetSearchData()" type="text" name="cari" class="font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                      </div>

                      <div class="flex justify-center w-full" v-if="loading" >
                          <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                      </div>

                      <div v-else-if="dataSoal.length > 0 && !loading" class="overflow-x-auto">
                          <table class="w-full text-sm text-left text-gray-500">
                              <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                              <tr>
                                  <th scope="col" class="py-3 px-6">No</th>
                                  <th scope="col" class="py-3 px-6">Pertanyaan</th>
                                  <th scope="col" class="py-3 px-6">Detail Pilihan</th>
                              </tr>
                              </thead>
                              <tbody>
                                  <tr v-for="(data, index) in dataSoal" :key="index" class="bg-white border-b">
                                      <td class="py-4 px-6">
                                          {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                      </td>
                                      <td class="py-4 px-6">{{ data.question }}</td>
                                      <td class="py-4 px-6">
                                          <button @click="modalDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                              <PhEye :size="22"/>
                                          </button>
                                      </td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>

                      <span v-else-if="dataSoal.length == 0 && !loading" class="font-myFont text-center text-dark text-lg mt-7">Data kosong</span>
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
import { PhCaretLeft, PhCaretRight, PhEye, PhX } from '@phosphor-icons/vue';
import { onMounted, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  name: 'PengaturanSoalAssessment',
  components: {PhCaretLeft, PhCaretRight, PhEye, PhX},
  setup(){
      const loading = ref(false)
      const dataSoal = ref([])
      const detailSoal = ref(null)
      const totalHalaman = ref('')
      const itemsPerPage = ref(null)
      const currPage = ref(null)
      const nextPage = ref(null)
      const prevPage = ref(null)
      const totalDari = ref(null)
      const totalKe = ref(null)
      const totalData = ref(null)
      const cari = ref(null)

      const isModalOpen = ref(false)

      const queryParams = {
        'search': '',
        'page': '',
      }

      onMounted(async() => {
          getAllData()
      })

      const getAllData = async() => {
          loading.value = !loading.value
          let allParams = '?'
          console.log(queryParams)
          for (const [key, value] of Object.entries(queryParams)) {
            allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
          }
          const token = JSON.parse(localStorage.getItem('token'))
          const response = await initAPI('get', 'assessments/questions'+allParams.replace('?&', '?'), null, token)
          console.log(response.data)
          dataSoal.value = response.data.data
          totalHalaman.value = response.data.last_page
          itemsPerPage.value = response.data.per_page
          currPage.value = response.data.current_page
          nextPage.value = response.data.next_page_url
          prevPage.value = response.data.prev_page_url
          totalDari.value = response.data.from
          totalKe.value = response.data.to
          totalData.value = response.data.total
          loading.value = !loading.value
          console.log(`data`,dataSoal.value)
      }

      const debouncedGetSearchData = _debounce(() => {
          queryParams.search = cari.value !== '' ? cari.value : ''
          queryParams.page = ''
          getAllData()
      }, 500)

      const nextPages = async(url) => {
          queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
          getAllData()
      }
        
      const prevPages = async(url) => {
          queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
          getAllData()
      }

      const modalDetail = (id) => {
          toggleModal()
          const data = dataSoal.value.find(item => item.id === id);
          detailSoal.value = data
      }

      const toggleModal = () => {
          isModalOpen.value = !isModalOpen.value
      }

      return {
          loading,
          dataSoal,
          detailSoal,
          totalHalaman,
          itemsPerPage,
          currPage,
          nextPage,
          prevPage,
          totalDari,
          totalKe,
          totalData,
          cari,
          queryParams,
          debouncedGetSearchData,
          isModalOpen,
          modalDetail,
          nextPages,
          prevPages,
      }
  }
}
</script>