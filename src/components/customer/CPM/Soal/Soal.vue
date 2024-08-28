<template>
    <div class="mx-7 flex justify-center items-center">
        <div class="w-[375px] md:w-full h-11 flex-col justify-start items-start gap-4 inline-flex">
            <div class="self-stretch justify-between items-center inline-flex">
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div
                    :class="[
                        'self-stretch h-1 rounded-[100px]',
                        currentType === 'A' || currentType === 'AB' || currentType === 'B' ? 'bg-[#3030f8]' : 'bg-[#e4e6eb]'
                    ]"
                    ></div>
                </div>
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div
                    :class="[
                        'self-stretch h-1 rounded-[100px]',
                        currentType === 'AB' || currentType === 'B' ? 'bg-[#3030f8]' : 'bg-[#e4e6eb]'
                    ]"
                    ></div>
                </div>
                <div class="w-[124px] md:w-full flex-col justify-start items-start gap-1 inline-flex">
                    <div
                    :class="[
                        'self-stretch h-1 rounded-[100px]',
                        currentType === 'B' ? 'bg-[#3030f8]' : 'bg-[#e4e6eb]'
                    ]"
                    ></div>
                </div>
            </div>

            <div class="self-stretch justify-between items-center inline-flex">
                <div class="text-[#667084] text-sm font-normal font-roboto leading-tight">
                    SET - {{ currentType }}
                </div>
                <div class="px-1 py-0.5 bg-[#f0f7fd] rounded-full justify-start items-center flex">
                    <div class="self-stretch justify-start items-center flex gap-2">
                        <div class="w-5 h-5 relative">
                            <img src="@/assets/img/cpm/timer.svg">
                        </div>
                        <div class="flex-col justify-start items-start inline-flex">
                            <div class="text-[#3030f8] text-xs font-medium font-roboto leading-none">
                                {{ formattedTime }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="flex flex-col lg:flex-row justify-center mx-7 pt-5 gap-4">
        <div class="w-full lg:w-1/2 bg-white shadow-md rounded-3xl p-[24px]">
            <div class="w-full border-black border-b-[1px]">
                <h1 class="mb-3 text-black text-base font-medium font-roboto leading-normal">
                    Bentuk manakah yang hilang?
                </h1>
            </div>

            <!-- <img class="mx-auto" src="@/assets/img/cpm/soal.svg" alt="soal"> -->
            <div class="mt-6 flex items-center justify-center">
                <div v-if="loadingFetch" class="skeleton w-[350px] h-[190px] bg-gray-300 rounded-md"></div>
                <img v-if="!loadingFetch && questions" class="w-[60%] mx-auto" :src="baseUrl+ 'open/cpm-questions/'+ currentType + '/' +questions.image" alt="soal">
            </div>
        </div>

        <div class="w-full lg:w-1/2 bg-white shadow-md rounded-3xl p-[24px]">
            <div class="w-full border-black border-b-[1px]">
                <h1 class="mb-3 text-black text-base font-medium font-roboto leading-normal">
                    Pilih jawaban :
                </h1>
            </div>

            <div class="mt-5 grid grid-cols-3 gap-4">
                <div v-if="loadingFetch" v-for="n in 6" :key="n" class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <div class="skeleton mx-auto w-16 h-16 bg-gray-300 rounded-md"></div>
                </div>

                <div v-if="!loadingFetch && questions" v-for="(item, index) in questions.cpm_questions_answers" :key="item.id" 
                @click="selectAnswer(item.answer)"
                :class="[
                'cursor-pointer min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl',
                selectedAnswer === item.answer ? 'border-b-[#3030f8] border-b-4' : ''
                ]">
                    <img class="mx-auto" :src="baseUrl+ 'open/cpm-questions/'+ currentType + '/' +item.image" alt="jawaban">
                </div>
                <!-- <div class="min-w-[94px] max-w-[334px] p-2 border border-b-[#3030f8] border-b-4 border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div>
                <div class="min-w-[94px] max-w-[334px] p-2 border border-black border-opacity-50 rounded-xl">
                    <img class="mx-auto" src="@/assets/img/cpm/jawaban.png" alt="jawaban">
                </div> -->
            </div>
        </div>

        <div class="block lg:hidden text-center text-[#667084] text-base font-normal font-roboto leading-normal">
            {{currentQuestionIndex }} / 12
        </div>

        <button @click="nextQuestion" class="lg:hidden hover:-translate-y-2 transition-all cursor-pointer self-stretch min-h-[42px] max-h-[62px] px-[60px] py-[18px] md:px-[90px] md:py-[18px] bg-[#3030f8] rounded-2xl border-l hover:border-l-[6px] hover:border-r-0 border-r hover:border-t-0 border-t border-b-4 hover:border-b-8 border-black justify-center items-center gap-2.5 inline-flex">
            <div class="text-white text-base font-medium font-roboto leading-normal">
                Selanjutnya
            </div>
            <div class="w-4 h-4 relative">
                <img src="@/assets/img/cpm/icon-row-up.svg">
            </div>
        </button>
    </div>

    <div class="hidden mt-8 lg:flex flex-col justify-center items-center gap-3 mx-7">
        <div class="text-center text-[#667084] text-base font-normal font-roboto leading-normal">
            {{currentQuestionIndex }} / 12
        </div>

        <button @click="nextQuestion" class="w-1/2 mx-auto hover:-translate-y-2 transition-all cursor-pointer self-stretch min-h-[42px] max-h-[62px] px-[60px] py-[18px] md:px-[90px] md:py-[18px] bg-[#3030f8] rounded-2xl border-l hover:border-l-[6px] hover:border-r-0 border-r hover:border-t-0 border-t border-b-4 hover:border-b-8 border-black justify-center items-center gap-2.5 inline-flex">
            <div class="text-white text-base font-medium font-roboto leading-normal">
                Selanjutnya
            </div>
            <div class="w-4 h-4 relative">
                <img src="@/assets/img/cpm/icon-row-up.svg">
            </div>
        </button>
    </div>
</template>

<script setup>
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { jwtDecode } from "jwt-decode"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const router = useRouter()
const baseUrl = import.meta.env.VITE_API_BASE_URL

const loadingFetch = ref(false)

const questions = ref(null)
const currentType = ref('A')
const currentQuestionIndex = ref(1)
const totalQuestionsPerType = 12

const answers = ref([])

const timer = ref(0) //detik timer
const formattedTime = ref('00:00')
let timerInterval = null

const startTimer = () => {
  timerInterval = setInterval(() => {
    timer.value++
    formattedTime.value = new Date(timer.value * 1000).toISOString().substr(14, 5)
  }, 1000)
};

const stopTimer = () => {
  clearInterval(timerInterval)
};

const getQuestions = async () => {
    try {
        loadingFetch.value = true

        const token = Cookies.get('token')
        const response = await initAPI('get', `cpm/questions?perpage=1&type=${currentType.value}&page=${currentQuestionIndex.value}`, null, token)
      
        questions.value = response.data.data[0]
        // console.log(`questions`, response.data)
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data pertanyaan',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                router.go()
            }
        })
    } finally {
        loadingFetch.value = false
    }
};

const selectedAnswer = ref(null)
const selectAnswer = (answer) => {
    selectedAnswer.value = answer
}

const submitAnswers = async () => {
    stopTimer()
    
    const token = Cookies.get('token')
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id
    const time = formattedTime.value

    const formData = new FormData()
    formData.append('user_id', userId)
    formData.append('time', time)
    formData.append('answers', answers.value)

    try {
        const token = Cookies.get('token');
        // Assuming you have an endpoint to submit answers
        // const response = await initAPI('post', 'cpm/submit-answers', { /* your answer payload here */ }, token);
        
        Swal.fire({
            icon: 'success',
            title: 'Jawaban Dikirim',
            text: 'Selamat kamu telah selesai melakukan Tes CPM!',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
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
            text: 'Terjadi error saat mengirim jawaban',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        }).then((result) => {
            if (result.isConfirmed) {
                router.go()
            }
        })
    }
};

const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestionsPerType) {
    // pindah pertanyaan dengan type yg sama
    currentQuestionIndex.value++;
    answers.value.push(selectedAnswer.value)
    selectedAnswer.value = null
    getQuestions();
  } else {
    // pindah type atau submit
    switch (currentType.value) {
      case 'A':
        currentType.value = 'AB'
        break;
      case 'AB':
        currentType.value = 'B'
        break;
      case 'B':
        submitAnswers()
        return
    }
    currentQuestionIndex.value = 1
    getQuestions()
  }
};

onMounted(() => {
    getQuestions()
    startTimer()
})

onUnmounted(() => {
  stopTimer()
});

// onBeforeRouteLeave((to, from, next) => {
//     Swal.fire({
//         icon: 'question',
//         title: 'Keluar dari halaman?',
//         text: 'Seluruh proses test kamu tidak akan tersimpan ketika keluar halaman.',
//         showConfirmButton: true,
//         showCancelButton: true,
//         confirmButtonColor: "#3030f8",
//         confirmButtonText: "Keluar",
//         cancelButtonColor: "#3b3f5c",
//         cancelButtonText: "Batal",
//     }).then((result) => {
//         if (result.isConfirmed) {
//             next()
//         }
//     })
// })

</script>

<style scoped>
.skeleton {
  background: linear-gradient(100deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>