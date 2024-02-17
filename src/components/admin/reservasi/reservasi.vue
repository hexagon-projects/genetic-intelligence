<template>
    <section class="bg-gray-100 pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Reservasi
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi GIM
                </RouterLink>
            </ol>
        </div>

            <div v-if="isModalOpen && detailCustomers" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
            >
                <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Reservasi</h1>
                    <hr class="mt-4">
                    <div v-if="detailCustomers" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                        <div>
                            <div class="flex flex-col">
                                <h1 class="text-dark text-xl font-myFont font-medium mb-2">Jadwal</h1>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Jam</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.time }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Tanggal</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.date }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Status</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.status }}</span>
                                </div>
                            </div>
                            <hr class="my-4">
                            <div class="flex flex-col">
                                <h1 class="text-dark text-xl font-myFont font-medium mb-2">Consultant</h1>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Nama</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.consultant.name }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                                    <span class="text-dark text-base font-myFont font-medium">{{ detailCustomers.consultant.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailCustomers.consultant.number }}</span>
                                </div>
                                <div class="mb-2 flex flex-col">
                                    <span class="font-myFont font-medium text-dark text-base">Alamat</span>
                                    <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.consultant.address }}</span>
                                </div>

                                <hr class="my-4">

                                <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Nama</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailCustomers.customers.name }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailCustomers.customers.gender }}</span>
                                </div>
                                <div class="mb-2 flex justify-between items-center">
                                    <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailCustomers.customers.number }}</span>
                                </div>
                                <div class="mb-2 flex flex-col">
                                    <span class="font-myFont font-medium text-dark text-base">Alamat</span>
                                    <span class="font-myFont text-dark text-base font-medium">{{ detailCustomers.customers.address }}</span>
                                </div>
                            </div>
                            </div>
                        </div>
                    <!-- <div class="flex flex-row"> -->
                        <!-- <img v-if="detailCustomers.image && detailCustomers.image !== null" class="w-[400px] h-[400px] p-4" :src="baseUrl+'open/customers/'+detailCustomers.image" alt="">
                        <img v-if="detailCustomers.image == null" class="w-1/2 h-3/4 p-4" src="https://placehold.co/400x400" alt=""> -->
                        <!-- <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.name }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.number }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Email
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.user.email }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Tempat Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.birth_place }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Tanggal Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.birth_date }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.gender }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Golongan Darah
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.blood_group }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Agama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.religion }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Status
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.status }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.address }}
                                                </p>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.region }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/2">
                                </div>
                            </div>
                            
                        </div> -->
                    <!-- </div> -->

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>

                <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Reservasi</h1>
                    <hr class="mt-4">
                    <div class="max-h-[462px] overflow-y-scroll flex flex-col justify-center items-center">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <h1 class="text-dark text-lg font-myFont font-medium mt-28 mb-2">Jadwal</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jam
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.time }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tanggal
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.date }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Status
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailCustomers.status }}
                                            </p>
                                        </div>
                                    </div>

                                    <hr class="my-4">

                                    <h1 class="text-dark text-lg font-myFont font-medium mb-2">Consultant</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.consultant.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.consultant.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.consultant.number }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.consultant.address }}
                                                </p>
                                                <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>

                                    <hr class="my-4">

                                    <h1 class="text-dark text-lg font-myFont font-medium mb-2">Customer</h1>
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.customers.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.customers.gender}}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.customers.number }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.customers.address }}
                                                </p>
                                                <!-- <p class="font-myFont font-medium text-dark text-xs">
                                                    {{  }}
                                                </p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                        <h1 class="font-myFont text-dark text-lg mb-4">List Reservasi</h1>
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
                                    <a @click="filterData('Terjadwal')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Terjadwal
                                    </a>
                                    <a @click="filterData('Di Approve')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Di Approve
                                    </a>
                                    <a @click="filterData('Dalam Proses')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Dalam Proses
                                    </a>
                                    <a @click="filterData('Selesai')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Selesai
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="dataCustomer.length > 0 && !loading" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama</th>
                                    <th scope="col" class="py-3 px-6">No Telp</th>
                                    <th scope="col" class="py-3 px-6">Jam</th>
                                    <th scope="col" class="py-3 px-6">Tanggal</th>
                                    <th scope="col" class="py-3 px-6">Detail</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in dataCustomer" :key="index" class="bg-white border-b">
                                        <td class="py-4 px-6">
                                            {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                        </td>
                                        <td class="py-4 px-6">{{ data.customers.name }}</td>
                                        <td class="py-4 px-6">{{ data.customers.number }}</td>
                                        <td class="py-4 px-6">{{ data.time }}</td>
                                        <td class="py-4 px-6">{{ data.date }}</td>
                                        <td class="py-4 px-6">
                                            <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhFileSearch :size="22"/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <span v-else-if="dataCustomer.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                        
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
import { PhCaretLeft, PhCaretRight, PhFileSearch, PhX } from '@phosphor-icons/vue';
import { onMounted, ref, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import axios from 'axios'

export default {
    name: 'AdminReservasi',
    components: {PhCaretLeft, PhCaretRight, PhFileSearch, PhX},
    setup(){
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const loading = ref(false)
        const dataCustomer = ref([])
        const detailCustomers = ref(null)
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const isModalOpen = ref(false)

        const labelFilter = ref('Filter Status')
        const filterStatusCode = ref(null)
        const showFilter = ref(false)
        const isFilter = ref(false)

        const resetFilter = () => {
            labelFilter.value = 'Filter Status'
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

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        const clickDetail = (id) => {
            toggleModal()
            console.log(id)
            const unik = dataCustomer.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailCustomers.value = unik
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        onMounted(async() => {
            getAllData()
            document.body.addEventListener('click', closeDropdown);
        })

        const getAllData = async() => {
            loading.value = !loading.value
            let filterParams
            if(filterStatusCode.value !== null && cari.value){
                filterParams = `status=${filterStatusCode.value}&search=${cari.value}`
            } else if (filterStatusCode.value !== null && !cari.value){
                filterParams = `status=${filterStatusCode.value}`
            } else if (filterStatusCode.value == null && cari.value){
                filterParams = `search=${cari.value}`
            } else {
                filterParams = null
            }
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', `customers/reservations?${filterParams}`, null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataCustomer.value)
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const filterParams = filterStatusCode.value === null 
                ? 'search='+cari.value 
                : 'search='+cari.value+'&status='+filterStatusCode.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', `customers/reservations?${filterParams}`, null, token)
                dataCustomer.value = query.data.data
                totalHalaman.value = query.data.last_page
                itemsPerPage.value = query.data.per_page
                currPage.value = query.data.current_page
                nextPage.value = query.data.next_page_url
                prevPage.value = query.data.prev_page_url
                totalDari.value = query.data.from
                totalKe.value = query.data.to
                totalData.value = query.data.total
                loading.value = !loading.value
            } else {
                return getAllData() 
            }
        }

        // const getSearchData = async() => {
        //     if(cari.value && filterStatusCode.value == null){
        //         loading.value = !loading.value
        //         const token = JSON.parse(localStorage.getItem('token'))
        //         const query = await initAPI('get', 'customers/reservations?search='+cari.value, null, token)
        //         dataCustomer.value = query.data.data
        //         totalHalaman.value = query.data.last_page
        //         itemsPerPage.value = query.data.per_page
        //         currPage.value = query.data.current_page
        //         nextPage.value = query.data.next_page_url
        //         prevPage.value = query.data.prev_page_url
        //         totalDari.value = query.data.from
        //         totalKe.value = query.data.to
        //         totalData.value = query.data.total
        //         loading.value = !loading.value
        //     } else if (cari.value && filterStatusCode.value !== null){
        //         loading.value = !loading.value
        //         const token = JSON.parse(localStorage.getItem('token'))
        //         const query = await initAPI('get', 'customers/reservations?search='+cari.value+'&status='+filterStatusCode.value, null, token)
        //         dataCustomer.value = query.data.data
        //         totalHalaman.value = query.data.last_page
        //         itemsPerPage.value = query.data.per_page
        //         currPage.value = query.data.current_page
        //         nextPage.value = query.data.next_page_url
        //         prevPage.value = query.data.prev_page_url
        //         totalDari.value = query.data.from
        //         totalKe.value = query.data.to
        //         totalData.value = query.data.total
        //         loading.value = !loading.value
        //     } else if(!cari.value && filterStatusCode.value !== null) {
        //         loading.value = !loading.value
        //         const token = JSON.parse(localStorage.getItem('token'))
        //         const query = await initAPI('get', 'customers/reservations?status='+filterStatusCode.value, null, token)
        //         dataCustomer.value = query.data.data
        //         totalHalaman.value = query.data.last_page
        //         itemsPerPage.value = query.data.per_page
        //         currPage.value = query.data.current_page
        //         nextPage.value = query.data.next_page_url
        //         prevPage.value = query.data.prev_page_url
        //         totalDari.value = query.data.from
        //         totalKe.value = query.data.to
        //         totalData.value = query.data.total
        //         loading.value = !loading.value
        //     } else {
        //         return getAllData() 
        //     }
        // }

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        const nextPages = async(url) => {
            if(cari.value && filterStatusCode.value == null){
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            } else if(cari.value && filterStatusCode.value !== null) {
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            } else {
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            }
        }

        const prevPages = async(url) => {
            if(cari.value && filterStatusCode.value == null){
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            } else if(cari.value && filterStatusCode.value !== null) {
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url+'&search='+cari.value+'&status='+filterStatusCode.value, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            } else {
                console.log(url)
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', url, null, token)
                console.log(`customers`,response.data)
                dataCustomer.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
                loading.value = !loading.value
                console.log(`data`,dataCustomer.value)
            }
        }

        const getDataTerjadwal = async() => {
            filterStatusCode.value = 2
            console.log(`wakwaw`)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers/reservations?status=2', null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
        }

        const getDataApprove = async() => {
            filterStatusCode.value = 1
            console.log(`wakwaw`)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers/reservations?status=1', null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
        }

        const getDataProses = async() => {
            filterStatusCode.value = 3
            console.log(`wakwaw`)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers/reservations?status=3', null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
        }

        const getDataSelesai = async() => {
            filterStatusCode.value = 4
            console.log(`wakwaw`)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers/reservations?status=4', null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
        }

        const filterData = async(params) => {
            labelFilter.value = params
            isFilter.value = true
            filterStatusCode.value = params == 'Terjadwal' ? '2' : params == 'Di Approve' ? '1' : params == 'Dalam Proses' ? '3' : params == 'Selesai' ? '4' : null
            const filterParams = cari.value === null 
            ? 'status='+filterStatusCode.value 
            : 'search='+cari.value+'&status='+filterStatusCode.value
            const token = JSON.parse(localStorage.getItem('token'))
            loading.value = !loading.value
            const response = await initAPI('get', `customers/reservations?${filterParams}`, null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            itemsPerPage.value = response.data.per_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            // switch(params) {
            //     case 'Terjadwal':
            //         await getDataTerjadwal()   
            //         break;
            //     case 'Di Approve':
            //         await getDataApprove()   
            //         break;
            //     case 'Dalam Proses':
            //         await getDataProses()   
            //         break;
            //     case 'Selesai':
            //         await getDataSelesai()   
            //         break;
            // }
        }

        return {
            baseUrl,
            loading,
            labelFilter,
            filterStatusCode,
            showFilter,
            isFilter,
            dropdownRef,
            dataCustomer,
            detailCustomers,
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
            isModalOpen,
            nextPages,
            prevPages,
            getSearchData,
            clickDetail,
            toggleModal,
            toggleFilter,
            resetFilter,
            filterData
        }
    }
}
</script>