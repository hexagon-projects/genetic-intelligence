<template>
  <div class="rounded-2xl mx-auto p-6 min-h-screen">
    <div class="relative">
      <div
        class="absolute left-6 top-12 bottom-0 w-0.5 bg-blue-500 hidden md:flex"
      ></div>

      <div class="space-y-8">
        <div
          v-for="(item, index) in editableItems"
          :key="item.id || index"
          class="relative flex items-start"
        >
          <!-- Number -->
          <div
            class="flex-shrink-0 w-12 h-12 bg-white border border-biru text-biru rounded-full hidden md:flex items-center justify-center font-semibold text-lg z-10"
          >
            {{ (index + 1).toString().padStart(2, "0") }}
          </div>

          <!-- Content -->
          <div class="md:ml-6 flex-1">
            <div class="grid grid-cols-1 md:grid-cols-5 gap-5">
              <input
                type="text"
                v-model="item.title"
                class="w-full border my-3 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 md:col-span-4"
                placeholder="Title Conseling"
              />
              <select
                v-model="item.type_aspek"
                name="aspek"
                class="w-full border my-3 px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-500 md:col-span-1"
              >
                <option>-- Pilih Aspek Karakter --</option>
                <option value="Fisik Motorik">Fisik Motorik</option>
                <option value="Fisik">Fisik</option>
                <option value="Sosial">Sosial</option>
                <option value="Emosi">Emosi</option>
                <option value="Moral">Moral</option>
                <option value="Religius">Religius</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div
              class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <textarea
                class="w-full text-gray-600 text-sm leading-relaxed resize-none border-none outline-none bg-transparent"
                rows="8"
                placeholder="Tuliskan catatan di sini..."
                v-model="item.description"
              ></textarea>
            </div>

            <!-- Buttons -->
            <div class="flex justify-end w-full my-5 gap-3 flex-wrap">
              <div class="flex gap-3">
                <button
                  v-if="!item.id"
                  class="px-4 py-2 bg-biru text-white rounded-md hover:bg-biru/90 flex items-center gap-2"
                  @click="saveNote(index)"
                  :disabled="isloadingsave"
                >
                  <span v-if="!isloadingsave">Save Note</span>
                  <svg
                    v-if="!isloadingsave"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                    />
                    <path
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                    />
                  </svg>
                  <!-- Loading spinner -->
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span v-if="isloadingsave">Saving ...</span>
                </button>

                <button
                  v-else
                  class="px-4 py-2 bg-white text-biru rounded-md hover:bg-biru hover:text-white border border-biru flex items-center gap-2"
                  @click="updateNote(index)"
                >
                  <span v-if="!isloadingupdate">Update Note</span>
                  <svg
                    v-if="!isloadingupdate"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-download"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                    />
                    <path
                      d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                    />
                  </svg>
                  <!-- Loading spinner -->
                  <svg
                    v-else
                    class="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  <span v-if="isloadingupdate">Saving ...</span>
                </button>
              </div>

              <button
                class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 flex items-center gap-2"
                @click="deleteNote(item.id, index)"
              >
                <span>Delete</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-x-octagon"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1z"
                  />
                  <path
                    d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Add Note Button -->
        <div class="flex justify-center mt-10">
          <button
            class="px-5 py-2 bg-biru text-white rounded-md hover:bg-biru/80 flex gap-3 items-center"
            @click="addNewNote"
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
            <span>Tambah Catatan Baru</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const props = defineProps({
  conselingInterview: {
    type: Array,
    required: true,
  },
  conselingId: {
    type: String,
    required: true,
  },
});

const isloadingsave = ref(false);
const isloadingupdate = ref(false);
const editableItems = reactive([]);

// Inisialisasi data ketika props berubah
watch(
  () => props.conselingInterview,
  (newData) => {
    editableItems.splice(0, editableItems.length);

    if (!newData || newData.length === 0) {
      editableItems.push({
        title: "",
        description: "",
      });
    } else {
      newData.forEach((item) => {
        editableItems.push({
          id: item.id,
          title: item.title || "Catatan Konseling",
          description: item.description || "",
          type_aspek: item.type_aspek || "", // ← tambahkan ini
          conseling_bk_id: item.conseling_bk_id, // misalnya di-passing lewat props
        });
      });
    }
  },
  { immediate: true }
);

// Tambah item baru
const addNewNote = () => {
  editableItems.push({
    title: "",
    description: "",
    type_aspek: "Lainnya",
    conseling_bk_id: props.conselingId, // ← fix di sini
  });
};

// Simpan item baru (POST)
const saveNote = async (index) => {
  const item = editableItems[index];

  // Validasi sederhana
  if (!item.description || item.description.trim() === "") {
    Swal.fire("Peringatan", "Deskripsi tidak boleh kosong.", "warning");
    return;
  }

  try {
    isloadingsave.value = true;
    const token = Cookies.get("token");
    const response = await initAPI(
      "post",
      "interview", // endpoint yang kamu pakai di Laravel
      {
        title: item.title || "Catatan Konseling",
        description: item.description,
        type_aspek: item.type_aspek,
        conseling_bk_id: props.conselingId, // pastikan field ini disediakan jika dibutuhkan backend
      },
      token
    );

    // Simpan ID hasil dari backend (untuk update/delete selanjutnya)
    item.id = response.data.data?.id || null;

    Swal.fire({
      icon: "success",
      title: "success",
      text: "Data Berhasil Disimpan",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.error("Error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat menyimpan data.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isloadingsave.value = false;
  }
};

// Update item lama (PUT)
const updateNote = async (index) => {
  const item = editableItems[index];
  try {
    isloadingupdate.value = true;
    const token = Cookies.get("token");
    const response = await initAPI(
      "put",
      `interview/${item.id}`, // endpoint yang kamu pakai di Laravel
      {
        title: item.title,
        description: item.description,
        type_aspek: item.type_aspek,
        conseling_bk_id: item.conseling_bk_id, // pastikan field ini disediakan jika dibutuhkan backend
      },
      token
    );

    Swal.fire({
      icon: "success",
      title: "success",
      text: "Data Berhasil Diupdate",
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (err) {
    console.error("Error:", err);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat menyimpan data.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isloadingupdate.value = false;
  }
};

// Hapus item
const deleteNote = async (id, index) => {
  const item = editableItems[index];

  const confirm = await Swal.fire({
    icon: "info",
    title: "Yakin ingin menghapus?",
    showCancelButton: true,
    confirmButtonText: "Hapus",
    cancelButtonText: "Batal",
  });

  if (confirm.isConfirmed) {
    if (item.id) {
      try {
        const token = Cookies.get("token");
        const response = await initAPI(
          "delete",
          `interview/${item.id}`, // endpoint yang kamu pakai di Laravel
          null,
          token
        );
        Swal.fire({
          icon: "success",
          title: "success",
          text: "Data Berhasil Dihapus",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (err) {
        console.error("Error:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Terjadi error saat menghapus data.",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    editableItems.splice(index, 1);

    // Tambah kosong jika jadi kosong
    if (editableItems.length === 0) {
      addNewNote();
    }
  }
};
</script>
