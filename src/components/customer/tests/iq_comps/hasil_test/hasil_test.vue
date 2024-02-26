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
                   Hasil IQ
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

       <div v-else-if="!loading && scoreIQ">
            <div class="flex flex-col justify-center mx-7 py-3 gap-4">
                <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                    <div class="lg:w-3/5 w-full">
                        <div class="bg-white h-auto lg:h-[340px] flex flex-col md:flex-row lg:flex-row rounded-lg shadow-xl p-4 mb-4">
                            <div class="order-2 md:order-1 lg:order-1 w-full md:w-1/2 lg:w-1/2 bg-biru rounded-lg p-4 mr-0 lg:mr-[9px]">
                                <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                    Berikut Score IQ Kamu
                                </h1>
                                <div class="mx-auto flex-col my-6 w-[178px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                    <span :class="{'-ml-[22px]': scoreIQ.length == 3}" class="text-7xl my-1 text-center text-light font-myFont">
                                        {{ scoreIQ }}
                                    </span>
                                </div>
                                <h1 class="font-myFont font-medium text-center text-light text-lg">
                                    {{ aliasIQ }} - {{ categoryIQ }}
                                </h1>
                            </div>
    
                            <div class="order-1 md:order-2 lg:order-2 mb-2 lg:mb-0 w-full md:w-1/2 lg:w-1/2 flex flex-col gap-2 items-center bg-white">
                                <img src="../../../../../assets/img/hasil-iq.png" class="mx-auto w-1/3 mb-2 lg:mb-4">
                                <p class="font-myFont text-sm text-center text-neutral-500 mb-2">
                                    Kamu telah selesai melakukan Test IQ dan mendapatkan hasil IQ sebesar <span class="font-myfont font-medium text-dark">{{ scoreIQ }}</span>.
                                </p>
                                <p class="font-myFont text-sm text-center text-neutral-500">
                                    Yang dimana score IQ tersebut tergolong tipe <span class="font-myfont font-medium text-dark">{{ aliasIQ }}</span> dengan category 
                                    <span class="font-myfont font-medium text-dark">{{ categoryIQ }}</span>
                                </p>
                            </div>
                            
                        </div>
                    </div>
    
                    <div class="lg:w-2/5 w-full">
                        <div class="bg-white h-auto lg:h-[340px] flex flex-col rounded-lg shadow-xl p-4 mb-4">
                            <div class="flex items-center pb-3">
                                <div class="rounded-lg bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                        <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                            <PhBrain :size="24"/>
                                        </span>
                                    </div>
                                <h1 class="font-myFont font-medium text-dark text-center text-lg">
                                    IQ Berdasarkan Tipe Dan Kategori
                                </h1>
                            </div>
    
                            <hr>
    
                            <div class="flex flex-col gap-2 mt-3">
                                <span class="text-[#484C98] flex justify-between items-center p-3 bg-[#F1F4FF] rounded-lg hover:border hover:border-[#839cf8] hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                    <PhLightning :size="16"/>
                                    <p class="uppercase font-poppins font-semibold text-xs">Superior - Baik Sekali</p>
                                </span>
                                <span class="text-[#70C7B0] flex justify-between items-center p-3 bg-[#F1FDF9] rounded-lg hover:border hover:border-success hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                    <PhStar :size="16"/>
                                    <p class="uppercase font-poppins font-semibold text-xs">Bright Normal - Baik</p>
                                </span>
                                <span class="text-[#70C7B0] flex justify-between items-center p-3 bg-[#f6f7fc] rounded-lg hover:border hover:border-[#b4c0fc] hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                    <PhCheck :size="16"/>
                                    <p class="uppercase font-poppins font-semibold text-xs">Average - Cukup</p>
                                </span>
                                <span class="text-[#E8CB81] flex justify-between items-center p-3 bg-[#FFFCF1] rounded-lg hover:border hover:border-warning hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                    <PhFlagPennant :size="16"/>
                                    <p class="uppercase font-poppins font-semibold text-xs">Dull Normal - Kurang</p>
                                </span>
                                <span class="text-[#D68D93] flex justify-between items-center p-3 bg-[#FEF7F5] rounded-lg hover:border hover:border-danger hover:scale-105 hover:shadow-[0px_14px_28px_-5px_rgba(0,0,0,0.1)] transition-all duration-150 ease-in">
                                    <PhGhost :size="16"/>
                                    <p class="uppercase font-poppins font-semibold text-xs">Borderline - Kurang Sekali</p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
   </section>
</template>

<script>
import { PhLightning, PhStar, PhCheck, PhFlagPennant, PhGhost, PhBrain } from '@phosphor-icons/vue';
import { onMounted, ref } from 'vue';
import initAPI from '../../../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
   name: 'HasilAssessment',
   components: {PhLightning, PhStar, PhCheck, PhFlagPennant, PhGhost, PhBrain},
   setup(){
       const loading = ref(false)

       const scoreIQ = ref(null)
       const aliasIQ = ref(null)
       const categoryIQ = ref(null)

       onMounted(async() => {
           try {
               loading.value = !loading.value
               const token = JSON.parse(localStorage.getItem('token'))
               const userId = JSON.parse(localStorage.getItem('userData')).id
               const response = await initAPI('get', `customers?id=${userId}`, null, token)
               console.log(response.data.data[0])

               scoreIQ.value = response.data.data[0].customer_iq.customer_iq.toString()
               aliasIQ.value = response.data.data[0].customer_iq.iq.aliases
               categoryIQ.value = response.data.data[0].customer_iq.iq.category

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
       })

       return {
           loading,
           scoreIQ,
           aliasIQ,
           categoryIQ
       }
   }
}
</script>
