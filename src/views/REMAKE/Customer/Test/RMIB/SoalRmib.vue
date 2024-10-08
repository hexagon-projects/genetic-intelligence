<template>
    <div class="w-full h-auto flex justify-center">
        <div class="mx-[30px] md:mx-[60px] w-[872px] h-auto p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
            <div class="w-full flex flex-col justify-between items-center gap-5 relative">
                <!-- Heading dan Instruksi -->
                <div class="flex flex-col w-full">
                    <span class="text-black text-2xl md:text-3xl font-semibold font-['Sora'] leading-9 lg:text-left">
                        Tentukan Urutan Prioritas Pekerjaan
                    </span>
                </div>
                <div class="flex flex-col w-full">
                    <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal text-justify md:mb-2">
                        Pilih pekerjaan dari daftar berikut dengan memberikan nomor (1 hingga 12) sesuai minat kamu, 1 untuk yang paling kamu sukai dan 12 untuk yang paling tidak kamu sukai.
                    </span>
                </div>
                <span class="text-sm font-semibold font-['Roboto'] text-[#3030f8] text-center md:hidden absolute top-6 right-2">
                    Tipe Soal: {{ typeSoal }}
                </span>
            </div>

            <!-- List Pekerjaan dan Input Urutan -->
            <div class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center">
                <div v-for="(job, index) in jobs" :key="index" class="w-full flex items-center justify-between max-w-[900px] mb-3">
                    <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/2 text-left">{{ job }}</label>
                    <input type="text" class="w-[157px] md:w-[180px] p-2 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
                </div>
            </div>

            <!-- Button Selanjutnya -->
            <button @click="nextSoal" class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full flex justify-center items-center gap-3">
                <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Selanjutnya</div>
                <div class="w-6 h-6 relative">
                    <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                </div>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import initAPI from '@/api/api';

// State untuk data jobs dan tipe soal
const jobs = ref([]);
const typeSoal = ref('A'); // Default tipe soal pertama adalah A
const soalIndex = ref(0); // Menggunakan index untuk melacak soal keberapa yang sedang ditampilkan
const allQuestions = ref([]); // Semua soal yang diambil dari API

// Fungsi untuk get data dari API
const getUserData = async () => {
    try {
        const token = Cookies.get('token');
        const response = await initAPI('get', 'rmib/questions?gender=1', null, token);
        allQuestions.value = response.data.data; // Menyimpan semua soal dalam allQuestions
        updateSoal(); // Panggil fungsi untuk mengupdate soal pertama
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Terjadi kesalahan saat mengambil data user',
            showConfirmButton: false,
            timer: 2000
        });
    }
};

// Fungsi untuk mengupdate soal yang ditampilkan
const updateSoal = () => {
    const currentSoal = allQuestions.value[soalIndex.value];
    jobs.value = currentSoal.job.map(job => job.name); // Ambil nama pekerjaan dari soal saat ini
    typeSoal.value = currentSoal.type; // Set tipe soal saat ini
};

// Fungsi untuk menuju soal berikutnya
const nextSoal = () => {
    if (soalIndex.value < allQuestions.value.length - 1) {
        soalIndex.value++; // Naikkan index untuk soal berikutnya
        updateSoal(); // Update soal yang akan ditampilkan
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Selesai',
            text: 'Semua soal telah selesai diisi!',
            showConfirmButton: true,
        });
    }
};

// Panggil API saat komponen dipasang
onMounted(() => {
    getUserData();
});
</script>
