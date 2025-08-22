<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  uploadedImages: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:uploadedImages'])

const uploadedImages = computed({
  get: () => props.uploadedImages,
  set: (value) => emit('update:uploadedImages', value)
})

const fileInput = ref(null)

const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('border-primary');
};

const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-primary');
};

const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('border-primary');

    const files = event.dataTransfer.files;
    handleFiles(files);
};

const handleFileInput = (event) => {
    const files = event.target.files;
    handleFiles(files);
};

const handleFiles = (files) => {
    const newImages = [...uploadedImages.value];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                newImages.push({
                    id: Date.now() + i,
                    url: e.target.result,
                    file: file
                });
                uploadedImages.value = newImages;
            };
            reader.readAsDataURL(file);
        }
    }
};

const removeImage = (id) => {
    uploadedImages.value = uploadedImages.value.filter(img => img.id !== id);
};

const addMoreImages = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
    input.onchange = handleFileInput;
    input.click();
};
</script>

<template>
    <!-- Tampilkan input drag & drop jika belum ada gambar yang diupload -->
    <div v-if="uploadedImages.length === 0"
        class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-4 flex flex-col gap-2 justify-center items-center border-2 border-dashed border-gray-300"
        @dragover="handleDragOver" @dragleave="handleDragLeave" @drop="handleDrop">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
            fill="none">
            <path
                d="M4.38818 19.3984C4.38821 19.8185 4.45111 20.2382 4.6001 20.7373L4.64307 20.8799C5.27519 22.7655 7.01557 24.0322 8.97217 24.0322H26.7153L25.6138 27.5723C25.302 28.7759 24.1902 29.5926 22.9731 29.5928C22.7356 29.5926 22.4989 29.5615 22.269 29.501L3.36865 24.3838C1.91083 23.9771 1.04203 22.4512 1.42334 20.9795L4.38818 10.9727V19.3984ZM27.6108 2.40723C29.2952 2.40723 30.6665 3.79422 30.6665 5.49707V19.0889C30.6665 20.7918 29.2952 22.1787 27.6108 22.1787H9.27686C7.59297 22.1785 6.22217 20.7916 6.22217 19.0889V5.49707C6.22217 3.79436 7.59297 2.40745 9.27686 2.40723H27.6108ZM9.27686 4.87891C8.93982 4.87913 8.6665 5.15604 8.6665 5.49707V17.1602L12.0396 13.751C12.8744 12.9059 14.2349 12.9059 15.0708 13.751L16.5493 15.2422L21.0894 9.73438C21.4951 9.24249 22.0891 8.95769 22.7222 8.9541C23.3588 8.96876 23.9513 9.22851 24.3608 9.71387L28.2222 14.2686V5.49707C28.2222 5.1559 27.9484 4.87891 27.6108 4.87891H9.27686ZM12.3335 6.11426C13.6815 6.11448 14.7778 7.22307 14.7778 8.58594C14.7777 9.94868 13.6814 11.0574 12.3335 11.0576C10.9854 11.0576 9.88833 9.94876 9.88818 8.58594C9.88818 7.22299 10.9853 6.11426 12.3335 6.11426Z"
                fill="#A3A3A3" />
        </svg>
        <div class="text-center">
            <p class="text-xs font-semibold"><span class="text-sky-500">Click to upload</span>
                or
                drag and drop</p>
            <p class="text-[11px] text-[#A3A3A3]">JPG, JPEG, PNG less than 1MB</p>
        </div>
        <input type="file" multiple accept="image/*" class="hidden" @change="handleFileInput"
            ref="fileInput">
        <button @click="fileInput.click()"
            class="mt-2 px-4 py-2 bg-primary text-white rounded-lg text-sm">
            Upload Gambar
        </button>
    </div>

    <!-- Tampilkan gambar yang sudah terupload -->
    <div v-else
        class="w-full bg-[#F5F5F5] rounded-lg text-sm md:text-base p-4 border-dashed border border-gray-300 flex flex-wrap items-center gap-4">
        <!-- Gambar yang sudah terupload -->
        <div v-for="image in uploadedImages" :key="image.id" class="relative">
            <img :src="image.url" alt="Uploaded image"
                class="w-24 h-24 rounded-xl object-contain">
            <button @click="removeImage(image.id)"
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                &times;
            </button>
        </div>
        <!-- Input untuk menambah gambar -->
        <div class="w-24 h-24 rounded-xl bg-transparent flex justify-center items-center border border-dashed border-gray-300 cursor-pointer"
            @click="addMoreImages">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
                fill="none">
                <path
                    d="M16.0002 1.33325C13.0994 1.33325 10.2637 2.19344 7.85181 3.80503C5.43989 5.41662 3.56002 7.70724 2.44994 10.3872C1.33985 13.0672 1.0494 16.0162 1.61532 18.8612C2.18124 21.7063 3.5781 24.3196 5.62927 26.3708C7.68044 28.422 10.2938 29.8188 13.1388 30.3848C15.9839 30.9507 18.9329 30.6602 21.6129 29.5501C24.2928 28.4401 26.5835 26.5602 28.1951 24.1483C29.8067 21.7364 30.6668 18.9007 30.6668 15.9999C30.6623 12.1115 29.1155 8.38363 26.366 5.63409C23.6165 2.88455 19.8886 1.33784 16.0002 1.33325ZM22.6668 17.3333H17.3335V22.6666C17.3335 23.0202 17.193 23.3593 16.943 23.6094C16.6929 23.8594 16.3538 23.9999 16.0002 23.9999C15.6465 23.9999 15.3074 23.8594 15.0574 23.6094C14.8073 23.3593 14.6668 23.0202 14.6668 22.6666V17.3333H9.3335C8.97988 17.3333 8.64074 17.1928 8.39069 16.9427C8.14065 16.6927 8.00017 16.3535 8.00017 15.9999C8.00017 15.6463 8.14065 15.3072 8.39069 15.0571C8.64074 14.8071 8.97988 14.6666 9.3335 14.6666H14.6668V9.33325C14.6668 8.97963 14.8073 8.64049 15.0574 8.39044C15.3074 8.14039 15.6465 7.99992 16.0002 7.99992C16.3538 7.99992 16.6929 8.14039 16.943 8.39044C17.193 8.64049 17.3335 8.97963 17.3335 9.33325V14.6666H22.6668C23.0205 14.6666 23.3596 14.8071 23.6096 15.0571C23.8597 15.3072 24.0002 15.6463 24.0002 15.9999C24.0002 16.3535 23.8597 16.6927 23.6096 16.9427C23.3596 17.1928 23.0205 17.3333 22.6668 17.3333Z"
                    fill="#A3A3A3" />
            </svg>
        </div>
    </div>
</template>
