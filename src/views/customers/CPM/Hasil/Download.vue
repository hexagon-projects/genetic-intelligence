<template>
    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <div v-if="popupMessage" class="flex flex-col gap-3 font-roboto">
            <span>
                {{ popupMessage }}
            </span>
            <button @click="toCPM" class="bg-[#3030f8] px-4 py-2 rounded-lg text-white">
                Tes Sekarang
            </button>
        </div>
        <h3 v-if="!popupMessage">Download in <span class="text-[#3030f8]">{{ countdown }}</span> seconds...</h3>
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
                                <span v-if="!loading">{{ userInfo.tanggal_tes }}</span>
                                <div v-else class="skeleton w-[100px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            
                            <!-- Usia -->
                            <div class="flex items-center gap-2">
                                <span>Usia: </span>
                                <span v-if="!loading">{{ userInfo.usia }}</span>
                                <div v-else class="skeleton w-[130px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                            <div class="flex items-center gap-2">
                                <span>Durasi Test: </span>
                                <span v-if="!loading">{{ userInfo.durasi_test }}</span>
                                <div v-else class="skeleton w-[130px] h-[16px] bg-gray-300 rounded-md"></div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-1">
                        <div class="bg-[#3030f8] bg-opacity-50 h-[48px] px-4 py-2 rounded-lg flex flex-col justify-center items-center">
                            <span class="uppercase font-sora text-xs text-center text-white">
                                rahasia
                            </span>
                            <span class="italic font-sora text-xs text-center text-white">
                                Conventional
                            </span>
                        </div>

                        <div class="bg-[#3030f8] bg-opacity-50 h-[32px] px-4 py-2 rounded-lg flex flex-col items-center">
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
                           1. Sub tes <span class="font-bold">SET-A</span> yaitu sebanyak 
                           <span class="font-bold text-[#3030f8]">{{ cpmInfo.set_a }}</span>. 
                           soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                        <span class="font-roboto text-[#4f5666] text-sm">
                           2. Sub tes <span class="font-bold">SET-AB</span> yaitu sebanyak 
                           <span class="font-bold text-[#3030f8]">{{ cpmInfo.set_ab }}</span>. 
                           soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                        <span class="font-roboto text-[#4f5666] text-sm">
                           3. Sub tes <span class="font-bold">SET-B</span> yaitu sebanyak 
                           <span class="font-bold text-[#3030f8]">{{ cpmInfo.set_a }}</span>. soal mampu dijawab dengan benar dari 12 soal yang tersedia.
                        </span>
                    </div>

                    <h1 class="mt-3 font-roboto text-[#4f5666] text-sm">
                        Dengan demikian klarifikasi IQ Ananda berada pada grade 
                        <span class="font-bold">
                            {{ cpmInfo.grade }}
                        </span> 
                        dengan arti 
                        <span class="font-bold">{{ cpmInfo.type }}</span>
                    </h1>
                </div>
                <!-- End Rangkuman -->

                <div class="html2pdf__page-break"></div>

                <!-- Penjelasan -->
                <div class="mt-10 w-full max-w-2xl flex flex-col gap-2">
                    <h1 class="text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-7">
                        Penjelasan
                    </h1>

                    <h1 class="mb-3 text-center text-[#4f5666] text-2xl font-semibold font-sora leading-7">
                        {{ cpmInfo.type }}
                    </h1>

                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">
                            {{ cpmInfo.penjelasan }}
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
                            {{ cpmInfo.saran }}
                        </span>
                    </div>
                </div>
                <!-- End Saran -->

                <!-- Empati -->
                <div class="mt-10 w-full max-w-2xl flex flex-col gap-2">
                    <h1 class="text-center text-[#0b0b79] text-2xl font-semibold font-sora leading-7">
                        Pentingnya Pemahaman dan Empati
                    </h1>
                    
                    <div class="flex flex-col gap-1">
                        <span class="font-roboto text-[#4f5666] text-sm">
                            {{ cpmInfo.pemahaman_empati }}
                        </span>
                    </div>
                </div>
                <!-- End Empati -->
                
                <div class="mt-16 w-full max-w-2xl flex flex-col items-center gap-2">
                    <h1 class="text-center text-[#24272e] text-base font-semibold font-sora leading-7">
                        PIMPINAN PSIKOLOG,
                    </h1>

                    <div class="flex">
                        <img class="w-1/2 mx-auto" src="@/assets/img/cpm/barcode-bu-miryam.png" alt="barcode">
                    </div>

                    <div class="flex flex-col items-center">
                        <span class="font-roboto text-[#24272e] text-base">
                            Miryam A. Sigarlaki, M.Psi.Psikolog
                        </span>
                        <span class="font-roboto text-[#24272e] text-base">
                            Kepala Psikologi Jatidiri
                        </span>
                        <span class="font-roboto text-[#24272e] text-base">
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
import { useRouter } from 'vue-router';

const router = useRouter()
const loading = ref(false)
const userId = ref(null)
const showPopup = ref(false);
const countdown = ref(5); // Countdown duration in seconds
const countdownInterval = ref(null);
const popupMessage = ref("");

const toCPM = () => {
    router.push({name: 'user.views.cpm'})
}

const userInfo = ref({
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tanggal_tes: '',
    usia: '',
    durasi_test: ''
})

const cpmInfo = ref({
    set_a: '',
    set_ab: '',
    set_b: '',
    grade: '',
    type: '',
    penjelasan: '',
    saran: '',
    pemahaman_empati: ''
})

function formatDateToCustomFormat(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() memberikan bulan dari 0-11, jadi tambahkan 1
  const monthFormatted = month < 10 ? `0${month}` : month; // Pastikan bulan selalu 2 digit
  return `${year}${monthFormatted}`;
}

const today = new Date();
const formattedDate = formatDateToCustomFormat(today);

const getCPMInfo = async(userId) => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('get', 'customers/cpm/'+userId, null, token)
        // console.log(`user info cpm`,response.data)
    
        userInfo.value.tanggal_tes = response.data[0].test_date
        userInfo.value.usia = response.data[0].age
        userInfo.value.durasi_test = response.data[0].time
        cpmInfo.value.set_a = response.data[0].cpm_scores.a
        cpmInfo.value.set_ab = response.data[0].cpm_scores.ab
        cpmInfo.value.set_b = response.data[0].cpm_scores.b
        cpmInfo.value.grade = response.data[0].cpm.grade
        cpmInfo.value.type = response.data[0].cpm.name
        cpmInfo.value.penjelasan = response.data[0].cpm.desc
        cpmInfo.value.saran = response.data[0].cpm.suggestion
        cpmInfo.value.pemahaman_empati = response.data[0].cpm.warning
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data tes CPM',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        })
    } finally {
        loading.value = false
    }
}

const getUserInfo = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
        // console.log(`user info`,response.data)
    
        userId.value = response.data.customer.id
        userInfo.value.nama = response.data.customer.name
        userInfo.value.jenis_kelamin = response.data.customer.gender
        userInfo.value.tanggal_lahir = response.data.customer.birth_date

        if (response.data.customer.customers_cpm) {
            await getCPMInfo(userId.value);
            startCountdown();
        } else {
            popupMessage.value = "Kamu belum melakukan test CPM";
            showPopup.value = true;
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data pengguna',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        })
    } finally {
       await getCPMInfo(userId.value)
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
    // startCountdown()
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