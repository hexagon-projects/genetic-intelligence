<template>
  <!-- Overview Data Siswa -->
  <div class="bg-white p-4 flex flex-col rounded-xl mt-10">
    <div
      class="flex flex-col justify-start lg:flex-row lg:justify-between items-start lg:items-center mb-5 px-4"
    >
      <div class="text-[#0c141c] font-['Roboto'] leading-loose">
        <div class="text-xl md:text-3xl font-semibold">Overview Data Siswa</div>
      </div>

      <RouterLink
        :to="{ name: 'bk.views.pengguna' }"
        class="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-3"
      >
        Lihat Selengkapnya
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.25L7.75 8L1 14.75"
            stroke="#008AFF"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
    </div>

    <div class="overflow-auto w-full">
      <table
        class="w-full border-separate border-spacing-0 text-left text-[#0c141c] text-sm font-['Roboto'] leading-normal"
      >
        <thead class="text-[#344053]">
          <tr>
            <th class="py-3 px-4">#</th>
            <th class="py-3 px-4">PROFIL</th>
            <th class="py-3 px-4">KELAS</th>
            <th class="py-3 px-4">JURUSAN</th>
            <th class="py-3 px-4">NAMA SEKOLAH</th>
            <th class="py-3 px-4">TERAKHIR TES</th>
            <th class="py-3 px-4">TOTAL TES</th>
            <th class="py-3 px-4">AKSI</th>
          </tr>
        </thead>

        <tbody v-if="dataSiswa.length">
          <tr v-for="(item, index) in dataSiswa" :key="index" class="border-b">
            <td class="py-3 px-4">{{ index + 1 }}</td>
            <td class="py-3 px-4 flex items-center gap-2">
              <img
                src="@/assets/img/profile-mock.png"
                alt="user"
                class="w-8 h-8 rounded-full mr-2"
              />
              {{ item.name }}
            </td>
            <td class="py-3 px-4">{{ item.grade }}</td>
            <td class="py-3 px-4">{{ item.majoring }}</td>
            <td class="py-3 px-4">{{ item.institutions.name ?? '-' }}</td>
            <td class="py-3 px-4">{{ item.updated_at }}</td>
            <td class="py-3 px-4">{{ item.total_test }}</td>
            <td class="py-3 px-4">
              <button
                @click="detailSiswa(item.id)"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
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
        <tbody v-else>
          <tr>
            <td colspan="8" class="text-center py-6 text-gray-500">
              Data siswa tidak tersedia.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const selectedInstitutionId = ref("");
const dataSiswa = ref([]);
const data_test_counts = ref([0]);

const getPlacementData = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "placement", null, token);
    const placements = response.data.data;
    if (placements.length > 0) {
      selectedInstitutionId.value = placements[0].institution.id;
    }
  } catch (error) {
    console.error("Gagal ambil data placement", error);
  }
};

const getSiswa = async () => {
  const token = Cookies.get("token");

  // Cek apakah ID institusi tersedia
  if (!selectedInstitutionId.value) {
    dataSiswa.value = []; // Kosongkan dataSiswa agar tabel tidak menampilkan apa-apa
    return; // Stop eksekusi
  }

  try {
    const response = await initAPI(
      "get",
      `customers?institution_id=${selectedInstitutionId.value}`,
      null,
      token
    );

    // Filter data: hanya yang total_test tidak null dan tidak 0
    const filteredData = (response.data.data || []).filter(item => {
      return item.total_test && item.total_test !== 0;
    });

    dataSiswa.value = filteredData;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data Assessment user.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};


watch(selectedInstitutionId, () => {
  getSiswa();
});

onMounted(async () => {
  await getPlacementData();
  await getSiswa();
});

const detailSiswa = (id) => {
  try {
    const encodedId = btoa(id);
    router.push({
      name: "bk.views.detail_siswa",
      query: { student_id: encodedId },
    });
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
</script>
