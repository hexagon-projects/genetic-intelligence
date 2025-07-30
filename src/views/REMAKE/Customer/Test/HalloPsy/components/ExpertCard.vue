<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
    title: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    }
})

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

const localStorage = window.localStorage;

const navigateToReservation = (type) => {
  localStorage.setItem('selectedExpertType', type.toLowerCase());
  router.push('/hallopsy/reservasi');
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div>
    <!-- Main Card -->
    <div class="w-full bg-primary h-[24vh] md:h-[20vh] lg:h-[22vh] rounded-3xl flex flex-col justify-between p-4 relative overflow-hidden hover:-translate-y-2 transition-all duration-500 cursor-pointer"
         @click="openPopup">
      <div class="absolute -top-[20%] -right-[20%] md:-top-[25%] md:-right-[20%] w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 bg-[#7B7BFB] border border-white/20 rounded-full flex justify-center items-center">
        <div class="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-[#8B8BF8] border border-white/20"></div>
      </div>

      <div class="ml-auto bg-gradient-to-r from-white/30 to-white/60 rounded-full w-8 h-8 flex justify-center items-center relative z-10">
        <div class="w-[28px] h-[28px] bg-[#8B8BF8] rounded-full flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path
              d="M12.994 1.006L1 13M12.2873 11.6127C11.7633 11.0887 11.4986 9.788 11.3659 8.606C11.1939 7.08467 11.2599 5.53933 11.6199 4.05C11.8893 2.93467 12.324 1.688 13 1.012M2.38674 1.71333C2.91077 2.23667 4.21151 2.50133 5.39358 2.634C6.915 2.806 8.46041 2.74 9.94983 2.38C11.0652 2.11067 12.312 1.676 12.988 1"
              stroke="white" stroke-width="2" />
          </svg>
        </div>
      </div>

      <h3 class="text-white font-bold relative z-20">{{ title }}</h3>
      <p class="text-sm text-white relative z-20 cursor-pointer" @click="openPopup">More</p>
    </div>

    <!-- Popup Mobile -->
    <transition name="popup">
      <div v-if="showPopup && isMobile"
           class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end transition-all duration-300"
           @click.self="closePopup">
        <div :class="['w-full bg-white rounded-t-3xl relative', isClosing ? 'animate-slide-down' : 'animate-slide-up']">
          <div class="p-4 space-y-6">
            <h3 class="text-[20px] font-medium text-center">{{ title }}</h3>
            <p class="text-base" v-html="description">
            </p>
            <div class="w-full">
              <button 
                @click="navigateToReservation(title)"
                class="w-full bg-primary rounded-full text-white py-3 px-8 font-bold text-base"
              >
                Start Your Consultation
              </button>
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
        <div :class="['bg-white rounded-3xl relative w-full max-w-md mx-4', isClosing ? 'animate-fade-out' : 'animate-fade-in']">
          <div class="p-6 space-y-6">
            <h3 class="text-[20px] font-medium text-center">{{ title }}</h3>
            <p class="text-base" v-html="description">
            </p>
            <div class="w-full">
              <button 
                @click="navigateToReservation(title)"
                class="w-full bg-primary rounded-full text-white py-3 px-8 font-bold text-base"
              >
                Start Your Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
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