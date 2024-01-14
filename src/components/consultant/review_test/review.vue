<template>
    <section class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold dark:text-white-dark">
                    <li class="before:px-1.5">
                        <a class="text-dark text-base cursor-default">
                            Beranda
                        </a>
                    </li>
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 gap-4">
                <div class="w-full px-7 mx-auto">
                    <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                        <h1 class="font-myFont text-dark text-lg mb-4">List Submit Test Grafologi</h1>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                            <span class="font-myFont text-sm text-start lg:text-center text-dark">Total Data: {{ dataSubmit.length }}</span>
                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="dataSubmit.length > 0 && !loading" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama Customer</th>
                                    <th scope="col" class="py-3 px-6">Tanggal Submit</th>
                                    <th scope="col" class="py-3 px-6">Review</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in dataSubmit" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td class="py-4 px-6">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="py-4 px-6">{{ data.name }}</td>
                                        <td class="py-4 px-6">{{ data.customers_results.created_at }}</td>
                                        <td class="py-4 px-6">
                                            <button class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhFileSearch :size="22"/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <span v-else-if="dataSubmit.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                        <div class="self-end mt-4">
                            <a class="flex items-center font-myFont text-dark text-base">
                                Halaman
                                <div class="mx-2 flex items-center gap-1">
                                    <a @click="nextPages(nextPage)" class="cursor-pointer text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                        <PhCaretLeft :size="24"/>
                                    </a>
                                    <span class="px-2 py-1 border">
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
import { PhCaretLeft, PhCaretRight, PhFileSearch } from '@phosphor-icons/vue';
import { onMounted,ref } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';

export default {
    name: 'ReviewTest',
    components: {PhCaretLeft, PhCaretRight, PhFileSearch},
    setup(){
        const loading = ref(false)
        const dataSubmit = ref([])
        const totalHalaman = ref('')
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const cari = ref(null)

        onMounted(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers?is_detected=1', null, token)
            dataSubmit.value = response.data.data
            totalHalaman.value = response.data.total
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            console.log(dataSubmit.value)
            console.log(`response`,response.data)
            loading.value = !loading.value
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', 'customers?is_detected=1&search='+cari.value, null, token)
                dataSubmit.value = query.data.data
                totalHalaman.value = query.data.total
                currPage.value = query.data.current_page
                nextPage.value = query.data.next_page_url
                prevPage.value = query.data.prev_page_url
                loading.value = !loading.value
            }else{
                return getAllData() 
            }
        }

        const debouncedGetSearchData = _debounce(getSearchData, 500);

        const nextPages = async(url) => {
            console.log(url)
        }

        const prevPages = async(url) => {
            console.log(url)
        }

        return {
            loading,
            dataSubmit,
            totalHalaman,
            currPage,
            nextPage,
            prevPage,
            cari,
            nextPages,
            prevPages,
            getSearchData,
            debouncedGetSearchData
        }
    }
}
</script>