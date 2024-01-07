<template>
  <div v-if="reviewImage" class="flex flex-col mt-20">  
    <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
        <li v-if="!reviewImage" class="h-full w-full text-center flex flex-col items-center justify-center">
            <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
            <span class="font-myFont text-small text-gray-500">Tidak ada file yang dipilih</span>
        </li>
        <li v-else="reviewImage" class="h-full w-full text-center flex flex-col items-center justify-center mb-8">
            <img :src="filePreviewUrl(reviewImage[0])" alt="file preview" class="items-center w-150 h-full object-cover border-4 rounded-md" />
        </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue';
import initAPI from '../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'FormDeteksi',
    setup() {

    const store = useStore()
    const userData = computed(() => store.getters.getUserData)
    const reviewImage = computed(() => store.getters.getReviewImage)
    
    const fileInput = ref(null);
    const files = ref([]);

    const filePreviewUrl = (file) => {
      return file ? URL.createObjectURL(file) : null;
    };

    const submitForm = async () => {
      const formData = new FormData();
      formData.append('detection_image', files.value[0]);

      const customerId = userData.value.id
      const token = JSON.parse(localStorage.getItem('token'))

      try {
        console.log('form', formData)
        console.log('id', customerId)
        if(files.value.length > 0){
          const response = await initAPI(
            'post','customers/gim-result/upload-test/'+customerId, formData, token
          );
          if(response.status == 200){
            Swal.fire({
              icon: 'success',
              title: 'File di Upload',
              text: 'Deteksi GIM akan segera di proses',
              showConfirmButton: false,
              timer: 2000
            });
          }
          const updatedCustomer = await initAPI('get', 'customers?id='+customerId, null, token)
          store.commit('user', updatedCustomer.data.data[0])
          console.log('update', updatedCustomer.data.data[0])
          // console.log('Response from API:', response.data);
        } else {
          Swal.fire({
              icon: 'error',
              title: 'Upload Gagal',
              text: 'Upload file terlebih dahulu',
              showConfirmButton: false,
              timer: 2000
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };

    return {
      fileInput,
      files,
      userData,
      filePreviewUrl,
      submitForm,
      reviewImage
    };
  },
}
</script>