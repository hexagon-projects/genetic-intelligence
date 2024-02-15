<template>
    <section class="bg-gray-100 pb-10"
    :class="{'lg:pb-28' : dataJadwal.length == 0, 'lg:pb-7': dataJadwal.length > 0}"
    >
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Reservasi GIM
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'consultant.views.jadwal'}" class="text-base text-dark hover:text-dark/70">
                    Jadwal
                </RouterLink>
            </ol>
        </div>
        <div v-if="isModalOpen && detailCustomers" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
            <div class="relative w-1/2 top-24 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
                <hr class="mt-4">
                <div v-if="detailCustomers" class="w-full p-4">
                    <div class="flex flex-row gap-2">
                        <div class="w-full">
                            <div class="flex flex-col mb-4">
                                <h1 class="font-myFont font-medium text-dark text-lg">
                                    Nama
                                </h1>
                                <p class="font-myFont font-medium text-dark text-sm">
                                    {{ detailCustomers.customers.first_name }} {{ detailCustomers.customers.last_name }}
                                </p>
                            </div>

                            <div class="flex flex-row items-center gap-2 mb-4">
                                <div class="flex flex-col mr-20">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Tempat Lahir
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.birth_place }}
                                    </p>
                                </div>
                                <div class="flex flex-col ml-20">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Tanggal Lahir
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.birth_date }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-row items-center gap-2 mb-4">
                                <div class="flex flex-col mr-[78px]">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Jenis Kelamin
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.gender }}
                                    </p>
                                </div>
                                <div class="flex flex-col ml-[78px]">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Golongan Darah
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.blood_group }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-row items-center gap-2 mb-4">
                                <div class="flex flex-col mr-[106px]">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Agama
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.religion }}
                                    </p>
                                </div>
                                <div class="flex flex-col ml-[106px]">
                                    <h1 class="font-myFont font-medium text-dark text-lg">
                                        Status
                                    </h1>
                                    <p class="font-myFont font-medium text-dark text-sm">
                                        {{ detailCustomers.customers.status }}
                                    </p>
                                </div>
                            </div>

                            <div class="flex flex-col">
                                <h1 class="font-myFont font-medium text-dark text-lg">
                                    Alamat
                                </h1>
                                <p class="font-myFont font-medium text-dark text-sm">
                                    {{ detailCustomers.customers.address }}
                                </p>
                                <p class="font-myFont font-medium text-dark text-sm">
                                    {{ detailCustomers.customers.region }}
                                </p>
                            </div>

                        </div>
                        <div class="w-1/2">
                        </div>
                    </div>
                    
                </div>

                <hr class="pt-4">
                <!-- Modal footer -->
                <div class="px-4 py-2 flex justify-end items-center space-x-4">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">List Jadwal Reservasi</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
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
                                <a @click="filterData('Terjadwal')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Terjadwal</a>
                                <a @click="filterData('Dalam Proses')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Dalam Proses</a>
                                <a @click="filterData('Selesai')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Selesai</a>
                                </div>
                            </div>
                        </div>
                        <!-- <span class="font-myFont text-sm text-start lg:text-center text-dark">
                            {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                        </span> -->
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataJadwal.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Tanggal</th>
                                <th scope="col" class="py-3 px-6">Jam</th>
                                <th scope="col" class="py-3 px-6">Nama</th>
                                <th scope="col" class="py-3 px-6">No Telp</th>
                                <th scope="col" class="py-3 px-6">Detail / Cancel / Mulai atau Selesai</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataJadwal" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.date }}</td>
                                    <td class="py-4 px-6">{{ data.time }}</td>
                                    <td class="py-4 px-6">
                                        {{ data.customers.first_name }} {{ data.customers.last_name }}
                                    </td>
                                    <td class="py-4 px-6">
                                        {{ data.customers.number }}
                                    </td>
                                    <div class="flex items-center gap-2">
                                        <td class="py-4 pl-6">
                                            <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhEye :size="22"/>
                                            </button>
                                        </td>
                                        <td class="py-4">
                                            <button @click="cancel(data.id)" class="flex items-center gap-1 px-4 py-2 bg-danger font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhX :size="22"/>
                                            </button>
                                        </td>
                                        <td class="py-4">
                                            <button v-if="data.status == 'Scheduled'" @click="mulai(data.id)" class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhPlay :size="22"/>
                                            </button>
                                            <button v-if="data.status == 'On Progress'" @click="selesai(data.id)" class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhCheck :size="22"/>
                                            </button>
                                        </td>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataJadwal.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
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
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../../api/api'
import { PhCaretLeft, PhCaretRight, PhEye, PhX, PhPlay, PhFunnel, PhCheck } from '@phosphor-icons/vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {useRouter} from 'vue-router'
import _debounce from 'lodash/debounce';

export default{
    name: 'JadwalReservasi',
    components: {PhCaretLeft, PhCaretRight, PhEye, PhX, PhPlay, PhFunnel, PhCheck},
    setup(){
        const loading = ref(false)
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const dataJadwal = ref([])
        const detailCustomers = ref([])
        const isModalOpen = ref(false)

        const showFilter = ref(false)
        const isFilter = ref(false)
        const labelFilter = ref('Filter Data')
        const filterStatusCode = ref(null)

        const resetFilter = () => {
            labelFilter.value = 'Filter Data'
            isFilter.value = !isFilter.value
            filterStatusCode.value = null
            if(cari.value){
                getSearchData()
            } else {
                getAllData()
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

        onMounted(() => {
            document.body.addEventListener('click', closeDropdown);
        });

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        const getOnProcessData = async(search) => {
            isFilter.value = true
            filterStatusCode.value = 3
            loading.value = !loading.value
            try {
                if(search !== null){
                    const token = JSON.parse(localStorage.getItem('token'))
                    const response = await initAPI('get', 'customers/reservations?status=3&sort_by_date=oldest&sort_by_time=oldest&search='+search, null, token)
                    console.log('filter proses', response.data)
                    itemsPerPage.value = response.data.per_page
                    currPage.value = response.data.current_page
                    nextPage.value = response.data.next_page_url
                    prevPage.value = response.data.prev_page_url
                    totalDari.value = response.data.from
                    totalKe.value = response.data.to
                    totalData.value = response.data.total
                    totalHalaman.value = response.data.last_page
                    dataJadwal.value = response.data.data
                    detailCustomers.value = response.data.data.customers 
                } else {
                    const token = JSON.parse(localStorage.getItem('token'))
                    const response = await initAPI('get', 'customers/reservations?status=3&sort_by_date=oldest&sort_by_time=oldest', null, token)
                    console.log('filter proses', response.data)
                    itemsPerPage.value = response.data.per_page
                    currPage.value = response.data.current_page
                    nextPage.value = response.data.next_page_url
                    prevPage.value = response.data.prev_page_url
                    totalDari.value = response.data.from
                    totalKe.value = response.data.to
                    totalData.value = response.data.total
                    totalHalaman.value = response.data.last_page
                    dataJadwal.value = response.data.data
                    detailCustomers.value = response.data.data.customers 
                }
            } catch (error) {
                Swal.fire({
                    title: "Gagal",
                    text: "Terjadi error saat filter data On Process.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
            loading.value = !loading.value
        }

        const getScheduledData = async() => {
            isFilter.value = true
            filterStatusCode.value = 2
            loading.value = !loading.value
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', 'customers/reservations?status=2&sort_by_date=oldest&sort_by_time=oldest', null, token)
                console.log('filter scheduled', response.data)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
            } catch (error) {
                Swal.fire({
                    title: "Gagal",
                    text: "Terjadi error saat filter data Scheduled.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
            loading.value = !loading.value
        }

        const filterData = async(params) => {
            const token = JSON.parse(localStorage.getItem('token'))
            loading.value = !loading.value
            labelFilter.value = params
            isFilter.value = true
            filterStatusCode.value = params == 'Terjadwal' ? 2 : params == 'Dalam Proses' ? 3 : params == 'Selesai' ? 4 : null
            const filterParams = cari.value == null 
            ? `status=${filterStatusCode.value}&sort_by_date=oldest&sort_by_time=oldest` 
            : `status=${filterStatusCode.value}&sort_by_date=oldest&sort_by_time=oldest&search=${cari.value}`
            console.log(`params yeuh`, params)

            const response = await initAPI('get', 'customers/reservations?'+filterParams, null, token)
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            totalHalaman.value = response.data.last_page
            dataJadwal.value = response.data.data
            detailCustomers.value = response.data.data.customers 
            console.log(`response`,response.data.data)
            loading.value = !loading.value
            // if(params == 'Dalam Proses'){
            //     if(cari.value){
            //         await getOnProcessData(cari.value)
            //     } else {
            //         await getOnProcessData(null)
            //     }
            // } else {
            //     await getScheduledData()
            // }

        }

        const clickDetail = (id) => {
            toggleModal()
            console.log(id)
            const unik = dataJadwal.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailCustomers.value = unik
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const cancel = async(reservationId) => {
            console.log(`cancel`, reservationId)
            Swal.fire({
            title: "Batalkan Reservasi?",
            text: "Reservasi untuk user ini akan di batalkan.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#e7515a",
            cancelButtonColor: "#3b3f5c",
            confirmButtonText: "Ya, batalkan",
            cancelButtonText: "Tutup"
            }).then((result) => {
                if (result.isConfirmed) {
                    requestCancel(reservationId)
                }
            });
        }

        const requestCancel = async(id) => {
            try {
                const data = { status: 99 }
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('post', 'customers/reservations/change-status/'+id, data, token)
                console.log(response.data)
                if(response.data.success == true){
                    Swal.fire({
                        title: "Berhasil",
                        text: "Reservasi telah dibatalkan.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });

                    await getAllData()
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Gagal",
                    text: "Terjadi error saat membatalkan reservasi.",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        }

        const mulai = async(reservationId) => {
            console.log(`mulai`, reservationId)
            Swal.fire({
            title: "Mulai Reservasi?",
            text: "Reservasi untuk user ini akan di mulai.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00ab55",
            cancelButtonColor: "#3b3f5c",
            confirmButtonText: "Ya, mulai",
            cancelButtonText: "Tutup"
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmMulai(reservationId)
                }
            });
        }

        const confirmMulai = async(reservationId) => {
            try {
                console.log(`ini id mulai`, reservationId)
                const token = JSON.parse(localStorage.getItem('token'))
                const data = new FormData();
                data.append('status', 3);

                const response = await initAPI('post', 'customers/reservations/change-status/'+reservationId, data, token)
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                
                getAllData()
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error saat memulai reservasi',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }

        const selesai = async(reservationId) => {
            console.log(`selesai`, reservationId)
            Swal.fire({
            title: "Selesaikan Reservasi?",
            text: "Reservasi untuk user ini akan diselesaikan.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00ab55",
            cancelButtonColor: "#3b3f5c",
            confirmButtonText: "Ya, selesai",
            cancelButtonText: "Tutup"
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmSelesai(reservationId)
                }
            });
        }

        const confirmSelesai = async(reservationId) => {
            console.log(`ini id selesai`, reservationId)
            const token = JSON.parse(localStorage.getItem('token'))
            const data = new FormData();
            data.append('status', 4);

            try {
                const response = await initAPI('post', 'customers/reservations/change-status/'+reservationId, data, token)
                console.log(response.data)
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                
                if(isFilter.value == true && labelFilter.value !== 'Filter Data'){
                    resetFilter()
                }
                
                getAllData()

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error saat update status ke Selesai',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }

        onBeforeMount(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            let filterParams
            if(filterStatusCode.value !== null && cari.value){
                filterParams = `status=${filterStatusCode.value}&sort_by_date=oldest&sort_by_time=oldest&search=${cari.value}`
            } else if (filterStatusCode.value !== null && !cari.value){
                filterParams = `status=${filterStatusCode.value}&sort_by_date=oldest&sort_by_time=oldest`
            } else if (filterStatusCode.value == null && cari.value){
                filterParams = `sort_by_date=oldest&sort_by_time=oldest&search=${cari.value}`
            } else {
                filterParams = `status=2&sort_by_date=oldest&sort_by_time=oldest`
            }
            // const filterParams = filterStatusCode.value === null 
            // ? 'status=2&sort_by_date=oldest&sort_by_time=oldest&search='+cari.value 
            // : 'sort_by_date=oldest&sort_by_time=oldest&search='+cari.value+'&status='+filterStatusCode.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', `customers/reservations?${filterParams}`, null, token)
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            totalHalaman.value = response.data.last_page
            dataJadwal.value = response.data.data
            detailCustomers.value = response.data.data.customers 
            console.log(`response`,response.data.data)
            // console.log(response.data.data[0].customers)
            loading.value = !loading.value
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const filterParams = filterStatusCode.value === null 
                ? 'sort_by_date=oldest&sort_by_time=oldest&search='+cari.value 
                : 'sort_by_date=oldest&sort_by_time=oldest&search='+cari.value+'&status='+filterStatusCode.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', `customers/reservations?${filterParams}`, null, token)
                dataJadwal.value = query.data.data
                totalHalaman.value = query.data.total
                itemsPerPage.value = query.data.per_page
                currPage.value = query.data.current_page
                nextPage.value = query.data.next_page_url
                prevPage.value = query.data.prev_page_url
                totalDari.value = query.data.from
                totalKe.value = query.data.to
                totalData.value = query.data.total
                totalHalaman.value = query.data.last_page
                loading.value = !loading.value
            } else {
                return getAllData() 
            }
        }

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        const prevPages = async(url) => {
            if(url !== null && cari.value && filterStatusCode.value == null){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            } else if(url !== null && cari.value && filterStatusCode.value !== null) {
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            } else {
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            }
        }

        const nextPages = async(url) => {
            if(url !== null && cari.value && filterStatusCode.value == null){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            } else if(url !== null && cari.value && filterStatusCode.value !== null) {
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            } else {
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url, null, token)
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                totalHalaman.value = response.data.last_page
                dataJadwal.value = response.data.data
                detailCustomers.value = response.data.data.customers 
                console.log(`response`,response.data.data)
                // console.log(response.data.data[0].customers)
                loading.value = !loading.value
            }
        }

        return {
            loading,
            totalHalaman,
            itemsPerPage,
            currPage,
            nextPage,
            prevPage,
            totalDari,
            totalKe,
            totalData,
            cari,
            dataJadwal,
            detailCustomers,
            isModalOpen,
            showFilter,
            isFilter,
            labelFilter,
            filterStatusCode,
            dropdownRef,
            debouncedGetSearchData,
            toggleModal,
            clickDetail,
            mulai,
            selesai,
            cancel,
            toggleFilter,
            filterData,
            resetFilter,
            prevPages,
            nextPages
        }
    }
}
</script>