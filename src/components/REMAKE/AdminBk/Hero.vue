<template>
  <div class="w-full flex flex-col items-center justify-center">
    <!-- Wrapper untuk gambar dan tombol -->
    <div class="relative w-full">
      <img
        v-if="!heroImage"
        src="@/assets/img/login/jatidiri.png"
        class="object-cover w-full max-h-[400px] rounded-3xl"
        alt="hero"
      />
      <img
        v-else
        :src="heroImage"
        class="object-cover w-full max-h-[400px] rounded-3xl"
        alt="hero"
      />

      <!-- Tombol pojok kanan atas -->
      <button
        @click="showModal = true"
        class="absolute top-4 right-4 bg-white text-biru font-sora hover:bg-opacity-75 py-2 px-4 rounded-md flex items-center gap-2"
      >
        <img src="@/assets/icons/edit-bk.svg" alt="edit" />
        <small>Ubah Gambar</small>
      </button>
    </div>

    <!-- Modal Overlay -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      @click="closeModal"
    >
      <!-- Modal Content -->
      <div
        class="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Upload Gambar</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <!-- Modal Body -->
        <div class="p-6">
          <!-- Upload Area -->
          <div
            class="border-2 border-dashed rounded-lg p-8 text-center transition-colors"
            :class="
              isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            "
            @dragover.prevent="isDragOver = true"
            @dragleave.prevent="isDragOver = false"
            @drop.prevent="handleDrop"
          >
            <div v-if="!selectedImage" class="space-y-4">
              <div class="mx-auto w-12 h-12 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-600 mb-2">
                  Drag dan drop gambar di sini, atau
                </p>
                <label
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  <input
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleFileSelect"
                  />
                  Pilih File
                </label>
              </div>
              <p class="text-xs text-gray-500">PNG, JPG, GIF hingga 10MB</p>
            </div>

            <!-- Image Preview -->
            <div v-else class="space-y-4">
              <div class="relative">
                <img
                  :src="selectedImage.preview"
                  :alt="selectedImage.name"
                  class="max-w-full max-h-48 mx-auto rounded-lg shadow-sm"
                />
                <button
                  @click="removeImage"
                  class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m18 6-12 12" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
              <div class="text-sm text-gray-600">
                <p class="font-medium">{{ selectedImage.name }}</p>
                <p>{{ formatFileSize(selectedImage.size) }}</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mt-4 p-3 bg-red-50 border border-red-200 rounded-md"
          >
            <p class="text-sm text-red-600">{{ errorMessage }}</p>
          </div>

          <!-- Upload Progress -->
          <div v-if="isUploading" class="mt-4">
            <div
              class="flex items-center justify-between text-sm text-gray-600 mb-2"
            >
              <span>Mengupload...</span>
              <span>{{ uploadProgress }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                :style="{ width: uploadProgress + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end gap-3 p-6 border-t bg-gray-50"
        >
          <button
            @click="closeModal"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            @click="uploadImage"
            :disabled="!selectedImage || isUploading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ isUploading ? "Mengupload..." : "Upload" }}
          </button>
        </div>
      </div>
    </div>

    <!-- card -->
    <div
      class="flex w-[90%] md:w-4/5 bg-[#F0F7FD] bg-opacity-85 shadow-sm outline outline-1 outline-white rounded-3xl p-5 -mt-20 z-50"
    >
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div class="flex gap-3 items-center md:col-span-2">
          <img
            v-if="(userData.bk || userData.customer)?.profile == null"
            src="@/assets/img/profile-mock.png"
            class="w-20 h-20 rounded-full outline outline-1 outline-white hidden md:block"
            alt="profile"
          />
          <img
            v-else
            :src="
              (userData.bk || userData.customer)?.profile
                ? `${baseURL}/storage/${(userData.bk || userData.customer)?.profile}`
                : profileDefault
            "
            class="w-20 h-20 rounded-full outline outline-1 outline-white hidden md:block"
            alt="profile"
          />
          <div class="flex flex-col items-stretch">
            <small class="font-sora">Selamat Datang</small>
            <h1
              class="font-sora text-2xl font-semibold"
              v-if="userData?.bk || userData?.customer"
            >
              {{ (userData.bk || userData.customer)?.first_name }}
              {{ (userData.bk || userData.customer)?.last_name }}
            </h1>
          </div>
        </div>
        <div class="md:col-span-2">
          <Card />
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
import { ref } from "vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import profiledefault from "@/assets/img/profile-mock.png";
import profileDefaultHero from "@/assets/img/login/jatidiri.png";

const userData = JSON.parse(localStorage.getItem("userData"));
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";
const heroImage = ref((userData.bk || userData.customer)?.hero ? `${baseURL}/storage/${(userData.bk || userData.customer)?.hero}` : null)

const showModal = ref(false);
const selectedImage = ref(null);
const isDragOver = ref(false);
const errorMessage = ref("");
const isUploading = ref(false);
const uploadProgress = ref(0);

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = null;
  errorMessage.value = "";
  isUploading.value = false;
  uploadProgress.value = 0;
};

const validateFile = (file) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    errorMessage.value =
      "Format file tidak didukung. Gunakan PNG, JPG, atau GIF.";
    return false;
  }

  if (file.size > maxSize) {
    errorMessage.value = "Ukuran file terlalu besar. Maksimal 10MB.";
    return false;
  }

  errorMessage.value = "";
  return true;
};

const processFile = (file) => {
  if (!validateFile(file)) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    selectedImage.value = {
      file: file,
      name: file.name,
      size: file.size,
      preview: e.target.result,
    };
  };
  reader.readAsDataURL(file);
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    processFile(file);
  }
};

const handleDrop = (event) => {
  isDragOver.value = false;
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
};

const removeImage = () => {
  selectedImage.value = null;
  errorMessage.value = "";
};

const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const handleUploadSuccess = (res) => {
  const newHero = res.data.data; // contoh: 'images/hero123.jpg'

  // Update localStorage
  const newUserData = {
    ...userData,
    bk: {
      ...userData.bk,
      hero: newHero,
    },
  };
  localStorage.setItem("userData", JSON.stringify(newUserData));

  // Update heroImage reaktif
  heroImage.value = `${baseURL}/storage/${newHero}?t=${Date.now()}`;
};

const uploadImage = async () => {
  const token = Cookies.get("token");
  if (!selectedImage.value) return;

  isUploading.value = true;
  uploadProgress.value = 0;

  const formData = new FormData();
  formData.append("image", selectedImage.value.file);

  try {
    // Simulate upload progress
    const simulateProgress = () => {
      return new Promise((resolve) => {
        const interval = setInterval(() => {
          uploadProgress.value += 10;
          if (uploadProgress.value >= 100) {
            clearInterval(interval);
            resolve(); // lanjut upload
          }
        }, 200);
      });
    };

    await simulateProgress();

    // Upload ke server
    const res = await initAPI("post", "admin-bk/upload-hero", formData, token);
    console.log("Image uploaded successfully:", selectedImage.value.name);

    handleUploadSuccess(res); // ✅ panggil di sini!

    closeModal();
  } catch (error) {
    console.error("Upload failed:", error);
    errorMessage.value = "Upload gagal. Silakan coba lagi.";
  } finally {
    isUploading.value = false;
    uploadProgress.value = 0;
  }
};

</script>