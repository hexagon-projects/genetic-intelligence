<template>
    <div class="flex flex-col bg-white w-full p-3 rounded-lg">
        <div class="flex justify-between items-center">
            <h1 class="font-myFont text-dark text-lg mb-4">List Test Grafologi Terbaru</h1>
            <RouterLink :to="{name: 'consultant.views.review'}" class="mb-4 text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                Lihat Detail
                <PhArrowRight/>
            </RouterLink>
        </div>
        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-end">
            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-1 px-2" placeholder="Cari Data">
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
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in dataSubmit" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="py-4 px-6">
                            {{ index + 1 }}
                        </td>
                        <td class="py-4 px-6">{{ data.name }}</td>
                        <td class="py-4 px-6">{{ data.customers_results.created_at }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <span v-else-if="dataSubmit.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import initAPI from '../../../../api/api'
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { PhArrowRight } from '@phosphor-icons/vue'

export default {
    name: 'TableReviewDashboard',
    components: {PhArrowRight},
    setup(){
        const loading = ref(false)
        const dataSubmit = ref([])
        const totalHalaman = ref('')
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const cari = ref(null)

        const router = useRouter()
        const store = useStore()

        onMounted(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'customers?is_detected=2&perpage=5', null, token)
            dataSubmit.value = response.data.data
            totalHalaman.value = response.data.total
            currPage.value = response.data.current_page
            nextPage.value = response.data.next_page_url
            prevPage.value = response.data.prev_page_url
            loading.value = !loading.value
            console.log(`data`,dataSubmit.value)
        }

        const getSearchData = async() => {
            if(cari.value !== '' && cari.value.length >= 2){
                loading.value = !loading.value
                const token = JSON.parse(localStorage.getItem('token'))
                const query = await initAPI('get', 'customers?is_detected=2&perpage=5&search='+cari.value, null, token)
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

        const review = (data) => {
            const id = data.id
            store.commit('reviewGrafologi', data);
            router.push({ name: 'consultant.views.review.detail', params: { id } })
            localStorage.setItem('reviewData', JSON.stringify(data))
        }

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
            debouncedGetSearchData,
            nextPages,
            prevPages,
            getSearchData,
            review
        }
    }
}
</script>