<template>
  <div class="w-full h-auto flex justify-center pb-[170px]">
    <div class="mx-[30px] md:mx-[80px] w-[872px] h-auto p-6 bg-white rounded-2xl shadow flex-col justify-center items-center gap-4 inline-flex">
      <div class="w-full flex flex-col lg:flex-row md:justify-between">
        <span class="text-black text-lg md:text-xl lg:text-2xl font-medium font-['Roboto'] leading-loose">
          Jawablah Pertanyaan Dibawah Ini
        </span>
      </div>

      <!-- Soal -->
      <div class="self-start w-full">
        <div class="flex flex-col mb-[50px]">
          <div class="text-black text-base font-normal font-['Roboto'] leading-normal text-justify">
            <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
              Tuliskan di bawah ini tiga (3) macam pekerjaan yang paling ingin Kamu lakukan atau paling Kamu sukai (tidak harus pekerjaan yang tercantum dalam daftar yang sebelumnya ada)
            </span>
          </div>
        </div>

        <!-- Input Jawaban Pekerjaan -->
        <div class="w-full flex flex-col gap-5">
          <div class="flex items-center">
            <span class="text-black text-base font-normal">1.</span>
            <input v-model="job1" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
          </div>
          <div class="flex items-center">
            <span class="text-black text-base font-normal">2.</span>
            <input v-model="job2" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
          </div>
          <div class="flex items-center">
            <span class="text-black text-base font-normal">3.</span>
            <input v-model="job3" type="text" class="w-full p-2 border rounded-md border-[#3030f8] text-[#667084] outline-none ml-2" placeholder="Masukkan pekerjaan yang paling Anda sukai" />
          </div>
        </div>
      </div>

      <!-- Button Kirim Jawaban -->
      <div class="flex flex-col items-center">
        <button @click="submitAnswers" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
          <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Kirim Jawaban</div>
          <div class="w-6 h-6 relative">
            <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { defineProps } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

// const props = defineProps({
//   customerRmibId: Number
// });

// Function to retrieve and parse userData from localStorage
const getUserData = () => {
  try{
const userData = localStorage.getItem('userData');
return userData ? JSON.parse(userData) : null;
} catch (error) {
  console.error("Error parsing userData from localStorage:", error);
  return null;
}
};

const userData = getUserData();

export default {
  data() {
    return {
      job1: '', // Jawaban pekerjaan pertama
      job2: '', // Jawaban pekerjaan kedua
      job3: '', // Jawaban pekerjaan ketiga
      customerRmibId: null // ID dari customer_rmib yang akan digunakan di payload
    };
  },
  created() {
    this.getCustomerRmibId(); // Ambil customer_rmib_id saat komponen di-load
  },
  methods: {
    getCustomerRmibId() {
      // Retrieve the data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log('UserData from localStorage:', userData);
      // Check if userData has the expected structure
      if (userData && userData.customers_rmib && userData.customers_rmib.id) {
        this.customerRmibId = userData.customers_rmib.id;
        console.log('Found customer_rmib_id:', this.customerRmibId); // Debug: Display the found ID
      } else {
        console.error('customer_rmib_id tidak tersedia atau bernilai null.');
      }
    },
    async submitAnswers() {
      const customerRmibId = userData?.customers_rmib ? userData.customers_rmib.id : null;
       // Log customerRmibId before proceeding
  console.log('Submitting answers with customerRmibId:', customerRmibId);
      // Ensure that customer_rmib_id exists before proceeding
      if (!customerRmibId) {
        console.error('customer_rmib_id tidak tersedia.');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'customer_rmib_id tidak ditemukan. Mohon cek kembali data Anda.',
          showConfirmButton: true,
        });
        return;
      }

      // Membuat payload berdasarkan struktur yang diinginkan
      const payload = {
        customer_rmib_id:customerRmibId, // Gunakan customer_rmib_id yang telah diambil
        time: new Date().toISOString().slice(11, 19), // Waktu dinamis sesuai waktu sekarang
        data: [
          { section: "A", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "B", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "C", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "D", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "E", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "F", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "G", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "H", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
          { section: "I", data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
        ],
        essay_answer: `1. ${this.job1}, 2. ${this.job2}, 3. ${this.job3}`
      };

      try {
        const response = await axios.post('https://staging.api.jatidiri.app/api/rmib/answer', payload);
        console.log('API Response:', response.data);
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Jawaban kamu berhasil dikirim!',
          showConfirmButton: true,
        });
      } catch (error) {
        console.error('Error submitting data:', error.response?.data || error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Terjadi kesalahan saat mengirim jawaban',
          showConfirmButton: true,
        });
      }
    }
  }
};
</script>