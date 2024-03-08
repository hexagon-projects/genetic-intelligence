<template>
    <section class="bg-gray-100 pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Users
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.guru'}" class="text-base text-dark hover:text-dark/70">
                    Data Guru
                </RouterLink>
            </ol>
        </div>

        <div v-if="isModalTambahGuru == true">
            <ModalTambahGuru @initRegistrasi="toggleTambahGuru"/>
        </div>
    
        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">List Kepsek / Guru BK</h1>
                    <div class="w-1/6 flex items-center gap-1 mb-2">
                        <button @click="isModalTambahGuru = !isModalTambahGuru" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont flex w-full justify-center items-center gap-x-1.5 rounded-md bg-biru px-3 py-2 text-sm font-medium text-light hover:bg-opacity-75 hover:shadow-md">
                            <PhPlus :size="20"/>
                            Registrasi Kepsek / BK
                        </button>
                    </div>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                            <div class="flex items-center gap-2 mb-2">
                                <div class="w-full flex items-center gap-1">
                                    <button @click="toggleFilter('type')" ref="dropdownRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.type == 'All' ? 'Role' : queryParams.type }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button v-if="filterRole" @click="resetFilter('type')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilterType" class="absolute left-22 top-[350px] z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterTipe('Guru BK')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            Guru BK
                                        </a>
                                        <a @click="filterTipe('Kepala Sekolah')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            Kepala Sekolah
                                        </a>
                                    </div>
                                </div>
                                <div class="w-full flex items-center gap-1">
                                    <button @click="toggleFilter" ref="dropdownInstitutionRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full lg:w-[168px] justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.institution_type == 'All' ? 'Tingkat Pendidikan' : queryParams.institution_type }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button v-if="filterInstitution" @click="resetFilter('institution')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilterTypePendidikan" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterInstitutionTipe('SD')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            SD
                                        </a>
                                        <a @click="filterInstitutionTipe('SMP')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            SMP
                                        </a>
                                        <a @click="filterInstitutionTipe('SMA')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            SMA
                                        </a>
                                        <a @click="filterInstitutionTipe('SMK')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            SMK
                                        </a>
                                    </div>
                                </div>
                            </div>
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="mb-3 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>
    
                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataGuru.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Nama</th>
                                <th scope="col" class="py-3 px-6">Role</th>
                                <th scope="col" class="py-3 px-6">Sekolah</th>
                                <th scope="col" class="py-3 px-6">Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataGuru" :key="index" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.name }}</td>
                                    <td class="py-4 px-6">{{ data.type }}</td>
                                    <td class="py-4 px-6">{{ data.institutions.name }}</td>
                                    <td class="flex items-center gap-2 py-4 px-6">
                                        <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhPencilSimple :size="22"/>
                                        </button>
                                        <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-danger font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhTrash :size="22"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataGuru.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                    
                    <div class="flex justify-between items-center mt-4">
                        <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                            {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                        </span>
                        <a class="flex items-center font-myFont text-dark text-xs lg:text-base">
                            Halaman
                            <div class="mx-2 flex items-center gap-1">
                                <a @click="prevPages(prevPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                    <PhCaretLeft/>
                                </a>
                                <span class="px-2 py-1 border rounded-lg">
                                    {{ currPage }}
                                </span>
                                <a @click="nextPages(nextPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                    <PhCaretRight/>
                                </a>
                            </div> 
                            Dari {{ totalHalaman }}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalTambahGuru from './form/registrasi.vue'
import initAPI from '../../../../api/api'
import _debounce from 'lodash/debounce';
import { PhCaretLeft, PhCaretRight, PhPencilSimple, PhTrash, PhPlus, PhX } from '@phosphor-icons/vue';

export default {
    name: 'DataGuru',
    components: {PhPlus, PhCaretLeft, PhCaretRight, PhPencilSimple, PhTrash, PhX, ModalTambahGuru},
    setup(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const isModalTambahGuru = ref(false)

        const loading = ref(false)
        const dataGuru = ref([])
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const isModalTambahSekolah = ref(false)

        const labelFilter = ref('Tingkat Pendidikan')
        const showFilterType = ref(false)
        const showFilterTypePendidikan = ref(false)
        const filterRole = ref(false)
        const filterInstitution = ref(false)

        const toggleFilter = (params) => {
            console.log(`yeuh param`,params)
            if(params == 'type'){
                showFilterType.value = !showFilterType.value
            } else {
                showFilterTypePendidikan.value = !showFilterTypePendidikan.value
            }
        }

        const dropdownRef = ref(null);
        const dropdownInstitutionRef = ref(null);

        const closeDropdown = (e) => {
            if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
                showFilterType.value = false;
            }

            if (dropdownInstitutionRef.value && !dropdownInstitutionRef.value.contains(e.target)) {
                showFilterTypePendidikan.value = false;
            }
        };

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });


        const toggleTambahGuru = () => {
            isModalTambahGuru.value = !isModalTambahGuru.value
        }

        onMounted(async() => {
            getAllData()
            document.body.addEventListener('click', closeDropdown);
        })

        const queryParams = {
            'search': '',
            'page': '',
            'type': 'All',
            'institution_type': 'All'
        }

        const getAllData = async() => {
            loading.value = !loading.value
            
            let allParams = '?'
            console.log(queryParams)
            for (const [key, value] of Object.entries(queryParams)) {
                allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
            }
            console.log(`semua`,allParams)

            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', `staffs`+allParams.replace('?&', '?'), null, token)
            console.log(`customers`,response.data)
            dataGuru.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataGuru.value)
        }

        const filterTipe = (params) => {
            // labelFilter.value = params
            filterRole.value = true
            queryParams.type = params
            getAllData()
        }

        const filterInstitutionTipe = (params) => {
            // labelFilter.value = params
            filterInstitution.value = true
            queryParams.institution_type = params
            getAllData()
        }

        const resetFilter = (params) => {
            if(params == 'type'){
                queryParams.type = 'All'
                filterRole.value = false
            } else {
                queryParams.institution_type = 'All'
                filterInstitution.value = false
            }
            getAllData()
        }

        const debouncedGetSearchData = _debounce(() => {
            queryParams.search = cari.value !== '' ? cari.value : ''
            queryParams.page = ''
            getAllData()
        }, 500)

        const nextPages = async(url) => {
            queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
            getAllData()
        }
        
        const prevPages = async(url) => {
            queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
            getAllData()
        }

        return {
            loading,
            isModalTambahGuru,
            queryParams,
            toggleTambahGuru,
            dataGuru,
            totalHalaman,
            itemsPerPage,
            currPage,
            nextPage,
            prevPage,
            totalDari,
            totalKe,
            totalData,
            cari,
            debouncedGetSearchData,
            showFilterType,
            showFilterTypePendidikan,
            dropdownRef,
            dropdownInstitutionRef,
            filterRole,
            filterInstitution,
            filterInstitution,
            toggleFilter,
            filterTipe,
            filterInstitutionTipe,
            resetFilter
        }
    }
}
</script>