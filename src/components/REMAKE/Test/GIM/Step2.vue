<template>
     <div class="w-[70vw] md:w-[440px] lg:w-[800px] flex flex-col gap-4">
        <div class="flex flex-col justify-start items-start gap-0.5">
            <div class="self-stretch text-[#0b0b0b] text-base md:text-lg font-semibold font-['Roboto'] leading-7">Media Upload</div>
            <div class="self-stretch h-5 text-[rgb(109,109,109)] text-sm md:text-base font-normal font-['Roboto'] leading-normal">Silahkan Upload Foto Tulisan Test Anda</div>
        </div>

        <label for="dropzone-file" class="cursor-pointer w-full h-[296px] rounded-lg border-[2px] border-[#3030f8] border-dashed flex-col justify-center items-center gap-3 flex">
            <div class="w-9 h-9 relative">
                <img src="@/assets/icons/test_gim/form_upload.svg" alt="icon"/>
            </div>

            <div class="z-20 cursor-pointer h-12 flex-col justify-start items-center gap-2 flex">
                <div class="justify-center items-start gap-1 inline-flex">
                    <span id="click-to-upload" class="text-black text-sm font-medium font-['Roboto'] leading-tight">Click to Upload</span>
                </div>
                <div class="text-center text-[#667084] text-sm font-normal font-['Roboto'] leading-tight">PNG, JPG or JPEG (MAX. 800x400px)</div>
                <!-- <input type="file" id="dropzone-file" accept="image/png, image/jpeg, image/jpg" class="hidden" /> -->
            </div>
            <input ref="fileInput" id="dropzone-file" type="file" accept="image/*" class="hidden" @change="handleFileChange"/>
        </label>
    </div>
</template>

<script setup>
    import { useStore } from 'vuex'
    import { ref } from 'vue';

    const props = defineProps({
        validasi: Object,
    });

    const emit = defineEmits(['update-validasi']);

    // Emit event when checkbox is changed
    const emitValidasiUpdate = (key, value) => {
        emit('update-validasi', key, value);
    };

    const store = useStore()
    
    const fileInput = ref(null);
    const files = ref([]);

    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];

      if (selectedFile) {
        files.value = [selectedFile];
        store.commit('reviewImage', files.value)

        document.getElementById("click-to-upload").innerHTML = files.value[0].name

        emit('update-validasi', 'isUpload', true);
      } else {
        files.value = [];
        store.commit('reviewImage', null)
        emit('update-validasi', 'isUpload', false);
      }
    };
</script>