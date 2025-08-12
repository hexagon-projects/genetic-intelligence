<template>
    <section class="bg-gray-100 pb-[340px] lg:pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.riwayat_pembayaran'}" class="text-base text-dark hover:text-dark/70">
                    Riwayat Pembayaran
                </RouterLink>
            </ol>
        </div>

        <div v-if="isModalOpen && detailRiwayatPembayaran" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 h-full w-full px-4 modal"
        >
            <div class="hidden lg:block relative w-3/4 top-4 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Riwayat Pembayaran</h1>
                <hr class="mt-4">
                
                <div v-if="detailRiwayatPembayaran" :class="{'h-[460px] flex flex-col justify-center': loadingSubmit}" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div>
                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Pembayaran</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Merchant ID Pembayaran</span>
                                <span class="font-myFont text-base text-dark font-medium">
                                    {{ detailRiwayatPembayaran.merchant_order_id }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Tipe Pembayaran</span>
                                <span class="font-myFont text-base text-dark font-medium">
                                    {{ detailRiwayatPembayaran.payment_type }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Total Pembayaran</span>
                                <span class="font-myFont text-base text-dark font-medium">Rp.{{ detailRiwayatPembayaran.callback_response.amount }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Tanggal Pembayaran</span>
                                <span class="font-myFont text-base text-dark font-medium">{{ detailRiwayatPembayaran.created_at }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Status Pembayaran</span>
                                <span class="font-myFont text-base text-dark font-medium">{{ detailRiwayatPembayaran.status }}</span>
                            </div>
                        </div>
                        
                        <hr class="my-4">

                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Nama</span>
                                <span class="font-myFont text-dark text-base font-medium">
                                    {{ detailRiwayatPembayaran.customer.first_name }} {{ detailRiwayatPembayaran.customer.last_name }}
                                </span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                                <span class="font-myFont text-dark text-base font-medium">{{ detailRiwayatPembayaran.customer.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                                <span class="font-myFont text-dark text-base font-medium">{{ detailRiwayatPembayaran.customer.number }}</span>
                            </div>
                            <div class="mb-2 flex flex-col">
                                <span class="font-myFont font-medium text-dark text-base">Alamat</span>
                                <span class="font-myFont text-dark text-base font-medium">{{ detailRiwayatPembayaran.customer.address }}</span>
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

            <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Riwayat Pembayaran</h1>
                <hr class="mt-4">
                
                <div v-if="detailRiwayatPembayaran" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div class="w-full">
                        <div class="flex flex-row gap-2">
                            <div class="w-full">
                                <h1 class="text-dark text-lg font-myFont font-medium mb-2">Pembayaran</h1>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Merchant ID Pembayaran
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.merchant_order_id }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tipe Pembayaran
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.payment_type }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-3/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Total Pembayaran
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.callback_response.amount }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Tanggal Pembayaran
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.created_at }}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center mb-4">
                                    <div class="w-full">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Status Pembayaran
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.status }}
                                            </p>
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
                                                {{ detailRiwayatPembayaran.customer.first_name }} {{ detailRiwayatPembayaran.customer.last_name }}
                                            </p>
                                        </div>
                                    </div>
                                    <div class="w-2/5">
                                        <div class="flex flex-col items-start">
                                            <h1 class="font-myFont font-medium text-dark text-sm">
                                                Jenis Kelamin
                                            </h1>
                                            <p class="font-myFont font-medium text-dark text-xs">
                                                {{ detailRiwayatPembayaran.customer.gender == '1' ? 'Laki - Laki' : 'Perempuan'}}
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
                                                {{ detailRiwayatPembayaran.customer.number }}
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
                                                {{ detailRiwayatPembayaran.customer.address }}
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
                    <h1 class="font-myFont text-dark text-lg mb-4">Riwayat Pembayaran</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <div class="relative inline-block text-left">
                            <div class="flex items-center gap-1">
                                <button @click="toggleFilter" ref="dropdownRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                {{ labelFilter }}
                                <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                </svg>
                                </button>
                                <button v-if="isFilter" @click="resetFilter" class="text-light p-[2px] bg-danger rounded-md">
                                    <PhX/>
                                </button>
                            </div>
                            <div v-if="showFilter" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                    <a @click="filterStatus('02')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Gagal
                                    </a>
                                    <a @click="filterStatus('00')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                        Sukses 
                                    </a>
                                </div>
                            </div>
                        </div>

                        <input v-model="cari" @input="debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataRiwayatPembayaran.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Waktu Pembayaran</th>
                                <th scope="col" class="py-3 px-6">Order ID</th>
                                <th scope="col" class="py-3 px-6">Reference</th>
                                <th scope="col" class="py-3 px-6">Customer</th>
                                <th scope="col" class="py-3 px-6">Status</th>
                                <th scope="col" class="py-3 px-6">Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataRiwayatPembayaran" :key="index" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.created_at }}</td>
                                    <td class="py-4 px-6">{{ data.merchant_order_id }}</td>
                                    <td class="py-4 px-6">{{ data.reference }}</td>
                                    <td class="py-4 px-6">{{ data.customer !== null ? data.customer.first_name : '-' }}</td>
                                    <td class="py-4 px-6">{{ data.status }}</td>
                                    <td class="py-4 px-6">
                                        <button @click="modalDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhEye :size="22"/>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataRiwayatPembayaran.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">
                        Data kosong
                    </span>

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
import { PhEye, PhCaretLeft, PhCaretRight, PhX } from '@phosphor-icons/vue'
import initAPI from '../../../api/api'
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue'
import _debounce from 'lodash/debounce';
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default {
    name: 'RiwayatPembarayan',
    components: {PhEye, PhCaretLeft, PhCaretRight, PhX},
    setup(){
        const router = useRouter()
        const loading = ref(false)

        const isModalOpen = ref(false)

        const dropdownRef = ref(null)
        const labelFilter = ref('Filter Status')
        const showFilter = ref(false)
        const isFilter = ref(false)

        const totalDari = ref('')
        const totalKe = ref('')
        const totalData = ref('')

        const currPage = ref('')
        const nextPage = ref('')
        const prevPage = ref('')
        const totalHalaman = ref('')
        const itemsPerPage = ref('') 

        const dataRiwayatPembayaran = ref([])
        const detailRiwayatPembayaran = ref([])

        const cari = ref(null)

        const queryParams = {
            'search': '',
            'page': '',
            'status': 'All'
        }

        const getAllData = async() => {
            loading.value = !loading.value
            const token = Cookies.get('token')
            if(token){
                try {
                    let allParams = '?'
                    // console.log(queryParams)
                    for (const [key, value] of Object.entries(queryParams)) {
                        allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
                    }
                    // console.log(allParams)
    
                    const response = await initAPI('get', 'payment_histories'+allParams.replace('?&', '?'), null, token)
                    // console.log(response.data)
                    dataRiwayatPembayaran.value = response.data.data
                    totalDari.value = response.data.from
                    totalKe.value = response.data.to
                    totalData.value = response.data.total
                    currPage.value = response.data.current_page
                    itemsPerPage.value = response.data.per_page
                    nextPage.value = response.data.next_page_url
                    prevPage.value = response.data.prev_page_url
                    totalHalaman.value = response.data.last_page
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Terjadi Error',
                        text: 'Ada error saat mengambil data Riwayat Pembayaran',
                        showConfirmButton: true,
                        confirmButtonColor: "#0b40f4",
                        confirmButtonText: "Tutup",
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
            loading.value = !loading.value
        } 

        onMounted(() => {
           getAllData()
           document.body.addEventListener('click', closeDropdown);
        })

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

        const modalDetail = (id) => {
            toggleModal()
            const data = dataRiwayatPembayaran.value.find(item => item.id === id);
            detailRiwayatPembayaran.value = data
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const toggleFilter = () => {
            showFilter.value = true
        }

        const filterStatus = (params) => {
            // isFilterKecerdasan.value = true
            if(params == '00'){
                labelFilter.value = 'Sukses'
            }else if(params == '02'){
                labelFilter.value = 'Gagal'
            }
            isFilter.value = true
            queryParams.status = params
            getAllData()
        }

        const resetFilter = () => {
            labelFilter.value = 'Filter Status'
            queryParams.status = 'All'
            isFilter.value = false
            getAllData()
        }

        const closeDropdown = (e) => {
            if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
                showFilter.value = false;
            }
        };

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        return {
            loading,
            isModalOpen,
            detailRiwayatPembayaran,
            dropdownRef,
            totalDari,
            totalKe,
            totalData,
            currPage,
            nextPage,
            prevPage,
            totalHalaman,
            itemsPerPage,
            dataRiwayatPembayaran,
            debouncedGetSearchData,
            nextPage,
            prevPage,
            cari,
            queryParams,
            labelFilter,
            isFilter,
            showFilter,
            toggleModal,
            modalDetail,
            nextPages,
            prevPages,
            toggleFilter,
            filterStatus,
            resetFilter
        }
    }
}
</script>