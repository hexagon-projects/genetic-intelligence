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

        <div v-if="isModalTambahSekolah == true">
            <ModalTambahSekolah @initRegistrasi="toggleRegistrasi"/>
        </div>
    
        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">List Sekolah</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <div class="relative flex flex-col gap-2 text-left">
                            <div class="flex items-center gap-1">
                                <button @click="isModalTambahSekolah = !isModalTambahSekolah" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont flex w-full justify-center items-center gap-x-1.5 rounded-md bg-biru px-3 py-2 text-sm font-medium text-light hover:bg-opacity-75 hover:shadow-md">
                                    <PhPlus :size="20"/>
                                    Tambah Data Sekolah
                                </button>
                            </div>

                            <div class="w-full flex items-center gap-2 mb-2">
                                <div class="w-full flex items-center gap-1">
                                    <button @click="toggleFilter" ref="dropdownRef" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.jenjang_pendidikan }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                    </button>
                                    <button v-if="filterKelas" @click="resetFilter" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                </div>
                                <div v-if="filterKelas" class="absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                    <div class="py-1" role="none">
                                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                        <a @click="filterData('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            1
                                        </a>
                                        <a @click="filterData('2')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            2
                                        </a>
                                        <a @click="filterData('3')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                                            3
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="lg:-mb-8 mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>
    
                    <div class="flex justify-center w-full" v-if="loading" >
                        <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>
    
                    <div class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6">No</th>
                                <th scope="col" class="py-3 px-6">Nama</th>
                                <th scope="col" class="py-3 px-6">No Telp</th>
                                <th scope="col" class="py-3 px-6">Detail</th>
                            </tr>
                            </thead>
                            <tbody>
                                <!-- <tr v-for="(data, index) in dataCustomer" :key="index" class="bg-white border-b">
                                    <td class="py-4 px-6">
                                        {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                    </td>
                                    <td class="py-4 px-6">{{ data.name }}</td>
                                    <td class="py-4 px-6">{{ data.number }}</td>
                                    <td class="py-4 px-6">
                                        <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                            <PhFileSearch :size="22"/>
                                        </button>
                                    </td>
                                </tr> -->
                            </tbody>
                        </table>
                    </div>
    
                    <!-- <span v-else-if="dataCustomer.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span> -->
                    
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
import { ref } from 'vue'
import { PhPlus } from '@phosphor-icons/vue'
import ModalTambahSekolah from './form/tambah.vue'

export default {
    name: 'DataGuru',
    components: {PhPlus, ModalTambahSekolah},
    setup(){
        const loading = ref(false)

        const isModalTambahSekolah = ref(false)

        const toggleRegistrasi = () => {
            isModalTambahSekolah.value = !isModalTambahSekolah.value
        }

        const queryParams = {
            'search': '',
            'jenjang_pendidikan': 'Tingkat Pendidikan',
            'page': '',
        }

        return {
            loading,
            isModalTambahSekolah,
            queryParams,
            toggleRegistrasi
        }
    }
}
</script>