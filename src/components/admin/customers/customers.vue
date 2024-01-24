<template>
    <section class="bg-gray-100 pb-28">
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
                                        {{ detailCustomers.name }} 
                                    </p>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="flex flex-col mr-20">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Tempat Lahir
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.birth_place }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col ml-20">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Tanggal Lahir
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.birth_date }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="flex flex-col mr-[78px]">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Jenis Kelamin
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.gender }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col ml-[78px]">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Golongan Darah
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.blood_group }}
                                        </p>
                                    </div>
                                </div>

                                <div class="flex flex-row items-center gap-2 mb-4">
                                    <div class="flex flex-col mr-[106px]">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Agama
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.religion }}
                                        </p>
                                    </div>
                                    <div class="flex flex-col ml-[106px]">
                                        <h1 class="font-myFont font-medium text-dark text-lg">
                                            Status
                                        </h1>
                                        <p class="font-myFont font-medium text-dark text-sm">
                                            {{ detailCustomers.status }}
                                        </p>
                                    </div>
                                </div>

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
                        <h1 class="font-myFont text-dark text-lg mb-4">List Customers</h1>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                            <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                                {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                            </span>
                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="dataCustomer.length > 0 && !loading" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama</th>
                                    <th scope="col" class="py-3 px-6">No Telp</th>
                                    <th scope="col" class="py-3 px-6">Detail</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in dataCustomer" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="py-4 px-6">
                                            {{ index + 
                                            1 }}
                                        </td>
                                        <td class="py-4 px-6">{{ data.name }}</td>
                                        <td class="py-4 px-6">{{ data.number }}</td>
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
import { PhCaretLeft, PhCaretRight, PhFileSearch } from '@phosphor-icons/vue';
import { onMounted,ref } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import axios from 'axios'

export default {
    name: 'AdminCustomers',
    components: {PhCaretLeft, PhCaretRight, PhFileSearch},
    setup(){
        const loading = ref(false)
        const dataCustomer = ref([])
        const detailCustomers = ref(null)
        const totalHalaman = ref('')
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const isModalOpen = ref(false)

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

        const router = useRouter()
        const store = useStore()

        onMounted(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers', null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
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
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', 'customers?search='+cari.value, null, token)
                dataCustomer.value = query.data.data
                totalHalaman.value = query.data.last_page
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

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        const nextPages = async(url) => {
            console.log(url)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', url, null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataCustomer.value)
        }

        const prevPages = async(url) => {
            console.log(url)
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', url, null, token)
            console.log(`customers`,response.data)
            dataCustomer.value = response.data.data
            totalHalaman.value = response.data.last_page
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            totalDari.value = response.data.from
            totalKe.value = response.data.to
            totalData.value = response.data.total
            loading.value = !loading.value
            console.log(`data`,dataCustomer.value)
        }

        return {
            loading,
            dataCustomer,
            detailCustomers,
            totalHalaman,
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
            toggleModal
        }
    }
}
</script>