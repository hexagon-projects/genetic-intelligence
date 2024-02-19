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

            <div v-if="isModalOpen" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
            >
                <div class="hidden lg:block relative w-3/4 top-4 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Kode</h1>
                    <hr class="mt-4">
                    <!--<div class="flex flex-row">
                        <img v-if="detailCustomers.image !== null" class="w-[400px] h-[400px] p-4" :src="baseUrl+'open/consultant/'+detailCustomers.image" alt="">
                        <img v-if="detailCustomers.image == null" class="w-1/2 h-3/4 p-4" src="https://placehold.co/400x400" alt="">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}
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
                                        <div class="w-full">
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
                            
                        </div>
                    </div> -->

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>

                <div class="block lg:hidden relative w-full top-4 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Kode</h1>
                    <!--<hr class="mt-4">
                    <div class="flex flex-col justify-center items-center">
                        <img v-if="detailCustomers.image !== null" class="w-[180px] h-[180px] p-4" :src="baseUrl+'open/consultant/'+detailCustomers.image" alt="">
                        <img v-if="detailCustomers.image == null" class="w-[180px] h-[180px] p-4" src="https://placehold.co/400x400" alt="">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.gender == 1 ? 'Laki - Laki' : 'Perempuan' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.number }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Email
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.user.email }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tempat Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.birth_place }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tanggal Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.birth_date }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
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
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.address }}
                                                </p>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.region }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

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
                        <h1 class="font-myFont text-dark text-lg mb-4">Data Code</h1>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                            <div class="relative inline-block text-left">
                                <div class="flex items-center gap-1">
                                    <button @click="isModalOpen = !isModalOpen" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont flex w-full justify-center items-center gap-x-1.5 rounded-md bg-biru px-3 py-2 text-sm font-medium text-light hover:bg-opacity-75 hover:shadow-md">
                                        <PhPlus :size="20"/>
                                        Tambah Code
                                    </button>
                                </div>
                            </div>
                            <!-- <span class="font-myFont text-sm text-start lg:text-center text-dark">
                                {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                            </span> -->
                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="!loading" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama Sekolah</th>
                                    <th scope="col" class="py-3 px-6">Code Voucher</th>
                                    <th scope="col" class="py-3 px-6">Aksi</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr class="bg-white border-b">
                                        <td class="py-4 px-6">
                                            1
                                        </td>
                                        <td class="py-4 px-6">
                                            SMKN 11 Bandung
                                        </td>
                                        <td class="py-4 px-6">MENJADICERDAS</td>
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

export default {
    name: 'PengaturanVoucher',
    components: {PhFileSearch,PhPlus},
    setup(){
        const isModalOpen = ref(false)

        return {
            isModalOpen
        }
    }
}
</script>