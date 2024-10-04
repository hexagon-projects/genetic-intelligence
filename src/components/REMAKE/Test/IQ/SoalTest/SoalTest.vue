<template>
    <div class="mx-[30px] md:mx-[60px] w-[872px] h-auto p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
        <div class="w-full flex flex-col lg:flex-row md:justify-between items-center">
            <span class="text-black text-lg md:text-xl lg:text-2xl font-medium font-['Roboto'] leading-loose">Jawablah Pertanyaan Dibawah Ini</span>
            <div v-if="timer" class="justify-center flex items-center gap-1">
                <h1 class="font-roboto text-sm md:text-md lg:text-md text-center text-danger font-normal">Waktu tersisa:</h1>
                <span class="font-roboto text-sm md:text-md lg:text-md text-center text-danger font-normal">{{timer.minutes}} Menit : {{timer.seconds}} Detik</span>
            </div>
        </div>

        <!-- Soal -->
        <div v-if="loading" class="h-40 flex flex-col items-center">
            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>
        
        <div v-if="!loading" class="self-start w-full">
            <div v-for="(question, index) in questions" :key="index" class="flex flex-col mb-[24px]">
                <img class="max-w-[65%]" v-if="question.image" :src="baseUrl+ 'open/iq_questions/' +question.image" alt="image">
                <div v-html="question.question" class="text-black text-base font-normal font-['Roboto'] leading-normal">
                </div>
            </div>
    
            <div class="w-full">
                <textarea rows="2" v-model="jawaban" class="w-full p-3 border rounded-md border-[#3030f8] text-[#667084] outline-none" placeholder="Masukan jawaban disini..."></textarea>
            </div>
        </div>

        <div class="w-full flex flex-col lg:flex-row justify-between items-center gap-[24px]">
            <span class="text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
                Pertanyaan {{ question_page }} dari {{ question_last_page }}
            </span>
        
            <button @click="btnAction" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Selanjutnya</div>
                <div class="w-6 h-6 relative">
                    <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon"/>
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { useTimer } from 'vue-timer-hook'
import { watchEffect, onMounted, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import initAPI from '@/api/api';
import { onBeforeRouteLeave } from 'vue-router';
import DOMPurify from 'dompurify'

const props = defineProps({
    customerId: Number
})

const emit = defineEmits(['refreshUserData'])

const store = useStore()

const isInstruksi = computed(() => store.getters.getStatusIsInstruksi)

const timer = ref(null)
const pauseTime = ref(null)

const loading = ref(false)
const questions = ref(null)
const nextQuestion = ref(null)
const question_page = ref(null)
const question_last_page = ref(null)

const jawaban = ref('')
const listJawaban = []
const readyToPush = ref(false)
const baseUrl = import.meta.env.VITE_API_BASE_URL

const getQuestion = async(param) => {
    loading.value = !loading.value
    let endpoint = param == 'next' ? `iq/questions?page=${nextQuestion.value}&perpage=1` : 'iq/questions?perpage=1'
    const token = Cookies.get('token')
    try {
        const response = await initAPI('get', endpoint, null, token)
        // console.log(response.data)
        questions.value = response.data.data
        nextQuestion.value = response.data.next_page_url ? response.data.next_page_url.split('=')[1] : null
        question_page.value = response.data.current_page
        question_last_page.value = response.data.last_page
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Error saat mengambil data pertanyaan',
            showConfirmButton: true,
            confirmButtonColor: "#0b40f4",
            confirmButtonText: "OK",
        })
    } finally {
        loading.value = !loading.value
    }

}

const initNextQuestion = () => {
    pauseTime.value = true
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
    }).then(async(result) => {
        if (result.isConfirmed) {
            readyToPush.value = true

            if(readyToPush){
                listJawaban.push(DOMPurify.sanitize(jawaban.value))
                console.log(`jawavan yeuh`, listJawaban)
                jawaban.value = ''
            }
            await getQuestion('next')
            pauseTime.value = false
        } else {
            pauseTime.value = false
        }
    })
}

const submitJawaban = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const customerId = props.customerId
        
        const data = new FormData();
        data.append('customer_id', customerId);
        data.append('answers', JSON.stringify(listJawaban))

        console.log(`siap disubmit jawaban`, listJawaban)
        const response = await initAPI('post', 'customers/iq', data, token)

        Swal.fire({
            icon: 'success',
            title: 'Jawaban Dikirim',
            text: response.data.message,
            showConfirmButton: true,
            confirmButtonColor: "#0b40f4",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                emit('refreshUserData')
            }
        })

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Error saat mengirim data jawaban',
            showConfirmButton: true,
            confirmButtonColor: "#0b40f4",
            confirmButtonText: "OK",
        })
    } finally {
        loading.value = false
    }
}

const btnAction = () => {
    if(nextQuestion.value !== null){
        initNextQuestion()
    } else {
        submitJawaban()
    }
}

watch(pauseTime, (newVal) => {
    if (timer.value) {
        if (newVal == true) {
            timer.value.pause(); // Pause timer
        } else if(newVal == false) {
            timer.value.resume(); // Resume timer
        }
    }
});

onMounted(async() => {
    await getQuestion()

    if(isInstruksi.value == false){
        const time = new Date();
        // time.setSeconds(time.getSeconds() + 50);
        time.setSeconds(time.getSeconds() + 720);
        timer.value = useTimer(time);
    }

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

                        submitJawaban()
                    }
                }
            })
        }
    })
})

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
</script>