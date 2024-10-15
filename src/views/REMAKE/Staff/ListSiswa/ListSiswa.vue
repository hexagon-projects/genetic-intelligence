<template>
    <div v-if="loading" class="preloader-overlay">
      <span
        class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"
      ></span>
    </div>
  
    <Layout v-if="!loading">
      <section class="bg-white py-[66px] px-[20px] md:px-[60px]">
        <div class="flex flex-col gap-[36px]">
          <div class="flex justify-between items-center mb-5">
            <div class="text-[#32324D] font-['Roboto'] leading-loose">
              <div class="text-xl md:text-3xl font-semibold">List Siswa</div>
              <span class="text-gray-500 text-sm">{{ totalSiswa }} entries found</span>
            </div>
  
            <button
              class="text-white rounded-md py-2 px-3 bg-[#12B76A] font-medium flex items-center gap-3"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5 7.5V9.5C10.5 9.76522 10.3946 10.0196 10.2071 10.2071C10.0196 10.3946 9.76522 10.5 9.5 10.5H2.5C2.23478 10.5 1.98043 10.3946 1.79289 10.2071C1.60536 10.0196 1.5 9.76522 1.5 9.5V7.5M3.5 5L6 7.5M6 7.5L8.5 5M6 7.5V1.5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
  
              Export Data
            </button>
          </div>
        </div>
  
        <div class="flex flex-col mb-3">
          <div class="flex flex-wrap justify-between items-center gap-4">
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

            <div class="flex items-center gap-4">
              <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
                <select
                  name="sortBy"
                  v-model="sortBy"
                  class="p-1 px-3 pr-10 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option v-for="option in sortByOptions" :key="option" :value="option.value" class="font-roboto">
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
              <div class="text-[#32324D] font-['Roboto'] leading-loose flex flex-row">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Cari data siswa"
                    class="p-1 px-3 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
              </div>
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
               <table v-if="listSiswa.length > 0"
                  class="w-full border-separate border-spacing-0 text-left text-gray-500 text-sm font-['Roboto'] leading-normal"
                >
                  <thead class="text-[#344053]">
                    <tr>
                      <th class="py-3 px-4">PROFIL</th>
                      <th class="py-3 px-4">KELAS</th>
                      <th class="py-3 px-4">NAMA SEKOLAH</th>
                      <th class="py-3 px-4">TERAKHIR TES</th>
                      <th class="py-3 px-4">TOTAL TES</th>
                      <th class="py-3 px-4">AKSI</th>
                    </tr>
                  </thead>
      
                  <tbody v-for="(siswa, index) in listSiswa" :key="index">
                    <tr class="border-b">
                      <td class="py-3 px-4 flex items-center gap-2">
                          <img
                              src="@/assets/img/profile-mock.png"
                              alt="user"
                              class="w-8 h-8 rounded-full mr-2"
                          />
                        {{ siswa.name }}
                      </td>
                      <td class="py-3 px-4">{{ siswa.grade }} {{ siswa.majoring }}</td>
                      <td class="py-3 px-4">{{ siswa.institutions.name }}</td>
                      <td class="py-3 px-4">{{ siswa.updated_at }}</td>
                      <td class="py-3 px-4">{{ siswa.total_test }}</td>
                      <td class="py-3 px-4">
                        <button
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
              <div class="text-[#32324D] font-['Roboto'] leading-loose relative">
                <select
                  name="Kelas"
                  class="p-1 px-3 pr-10 rounded-lg bg-transparent border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                >
                  <option value="20" selected>20</option>
                  <option value="10">10</option>
                  <option value="5">5</option>
                </select>
                <!-- SVG Icon for Kelas -->
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
              <p>Entries per page.</p>
            </div>
  
            <div class="flex gap-2">
              <button>&lt;</button>
                <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : true}">1</button>
                <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">2</button>
                <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">3</button>
                <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">...</button>
                <button class="py-1 px-3 hover:text-[#271FE0]" :class="{'rounded-md shadow-md bg-white' : false}">10</button>
              <button>></button>
            </div>
           </div>
  
         </div>
      </section>
    </Layout>
  </template>
  
  <script setup>
    import Layout from "@/Layout/Kepsek/Layout.vue";
    import { PhX, PhMagnifyingGlass } from "@phosphor-icons/vue";
    import initAPI from "@/api/api";
    import Cookies from "js-cookie";
    import { ref, onMounted, watch } from "vue";
    import Swal from "sweetalert2";
    import { debounce } from 'lodash'
    import FilterItem from "@/components/REMAKE/Staff/FilterItem/FilterItem.vue";
 
    const kepsekData = ref(JSON.parse(localStorage.getItem('userData')))

    const kelas = ref('')
    const kelasOptions = ref(
        kepsekData.value.staff.institutions.type !== 'SMK' ||
        kepsekData.value.staff.institutions.type !== 'SMA' ||
        kepsekData.value.staff.institutions.type !== 'SMP' ?
        ['', '1', '2', '3'] 
        : kepsekData.value.staff.institutions.type == 'SD' ?
        ['', '1', '2', '3', '4', '5', '6']
        : ['', '1', '2']
    )

    const tipeKecerdasan = ref('')
    const tipeKecerdasanOptions = ref([
        {value: '', label: 'Tipe Kecerdasan'},
        {value: 'Neokorteks Kiri Introvert', label: 'Neokorteks Kiri Introvert'},
        {value: 'Limbik Kanan Ekstrovert', label: 'Limbik Kanan Ekstrovert'},
        {value: 'Limbik Kiri Introvert', label: 'Limbik Kiri Introvert'},
        {value: 'Limbik Kiri Ekstrovert', label: 'Limbik Kiri Ekstrovert'},
        {value: 'Limbik Kanan Introvert', label: 'Limbik Kanan Introvert'},
        {value: 'Neokorteks Kanan Ekstrovert', label: 'Neokorteks Kanan Ekstrovert'},
        {value: 'Neokorteks Kanan Introvert', label: 'Neokorteks Kanan Introvert'},
        {value: 'Neokorteks Kiri Ekstrovert', label: 'Neokorteks Kiri Ekstrovert'},
        {value: 'Otak Tengah', label: 'Otak Tengah'},
      ])

    const gayaBelajar = ref('')
    const gayaBelajarOptions = ref(
        [
            {value: '', label: 'Gaya Belajar'},
            {value: 1, label: 'Visual'},
            {value: 2, label: 'Auditori'},
            {value: 3, label: 'Kinestik'},
            {value: 4, label: 'Visual & Auditori'},
            {value: 5, label: 'Visual & Kinestetik'},
            {value: 6, label: 'Auditori &  Kinestetik'},
        ]
    )

    const skorIq = ref('')
    const skorIqOptions = ref(
        [
            {value: '', label: 'Grade IQ'},
            {value: 1, label: '> 119'},
            {value: 2, label: '111 - 119'},
            {value: 3, label: '91 - 110'},
            {value: 4, label: '80 - 90'},
            {value: 5, label: '< 80'},
        ]
    )

    const sortBy = ref('')
    const sortByOptions = ref([
      {label: 'Sort By', value: ''},
      {label: 'A - Z', value: 'ascending'},
      {label: 'Z - A', value: 'descending'},
    ])

    const searchQuery = ref('')

    const isFilter = ref({
        type: 'Kelas'
    })

    const resetFilter = (filterType) => {
        switch (filterType) {
            case 'kelas':
                kelas.value = '';
                break;

            case 'tipeKecerdasan':
                tipeKecerdasan.value = '';
                break;

            case 'skorIq':
                skorIq.value = '';
                break;

            case 'gayaBelajar':
                gayaBelajar.value = '';
                break;
        }
        
        isFilter.value.show = false;
    }

    const listSiswa = ref([]);
    const totalSiswa = ref('')

    const getSiswa = async() => {
        try {
            const token = Cookies.get("token");

            const institutionId = localStorage.getItem('userData')
            ? JSON.parse(localStorage.getItem('userData')).staff.institution_id : null

            let query = `institution_id=${institutionId}`;

            if (kelas.value) {
                query += `&grade=${kelas.value}`;
            }

            if (tipeKecerdasan.value) {
                query += `&gim=${tipeKecerdasan.value}`;
            }

            if (skorIq.value) {
                query += `&iq_id=${skorIq.value}`;
            }

            if (gayaBelajar.value) {
                query += `&assessment_id=${gayaBelajar.value}`;
            }

            if (searchQuery.value) {
                query += `&search=${searchQuery.value}`;
            }

            const response = await initAPI("get", `customers?${query}`, null, token);

            listSiswa.value = response.data.data
            totalSiswa.value = response.data.total
        } catch (error) {
            Swal.fire({
            icon: "error",
            title: "Error",
            text: "Terjadi error saat mengambil data List Siswa.",
            showConfirmButton: false,
            timer: 2000,
            });
        }
    }

const debouncedSearch = debounce(() => {
  getSiswa();
}, 500)

onMounted(() => {
    getSiswa()
})

watch([kelas, tipeKecerdasan, skorIq, gayaBelajar], () => {
    getSiswa();
});

watch(searchQuery, () => {
    debouncedSearch(); // Panggil yang di-debounce
});
</script>
  