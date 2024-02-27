<template>
    <h1 class="font-myFont text-md md:text-2xl lg:text-2xl text-center text-dark font-semibold mb-1">Jawab pertanyaan dibawah ini</h1>   
    <div v-if="timer" class="justify-center flex items-center gap-1">
        <h1 class="font-myFont text-sm md:text-md lg:text-md text-center text-dark font-medium">Waktu tersisa:</h1>
        <span class="font-myFont text-sm md:text-md lg:text-md text-center text-dark font-medium">{{timer.minutes}} Menit : {{timer.seconds}} Detik</span>
    </div>
    
    <div v-if="loading" class="py-20 h-full flex flex-col items-center justify-center w-full">
        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
    </div>

    <div v-for="(question, index) in questions" :key="index" v-else-if="!loading && questions" class="flex flex-col">
        <div class="my-12 self-center">
            <span v-html="question.question.replace(/\\r\\n/g, '<br>')" class="font-myFont text-center text-xs md:text-base lg:text-base text-neutral-500 font-medium"></span>
            <img v-if="question.image" :src="baseUrl+ 'open/iq_questions/' +question.image" alt="">
            <div class="justify-center flex items-center gap-2 mt-4">
                <label for="jawaban" class="font-myFont text-center text-xs md:text-base lg:text-base text-neutral-500">Jawaban:</label>
                <input v-model="jawaban" type="text" id="jawaban" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
            </div>
        </div>
        <small class="font-myFont text-center text-xs md:text-sm lg:text-sm text-neutral-500 font-medium mb-1">Pertanyaan {{ question.id }} dari 50</small>
        <button v-if="question.id < 50" @click="confirmNext('next')" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg hover:bg-opacity-75 hover:shadow-md">Soal Selanjutnya</button>
        <button v-else-if="question.id == 50" @click="submitJawaban('done')" class="w-[240px] self-center bg-biru px-4 py-2 font-myFont text-white text-sm rounded-lg hover:bg-opacity-75 hover:shadow-md">Submit Jawaban</button>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch, watchEffect } from 'vue'
import { useStore } from 'vuex'
import initAPI from '../../../../api/api';
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useTimer } from 'vue-timer-hook';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRouter } from 'vue-router'

export default {
    name: 'QuestionsIQ',
    setup(){
        onBeforeRouteLeave((to, from, next) => {
            Swal.fire({
                icon: 'question',
                title: 'Keluar dari halaman?',
                text: 'Seluruh proses test kamu tidak akan tersimpan ketika keluar halaman.',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: "#0b40f4",
                confirmButtonText: "OK",
                cancelButtonColor: "#3b3f5c",
                cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    next()
                }
            })
        })

        const router = useRouter()
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const store = useStore()
        const isUnderstand = computed(() => store.getters.getIsUnderstand)
        const timer = ref(null)

        const loading = ref(false)

        const questions = ref([])
        const nextQuestion = ref('')
        const jawaban = ref('')
        const readyToPush = ref(false)

        const listJawaban = []
       
        if(isUnderstand.value == true){
            const time = new Date();
            time.setSeconds(time.getSeconds() + 720);
            timer.value = useTimer(time);
        }

        // watch(isUnderstand, (newVal, oldVal) => {
        //     console.log(`new`, newVal)
        //     console.log(`old`, oldVal)
        //     if(newVal == true || oldVal == true){
        //         const time = new Date();
        //         time.setSeconds(time.getSeconds() + 60);
        //         timer.value = useTimer(time);
        //     }
        // })

        onMounted(() => {
            getQuestion(null)
            watchEffect(async () => {
                if(timer.value && timer.value.isExpired) {
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

                                submitJawaban('timeout')
                            }
                        }
                    })
                }
            })
        })

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

        const submitJawaban = async(param) => {
            if(param == 'done'){
                listJawaban.push(DOMPurify.sanitize(jawaban.value))
            }

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
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.go()
                    }
                })
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Terjadi',
                    text: 'Error saat kirim jawaban, silahkan coba lagi.',
                    showConfirmButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.go()
                    }
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
            baseUrl,
            isUnderstand,
            timer,
            loading,
            questions,
            jawaban,
            nextQuestion,
            buttonDisabled,
            confirmNext,
            submitJawaban,
        }
    }
}
</script>