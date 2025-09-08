<template>
    <div class="space-y-6 relative">
        <div>
            <div class="w-full flex justify-between items-center">
                <div>
                    <p class="text-sm md:text-base font-medium text-primary transition-all duration-500"
                        :class="showTimer ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'" v-if="showTimer">
                        {{ formattedTime }}</p>
                </div>
                <div class="transform transition-all duration-300 hover:scale-110">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    </svg>
                </div>
            </div>

            <div v-if="!showQuestions" class="w-full grid grid-cols-5 gap-4 transition-all duration-700 ease-in-out">
                <div class="relative" v-for="(step, index) in 5" :key="index">
                    <div class="w-full h-2 rounded-lg bg-[#EFEFEF] transition-all duration-300"></div>
                    <div class="absolute inset-0 h-2 rounded-lg bg-primary transition-all duration-700 ease-in-out transform origin-left"
                        :class="{ 'w-full scale-x-100': currentStep > step, 'w-full scale-x-100': currentStep === step, 'w-0 scale-x-0': currentStep < step }">
                    </div>
                </div>
            </div>

            <div v-if="showQuestions" class="relative w-full transition-all duration-700 ease-in-out">
                <div class="w-full h-2 rounded-lg bg-[#EFEFEF]"></div>
                <div class="absolute inset-0 h-2 rounded-lg bg-primary transition-all duration-1000 ease-out transform origin-left"
                    :style="`width: ${timerProgress}%`"></div>
            </div>
        </div>

        <transition name="slide-fade" mode="out-in">
            <div v-if="currentStep === 1 && !showQuestions" key="step1"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2 text-center">
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 6</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Soal {{ currentQuestionId }} - {{ totalQuestions }}
                    </p>
                </div>

                <div class="space-y-4 text-sm">
                    <h5 class="">Kolom ini terdiri atas angka-angka 1 sampai 9 dan 0. Untuk menunjukkan jawaban
                        suatu soal, maka pilihlah angka-angka yang terdapat di dalam
                        jawaban itu.
                    </h5>

                    <br />
                    <b>Siapkan Kertas Kosong Untuk Menghitung.</b>

                    <h3 class="font-bold">Cara Membatalkan atau Mengubah Jawaban</h3>
                    <p>Caranya, Kalau kamu salah pilih angka dan mau membatalkan atau mengubahnya, cukup
                        <span class="highlight">klik lagi angka yang sudah kamu pilih</span>. Angka tersebut
                        akan otomatis terhapus.
                    </p>

                    <h3>Contoh:</h3>
                    <ul class="list-decimal px-4">
                        <li>Kamu ingin menjawab "25". Kamu klik angka 2, lalu angka 5.</li>
                        <li>Ternyata jawaban yang benar adalah "27".</li>
                        <li>Kamu bisa <span class="highlight">klik lagi angka 5</span> untuk menghapusnya, lalu
                            <span class="highlight">klik angka 7</span>.
                        </li>
                        <li>Selesai!</li>
                    </ul>
                </div>
            </div>

            <div v-else-if="currentStep === 2 && !showQuestions" key="step2"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 6</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Contoh Soal</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">2 4 6 8 10 12 14 ?</h5>

                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="number in numbers" :key="number" @click="selectExampleAnswer(number)" :class="[
                            'text-center p-3 rounded-xl border cursor-pointer transition-all duration-500',
                            isExampleNumberSelected(number)
                                ? 'text-[#6464FA] border-[#6464FA] bg-[#E5E5FE]'
                                : 'border-[#A4A4A4] text-[#A4A4A4] hover:text-[#6464FA] hover:border-[#6464FA] hover:bg-[#E5E5FE]'
                        ]">
                            <p class="text-sm font-medium">{{ number }}</p>
                        </div>
                    </div>

                    <div v-if="exampleSelectedNumbers.length > 0" class="text-center">
                        <p class="text-sm text-[#6464FA]">Jawaban Kamu: {{ exampleSelectedNumbers.join('') }}</p>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 3 && !showQuestions" key="step3"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2 text-center">
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 6</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Jawaban Contoh Soal</p>
                </div>

                <div class="space-y-4 text-sm">
                    <p class="">Pada deret ini angka berikutnya selelau didapat jika angka di depannya ditambah dengan
                        2.
                        Maka jawabanya ialah 16</p>

                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="number in numbers" :key="number" :class="[
                            'text-center p-3 rounded-xl border transition-all duration-500',
                            (number === 1 || number === 6)
                                ? 'text-[#6464FA] border-[#6464FA] bg-[#E5E5FE]'
                                : 'border-[#A4A4A4] text-[#A4A4A4]'
                        ]">
                            <p class="text-sm font-medium">{{ number }}</p>
                        </div>
                    </div>

                    <div class="text-center">
                        <p class="text-sm text-[#6464FA]">Jawaban yang benar: 16</p>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 4 && !showQuestions" key="step4"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 5</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Contoh Soal</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">9 7 10 8 11 9 12 ?</h5>

                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="number in numbers" :key="number" @click="selectExampleAnswer2(number)" :class="[
                            'text-center p-3 rounded-xl border cursor-pointer transition-all duration-500',
                            isExampleNumberSelected2(number)
                                ? 'text-[#6464FA] border-[#6464FA] bg-[#E5E5FE]'
                                : 'border-[#A4A4A4] text-[#A4A4A4] hover:text-[#6464FA] hover:border-[#6464FA] hover:bg-[#E5E5FE]'
                        ]">
                            <p class="text-sm font-medium">{{ number }}</p>
                        </div>
                    </div>

                    <div v-if="exampleSelectedNumbers2.length > 0" class="text-center">
                        <p class="text-sm text-[#6464FA]">Jawaban Kamu: {{ exampleSelectedNumbers2.join('') }}</p>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 5 && !showQuestions" key="step5"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2 text-center">
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 5</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Jawaban Contoh Soal</p>
                </div>

                <div class="space-y-4 text-sm">
                    <p class="">Pada deret ini berganti-ganti harus dikurangi dengan 2 dan setelah itu ditambah dengan
                        3. Jawaban contoh ini ialah : 10, maka dari itu angka 1 dan 0 seharusnya yang dicoret.</p>

                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="number in numbers" :key="number" :class="[
                            'text-center p-3 rounded-xl border transition-all duration-500',
                            (number === 1 || number === 0)
                                ? 'text-[#6464FA] border-[#6464FA] bg-[#E5E5FE]'
                                : 'border-[#A4A4A4] text-[#A4A4A4]'
                        ]">
                            <p class="text-sm font-medium">{{ number }}</p>
                        </div>
                    </div>

                    <div class="text-center">
                        <p class="text-sm text-[#6464FA]">Jawaban yang benar: 10</p>
                    </div>
                </div>
            </div>

            <div v-else-if="showQuestions" key="questions"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <div class="w-full flex justify-between items-center">
                        <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 6</h6>
                        <svg @click="showInfoPopup = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            class="cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                            <path
                                d="M13.125 16.875C13.125 17.0975 13.059 17.315 12.9354 17.5C12.8118 17.685 12.6361 17.8292 12.4305 17.9144C12.225 17.9995 11.9988 18.0218 11.7805 17.9784C11.5623 17.935 11.3618 17.8278 11.2045 17.6705C11.0472 17.5132 10.94 17.3127 10.8966 17.0945C10.8532 16.8762 10.8755 16.65 10.9606 16.4445C11.0458 16.2389 11.19 16.0632 11.375 15.9396C11.56 15.816 11.7775 15.75 12 15.75C12.2984 15.75 12.5845 15.8685 12.7955 16.0795C13.0065 16.2905 13.125 16.5766 13.125 16.875ZM12 6.75C9.93188 6.75 8.25 8.26406 8.25 10.125V10.5C8.25 10.6989 8.32902 10.8897 8.46967 11.0303C8.61033 11.171 8.80109 11.25 9 11.25C9.19892 11.25 9.38968 11.171 9.53033 11.0303C9.67099 10.8897 9.75 10.6989 9.75 10.5V10.125C9.75 9.09375 10.7597 8.25 12 8.25C13.2403 8.25 14.25 9.09375 14.25 10.125C14.25 11.1562 13.2403 12 12 12C11.8011 12 11.6103 12.079 11.4697 12.2197C11.329 12.3603 11.25 12.5511 11.25 12.75V13.5C11.25 13.6989 11.329 13.8897 11.4697 14.0303C11.6103 14.171 11.8011 14.25 12 14.25C12.1989 14.25 12.3897 14.171 12.5303 14.0303C12.671 13.8897 12.75 13.6989 12.75 13.5V13.4325C14.46 13.1184 15.75 11.7544 15.75 10.125C15.75 8.26406 14.0681 6.75 12 6.75ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                fill="#FB3748" />
                        </svg>
                    </div>
                    <p class="text-sm text-[#9A9A9A] font-medium transition-all duration-300">Pertanyaan {{
                        currentQuestionId }} dari {{ totalQuestions }}</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">{{ currentQuestionData.question }}</h5>

                    <div class="grid grid-cols-5 gap-4">
                        <div v-for="number in numbers" :key="number" @click="selectAnswer(number)" :class="[
                            'text-center p-3 rounded-xl border cursor-pointer transition-all duration-500',
                            isNumberSelected(number)
                                ? 'text-[#6464FA] border-[#6464FA] bg-[#E5E5FE]'
                                : 'border-[#A4A4A4] text-[#A4A4A4] hover:text-[#6464FA] hover:border-[#6464FA] hover:bg-[#E5E5FE]'
                        ]">
                            <p class="text-sm font-medium">{{ number }}</p>
                        </div>
                    </div>

                    <div v-if="selectedNumbers.length > 0" class="text-center">
                        <p class="text-sm text-[#6464FA]">Jawaban Kamu: {{ textAnswer }}</p>
                    </div>
                </div>
            </div>
        </transition>

        <div
            class="fixed bottom-4 left-4 right-4 flex items-center gap-2 md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto">
            <div class="w-fit">
                <button @click="goBack" :disabled="isPrevDisabled" class="rounded-full flex justify-center items-center relative z-10 border-4 border-[#7474FB]
                               shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.5)]
                               transition-all duration-500 bg-primary w-14 h-14 transform active:scale-95"
                    :class="{ 'opacity-50 cursor-not-allowed hover:scale-100': isPrevDisabled }">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
                        class="transition-all duration-300">
                        <path
                            d="M19.9991 27.56C19.7457 27.56 19.4924 27.4667 19.2924 27.2667L10.5991 18.5734C9.18573 17.16 9.18573 14.84 10.5991 13.4267L19.2924 4.73336C19.6791 4.34669 20.3191 4.34669 20.7057 4.73336C21.0924 5.12003 21.0924 5.76003 20.7057 6.14669L12.0124 14.84C11.3724 15.48 11.3724 16.52 12.0124 17.16L20.7057 25.8534C21.0924 26.24 21.0924 26.88 20.7057 27.2667C20.5057 27.4534 20.2524 27.56 19.9991 27.56Z"
                            :fill="isPrevDisabled ? '#9A9A9A' : 'white'" />
                    </svg>
                </button>
            </div>
            <button @click="goNext" :disabled="isNextDisabled" class="w-full bg-primary text-white border-[#7474FB] text-base rounded-full py-3 border-4 text-center font-sora 
                           shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]
                           transition-all duration-500 transform active:scale-95 relative overflow-hidden"
                :class="{ 'opacity-50 cursor-not-allowed hover:scale-100': isNextDisabled }">
                <transition name="button-text" mode="out-in">
                    <span :key="buttonText" class="relative z-10">{{ buttonText }}</span>
                </transition>
            </button>
        </div>

        <BaseModal v-model="showInfoPopup" title="Petunjuk Soal" :show-header="true" icon="info">
            <p class="text-justify text-sm text-gray-600 mb-4">
                Kolom ini terdiri atas angka-angka 1 sampai 9 dan 0. Untuk menunjukkan jawaban
                suatu soal, maka pilihlah angka-angka yang terdapat di dalam jawaban itu.
                Keurutan angka jawaban tidak perlu dihiraukan.
            </p>
            <button @click="showInfoPopup = false"
                class="w-full bg-primary text-white py-2 rounded-full transition-all duration-300 hover:bg-primary-light">
                Mengerti
            </button>
        </BaseModal>

        <BaseModal v-model="showTimeUpModal" title="Waktu Habis!"
            message="Waktu pengerjaan tes telah berakhir. Jawaban yang belum terjawab akan diisi otomatis."
            confirm-text="OK" icon="time" @confirm="handleTimeUpConfirm" />

        <BaseModal v-model="showCompletionModal" title="Selamat!" message="Semua soal telah berhasil terjawab."
            confirm-text="Selesai" icon="success" @confirm="handleCompletionConfirm" />

        <BaseModal v-model="isLoading" :close-on-backdrop="false">
            <div class="flex flex-col items-center">
                <svg class="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                </svg>
                <p class="mt-2 text-sm text-gray-600">Memuat soal...</p>
            </div>
        </BaseModal>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed, onUnmounted, onMounted, watch } from 'vue'
import initAPI from '../../../../../../api/api'
import Cookies from 'js-cookie'
import BaseModal from './BaseModal.vue'

const props = defineProps({
    selectedAnswer: {
        type: String,
        default: null
    }
})

const emit = defineEmits(['answer-selected', 'test-complete'])

const savedTestState = JSON.parse(localStorage.getItem('zahlenTestState') || '{}')
const currentStep = ref(savedTestState.currentStep || 1)
const showQuestions = ref(savedTestState.showQuestions || false)
const exampleAnswer = ref(null)
const timer = ref(savedTestState.remainingTime || 600)
const timerInterval = ref(null)
const showTimer = ref(showQuestions.value)
const showInfoPopup = ref(false)
const showTimeUpModal = ref(false)
const showCompletionModal = ref(false)
const isLoading = ref(true)

const currentQuestionIndex = ref(parseInt(localStorage.getItem('zahlenCurrentQuestion')) || 0)
const questionsData = ref([])
const savedAnswers = ref(JSON.parse(localStorage.getItem('zahlenAnswers')) || {})
const selectedNumbers = ref([])
const textAnswer = ref('')
const exampleSelectedNumbers = ref([])
const exampleSelectedNumbers2 = ref([])

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
const token = Cookies.get('token')

const totalQuestions = computed(() => {
    if (questionsData.value.length === 0) return 0
    const lastQuestion = questionsData.value[questionsData.value.length - 1]
    return lastQuestion.id
})

const currentQuestionId = computed(() => {
    return questionsData.value[currentQuestionIndex.value]?.id || 0
})

const saveTestState = () => {
    const testState = {
        currentStep: currentStep.value,
        showQuestions: showQuestions.value,
        remainingTime: timer.value
    }
    localStorage.setItem('zahlenTestState', JSON.stringify(testState))
}

const fetchQuestions = async () => {
    try {
        isLoading.value = true
        const response = await initAPI('GET', 'ist/questions?type=ZR', null, token)

        if (response.data && response.data.data) {
            questionsData.value = response.data.data.map(item => {
                let parsedQuestion = item.questions;
                try {
                    parsedQuestion = JSON.parse(item.questions);
                } catch (e) {
                    console.error('Error parsing questions:', e);
                }

                const questionDisplay = Array.isArray(parsedQuestion)
                    ? parsedQuestion.join(' ')
                    : item.questions.replace(/[\[\]"]/g, '').replace(/,/g, ' ');

                return {
                    id: item.id,
                    question: questionDisplay,
                    correctOptions: item.choices
                        .filter(choice => choice.correct === "1")
                        .map(choice => choice.choice),
                    options: item.choices.map((choice, index) => ({
                        value: String.fromCharCode(65 + index),
                        label: `${String.fromCharCode(65 + index)}. ${choice.choice}`,
                        correct: choice.correct
                    }))
                }
            })

            const currentQuestionId = questionsData.value[currentQuestionIndex.value]?.id
            if (savedAnswers.value[currentQuestionId]) {
                const savedAnswer = savedAnswers.value[currentQuestionId]
                selectedNumbers.value = savedAnswer.split('').map(Number).filter(n => !isNaN(n))
                textAnswer.value = savedAnswer
                emit('answer-selected', savedAnswer)
            }
        }
    } catch (error) {
        console.error('Error fetching questions:', error)
    } finally {
        isLoading.value = false
    }
}

const checkAnswer = (userAnswer) => {
    const currentQuestionId = questionsData.value[currentQuestionIndex.value]
    const correctAnswers = currentQuestionId.correctOptions

    const userAnswers = userAnswer.split('').map(num => parseInt(num))
    const sortedUserAnswers = [...userAnswers].sort()
    const sortedCorrectAnswers = [...correctAnswers].map(num => parseInt(num)).sort()

    if (sortedUserAnswers.length !== sortedCorrectAnswers.length) return "0"

    for (let i = 0; i < sortedUserAnswers.length; i++) {
        if (sortedUserAnswers[i] !== sortedCorrectAnswers[i]) return "0"
    }

    return "1"
}

const setUnansweredToZero = () => {
    questionsData.value.forEach(question => {
        if (!savedAnswers.value[question.id]) {
            savedAnswers.value[question.id] = {
                userAnswer: '0',
                score: '0'
            }
        }
    })

    localStorage.setItem('zahlenAnswers', JSON.stringify(savedAnswers.value))
    localStorage.setItem('zahlenCompleted', 'true')
}

watch(timer, (newValue) => {
    if (newValue === 0) {
        setUnansweredToZero()
        showTimeUpModal.value = true
        stopTimer()
    }
})

const isPrevDisabled = computed(() => {
    if (showQuestions.value) {
        return currentQuestionIndex.value === 0
    }
    return currentStep.value === 1
})

const isNextDisabled = computed(() => {
    if (showQuestions.value) {
        return selectedNumbers.value.length === 0
    } else if (currentStep.value === 2) {
        return exampleSelectedNumbers.value.length === 0
    } else if (currentStep.value === 4) {
        return exampleSelectedNumbers2.value.length === 0
    }
    return false
})

const timerProgress = computed(() => {
    const totalTime = 600
    return ((totalTime - timer.value) / totalTime) * 100
})

const buttonText = computed(() => {
    if (showQuestions.value) {
        const currentIndex = questionsData.value.findIndex(q => q.id === currentQuestionId.value);
        const isLastQuestion = currentIndex === questionsData.value.length - 1;

        return isLastQuestion ? 'Selesai' : 'Selanjutnya';
    }
    return currentStep.value === 5 ? 'Mulai Tes' : 'Selanjutnya'
})

const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
    const seconds = timer.value % 60
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} Min`
})

const currentQuestionData = computed(() => {
    return questionsData.value[currentQuestionIndex.value] || {}
})

const isExampleNumberSelected = (number) => {
    return exampleSelectedNumbers.value.includes(number)
}

const isExampleNumberSelected2 = (number) => {
    return exampleSelectedNumbers2.value.includes(number)
}

const isNumberSelected = (number) => {
    return selectedNumbers.value.includes(number)
}

const selectExampleAnswer = (number) => {
    const index = exampleSelectedNumbers.value.indexOf(number)

    if (index > -1) {
        exampleSelectedNumbers.value.splice(index, 1)
    } else {
        if (exampleSelectedNumbers.value.length < 3) {
            exampleSelectedNumbers.value.push(number)
        } else {
            exampleSelectedNumbers.value.shift()
            exampleSelectedNumbers.value.push(number)
        }
    }
}

const selectExampleAnswer2 = (number) => {
    const index = exampleSelectedNumbers2.value.indexOf(number)

    if (index > -1) {
        exampleSelectedNumbers2.value.splice(index, 1)
    } else {
        if (exampleSelectedNumbers2.value.length < 3) {
            exampleSelectedNumbers2.value.push(number)
        } else {
            exampleSelectedNumbers2.value.shift()
            exampleSelectedNumbers2.value.push(number)
        }
    }
}

const selectAnswer = (number) => {
    const index = selectedNumbers.value.indexOf(number)

    if (index > -1) {
        selectedNumbers.value.splice(index, 1)
    } else {
        if (selectedNumbers.value.length < 3) {
            selectedNumbers.value.push(number)
        } else {
            selectedNumbers.value.shift()
            selectedNumbers.value.push(number)
        }
    }

    textAnswer.value = selectedNumbers.value.join('')

    const currentQuestionId = questionsData.value[currentQuestionIndex.value]?.id
    if (currentQuestionId) {
        const userAnswer = selectedNumbers.value.join('')
        const score = checkAnswer(userAnswer)

        savedAnswers.value[currentQuestionId] = {
            userAnswer: userAnswer,
            score: score
        }

        localStorage.setItem('zahlenAnswers', JSON.stringify(savedAnswers.value))
    }

    emit('answer-selected', textAnswer.value)
}

const goNext = () => {
    if (isNextDisabled.value) return

    if (showQuestions.value) {
        if (currentQuestionIndex.value < questionsData.value.length - 1) {
            currentQuestionIndex.value++
            localStorage.setItem('zahlenCurrentQuestion', currentQuestionIndex.value.toString())
            saveTestState()

            const nextQuestionId = questionsData.value[currentQuestionIndex.value]?.id
            if (savedAnswers.value[nextQuestionId]) {
                const savedAnswer = savedAnswers.value[nextQuestionId].userAnswer
                selectedNumbers.value = savedAnswer.split('').map(Number).filter(n => !isNaN(n))
                textAnswer.value = savedAnswer
                emit('answer-selected', savedAnswer)
            } else {
                selectedNumbers.value = []
                textAnswer.value = ''
                emit('answer-selected', null)
            }
        } else {
            showCompletionModal.value = true
            localStorage.setItem('zahlenCompleted', 'true')
        }
    } else {
        if (currentStep.value < 5) {
            currentStep.value++
        } else {
            showQuestions.value = true
            showTimer.value = true
            startTimer()
        }
        saveTestState()
    }
}

const goBack = () => {
    if (isPrevDisabled.value) return

    if (showQuestions.value) {
        if (currentQuestionIndex.value > 0) {
            currentQuestionIndex.value--
            localStorage.setItem('zahlenCurrentQuestion', currentQuestionIndex.value.toString())
            saveTestState()

            const prevQuestionId = questionsData.value[currentQuestionIndex.value]?.id
            if (savedAnswers.value[prevQuestionId]) {
                const savedAnswer = savedAnswers.value[prevQuestionId].userAnswer
                selectedNumbers.value = savedAnswer.split('').map(Number).filter(n => !isNaN(n))
                textAnswer.value = savedAnswer
                emit('answer-selected', savedAnswer)
            } else {
                selectedNumbers.value = []
                textAnswer.value = ''
                emit('answer-selected', null)
            }
        }
    } else if (currentStep.value > 1) {
        currentStep.value--
        saveTestState()
    }
}

const startTimer = () => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
    }

    timerInterval.value = setInterval(() => {
        if (timer.value > 0) {
            timer.value--
            saveTestState()
        } else {
            stopTimer()
        }
    }, 1000)
}

const stopTimer = () => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value)
        timerInterval.value = null
    }
}

const handleTimeUpConfirm = () => {
    localStorage.removeItem('zahlenCurrentQuestion')
    localStorage.removeItem('zahlenTestState')
    showTimeUpModal.value = false
    emit('test-complete')
}

const handleCompletionConfirm = () => {
    localStorage.removeItem('zahlenCurrentQuestion')
    localStorage.removeItem('zahlenTestState')
    showCompletionModal.value = false
    emit('test-complete')
}

onMounted(() => {
    fetchQuestions()

    if (showQuestions.value) {
        startTimer()
    }
})

onUnmounted(() => {
    stopTimer()
})

watch(() => localStorage.getItem('zahlenCompleted'), (completed) => {
    if (completed === 'true') {
        localStorage.removeItem('zahlenTestState')
        localStorage.removeItem('zahlenCurrentQuestion')
    }
})
</script>