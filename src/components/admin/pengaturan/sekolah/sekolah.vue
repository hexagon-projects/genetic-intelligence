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
                <RouterLink :to="{name: 'admin.views.sekolah'}" class="text-base text-dark hover:text-dark/70">
                    Data Sekolah
                </RouterLink>
            </ol>
        </div>

        <transition name="fade" mode="out-in">
            <ModalTambahSekolah v-if="isModalTambahSekolah == true" :detailData="detailData" :method="methodType" @initRegistrasi="toggleRegistrasi"/>
        </transition>
    
        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">List Reservasi</h1>
                    <div class="mb-2 flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <div class="relative flex flex-col gap-2 text-left">
                            <div class="flex items-center gap-1">
                                <button @click="btnAction(null, 'registrasi')" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont flex w-full justify-center items-center gap-x-1.5 rounded-md bg-biru px-3 py-2 text-sm font-medium text-light hover:bg-opacity-75 hover:shadow-md">
                                    <PhPlus :size="20"/>
                                    Tambah Sekolah / Perguruan Tinggi
                                </button>
                            </div>

                            <div class="relative inline-block text-left">
                                <div class="flex items-center gap-1">
                                    <button @click="toggleFilter" ref="dropdownRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                    {{ labelFilter }}
                                    <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                    </svg>
                                    </button>
                                    <button v-if="isFilter" @click="resetFilter" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="showFilter" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a @click="filterTingkat('SD')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        SD
                                    </a>
                                    <a @click="filterTingkat('SMP')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        SMP
                                    </a>
                                    <a @click="filterTingkat('SMA')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        SMA
                                    </a>
                                    <a @click="filterTingkat('SMK')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        SMK
                                    </a>
                                    <a @click="filterTingkat('Perguruan Tinggi')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Perguruan Tinggi
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="mb-1 md:-mb-10 lg:-mb-10 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataSekolah.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Nama</th>
                                <th scope="col" class="py-3 px-6">Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataSekolah" :key="index" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.name }}</td>
                                    <td class="flex items-center gap-2 py-4 px-6">
                                        <button @click="btnAction(data.id, 'update')" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhPencilSimple :size="22"/>
                                        </button>
                                        <button @click="btnAction(data.id, 'delete')" class="flex items-center gap-1 px-4 py-2 bg-danger font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhTrash :size="22"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataSekolah.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                    
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
import ModalTambahSekolah from './form/tambah.vue'
import initAPI from '../../../../api/api'
import { PhCaretLeft, PhCaretRight, PhPencilSimple, PhTrash, PhPlus, PhX } from '@phosphor-icons/vue';
import _debounce from 'lodash/debounce';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'AdminReservasi',
    components: {PhCaretLeft, PhCaretRight, PhPencilSimple, PhTrash, PhPlus, PhX, ModalTambahSekolah},
    setup(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const loading = ref(false)
        const dataSekolah = ref([])
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
        const methodType = ref('')
        const detailData = ref('')

        const labelFilter = ref('Tingkat Pendidikan')
        const showFilter = ref(false)
        const isFilter = ref(false)

        const hapusData = async(id) => {
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('delete', `institutions/${id}`, null, token)
                console.log(response.data)

                Swal.fire({
                    icon: 'success',
                    title: 'Data Berhasil Dihapus',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });

                getAllData()
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Hapus Data',
                    text: 'Terjadi Kesalahan Saat Hapus Data',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }

        const btnAction = (id, method) => {
            console.log(`${id} - ${method}`)

            if(method == 'update'){
                const unik = dataSekolah.value.find(item => item.id === id)
                detailData.value = unik
                methodType.value = method
                toggleRegistrasi()
            } else if(method == 'registrasi') {
                methodType.value = method
                toggleRegistrasi()
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Hapus Data Ini?',
                    text: 'Data yang dihapus tidak bisa di kembalikan.',
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "Ya, Hapus",
                    cancelButtonColor: "#3b3f5c",
                    cancelButtonText: "Batal",
                }).then((result) => {
                    if (result.isConfirmed) {
                        hapusData(id)
                    }
                })
            }
        }

        const toggleFilter = () => {
            showFilter.value = !showFilter.value
        }

        const dropdownRef = ref(null);

        const closeDropdown = (e) => {
            if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
                showFilter.value = false;
            }
        };

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });


        const toggleRegistrasi = () => {
            isModalTambahSekolah.value = !isModalTambahSekolah.value
        }

        onMounted(async() => {
            getAllData()
            document.body.addEventListener('click', closeDropdown);
        })

        const queryParams = {
            'search': '',
            'page': '',
            'type': 'All'
        }

        const getAllData = async() => {
            console.log('di refresh')
            loading.value = !loading.value
            
            let allParams = '?'
            console.log(queryParams)
            for (const [key, value] of Object.entries(queryParams)) {
                allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
            }
            console.log(`semua`,allParams)

            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', `institutions`+allParams.replace('?&', '?'), null, token)
            console.log(`customers`,response.data)
            dataSekolah.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataSekolah.value)
        }

        const filterTingkat = (params) => {
            labelFilter.value = params
            isFilter.value = true
            queryParams.type = params
            getAllData()
        }

        const resetFilter = () => {
            labelFilter.value = 'Tingkat Pendidikan'
            queryParams.type = 'All'
            isFilter.value = false
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
            detailData,
            methodType,
            baseUrl,
            loading,
            labelFilter,
            filterTingkat,
            showFilter,
            isFilter,
            dropdownRef,
            dataSekolah,
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
            isModalTambahSekolah,
            nextPages,
            prevPages,
            toggleRegistrasi,
            toggleFilter,
            resetFilter,
            btnAction
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