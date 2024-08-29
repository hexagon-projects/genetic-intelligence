<template>
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <h3>Download in <span class="text-[#3030f8]">{{ countdown }}</span> seconds...</h3>
      </div>
    </div>

    <div class="bg-white h-full" id="toPDF">
        <section class="py-12">
            <div class="flex flex-col items-center">
                <img class="mb-3 w-[200px] h-[158.54px]" src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="logo" />
                <div class="self-stretch text-center text-[#0b0b79] text-3xl font-semibold font-sora leading-7">
                    Hasil Pemeriksaan Tes Kecerdasan
                </div>
            </div>
        </section>

        <section class="py-12">
            <div class="w-full flex flex-col items-center">
                <!-- Identitas -->
                <div class="mb-8 w-full max-w-2xl flex justify-between items-start">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-[#0b0b79] text-2xl font-semibold font-sora leading-7">Identitas</h1>

                        <div class="w-full max-w-2xl flex flex-col gap-2 text-[#4f5666] text-sm font-normal font-roboto leading-tight">
                            <!-- Nama -->
                            <div class="flex items-center gap-2">
                                <span>Nama: </span>
                                <span v-if="!loading">{{userInfo.nama }}</span>
                                <div v-else class="skeleton w-[120px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            
                            <!-- Jenis Kelamin -->
                            <div class="flex items-center gap-2">
                                <span>Jenis Kelamin: </span>
                                <span v-if="!loading">{{userInfo.jenis_kelamin }}</span>
                                <div v-else class="skeleton w-[90px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            
                            <!-- Tanggal Lahir -->
                            <div class="flex items-center gap-2">
                                <span>Tanggal Lahir: </span>
                                <span v-if="!loading">{{userInfo.tanggal_lahir }}</span>
                                <div v-else class="skeleton w-[110px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            
                            <!-- Tanggal tes -->
                            <div class="flex items-center gap-2">
                                <span>Tanggal tes: </span>
                                <span v-if="!loading">27-08-2024</span>
                                <div v-else class="skeleton w-[100px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            
                            <!-- Usia -->
                            <div class="flex items-center gap-2">
                                <span>Usia: </span>
                                <span v-if="!loading">8 Tahun 4 bulan 22 hari</span>
                                <div v-else class="skeleton w-[130px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="bg-[#3030f8] px-4 py-2 rounded-lg flex flex-col items-center">
                            <span class="uppercase font-sora text-xs text-white">
                                rahasia
                            </span>
                            <span class="italic font-sora text-xs text-white">
                                Conventional
                            </span>
                        </div>

                        <div class="bg-[#3030f8] px-4 py-2 rounded-lg flex flex-col items-center">
                            <span class="uppercase font-sora text-xs text-white">
                                JD-{{ formattedDate }}-818-{{ userId }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Rangkuman -->
                <div class="w-full max-w-2xl flex flex-col">
                    <h1 class="mb-3 font-roboto text-[#4f5666] text-sm">
                        Dari keseluruhan data yang diperoleh dari tes intelegensi CPM yang dilakukan oleh Ananda 
                        <span class="font-bold">{{ userInfo.nama }}</span>, sebagai Berikut: 
                    </h1>

                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">
                           1. Sub tes <span class="font-bold">SET-A</span> yaitu sebanyak ………. soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                        <span class="font-roboto text-[#4f5666] text-sm">
                           2. Sub tes <span class="font-bold">SET-AB</span> yaitu sebanyak ………. soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                        <span class="font-roboto text-[#4f5666] text-sm">
                           3. Sub tes <span class="font-bold">SET-B</span> yaitu sebanyak ………. soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                    </div>

                    <h1 class="mt-3 font-roboto text-[#4f5666] text-sm">
                        Dengan demikian klarifikasi IQ Ananda  berada pada grade ……… dengan arti …………………
                    </h1>
                </div>
                <!-- End Rangkuman -->

                <div class="html2pdf__page-break"></div>

                <!-- Penjelasan -->
                <div class="mt-10 w-full max-w-2xl flex flex-col gap-2">
                    <h1 class="text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-7">
                        Penjelasan
                    </h1>

                    <h1 class="text-center text-[#4f5666] text-2xl font-semibold font-sora leading-7">
                        Grade I: Superior (IQ sangat tinggi)
                    </h1>

                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">

                            Ananda <span class="font-bold">{{ userInfo.nama }}</span> memiliki IQ dengan kategori superior, ia memiliki kemampuan berpikir yang luar biasa dan di atas rata-rata dari anak seusianya. Ananda (nama) akan sangat cepat memahami konsep-konsep yang rumit, dapat menyelesaikan masalah kompleks dengan lebih mudah, dan memiliki kemampuan analitis serta logika yang tajam. Ananda (nama) biasanya akan dapat menunjukkan bakat dalam bidang akademik, sains, atau seni.
                        </span>
                    </div>
                </div>
                <!-- end penjelasan -->

                <!-- Saran -->
                <div class="mt-10 w-full max-w-2xl flex flex-col gap-2">
                    <h1 class="text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-7">
                        Saran
                    </h1>

                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">
                            Meskipun Ananda <span class="font-bold">{{ userInfo.nama }}</span> memiliki potensi luar biasa, penting untuk tetap mengasah kemampuan sosial dan emosionalnya. Keberhasilan tidak hanya bergantung pada kecerdasan, tetapi juga pada kerja sama tim, komunikasi, dan empati.
                        </span>
                    </div>
                </div>
                <!-- End Penjelasan -->

                <!-- Empati -->
                <div class="mt-10 w-full max-w-2xl flex flex-col gap-2">
                    <h1 class="text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-7">
                        Pentingnya Pemahaman dan Empati
                    </h1>
                    
                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">
                            Kecerdasan bukan satu-satunya faktor penentu kesuksesan atau kebahagiaan. Setiap orang memiliki kekuatan dan kelemahan masing-masing. Oleh karena itu, baik bagi diri kita maupun orang lain, penting untuk menghargai setiap individu apa adanya, memberikan dukungan, dan menekankan pada pengembangan pribadi di segala aspek kehidupan, bukan hanya intelektual.
                        </span>
                    </div>
                </div>
                <!-- End Empati -->
                
                <div class="mt-16 w-full max-w-2xl flex flex-col items-center gap-2">
                    <h1 class="text-center text-[#24272e] text-2xl font-semibold font-sora leading-7">
                        PIMPINAN PSIKOLOG,
                    </h1>

                    <div class="flex">
                        <img src="@/assets/img/cpm/barcode-bu-miryam.png" alt="barcode">
                    </div>

                    <div class="flex flex-col items-center">
                        <span class="font-roboto text-[#24272e] text-lg">
                            Miryam A. Sigarlaki, M.Psi.Psikolog
                        </span>
                        <span class="font-roboto text-[#24272e] text-lg">
                            Kepala Psikologi Jatidiri
                        </span>
                        <span class="font-roboto text-[#24272e] text-lg">
                            (SIPP: : 1048-SIPP-2023)
                        </span>
                    </div>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import initAPI from '@/api/api';
import Cookies from "js-cookie"
import html2pdf from 'html2pdf.js'

const loading = ref(false)
const userId = ref(null)
const showPopup = ref(false);
const countdown = ref(5); // Countdown duration in seconds
const countdownInterval = ref(null);

const userInfo = ref({
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tanggal_tes: '',
    usia: ''
})

function formatDateToCustomFormat(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() memberikan bulan dari 0-11, jadi tambahkan 1
  const monthFormatted = month < 10 ? `0${month}` : month; // Pastikan bulan selalu 2 digit
  return `${year}${monthFormatted}`;
}

const today = new Date();
const formattedDate = formatDateToCustomFormat(today);

const getUserInfo = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
        console.log(`user info`,response.data)
    
        userId.value = response.data.customer.id
        userInfo.value.nama = response.data.customer.name
        userInfo.value.jenis_kelamin = response.data.customer.gender
        userInfo.value.tanggal_lahir = response.data.customer.birth_date
    } catch (error) {
        console.log(`error`, error)
    } finally {
        loading.value = false
    }

}

const exportPDF = () => {
    html2pdf(document.getElementById('toPDF'), {
        margin: 1,
        filename: userInfo.value.nama+'_CPM.pdf',
        html2canvas:  { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
}

const startCountdown = () => {
  countdown.value = 5; // Set countdown duration
  showPopup.value = true;
  countdownInterval.value = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value <= 0) {
      clearInterval(countdownInterval.value);
      showPopup.value = false;

      if(!loading.value){
          exportPDF(); // Call exportPDF after countdown finishes
      }
    }
  }, 1000);
};

onMounted(() => {
    getUserInfo()
    startCountdown()
})

onUnmounted(() => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
  }
});
</script>

<style scoped>
.skeleton {
  background: linear-gradient(100deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}
</style>