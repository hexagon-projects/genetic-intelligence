<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="font-myFont text-black font-semibold">2. Upload Gambarmu</h1>
        <article aria-label="File Upload Modal" class="h-full w-full flex flex-col">
            <!-- ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event); -->
            <section class="h-full overflow-auto p-8 w-full flex flex-col">
                <header class="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <p class="mb-1 font-myFont font-semibold text-gray-500 flex flex-wrap justify-center">
                    <span>Pilih FIle Kamu</span>
                </p>
                <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange"
                />
                <button class="font-myFont text-white text-sm mt-2 rounded-lg px-3 py-1 bg-secondary hover:opacity-75 hover:shadow-lg"
                    @click="openFileInput">
                    Upload Gambar
                </button>
                </header>

                <h1 class="pt-8 pb-3 font-myFont font-semibold sm:text-lg text-center text-gray-900">Review File</h1>

                <ul id="gallery" class="flex flex-1 flex-wrap -m-1">
                    <li v-if="files.length === 0" class="h-full w-full text-center flex flex-col items-center justify-center">
                        <img class="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                        <span class="font-myFont text-small text-gray-500">Tidak ada file yang dipilih</span>
                    </li>
                    <li class="h-full w-full text-center flex flex-col items-center justify-center" v-else>
                        <img :src="filePreviewUrl(files[0])" alt="file preview" class="items-center w-60 h-full object-cover" />
                        <span class="text-small text-gray-500">{{ files[0].name }}</span>
                    </li>
                </ul>

            </section>
            <button @click="submitForm()" class="px-2 py-2 w-1/2 mx-auto md:w-1/4 lg:w-1/4 self-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">Submit</button>
        </article>
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
    
    const fileInput = ref(null);
    const files = ref([]);

    const openFileInput = () => {
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        files.value = [selectedFile];
      } else {
        files.value = [];
      }
    };

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
      openFileInput,
      handleFileChange,
      filePreviewUrl,
      submitForm
    };
  },
}
</script>