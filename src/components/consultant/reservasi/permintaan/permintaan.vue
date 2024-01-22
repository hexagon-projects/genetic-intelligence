<template>
    <section class="bg-gray-100 pb-10 lg:pb-7">
        <div class="mx-4 pt-4">
            <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                <li class="before:px-1.5">
                    <a class="text-dark text-base cursor-default">
                        Beranda
                    </a>
                </li>
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
                    <h1 class="font-myFont text-dark text-lg mb-4">List Permintaan Reservasi</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <span class="font-myFont text-sm text-start lg:text-center text-dark">
                            {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                        </span>
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="dataPermintaan.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                <tr v-for="(data, index) in dataPermintaan" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="py-4 px-6">
                                        {{ index + 1 }}
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
                                            <button @click="approve(data.id)" class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
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
                        <a class="flex items-center font-myFont text-dark text-base">
                            Halaman
                            <div class="mx-2 flex items-center gap-1">
                                <a @click="nextPages(nextPage)" class="cursor-pointer text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                    <PhCaretLeft :size="24"/>
                                </a>
                                <span class="px-2 py-1 border rounded-lg">
                                    {{ currPage }}
                                </span>
                                <a @click="prevPages(prevPage)" class="cursor-pointer text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                    <PhCaretRight :size="24"/>
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
import { PhCaretLeft, PhCaretRight, PhEye, PhCheck } from '@phosphor-icons/vue'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import {useRouter} from 'vue-router'
import _debounce from 'lodash/debounce';

export default{
    name: 'PermintaanReservasi',
    components: {PhCaretLeft, PhCaretRight, PhEye, PhCheck},
    setup(){
        const loading = ref(false)
        const totalHalaman = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const dataPermintaan = ref([])
        const detailCustomers = ref([])
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

        const approve = async(reservationId) => {
            console.log(`ini id`, reservationId)
            const token = JSON.parse(localStorage.getItem('token'))
            const data = new FormData();
            data.append('status', 1);

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
                
                const refetch = await initAPI('get', 'customers/reservations?status=0', null, token)
                if(refetch){
                    dataPermintaan.value = response.data.data
                }else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi error saat mengambil data',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error saat approve reservasi',
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
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers/reservations?status=0', null, token)
            console.log(response.data)
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
            console.log(response.data.data[0].customers)
            loading.value = !loading.value
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', 'customers/reservations?status=0&search='+cari.value, null, token)
                currPage.value = query.data.current_page
                nextPage.value = query.data.next_page_url
                prevPage.value = query.data.prev_page_url
                totalDari.value = query.data.from
                totalKe.value = query.data.to
                totalData.value = query.data.total
                totalHalaman.value = query.data.last_page
                dataPermintaan.value = query.data.data
                detailCustomers.value = query.data.data.customers 
                loading.value = !loading.value
            }else{
                return getAllData() 
            }
        }

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        return {
            loading,
            totalHalaman,
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
            approve,
        }
    }
}
</script>