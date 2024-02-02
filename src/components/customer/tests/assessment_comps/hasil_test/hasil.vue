<template>
     <section class="bg-gray-100 pb-8">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Test Assessment
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Hasil Test
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col justify-center mx-7 py-3 gap-4">
            <div class="flex flex-col lg:flex-row justify-center gap-4 lg:my-0">
                <div class="lg:w-3/5 w-full">
                    <div class="bg-white h-auto flex rounded-lg shadow-xl p-4 mb-4">
                        <div class="w-1/2 bg-biru rounded-lg p-4">
                            <h1 class="font-myFont font-medium text-light text-center text-lg mb-2">
                                Tipe Pembelajaran Kamu
                            </h1>
                            <div class="mx-auto flex-col my-4 w-[188px] flex justify-center p-12 rounded-full bg-[#1fabee] bg-opacity-40 backdrop-blur-lg">
                                <span class="text-7xl text-center text-light font-myFont">68</span>
                                <p class="text-xs text-center text-light font-myFont">dari 100%</p>
                            </div>
                            <h1 class="font-myFont font-medium text-center text-light text-lg">
                                Gaya Belajar Visual dan Auditori
                            </h1>
                        </div>

                        <div id="chartBelajar" class="w-1/2 bg-white p-4">
                            <Pie :data="data" :options="options" />
                        </div>
                        <!-- <div class="w-1/2 bg-white p-4">
                            <h1 class="font-myFont font-medium text-dark text-center text-lg mb-2">
                                Ringkasan Tipe Pembelajaran Kamu
                            </h1>
                            <div class="flex flex-col">
                                <div class="rounded-lg mb-4 bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                    <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                        <PhEye :size="22"/>Visual
                                    </span>
                                    <span class="mx-3 text-dark text-sm font-semibold font-myFont py-3">34 / 100</span>
                                </div>
                                <div class="rounded-lg mb-4 bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                    <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                        <PhEar :size="22"/>Auditori
                                    </span>
                                    <span class="mx-3 text-dark text-sm font-semibold font-myFont py-3">34 / 100</span>
                                </div>
                                <div class="rounded-lg bg-[#f3f3ff] mx-2 flex justify-between items-center">
                                    <span class="mx-3 text-biru gap-1 flex items-center font-semibold font-myFont py-3">
                                        <PhHandTap :size="22"/>Kinestetik
                                    </span>
                                    <span class="mx-3 text-dark text-sm font-semibold font-myFont py-3">32 / 100</span>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <!-- <div class="bg-white rounded-lg shadow-xl p-4 lg:h-[689px]">
                        <div class="flex flex-col">
                           
                            <hr class="my-3">
    
                        </div>
                    </div> -->
                </div>

                <div class="lg:w-2/5 w-full">
                    <div class="bg-white h-auto flex flex-col rounded-lg shadow-xl p-4 mb-4">
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
                            Gaya Belajar Visual dan Auditori
                        </h1>

                        <p class="mx-7 mb-4 font-myFont text-sm text-dark">
                            Anda memiliki gabungan gaya belajar visual dan auditori.
                        </p>
                        <p v-html="formattedText" class="mx-7 font-myFont text-sm text-dark"></p>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
</template>

<script>
import { PhEye, PhEar, PhHandTap, PhTextAa } from '@phosphor-icons/vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    name: 'HasilAssessment',
    components: {PhEye, PhEar, PhHandTap, PhTextAa, Pie},
    setup(){
        const rawText = 'Ada hal tertentu yang Anda akan belajar efektif jika menggunakan gaya belajar visual, dan ada hal lain yang Anda akan belajar efektif jika menggunakan gaya belajar auditori. Bahkan, kadang jika kedua gaya belajar digunakan, akan lebih optimal.'
        const formattedText = rawText.replace(/\./g, '. <br> <br>')

        const data = {
            labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
            datasets: [
            {
                backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                data: [40, 20, 80, 10]
            }
            ]
        }
  
        const options = {
            responsive: true,
            maintainAspectRatio: false
        }

        return {
            formattedText,
            data,
            options,
        }
    }
}
</script>
