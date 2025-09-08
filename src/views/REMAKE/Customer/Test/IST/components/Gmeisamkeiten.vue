<template>
    <div class="space-y-6 relative">
        <div>
            <div class="w-full flex justify-between items-center">
                <div>
                    <p class="text-sm md:text-base font-medium text-primary transition-all duration-500"
                        :class="showTimer ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'" v-if="showTimer">
                        {{ formattedTime }}</p>
                </div>
                <div class="transform transition-all duration-300 hover:scale-110 cursor-pointer"
                    @click="showInfoPopup = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M19.5039 12.75C19.5039 11.2666 19.064 9.81659 18.2399 8.58322C17.4158 7.34985 16.2445 6.38856 14.874 5.8209C13.5036 5.25325 11.9956 5.10472 10.5407 5.39411C9.08588 5.6835 7.74951 6.39781 6.70061 7.4467C5.65172 8.49559 4.93741 9.83197 4.64803 11.2868C4.35864 12.7417 4.50716 14.2497 5.07482 15.6201C5.64248 16.9906 6.60377 18.1619 7.83714 18.986C9.07051 19.8101 10.5206 20.25 12.0039 20.25C13.993 20.25 15.9007 19.4598 17.3072 18.0533C18.7137 16.6468 19.5039 14.7391 19.5039 12.75ZM6.66251 4.27547C6.26894 3.93868 5.76863 3.75248 5.25063 3.75L5.11985 3.75375C3.9222 3.82594 3.00063 4.875 3.00391 6.14062C3.00391 6.75984 3.22235 7.04859 3.51391 7.41703C3.53203 7.44071 3.5549 7.46032 3.58106 7.47461C3.60722 7.4889 3.63608 7.49755 3.66579 7.5H3.70704C3.73027 7.49958 3.75309 7.49383 3.77373 7.48318C3.79438 7.47253 3.8123 7.45728 3.8261 7.43859L6.6747 4.64062C6.69902 4.61603 6.71802 4.58669 6.73052 4.55443C6.74302 4.52217 6.74875 4.48769 6.74735 4.45312C6.74617 4.41927 6.73803 4.38603 6.72343 4.35546C6.70883 4.3249 6.6881 4.29766 6.66251 4.27547ZM17.3388 4.27547C17.7323 3.93868 18.2326 3.75248 18.7506 3.75L18.8814 3.75375C20.0791 3.82594 21.0006 4.875 20.9974 6.14062C20.9974 6.75984 20.7789 7.04859 20.4874 7.41703C20.4692 7.44062 20.4463 7.46015 20.4201 7.47435C20.394 7.48856 20.3651 7.49714 20.3355 7.49953H20.2942C20.271 7.49912 20.2482 7.49336 20.2275 7.48271C20.2069 7.47206 20.189 7.45681 20.1752 7.43812L17.3266 4.64062C17.3022 4.61603 17.2832 4.58669 17.2707 4.55443C17.2582 4.52217 17.2525 4.48769 17.2539 4.45312C17.2551 4.41927 17.2632 4.38603 17.2778 4.35546C17.2924 4.3249 17.3132 4.29766 17.3388 4.27547Z"
                            stroke="#6464FA" stroke-miterlimit="10" />
                        <path d="M12.0039 7.5V12.75H8.25391M19.5039 20.25L17.6289 18.375M4.50391 20.25L6.37891 18.375"
                            stroke="#6464FA" stroke-linecap="round" stroke-linejoin="round" />
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
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 4</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Soal 61 - 76</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-sm">Ditentukan dua kata.
                        Carilah satu perkataan yang meliputi pengertian kedua kata tadi.
                    </h5>
                </div>
            </div>

            <div v-else-if="currentStep === 2 && !showQuestions" key="step2"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 4</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Contoh Soal</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">Ayam : Itik</h5>

                    <div class="flex flex-col gap-2">
                        <label for="input-example" class="text-[10px] font-medium">Masukkan Jawaban</label>
                        <textarea id="input-example" v-model="exampleAnswer" @input="handleExampleInput"
                            class="p-3 text-base bg-[#E5E5FE] border border-[#CBCBFD] rounded-xl text-primary min-h-[100px]"
                            placeholder="Masukkan jawaban Anda..."></textarea>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 3 && !showQuestions" key="step3"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2 text-center">
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 4</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Jawaban Contoh Soal</p>
                </div>

                <div class="space-y-4 text-sm">
                    <p class="">Perkataan "unggas" dapat meliputi pengertian kedua kata itu.
                        Maka jawabannya ialah "unggas"</p>
                    <div
                        class="p-3 rounded-xl border cursor-pointer transition-all duration-500 text-[#6464FA] border-[#6464FA] bg-[#E5E5FE] transform hover:scale-105 animate-bounce-gentle">
                        <p class="text-sm font-medium">Unggas</p>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 4 && !showQuestions" key="step4"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 4</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Contoh Soal</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">Gaun : Celana</h5>

                    <div class="flex flex-col gap-2">
                        <label for="input-example2" class="text-[10px] font-medium">Masukkan Jawaban</label>
                        <textarea id="input-example2" v-model="exampleAnswer2" @input="handleExampleInput2"
                            class="p-3 text-base bg-[#E5E5FE] border border-[#CBCBFD] rounded-xl text-primary min-h-[100px]"
                            placeholder="Masukkan jawaban Anda..."></textarea>
                    </div>
                </div>
            </div>

            <div v-else-if="currentStep === 5 && !showQuestions" key="step5"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2 text-center">
                    <h6 class="text-base text-black font-semibold">Petunjuk & Contoh Soal Kelompok Sub Tes 4</h6>
                    <p class="text-sm text-[#9A9A9A] font-medium">Jawaban Contoh Soal</p>
                </div>

                <div class="space-y-4 text-sm">
                    <p class="">Pada contoh ini jawabannya ialah "pakaian" maka "pakaian" yang seharusnya ditulis. Carilah selalu perkataan yang tepat yang dapat meliputi pengertian kedua kata itu.</p>
                    <div
                        class="p-3 rounded-xl border cursor-pointer transition-all duration-500 text-[#6464FA] border-[#6464FA] bg-[#E5E5FE] transform hover:scale-105 animate-bounce-gentle">
                        <p class="text-sm font-medium">Pakaian</p>
                    </div>
                </div>
            </div>

            <div v-else-if="showQuestions" key="questions"
                class="w-full p-6 bg-white rounded-2xl space-y-4 shadow-xl shadow-black/5 transform transition-all duration-500 hover:shadow-2xl">
                <div class="space-y-2">
                    <div class="w-full flex justify-between items-center">
                        <h6 class="text-sm text-black font-semibold">Kelompok Soal Sub Tes 4</h6>
                        <svg @click="showInfoPopup = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none"
                            class="cursor-pointer transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                            <path
                                d="M13.125 16.875C13.125 17.0975 13.059 17.315 12.9354 17.5C12.8118 17.685 12.6361 17.8292 12.4305 17.9144C12.225 17.9995 11.9988 18.0218 11.7805 17.9784C11.5623 17.935 11.3618 17.8278 11.2045 17.6705C11.0472 17.5132 10.94 17.3127 10.8966 17.0945C10.8532 16.8762 10.8755 16.65 10.9606 16.4445C11.0458 16.2389 11.19 16.0632 11.375 15.9396C11.56 15.816 11.7775 15.75 12 15.75C12.2984 15.75 12.5845 15.8685 12.7955 16.0795C13.0065 16.2905 13.125 16.5766 13.125 16.875ZM12 6.75C9.93188 6.75 8.25 8.26406 8.25 10.125V10.5C8.25 10.6989 8.32902 10.8897 8.46967 11.0303C8.61033 11.171 8.80109 11.25 9 11.25C9.19892 11.25 9.38968 11.171 9.53033 11.0303C9.67099 10.8897 9.75 10.6989 9.75 10.5V10.125C9.75 9.09375 10.7597 8.25 12 8.25C13.2403 8.25 14.25 9.09375 14.25 10.125C14.25 11.1562 13.2403 12 12 12C11.8011 12 11.6103 12.079 11.4697 12.2197C11.329 12.3603 11.25 12.5511 11.25 12.75V13.5C11.25 13.6989 11.329 13.8897 11.4697 14.0303C11.6103 14.171 11.8011 14.25 12 14.25C12.1989 14.25 12.3897 14.171 12.5303 14.0303C12.671 13.8897 12.75 13.6989 12.75 13.5V13.4325C14.46 13.1184 15.75 11.7544 15.75 10.125C15.75 8.26406 14.0681 6.75 12 6.75ZM21.75 12C21.75 13.9284 21.1782 15.8134 20.1068 17.4168C19.0355 19.0202 17.5127 20.2699 15.7312 21.0078C13.9496 21.7458 11.9892 21.9389 10.0979 21.5627C8.20656 21.1865 6.46928 20.2579 5.10571 18.8943C3.74215 17.5307 2.81355 15.7934 2.43735 13.9021C2.06114 12.0108 2.25422 10.0504 2.99218 8.26884C3.73013 6.48726 4.97982 4.96451 6.58319 3.89317C8.18657 2.82183 10.0716 2.25 12 2.25C14.585 2.25273 17.0634 3.28084 18.8913 5.10872C20.7192 6.93661 21.7473 9.41498 21.75 12ZM20.25 12C20.25 10.3683 19.7661 8.77325 18.8596 7.41655C17.9531 6.05984 16.6646 5.00242 15.1571 4.37799C13.6497 3.75357 11.9909 3.59019 10.3905 3.90852C8.79017 4.22685 7.32016 5.01259 6.16637 6.16637C5.01259 7.32015 4.22685 8.79016 3.90853 10.3905C3.5902 11.9908 3.75358 13.6496 4.378 15.1571C5.00242 16.6646 6.05984 17.9531 7.41655 18.8596C8.77326 19.7661 10.3683 20.25 12 20.25C14.1873 20.2475 16.2843 19.3775 17.8309 17.8309C19.3775 16.2843 20.2475 14.1873 20.25 12Z"
                                fill="#FB3748" />
                        </svg>
                    </div>
                    <p class="text-sm text-[#9A9A9A] font-medium transition-all duration-300">Pertanyaan {{
                        currentQuestion }} dari {{ totalQuestions }}</p>
                </div>

                <div class="space-y-4">
                    <h5 class="text-base font-semibold text-center">{{ currentQuestionData.question }}</h5>

                    <div class="flex flex-col gap-2">
                        <label for="input-answer" class="text-[10px] font-medium">Masukkan Jawaban</label>
                        <textarea id="input-answer" v-model="textAnswer" @input="handleInput"
                            class="p-3 text-base bg-[#E5E5FE] border border-[#CBCBFD] rounded-xl text-primary min-h-[100px]"
                            placeholder="Masukkan jawaban Anda..."></textarea>
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
                <div
                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000">
                </div>
            </button>
        </div>

        <!-- Modal Informasi -->
        <BaseModal v-model="showInfoPopup" title="Petunjuk Soal" icon="info" :show-close-button="true"
            :close-on-backdrop="true">
            <p class="text-justify text-sm text-gray-600 mb-4">
                Ditentukan dua kata.
                Carilah satu perkataan yang meliputi pengertian kedua kata tadi.
            </p>
            <button @click="showInfoPopup = false"
                class="w-full bg-primary text-white py-2 rounded-full transition-all duration-300 hover:bg-primary-light">
                Mengerti
            </button>
        </BaseModal>

        <!-- Modal Waktu Habis -->
        <BaseModal v-model="showTimeUpModal" title="Waktu Habis!" icon="time"
            message="Waktu pengerjaan tes telah berakhir. Jawaban yang belum terjawab akan diisi otomatis."
            confirm-text="OK" @confirm="handleTimeUpConfirm" />

        <!-- Modal Selesai -->
        <BaseModal v-model="showCompletionModal" title="Selamat!" icon="success"
            message="Semua soal telah berhasil terjawab." confirm-text="Selesai" @confirm="handleCompletionConfirm" />

        <!-- Modal Loading -->
        <BaseModal v-model="isLoading" :show-header="false" :show-close-button="false" :close-on-backdrop="false">
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
import Swal from 'sweetalert2'
import BaseModal from './BaseModal.vue'

const props = defineProps({
    answer: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['answer-changed', 'test-complete'])

const savedTestState = JSON.parse(localStorage.getItem('gmeisamkeitenTestState') || '{}')
const currentStep = ref(savedTestState.currentStep || 1)
const showQuestions = ref(savedTestState.showQuestions || false)
const exampleAnswer = ref('')
const exampleAnswer2 = ref('')
const timer = ref(savedTestState.remainingTime || 480)
const timerInterval = ref(null)
const showTimer = ref(showQuestions.value)
const showInfoPopup = ref(false)
const currentQuestion = ref(61)
const questionsData = ref([])
const isLoading = ref(true)
const textAnswer = ref('')
const showTimeUpModal = ref(false)
const showCompletionModal = ref(false)

const savedAnswers = ref(JSON.parse(localStorage.getItem('gmeisamkeitenAnswers')) || {})
const savedCurrentQuestion = ref(parseInt(localStorage.getItem('gmeisamkeitenCurrentQuestion')) || 61)

const token = Cookies.get('token')

const saveTestState = () => {
    const testState = {
        currentStep: currentStep.value,
        showQuestions: showQuestions.value,
        remainingTime: timer.value
    }
    localStorage.setItem('gmeisamkeitenTestState', JSON.stringify(testState))
}

const fetchQuestions = async () => {
    try {
        isLoading.value = true
        const response = await initAPI('GET', 'ist/questions?type=GE', null, token)

        if (response.data && response.data.data) {
            questionsData.value = response.data.data.map(item => ({
                id: item.id,
                question: item.questions,
                correctAnswer: item.correct_answer
            }))

            // Set currentQuestion ke ID pertama atau saved value
            const firstQuestionId = questionsData.value[0]?.id || 61
            currentQuestion.value = savedCurrentQuestion.value || firstQuestionId

            // Load jawaban yang tersimpan
            if (savedAnswers.value[currentQuestion.value]) {
                textAnswer.value = savedAnswers.value[currentQuestion.value]
                emit('answer-changed', textAnswer.value)
            }
        }
    } catch (error) {
        console.error('Error fetching questions:', error)
        Swal.fire({
            title: 'Error',
            text: 'Gagal memuat soal. Silakan refresh halaman.',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: '#6464FA'
        })
    } finally {
        isLoading.value = false
    }
}

watch(timer, (newValue) => {
    if (newValue === 0) {
        setUnansweredToEmpty()
        showTimeUpModal.value = true
        stopTimer()
    }
})

const setUnansweredToEmpty = () => {
    questionsData.value.forEach(question => {
        if (!savedAnswers.value[question.id]) {
            savedAnswers.value[question.id] = ''
        }
    })

    localStorage.setItem('gmeisamkeitenAnswers', JSON.stringify(savedAnswers.value))
    localStorage.setItem('gmeisamkeitenCompleted', 'true')
}

const handleTimeUpConfirm = () => {
    localStorage.removeItem('gmeisamkeitenCurrentQuestion')
    localStorage.removeItem('gmeisamkeitenTestState')
    showTimeUpModal.value = false
    emit('test-complete')
}

const handleCompletionConfirm = () => {
    localStorage.removeItem('gmeisamkeitenCurrentQuestion')
    localStorage.removeItem('gmeisamkeitenTestState')
    showCompletionModal.value = false
    localStorage.setItem('gmeisamkeitenCompleted', 'true')
    emit('test-complete')
}

const totalQuestions = computed(() => {
    if (questionsData.value.length === 0) return 76
    const lastQuestion = questionsData.value[questionsData.value.length - 1]
    return lastQuestion.id
})

const isPrevDisabled = computed(() => {
    if (showQuestions.value) {
        const currentIndex = questionsData.value.findIndex(q => q.id === currentQuestion.value)
        return currentIndex === 0
    }
    return currentStep.value === 1
})

const isNextDisabled = computed(() => {
    if (showQuestions.value) {
        return !textAnswer.value || textAnswer.value.trim() === ''
    } else if (currentStep.value === 2) {
        return !exampleAnswer.value || exampleAnswer.value.trim() === ''
    } else if (currentStep.value === 4) {
        return !exampleAnswer2.value || exampleAnswer2.value.trim() === ''
    }
    return false
})

const timerProgress = computed(() => {
    const totalTime = 480
    return ((totalTime - timer.value) / totalTime) * 100
})

const buttonText = computed(() => {
    if (showQuestions.value) {
        const currentIndex = questionsData.value.findIndex(q => q.id === currentQuestion.value);
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
    return questionsData.value.find(q => q.id === currentQuestion.value) || {}
})

const handleInput = () => {
    emit('answer-changed', textAnswer.value)
    savedAnswers.value[currentQuestion.value] = textAnswer.value
    localStorage.setItem('gmeisamkeitenAnswers', JSON.stringify(savedAnswers.value))
}

const handleExampleInput = () => {
    // Hanya untuk contoh, tidak perlu disimpan
}

const handleExampleInput2 = () => {
    // Hanya untuk contoh, tidak perlu disimpan
}

const goNext = () => {
    if (!showQuestions.value) {
        if (currentStep.value === 2 && (!exampleAnswer.value || exampleAnswer.value.trim() === '')) {
            return
        }
        if (currentStep.value === 4 && (!exampleAnswer2.value || exampleAnswer2.value.trim() === '')) {
            return
        }
    }

    if (showQuestions.value) {
        const currentIndex = questionsData.value.findIndex(q => q.id === currentQuestion.value)

        if (currentIndex < questionsData.value.length - 1) {
            currentQuestion.value = questionsData.value[currentIndex + 1].id

            localStorage.setItem('gmeisamkeitenCurrentQuestion', currentQuestion.value.toString())
            saveTestState()

            // Load jawaban yang tersimpan untuk pertanyaan berikutnya
            if (savedAnswers.value[currentQuestion.value]) {
                textAnswer.value = savedAnswers.value[currentQuestion.value]
                emit('answer-changed', textAnswer.value)
            } else {
                textAnswer.value = ''
                emit('answer-changed', '')
            }
        } else {
            showCompletionModal.value = true
        }
    } else {
        if (currentStep.value < 5) {
            currentStep.value++
        } else {
            showQuestions.value = true
            showTimer.value = true
            currentQuestion.value = questionsData.value[0]?.id || 61
            startTimer()
        }
        saveTestState()
    }
}

const goBack = () => {
    if (showQuestions.value) {
        const currentIndex = questionsData.value.findIndex(q => q.id === currentQuestion.value)

        if (currentIndex > 0) {
            currentQuestion.value = questionsData.value[currentIndex - 1].id

            localStorage.setItem('gmeisamkeitenCurrentQuestion', currentQuestion.value.toString())
            saveTestState()

            // Load jawaban yang tersimpan untuk pertanyaan sebelumnya
            if (savedAnswers.value[currentQuestion.value]) {
                textAnswer.value = savedAnswers.value[currentQuestion.value]
                emit('answer-changed', textAnswer.value)
            } else {
                textAnswer.value = ''
                emit('answer-changed', '')
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

onMounted(() => {
    fetchQuestions()

    if (showQuestions.value) {
        startTimer()
    }

    if (props.answer) {
        textAnswer.value = props.answer
    }
})

onUnmounted(() => {
    stopTimer()
})

watch(() => localStorage.getItem('gmeisamkeitenCompleted'), (completed) => {
    if (completed === 'true') {
        localStorage.removeItem('gmeisamkeitenTestState')
    }
})
</script>