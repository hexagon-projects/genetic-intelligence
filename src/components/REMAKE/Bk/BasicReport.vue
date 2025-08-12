<template>
  <!-- Removed min-h-screen and centering classes, and max-w-2xl for full width -->
  <div class="w-full bg-gray-50 rounded-lg overflow-hidden p-4 md:p-6 lg:p-8">
    <div class="p-6 md:p-8">
      <h1 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Informasi Detail Sekolah
      </h1>

      <form @submit.prevent="saveSchoolInfo" class="space-y-6">
        <!-- Logo Sekolah -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <div
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- Image Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>Logo Sekolah</span>
          </div>
          <div
            class="md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center gap-3"
          >
            <img
              :src="logoPreviewUrl"
              alt="Logo Sekolah"
              class="h-24 w-24 object-contain border border-gray-200 rounded-md shadow-sm flex-shrink-0"
              @error="handleImageError"
            />
            <div class="flex-grow flex flex-col gap-2">
              <input
                type="file"
                ref="logoFileInput"
                @change="onLogoFileChange"
                id="schoolLogoFile"
                class="hidden"
                accept="image/*"
              />
              <div
                @click="logoFileInput.click()"
                class="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-black transition-colors duration-200"
              >
                <!-- Upload Icon SVG -->
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
                  class="text-gray-600 mb-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" x2="12" y1="3" y2="15" />
                </svg>
                <span class="text-sm font-medium text-gray-700">
                  {{
                    selectedLogoFile ? selectedLogoFile.name : "Pilih File Logo"
                  }}
                </span>
                <p class="mt-1 text-xs text-gray-500">
                  Klik untuk memilih gambar (JPG, PNG, SVG).
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Nama Kepala Sekolah -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="principalName"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- User Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>Nama Kepala Sekolah</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="text"
              v-model="schoolInfo.principalName"
              id="principalName"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="Nama Lengkap Kepala Sekolah"
            />
            <p class="mt-1 text-xs text-gray-500">
              Masukkan nama lengkap kepala sekolah, termasuk gelar akademik jika
              ada.
            </p>
          </div>
        </div>

        <!-- Jenis Number -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="jenisNumber"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- User Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-card-heading"
              viewBox="0 0 16 16"
            >
              <path
                d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"
              />
              <path
                d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z"
              />
            </svg>
            <span>Jenis Number</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="text"
              v-model="schoolInfo.jenisNumber"
              id="jenisNumber"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="NIP, NUPTK atau Lainnya."
            />
            <p class="mt-1 text-xs text-gray-500">
              Masukkan jenis number sperti NIP, NUPTK atau Lainnya.
            </p>
          </div>
        </div>

        <!-- Number -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="number"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- User Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-postcard"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0zM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5M10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM13 8h-2V6h2z"
              />
            </svg>
            <span>Number</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="text"
              v-model="schoolInfo.number"
              id="number"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="3200000000"
            />
            <p class="mt-1 text-xs text-gray-500">
              Masukkan jenis number seperti NIP, NUPTK atau Lainnya.
            </p>
          </div>
        </div>

        <!-- Alamat Sekolah -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-start gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="schoolAddress"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- Home Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <span>Alamat Sekolah</span>
          </label>
          <div class="md:col-span-2">
            <textarea
              v-model="schoolInfo.schoolAddress"
              id="schoolAddress"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="Alamat Lengkap Sekolah"
            ></textarea>
            <p class="mt-1 text-xs text-gray-500">
              Alamat lengkap sekolah, termasuk RT/RW, Kelurahan, Kecamatan,
              Kota/Kabupaten, Provinsi, dan Kode Pos.
            </p>
          </div>
        </div>

        <!-- Akreditasi -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="accreditation"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- Award Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <path
                d="m15.477 12.892 1.223 1.223a6 6 0 0 1-7.953 0l1.223-1.223"
              />
              <path d="M12 19v-5" />
              <path
                d="M12 14c-1.8 0-3.5-.67-4.9-2S4.8 8.8 4.8 7c0-2 1-3.5 2-4s2.5-1 4-1 3 0 4 1 2 2 2 4c0 1.8-.67 3.5-2 4.9s-3.2 2-4.9 2Z"
              />
            </svg>
            <span>Akreditasi</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="text"
              v-model="schoolInfo.accreditation"
              id="accreditation"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="Contoh: A, B, C"
            />
            <p class="mt-1 text-xs text-gray-500">
              Contoh: A, B, C, Unggul, Baik Sekali.
            </p>
          </div>
        </div>

        <!-- Nomor Telepon Sekolah -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3 border-b border-gray-200"
        >
          <label
            for="schoolPhone"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- Phone Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
              />
            </svg>
            <span>Nomor Telepon Sekolah</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="tel"
              v-model="schoolInfo.schoolPhone"
              id="schoolPhone"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="Contoh: (021) 12345678"
            />
            <p class="mt-1 text-xs text-gray-500">
              Format: (Kode Area) Nomor Telepon, contoh: (021) 12345678.
            </p>
          </div>
        </div>

        <!-- Website Sekolah -->
        <div
          class="grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-6 py-3"
        >
          <label
            for="schoolWebsite"
            class="md:col-span-1 text-sm font-medium text-gray-700 flex items-center space-x-2"
          >
            <!-- Globe Icon SVG -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-gray-600"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <span>Website Sekolah</span>
          </label>
          <div class="md:col-span-2">
            <input
              type="url"
              v-model="schoolInfo.schoolWebsite"
              id="schoolWebsite"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm p-2"
              placeholder="Contoh: https://www.sekolah.id"
            />
            <p class="mt-1 text-xs text-gray-500">
              Pastikan format URL lengkap, contoh: https://www.sekolah.id.
            </p>
          </div>
        </div>

        <div class="flex justify-end pt-6">
          <button
            type="submit"
            class="bg-biru text-white px-5 py-2 rounded-xl hover:bg-biru/80 flex gap-3 items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-send-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372zm-2.54 1.183L5.93 9.363 1.591 6.602z"
              />
              <path
                d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0m-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5"
              />
            </svg>
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"; // Import ref
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import defaultLogo from "@/assets/icons/logo.png"; // import gambar default
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";

const token = Cookies.get("token");
const props = defineProps({
  placementId: {
    type: Object,
    required: true,
  },
});

const schoolInfo = reactive({
  logo: "",
  principalName: "",
  schoolAddress: "",
  accreditation: "",
  jenisNumber: "",
  number: "",
  schoolPhone: "",
  schoolWebsite: "",
});

const logoFileInput = ref(null);
const selectedLogoFile = ref(null);
const logoPreviewUrl = ref(defaultLogo); // Initialize with default logo
const onLogoFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedLogoFile.value = file;
    logoPreviewUrl.value = URL.createObjectURL(file); // preview file
  } else {
    selectedLogoFile.value = null;
    // Revert to the current logo or default logo
    logoPreviewUrl.value = schoolInfo.logo
      ? `${baseURL}/storage/${schoolInfo.logo}`
      : defaultLogo;
  }
};

const saveSchoolInfo = async () => {
  try {
    const formData = new FormData();
    if (selectedLogoFile.value) {
      formData.append("logo", selectedLogoFile.value);
    }
    // Make sure all required fields are included
    formData.append("principalName", schoolInfo.principalName);
    formData.append("schoolAddress", schoolInfo.schoolAddress);
    formData.append("accreditation", schoolInfo.accreditation);
    formData.append("schoolPhone", schoolInfo.schoolPhone);
    formData.append("jenisNumber", schoolInfo.jenisNumber);
    formData.append("number", schoolInfo.number);
    formData.append("schoolWebsite", schoolInfo.schoolWebsite || "");
    formData.append("id", props.placementId);

    const response = await initAPI(
      "post",
      `placement/set-report`,
      formData,
      token
    );

    Swal.fire("Berhasil", "Data sekolah berhasil disimpan", "success");
  } catch (error) {
    console.error("Gagal menyimpan data:", error);
    Swal.fire(
      "Gagal",
      "Terjadi kesalahan saat menyimpan data sekolah",
      "error"
    );
  }
};

const dataPlacment = ref({});
const getPlacmentDetail = async () => {
  try {
    const response = await initAPI(
      "get",
      `placement/${props.placementId}`,
      null,
      token
    );
    dataPlacment.value = response.data.detail;
    console.log("detail placment", dataPlacment.value);

    // Update the reactive schoolInfo object directly
    schoolInfo.logo = dataPlacment.value.file || "";
    schoolInfo.principalName = dataPlacment.value.kepala || "";
    schoolInfo.jenisNumber = dataPlacment.value.jenis_number || "";
    schoolInfo.number = dataPlacment.value.number || "";
    schoolInfo.schoolAddress = dataPlacment.value.alamat || "";
    schoolInfo.accreditation = dataPlacment.value.akreditasi || "";
    schoolInfo.schoolPhone = dataPlacment.value.nomor || "";
    schoolInfo.schoolWebsite = dataPlacment.value.website || "";

    // Update the logo preview if there's a logo
    if (dataPlacment.value.file) {
      // Check if the file path is already a full URL
      if (dataPlacment.value.file.startsWith("http")) {
        logoPreviewUrl.value = dataPlacment.value.file;
      } else {
        // Construct the full URL for storage files
        logoPreviewUrl.value = `${baseURL}/storage/${dataPlacment.value.file}`;
      }
    } else {
      logoPreviewUrl.value = defaultLogo;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getPlacmentDetail();
});
</script>

<style scoped>
/* No custom styles needed, Tailwind handles everything */
</style>
