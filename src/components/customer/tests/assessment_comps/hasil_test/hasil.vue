<template>
     <section class="bg-gray-100 pb-8">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Hasil Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="text-base text-dark hover:text-dark/70">
                    Hasil Assessment
                </RouterLink>
            </ol>
        </div>

        <div v-if="loading">
            <div class="flex flex-col justify-center mx-7 py-3 gap-4">
                <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <div class="w-full">
                        <div class="bg-white h-auto lg:h-[340px] flex flex-col justify-center rounded-lg shadow-xl p-4 mb-4">
                            <span class="mx-auto flex flex-col justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else>
            <div v-if="isAssessment == true">
                <div class="flex flex-col justify-center mx-7 py-3 gap-4">
                    <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                        <div class="lg:w-3/5 w-full">
                            <div class="bg-white h-auto lg:h-[340px] flex flex-col md:flex-row lg:flex-row rounded-lg shadow-xl p-4 mb-4">
                                <div class="w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4">
                                    <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                        Tipe Pembelajaran Kamu
                                    </h1>
                                    <div class="mx-auto flex-col my-4 w-[188px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                        <span class="text-7xl text-center text-light font-myFont">
                                            {{ valueTotal }}
                                        </span>
                                        <p class="text-xs text-center text-light font-myFont">
                                            dari 100%
                                        </p>
                                    </div>
                                    <h1 class="font-myFont font-medium text-center text-light text-lg">
                                        {{ gayaBelajar }}
                                    </h1>
                                </div>
        
                                <div id="chartBelajar" class="w-full md:w-1/2 lg:w-1/2 bg-white p-4">
                                    <Pie v-if="data && data !== null" :data="data" :options="options" />
                                </div>
                                
                            </div>
                        </div>
        
                        <div class="lg:w-2/5 w-full">
                            <div class="bg-white h-auto lg:h-[340px] flex flex-col rounded-lg shadow-xl p-4 mb-4">
                                <div class="flex items-center p-4">
                                    <div class="rounded-lg bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                            <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                                <PhTextAa :size="24"/>
                                            </span>
                                        </div>
                                    <h1 class="font-myFont font-medium text-dark text-center text-lg">
                                        Rangkuman Tipe Gaya Belajar Kamu
                                    </h1>
                                </div>
        
                                <hr>
        
                                <h1 class="font-myFont font-semibold text-dark text-center text-lg mt-2 mb-[10px]">
                                    {{ gayaBelajar }}
                                </h1>
        
                                <p v-html="formattedText" class="mx-7 font-myFont text-sm text-neutral-500">
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div v-if="isAssessment == false">
                <belumTest/>
            </div>
        </div>


        
    </section>
</template>

<script>
import { PhEye, PhEar, PhHandTap, PhTextAa } from '@phosphor-icons/vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { onMounted, ref } from 'vue';
import { Pie } from 'vue-chartjs'
import initAPI from '../../../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import belumTest from './belum_test.vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'HasilAssessment',
    components: {PhEye, PhEar, PhHandTap, PhTextAa, Pie, belumTest},
    setup(){
        const router = useRouter()
        const loading = ref(false)
        const isAssessment = ref(false)

        const persentaseJawaban = []
        const gayaBelajar = ref('')

        const nextParagraf = ref('')
        const formattedText = ref('')

        const data = ref(null)
  
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }

        const valueTotal = ref(null)

        onMounted(async() => {
            const token = Cookies.get('token')
            if(token){
                try {
                    loading.value = !loading.value
                    const userId = JSON.parse(localStorage.getItem('userData')).id
                    const response = await initAPI('get', `customers/assessments?customer_id=${userId}`, null, token)
                    if(response.data.data.length > 0){
                        isAssessment.value = true
                        gayaBelajar.value = response.data.data[0].assessment.name
                        response.data.data[0].total_answer.forEach(element => {
                           persentaseJawaban.push(element.percentage) 
                        });
    
                        valueTotal.value = response.data.data[0].result_percentage
                        const formatText = response.data.data[0].assessment.description.map(sentence => sentence.replace(/\./g, '. <br> <br>')).join(' ');
                        formattedText.value = formatText
    
                        data.value = {
                            labels: ['Visual', 'Auditori', 'Kinestetik'],
                            datasets: [
                            {
                                backgroundColor: ['#e7515a','#0b40f4', '#00ab55'],
                                data: persentaseJawaban,
                            },
                            ],
                        };
                    }
                    loading.value = !loading.value
                } catch (error) {
                    console.log(error)
                    Swal.fire({
                        title: "Error",
                        text: "Terjadi error saat mengambil data assessment.",
                        icon: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#0b40f4",
                        confirmButtonText: "Tutup"
                    })
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        })

        return {
            loading,
            isAssessment,
            formattedText,
            data,
            options,
            gayaBelajar,
            valueTotal,
        }
    }
}
</script>
