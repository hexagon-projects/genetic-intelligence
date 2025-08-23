<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import initAPI from '../../../../api/api';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const router = useRouter()
const store = useStore()

// Ambil data user dari store
// const userData = computed(() => store.getters.getUserData);

const localStorageUserData = localStorage.getItem('userData');
const userData = JSON.parse(localStorageUserData);

// Data dari API
const apiQuestions = ref([]);
const introduction = {
  title: "Petunjuk",
  content: "Mohon berikan penilaian berdasarkan pengamatan Anda terhadap anak di rumah. Pilih salah satu angka yang paling sesuai dengan kondisi anak Anda saat ini.",
  options: [
    { id: 1, text: "Jarang/Belum terlihat" },
    { id: 2, text: "Kadang-kadang" },
    { id: 3, text: "Sering" },
    { id: 4, text: "Sangat sering/Selalu" }
  ]
};

const questions = ref([]);
const currentQuestionIndex = ref(-1);
const slideDirection = ref('next');
const hasStarted = ref(false);
const isLoading = ref(false);

// Fungsi untuk memetakan tipe dari API ke kunci yang sesuai
const mapQuestionType = (type) => {
  const typeMapping = {
    'Kognisi': 'kognisi',
    'Psikomotorik': 'psikomotorik',
    'Emosi': 'emosi',
    'Relasi': 'relasi',
    'Kemandirian': 'mandiri'
  };
  
  return typeMapping[type] || null;
};

// Fungsi untuk mengambil data pertanyaan dari API
const fetchQuestions = async () => {
  try {
    isLoading.value = true;
    const token = Cookies.get('token');
    const response = await initAPI('get', 'parent/questions', null, token);
    
    if (response.data && response.data.data) {
      apiQuestions.value = response.data.data;
      
      // Transform data dari API ke format yang digunakan komponen
      questions.value = apiQuestions.value.map(q => ({
        id: q.id,
        question: q.question,
        category: `Aspek ${q.type}`,
        type: mapQuestionType(q.type), // Gunakan fungsi mapping
        selectedOption: null,
        answers: q.answers
      }));
    }
  } catch (error) {
    console.error('Error fetching questions:', error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal Memuat Pertanyaan',
      text: 'Tidak dapat mengambil data pertanyaan dari server.',
      showConfirmButton: false,
      timer: 2000
    });
  } finally {
    isLoading.value = false;
  }
};

const currentQuestion = computed(() => {
  return currentQuestionIndex.value >= 0 ? questions.value[currentQuestionIndex.value] : null;
});

const progressPercentage = computed(() => {
  if (currentQuestionIndex.value < 0) return 0;
  return ((currentQuestionIndex.value + 1) / questions.value.length) * 100;
});

const selectOption = (optionId) => {
  if (currentQuestionIndex.value >= 0) {
    questions.value[currentQuestionIndex.value].selectedOption = optionId;
  }
};

const isOptionSelected = computed(() => {
  if (currentQuestionIndex.value < 0) return true;
  return currentQuestion.value.selectedOption !== null;
});

const startQuestionnaire = () => {
  hasStarted.value = true;
  slideDirection.value = 'next';
  currentQuestionIndex.value = 0;
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    slideDirection.value = 'next';
    currentQuestionIndex.value++;
  } else {
    submitAnswers();
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    slideDirection.value = 'prev';
    currentQuestionIndex.value--;
  } else if (currentQuestionIndex.value === 0) {
    // Kembali ke introduction
    slideDirection.value = 'prev';
    currentQuestionIndex.value = -1;
  }
};

// Fungsi untuk mengirim jawaban ke API
const submitAnswers = async () => {
  try {
    // Pastikan userData tersedia
    if (!userData || !userData.id) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal Mengirim Jawaban',
        text: 'Data pengguna tidak ditemukan. Silakan login kembali.',
        showConfirmButton: true
      }).then(() => {
        router.push('/login');
      });
      return;
    }
    
    isLoading.value = true;
    
    // Mengelompokkan jawaban berdasarkan tipe
    const groupedAnswers = {
      customer_id: userData.id,
      kognisi: [],
      psikomotorik: [],
      emosi: [],
      relasi: [],
      mandiri: [] // Sesuai dengan format payload API
    };
    
    // Mengisi jawaban berdasarkan tipe pertanyaan
    questions.value.forEach(q => {
      if (q.selectedOption !== null && q.type) {
        // Pastikan tipe valid sebelum push
        if (groupedAnswers[q.type]) {
          groupedAnswers[q.type].push(q.selectedOption);
        } else {
          console.warn(`Tipe pertanyaan tidak dikenali: ${q.type}`);
        }
      }
    });
    
    // Membuat payload sesuai format yang diminta
    const payload = {
      ...groupedAnswers
    };
    
    // Mengirim data ke API dengan token
    const token = Cookies.get('token');
    const response = await initAPI('post', 'customers/parent', payload, token);
    
    if (response.data && response.data.message === "Jawaban Berhasil Direkam.") {
      // Menampilkan modal sukses
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Jawaban kuisioner telah berhasil dikirim.',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        router.push('/tk');
      });
    }
  } catch (error) {
    console.error('Error submitting answers:', error);
    Swal.fire({
      icon: 'error',
      title: 'Gagal Mengirim Jawaban',
      text: 'Terjadi kesalahan saat mengirim jawaban. Silakan coba lagi.',
      showConfirmButton: true
    });
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle hook untuk mengambil data pertanyaan saat komponen dimuat
onMounted(() => {
  fetchQuestions();
});
</script>

<template>
  <Layout>
    <div class="w-full flex min-h-screen justify-center items-center font-sora pb-20 md:pb-0">
      <div
        class="bg-white rounded-2xl shadow-xl shadow-black/10 p-4 w-full max-w-[90%] md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%] mx-auto space-y-6">
        <div class="w-12 h-12 border rounded-md flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M21 8H1M10 17L17.8 17C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40974 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H16M10 17L12 19M10 17L12 15M6 17H4.2C3.07989 17 2.51984 17 2.09202 16.782C1.71569 16.5903 1.40973 16.2843 1.21799 15.908C1 15.4802 1 14.9201 1 13.8V6.2C1 5.0799 1 4.51984 1.21799 4.09202C1.40973 3.71569 1.7157 3.40973 2.09202 3.21799C2.51984 3 3.0799 3 4.2 3H12M12 3L10 5M12 3L10 1"
              stroke="#414651" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <!-- Loading indicator -->
        <div v-if="isLoading" class="flex justify-center items-center py-8">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div v-else class="space-y-2 overflow-hidden">
          <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
            <h5 :key="currentQuestionIndex >= 0 ? 'question' : 'intro'" class="text-md md:text-lg font-semibold">
              {{ currentQuestionIndex >= 0 ? currentQuestion.category : introduction.title }}
            </h5>
          </Transition>
          <div v-if="currentQuestionIndex >= 0" class="w-full h-4 rounded-lg relative bg-[#E8E8E8]">
            <div class="h-full bg-primary rounded-lg transition-all duration-500 ease-out"
              :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- Content with animation -->
        <div v-if="!isLoading" class="question-container overflow-hidden">
          <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
            <!-- Introduction Screen -->
            <div v-if="currentQuestionIndex < 0" key="introduction" class="question-content">
              <p class="text-xs md:text-base">{{ introduction.content }}</p>

              <p class="text-sm md:text-lg font-semibold mt-4">Skala Penilaian</p>

              <!-- Option examples for introduction -->
              <div class="w-full flex flex-col gap-4 mt-6">
                <div v-for="option in introduction.options" :key="option.id"
                  class="py-2 px-3 rounded-2xl bg-[#F5F5F5] group transition-all duration-500 flex justify-between items-center gap-4">
                  <div class="w-fit flex gap-4 items-center">
                    <div
                      class="w-8 h-8 rounded-full text-[#8E8E8E] group-hover:text-primary group-hover:bg-[#C7C7FD] transition-all duration-500 flex justify-center items-center">
                      <h6 class="text-xs md:text-sm font-semibold">{{ option.id.toString().padStart(2, '0') }}</h6>
                    </div>
                    <p class="text-xs md:text-base text-[#8E8E8E] group-hover:text-primary transition-all duration-500 font-medium">
                      {{ option.text }}
                    </p>
                  </div>

                  <div
                    class="w-4 h-4 bg-[#8E8E8E] group-hover:bg-primary flex justify-center items-center transition-all duration-500 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M8.33317 2.5L3.74984 7.08333L1.6665 5" stroke="white" stroke-width="1.66667"
                        stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Question Screen -->
            <div v-else :key="'question-' + currentQuestion.id" class="question-content">
              <!-- Question with animation -->
              <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
                <div :key="currentQuestion.id">
                  <p class="text-sm md:text-base">{{ currentQuestion.question }}</p>
                </div>
              </Transition>

              <!-- Option with animation -->
              <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
                <section :key="currentQuestion.id" class="space-y-4 mt-6">
                  <div class="w-full flex flex-col gap-4">
                    <div v-for="option in introduction.options" :key="option.id"
                      class="py-2 px-3 rounded-2xl cursor-pointer"
                      :class="currentQuestion.selectedOption === option.id ? 'bg-[#E8E8FE]' : 'bg-[#F5F5F5]'"
                      @click="selectOption(option.id)" :style="{ 'transition': 'all 0.5s' }">
                      <div class="w-full flex justify-between items-center gap-4">
                        <div class="w-fit flex gap-4 items-center">
                          <div class="w-8 h-8 rounded-full flex justify-center items-center"
                            :class="currentQuestion.selectedOption === option.id ? 'text-primary bg-[#C7C7FD]' : 'text-[#8E8E8E]'"
                            :style="{ 'transition': 'all 0.5s' }">
                            <h6 class="text-xs md:text-sm font-semibold">{{ option.id.toString().padStart(2, '0') }}</h6>
                          </div>
                          <p class="text-sm md:text-base font-medium"
                            :class="currentQuestion.selectedOption === option.id ? 'text-primary' : 'text-[#8E8E8E]'"
                            :style="{ 'transition': 'all 0.5s' }">
                            {{ option.text }}
                          </p>
                        </div>

                        <div class="w-4 h-4 flex justify-center items-center rounded-full"
                          :class="currentQuestion.selectedOption === option.id ? 'bg-primary' : 'bg-[#8E8E8E]'"
                          :style="{ 'transition': 'all 0.5s' }">
                          <svg v-if="currentQuestion.selectedOption === option.id" xmlns="http://www.w3.org/2000/svg"
                            width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M8.33317 2.5L3.74984 7.08333L1.6665 5" stroke="white" stroke-width="1.66667"
                              stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </Transition>
            </div>
          </Transition>
        </div>

        <!-- Button -->
        <div v-if="!isLoading" class="w-full flex justify-between items-center gap-4">
          <button @click="prevQuestion"
            class="py-3 text-xs md:text-base w-full border border-gray-300 rounded-xl cursor-pointer text-black font-medium">
            {{ currentQuestionIndex <= 0 ? 'Batal' : 'Kembali' }}
          </button>
          <button 
            @click="currentQuestionIndex < 0 ? startQuestionnaire() : nextQuestion()"
            class="py-3 text-xs md:text-base w-full border border-gray-300 rounded-xl cursor-pointer text-white font-medium"
            :class="isOptionSelected ? 'bg-primary' : 'bg-gray-400'"
            :disabled="!isOptionSelected">
            {{ currentQuestionIndex < 0 ? 'Mulai' : 'Selanjutnya' }}
          </button>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.question-container {
  position: relative;
}

.question-content {
  width: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-50px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>