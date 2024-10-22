<template>
  <div class="flex flex-col items-center gap-[100px] pt-[85px] pb-[31px]">
      <span class="text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
         Bekerjalah secepatnya, dan tuliskan nomor-nomor sesuai dengan kesan dan keinginan Kamu yang pertama muncul.
      </span>

      <button @click="submitTestResult" class="hover:-translate-y-1 transition-all h-11 px-6 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
          <div class="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">Mulai Tes</div>
      </button>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { useStore } from 'vuex';
import axios from 'axios'; // Import Axios

const store = useStore()

const submitTestResult = async () => {
const userData = JSON.parse(localStorage.getItem('userData'));

const customerId = userData.data.customer.id
const customerRmibId = userData.data.customer.customers_rmib.id || ''; 

  const payload = {
      customer_id: customerId,
      rmib_1_id: null,
      rmib_2_id: null,
      rmib_3_id: null,
      answers: null,
      essay_answers: null,
      time: null,
      age: null,
      id: customerRmibId || null,
  };

  try {
      const response = await axios.post('https://staging.api.jatidiri.app/api/rmib/hit', payload);
      console.log('API Response:', response.data);
      // Store the returned customerRmibID from the API hit response to localStorage
      if (response.data && response.data.id) {
        localStorage.setItem('customerRmibId', response.data.id);
        console.log('Response Data', response.data)
      }
      handleStartTest();
  } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Customer ID tidak ditemukan. Harap periksa kembali atau hubungi admin.',
      showConfirmButton: true,
    });
  }
};


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

// Function to handle button click
const handleStartTest = () => {
const userData = getUserData();
store.commit('setIsInstruksi', false)

// Menyimpan status instruksi ke localStorage
localStorage.setItem('isInstruksi', 'done');

if (userData && userData.id) {
  // Valid customer ID found, proceed with starting the test
  localStorage.setItem('isInstruksi', 'good udah baca instruksi');
  
  // Proceed to the next step (e.g., showing questions or changing component)
  console.log('Mulai Tes dengan customer ID:', userData.id);
  
} else {
  // Show error if customer ID is not found
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: 'Customer ID tidak ditemukan. Harap periksa kembali atau hubungi admin.',
    showConfirmButton: true,
  });
}
};
</script>
