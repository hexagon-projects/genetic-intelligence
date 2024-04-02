<template>
    <section class="bg-gray-100 pb-10"
    :class="{'lg:pb-28': dataPermintaan.length == 0}"
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
                <RouterLink :to="{name: 'consultant.views.permintaan'}" class="text-base text-dark hover:text-dark/70">
                    Permintaan
                </RouterLink>
            </ol>
        </div>
        <div v-if="isModalOpen && detailCustomers" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
        >
            <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
                <!-- Modal body -->
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Permintaan Reservasi</h1>
                <hr class="mt-4">
                <div v-if="detailCustomers" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div class="flex flex-col">
                        <h1 class="text-dark text-xl font-myFont font-medium mb-2">Jadwal Diminta</h1>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Hari</span>
                            <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.day }}</span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Jam</span>
                            <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.time }}</span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Tanggal</span>
                            <span class="font-myFont text-base text-dark font-medium">{{ detailCustomers.date }}</span>
                        </div>
                    </div>

                    <hr class="my-4">

                    <div class="flex flex-col">
                        <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Nama</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.first_name }} {{ detailCustomers.customers.last_name }}
                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">No Telp</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.number }}
                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Tempat, Tanggal Lahir</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.birth_place }}, {{ detailCustomers.customers.birth_date }}                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Jenis Kelamin</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.gender }}
                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Golongan Darah</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.blood_group }}
                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Agama</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.religion }}
                            </span>
                        </div>
                        <div class="mb-2 flex justify-between items-center">
                            <span class="font-myFont font-medium text-dark text-base">Status</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.status }}
                            </span>
                        </div>
                        <div class="mb-2 flex flex-col">
                            <span class="font-myFont font-medium text-dark text-base">Alamat</span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.address }}
                            </span>
                            <span class="font-myFont text-dark text-base font-medium">
                                {{ detailCustomers.customers.region }}
                            </span>
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
                <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Hasil Test</h1>
                <hr class="mt-4">
                <div v-if="detailCustomers" class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
                    <div>
                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Jadwal Diminta</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Hari</span>
                                <span class="font-myFont text-xs text-dark font-medium">{{ detailCustomers.day }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Jam</span>
                                <span class="font-myFont text-xs text-dark font-medium">{{ detailCustomers.time }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Tanggal</span>
                                <span class="font-myFont text-xs text-dark font-medium">{{ detailCustomers.date }}</span>
                            </div>
                        </div>
                        <hr class="my-4">
                        <div class="flex flex-col">
                            <h1 class="text-dark text-xl font-myFont font-medium mb-2">Customer</h1>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Nama</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.name }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">No Telp</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.number }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Tempat, Tanggal Lahir</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.birth_place }}, {{ detailCustomers.customers.birth_date }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Jenis Kelamin</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.gender }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Golongan Darah</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.blood_group }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Agama</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.religion }}</span>
                            </div>
                            <div class="mb-2 flex justify-between items-center">
                                <span class="font-myFont font-medium text-dark text-sm">Status</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.status }}</span>
                            </div>
                            <div class="mb-2 flex flex-col">
                                <span class="font-myFont font-medium text-dark text-sm">Alamat</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.address }}</span>
                                <span class="font-myFont text-dark text-xs font-medium">{{ detailCustomers.customers.region }}</span>
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
                    <h1 class="font-myFont text-dark text-lg mb-4">List Permintaan Reservasi</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                            {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                        </span>
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataPermintaan.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Tanggal</th>
                                <th scope="col" class="py-3 px-6">Jam</th>
                                <th scope="col" class="py-3 px-6">Nama</th>
                                <th scope="col" class="py-3 px-6">No Telp</th>
                                <th scope="col" class="py-3 px-6">Customer Detail / Approve</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, index) in dataPermintaan" class="bg-white border-b">
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
                                            <button @click="notApprove(data.id)" class="flex items-center gap-1 px-4 py-2 bg-danger font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhProhibit :size="22"/>
                                            </button>
                                        </td>
                                        <td class="py-4">
                                            <button @click="modalApprove(data.id)" class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhCheck :size="22"/>
                                            </button>
                                        </td>
                                    </div>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="dataPermintaan.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                    <div class="self-end mt-4">
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
import { ref, onMounted, onBeforeMount } from 'vue'
import initAPI from '../../../../api/api'
import { PhCaretLeft, PhCaretRight, PhEye, PhCheck, PhProhibit } from '@phosphor-icons/vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {useRouter} from 'vue-router'
import _debounce from 'lodash/debounce';
import Cookies from 'js-cookie'

export default{
    name: 'PermintaanReservasi',
    components: {PhCaretLeft, PhCaretRight, PhEye, PhCheck, PhProhibit},
    setup(){
        const router = useRouter()
        const loading = ref(false)
        const totalHalaman = ref(null)
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const dataPermintaan = ref([])
        const detailCustomers = ref(null)
        const isModalOpen = ref(false)

        const clickDetail = (id) => {
            toggleModal()
            console.log(id)
            const unik = dataPermintaan.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailCustomers.value = unik
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const modalApprove = (reservationId) => {
            Swal.fire({
            title: "Approve Permintaan Reservasi?",
            text: "Permintaan reservasi untuk user ini akan di approve.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#00ab55",
            cancelButtonColor: "#3b3f5c",
            confirmButtonText: "Ya, approve",
            cancelButtonText: "Tutup"
            }).then((result) => {
                if (result.isConfirmed) {
                    approve(reservationId)
                }
            });
        }

        const approve = async(reservationId) => {
            console.log(`ini id`, reservationId)
            const token = Cookies.get('token')
            const data = new FormData();
            data.append('status', 1);

            if(token){
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
                    
                    await getAllData()
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error saat approve reservasi',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const confirmNotApprove = async(reservationId) => {
            console.log(reservationId)
            const token = Cookies.get('token')
            if(token){
                try {
                    const data = { status: 99 }
                    const response = await initAPI('post', 'customers/reservations/change-status/'+reservationId, data, token)
                    console.log(response.data)
                    if(response.data.success == true){
                        Swal.fire({
                            title: "Berhasil",
                            text: "Permintaan telah dibatalkan.",
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
                        text: "Terjadi error saat membatalkan permintaan.",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const notApprove = async(reservationId) => {
            Swal.fire({
            title: "Batalkan Permintaan?",
            text: "Permintaan reservasi untuk user ini akan di batalkan.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#e7515a",
            cancelButtonColor: "#3b3f5c",
            confirmButtonText: "Ya, batalkan",
            cancelButtonText: "Tutup"
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmNotApprove(reservationId)
                    // requestCancel(reservationId)
                }
            });
        }

        onBeforeMount(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', 'customers/reservations?status=0', null, token)
                    console.log(response.data)
                    itemsPerPage.value = response.data.per_page
                    currPage.value = response.data.current_page
                    nextPage.value = response.data.next_page_url
                    prevPage.value = response.data.prev_page_url
                    totalHalaman.value = response.data.last_page
                    totalDari.value = response.data.from
                    totalKe.value = response.data.to
                    totalData.value = response.data.total
                    dataPermintaan.value = response.data.data
                    detailCustomers.value = response.data.data.customers 
                    console.log(`response`,response.data.data)
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }
            // console.log(response.data.data[0].customers)
            loading.value = !loading.value
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const token = Cookies.get('token')
                if(token){
                    try {
                        const query = await initAPI('get', 'customers/reservations?status=0&search='+cari.value, null, token)
                        itemsPerPage.value = query.data.per_page
                        currPage.value = query.data.current_page
                        nextPage.value = query.data.next_page_url
                        prevPage.value = query.data.prev_page_url
                        totalDari.value = query.data.from
                        totalKe.value = query.data.to
                        totalData.value = query.data.total
                        totalHalaman.value = query.data.last_page
                        dataPermintaan.value = query.data.data
                        detailCustomers.value = query.data.data.customers 
                    } catch(error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Terjadi kesalahan saat mengambil data',
                            showConfirmButton: false,
                            timer: 2000
                        });
                    }
                }
                loading.value = !loading.value
            }else{
                return getAllData() 
            }
        }

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        const nextPages = async(url) => {
            const token = Cookies.get('token')
            if(token){
                try {
                    if(url !== null && cari.value){
                        loading.value = !loading.value
                        const response = await initAPI('get', url+'&search='+cari.value, null, token)
                        console.log(response.data)
                        dataSubmit.value = response.data.data
                        totalHalaman.value = response.data.last_page
                        itemsPerPage.value = response.data.per_page
                        currPage.value = response.data.current_page
                        nextPage.value = response.data.next_page_url
                        prevPage.value = response.data.prev_page_url
                        totalDari.value = response.data.from
                        totalKe.value = response.data.to
                        totalData.value = response.data.total
                        loading.value = !loading.value
                        console.log(`data`,dataSubmit.value)
                    } else if(url !== null && !cari.value) {
                        loading.value = !loading.value
                        const response = await initAPI('get', url, null, token)
                        console.log(response.data)
                        dataSubmit.value = response.data.data
                        totalHalaman.value = response.data.last_page
                        itemsPerPage.value = response.data.per_page
                        currPage.value = response.data.current_page
                        nextPage.value = response.data.next_page_url
                        prevPage.value = response.data.prev_page_url
                        totalDari.value = response.data.from
                        totalKe.value = response.data.to
                        totalData.value = response.data.total
                        loading.value = !loading.value
                        console.log(`data`,dataSubmit.value)
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
            }
        }

        const prevPages = async(url) => {
            const token = Cookies.get('token')
            if(token){
                try {
                    console.log(url)
                    if(url !== null && cari.value){
                        loading.value = !loading.value
                        const response = await initAPI('get', url+'&search='+cari.value, null, token)
                        console.log(response.data)
                        dataSubmit.value = response.data.data
                        totalHalaman.value = response.data.last_page
                        itemsPerPage.value = response.data.per_page
                        currPage.value = response.data.current_page
                        nextPage.value = response.data.next_page_url
                        prevPage.value = response.data.prev_page_url
                        totalDari.value = response.data.from
                        totalKe.value = response.data.to
                        totalData.value = response.data.total
                        loading.value = !loading.value
                        console.log(`data`,dataSubmit.value)
                    } else if(url !== null && !cari.value) {
                        loading.value = !loading.value
                        const response = await initAPI('get', url, null, token)
                        console.log(response.data)
                        dataSubmit.value = response.data.data
                        totalHalaman.value = response.data.last_page
                        itemsPerPage.value = response.data.per_page
                        currPage.value = response.data.current_page
                        nextPage.value = response.data.next_page_url
                        prevPage.value = response.data.prev_page_url
                        totalDari.value = response.data.from
                        totalKe.value = response.data.to
                        totalData.value = response.data.total
                        loading.value = !loading.value
                        console.log(`data`,dataSubmit.value)
                    }
                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('/login')
                localStorage.clear()
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
            dataPermintaan,
            detailCustomers,
            isModalOpen,
            debouncedGetSearchData,
            toggleModal,
            clickDetail,
            modalApprove,
            notApprove,
            confirmNotApprove,
            prevPages,
            nextPages
        }
    }
}
</script>