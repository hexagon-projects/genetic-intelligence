<template>
    <div class="flex flex-col mb-7">
        <div class="mt-10 lg:mx-8 mb-3">
          <h5 class="text-lg font-semibold dark:text-white-light">Silahkan Upload Foto Tulisan Test Anda</h5>
        </div>
        <article aria-label="File Upload Modal" class="h-full w-full flex flex-col">
            <!-- ondrop="dropHandler(event);" ondragover="dragOverHandler(event);" ondragleave="dragLeaveHandler(event);" ondragenter="dragEnterHandler(event); -->
            <section class="h-full overflow-auto lg:p-8 pt-0 w-full flex flex-col">
              <div class="flex items-center justify-center w-full">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold" id="click-to-upload">Click to upload</span></p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 800x400px)</p>
                    </div>
                    <input ref="fileInput" id="dropzone-file" type="file" accept="image/*" class="hidden" @change="handleFileChange"/>
                </label>
              </div>
            </section>
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

    const reviewImage = computed(() => store.getters.getReviewImage)
    
    const fileInput = ref(null);
    const files = ref([]);

    const openFileInput = () => {
      fileInput.value.click();
    };

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        files.value = [selectedFile];
        store.commit('reviewImage', files.value)

        document.getElementById("click-to-upload").innerHTML = files.value[0].name
      } else {
        files.value = [];
        store.commit('reviewImage', null)
      }
    };

    return {
      fileInput,
      files,
      userData,
      openFileInput,
      handleFileChange,
      reviewImage
    };
  },
}
</script>