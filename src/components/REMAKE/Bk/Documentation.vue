<template>
  <div class="flex items-center justify-between gap-4 my-5">

    <h1 class="text-xl font-semibold text-gray-800 mb-6">Dokumentasi</h1>
    <!-- Tombol buka modal -->
    <button
      @click="isModalOpen = true"
      class="px-2 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex gap-2 items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-folder-plus"
        viewBox="0 0 16 16"
      >
        <path
          d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
        />
        <path
          d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
        />
      </svg>
      Tambah Dokuemntasi
    </button>
  </div>

  <!-- Modal Overlay -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <!-- Modal Content -->
    <div class="bg-white w-[90%] md:w-[400px] rounded-2xl p-6 relative">
      <!-- Tombol Close -->
      <button
        @click="isModalOpen = false"
        class="absolute top-3 right-3 text-white bg-red-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition"
      >
        &times;
      </button>

      <!-- Isi Modal -->
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Title Of Documentation</label
          >
          <input
            type="text"
            class="border rounded-xl px-4 py-2 flex justify-between items-center cursor-pointer text-gray-500 w-full"
            placeholder="Title of Documentation"
            v-model="title"
          />
        </div>

        <!-- File Upload Box -->
        <div class="bg-blue-50 p-4 rounded-xl space-y-3">
          <div class="text-sm font-semibold">Select a file</div>
          <p class="text-xs text-gray-500">Maximum file size of 2 MB.</p>

          <!-- Custom Upload Button -->
          <!-- Desain upload yang lebih menarik -->
          <label
            class="cursor-pointer border-2 border-dashed border-gray-300 bg-white hover:bg-gray-100 transition rounded-xl w-full py-6 flex flex-col items-center justify-center text-gray-600 gap-2"
          >
            <input type="file" class="hidden" @change="handleFileUpload" />
            <!-- Icon Upload -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4-4-4 4m4-4v12"
              />
            </svg>
            <!-- Text Info -->
            <span class="text-sm">
              {{ selectedFileName || "Click to upload file" }}
            </span>
            <span class="text-xs text-gray-400">Max size 2 MB • JPG/PNG</span>
          </label>

          <!-- Preview Gambar -->
          <div v-if="previewImage" class="mt-4">
            <img
              :src="previewImage"
              alt="Preview"
              class="w-full h-auto rounded-lg border"
            />
          </div>

          <!-- Tombol Upload -->
          <button
            class="w-full bg-indigo-600 text-white py-2 rounded-full mt-2 hover:bg-indigo-700"
            @click="uploadFile"
          >
            Upload File
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
    <div
    v-for="(data, index) in conselingDocumentation"
      class="w-full grid grid-cols-1 gap-2 bg-gray-50 rounded-2xl relative group overflow-hidden"
    >
      <!-- Gambar -->
      <img
        :src="getImageUrl(data.file)"
        class="object-cover w-full h-[400px] rounded-2xl"
        alt=""
        />

      <!-- Tombol Hapus -->
      <button
        class="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
        @click="handleDelete(data.id)"
        title="Hapus Gambar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Deskripsi -->
      <div class="px-5 py-3 flex flex-col">
        <span class="font-sora font-semibold"
          >{{ data.title }}</span
        >
        <span class="font-sora text-xs">{{ formatDate(data.created_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const props = defineProps({
  conselingId: {
    type: String,
    required: true,
  },
  conselingDocumentation: {
    type: Array,
    required: true,
  },
});

const isModalOpen = ref(false);
const selectedFileName = ref("");
const previewImage = ref(null);
const file = ref(null); // ✅ Tambahkan ini
const title = ref("");
const isLoadingUpload = ref(false);
const emit = defineEmits(["uploaded"]);

const getImageUrl = (filePath) => {
  return filePath
    ? `${import.meta.env.VITE_API_BASE_URL_STORAGE}/storage/${filePath}`
    : "https://via.placeholder.com/400x300?text=No+Image";
};

const formatDate = (dateStr) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0];
  if (uploadedFile) {
    file.value = uploadedFile; // ⬅️ INI WAJIB! pastikan file disimpan di variabel
    selectedFileName.value = uploadedFile.name;

    // Preview jika gambar
    if (uploadedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        previewImage.value = reader.result;
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      previewImage.value = null;
    }
  }
};

const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Yakin ingin menghapus?",
    text: "File ini akan dihapus secara permanen.",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
  });

  if (!confirm.isConfirmed) return;

  try {
    const token = Cookies.get("token");

    await initAPI("delete", `interview-documentation/${id}`, null, token);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Dokumentasi berhasil dihapus.",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    console.error("Gagal hapus:", err);
    Swal.fire({
      icon: "error",
      title: "Gagal menghapus",
      text: err.response?.data?.message || "Terjadi kesalahan saat menghapus.",
    });
  } finally {
      emit("uploaded");
  }
};

const uploadFile = async () => {
  if (!file.value || !title.value) {
    Swal.fire("Oops!", "Judul dan file harus diisi", "warning");
    return;
  }

  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("file", file.value); // ⬅️ PASTIKAN ini terisi
  formData.append("conseling_bk_id", props.conselingId);

  try {
    isLoadingUpload.value = true;
    const token = Cookies.get("token");

    const response = await initAPI(
      "post",
      "interview-documentation",
      formData,
      token,
      { "Content-Type": "multipart/form-data" } // optional tergantung axios
    );

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "File berhasil diupload",
    });

    // Reset form
    title.value = "";
    file.value = null;
    previewImage.value = null;
    selectedFileName.value = "";
    isModalOpen.value = false;
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: err.response?.data?.message || "Terjadi kesalahan",
    });
  } finally {
    isLoadingUpload.value = false;
    console.log("File yang dikirim:", file.value);
    // Beri tahu parent agar ambil ulang data
emit("uploaded");
  }
};

</script>
