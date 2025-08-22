<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <div v-if="dataProfileInclomplete">
    <modalCekProfile />
  </div>

  <Layout v-if="!loading">
    <div
      class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex"
    >
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Berkamu
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Lakukan Tes
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
      <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">
        Jatidiri Potensi
      </div>
      <div class="w-4 h-4 relative opacity-75">
        <img src="@/assets/img/chevron_forward.svg" />
      </div>
    </div>

    <SelesaiTest
      v-if="isTested"
      routeUrl="user.views.hasil_talent_mapping"
      message="Test Jatidiri Potensi Selesai!"
      :subMessage="subMessage"
    />
    <div
      v-if="!isTested"
      class="flex flex-col items-start justify-center gap-3 w-full p-5 md:w-3/4 mx-auto"
    >
      <h1
        class="font-myFont font-semibold mx-auto text-clip text-lg lg:text-3xl"
      >
        Introduction
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5 md:w-5/6 mx-auto my-10">
        <div
          class="outline outline-1 outline-[#3030f8] rounded-lg font-sora p-5 bg-[#f9faff] space-y-4 leading-relaxed"
        >
          <p>
            Tes ini dirancang untuk membantu kamu mengenali kekuatan utama dalam
            diri. Terdiri dari 30 pernyataan, kamu diminta memilih pernyataan
            yang paling sesuai dengan karakter dan kebiasaan sehari-hari.
          </p>
          <p>
            Tes dibagi menjadi
            <span class="font-semibold text-[#3030f8]">4 tahap</span>. Pada
            setiap tahap, kamu wajib memilih
            <span class="font-semibold text-[#3030f8]"
              >5 hingga 7 pernyataan</span
            >
            yang paling menggambarkan diri kamu.
          </p>

          <!-- Daftar Tahapan -->
          <ul class="space-y-3">
            <li class="flex items-start gap-3">
              <span
                class="flex items-center justify-center font-bold"
                >1</span
              >
              <span>
                <span class="font-semibold text-[#3030f8]">Tahap Pertama:</span>
                Pilih <strong>yang paling cocok</strong> dan sesuai dengan diri
                kamu.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="flex items-center justify-center font-bold"
                >2</span
              >
              <span>
                <span class="font-semibold text-[#3030f8]">Tahap Kedua:</span>
                Pilih <strong>yang paling tidak cocok</strong> dan paling tidak
                sesuai dengan diri kamu.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="flex items-center justify-center font-bold"
                >3</span
              >
              <span>
                <span class="font-semibold text-[#3030f8]">Tahap Ketiga:</span>
                Pilih <strong>yang cocok</strong> dan sesuai dengan diri kamu.
              </span>
            </li>
            <li class="flex items-start gap-3">
              <span
                class="flex items-center justify-center font-bold"
                >4</span
              >
              <span>
                <span class="font-semibold text-[#3030f8]">Tahap Keempat:</span>
                Pilih <strong>yang tidak cocok</strong> dan tidak sesuai dengan
                diri kamu.
              </span>
            </li>
          </ul>
        </div>

        <img
          src="@/assets/img/note-fix.png"
          alt="introduction"
          class="w-92 h-auto floating hidden md:block"
        />
      </div>
      <div class="flex items-center pt-3 pb-7 gap-1">
        <input type="checkbox" id="setuju" v-model="isChecked" />
        <label
          for="setuju"
          class="text-black text-base font-normal font-['Roboto'] leading-normal"
        >
          Saya telah memahami intruksi sampai selesai.
        </label>
      </div>

      <!-- action -->
      <div class="w-full flex justify-between items-center">
        <RouterLink
          :to="{ name: 'views.dashboard' }"
          class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-4 pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-3 inline-flex"
        >
          <div class="w-6 h-6 relative">
            <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon" />
          </div>
          <div
            class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal"
          >
            Kembali
          </div>
        </RouterLink>

        <button
          @click="handleNextQuestion"
          :class="{
            'bg-opacity-50 cursor-not-allowed': !isChecked,
            'hover:translate-x-1 hover:shadow-2xl bg-opacity-100': isChecked,
          }"
          class="transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex"
        >
          <div
            class="text-white text-base font-normal font-['Roboto'] leading-normal"
          >
            Mulai Test
          </div>
          <div class="w-6 h-6 relative">
            <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon" />
          </div>
        </button>
      </div>
    </div>

    <section class="bg-white py-[46px]">
      <ReservasiFooter />
    </section>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Customer/Layout.vue";
import ReservasiFooter from "@/components/REMAKE/ReservasiFooter/Reservasi.vue";
import { onBeforeUnmount, onMounted, ref } from "vue";
import initAPI from "@/api/api";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/http-streaming";
import Cookies from "js-cookie";
import SelesaiTest from "@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue";
import KebijakanPrivasi from "@/components/REMAKE/Modal/KebijakanPrivasi/KebijakanPrivasi.vue";
import cekDataProfile from "@/components/cekProfile";
import modalCekProfile from "@/components/modalCekProfile/modalCekProfile.vue";
import { useRouter } from "vue-router";

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Jatidiri Potensi</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`;
const isTested = ref(null);
const customerId = ref("");

const dataProfileInclomplete = cekDataProfile();

const isKebijakanPrivasi = ref(true);
const isChecked = ref(false);
const router = useRouter();

const loading = ref(true);

const getUserData = async () => {
  try {
    const token = Cookies.get("token");
    const formData = new FormData();
    formData.append("refresh_user", "true");
    const userData = await initAPI("post", "login", formData, token);

    customerId.value = userData.data.customer.id;
    isTested.value =
      userData.data.customer.customers_mapping == null ? false : true;
    console.log(customerId.value);
    console.log(isTested.value);
  } catch (error) {
    // console.log(`error`, error)
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "User",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    loading.value = false;
  }
};

const toggleKebijakanPrivasi = () => {
  isKebijakanPrivasi.value = !isKebijakanPrivasi.value;
};

const handleNextQuestion = () => {
  if (isChecked.value) {
    router.push({ name: "user.views.test_talent_mapping" });
  }
};

onMounted(async () => {
  await getUserData();
  const videoId = document.getElementById("example-video");
  if (videoId) {
    const player = videojs(videoId);
    // player.play();

    onBeforeUnmount(() => {
      player.dispose();
    });
  }
  loading.value = false;
});
</script>

<style scoped>
.preloader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  transition: opacity 0.5s ease, height 0.5s ease;
}

.preloader-overlay.hidden {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes floatY {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.floating {
  animation: floatY 3s ease-in-out infinite;
}
</style>
