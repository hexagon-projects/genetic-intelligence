<template>

  <div class="flex flex-col gap-[16px] items-center mb-[56px]">
    <div class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[122px] h-[32px]">
      <span class="font-roboto font-medium text-[#3030F8]">Pilih Tes</span>
    </div>

    <h1 class="text-[#0B0B79] font-semibold text-3xl font-sora">
      Assesment Jatidiri
    </h1>

    <h3 class="mx-4 lg:mx-0 text-[#667085] text-center font-normal text-sm md:text-base font-sora">
      Berikut tahapan proses dalam menggunakan Jatidiri.app untuk memahami diri
      melalui berbagai tes:
    </h3>
  </div>

  <div class="flex justify-between items-center w-full px-5 md:px-32 md:my-5">
    <div class="md:flex gap-2 items-center font-sora hidden">
      <img src="@/assets/icons/progres.svg" alt="progres" />
      <span class="md:font-semibold text-xs">Ayo Test Sekarang Juga</span>
    </div>
    <div class="w-full md:w-auto">
      <div
        class="flex items-center max-w-md mx-auto bg-transparent border border-gray-300 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clip-rule="evenodd" />
        </svg>

        <input type="text" placeholder="Cari Assement ..." v-model="searchQuery"
          class="ml-2 w-full border-none focus:ring-0 focus:outline-none bg-transparent text-gray-700" />
      </div>
    </div>
  </div>

  <div class="my-5 w-full px-5 md:px-32">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div class="bg-biru p-3 md:p-5 rounded-[24px] md:rounded-[32px] flex flex-col gap-5"
        v-for="(assement, index) in filteredAssesments" :key="index">
        <div class="flex justify-between">
          <div class="font-sora font-semibold text-xs md:text-xl col-span-2 text-white">
            {{ assement.name }}
          </div>
          <div>
            <div v-if="assement.name === 'Jatidiri Tangguh'" @click="openPopup(tangguhPackage)"
              class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-5 md:h-10 w-5 md:w-10 flex justify-center items-center bg-white rounded-full cursor-pointer">
              <img src="@/assets/icons/rt.svg" alt="go" />
            </div>
            <RouterLink v-else :to="{ name: assement.link }"
              class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-5 md:h-10 w-5 md:w-10 flex justify-center items-center bg-white rounded-full">
              <img src="@/assets/icons/rt.svg" alt="go" />
            </RouterLink>
          </div>
        </div>
        <span class="font-sora text-white hidden md:block min-h-[90px]">
          {{ assement.desc }}
        </span>
        <div class="w-full md:h-52 h-32 rounded-xl overflow-hidden flex items-center justify-center relative">
          <div
            class="absolute bottom-0 w-full bg-white md:h-44 h-32 rounded-xl overflow-hidden flex items-center justify-center">
          </div>
          <div class="w-full md:h-52 h-44 rounded-xl overflow-hidden flex items-center justify-center relative z-10">
            <img :src="assement.image" :alt="assement.name" class="object-contain absolute" />
          </div>
        </div>

        <div v-if="assement.name === 'Jatidiri Tangguh'" @click="openPopup(tangguhPackage)"
          class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex cursor-pointer">
          <div class="text-[#3030f8] text-xs md:text-base font-normal font-sora leading-normal">
            Cek Sekarang
          </div>
          <div class="w-3 h-3 relative">
            <img src="@/assets/icons/rt.svg" alt="go" />
          </div>
        </div>
        <RouterLink v-else :to="{ name: assement.link }"
          class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex">
          <div class="text-[#3030f8] text-xs md:text-base font-normal font-sora leading-normal">
            Cek Sekarang
          </div>
          <div class="w-3 h-3 relative">
            <img src="@/assets/icons/rt.svg" alt="go" />
          </div>
        </RouterLink>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <transition name="popup">
      <div v-if="showPopup"
        class="font-sora fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center transition-all duration-300 ease-out"
        @click="handleOverlayClick">
        <div
          class="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md md:max-w-xl transform transition-transform duration-500 ease-out"
          :class="isClosing ? (isMobile ? 'animate-slide-down' : 'animate-fade-out') : (isMobile ? 'animate-slide-up' : 'animate-fade-in')"
          @click.stop>
          <div class="p-4 flex justify-between items-center text-center">
            <div class="w-6"></div>
            <h3 class="text-lg font-semibold text-gray-900">Asesmen Jatidiri Tangguh</h3>
            <div @click="closePopup" class="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <path
                  d="M10.2692 8.85499C9.87867 8.46447 9.24551 8.46447 8.85498 8.85499C8.46446 9.24551 8.46446 9.87868 8.85498 10.2692L11.9191 13.3333L8.85498 16.3975C8.46446 16.788 8.46446 17.4212 8.85498 17.8117C9.24551 18.2022 9.87867 18.2022 10.2692 17.8117L13.3333 14.7475L16.3975 17.8117C16.788 18.2022 17.4211 18.2022 17.8117 17.8117C18.2022 17.4212 18.2022 16.788 17.8117 16.3975L14.7475 13.3333L17.8117 10.2692C18.2022 9.87868 18.2022 9.24551 17.8117 8.85499C17.4211 8.46447 16.788 8.46447 16.3975 8.85499L13.3333 11.9191L10.2692 8.85499Z"
                  fill="#333333" />
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M1.0718 22.6667C0 20.8103 0 18.318 0 13.3333C0 8.34872 0 5.85641 1.0718 4C1.77394 2.78385 2.78385 1.77394 4 1.0718C5.85641 0 8.34872 0 13.3333 0C18.318 0 20.8103 0 22.6667 1.0718C23.8828 1.77394 24.8927 2.78385 25.5949 4C26.6667 5.85641 26.6667 8.34872 26.6667 13.3333C26.6667 18.318 26.6667 20.8103 25.5949 22.6667C24.8927 23.8828 23.8828 24.8927 22.6667 25.5949C20.8103 26.6667 18.318 26.6667 13.3333 26.6667C8.34872 26.6667 5.85641 26.6667 4 25.5949C2.78385 24.8927 1.77394 23.8828 1.0718 22.6667ZM24.5409 7.67411C24.4195 6.33463 24.1937 5.57307 23.8628 5C23.3362 4.08788 22.5788 3.33046 21.6667 2.80385C21.0936 2.47299 20.332 2.24721 18.9926 2.12581C17.6256 2.00192 15.8625 2 13.3333 2C10.8042 2 9.0411 2.00192 7.67411 2.12581C6.33463 2.24721 5.57307 2.47299 5 2.80385C4.08788 3.33046 3.33046 4.08788 2.80385 5C2.47299 5.57307 2.24721 6.33463 2.12581 7.67411C2.00192 9.0411 2 10.8042 2 13.3333C2 15.8625 2.00192 17.6256 2.12581 18.9926C2.24721 20.332 2.47299 21.0936 2.80385 21.6667C3.33046 22.5788 4.08788 23.3362 5 23.8628C5.57307 24.1937 6.33463 24.4195 7.67411 24.5409C9.0411 24.6648 10.8042 24.6667 13.3333 24.6667C15.8625 24.6667 17.6256 24.6648 18.9926 24.5409C20.332 24.4195 21.0936 24.1937 21.6667 23.8628C22.5788 23.3362 23.3362 22.5788 23.8628 21.6667C24.1937 21.0936 24.4195 20.332 24.5409 18.9926C24.6648 17.6256 24.6667 15.8625 24.6667 13.3333C24.6667 10.8042 24.6648 9.0411 24.5409 7.67411Z"
                  fill="#333333" />
              </svg>
            </div>
          </div>

          <div class="p-4 md:p-6 max-h-96 overflow-y-auto">
            <div class="grid grid-cols-2 gap-4">
              <div v-for="(assessment, index) in selectedPackage?.assesment" :key="`${assessment.title}-${index}`"
                @click="navigateToDetail(assessment.slug)"
                class="w-full h-[220px] md:h-[240px] flex flex-col justify-between relative bg-[#3030f8] rounded-3xl p-4 text-white cursor-pointer">
                <div>
                  <img :src="assessment.image" :alt="assessment.title" class="w-10 h-10 object-contain">
                </div>

                <div class="space-y-1 w-full">
                  <h5 class="text-sm md:text-base font-semibold mb-1">{{
                    assessment.title }}
                  </h5>
                  <p class="text-[10px] md:text-sm leading-relaxed">{{
                    assessment.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { ref, computed, onMounted, onUnmounted } from "vue";
import bri from '../../../../assets/icons/bri.png'
import crs from '../../../../assets/icons/crs.png'
import lbc from '../../../../assets/icons/lbc.png'
import map from '../../../../assets/icons/map.png'
import mms from '../../../../assets/icons/mms.png'

const searchQuery = ref("");
const showPopup = ref(false);
const isClosing = ref(false);
const selectedPackage = ref(null);
const tangguhImage = new URL("@/assets/icons/jatidiri-cerdas.svg", import.meta.url).href;
const isMobile = ref(false);
const router = useRouter()

const navigateToDetail = (tes) => {
  router.push(`/tangguh/${tes}`)
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const tangguhPackage = {
  image: tangguhImage,
  title: 'Jatidiri Tangguh',
  description: 'Start Your Self-Discovery Journey',
  assesment: [
    {
      image: mms,
      slug: 'mms',
      title: 'Mental Maintenance Self-Check',
      description: 'Memantau keseimbangan mental mahasiswa koas.',
    },
    {
      image: map,
      slug: 'map',
      title: 'Motivation for Academic & Professional',
      description: 'Mengukur motivasi internal dan eksternal mahasiswa dalam menjalani masa koas.',
    },
        {
      image: lbc,
      slug: 'lbc',
      title: 'Learning Barriers Check',
      description: 'Mengidentifikasi hambatan internal & eksternal mahasiswa koas.',
    },
    {
      image: bri,
      slug: 'bri',
      title: 'Burnout & Resilience Index',
      description: 'Mendeteksi risiko burnout & resiliensi mahasiswa koas.',
    },
    {
      image: crs,
      slug: 'crs',
      title: 'Clinical Readiness Scale',
      description: 'Mengukur kesiapan mahasiswa menghadapi stase klinik',
    },
  ]
};

const assesments = ref([
  // {
  //   name: "Jatidiri Belajar",
  //   desc: "Tes instrumen untuk mengetahui gaya belajar kamu agar guru dapat membuat metode pembelajaran yang sesuai dan efektif.",
  //   link: "user.views.assesment",
  //   image: new URL("@/assets/icons/jatidiri-belajar.svg", import.meta.url).href,
  // },
  {
    name: "Jatidiri Cerdas",
    desc: "Tes instrumen untuk mengetahui skor IQ kamu dengan cepat dan akurat, memberikan gambaran jelas tentang kemampuan kognitifmu.",
    link: "user.views.iq",
    image: new URL("@/assets/icons/jatidiri-cerdas.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri Kendali",
    desc: "Tes untuk mengukur tingkat ketergantungan kamu pada internet, serta memberikan saran untuk memperbaiki kebiasaan online.",
    link: "user.views.test_gadget",
    image: new URL("@/assets/icons/jatidiri-kendali.svg", import.meta.url).href,
  },
  // {
  //   name: "Jatidiri Bakat",
  //   desc: "Tes yang dirancang untuk mengidentifikasi minat kamu terhadap berbagai jenis pekerjaan dan profesi kerja sebagai panduan karier.",
  //   link: "user.views.rmib",
  //   image: new URL("@/assets/icons/jatidiri-bakat.svg", import.meta.url).href,
  // },
  {
    name: "Jatidiri Bahagia",
    desc: "Tes ini dirancang untuk mengukur tingkat kebahagiaan individu berbagai berdasarkan berbagai aspek kehidupan dan keseimbangan hidup",
    link: "user.views.test_kebahagiaan",
    image: new URL("@/assets/icons/jatidiri-bahagia.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri",
    desc: "Tes yang dirancang untuk mengukur kepercayaan diri yang meliputi keyakinan, nilai, tujuan, dan peran sosial.",
    link: "user.views.test_jatidiri",
    image: new URL("@/assets/icons/jatidiri.png", import.meta.url).href,
  },
  {
    name: "Jatidiri Anxiety",
    desc: "Self-Rating Scale for Anxiety (SRA-Scale) adalah alat tes psikologis yang dirancang untuk mengukur tingkat kecemasan individu berdasarkan penilaian diri (self-rating).",
    link: "user.views.test_jatidiri_anxiety",
    image: new URL("@/assets/icons/jatidiri-anxiety.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri Kendali Stres",
    desc: "Perceived Stress Scale (PSS) adalah alat tes psikologis yang dirancang untuk mengukur tingkat stres individu berdasarkan perasaan dan pikiran Anda selama sebulan terakhir.",
    link: "user.views.test_jatidiri_stres",
    image: new URL("@/assets/icons/jatidiri-stres.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri Kendali Mental",
    desc: "Kesehatan Mental adalah alat tes psikologis yang dirancang untuk mengukur tingkat kesehatan mental individu berdasarkan kondisi dan pikiran Anda selama seminggu terakhir.",
    link: "user.views.test_jatidiri_mental",
    image: new URL("@/assets/icons/jatidiri-mental.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri Potensi",
    desc: "Alat test untuk mengidentifikasi, menilai, dan memetakan potensi serta kompetensi individu dalam suatu organisasi atau bahkan pada tingkat individu",
    link: "user.views.test_talen_mapping",
    image: new URL("@/assets/icons/talent-mapping.svg", import.meta.url).href,
  },
  {
    name: "Jatidiri Karir",
    desc: "Petakan masa depan kariermu. Tes ini bantu kamu mengidentifikasi potensi dan kompetensi diri untuk menentukan jalur karier yang paling sesuai.",
    link: "user.views.karir",
    image: new URL("@/assets/icons/jatidiri-karir.png", import.meta.url).href,
  },
  {
    name: "Jatidiri Cerdas dewasa",
    desc: "Tes Jatidiri Cerdas dewasa mengukur berbagai aspek kecerdasan, termasuk kemampuan verbal, numerik, dan spasial, untuk memahami kekuatan intelektualmu.",
    link: "user.views.ist",
    image: new URL("@/assets/icons/ist.png", import.meta.url).href,
  },
  {
    name: "Jatidiri Tangguh",
    desc: "Tes Jatidiri Tangguh mengukur berbagai aspek kecerdasan, termasuk kemampuan verbal, numerik, dan spasial, untuk memahami kekuatan intelektualmu.",
    link: "user.views.tangguh",
    image: new URL("@/assets/icons/ist.png", import.meta.url).href,
  },
]);

const filteredAssesments = computed(() => {
  if (!searchQuery.value) return assesments.value;
  return assesments.value.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const openPopup = (item) => {
  selectedPackage.value = item;
  isClosing.value = false;
  showPopup.value = true;
};

const closePopup = () => {
  isClosing.value = true;
  setTimeout(() => {
    showPopup.value = false;
    selectedPackage.value = null;
    isClosing.value = false;
  }, 500);
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    closePopup();
  }
};

const props = defineProps(["userData"]);
</script>

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
    transform: scale(0.9);
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
    transform: scale(0.9);
  }
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-slide-down {
  animation: slide-down 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out forwards;
}

.animate-fade-out {
  animation: fade-out 0.3s ease-out forwards;
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