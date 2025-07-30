<script setup>
import Logo from '@/assets/img/logo-white.png'
import Doc from '@/assets/img/doc.png'
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: "Personal Consultation with Psychologist"
  },
  description: {
    type: String,
    default: "Lagi butuh tempat cerita yang aman? Di sini, kamu bisa ngobrol langsung dengan psikolog berlisensi untuk bantu pahami dan atasi masalah emosional atau mental yang kamu alami."
  },
  buttonText: {
    type: String,
    default: "Start Your Consultation"
  },
  category: {
    type: String,
    default: ""
  },
  image1: {
    type: String,
    default: Logo
  },
  image2: {
    type: String,
    default: Doc
  }
})

const localStorage = window.localStorage;

const navigateToReservation = () => {
  localStorage.setItem('selectedExpertType', props.category.toLowerCase());
  router.push('/hallopsy/reservasi');
};

const navigateToIgd = () => {
  router.push('/hallopsy/book/time');
};

const showPopup = ref(false);
const isClosing = ref(false);
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
};

const openPopup = () => {
  showPopup.value = true;
  isClosing.value = false;
};

const closePopup = () => {
  isClosing.value = true;
  setTimeout(() => {
    showPopup.value = false;
  }, 500);
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div
    class="w-full h-[50vh] md:h-[40vh] lg:h-[45vh] flex flex-col md:flex-row justify-between bg-primary rounded-[32px] overflow-hidden border-2 border-white">
    <!-- Mobile Version -->
    <div class="md:hidden absolute w-fit h-full -right-10 md:right-0 z-10">
      <img :src="image1" alt="" class="w-full h-full">
    </div>
    <div class="md:hidden absolute w-fit h-full -right-20 md:right-0 z-20">
      <img :src="image2" alt="" class="w-full h-full">
    </div>

    <div class="w-full h-1/2 md:hidden"></div>

    <div class="w-full h-fit relative z-30 p-4 md:hidden">
      <div class="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent backdrop-blur-sm"
        style="mask-image: linear-gradient(to top, rgba(0,0,0,1) 30%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0) 100%)"></div>
      <div class="space-y-4 relative z-40">
        <h2 class="text-2xl font-bold font-poppins">{{ title }}</h2>
        <div>
          <button class="w-full bg-white rounded-full text-primary py-3 px-8 font-bold text-base" @click="openPopup">
            {{ buttonText }}
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop Version -->
    <div
      class="w-1/2 h-full hidden md:flex flex-col justify-center items-start text-left relative z-30 p-4 md:p-8 lg:p-12 space-y-4 md:space-y-6">
      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold font-poppins text-white">{{ title }}</h2>
      <p class="hidden md:block text-base text-white">{{ description }}</p>
      <div>
        <button class="w-full bg-white rounded-full text-primary py-3 px-8 font-bold text-base" @click="openPopup">
          {{ buttonText }}
        </button>
      </div>
    </div>

    <div class="w-1/2 h-full hidden md:block relative">
      <div class="absolute right-1/2 translate-x-1/2 w-full h-full z-10">
        <img :src="image1" alt="" class="lg:w-[60%] h-full object-cover object-[20%_20%] mx-auto">
      </div>
      <div class="absolute right-1/2 translate-x-1/2 w-full lg:w-[60%] h-full z-20">
        <img :src="image2" alt="" class="w-full h-full object-cover object-top">
      </div>
    </div>
  </div>

  <!-- Popup Mobile -->
  <transition name="popup">
    <div v-if="showPopup && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end transition-all duration-300"
      @click.self="closePopup">
      <div :class="['w-full bg-white rounded-t-3xl relative', isClosing ? 'animate-slide-down' : 'animate-slide-up']">
        <div class="p-6 space-y-6">
          <h3 class="text-[20px] font-medium text-center">Mau Mulai Dari Mana?</h3>
          <p class="text-base text-center" v-html="'Pilih cara yang paling nyaman buatmu untuk mulai sesi konseling.'">
          </p>
          <div class="w-full space-y-4">
            <div
              class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl">
              <div class="flex gap-2" @click="navigateToReservation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_2512_5930)">
                    <mask id="mask0_2512_5930" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                      width="24" height="24">
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_2512_5930)">
                      <path opacity="0.4"
                        d="M5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12Z"
                        fill="white" />
                      <path
                        d="M8.03027 17.1509H8.04027C9.14027 18.0009 10.5103 18.5009 12.0003 18.5009C13.5103 18.5009 14.8903 17.9909 15.9903 17.1309H16.0003L15.4903 19.6009C15.0003 21.5009 13.9003 22.0009 12.5503 22.0009H11.4603C10.1103 22.0009 9.00027 21.5009 8.52027 19.5909L8.03027 17.1509Z"
                        fill="white" />
                      <path
                        d="M8.03027 6.85H8.04027C9.14027 6 10.5103 5.5 12.0003 5.5C13.5103 5.5 14.8903 6.01 15.9903 6.87H16.0003L15.4903 4.4C15.0003 2.5 13.9003 2 12.5503 2H11.4603C10.1103 2 9.00027 2.5 8.52027 4.41L8.03027 6.85Z"
                        fill="white" />
                      <path
                        d="M13.4 14.6002C13.21 14.6002 13.02 14.5302 12.87 14.3802L11.47 12.9802C11.33 12.8402 11.25 12.6502 11.25 12.4502V9.66016C11.25 9.25016 11.59 8.91016 12 8.91016C12.41 8.91016 12.75 9.25016 12.75 9.66016V12.1402L13.93 13.3202C14.22 13.6102 14.22 14.0902 13.93 14.3802C13.78 14.5302 13.59 14.6002 13.4 14.6002Z"
                        fill="white" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2512_5930">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="text-base text-white">Pilih Berdasarkan {{ category }}</p>
              </div>
              <div>
                <p class="text-xs text-white">Lihat jadwal yang tersedia, lalu pilih psikolog yang cocok.
                </p>
              </div>
            </div>

            <div
              class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl" @click="navigateToIgd">
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_2512_5943)">
                    <mask id="mask0_2512_5943" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                      width="24" height="24">
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_2512_5943)">
                      <path
                        d="M11.9795 12C14.7395 12 16.9795 9.76 16.9795 7C16.9795 4.24 14.7495 2 11.9795 2C9.20949 2 6.97949 4.24 6.97949 7C6.97949 9.76 9.21949 12 11.9795 12Z"
                        fill="white" />
                      <path opacity="0.4"
                        d="M19.3399 19.49C19.1799 20.08 18.6799 20.46 18.0699 20.46C17.4599 20.46 16.9599 20.08 16.7999 19.48L16.5399 18.51C16.3999 18.01 16.0199 17.63 15.5199 17.49L14.5399 17.22C13.9699 17.06 13.5799 16.56 13.5799 15.95C13.5799 15.65 13.6699 15.38 13.8299 15.17C13.2299 15.06 12.6199 15 11.9799 15C7.70994 15 4.16995 17.54 3.49995 20.86C3.37995 21.45 3.85995 22 4.46995 22H19.4899C20.0899 22 20.5699 21.45 20.4599 20.86C20.3099 20.09 19.9899 19.36 19.5499 18.69L19.3399 19.499V19.49Z"
                        fill="white" />
                      <path
                        d="M21.5798 15.9695C21.5798 16.0395 21.5398 16.1995 21.3498 16.2595L20.3698 16.5295C19.5198 16.7595 18.8798 17.3995 18.6498 18.2495L18.3898 19.2095C18.3298 19.4295 18.1598 19.4495 18.0798 19.4495C17.9998 19.4495 17.8298 19.4295 17.7698 19.2095L17.5098 18.2395C17.2798 17.3995 16.6298 16.7595 15.7898 16.5295L14.8198 16.2695C14.6098 16.2095 14.5898 16.0295 14.5898 15.9595C14.5898 15.8795 14.6098 15.6995 14.8198 15.6395L15.7998 15.3795C16.6398 15.1395 17.2798 14.4995 17.5098 13.6595L17.7898 12.6395C17.8598 12.4695 18.0198 12.4395 18.0798 12.4395C18.1398 12.4395 18.3098 12.4595 18.3698 12.6195L18.6498 13.6495C18.8798 14.4895 19.5298 15.1295 20.3698 15.3695L21.3698 15.6495C21.5698 15.7295 21.5798 15.9095 21.5798 15.9695Z"
                        fill="white" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2512_5943">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="text-base text-white">Pilih Berdasarkan Waktu</p>
              </div>
              <div>
                <p class="text-xs text-white">Lihat profil psikolog terlebih dahulu, lalu tentukan jadwalnya.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Popup Desktop -->
  <transition name="popup">
    <div v-if="showPopup && !isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all duration-300"
      @click.self="closePopup">
      <div
        :class="['bg-white rounded-3xl relative w-full max-w-md mx-4', isClosing ? 'animate-fade-out' : 'animate-fade-in']">
        <div class="p-6 space-y-6">
          <h3 class="text-[20px] font-medium text-center">Mau Mulai Dari Mana?</h3>
          <p class="text-base text-center" v-html="'Pilih cara yang paling nyaman buatmu untuk mulai sesi konseling.'">
          </p>
          <div class="w-full space-y-4">
            <div
              class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl">
              <div class="flex gap-2" @click="navigateToReservation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_2512_5930)">
                    <mask id="mask0_2512_5930" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                      width="24" height="24">
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_2512_5930)">
                      <path opacity="0.4"
                        d="M5.5 12C5.5 8.41 8.41 5.5 12 5.5C15.59 5.5 18.5 8.41 18.5 12C18.5 14.08 17.52 15.94 16 17.13H15.99C14.89 17.99 13.51 18.5 12 18.5C10.51 18.5 9.14 18 8.04 17.15H8.03C6.49 15.96 5.5 14.1 5.5 12Z"
                        fill="white" />
                      <path
                        d="M8.03027 17.1509H8.04027C9.14027 18.0009 10.5103 18.5009 12.0003 18.5009C13.5103 18.5009 14.8903 17.9909 15.9903 17.1309H16.0003L15.4903 19.6009C15.0003 21.5009 13.9003 22.0009 12.5503 22.0009H11.4603C10.1103 22.0009 9.00027 21.5009 8.52027 19.5909L8.03027 17.1509Z"
                        fill="white" />
                      <path
                        d="M8.03027 6.85H8.04027C9.14027 6 10.5103 5.5 12.0003 5.5C13.5103 5.5 14.8903 6.01 15.9903 6.87H16.0003L15.4903 4.4C15.0003 2.5 13.9003 2 12.5503 2H11.4603C10.1103 2 9.00027 2.5 8.52027 4.41L8.03027 6.85Z"
                        fill="white" />
                      <path
                        d="M13.4 14.6002C13.21 14.6002 13.02 14.5302 12.87 14.3802L11.47 12.9802C11.33 12.8402 11.25 12.6502 11.25 12.4502V9.66016C11.25 9.25016 11.59 8.91016 12 8.91016C12.41 8.91016 12.75 9.25016 12.75 9.66016V12.1402L13.93 13.3202C14.22 13.6102 14.22 14.0902 13.93 14.3802C13.78 14.5302 13.59 14.6002 13.4 14.6002Z"
                        fill="white" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2512_5930">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="text-base text-white">Pilih Berdasarkan {{ category }}</p>
              </div>
              <div>
                <p class="text-xs text-white">Lihat jadwal yang tersedia, lalu pilih psikolog yang cocok.
                </p>
              </div>
            </div>

            <div
              class="space-y-2 bg-[#A4A4A499] group hover:bg-primary cursor-pointer transition-all duration-500 p-4 md:p-6 rounded-3xl" @click="navigateToIgd">
              <div class="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_2512_5943)">
                    <mask id="mask0_2512_5943" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                      width="24" height="24">
                      <path d="M24 0H0V24H24V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_2512_5943)">
                      <path
                        d="M11.9795 12C14.7395 12 16.9795 9.76 16.9795 7C16.9795 4.24 14.7495 2 11.9795 2C9.20949 2 6.97949 4.24 6.97949 7C6.97949 9.76 9.21949 12 11.9795 12Z"
                        fill="white" />
                      <path opacity="0.4"
                        d="M19.3399 19.49C19.1799 20.08 18.6799 20.46 18.0699 20.46C17.4599 20.46 16.9599 20.08 16.7999 19.48L16.5399 18.51C16.3999 18.01 16.0199 17.63 15.5199 17.49L14.5399 17.22C13.9699 17.06 13.5799 16.56 13.5799 15.95C13.5799 15.65 13.6699 15.38 13.8299 15.17C13.2299 15.06 12.6199 15 11.9799 15C7.70994 15 4.16995 17.54 3.49995 20.86C3.37995 21.45 3.85995 22 4.46995 22H19.4899C20.0899 22 20.5699 21.45 20.4599 20.86C20.3099 20.09 19.9899 19.36 19.5499 18.69L19.3399 19.499V19.49Z"
                        fill="white" />
                      <path
                        d="M21.5798 15.9695C21.5798 16.0395 21.5398 16.1995 21.3498 16.2595L20.3698 16.5295C19.5198 16.7595 18.8798 17.3995 18.6498 18.2495L18.3898 19.2095C18.3298 19.4295 18.1598 19.4495 18.0798 19.4495C17.9998 19.4495 17.8298 19.4295 17.7698 19.2095L17.5098 18.2395C17.2798 17.3995 16.6298 16.7595 15.7898 16.5295L14.8198 16.2695C14.6098 16.2095 14.5898 16.0295 14.5898 15.9595C14.5898 15.8795 14.6098 15.6995 14.8198 15.6395L15.7998 15.3795C16.6398 15.1395 17.2798 14.4995 17.5098 13.6595L17.7898 12.6395C17.8598 12.4695 18.0198 12.4395 18.0798 12.4395C18.1398 12.4395 18.3098 12.4595 18.3698 12.6195L18.6498 13.6495C18.8798 14.4895 19.5298 15.1295 20.3698 15.3695L21.3698 15.6495C21.5698 15.7295 21.5798 15.9095 21.5798 15.9695Z"
                        fill="white" />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_2512_5943">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <p class="text-base text-white">Pilih Berdasarkan Waktu</p>
              </div>
              <div>
                <p class="text-xs text-white">Lihat profil psikolog terlebih dahulu, lalu tentukan jadwalnya.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
@keyframes slide-up {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0;
    transform: scale(0.95);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-slide-down {
  animation: slide-down 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.5s ease-out forwards;
}

.popup-enter-active,
.popup-leave-active {
  transition: opacity 0.5s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>