<template>
    <section class="bg-gray-100 pb-28">
            <div class="mx-4 pt-4">
                <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Pengaturan
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.pengaturan_code'}" class="text-base text-dark hover:text-dark/70">
                    Code
                </RouterLink>
            </ol>
            </div>

            <transition name="fade" mode="out-in">
                <div v-if="isModalOpen" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
                >
                    <ModalTambahCode @toggleModal="modalTambahKode"/>   
                </div>
            </transition>

            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
                <div class="w-full px-7 mx-auto">
                    <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                        <h1 class="font-myFont text-dark text-lg mb-4">Data Code</h1>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                            <div class="relative inline-block text-left">
                                <div class="flex items-center gap-1">
                                    <button @click="modalTambahKode" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont flex w-full justify-center items-center gap-x-1.5 rounded-md bg-biru px-3 py-2 text-sm font-medium text-light hover:bg-opacity-75 hover:shadow-md">
                                        <PhPlus :size="20"/>
                                        Tambah Code
                                    </button>
                                </div>
                            </div>

                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="!loading && dataCode" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama</th>
                                    <th scope="col" class="py-3 px-6">Code Voucher</th>
                                    <th scope="col" class="py-3 px-6">Status</th>
                                    <th scope="col" class="py-3 px-6">Diskon</th>
                                    <th scope="col" class="py-3 px-6">Aksi</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in dataCode" :key="index" class="bg-white border-b">
                                        <td class="py-4 px-6">
                                            {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ data.name }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ data.code }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ data.status }}
                                        </td>
                                        <td class="py-4 px-6">
                                            {{ data.disc_percentage }}
                                        </td>
                                        <td class="py-4 px-6">
                                            <button class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
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
                                    <a @click="nextPages(nextPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                        <PhCaretLeft/>
                                    </a>
                                    <span class="px-2 py-1 border rounded-lg">
                                        {{ currPage }}
                                    </span>
                                    <a @click="prevPages(prevPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
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
import { PhCaretLeft, PhCaretRight, PhFileSearch, PhPlus } from '@phosphor-icons/vue';
import { onMounted,ref } from 'vue'
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import initAPI from '../../../../api/api'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import ModalTambahCode from './form/tambah.vue'

export default {
    name: 'PengaturanVoucher',
    components: {PhFileSearch,PhPlus,ModalTambahCode},
    setup(){
        const isModalOpen = ref(false)

        const loading = ref(false)
        const dataCode = ref([])
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const queryParams = {
            'search': '',
            'page': '',
            'status': 'All'
        }

        const modalTambahKode = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const getAllData = async() => {
            loading.value = !loading.value

            let allParams = '?'
            console.log(queryParams)
            for (const [key, value] of Object.entries(queryParams)) {
                allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
            }
            console.log(`semua`,allParams)

            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', 'school_codes'+allParams.replace('?&', '?'), null, token)
                console.log(response.data)
                dataCode.value = response.data.data
                totalHalaman.value = response.data.last_page
                itemsPerPage.value = response.data.per_page
                currPage.value = response.data.current_page
                nextPage.value = response.data.next_page_url
                prevPage.value = response.data.prev_page_url
                totalDari.value = response.data.from
                totalKe.value = response.data.to
                totalData.value = response.data.total
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error Terjadi',
                    text: 'Terjadi Kesalahan Saat Mengambil Data Code',
                    showConfirmButton: false,
                    timer: 2000
                });
            }

            loading.value = !loading.value
        }

        onMounted(() => {
            getAllData()
        })

        const debouncedGetSearchData = _debounce(() => {
            queryParams.search = cari.value !== '' ? cari.value : ''
            queryParams.page = ''
            getAllData()
        }, 500)

        return {
            isModalOpen,
            loading,
            dataCode,
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
            modalTambahKode
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