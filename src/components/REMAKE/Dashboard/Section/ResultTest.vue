<template>
  <div class="flex flex-col gap-[16px] items-center mb-[56px]">
    <div
      class="bg-[#D6D6FE] rounded-3xl flex justify-center items-center w-[122px] h-[32px]"
    >
      <span class="font-roboto font-medium text-[#3030F8]">Hasil Test</span>
    </div>

    <h1 class="text-[#0B0B79] font-semibold text-3xl font-sora">
      Hasil Assesment Jatidiri

      {{ assetemnt_result }}
    </h1>

    <h3
      class="mx-4 lg:mx-0 text-[#667085] text-center font-normal text-sm md:text-base font-sora"
    >
      Berikut daftar assement yang telah kamu kerjakan, kamu dapat melihat
      hasilnya disini dan dapatkan penjelasan lebih lanjut.
    </h3>
    <button
    v-if="props.userData?.customer?.customers_mapping !== null"
        @click="downloadCertificate"
      class="bg-biru text-white px-4 py-2 rounded-full hover:bg-biru/80 pulse-button"
    >
      Unduh Sertifikat
    </button>
  </div>

  <div class="flex justify-between items-center w-full px-5 md:px-32 md:my-5">
    <div class="md:flex gap-2 items-center font-sora hidden">
      <img src="@/assets/icons/progres.svg" alt="progres" />
      <span class="md:font-semibold text-xs"
        >Ayo lihat hasil test kamu sekarang</span
      >
    </div>
    <div class="w-full md:w-auto">
      <div
        class="flex items-center max-w-md mx-auto bg-transparent border border-gray-300 rounded-full px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
      >
        <!-- Ikon Search -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
            clip-rule="evenodd"
          />
        </svg>

        <!-- Input Search -->
        <input
          type="text"
          placeholder="Cari Assement ..."
          v-model="searchQuery"
          class="ml-2 w-full border-none focus:ring-0 focus:outline-none bg-transparent text-gray-700"
        />
      </div>
    </div>
  </div>

  <div class="my-5 w-full px-5 md:px-32">
    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <!-- card -->
      <div
        class="bg-biru p-3 md:p-5 rounded-[24px] md:rounded-[32px] flex flex-col gap-5"
        v-for="(assement, index) in filteredAssesments"
        :key="index"
      >
        <div class="flex justify-between">
          <div
            class="font-sora font-semibold text-xs md:text-xl col-span-2 text-white"
          >
            {{ assement.name }}
          </div>
          <div>
            <RouterLink
              :to="{ name: assement.link }"
              class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-5 md:h-10 w-5 md:w-10 flex justify-center items-center bg-white rounded-full"
            >
              <img src="@/assets/icons/rt.svg" alt="go" />
            </RouterLink>
          </div>
        </div>
        <span class="font-sora text-white hidden md:block min-h-[90px]">
          {{ assement.desc }}
        </span>
        <div
          class="w-full md:h-52 h-32 rounded-xl overflow-hidden flex items-center justify-center relative"
        >
          <div
            class="absolute bottom-0 w-full bg-white md:h-44 h-32 rounded-xl overflow-hidden flex items-center justify-center"
          ></div>
          <div
            class="w-full md:h-52 h-44 rounded-xl overflow-hidden flex items-center justify-center relative z-10"
          >
            <img
              :src="assement.image"
              :alt="assement.name"
              class="object-contain absolute"
            />
          </div>
        </div>

        <RouterLink
          :to="{ name: assement.link }"
          class="hover:translate-x-1 hover:drop-shadow-2xl transition-all h-11 py-1.5 bg-white rounded-full justify-center items-center gap-3 inline-flex"
        >
          <div
            class="text-[#3030f8] text-xs md:text-base font-normal font-sora leading-normal"
          >
            Lihat Hasil
          </div>
          <div class="w-3 h-3 relative">
            <img src="@/assets/icons/rt.svg" alt="go" />
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ref, computed } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import axios from 'axios';

const props = defineProps({
  userData: Object,
});

console.log(props.userData);

const searchQuery = ref("");

const assesments = computed(() =>
  [
    {
      name: "Jatidiri Belajar",
      desc: "Tes instrumen untuk mengetahui gaya belajar kamu agar guru dapat membuat metode pembelajaran yang sesuai dan efektif.",
      resulut: props.userData?.customer?.customers_assessments ? "yes" : null,
      link: props.userData?.customer?.customers_assessments
        ? "user.views.hasil_assessment"
        : null,
      image: new URL("@/assets/icons/jatidiri-belajar.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Cerdas",
      desc: "Tes instrumen untuk mengetahui skor IQ kamu dengan cepat dan akurat, memberikan gambaran jelas tentang kemampuan kognitifmu.",
      resulut: props.userData?.customer?.customers_iq ? "yes" : null,
      link: props.userData?.customer?.customers_iq
        ? "user.views.hasil_iq"
        : null,
      image: new URL("@/assets/icons/jatidiri-cerdas.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Kendali",
      desc: "Tes untuk mengukur tingkat ketergantungan kamu pada internet, serta memberikan saran untuk memperbaiki kebiasaan online.",
      resulut: props.userData?.customer?.customers_iaa ? "yes" : null,
      link: props.userData?.customer?.customers_iaa
        ? "user.views.hasil_gadget"
        : null,
      image: new URL("@/assets/icons/jatidiri-kendali.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Bakat",
      desc: "Tes yang dirancang untuk mengidentifikasi minat kamu terhadap berbagai jenis pekerjaan dan profesi kerja sebagai panduan karier.",
      resulut: props.userData?.customer?.customers_rmib ? "yes" : null,
      link: props.userData?.customer?.customers_rmib ? "user.views.rmib" : null,
      image: new URL("@/assets/icons/jatidiri-bakat.svg", import.meta.url).href,
    },
    {
      name: "Jatidiri Bahagia",
      desc: "Tes ini dirancang untuk mengukur tingkat kebahagiaan individu berbagai berdasarkan berbagai aspek kehidupan dan keseimbangan hidup",
      resulut: props.userData?.customer?.customers_tik ? "yes" : null,
      link: props.userData?.customer?.customers_tik
        ? "user.views.hasil_bahagia"
        : null,
      image: new URL("@/assets/icons/jatidiri-bahagia.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Q1",
      desc: "Tes yang dirancang untuk mengukur kepercayaan diri yang meliputi keyakinan, nilai, tujuan, dan peran sosial.",
      resulut: props.userData?.customer?.customers_q1 ? "yes" : null,
      link: props.userData?.customer?.customers_q1
        ? "user.views.hasil_jatidiri_q1"
        : null,
      image: new URL("@/assets/icons/jatidiri.svg", import.meta.url).href,
    },
    {
      name: "Jatidiri Q2",
      desc: "Tes yang dirancang untuk mengukur kepercayaan diri yang meliputi keyakinan, nilai, tujuan, dan peran sosial.",
      resulut: props.userData?.customer?.customers_q2 ? "yes" : null,
      link: props.userData?.customer?.customers_q2
        ? "user.views.hasil_jatidiri_q2"
        : null,
      image: new URL("@/assets/icons/jatidiri.svg", import.meta.url).href,
    },
    {
      name: "Jatidiri Anxiety",
      desc: "Self-Rating Scale for Anxiety (SRA-Scale) adalah alat tes psikologis yang dirancang untuk mengukur tingkat kecemasan individu berdasarkan penilaian diri (self-rating).",
      resulut: props.userData?.customer?.customers_anxiety ? "yes" : null,
      link: props.userData?.customer?.customers_anxiety
        ? "user.views.test_jatidiri_anxiety"
        : null,
      image: new URL("@/assets/icons/jatidiri-anxiety.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Kendali Stres",
      desc: "Perceived Stress Scale (PSS) adalah alat tes psikologis yang dirancang untuk mengukur tingkat stres individu berdasarkan perasaan dan pikiran Anda selama sebulan terakhir.",
      resulut: props.userData?.customer?.customers_stres ? "yes" : null,
      link: props.userData?.customer?.customers_stres
        ? "user.views.test_jatidiri_stres"
        : null,
      image: new URL("@/assets/icons/jatidiri-stres.svg", import.meta.url).href,
    },
    {
      name: "Jatidiri Kendali Mental",
      desc: "Kesehatan Mental adalah alat tes psikologis yang dirancang untuk mengukur tingkat kesehatan mental individu berdasarkan kondisi dan pikiran Anda selama seminggu terakhir.",
      resulut: props.userData?.customer?.customers_mental ? "yes" : null,
      link: props.userData?.customer?.customers_mental
        ? "user.views.test_jatidiri_mental"
        : null,
      image: new URL("@/assets/icons/jatidiri-mental.svg", import.meta.url)
        .href,
    },
    {
      name: "Jatidiri Potensi",
      desc: "Alat test untuk mengidentifikasi, menilai, dan memetakan potensi serta kompetensi individu dalam suatu organisasi atau bahkan pada tingkat individu",
      resulut: props.userData?.customer?.customers_mapping ? "yes" : null,
      link: props.userData?.customer?.customers_mapping
        ? "user.views.test_talen_mapping"
        : null,
      image: new URL("@/assets/icons/talent-mapping.svg", import.meta.url).href,
    },
  ].filter((a) => a.resulut !== null)
);

// filter data sesuai search
const filteredAssesments = computed(() => {
  let list = assesments.value.filter((a) => a.resulut !== null); // buang yang null
  if (!searchQuery.value) return list;
  return list.filter(
    (a) =>
      a.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      a.desc.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});


const apiBase = import.meta.env.VITE_API_BASE_URL;
const downloadCertificate = async () => {
    const token = Cookies.get("token");
    try {
    const response = await axios.post(
      `${apiBase}export/result-pdf`,
      null,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response:', response);

    // Cek apakah response berupa PDF atau JSON error (data kosong)
    const contentType = response.headers['content-type'];

    if (contentType.includes('application/json')) {
      // Baca isi blob dan convert ke JSON
      const text = await response.data.text();
      const errorData = JSON.parse(text);
      Swal.fire({
        icon: 'info',
        title: 'Data tidak ditemukan',
        text: errorData.message || 'Tidak ada data yang cocok dengan filter yang dipilih.',
      });
      return;
    }

    // Jika tidak error, buat link download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jatidiri.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error('Gagal export PDF:', error);
    Swal.fire({
      icon: 'warning',
      title: 'Gagal export PDF',
      text: 'Data Yang anda cari kosong, silahkan pilih filter kembali!',
    });
  }
}
</script>

<style>
@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  70% {
    box-shadow: 0 0 0 12px rgba(59, 130, 246, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
  }
}

.pulse-button {
  animation: pulse-glow 1.5s infinite;
}
</style>
