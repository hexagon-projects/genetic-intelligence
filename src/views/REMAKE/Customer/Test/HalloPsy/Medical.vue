<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import { loadFromStorage, saveToStorage, clearStorage } from '../../../../../utils/storage';

const STORAGE_KEY = 'medicalAnswers';

const router = useRouter();
const route = useRoute();
const store = useStore()

const questions = ref([]);
const answers = ref({});
const isLoading = ref(false);
const showSuccessModal = ref(false);
const showErrorModal = ref(false);
const modalMessage = ref('');

const fetchQuestions = async () => {
  try {
    isLoading.value = true;
    const token = await Cookies.get('token');
    const response = await initAPI('get', 'user/hallopsy-questions/medical', null, token);

    questions.value = response.data.data.medical;
    questions.value.forEach(q => {
      answers.value[q.id] = '';
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    modalMessage.value = 'Failed to load medical questions. Please try again.';
    showErrorModal.value = true;
  } finally {
    isLoading.value = false;
  }
};

const validateAnswers = () => {
  const requiredQuestions = questions.value.filter(q => q.is_required);
  const unansweredRequired = requiredQuestions.filter(q => !answers.value[q.id] || answers.value[q.id].trim() === '');

  if (unansweredRequired.length > 0) {
    modalMessage.value = 'Harap isi semua kolom yang diperlukan sebelum melanjutkan.';
    showErrorModal.value = true;
    return false;
  }
  return true;
};

const storedAnswers = loadFromStorage(STORAGE_KEY);
if (storedAnswers) {
  answers.value = storedAnswers;
}

watch(answers, (newAnswers) => {
  saveToStorage(STORAGE_KEY, newAnswers);
}, { deep: true });

const saveAnswers = () => {
  if (!validateAnswers()) {
    return;
  }

  try {
    store.commit('SET_MEDICAL_ANSWERS', answers.value);
    clearStorage(STORAGE_KEY);
    modalMessage.value = 'Medical information saved successfully!';
    showSuccessModal.value = true;
    
    setTimeout(() => {
      router.push('/hallopsy/reservasi/detail/counseling');
    }, 1500);
  } catch (error) {
    console.error('Error saving answers:', error);
    modalMessage.value = 'Failed to save medical information. Please try again.';
    showErrorModal.value = true;
  }
}

const closeModal = () => {
  showSuccessModal.value = false;
  showErrorModal.value = false;

  if (showSuccessModal.value === false && modalMessage.value.includes('successfully')) {
    router.push('/hallopsy/reservasi/detail/counseling');
  }
};

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  fetchQuestions();
});
</script>

<template>
  <div class="w-full min-h-screen h-full bg-[#F0F7FD]">
    <div
      class="p-4 lg:px-20 lg:py-10 space-y-6 md:space-y-8 lg:space-y-12 bg-[#F0F7FD] font-sora pb-20 md:pb-0 md:max-w-[60%] lg:max-w-[40%] mx-auto">
      <div class="flex justify-between items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="18" viewBox="0 0 9 18" fill="none" @click="goBack"
          class="cursor-pointer">
          <path
            d="M7.46967 0.46967C7.76256 0.176777 8.23744 0.176777 8.53033 0.46967C8.82322 0.762563 8.82322 1.23744 8.53033 1.53033L3.35876 6.70191C2.08955 7.97112 2.08955 10.0289 3.35876 11.2981L8.53033 16.4697C8.82322 16.7626 8.82322 17.2374 8.53033 17.5303C8.23744 17.8232 7.76256 17.8232 7.46967 17.5303L2.2981 12.3588C0.443109 10.5038 0.443106 7.49624 2.29809 5.64125L7.46967 0.46967Z"
            fill="#363538" />
        </svg>
        <h1 class="text-xl md:text-2xl font-bold">Medical Information</h1>
        <div></div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && questions.length === 0" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>

      <!-- Questions -->
      <div v-for="question in questions" :key="question.id" class="space-y-4">
        <p class="text-base font-medium text-gray-800">{{ question.question }}
          <span v-if="question.is_required" class="text-red-500">*</span>
        </p>

        <div v-if="question.options" class="space-y-3">
          <div v-for="option in question.options" :key="option.value" class="relative">
            <input :id="`q${question.id}_${option.value}`" :name="`question_${question.id}`" :value="option.value"
              v-model="answers[question.id]" type="radio" class="peer sr-only" :required="question.is_required">
            <label :for="`q${question.id}_${option.value}`"
              class="flex items-center p-4 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700">
              <div class="relative flex items-center justify-center w-5 h-5 mr-3">
                <div
                  class="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 transition-colors duration-200">
                </div>
                <div
                  class="absolute w-3 h-3 bg-blue-500 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200">
                </div>
              </div>
              <span class="text-sm font-medium select-none">{{ option.label }}</span>
            </label>
          </div>
        </div>

        <textarea v-else :id="`question_${question.id}`" :placeholder="question.placeholder || 'Your answer...'"
          :rows="question.rows || 3" v-model="answers[question.id]"
          class="w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400 text-sm leading-relaxed"
          :required="question.is_required"></textarea>
      </div>

      <!-- Button -->
      <div class="hidden md:flex items-center gap-4">
        <button @click="goBack"
          class="w-1/2 py-3 bg-[#F0F7FD] rounded-full text-primary font-bold text-lg border border-primary hover:bg-primary hover:text-white transition-colors duration-200">
          Back
        </button>
        <button @click="saveAnswers" :disabled="isLoading"
          class="w-1/2 py-3 bg-primary rounded-full text-white font-bold text-lg border border-[#F0F7FD] hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50">
          <span v-if="isLoading">Proses...</span>
          <span v-else>Next</span>
        </button>
      </div>

      <div class="fixed bottom-4 left-4 right-4 flex items-center gap-4 md:hidden">
        <button @click="goBack"
          class="w-1/2 py-3 bg-[#F0F7FD] rounded-full text-primary font-bold text-lg border border-primary hover:bg-primary hover:text-white transition-colors duration-200">
          Back
        </button>
        <button @click="saveAnswers" :disabled="isLoading"
          class="w-1/2 py-3 bg-primary rounded-full text-white font-bold text-lg border border-[#F0F7FD] hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50">
          <span v-if="isLoading">Proses...</span>
          <span v-else>Next</span>
        </button>
      </div>
    </div>

    <!-- Unified Modal for Success and Error -->
    <div v-if="showSuccessModal || showErrorModal"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 modal-overlay"
      @click="closeModal">
      <div
        class="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 modal-content"
        @click.stop>
        <!-- Animated Background Gradient -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#CBCBFD]/10 rounded-3xl">
        </div>

        <!-- Content Container -->
        <div class="relative z-10">
          <!-- Icon Container with Animation -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <!-- Animated Ring Background -->
              <div class="absolute inset-0 rounded-full animate-pulse"
                :class="showSuccessModal ? 'bg-green-100' : 'bg-red-100'"></div>

              <!-- Main Icon Circle -->
              <div class="relative w-20 h-20 rounded-full flex items-center justify-center transform scale-0 icon-scale"
                :class="showSuccessModal ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'">

                <!-- Success Icon -->
                <svg v-if="showSuccessModal" xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-white transform rotate-0 icon-rotate" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>

                <!-- Error Icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg"
                  class="h-10 w-10 text-white transform rotate-0 icon-rotate" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              <!-- Floating Particles -->
              <div class="absolute -top-2 -right-2 w-3 h-3 rounded-full particle-1"
                :class="showSuccessModal ? 'bg-green-300' : 'bg-red-300'"></div>
              <div class="absolute -bottom-2 -left-2 w-2 h-2 rounded-full particle-2"
                :class="showSuccessModal ? 'bg-green-400' : 'bg-red-400'"></div>
              <div class="absolute top-1/2 -right-3 w-1.5 h-1.5 rounded-full particle-3"
                :class="showSuccessModal ? 'bg-green-200' : 'bg-red-200'"></div>
            </div>
          </div>

          <!-- Title with Animation -->
          <h3 class="text-2xl font-bold text-center mb-3 text-gray-800 opacity-0 title-fade">
            {{ showSuccessModal ? 'Great!' : 'Oops!' }}
          </h3>

          <!-- Message with Animation -->
          <p class="text-center mb-8 text-gray-600 leading-relaxed opacity-0 message-fade">
            {{ modalMessage }}
          </p>

          <!-- Action Button with Gradient -->
          <button @click="closeModal" class="w-full py-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 
                             rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl 
                             transform transition-all duration-300 hover:-translate-y-1 
                             focus:outline-none focus:ring-4 focus:ring-primary/20 
                             opacity-0 button-fade">
            <span class="flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              {{ showSuccessModal ? 'Continue' : 'Got it' }}
            </span>
          </button>
        </div>

        <!-- Decorative Elements -->
        <div
          class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-transparent animate-pulse">
        </div>
        <div
          class="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse delay-500">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom radio button styling */
input[type="radio"]:checked+label .relative div:first-child {
  border-color: #3b82f6;
}

input[type="radio"]:checked+label .relative div:last-child {
  opacity: 1;
}

/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Modal Animations */
.modal-overlay {
  animation: overlayFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-content {
  animation: modalSlideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon-scale {
  animation: iconScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s forwards;
}

.icon-rotate {
  animation: iconRotate 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s forwards;
}

.title-fade {
  animation: fadeInUp 0.6s ease-out 0.6s forwards;
}

.message-fade {
  animation: fadeInUp 0.6s ease-out 0.8s forwards;
}

.button-fade {
  animation: fadeInUp 0.6s ease-out 1s forwards;
}

.particle-1 {
  animation: floatParticle1 2s ease-in-out infinite 0.5s;
}

.particle-2 {
  animation: floatParticle2 2.5s ease-in-out infinite 0.8s;
}

.particle-3 {
  animation: floatParticle3 3s ease-in-out infinite 1.1s;
}

/* Keyframe Definitions */
@keyframes overlayFadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes iconScale {
  from {
    transform: scale(0) rotate(-180deg);
  }

  to {
    transform: scale(1) rotate(0deg);
  }
}

@keyframes iconRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floatParticle1 {

  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-10px) rotate(180deg);
  }
}

@keyframes floatParticle2 {

  0%,
  100% {
    transform: translateX(0) rotate(0deg);
  }

  50% {
    transform: translateX(8px) rotate(-180deg);
  }
}

@keyframes floatParticle3 {

  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(5px, -5px) rotate(120deg);
  }

  66% {
    transform: translate(-3px, -8px) rotate(240deg);
  }
}

/* Backdrop blur support */
@supports (backdrop-filter: blur(12px)) {
  .modal-overlay {
    backdrop-filter: blur(12px);
  }

  .modal-content {
    backdrop-filter: blur(16px);
  }
}
</style>