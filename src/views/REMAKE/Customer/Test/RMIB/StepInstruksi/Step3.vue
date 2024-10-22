<template>
    <div class="flex flex-col items-center gap-[100px] pt-[85px] pb-[31px]">
        <span class="text-center text-[#667084] text-base font-normal font-['Roboto'] leading-normal">
           Bekerjalah secepatnya, dan tuliskan nomor-nomor sesuai dengan kesan dan keinginan Kamu yang pertama muncul.
        </span>

        <form id="rmibForm">
            <input type="hidden" id="customer_id" name="customer_id" :value="formData.customer_id">
            <input type="hidden" id="rmib_1_id" name="rmib_1_id" :value="formData.rmib_1_id">
            <input type="hidden" id="rmib_2_id" name="rmib_2_id" :value="formData.rmib_2_id">
            <input type="hidden" id="rmib_3_id" name="rmib_3_id" :value="formData.rmib_3_id">
            <input type="hidden" id="answers" name="answers" :value="formData.answers">
            <input type="hidden" id="essay_answers" name="essay_answers" :value="formData.essay_answers">
            <input type="hidden" id="time" name="time" :value="formData.time">
            <input type="hidden" id="age" name="age" :value="formData.age">
        </form>

        <button @click="submitcustomerId" class="hover:-translate-y-1 transition-all h-11 px-6 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
            <div class="text-white text-sm md:text-base font-normal font-['Roboto'] leading-normal">Mulai Tes</div>
        </button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import initAPI from '@/api/api'; 

const store = useStore();

const showSoal = () => {
  store.commit('setIsInstruksi', false);
  
  localStorage.setItem('isInstruksi', 'good udah baca intruksi');
};

const getCustomerId = () => {
    const userData = localStorage.getItem('userData');
    if (userData) {
        const parsedData = JSON.parse(userData); 
        return parsedData.id || ''; 
    }
    return ''; 
};

const formData = reactive({
  customer_id: getCustomerId(),  
  rmib_1_id: '',    
  rmib_2_id: '',    
  rmib_3_id: '',    
  answers: '',      
  essay_answers: '',
  time: '',         
  age: ''           
});

const submitcustomerId = async () => {

try {
  const token = Cookies.get('token'); 
  const customerId = formData.customer_id; 
  const data = new FormData();
  data.append('customer_id', customerId);
  data.append('answers', formData.answers ); 
  data.append('rmib_1_id', formData.rmib_1_id);
  data.append('rmib_2_id', formData.rmib_2_id);
  data.append('rmib_3_id', formData.rmib_3_id);
  data.append('essay_answers', formData.essay_answers);
  data.append('time', formData.time);
  data.append('age', formData.age);

  const response = await initAPI('post', 'rmib/hit', data, token);

if (response.status === 201) {
  console.log('yang test dengan customerId:', response.data);
} else {
  console.error('Error:', response.status, response.data);
}
} catch (error) {
  console.error('Request failed:', error);
} finally {
    showSoal();
}
};
</script>
