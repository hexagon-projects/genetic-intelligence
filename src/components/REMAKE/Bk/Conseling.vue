<template>
  <!-- Card Antrian -->
  <div class="bg-white p-5 md:p-10 rounded-2xl">
    <!-- Filter + Search -->
    <div
      class="flex items-center justify-between my-5 text-xs flex-col md:flex-row gap-2"
    >
      <!-- Filter Status -->
      <div class="flex items-center justify-start space-x-2 w-full md:w-auto">
        <button
          class="bg-biru text-white px-4 py-2 rounded-xl"
          @click="isEditModalOpen = true"
        >
          Tambah Rencana Layanan Baru
        </button>
      </div>

      <!-- Modal Edit -->
      <div
        v-if="isEditModalOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
      >
        <div class="bg-white w-full max-w-2xl rounded-xl shadow p-6 relative">
          <!-- Tombol Close -->
          <button
            @click="isEditModalOpen = false"
            class="absolute top-3 right-3 text-white bg-red-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
          >
            &times;
          </button>

          <!-- Judul -->
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Tambah Informasi Kegiatan Layanan Baru
          </h2>

          <!-- Form -->
          <form @submit.prevent="addConseling">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Topik Layanan</label
                >
                <input
                  v-model="form.title"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="Topik Layanan..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Lokasi</label
                >
                <input
                  v-model="form.placment"
                  type="text"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="Lokasi..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Tanggal Pelaksanaan</label
                >
                <input
                  v-model="form.conseling_date"
                  type="date"
                  class="w-full border rounded-lg px-3 py-2"
                  placeholder="Tanggal Pelaksanaan..."
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >Jenis Layanan</label
                >
                <select
                  v-model="form.type_conseling"
                  class="w-full border rounded-lg px-3 py-2"
                >
                  <option value="individu">individu</option>
                  <option value="Conseling Individu">Conseling Individu</option>
                  <option value="Conseling Kelompok">Conseling Kelompok</option>
                  <option value="Bimbingan Kelompok">Bimbingan Kelompok</option>
                  <option value="Bimbingan Kalsikal">Bimbingan Kalsikal</option>
                  <option value="Bimbingan Kelas Besar">
                    Bimbingan Kelas Besar
                  </option>
                  <option value="Konsultasi">Konsultasi</option>
                  <option value="Kolaborasi">Kolaborasi</option>
                  <option value="Alih Tangan Kasus">Alih Tangan Kasus</option>
                  <option value="Kunjungan Rumah">Kunjungan Rumah</option>
                  <option value="Advokasi">Advokasi</option>
                  <option value="Konferensi Kasus">Konferensi Kasus</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1"
                >Deskripsi Layanan</label
              >
              <textarea
                v-model="form.description"
                rows="3"
                class="w-full border rounded-lg px-3 py-2"
                placeholder="Deskripsi Layanan..."
              ></textarea>
            </div>

            <!-- Submit -->
            <div class="flex items-center justify-end">
              <button
                type="submit"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                :disabled="isloadingconseling"
              >
                <svg
                  v-if="isloadingconseling"
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
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                  ></path>
                </svg>
                <span>{{
                  isloadingconseling ? "Menyimpan..." : "Tambah Kegiatan Baru"
                }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Search Box -->
      <div class="flex w-full md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-biru focus:border-biru block w-full p-2.5"
          placeholder="Search Data"
        />
      </div>
    </div>
    <!-- Overview Data Siswa -->
    <div class="space-y-4">
      <div
        class="bg-transparent border border-gray-300 p-4 flex flex-col rounded-xl"
      >
        <div class="flex justify-between items-center mb-5"></div>

        <div class="overflow-auto w-full">
          <table
            class="w-full border-separate border-spacing-0 text-left text-gray-500 font-sora leading-normal text-xs"
          >
            <thead class="text-[#344053]">
              <tr>
                <th class="py-3 px-4">#</th>
                <th class="py-3 px-4">Topik Layanan</th>
                <th class="py-3 px-4">Deskripsi Layanan</th>
                <th class="py-3 px-4">Tanggal Pelaksanaan</th>
                <th class="py-3 px-4">Lokasi</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4">Aksi</th>
              </tr>
            </thead>

            <tbody>
              <!-- Saat loading -->
              <tr v-if="loading">
                <td colspan="7" class="text-center py-5">
                  <div class="flex justify-center items-center">
                    <span
                      class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-500 rounded-full"
                      role="status"
                      aria-label="loading"
                    ></span>
                    <span class="ml-2 text-sm text-gray-500"
                      >Loading data...</span
                    >
                  </div>
                </td>
              </tr>

              <!-- Saat tidak ada data -->
              <tr v-else-if="conselings.length === 0">
                <td colspan="7" class="text-center py-5 text-sm text-gray-400">
                  Data tidak ditemukan.
                </td>
              </tr>

              <!-- Tampilkan data -->
              <tr
                v-else
                v-for="(item, index) in conselings"
                :key="index"
                class="border-b"
              >
                <td class="py-3 px-4">{{ index + 1 }}</td>
                <td class="py-3 px-4">{{ item.title }}</td>
                <td class="py-3 px-4">{{ item.description }}</td>
                <td class="py-3 px-4">{{ item.conseling_date }}</td>
                <td class="py-3 px-4">{{ item.placment }}</td>
                <td class="py-3 px-4">
                  <span
                    :class="[
                      'px-2 py-1 rounded-full text-white text-xs font-semibold',
                      item.status === 'pengajuan'
                        ? 'bg-yellow-500'
                        : item.status === 'conseling'
                        ? 'bg-blue-500'
                        : item.status === 'selesai'
                        ? 'bg-green-500'
                        : 'bg-gray-400',
                    ]"
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td class="py-3 px-4">
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
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import debounce from "lodash/debounce";
import { useRouter } from "vue-router";

const isEditModalOpen = ref(false);
const form = ref({
  title: "",
  placment: "",
  conseling_date: "",
  type_conseling: "individu",
  description: "",
});

const router = useRouter();

// Props dari parent
const props = defineProps({
  status: {
    type: String,
    default: "",
  },
});

// State
const conselings = ref([]);
const token = Cookies.get("token");
const userData = JSON.parse(localStorage.getItem("userData"));

const selectedStatus = ref(props.status); // default dari props
const searchQuery = ref("");
const loading = ref(false);
const isloadingconseling = ref(false);

const addConseling = async () => {
  const token = Cookies.get("token");
  try {
    isloadingconseling.value = true;
    const response = await initAPI("post", "conseling", form.value, token);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: response.data.message || "Data berhasil ditambahkan",
      showConfirmButton: false,
      timer: 2000,
    });

    isEditModalOpen.value = false;
    getConselings();
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan",
      showConfirmButton: false,
      // timer: 2000,
    });
  } finally {
    isloadingconseling.value = false;
  }
};
const goToDetail = (id) => {
  try {
    const encodedId = btoa(id);

    router.push({
      name: "bk.views.detail_conseling",
      query: { conseling_id: encodedId },
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat navigasi ke detail conseling.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Fetch data
const getConselings = async () => {
  loading.value = true;
  try {
    let url = `conseling/${userData.customer.id}`;
    if (selectedStatus.value) {
      url += `/${selectedStatus.value}`;
    }

    const params = {};
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim();
    }

    const response = await initAPI("get", url, params, token);
    conselings.value = response.data.data;
  } catch (error) {
    console.error("Gagal ambil data conselings", error);
    conselings.value = [];
  } finally {
    loading.value = false;
  }
};

// Auto update saat props.status berubah
watch(
  () => props.status,
  (newStatus) => {
    selectedStatus.value = newStatus;
    getConselings();
  }
);

// Auto update saat filter/search berubah
watch([selectedStatus, searchQuery], () => {
  getConselings();
});

onMounted(() => {
  getConselings();
});
</script>
