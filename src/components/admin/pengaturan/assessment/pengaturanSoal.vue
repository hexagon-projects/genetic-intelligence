<template>
  <section class="bg-gray-100 pb-10"
  :class="{'lg:pb-28' : dataSoal.length == 0, 'lg:pb-7': dataSoal.length > 0}"
  >
          <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Pengaturan
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.pengaturan_soal_assessment'}" class="text-base text-dark hover:text-dark/70">
                    Pengaturan Soal Assessment
                </RouterLink>
            </ol>
          </div>
          
          <div v-if="isModalOpen && detailSoal" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
              <div class="hidden lg:block relative w-3/4 top-4 mx-auto shadow-xl rounded-md bg-white">
                  <!-- Modal body -->
                  <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Soal</h1>
                  <hr class="mt-4">
                  <div class="flex flex-row">
                      <div v-if="detailSoal" class="w-full p-4">
                          <div class="flex flex-row">
                              <div class="w-full">
                                  <div class="flex flex-row items-center gap-2 mb-4">
                                      <div class="w-full">
                                          <div class="flex flex-col">
                                              <h1 class="font-myFont font-semibold text-dark text-sm">
                                                  Pertanyaan :
                                              </h1>
                                              <div class="flex flex-row gap-3">
                                                <input type="text" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-biru" :id="'answer_'+detailSoal.id" v-model="detailSoal.question" disabled>
                                                <button @click="clickEdit(detailSoal.id, '')" class="flex items-center gap-1 px-2 py-2 bg-biru font-myFont text-sm text-white rounded-md hover:bg-opacity-75 hover:shadow-lg">
                                                  <PhPencilSimple :size="22"/>
                                                </button>
                                              </div>
                                          </div>
                                      </div>
                                  </div>

                                  <div v-for="(answer, idx) in detailSoal.answers" :key="idx" class="w-full mb-4">
                                      <div class="flex flex-col">
                                          <h1 class="font-myFont text-dark text-sm font-medium mb-1">
                                              Pilihan {{ answer.value.toUpperCase() }}
                                          </h1>
                                          <div class="flex flex-row gap-3">
                                            <input type="text" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-biru" :name="'answer_'+answer.value" :id="'answer_'+detailSoal.id+answer.value" v-model="detailSoal.answers[idx].answer" disabled>
                                            <button @click="clickEdit(detailSoal.id, answer.value)" class="flex items-center gap-1 px-2 py-2 bg-biru font-myFont text-sm text-white rounded-md hover:bg-opacity-75 hover:shadow-lg">
                                              <PhPencilSimple :size="22"/>
                                            </button>
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
                      <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" @click="saveEdit(detailSoal)">Simpan</button>
                      <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                  </div>
              </div>

              <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Soal</h1>
                <hr class="mt-4">
                
                <div v-if="detailSoal" :class="{'h-[460px] flex flex-col justify-center': loadingSubmit}" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div v-if="loadingSubmit" class="flex flex-col items-center justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="!loadingSubmit">
                      <div class="flex flex-row items-center gap-2 mb-4">
                          <div class="w-full">
                              <div class="flex flex-col">
                                  <h1 class="font-myFont font-semibold text-dark text-sm">
                                      Pertanyaan :
                                  </h1>
                                  <div class="flex flex-row gap-3">
                                    <input type="text" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-biru" :id="'answer_'+detailSoal.id" v-model="detailSoal.question" disabled>
                                    <button @click="clickEdit(detailSoal.id, '')" class="flex items-center gap-1 px-2 py-2 bg-biru font-myFont text-sm text-white rounded-md hover:bg-opacity-75 hover:shadow-lg">
                                      <PhPencilSimple :size="22"/>
                                    </button>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div v-for="(answer, idx) in detailSoal.answers" :key="idx" class="w-full mb-4">
                          <div class="flex flex-col">
                              <h1 class="font-myFont text-dark text-sm font-medium mb-1">
                                  Pilihan {{ answer.value.toUpperCase() }}
                              </h1>
                              <div class="flex flex-row gap-3">
                                <input type="text" class="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-biru" :name="'answer_'+answer.value" :id="'answer_'+detailSoal.id+answer.value" v-model="detailSoal.answers[idx].answer" disabled>
                                <button @click="clickEdit(detailSoal.id, answer.value)" class="flex items-center gap-1 px-2 py-2 bg-biru font-myFont text-sm text-white rounded-md hover:bg-opacity-75 hover:shadow-lg">
                                  <PhPencilSimple :size="22"/>
                                </button>
                              </div>
                          </div>
                      </div>
                    </div>
                </div>

                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-between items-center space-x-4">
                    <button class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition" @click="saveEdit(detailSoal)">Simpan</button>
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                </div>
            </div>
          </div>

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
import { PhCaretLeft, PhCaretRight, PhEye, PhPencilSimple, PhX } from '@phosphor-icons/vue';
import { onMounted, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
  name: 'PengaturanSoalAssessment',
  components: {PhCaretLeft, PhCaretRight, PhEye, PhPencilSimple, PhX},
  setup(){
      const loading = ref(false)
      const loadingSubmit = ref(false)
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

      const clickEdit = (id, opt) => {
          if(document.getElementById('answer_'+id+opt).getAttribute('disabled') != null){
            document.getElementById('answer_'+id+opt).removeAttribute('disabled')
            document.getElementById('answer_'+id+opt).classList.remove('bg-gray-100')
          }else{
            document.getElementById('answer_'+id+opt).setAttribute('disabled', true)
            document.getElementById('answer_'+id+opt).classList.add('bg-gray-100')
          }
      }

      const saveEdit = (detailSoal) => {
          Swal.fire({
              icon: 'question',
              title: 'Ubah Data Ini?',
              text: 'Klik tombol Ya untuk merubah data.',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonColor: "#0b40f4",
              confirmButtonText: "Ya, ubah",
              cancelButtonColor: "#3b3f5c",
              cancelButtonText: "Batal",
          }).then((result) => {
              if (result.isConfirmed) {
                  submitEdit(detailSoal)
              }
          })
      }

      const submitEdit = async(detailSoal) => {
          loadingSubmit.value = !loadingSubmit.value
          try {
              const data = {
                  question: detailSoal.question,
                  answer_a: detailSoal.answers[0].answer,
                  answer_b: detailSoal.answers[1].answer,
                  answer_c: detailSoal.answers[2].answer,
                  status: 1,
              }

              const token = JSON.parse(localStorage.getItem('token'))
              const response = await initAPI('put', `assessments/questions/${detailSoal.id}`, data, token)
              console.log(response.data)
              Swal.fire({
                  icon: 'success',
                  title: 'Berhasil',
                  text: 'Soal Assessment berhasil diubah.',
                  showConfirmButton: true,
                  confirmButtonColor: "#0b40f4",
                  confirmButtonText: "Tutup",
              }).then((result) => {
                  if (result.isConfirmed) {
                      isModalOpen.value = false
                      getAllData()
                  }
              })
          } catch (error) {
              console.log(error)
              Swal.fire({
                  icon: 'error',
                  title: 'Terjadi Error',
                  text: 'Ada error saat merubah data Soal Assessment.',
                  showConfirmButton: true,
                  confirmButtonColor: "#0b40f4",
                  confirmButtonText: "Tutup",
              });
          }
          isModalOpen.value = false
          loadingSubmit.value = !loadingSubmit.value
      }

      return {
          loading,
          loadingSubmit,
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
          clickEdit,
          saveEdit,
          toggleModal,
          modalDetail,
          nextPages,
          prevPages,
      }
  }
}
</script>