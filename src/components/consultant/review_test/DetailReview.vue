<template>
    <div v-if="dataReview && datas">
      <!-- <h2>Review Detail</h2>
      <p>ID: {{ id }}</p>
      <p>Name: {{ dataReview.name }}</p> -->
      <section class="bg-gray-100 pb-16">
          <div class="mx-4 pt-4">
              <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                  <li class="before:px-1.5">
                      <a class="text-dark text-base cursor-default">
                          Beranda
                      </a>
                  </li>
              </ol>
          </div>
            <div class="flex flex-col lg:flex-row justify-center gap-4 mx-4 lg:my-0">
                <div class="lg:w-1/3 w-full mt-4">
                    <div class="bg-white rounded-lg shadow-xl p-4 h-full">
                        <div class="flex flex-col">
                            <div class="flex justify-between items-center">
                                <h2 class="font-myFont text-start text-dark font-semibold">File Test Grafologi</h2>
                                <button @click="downloadImage(dataReview.customers_results.detection)" class="text-light px-2 py-1 bg-biru rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                    <PhFileArrowDown :size="22"/>
                                </button>
                            </div>
                            <hr class="my-5">
                            <div class="self-center my-1">
                                <img :src="'http://178.128.110.149/api/open/detections/'+dataReview.customers_results.detection">
                                <!-- <img :src="'http://gim.app.api.hexagon.co.id/api/open/detections/'+dataReview.customers_results.detection"> -->
                                <!-- <img src="../../../assets/img/grafologi.jpg"> -->
                                <!-- <img class="w-1/2 mx-auto h-full rounded-lg shadow-xl hover:border-secondary border-2 border-white mb-2" src="../../assets/img/sample.jpg" alt="User Profile"> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:w-2/3 w-full lg:mt-4">
                    <div class="flex flex-col gap-4 lg:gap-4">
                        <div class="bg-white rounded-lg shadow-xl lg:p-4 w-full overflow-hidden">
                            <div class="self-center flex flex-col items-center">
                                <h1 class="font-myFont mx-auto text-dark">Tipe Kecerdasan Customer</h1>
                                <h1 class="font-myFont font-semibold mx-auto text-dark text-lg">{{ datas.gim_result }}</h1>
                            </div>
                        </div>
                        <div class="bg-white rounded-lg shadow-xl py-2 lg:p-4 w-full overflow-hidden">
                           <div class="flex flex-col lg:flex-row items-center gap-2 mx-4">
                                <img src="../../../assets/img/front.png" class="w-32 mr-4">
                                <div class="flex flex-col w-full">
                                    <h2 class="font-myFont text-start text-dark font-semibold mb-2">Data Customer</h2>
                                    <div class="overflow-x-scroll md:overflow-visible lg:overflow-visible">
                                        <table class="border text-sm text-left text-gray-500">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="py-4 px-6">Nama Customer</th>
                                                <th scope="col" class="py-4 px-6">Tempat Lahir</th>
                                                <th scope="col" class="py-4 px-6">Tanggal Lahir</th>
                                                <th scope="col" class="py-4 px-6">Gol. Darah</th>
                                                <th scope="col" class="py-4 px-6">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <td class="py-4 px-6">{{ dataReview.name }}</td>
                                                    <td class="py-4 px-6">{{ dataReview.birth_place }}</td>
                                                    <td class="py-4 px-6">{{ dataReview.birth_date }}</td>
                                                    <td class="py-4 px-6">{{ dataReview.blood_group }}</td>
                                                    <td class="py-4 px-6">{{ dataReview.status }}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                           </div>
                        </div>

                        <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                            <div class="flex flex-col justify-center align-middle">
                                <h2 class="font-myFont text-start text-dark font-semibold">Note Hasil Grafologi</h2>
                                <hr class="my-5">
                                <textarea v-model="notes" class="font-myFont rounded-md border border-gray-300 w-full py-2 px-3 mb-2" rows="4" placeholder="Note..."></textarea>
                                <button @click="submitNote(dataReview.customers_results.customer_id)" class="px-2 py-2 self-end rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  </template>
  
<script>
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../api/api';
import { PhFileArrowDown } from '@phosphor-icons/vue'
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';

export default {
name: 'DetailReview',
components: {PhFileArrowDown},
setup() {
    const store = useStore()
    const router = useRouter()

    const datas = ref(null)
    const notes = ref('')

    const dataReview = computed(() => store.getters.getReviewDetail)
    
    onMounted(async() => {
        if(dataReview.value == null){
            if(localStorage.getItem('reviewData')){
                store.commit('reviewGrafologi', JSON.parse(localStorage.getItem('reviewData')));
                console.log(`review`,datas.value)
            }
        }
        const token = JSON.parse(localStorage.getItem('token'))
        const response = await initAPI('post', 'customers/gim-result/in-review/'+dataReview.value.id, null, token)
        console.log(response.data)
        datas.value = response.data
    })

    const downloadImage = async (imgUrl) => {
            const imageUrl = 'http://178.128.110.149/api/open/detections/'+imgUrl
            // const imageUrl = 'http://gim.app.api.hexagon.co.id/api/open/detections/'+imgUrl
            console.log(`url`,imageUrl)
            // const imageUrl = 'http://gim.app.api.hexagon.co.id/api/open/results/' + userResultDetect.value.gim_result

            const response = await fetch(imageUrl)
            const blob = await response.blob()

            const url = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = url
            link.target = '_blank'
            link.download = userResultDetect.value.gim_result

            link.click()

            window.URL.revokeObjectURL(url)
        }

        const submitNote = async(customer_id) => {
            const gimId = datas.value.gim_id
            const note = notes.value
            const token = JSON.parse(localStorage.getItem('token'))
            const data = new FormData();
                data.append('gim_id', gimId);
                data.append('note', note);
            console.log(`kirim nnote`,data)
            try {
                const response = await initAPI('post', 'customers/gim-result/'+customer_id, data, token)
                console.log(response.data)
                Swal.fire({
                      icon: 'success',
                      title: 'Berhasil!',
                      text: response.data.message,
                      showConfirmButton: false,
                      timer: 2000
                  });
                
                localStorage.removeItem('reviewData')
                router.push({name: 'consultant.views.review'})
            } catch (error) {
                Swal.fire({
                      icon: 'error',
                      title: 'Submit Gagal',
                      text: 'Submit review gagal dilakukan',
                      showConfirmButton: false,
                      timer: 2000
                  });
            }
        }

    return {
        dataReview,
        datas,
        notes,
        downloadImage,
        submitNote
    }
},
};
</script>
  