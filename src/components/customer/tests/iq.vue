<template>
    <section class="bg-gray-100 pb-20">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.iq'}" class="text-base text-dark hover:text-dark/70">
                    Test IQ
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div :class="{'h-[420px]': loading}" class="flex flex-col bg-white w-full lg:w-full rounded-lg shadow-lg p-7">
                <div v-if="isUnderstand == false">
                    <InstruksiIQ/>
                </div>

                <div v-if="isUnderstand == true">
                    <h1 class="uppercase font-myFont text-2xl text-center text-dark font-semibold mb-4">Soal Test IQ</h1>
                    <div v-if="loading" class="pt-24 h-full flex flex-col items-center justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-for="(question, index) in questions" :key="index" v-else-if="!loading && questions" class="flex flex-col">
                        <span class="font-myFont text-center text-md text-neutral-500 font-medium">
                           {{ question.id }}. {{ question.question }}
                        </span>
                        <div class="self-center flex items-center gap-2 mt-4">
                            <label for="jawaban" class="font-myFont text-neutral-500">Jawaban:</label>
                            <input v-model="jawaban" type="text" id="jawaban" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <small class="font-myFont text-center text-md text-neutral-500 font-medium mt-20">Pertanyaan {{ question.id }} dari 50</small>
                        <button v-if="question.id < 50" @click="getQuestion('next')" :disabled="buttonDisabled" :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg">Soal Selanjutnya</button>
                        <button v-else-if="question.id == 50" @click="submitJawaban" :disabled="buttonDisabled" :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg">Submit Jawaban</button>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- <div class="flex flex-col justify-center items-center mx-7 py-8 gap-4"> -->
            <!-- <div class="-mt-6 w-1/2 bg-white rounded-lg shadow-lg p-4">
                <div class="flex flex-col items-center p-4">
                    <h1 class="font-myFont text-2xl text-dark font-semibold mb-4">Petunjuk Test IQ</h1>
                    <img src="../../../assets/img/petunjuk-iq.png" class="w-1/4 mb-4">
                    
                    <div class="flex items-center gap-8">
                        <button @click="btnInstruksi('prev')" :class="{'opacity-50': indexInstruksi == 0}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <transition name="fade" mode="out-in">
                            <p v-if="indexInstruksi == 0" class="overflow-hidden font-myFont text-neutral-500 text-sm mb-2">
                                Tes ini berisi 50 pertanyaan yang secara bertahap menjadi semakin sulit. Anda <span class="text-dark font-semibold">tidak mungkin</span> dapat menyelesaikan semua pertanyaan, tetapi selesaikan <span class="text-dark font-semibold">semampu</span> Anda.
                            </p>
                            <p v-else-if="indexInstruksi == 1" class="overflow-hidden font-myFont text-neutral-500 text-sm mb-2">
                                Anda memiliki waktu 12 menit untuk memberi jawaban yang benar sebanyak mungkin. Kerjakan dengan <span class="text-dark font-semibold">teliti</span>, namun jangan <span class="text-dark font-semibold">menghabiskan waktu</span> lama pada setiap pertanyaan atau lewati pertanyaan itu. 
                            </p>
                            <div v-else-if="indexInstruksi == 2" class="w-full overflow-hidden flex flex-col items-center gap-2">
                                <p class="font-myFont text-neutral-500 text-sm">
                                    Sebelum Anda memulai tes ini, jawablah Contoh Pertanyaan dibawah ini. 
                                </p>
                                <button class="bg-biru shadow-sm px-4 py-2 text-white text-sm rounded-md hover:bg-opacity-75">
                                    Lihat Soal
                                </button>
                            </div>
                        </transition>
                        <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 2}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
</section>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import InstruksiIQ from './iq_comps/petunjuk.vue'
import initAPI from '../../../api/api';
import DOMPurify from 'dompurify'

export default {
    name: 'TestIQ',
    components: {InstruksiIQ},
    setup(){
        const loading = ref(false)
        const store = useStore()
        const isUnderstand = computed(() => store.getters.getIsUnderstand)

        const questions = ref([])
        const nextQuestion = ref('')
        const jawaban = ref('')
        const readyToPush = ref(false)

        const listJawaban = []

        const getQuestion = async(param) => {
            loading.value = !loading.value
            readyToPush.value = param == 'next' ? true : false
            let endpoint = param == 'next' ? `iq/questions?page=${nextQuestion.value}&perpage=1` : 'iq/questions?perpage=1'
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', endpoint, null, token)
                console.log(response.data)
                questions.value = response.data.data
                nextQuestion.value = response.data.next_page_url.split('=')[1]
                console.log(`next yeuh`)
            } catch (error) {
                console.log(error)
            }

            if(readyToPush && jawaban.value !== ''){
                listJawaban.push(DOMPurify.sanitize(jawaban.value))
                console.log(`jawavan yeuh`, listJawaban)
                jawaban.value = ''
            }

            loading.value = !loading.value
        }

        const submitJawaban = () => {
            try {
                
            } catch (error) {
                
            }
        }

        const buttonDisabled = computed(() => {
            if(!jawaban.value){
                return true
            } else {
                return false
            }
        })

        onMounted(() => {
            getQuestion()
        })

        return {
            loading,
            isUnderstand,
            questions,
            jawaban,
            nextQuestion,
            buttonDisabled,
            getQuestion,
            submitJawaban
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>