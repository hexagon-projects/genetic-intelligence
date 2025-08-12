<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout>
    <div class="bg-gray-100 p-5 min-h-screen">
      <div class="w-full md:w-4/5 mx-auto">
        <div class="flex mb-5">
          <!-- navigation profile -->
          <NavigateProfile />
        </div>
        <!-- section -->
        <div class="bg-gray-100 min-h-screen font-sora text-xs">
          <div class="bg-white p-5 rounded-2xl shadow-sm">
            <!-- Header -->
            <div
              class="flex items-center justify-between mb-4 p-3 rounded-full"
            >
              <div class="flex gap-3 bg-gray-100 py-2 px-3 rounded-full items-center">
                <img src="@/assets/icons/basic.svg" class="w-5" alt="basic" />
                <small class="font-sora font-semibold">Penempatan Tugas</small>
              </div>
              <div class="flex items-center gap-3">
                <button
                  @click="showModal = true"
                  class="bg-biru text-white px-4 py-2 rounded-full"
                >
                  Tambah Tempat Tugas Baru
                </button>
              </div>
            </div>

            <!-- Modal -->
            <div
              v-if="showModal"
              class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <div
                class="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative"
              >
                <!-- Close Button -->
                <button
                  @click="showModal = false"
                  class="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
                >
                  &times;
                </button>

                <h2 class="text-lg font-bold mb-4 text-gray-700">
                  Upload Home Base File
                </h2>

                <!-- Input Nama -->
                <div class="mb-4 relative">
                  <label class="block text-xs text-gray-600 mb-1"
                    >Nama Sekolah</label
                  >
                  <input
                    type="text"
                    v-model="namaPendidikan"
                    @input="debouncedGetSearchData"
                    class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-biru"
                    placeholder="Masukkan nama sekolah"
                  />

                  <!-- Dropdown hasil pencarian -->
                  <transition name="fade" mode="out-in">
                    <div
                      v-if="searched"
                      class="absolute z-40 w-full max-h-40 overflow-y-auto bg-white shadow rounded mt-1 ring-1 ring-black ring-opacity-5"
                    >
                      <template v-if="pilihanSekolah.length > 0">
                        <div
                          v-for="(item, index) in pilihanSekolah"
                          :key="index"
                          @click="pilihSekolah(item.id, item.name)"
                          class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                        >
                          {{ item.name }}
                        </div>
                      </template>
                      <template v-else>
                        <div class="px-4 py-2 text-gray-500 text-xs">
                          Data tidak ditemukan.
                        </div>
                      </template>
                    </div>
                  </transition>
                </div>

                <!-- Upload File Box -->
                <div
                  class="bg-blue-50 rounded-xl p-5 space-y-3 w-full max-w-md"
                >
                  <!-- Label -->
                  <div>
                    <p class="font-semibold text-xs text-gray-800">
                      Select a file
                    </p>
                    <p class="text-xs text-gray-500">
                      PDF. Maximum file size of 20 MB.
                    </p>
                  </div>

                  <!-- File Preview -->
                  <div
                    class="flex items-center space-x-2 text-gray-500 text-xs"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>{{ fileName || "No File Selected" }}</span>
                  </div>

                  <!-- Input File Hidden -->
                  <input
                    type="file"
                    accept="application/pdf"
                    class="hidden"
                    ref="fileInput"
                    @change="handleFileUpload"
                  />

                  <!-- Button -->
                  <button
                    @click="$refs.fileInput.click()"
                    class="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-full font-semibold text-xs transition"
                  >
                    Upload File
                  </button>
                </div>

                <!-- Actions -->
                <div class="flex justify-end gap-2 mt-6">
                  <button
                    @click="showModal = false"
                    class="px-4 py-2 rounded-lg bg-gray-200 text-gray-600 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    @click="submitForm"
                    v-if="!isLoading"
                    class="px-4 py-2 rounded-lg bg-biru text-white hover:bg-blue-700"
                  >
                    Submit
                  </button>
                  <button
                    v-if="isLoading"
                    disabled
                    class="px-4 py-2 bg-biru text-white rounded-md hover:bg-biru/80"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                </div>
              </div>
            </div>

            <!-- Table -->
            <div class="w-full overflow-x-auto">
              <table
                class="min-w-[800px] w-full text-left text-xs"
              >
                <thead>
                  <tr class="text-white bg-biru">
                    <th
                      class="px-4 py-2 font-medium rounded-tl-xl rounded-bl-xl"
                    >
                      #
                    </th>
                    <th class="px-4 py-2 font-medium">Nama Sekolah</th>
                    <th class="px-4 py-2 font-medium whitespace-nowrap">
                      Tanggal Pengajuan
                    </th>
                    <th class="px-4 py-2 font-medium whitespace-nowrap">
                      Tanggal Verifikasi
                    </th>
                    <th class="px-4 py-2 font-medium">Home Based</th>
                    <th
                      class="px-4 py-2 font-medium"
                    >
                      Status
                    </th>
                    <th
                      class="px-4 py-2 font-medium rounded-tr-xl rounded-br-xl"
                    >
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody class="text-gray-700">
                  <tr
                    v-for="(item, index) in placementData"
                    :key="item.id"
                    class="hover:bg-gray-100"
                  >
                    <td class="px-4 py-3 rounded-tl-xl rounded-bl-xl">
                      {{ index + 1 }}
                    </td>
                    <td class="px-4 py-3">
                      {{ item.institution?.name ?? "-" }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      {{ formatDate(item.pengajuan) }}
                    </td>
                    <td class="px-4 py-3 whitespace-nowrap">
                      {{ item.verifikasi ? formatDate(item.verifikasi) : "-" }}
                    </td>
                    <td class="px-4 py-3">{{ item.home_base }}</td>
                    <td class="px-4 py-3">
                      {{ item.status }}
                    </td>
                    <td class="px-4 py-3 rounded-tr-xl rounded-br-xl">
                      <button
                        @click="goToDetail(item.id)"
                        class="bg-[#3030F8] text-white px-4 py-2 rounded flex items-center gap-2"
                      >
                        Lihat Detail
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.66669 8.33335L8.33335 1.66669M8.33335 1.66669H1.66669M8.33335 1.66669V8.33335"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import NavigateProfile from "../../../../components/REMAKE/Bk/NavigateProfile.vue";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import { debounce } from "lodash";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const isLoading = ref(false);
const showModal = ref(false);
const homeBaseName = ref("");
const fileName = ref("");
const selectedFile = ref(null);

const namaPendidikan = ref("");
const pilihanSekolah = ref([]);
const idSekolah = ref(null);
const searched = ref(false);

const getSearchData = async () => {
  const response = await initAPI(
    "get",
    `institutions?search=${namaPendidikan.value}`,
    null,
    null
  );
  pilihanSekolah.value = response.data.data;
};

const debouncedGetSearchData = debounce(() => {
  if (namaPendidikan.value !== "") {
    searched.value = true;
    getSearchData();
  } else {
    searched.value = false;
    pilihanSekolah.value = [];
  }
}, 400);

const pilihSekolah = (id, name) => {
  idSekolah.value = id;
  namaPendidikan.value = name;
  searched.value = false;
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("File dipilih:", file);
    selectedFile.value = file;
    fileName.value = file.name;
  } else {
    console.warn("Tidak ada file yang dipilih.");
  }
};

const submitForm = async () => {
  if (!idSekolah.value || !selectedFile.value) {
    Swal.fire({
      icon: "warning",
      title: "Perhatian",
      text: "Mohon pilih sekolah dan upload file.",
    });
    return;
  }

  const token = Cookies.get("token");
  if (!token) {
    router.push("/login");
    localStorage.clear();
    return;
  }

  try {
    isLoading.value = true;

    const formData = new FormData();
    formData.append("institut_id", idSekolah.value);
    formData.append("file", selectedFile.value);

    const response = await initAPI("post", "placement", formData, token);

    if (response.status === 200 || response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      showModal.value = false;
      namaPendidikan.value = "";
      idSekolah.value = null;
      fileName.value = "";
      selectedFile.value = null;
    }
    window.location.reload(); // ✅ Refresh halaman setelah notifikasi
  } catch (error) {
    console.error("Gagal upload:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Terjadi kesalahan saat menyimpan data.",
      timer: 2000,
      showConfirmButton: false,
    });
  } finally {
    isLoading.value = false;
  }
};

const placementData = ref([]);

const getPlacementData = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "placement", null, token);
    placementData.value = response.data.data;
  } catch (error) {
    console.error("Gagal ambil data placement", error);
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateStr).toLocaleDateString("id-ID", options);
};

const goToDetail = (id) => {
  try {
    const encodedId = btoa(id);

    router.push({
      name: "bk.views.placement.detail",
      query: { placemnet_id: encodedId },
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat navigasi ke detail.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

onMounted(() => {
  getPlacementData();
});
</script>
