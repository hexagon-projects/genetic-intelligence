<template>
    <div class="w-full h-auto flex justify-center">
        <div class="mx-[30px] md:mx-[80px] w-[872px] h-auto p-6 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
            <div class="w-full flex flex-col justify-between items-center gap-5 relative">
                <div class="text-ce lg:text-center">
                    <span class="text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9">
                        Tentukan Urutan Prioritas Pekerjaan
                    </span>
                </div>
                <div class="flex flex-col w-full">
                    <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal text-justify md:mb-2">
                        Pilih pekerjaan dari daftar berikut dengan memberikan nomor (1 hingga 12) sesuai minat kamu, 1 untuk yang paling kamu sukai dan 12 untuk yang paling tidak kamu sukai.
                    </span>
                </div>
                <span class="text-sm font-semibold font-['Roboto'] text-[#3030f8] text-center md:block mt-2">
                    Tipe Soal: {{ typeSoal }}
                </span>
                <div v-if="timerStarted" class="flex items-center justify-end w-full gap-1 text-right">
                    <h1 class="font-roboto text-sm md:text-md lg:text-md font-normal">Waktu berjalan:</h1>
                    <span class="font-roboto text-sm md:text-md lg:text-md font-normal">{{ formatTime }}</span>
                </div>
            </div>
            <div v-if="loading" class="w-full mx-[30px] md:mx-[60px] flex justify-center items-center">
                <div class="preloader-overlay">
                    <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
                </div>
            </div>
            <div v-else class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center">
                <div v-for="(job, index) in jobs" :key="index" class="w-full flex items-center justify-between max-w-[900px] mb-3">
                    <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/2 text-left">{{ job }}</label>
                    <select v-model="jawaban[index]" class="w-[157px] md:w-[180px] p-2 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500">
                        <option value="" disabled>Pilih Urutan 1-12</option>
                        <option v-for="number in availableNumbers(index)" :key="number" :value="number">{{ number }}</option>
                    </select>
                </div>
            </div>
            <button @click="btnAction" type="submit" class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full flex justify-center items-center gap-3" :disabled="loading">
                <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Selanjutnya</div>
                <div class="w-6 h-6 relative">
                    <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, defineEmits, defineProps, onBeforeUnmount } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie';
import initAPI from '@/api/api';

const emit = defineEmits(['soalSelesai']);

const props = defineProps({
    customerGen: Number
});

const timerStarted = ref(false);
const typeSoal = ref('A');
const loading = ref(false);
const soal = ref(0);
const jobs = ref([]);
const jawaban = ref([]); 
const listsoal = ref([]);
const listJawaban = ref([]); 
const secondsElapsed = ref(0); 

let interval = null; 

const getQuestion = async () => {
    loading.value = true;
    try {
        const token = Cookies.get('token');
        const response = await initAPI('get', `rmib/questions?gender=${props.customerGen}`, null, token);

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
            listsoal.value = response.data.data; 
            updateSoal(); 
        } else {
            throw new Error('Invalid response structure.');
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Terjadi kesalahan saat mengambil data user',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        loading.value = false;
    }
};

const updateSoal = () => {
    loading.value = true; 
    const currentSoal = listsoal.value[soal.value]; 

    if (currentSoal) {
        jobs.value = currentSoal.job.map(job => job.name); 
        typeSoal.value = currentSoal.type; 
        jawaban.value = Array(jobs.value.length).fill(''); 

        const savedAnswers = localStorage.getItem('userAnswers');
        if (savedAnswers) {
            listJawaban.value = JSON.parse(savedAnswers);
            jawaban.value = listJawaban.value[soal.value]?.data || Array(jobs.value.length).fill(''); 
        }

        const savedTime = localStorage.getItem('secondsElapsed');
        if (savedTime) {
            secondsElapsed.value = parseInt(savedTime, 10); 
        }

        if (!timerStarted.value) {
            startTimer(); 
        }
    } else {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Tidak ada soal lagi!',
            showConfirmButton: true
        });
    }
    loading.value = false;
};

const startTimer = () => {
    timerStarted.value = true; 

    interval = setInterval(() => {
        secondsElapsed.value++;
        localStorage.setItem('secondsElapsed', secondsElapsed.value);
    }, 1000);
};

const stopTimer = () => {
    if (interval) {
        clearInterval(interval);
        interval = null;
        timerStarted.value = false;
    }
};

// Format time (mm:ss)
const formatTime = computed(() => {
    const minutes = Math.floor(secondsElapsed.value / 60);
    const seconds = secondsElapsed.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const indexToLetter = (index) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[index] || 'Z'; 
};

const availableNumbers = (currentIndex) => {
    const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
    return numbers.filter(number => !jawaban.value.includes(number) || jawaban.value[currentIndex] === number);
};

const initNextQuestion = () => {
    loading.value = true;

    const uniquePriorities = new Set(jawaban.value);
    const isFilled = jawaban.value.every(val => val !== '');
    const isValidRange = jawaban.value.every(val => val >= 1 && val <= 12);
    const hasDuplicates = uniquePriorities.size !== jawaban.value.length;

    if (!isFilled) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Harap isi semua urutan sebelum melanjutkan!',
            showConfirmButton: true,
            customClass: {
                confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            },
        });
        loading.value = false;
        return;
    }

    if (!isValidRange) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Nomor urutan harus antara 1 hingga 12!',
            showConfirmButton: true,
            customClass: {
                confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            },
        });
        loading.value = false;
        return;
    }

    if (hasDuplicates) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Tidak boleh ada nomor urutan yang sama!',
            showConfirmButton: true,
            customClass: {
                confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
            },
        });
        loading.value = false;
        return;
    }

    Swal.fire({
        icon: 'question',
        title: 'Pindah ke soal selanjutnya?',
        text: 'Sudah yakin dengan jawabanmu?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "Ya, yakin",
        cancelButtonText: "Batal",
        customClass: {
            confirmButton: 'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4',
            cancelButton: 'bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded'
        },
        buttonsStyling: false // WAJIB supaya customClass tidak di-override
    }).then(async (result) => {
        if (result.isConfirmed) {
            const answer = {
                "section": indexToLetter(soal.value),
                "data": jawaban.value
            };
            listJawaban.value[soal.value] = answer; 
            localStorage.setItem('userAnswers', JSON.stringify(listJawaban.value)); 
            soal.value++; 

            if (soal.value < listsoal.value.length) {
                updateSoal(); 
            } else {
                stopTimer(); 
                localStorage.setItem('soalrmib1', 'selesai'); 
                emit('soalSelesai'); 
            }
        }
        loading.value = false;
    });
};

const btnAction = () => {
    initNextQuestion();
};

onMounted(async () => {
    await getQuestion();

    const finishedFlag = localStorage.getItem(`soalrmib1`);
    if (finishedFlag === 'selesai') {
        soal.value++; 
        updateSoal(); 
    }
});

onBeforeUnmount(() => {
    stopTimer();
});

</script>

<style scoped>
.preloader-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
}

@keyframes spin {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
}
</style>