<template>
  <div class="w-full h-auto flex justify-center">
      <div class="mx-[30px] md:mx-[60px] w-[872px] h-auto p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
          <div class="w-full flex flex-col justify-between items-center gap-5 relative">
              <div class="text-left lg:text-center">
                  <span class="text-black text-3xl md:text-3xl font-semibold font-['Sora'] leading-9">
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
              <span class="text-sm font-semibold font-['Roboto'] text-[#3030f8] text-center hidden md:block mt-2">
                  Tipe Soal: {{ typeSoal }}
              </span>
          </div>
          <div v-if="loading" class="w-full mx-[30px] md:mx-[60px] flex justify-center items-center">
              <div class="preloader-overlay">
                  <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
              </div>
          </div>
          <div v-else class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center">
              <div v-for="(job, index) in jobs" :key="index" class="w-full flex items-center justify-between max-w-[900px] mb-3">
                  <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/2 text-left">{{ job }}</label>
                  <input v-model="priorities[index]" class="w-[157px] md:w-[180px] p-2 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
              </div>
          </div>
          <button @click="nextSoal" type="submit" class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full flex justify-center items-center gap-3" :disabled="loading">
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
import { defineEmits } from 'vue';

const emit = defineEmits(['soalSelesai']);

const props = defineProps({
  customerGen: Number
})

const jobs = ref([]);
const typeSoal = ref('A'); 
const soalIndex = ref(0); 
const allQuestions = ref([]); 
const priorities = ref([]); 
const completedQuestions = ref([]);
const loading = ref(false); 


const getDataPertanyaan = async () => {
  loading.value = true; 
  try {
      const token = Cookies.get('token');
      const response = await initAPI('get', 'rmib/questions?gender='+props.customerGen, null, token);
      // const response = await initAPI('get', 'rmib/questions?gender=1', null, token);
      allQuestions.value = response.data.data; // Menyimpan semua soal dalam allQuestions
      loadDataFromLocalStorage(); 
  } catch (error) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Terjadi kesalahan saat mengambil data user',
          showConfirmButton: false,
          timer: 2000
      });
  } finally {
      loading.value = false; 
  }
};

const saveDataToLocalStorage = () => {
  const currentSoalData = {
    typeSoal: typeSoal.value,
    jobs: jobs.value,
    priorities: priorities.value,
    soalIndex: soalIndex.value, // Simpan soalIndex ke local storage
  };

  // Cek apakah soal dengan tipe yang sama sudah ada di completedQuestions
  const existingQuestion = completedQuestions.value.find(question => question.typeSoal === typeSoal.value);

  // Simpan data soal saat ini dalam array completedQuestions jika belum ada
  if (!existingQuestion) {
    completedQuestions.value.push(currentSoalData);
  }

  // // Simpan per tipe soal
  localStorage.setItem(`soal-${typeSoal.value}`, JSON.stringify(currentSoalData));
  // Simpan soalIndex untuk melanjutkan dari soal yang sama saat halaman di-refresh
  localStorage.setItem('soalIndex', soalIndex.value);
  // Simpan seluruh soal yang telah diselesaikan dalam bentuk array ke local storage
  localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions.value));
};

const loadDataFromLocalStorage = () => {
  const savedSoalIndex = localStorage.getItem('soalIndex');
  if (savedSoalIndex !== null) {
    soalIndex.value = parseInt(savedSoalIndex); 
  }

  const currentSoalData = localStorage.getItem(`soal-${allQuestions.value[soalIndex.value]?.type}`);
  
  if (currentSoalData) {
    const parsedData = JSON.parse(currentSoalData);
    jobs.value = parsedData.jobs;
    priorities.value = parsedData.priorities;
    typeSoal.value = parsedData.typeSoal;
  } else {
    updateSoal();
  }

  // Ambil soal-soal yang sudah diselesaikan dari local storage
  const savedCompletedQuestions = localStorage.getItem('completedQuestions');
  if (savedCompletedQuestions) {
    completedQuestions.value = JSON.parse(savedCompletedQuestions);
  }
};

// Fungsi untuk mengupdate soal yang ditampilkan
const updateSoal = () => {
  loading.value = true; // Mulai loading sebelum soal baru diambil
  const currentSoal = allQuestions.value[soalIndex.value];
  
  setTimeout(() => {
    jobs.value = currentSoal.job.map(job => job.name); // Ambil nama pekerjaan dari soal saat ini
    typeSoal.value = currentSoal.type; // Set tipe soal saat ini
    priorities.value = Array(jobs.value.length).fill(''); // Reset priorities untuk soal baru
    
    loading.value = false; 
  }, 500); 
};

const nextSoal = async () => {
  loading.value = true;

  const uniquePriorities = new Set(priorities.value); // Set untuk cek duplikat
  const isFilled = priorities.value.every(val => val !== ''); // Cek apakah semua input terisi
  const isValidRange = priorities.value.every(val => val >= 1 && val <= 12); // Cek apakah range valid
  const hasDuplicates = uniquePriorities.size !== priorities.value.length; // Cek apakah ada duplikat

  if (!isFilled) {
      Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Harap isi semua urutan sebelum melanjutkan!',
          showConfirmButton: true,
      });
      loading.value = false; 
  } else if (!isValidRange) {
      Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Nomor urutan harus antara 1 hingga 12!',
          showConfirmButton: true,
      });
      loading.value = false; 
  } else if (hasDuplicates) {
      Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Tidak boleh ada nomor urutan yang sama!',
          showConfirmButton: true,
      });
      loading.value = false; 
  } else {
      // Jika validasi lolos, simpan data ke local storage
      saveDataToLocalStorage();

      // Jika soal masih ada lanjutkan ke soal berikutnya
      if (soalIndex.value < allQuestions.value.length - 1) {
          soalIndex.value++; // Naikkan index untuk soal berikutnya
          updateSoal(); 
      } else {
          // Simpan data semua soal yang telah diisi ke local storage
          localStorage.setItem('completedQuestions', JSON.stringify(completedQuestions.value));
          localStorage.setItem('selesaibagianpilihan', 'done'); 

          Swal.fire({
              icon: 'success',
              title: 'Selesai',
              text: 'Semua soal telah selesai diisi!',
              showConfirmButton: true,
          });
          loading.value = false;
          emit('soalSelesai');
      }
  }
};

// Panggil API saat komponen dipasang
onMounted(() => {
  getDataPertanyaan();
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
