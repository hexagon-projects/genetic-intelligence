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
                
                <!-- Menampilkan Tipe Soal -->
                <div class="w-full text-center">
                    <span class="text-base font-semibold font-['Roboto'] text-[#3030f8]">
                        Tipe Soal: {{ typeSoal }}
                    </span>
                </div>
            </div>

            <!-- List Pekerjaan dan Input Urutan -->
            <div class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center">
                <div v-for="(job, index) in jobs" :key="index" class="w-full flex items-center justify-between max-w-[900px] mb-3">
                    <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/2 text-left">{{ job }}</label>
                    <input 
                    type="text"
                    v-model="answers[index]"
                    class="w-[157px] md:w-[180px] p-2 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" 
                    placeholder="Masukkan Urutan 1-12"
                    />
                    <span v-if="errors[index]" class="text-red-500 text-xs">Field ini wajib di isi!
                    </span>
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

// State untuk jawaban dan error
const answers = ref(Array(jobs.value.length).fill(''));  // Menyimpan jawaban pengguna
const errors = ref(Array(jobs.value.length).fill(false)); // Menyimpan status error


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
    typeSoal.value = currentSoal.type; // Set tipe soal saat ini (A sampai I)

    // Reset answers dan errors
    answers.value = Array(jobs.value.length).fill(''); // Reset jawaban untuk soal baru
    errors.value = Array(jobs.value.length).fill(false); // Reset status error
};

// Fungsi untuk menuju soal berikutnya
const nextSoal = () => {
    let valid = true;

    // Periksa setiap jawaban, jika kosong tandai sebagai error
    answers.value.forEach((answer, index) => {
        if (!answer) {
            errors.value[index] = true; // Tandai sebagai error
            valid = false;
        } else {
            errors.value[index] = false; // Jika ada jawaban, reset error
        }
    });

    // Jika semua jawaban sudah valid, lanjutkan ke soal berikutnya
    if (valid) {
        if (soalIndex.value < allQuestions.value.length -1) {
            soalIndex.value++;
            updateSoal();
            answers.value = Array(jobs.value.length).fill(''); // Reset jawaban untuk soal berikutnya
            errors.value = Array(jobs.value.length).fill(false) // Reset status error
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Selesai',
                test: 'Semua soal telah selesai di isi!',
                showConfirmButton: true,
            });
        }
    } else {
        // Tampilkan pesan kesalahan jika ada jawaban yang kosong
        Swal.fire({
                icon: 'error',
                title: 'Error',
                test: 'Semua field harus di isi sebelum melanjutkan!',
                showConfirmButton: true,
        });
    }
};

// Panggil API saat komponen dipasang
onMounted(() => {
    getUserData();
});
</script>
