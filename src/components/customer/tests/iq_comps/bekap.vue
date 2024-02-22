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

        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-3 gap-4">
            <div :class="{'h-[420px]': loading}" class="flex flex-col bg-white w-full lg:w-full rounded-lg shadow-lg p-7">
                <div v-if="isUnderstand == false">
                    <InstruksiIQ/>
                </div>

                <div v-if="isUnderstand == true">
                    <h1 class="font-myFont text-2xl text-center text-dark font-semibold mb-1">Jawab pertanyaan dibawah ini</h1>
                    
                    <div v-if="timer !== null" class="justify-center flex items-center gap-1">
                        <h1 class="font-myFont text-md text-center text-dark font-medium">Waktu tersisa:</h1>
                        <span class="font-myFont text-md text-center text-dark font-medium">{{timer.minutes}} Menit : {{timer.seconds}} Detik</span>
                    </div>
                    
                    <div v-if="loading" class="pt-24 h-full flex flex-col items-center justify-center w-full">
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-for="(question, index) in questions" :key="index" v-else-if="!loading && questions" class="flex flex-col">
                        <div class="my-12 self-center">
                            <span class="font-myFont text-center text-md text-neutral-500 font-medium">
                               {{ question.id }}. {{ question.question }}
                            </span>
                            <div class="justify-center flex items-center gap-2 mt-4">
                                <label for="jawaban" class="font-myFont text-neutral-500">Jawaban:</label>
                                <input v-model="jawaban" type="text" id="jawaban" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                            </div>
                        </div>
                        <small class="font-myFont text-center text-md text-neutral-500 font-medium mb-1">Pertanyaan {{ question.id }} dari 50</small>
                        <button v-if="question.id < 8" @click="confirmNext('next')" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg hover:bg-opacity-75 hover:shadow-md">Soal Selanjutnya</button>
                        <button v-else-if="question.id == 8" @click="submitJawaban" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg hover:bg-opacity-75 hover:shadow-md">Submit Jawaban</button>
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
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useStore } from 'vuex'
import InstruksiIQ from './iq_comps/petunjuk.vue'
import initAPI from '../../../api/api';
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useTimer } from 'vue-timer-hook';

export default {
    name: 'TestIQ',
    components: {InstruksiIQ},
    setup(){
        const store = useStore()
        const isUnderstand = computed(() => store.getters.getIsUnderstand)
        const time = new Date();
        const timer = ref(null)
        const isExpired = ref(false);
        
        // watch(isUnderstand, (newValue, oldValue) => {
        //     if (newValue === true && oldValue === false) {
        //         // Mulai timer
        //         time.setSeconds(time.getSeconds() + 60);
        //         timer.value = useTimer(time);
        //     }
        // });

        onMounted(() => {
            if (isUnderstand.value) {
                time.value.setSeconds(time.value.getSeconds() + 60);
                timer.value = useTimer(time.value);
            }
            getQuestion(null)
        })

        watchEffect(async () => {
            if (isUnderstand.value && !timer.value) {
                // Memulai timer jika isUnderstand berubah menjadi true dan timer belum dimulai
                time.value = new Date();
                time.value.setSeconds(time.value.getSeconds() + 20);
                timer.value = useTimer(time.value, () => {
                    // Ketika waktu habis, atur isExpired menjadi true
                    console.log("Timer expired");
                    isExpired.value = true;
                });
            }

            if(timer.value && isExpired.value) {
                console.log('IsExpired ieu waktuna')
                Swal.fire({
                    icon: 'success',
                    title: 'Waktu habis.',
                    text: 'Terimakasih sudah melakukan test, hasil IQ kamu akan keluar segera.',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        readyToPush.value = true

                        if(readyToPush){
                            listJawaban.push(DOMPurify.sanitize(jawaban.value))
                            console.log(`jawavan yeuh`, listJawaban)
                            jawaban.value = ''
                        }
                    }
                })
            }
        })

        const loading = ref(false)

        const questions = ref([])
        const nextQuestion = ref('')
        const jawaban = ref('')
        const readyToPush = ref(false)

        const listJawaban = []

        const confirmNext = (param) => {
            const text = jawaban.value !== '' ? 'Sudah yakin dengan jawabanmu?.' : 'Jawaban belum di isi, yakin untuk pindah soal?.'

            Swal.fire({
              icon: 'question',
              title: 'Pindah ke soal selanjutnya?',
              text: text,
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonColor: "#0b40f4",
              confirmButtonText: "Ya, yakin",
              cancelButtonColor: "#3b3f5c",
              cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    readyToPush.value = param == 'next' ? true : false

                    if(readyToPush){
                        listJawaban.push(DOMPurify.sanitize(jawaban.value))
                        console.log(`jawavan yeuh`, listJawaban)
                        jawaban.value = ''
                    }
                    getQuestion(param)
                }
            })
        }

        const getQuestion = async(param) => {
            loading.value = !loading.value
            let endpoint = param == 'next' ? `iq/questions?page=${nextQuestion.value}&perpage=1` : 'iq/questions?perpage=1'
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', endpoint, null, token)
                console.log(response.data)
                questions.value = response.data.data
                nextQuestion.value = response.data.next_page_url ? response.data.next_page_url.split('=')[1] : null
                console.log(`next yeuh`)
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error Terjadi',
                    text: 'Error saat mengambil data pertanyaan',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK",
                })
            }

            loading.value = !loading.value
        }

        const submitJawaban = async() => {
            listJawaban.push(DOMPurify.sanitize(jawaban.value))
            const token = JSON.parse(localStorage.getItem('token'))
            const customerId = JSON.parse(localStorage.getItem('userData')).id
            
            const data = new FormData();
            data.append('customer_id', customerId);
            data.append('answers', JSON.stringify(listJawaban))
    
            console.log(`final jawaban`,data)
            try {
                const response = await initAPI('post', 'customers/iq', data, token)
                console.log(response.data)

                Swal.fire({
                    icon: 'success',
                    title: 'Jawaban Dikirim',
                    text: response.data.message,
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK",
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Terjadi',
                    text: 'Error saat kirim jawaban, silahkan coba lagi.',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK",
                })
            }
        }

        const buttonDisabled = computed(() => {
            if(!jawaban.value){
                return true
            } else {
                return false
            }
        })

        return {
            timer,
            isExpired,
            loading,
            isUnderstand,
            questions,
            jawaban,
            nextQuestion,
            buttonDisabled,
            confirmNext,
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