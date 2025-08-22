<template>
  <div v-if="loading" class="preloader-overlay">
    <span
      class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
    ></span>
  </div>

  <Layout v-if="!loading">
    <div class="bg-gray-100 p-5 min-h-screen">
      <div class="w-full md:w-4/5 mx-auto">
        <!-- header -->
        <div class="md:flex items-end justify-between grid grid-cols-1 gap-2">
          <!-- Welcome -->
          <div class="flex flex-col gap-2">
            <h1
              class="text-[#0c141c] text-3xl md:text-2xl font-semibold font-['Roboto'] leading-10"
            >
              Selamat Datang, {{ userData.customer.first_name }}
              {{ userData.customer.last_name }}
            </h1>
            <span
              class="self-stretch text-[#4c7099] text-sm font-normal font-['Roboto'] leading-tight"
              >Berikut ringkasan aktivitas pengujian siswa</span
            >
          </div>
          <!-- pilih sekolah -->
          <div class="flex flex-col gap-2">
            <span
              class="self-stretch text-[#4c7099] text-sm font-['Roboto'] leading-tight"
              >Pilih Sekolah</span
            >
            <select
              v-model="selectedInstitutionId"
              class="border border-gray-300 rounded-md p-2 text-sm"
            >
              <option disabled value="">-- Pilih Sekolah --</option>
              <option
                v-for="item in placementData"
                :key="item.institution.id"
                :value="item.institution.id"
              >
                {{ item.institution.name }}
              </option>
            </select>
          </div>
        </div>
        <section
          class="bg-white p-5 md:p-10 mt-10 rounded-2xl text-xs"
        >
          <div class="flex flex-col gap-[36px]">
            <div class="flex justify-between items-center mb-5">
              <div class="text-[#32324D] font-['Roboto'] leading-loose">
                <div class="text-xl md:text-3xl font-semibold">
                  Data Siswa
                </div>
                <span class="text-gray-500 text-sm"
                  >{{ totalSiswa }} Data Ditemukan</span
                >
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-[13px] mb-3">
            <div class="flex flex-wrap justify-between items-center gap-4">
              <div class="flex items-center gap-2">
                <button
                  @click="showFilter = !showFilter"
                  :class="{
                    'bg-[#f6f6f9]': showFilter,
                    'bg-white': !showFilter,
                  }"
                  class="transition-all py-2 px-3 rounded-lg border border-gray-300 shadow-sm flex gap-2"
                >
                  <img src="@/assets/icons/filter.svg" alt="icon" />
                  Filter
                </button>

                <div
                  class="text-[#32324D] font-['Roboto'] leading-loose relative"
                >
                  <select
                    name="sortBy"
                    v-model="sortBy"
                    class="p-1 px-3 pr-10 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    <option
                      v-for="option in sortByOptions"
                      :key="option"
                      :value="option.value"
                      class="font-roboto"
                    >
                      {{ option.label }}
                    </option>
                  </select>

                  <svg
                    width="8"
                    height="4"
                    viewBox="0 0 8 4"
                    fill="none"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.5 0.444444C7.5 0.564815 7.45671 0.668981 7.37012 0.756944L4.30762 3.86806C4.22103 3.95602 4.11849 4 4 4C3.88151 4 3.77897 3.95602 3.69238 3.86806L0.629883 0.756944C0.543294 0.668981 0.5 0.564815 0.5 0.444444C0.5 0.324074 0.543294 0.219907 0.629883 0.131944C0.716471 0.0439815 0.81901 0 0.9375 0H7.0625C7.18099 0 7.28353 0.0439815 7.37012 0.131944C7.45671 0.219907 7.5 0.324074 7.5 0.444444Z"
                      fill="#8E8EA9"
                    />
                  </svg>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div
                  class="text-[#32324D] font-['Roboto'] leading-loose flex flex-row"
                >
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari data pengguna"
                    class="p-1 px-3 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div
              v-if="showFilter"
              class="p-4 bg-white rounded-xl border border-[#cfd4dc]"
            >
              <div class="flex flex-wrap gap-4">
                <FilterItem
                  label="Kelas"
                  v-model="kelas"
                  FilterType="kelas"
                  :options="kelasOptions"
                  @reset="resetFilter('kelas')"
                />

                <FilterItem
                  label="Kecerdasan Dominan"
                  v-model="tipeKecerdasan"
                  :options="tipeKecerdasanOptions"
                  @reset="resetFilter('tipeKecerdasan')"
                />

                <FilterItem
                  label="Gaya Belajar"
                  v-model="gayaBelajar"
                  :options="gayaBelajarOptions"
                  @reset="resetFilter('gayaBelajar')"
                />

                <FilterItem
                  label="Grade IQ"
                  v-model="skorIq"
                  :options="skorIqOptions"
                  @reset="resetFilter('skorIq')"
                />
              </div>
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
                  v-if="listSiswa.length > 0"
                  class="w-full border-separate border-spacing-0 text-left text-gray-500 font-['Roboto'] leading-normal text-xs"
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

                  <tbody v-for="(siswa, index) in listSiswa" :key="index">
                    <tr class="border-b">
                      <td class="py-3 px-4">{{ index + 1 }}</td>
                      <td class="py-3 px-4 flex items-center gap-2">
                        <img
                          src="@/assets/img/profile-mock.png"
                          alt="user"
                          class="w-8 h-8 rounded-full mr-2"
                        />
                        {{ siswa.name }}
                      </td>
                      <td class="py-3 px-4">{{ siswa.grade }}</td>
                      <td class="py-3 px-4">{{ siswa.majoring }}</td>
                      <td class="py-3 px-4">{{ siswa.institutions.name }}</td>
                      <td class="py-3 px-4">{{ siswa.updated_at }}</td>
                      <td class="py-3 px-4">{{ siswa.total_test }}</td>
                      <td class="py-3 px-4">
                        <button
                          @click="detailSiswa(siswa.id)"
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

                <div v-else class="w-full flex justify-center">
                  <span class="mx-auto font-roboto text-lg text-black">
                    Data Kosong...
                  </span>
                </div>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <FilterItem
                  label="10"
                  v-model="perPage"
                  :options="perPageOptions"
                  @reset="resetFilter('perPage')"
                />

                <div
                  class="text-[#8e8ea9] text-base font-normal font-['Roboto'] leading-none"
                >
                  Data Perhalaman
                </div>
              </div>

              <div class="flex items-center gap-3">
                <!-- Button Previous -->
                <button
                  :class="{ 'opacity-40 cursor-not-allowed': currentPage == 1 }"
                  class="flex items-center gap-[6px]"
                  @click="prevPage"
                  :disabled="currentPage === 1"
                >
                  <img
                    class="size-[12px]"
                    src="@/assets/icons/chevron_left.svg"
                    alt="icon"
                  />
                  <span class="font-roboto text-black">Pertama</span>
                </button>

                <!-- Tampilkan halaman yang visible -->
                <button
                  v-for="page in pagesToShow"
                  :key="page"
                  @click="goToPage(page)"
                  class="font-roboto py-1 px-3 hover:text-[#271FE0]"
                  :class="{
                    'rounded-md shadow-md border bg-white text-[#271FE0]':
                      page === currentPage,
                  }"
                >
                  {{ page }}
                </button>

                <!-- Button Next -->
                <button
                  :class="{
                    'opacity-40 cursor-not-allowed': currentPage == lastPage,
                  }"
                  class="flex items-center gap-[6px]"
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                >
                  <span class="font-roboto text-black">Terakhir</span>
                  <img
                    class="size-[12px]"
                    src="@/assets/icons/chevron_right.svg"
                    alt="icon"
                  />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import { ref, onMounted, watch, computed } from "vue";
import initAPI from "@/api/api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import FilterItem from "@/components/REMAKE/Staff/FilterItem/FilterItem.vue";
import { debounce } from "lodash";
import { useRouter } from "vue-router";

const userData = JSON.parse(localStorage.getItem("userData"));
const isLoading = ref(false);

const currentPage = ref("");
const lastPage = ref("");
const totalPages = ref("");
const firstPageUrl = ref("");
const lastPageUrl = ref("");

const placementData = ref([]);
const selectedInstitutionId = ref("");

const perPage = ref(10);
const perPageOptions = ref([
  { value: "", label: "10 (Default)" },
  { value: 10, label: "10" },
  { value: 15, label: "15" },
  { value: 20, label: "20" },
]);

const kelas = ref("");
const kelasOptions = ref([{ value: "", label: "Kelas" }]);

const tipeKecerdasan = ref("");
const tipeKecerdasanOptions = ref([
  { value: "", label: "Tipe Kecerdasan" },
  { value: "Neokorteks Kiri Introvert", label: "Neokorteks Kiri Introvert" },
  { value: "Limbik Kanan Ekstrovert", label: "Limbik Kanan Ekstrovert" },
  { value: "Limbik Kiri Introvert", label: "Limbik Kiri Introvert" },
  { value: "Limbik Kiri Ekstrovert", label: "Limbik Kiri Ekstrovert" },
  { value: "Limbik Kanan Introvert", label: "Limbik Kanan Introvert" },
  {
    value: "Neokorteks Kanan Ekstrovert",
    label: "Neokorteks Kanan Ekstrovert",
  },
  { value: "Neokorteks Kanan Introvert", label: "Neokorteks Kanan Introvert" },
  { value: "Neokorteks Kiri Ekstrovert", label: "Neokorteks Kiri Ekstrovert" },
  { value: "Otak Tengah", label: "Otak Tengah" },
]);

const gayaBelajar = ref("");
const gayaBelajarOptions = ref([
  { value: "", label: "Gaya Belajar" },
  { value: 1, label: "Visual" },
  { value: 2, label: "Auditori" },
  { value: 3, label: "Kinestik" },
  { value: 4, label: "Visual & Auditori" },
  { value: 5, label: "Visual & Kinestetik" },
  { value: 6, label: "Auditori &  Kinestetik" },
]);

const skorIq = ref("");
const skorIqOptions = ref([
  { value: "", label: "Grade IQ" },
  { value: 1, label: "> 119" },
  { value: 2, label: "111 - 119" },
  { value: 3, label: "91 - 110" },
  { value: 4, label: "80 - 90" },
  { value: 5, label: "< 80" },
]);

const sortBy = ref("");
const sortByOptions = ref([
  { label: "Urutkan Berdasarkan", value: "" },
  { label: "Terbaru", value: "latest" },
  { label: "Terlama", value: "oldest" },
]);

const searchQuery = ref("");

const showFilter = ref(false);
const isFilter = ref({
  type: "Kelas",
});

const resetFilter = (filterType) => {
  switch (filterType) {
    case "kelas":
      kelas.value = "";
      break;

    case "tipeKecerdasan":
      tipeKecerdasan.value = "";
      break;

    case "skorIq":
      skorIq.value = "";
      break;

    case "gayaBelajar":
      gayaBelajar.value = "";
      break;

    case "perPage":
      perPage.value = "";
      break;
  }

  currentPage.value = 1; // reset pagination saat filter direset
  isFilter.value.show = false;
};

const listSiswa = ref([]);
const totalSiswa = ref("");

const getSiswa = async (jumpEndpoint = null) => {
  isLoading.value = true;
  try {
    const token = Cookies.get("token");

    let endpoint = `institution_id=${selectedInstitutionId.value}`;

    if (kelas.value) {
      endpoint += `&grade=${kelas.value}`;
    }

    if (tipeKecerdasan.value) {
      endpoint += `&gim=${tipeKecerdasan.value}`;
    }

    if (skorIq.value) {
      endpoint += `&iq_id=${skorIq.value}`;
    }

    if (gayaBelajar.value) {
      endpoint += `&assessment_id=${gayaBelajar.value}`;
    }

    if (sortBy.value) {
      endpoint += `&sort_by=${sortBy.value}`;
    }

    if (searchQuery.value) {
      endpoint += `&search=${searchQuery.value}`;
    }

    if (perPage.value) {
      endpoint += `&perpage=${perPage.value}`;
    }

    if (currentPage.value) {
      endpoint += `&page=${currentPage.value}`;
    }

    if (jumpEndpoint !== null) {
      const formattedEndpoint = jumpEndpoint.split("api/")[1];
      // console.log(`splited`, formattedEndpoint)
      const response = await initAPI("get", formattedEndpoint, null, token);
      listSiswa.value = response.data.data;
      totalSiswa.value = response.data.total;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
      totalPages.value = response.data.last_page;
      firstPageUrl.value = response.data.first_page_url;
      lastPageUrl.value = response.data.last_page_url;
    } else {
      const response = await initAPI(
        "get",
        `customers?${endpoint}`,
        null,
        token
      );
      listSiswa.value = response.data.data;
      totalSiswa.value = response.data.total;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
      totalPages.value = response.data.last_page;
      firstPageUrl.value = response.data.first_page_url;
      lastPageUrl.value = response.data.last_page_url;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data List Siswa.",
      showConfirmButton: false,
      timer: 2000,
    });
  } finally {
    isLoading.value = false;
  }
};

const debouncedSearch = debounce(() => {
  getSiswa();
}, 500);

const getKelas = async () => {
  try {
    const token = Cookies.get("token");

    const response = await initAPI(
      "get",
      `grades?institution_id=${selectedInstitutionId.value}`,
      null,
      token
    );

    const arrFormattedData = response.data.map((item) => ({
      value: item.grade,
      label: item.grade,
    }));

    kelasOptions.value = [...kelasOptions.value, ...arrFormattedData];
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Terjadi error saat mengambil data kelas.",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const getPlacementData = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "placement", null, token);
    placementData.value = response.data.data;
    if (placementData.value.length > 0) {
      selectedInstitutionId.value = placementData.value[0].institution.id;
    }
  } catch (error) {
    console.error("Gagal ambil data placement", error);
  }
};

watch(selectedInstitutionId, (newVal, oldVal) => {
  console.log("Institusi berubah:", oldVal, "=>", newVal);
  if (newVal) {
    getSiswa();
    getKelas();
  }
});

onMounted(async () => {
  await getPlacementData(); // ini akan trigger watch → getSiswa & getKelas
});

watch([kelas, tipeKecerdasan, skorIq, gayaBelajar, sortBy, perPage], () => {
  getSiswa();
});

watch(searchQuery, () => {
  debouncedSearch(); // Panggil yang di-debounce
});

watch([currentPage, totalPages], () => {
  // calculateVisiblePages();
  getSiswa();
});

const pagesToShow = computed(() => {
  const pageCount = 5; // Jumlah halaman yang ingin ditampilkan
  const current = currentPage.value ? Number(currentPage.value) : 1; // Pastikan currentPage adalah angka
  const total = lastPage.value ? Number(lastPage.value) : 0; // Pastikan lastPage adalah angka

  // Hitung halaman awal dan akhir
  const startPage = Math.max(
    1,
    Math.min(current - Math.floor(pageCount / 2), total - pageCount + 1)
  );
  const endPage = Math.min(startPage + pageCount - 1, total);

  let pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

const goToPage = (page) => {
  currentPage.value = page;
};

const nextPage = () => {
  if (lastPageUrl.value !== null) {
    getSiswa(lastPageUrl.value);
  }
  // if (currentPage.value < totalPages.value) {
  //   currentPage.value++;
  // }
};

const prevPage = () => {
  if (firstPageUrl.value !== null) {
    getSiswa(firstPageUrl.value);
  }
  // if (currentPage.value > 1) {
  //   currentPage.value--;
  // }
};

const router = useRouter();

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
