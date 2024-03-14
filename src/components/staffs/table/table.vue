<template>

    <transition name="fade" mode="out-in">
        <modalDetail v-if="isModalDetail" @toggleModal="toggleModal" :detailSiswa="detailSiswa"/>
    </transition>

    <div class="w-full px-7 mx-auto">
        <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-sm">
            <h1 class="font-myFont text-dark text-lg mb-4">List Siswa / Siswi</h1>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                <div class="mb-1 md:mb-0 lg:mb-0 flex flex-col md:flex-row lg:flex-row items-center gap-1 w-full md:w-2/3 lg:w-1/2">
                    <div class="relative inline-block w-full md:w-1/3 lg:w-1/3">
                        <div class="flex items-center gap-1">
                            <button @click="toggleFilter('gender')" ref="dropdownRefGender" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                            {{ queryParams.gender == 'All' ? 'Jenis Kelamin' : queryParams.gender == '1' ? 'Laki - Laki' : 'Perempuan' }}
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                            </button>
                            <button v-if="isFilterGender" @click="resetFilter('gender')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                        </div>
                        <div v-if="showFilterGender" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                                <a @click="pilihFilter('gender', '1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                    Laki - Laki
                                </a>
                                <a @click="pilihFilter('gender', '2')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                    Perempuan
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="relative inline-block w-full md:w-1/4 lg:w-1/3">
                        <div class="flex items-center gap-1">
                            <button @click="toggleFilter('grade')" ref="dropdownRefGrade" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {{ queryParams.grade == 'All' ? 'Kelas' : 'Kelas '+queryParams.grade }}
                            <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                            </svg>
                            </button>
                            <button v-if="isFilterGrade" @click="resetFilter('grade')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                        </div>
                        <div v-if="showFilterGrade" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                            <div class="py-1" role="none">
                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                            <a @click="pilihFilter('grade', '1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                1
                            </a>
                            <a @click="pilihFilter('grade', '2')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                2
                            </a>
                            <a @click="pilihFilter('grade', '3')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                3
                            </a>
                            </div>
                        </div>
                    </div>
                </div>

                <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3 md:px-[2px] lg:px-3" placeholder="Cari Data">
            </div>

            <div class="flex justify-center w-full" v-if="loading" >
                <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
            </div>

            <div v-else-if="dataSiswa.length > 0 && !loading" class="overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" class="py-3 px-6">No</th>
                        <th scope="col" class="py-3 px-6">Nama</th>
                        <th v-if="staffType == 'SMK'" scope="col" class="py-3 px-6">Jurusan</th>
                        <th scope="col" class="py-3 px-6">Kelas</th>
                        <th scope="col" class="py-3 px-6">No Telp</th>
                        <th scope="col" class="py-3 px-6">Aksi</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(data, index) in dataSiswa" :key="index" class="bg-white border-b">
                            <td class="py-4 px-6">
                                {{ (currPage - 1) * itemsPerPage + index + 1 }}
                            </td>
                            <td class="py-4 px-6">{{ data.name }}</td>
                            <td v-if="staffType == 'SMK'" class="py-4 px-6">{{ data.majoring }}</td>
                            <td class="py-4 px-6">{{ data.grade }}</td>
                            <td class="py-4 px-6">{{ data.number }}</td>
                            <td class="flex items-center gap-1 py-4 px-6">
                                <button @click="btnAction(data.id, 'detail')" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                    <PhFileSearch :size="22"/>
                                </button>
                                <button @click="btnAction(data.id, 'lulus')" class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                    <PhGraduationCap :size="22"/>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <span v-else-if="dataSiswa.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
            <div class="flex flex-col gap-2 lg:flex-row justify-center lg:justify-between items-center mt-4">
                <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                    {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                </span>
                <a class="w-full md:w-full lg:w-1/2 flex justify-center lg:justify-end items-center font-myFont text-dark text-xs lg:text-base">
                    Halaman
                    <div class="mx-2 flex items-center gap-1">
                        <a @click="prevPages(prevPage)" class="cursor-pointer text-base md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                            <PhCaretLeft/>
                        </a>
                        <span class="px-2 py-1 border rounded-lg">
                            {{ currPage }}
                        </span>
                        <a @click="nextPages(nextPage)" class="cursor-pointer text-base md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                            <PhCaretRight/>
                        </a>
                    </div> 
                    Dari {{ totalHalaman }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { PhCaretLeft, PhCaretRight, PhFileSearch, PhX, PhGraduationCap } from '@phosphor-icons/vue';
import { onBeforeUnmount, onMounted,ref } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';
import modalDetail from '../modal/detail.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';

export default {
    name: 'TableStaff',
    components: {PhCaretLeft, PhCaretRight, PhFileSearch, PhX, PhGraduationCap, modalDetail},
    setup(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL
        const staffType = JSON.parse(localStorage.getItem('staffDetail')).institutions.type

        const loading = ref(false)
        const dataSiswa = ref([])
        const detailSiswa = ref(null)
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const isModalDetail = ref(false)

        const showFilterGender = ref(false)
        const isFilterGender = ref(false)
        const showFilterGrade = ref(false)
        const isFilterGrade = ref(false)

        const btnAction = (id, type) => {
            if(type == 'detail'){
                console.log(id)
                const unik = dataSiswa.value.find(item => item.id === id);
                console.log(`unik`,unik)
                detailSiswa.value = unik
                toggleModal()
            } else if(type == 'lulus'){

            }
        }

        const toggleModal = () => {
            isModalDetail.value = !isModalDetail.value
        }

        const queryParams = {
            'search': '',
            'page': '',
            'gender': 'All',
            'grade': 'All',
        }

        const pilihFilter = (type, value) => {
            if(type == 'gender'){
                isFilterGender.value = true
                queryParams.gender = value
            } else if(type == 'grade'){
                isFilterGrade.value = true
                queryParams.grade = value
            }
            getAllData()
        }

        const resetFilter = (params) => {
            if(params == 'gender'){
                queryParams.gender = 'All'
                isFilterGender.value = false
            } else if(params == 'grade'){
                queryParams.grade = 'All'
                isFilterGrade.value = false
            }
            getAllData()
        }

        const toggleFilter = (params) => {
            if(params == 'gender'){
                showFilterGender.value = true
            } else if(params == 'grade') {
                showFilterGrade.value = true
            }
        }

        const dropdownRefGender = ref(null)
        const dropdownRefGrade = ref(null)

        const closeDropdown = (e) => {
            if (dropdownRefGender.value && !dropdownRefGender.value.contains(e.target)) {
                showFilterGender.value = false;
            }

            if (dropdownRefGrade.value && !dropdownRefGrade.value.contains(e.target)) {
                showFilterGrade.value = false
            }
        }

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        onMounted(async() => {
            document.body.addEventListener('click', closeDropdown);
            getAllData()
        })

        const getAllData = async() => {
            let allParams = ''
            console.log(queryParams)
            for (const [key, value] of Object.entries(queryParams)) {
                allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
            }
            console.log(`semua`,allParams)

            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const institution_id = JSON.parse(localStorage.getItem('staffDetail')).institution_id
            const response = await initAPI('get', `customers?is_student=1&institution_id=${institution_id}${allParams}`, null, token)
            console.log(`customers`,response.data)
            dataSiswa.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataSiswa.value)
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', 'customers?search='+cari.value, null, token)
                dataSiswa.value = query.data.data
                totalHalaman.value = query.data.last_page
                itemsPerPage.value = query.data.per_page
                currPage.value = query.data.current_page
                nextPage.value = query.data.next_page_url
                prevPage.value = query.data.prev_page_url
                totalDari.value = query.data.from
                totalKe.value = query.data.to
                totalData.value = query.data.total
                loading.value = !loading.value
            }else{
                return getAllData() 
            }
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
            baseUrl,
            staffType,
            queryParams,
            showFilterGender,
            isFilterGender,
            showFilterGrade,
            isFilterGrade,
            dropdownRefGender,
            dropdownRefGrade,
            loading,
            dataSiswa,
            detailSiswa,
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
            isModalDetail,
            nextPages,
            prevPages,
            getSearchData,
            btnAction,
            toggleModal,
            toggleFilter,
            pilihFilter,
            resetFilter
        }
    }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>