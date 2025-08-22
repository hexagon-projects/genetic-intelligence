<template>
  <div class="mx-auto md:p-4">
    <div class="flex items-center justify-between gap-4 my-5">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">
        Pihak Yang Terlibat
        <span class="bg-gray-200 px-2 py-1 rounded text-xs">
          {{ customerCount }}
        </span>
      </h2>
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
            d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2"
          />
          <path
            d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
          />
        </svg>
        Tambah Pihak Yang Terlibat
      </button>
    </div>

    <!-- Modal Tambah Peserta -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <div class="bg-white w-[90%] md:w-[400px] rounded-2xl p-6 relative">
        <button
          @click="isModalOpen = false"
          class="absolute top-3 right-3 text-white bg-red-500 rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 transition"
        >
          &times;
        </button>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Cari Nama Pihak Yang terlibat</label
            >
            <input
              type="text"
              class="border rounded-xl px-4 py-2 text-gray-700 w-full"
              placeholder="Search student name..."
              v-model="namaSiswa"
              @input="debouncedGetSearchData"
            />
            <transition name="fade" mode="out-in">
              <div
                v-if="searched"
                class="absolute z-50 w-full max-h-40 overflow-y-auto bg-white shadow rounded mt-1 ring-1 ring-black ring-opacity-5"
              >
                <template v-if="siswaList.length > 0">
                  <div
                    v-for="(item, index) in siswaList"
                    :key="index"
                    @click="
                      selectSiswa(
                        item.user_id,
                        item.first_name + ' ' + item.last_name
                      )
                    "
                    class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-xs"
                  >
                    {{ item.first_name }} {{ item.last_name }}
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

          <div class="w-full">
            <label
              for="selectOption"
              class="block text-sm font-medium text-gray-700 mb-1"
            >
              Pihak Sebagai
            </label>
            <select
              id="selectOption"
              v-model="selectedOption"
              class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option disabled value="">-- Pilih salah satu --</option>
              <option
                v-for="option in options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>

            <!-- Input tambahan saat pilih 'Lainnya' -->
            <div v-if="selectedOption === 'Lainnya'" class="mt-3">
              <label
                for="customOption"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Tuliskan Pihak Lainnya
              </label>
              <input
                id="customOption"
                v-model="customOption"
                type="text"
                placeholder="Isi pihak lainnya..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <button
            class="w-full bg-biru text-white py-2 rounded-xl mt-2 hover:bg-biru/80"
            @click="addParticipant"
          >
            Tambah Pihak
          </button>
        </div>
      </div>
    </div>


    <div class="overflow-x-auto rounded-xl shadow">
    <table class="min-w-full divide-y divide-gray-200 bg-white text-sm">
      <thead class="bg-gray-100 text-gray-700 text-left">
        <tr>
          <th class="px-4 py-3">#</th>
          <th class="px-4 py-3">Nama</th>
          <th class="px-4 py-3">Email</th>
          <th class="px-4 py-3">Sebagai</th>
          <th class="px-4 py-3 text-center">Aksi</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="(item, index) in sortedParticipants"
          :key="index"
          class="hover:bg-gray-50 transition cursor-pointer"
          @click="detailSiswa(item.user.customers.id)"
        >
          <td class="px-4 py-3 font-medium text-gray-600">{{ index + 1 }}</td>
          <td class="px-4 py-3">
            {{ item.user.customers.first_name }} {{ item.user.customers.last_name || "" }}
          </td>
          <td class="px-4 py-3 text-gray-500">{{ item.user.email || "-" }}</td>
          <td class="px-4 py-3">
            <span class="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
              {{ item.status || "-" }}
            </span>
          </td>
          <td class="px-4 py-3 text-center">
            <button
              @click.stop="deleteParticipant(item.id)"
              class="text-red-500 hover:text-white hover:bg-red-500 border border-red-200 px-2 py-1 rounded-md text-xs transition"
              title="Hapus Peserta"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Jika tidak ada peserta -->
    <div v-if="participants.length === 0" class="text-center py-6 text-gray-500 text-sm">
      Belum ada peserta ditambahkan.
    </div>
  </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { debounce } from "lodash";

const emit = defineEmits(["refresh"]);
const router = useRouter();

const props = defineProps({
  participants: {
    type: Array,
    required: true,
  },
  conselingId: {
    type: Number,
    required: true,
  },
});

const selectedOption = ref('');
const customOption = ref(''); // Input saat 'Lainnya'
const options = [
  { value: 'Peserta', label: 'Peserta' },
  { value: 'Orang Tua atau Wali', label: 'Orang Tua atau Wali' },
  { value: 'Kepala Sekolah', label: 'Kepala Sekolah' },
  { value: 'Wali Kelas', label: 'Wali Kelas' },
  { value: 'Lainnya', label: 'Lainnya' },
];


const isModalOpen = ref(false);
const namaSiswa = ref("");
const siswaList = ref([]);
const searched = ref(false);
const idCustomer = ref(null);

// Search & pilih siswa
const getSearchData = async () => {
  const token = Cookies.get("token");
  const response = await initAPI(
    "get",
    `participant?search=${namaSiswa.value}`,
    null,
    token
  );
  siswaList.value = response.data.data;
};

const debouncedGetSearchData = debounce(() => {
  if (namaSiswa.value !== "") {
    searched.value = true;
    getSearchData();
  } else {
    searched.value = false;
    siswaList.value = [];
  }
}, 400);

const selectSiswa = (id, name) => {
  idCustomer.value = id;
  namaSiswa.value = name;
  searched.value = false;
};

// Tambah peserta
const addParticipant = async () => {
  if (!idCustomer.value) {
    Swal.fire("Peringatan", "Silakan pilih siswa terlebih dahulu.", "warning");
    return;
  }

  const roleToSave = selectedOption.value === 'Lainnya' ? customOption.value : selectedOption.value;

  if (!roleToSave || roleToSave.trim() === '') {
    Swal.fire("Peringatan", "Silakan isi pihak sebagai dengan benar.", "warning");
    return;
  }

  try {
    const token = Cookies.get("token");
    const response = await initAPI(
      "post",
      "participant",
      {
        user_id: idCustomer.value,
        conseling_bk_id: props.conselingId,
        as_role: roleToSave, // Field baru: pihak sebagai
      },
      token
    );

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: response.data.message || "Peserta berhasil ditambahkan",
      showConfirmButton: false,
      timer: 2000,
    });

    isModalOpen.value = false;
    namaSiswa.value = "";
    idCustomer.value = null;
    selectedOption.value = '';
    customOption.value = '';

    emit("refresh");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const deleteParticipant = async (id) => {
  const confirm = await Swal.fire({
    icon: "warning",
    title: "Hapus Peserta?",
    text: "Data peserta ini akan dihapus dari daftar.",
    showCancelButton: true,
    confirmButtonText: "Ya, Hapus",
    cancelButtonText: "Batal",
  });

  if (!confirm.isConfirmed) return;

  try {
    const token = Cookies.get("token");
    await initAPI("delete", `participant/${id}`, null, token);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Peserta berhasil dihapus.",
      showConfirmButton: false,
      timer: 1500,
    });

    emit("refresh");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: error.response?.data?.message || "Terjadi kesalahan.",
    });
  }
};

// Hitung jumlah peserta yang valid
const customerCount = computed(() => {
  return props.participants.filter((p) => p.user?.customers).length;
});

// Navigasi detail siswa
const detailSiswa = (id) => {
  try {
    const encodedId = btoa(id);
    const routeData = router.resolve({
      name: "bk.views.detail_siswa",
      query: { student_id: encodedId },
    });
    window.open(routeData.href, "_blank");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat navigasi ke detail siswa.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};


const statusPriority = [
  'Kepala Sekolah',
  'Lainnya',
  'Wali Kelas',
  'Orang Tua atau Wali',
  'Peserta',
];

const sortedParticipants = computed(() => {
  return [...props.participants].sort((a, b) => {
    const mapStatus = (status) => {
      if (status === 'Kepala Sekolah') return 0;
      if (status.toLowerCase().includes('lain') || status.toLowerCase().includes('narasumber') || status.toLowerCase().includes('psikolog')) return 1;
      if (status === 'Wali Kelas') return 2;
      if (status === 'Orang Tua atau Wali') return 3;
      if (status === 'Peserta') return 4;
      return 5; // tidak dikenal
    };

    return mapStatus(a.status) - mapStatus(b.status);
  });
});

</script>
