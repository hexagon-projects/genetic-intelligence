<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Test Assessment
                </RouterLink>
            </ol>
        </div>
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="flex flex-col bg-white lg:h-[400px] w-full lg:w-full rounded-lg shadow-lg p-7"
            :class="{'overflow-y-scroll': currForm == 1 && isKlikSiapTest !== 'tidak'}"
            >
                <div v-if="isAssessment == false">
                    <div v-if="currForm == 0 && isKlikSiapTest == 'tidak'">
                        <div class="hidden lg:flex lg:flex-row items-center">
                            <div class="lg:w-1/2">
                                <div class="flex flex-col mx-14">
                                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Apakah kamu siap untuk melakukan test?</h1>
                                    <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                                    <button @click="siaptest" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                        Test Sekarang
                                    </button>
                                </div>
                            </div>
                            <div class="lg:w-1/2">
                                <div class="flex flex-col justify-center">
                                    <img src="../../../assets/img/test-assessment.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Siap Test Image">
                                </div>
                            </div>
                        </div>
                        <div class="lg:hidden flex flex-col items-center">
                            <div class="lg:w-1/2">
                                <div class="flex flex-col justify-center">
                                    <img src="../../../assets/img/test-assessment.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="No Data Found">
                                </div>
                            </div>
                            <div class="lg:w-1/2">
                                <div class="flex flex-col">
                                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Apakah kamu siap untuk melakukan test?</h1>
                                    <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                                    <button @click="siaptest" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                        Test Sekarang
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="currForm == 1 && isKlikSiapTest == 'ya'" class="flex flex-col justify-center">
                        <sudahTest/>
                    </div>
                </div>

                <div v-if="isAssessment == true">
                    <div class="hidden lg:flex lg:flex-row items-center">
                        <div class="lg:w-1/2">
                            <div class="flex flex-col mx-14">
                                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Yeayy! Kamu sudah selesai melakukan Test Assessment.</h1>
                                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lihat hasil test kamu sekarang juga!</p>
                                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                    Lihat Hasil
                                </RouterLink>
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="flex flex-col justify-center">
                                <img src="../../../assets/img/test-assessment.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Selesai Test Image">
                            </div>
                        </div>
                    </div>
                    <div class="lg:hidden flex flex-col items-center">
                        <div class="lg:w-1/2">
                            <div class="flex flex-col justify-center">
                                <img src="../../../assets/img/test-assessment.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Selesai Test Image">
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="flex flex-col">
                                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Yeayy! Kamu sudah selesai melakukan Test Assessment.</h1>
                                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lihat hasil test kamu sekarang juga!</p>
                                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                                    Lihat Hasil
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { onMounted, ref } from 'vue';
import sudahTest from './assessment_comps/sudahTest.vue';
import initAPI from '../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default{
    name: 'TestAssessment',
    components: {sudahTest},
    setup() {
        const isAssessment = ref(false)
        const currForm = ref(0)
        const isKlikSiapTest = ref('tidak')

        const siaptest = () => {
            currForm.value = 1
            isKlikSiapTest.value = 'ya'
            // getDataPertanyaan()
        }

        onMounted(async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const userId = JSON.parse(localStorage.getItem('userData'))
            try {
                const response = await initAPI('get', `customers/assessments?customer_id=${userId.id}`, null, token)
                if(response.data.data.length > 0){
                    isAssessment.value = true
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: "Terjadi error saat mengambil data assessment.",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Tutup"
                })
            }

        })

        return { 
            isAssessment,
            currForm,
            isKlikSiapTest,
            siaptest
         }
    }
}
</script>