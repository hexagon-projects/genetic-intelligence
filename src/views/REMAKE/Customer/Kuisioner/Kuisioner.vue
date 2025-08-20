<script setup>
import Layout from '../../../Layout/GuruTk/Layout.vue';
import { ref, computed, onMounted } from 'vue';

// Data introduction
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

// Data array untuk pertanyaan/kuisioner
const questions = ref([
  {
    id: 1,
    question: "Anak menunjukkan rasa ingin tahu dengan banyak bertanya 'apa,' 'kenapa,' atau 'bagaimana.'",
    category: "Aspek Kognisi (Berpikir dan Memahami)",
    selectedOption: null,
    note: ""
  },
  {
    id: 2,
    question: "Ibu menunjukkan rasa ingin tahu dengan banyak bertanya 'apa,' 'kenapa,' atau 'bagaimana.'",
    category: "Aspek Kognisi (Berpikir dan Memahami)",
    selectedOption: null,
    note: ""
  },
]);

// State aplikasi
const currentQuestionIndex = ref(-1); // -1 berarti introduction
const slideDirection = ref('next'); 
const hasStarted = ref(false); // Menandai apakah kuis sudah dimulai

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
  if (currentQuestionIndex.value < 0) return true; // Selalu aktif untuk introduction
  return currentQuestion.value.selectedOption !== null;
});

// Mulai kuis dari introduction
const startQuestionnaire = () => {
  hasStarted.value = true;
  currentQuestionIndex.value = 0;
};

const nextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    slideDirection.value = 'next';
    currentQuestionIndex.value++;
  } else {
    // Kuis selesai, lakukan sesuatu di sini
    console.log("Kuis selesai");
  }
};

const prevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    slideDirection.value = 'prev';
    currentQuestionIndex.value--;
  } else if (currentQuestionIndex.value === 0) {
    // Kembali ke introduction
    currentQuestionIndex.value = -1;
  }
};
</script>

<template>
  <Layout>
    <div class="w-full flex min-h-screen justify-center items-center font-sora">
      <div
        class="bg-white rounded-2xl shadow-xl shadow-black/10 p-4 w-full max-w-[90%] md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%] mx-auto space-y-6">
        <div class="w-12 h-12 border rounded-md flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="20" viewBox="0 0 22 20" fill="none">
            <path
              d="M21 8H1M10 17L17.8 17C18.9201 17 19.4802 17 19.908 16.782C20.2843 16.5903 20.5903 16.2843 20.782 15.908C21 15.4802 21 14.9201 21 13.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.7157 20.2843 3.40974 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H16M10 17L12 19M10 17L12 15M6 17H4.2C3.07989 17 2.51984 17 2.09202 16.782C1.71569 16.5903 1.40973 16.2843 1.21799 15.908C1 15.4802 1 14.9201 1 13.8V6.2C1 5.0799 1 4.51984 1.21799 4.09202C1.40973 3.71569 1.7157 3.40973 2.09202 3.21799C2.51984 3 3.0799 3 4.2 3H12M12 3L10 5M12 3L10 1"
              stroke="#414651" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>

        <div class="space-y-2">
          <h5 class="text-md md:text-lg font-semibold">
            {{ currentQuestionIndex >= 0 ? currentQuestion.category : introduction.title }}
          </h5>
          <!-- Progress Bar -->
          <div class="w-full h-4 rounded-lg relative bg-[#E8E8E8]">
            <div class="h-full bg-primary rounded-lg transition-all duration-500 ease-out"
              :style="{ width: progressPercentage + '%' }"></div>
          </div>
        </div>

        <!-- Introduction Screen -->
        <div v-if="currentQuestionIndex < 0" class="question-container overflow-hidden">
          <div class="question-content">
            <p class="text-sm md:text-base">{{ introduction.content }}</p>
            
            <!-- Option examples for introduction -->
            <div class="w-full flex flex-col gap-4 mt-6">
              <div v-for="option in introduction.options" :key="option.id"
                class="py-2 px-3 rounded-2xl bg-[#F5F5F5] group transition-all duration-500 flex justify-between items-center gap-4">
                <div class="w-fit flex gap-4 items-center">
                  <div
                    class="w-8 h-8 rounded-full text-[#8E8E8E] group-hover:text-primary group-hover:bg-[#C7C7FD] transition-all duration-500 flex justify-center items-center">
                    <h6 class="text-sm font-semibold">{{ option.id.toString().padStart(2, '0') }}</h6>
                  </div>
                  <p class="text-base text-[#8E8E8E] group-hover:text-primary transition-all duration-500 font-medium">
                    {{ option.text }}
                  </p>
                </div>

                <div class="w-4 h-4 bg-[#8E8E8E] group-hover:bg-primary flex justify-center items-center transition-all duration-500 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M8.33317 2.5L3.74984 7.08333L1.6665 5" stroke="white" stroke-width="1.66667"
                      stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Screen -->
        <template v-else>
          <!-- Question with animation -->
          <div class="question-container overflow-hidden">
            <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
              <div :key="currentQuestion.id" class="question-content">
                <p class="text-sm md:text-base">{{ currentQuestion.question }}</p>
              </div>
            </Transition>
          </div>

          <!-- Option with animation -->
          <Transition :name="slideDirection === 'next' ? 'slide-left' : 'slide-right'" mode="out-in">
            <section :key="currentQuestion.id" class="space-y-4">
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
                        <h6 class="text-sm font-semibold">{{ option.id.toString().padStart(2, '0') }}</h6>
                      </div>
                      <p class="text-base font-medium"
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
              <div class="space-y-2">
                <p class="text-xs md:text-sm text-[#8E8E8E]">Catatan Tambahan</p>
                <input type="text" v-model="currentQuestion.note"
                  class="bg-[#F5F5F5] text-sm md:text-base p-3 w-full rounded-lg"
                  placeholder="Tuliskan contoh atau keterangan lain yang relevan">
              </div>
            </section>
          </Transition>
        </template>

        <!-- Button -->
        <div class="w-full flex justify-between items-center gap-4">
          <button @click="prevQuestion"
            class="py-3 text-sm md:text-base w-full border border-gray-300 rounded-xl cursor-pointer text-black font-medium">
            {{ currentQuestionIndex <= 0 ? 'Batal' : 'Kembali' }}
          </button>
          <button 
            @click="currentQuestionIndex < 0 ? startQuestionnaire() : nextQuestion()"
            class="py-3 text-sm md:text-base w-full border border-gray-300 rounded-xl cursor-pointer text-white font-medium"
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