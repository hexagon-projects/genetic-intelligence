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
  },
  color: {
    type: String,
    default: 'bg-primary'
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
  <div>
    <div
      :class="[`w-full h-[50vh] md:h-[40vh] lg:h-[45vh] flex flex-col md:flex-row justify-between ${color} rounded-[32px] border-2 border-white relative !overflow-hidden`]">
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
        <!-- <p class="hidden md:block text-base text-white">{{ description }}</p> -->
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
  </div>
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