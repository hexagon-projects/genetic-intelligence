<template>
    <div class="flex flex-col bg-white w-full p-4 h-3/5 rounded-lg mb-4">
        <div class="flex justify-between items-center">
            <h1 class="font-myFont text-dark text-lg mb-4">List Konsultasi Hari Ini</h1>
            <!-- <RouterLink :to="{name: 'consultant.views.jadwal'}" class="mb-4 text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                Lihat Detail
                <PhArrowRight/>
            </RouterLink> -->
        </div>

        <div class="flex justify-center w-full" v-if="loading" >
            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
        </div>

        <div v-else-if="dataReservasi !== 'Kosong' && !loading" class="overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" class="py-3 px-6">No</th>
                    <th scope="col" class="py-3 px-6">Nama Customer</th>
                    <th scope="col" class="py-3 px-6">Jam</th>
                    <th scope="col" class="py-3 px-6">No Telp</th>
                    <th scope="col" class="py-3 px-6">Mulai</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in dataReservasi" :key="index" class="bg-white border-b">
                        <td class="py-4 px-6">
                            {{ index + 1 }}
                        </td>
                        <td class="py-4 px-6">{{ data.customers.name }}</td>
                        <td class="py-4 px-6">{{ data.time }}</td>
                        <td class="py-4 px-6">{{ data.customers.number }}</td>
                        <td class="py-4 px-6">
                            <button class="flex items-center gap-1 px-4 py-2 bg-success font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                <PhPlay :size="22"/>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <span v-else-if="dataReservasi == 'Kosong' && !loading" class="lg:mt-14 font-myFont text-center text-dark text-sm lg:text-lg">
            Tidak ada konsultasi untuk hari ini.
        </span>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import initAPI from '../../../../api/api'
import { PhArrowRight, PhPlay } from '@phosphor-icons/vue'
import Cookies from 'js-cookie'
import { useRouter } from 'vue-router'

export default {
    name: 'TableReviewDashboard',
    components: {PhArrowRight, PhPlay},
    setup(){
        const router = useRouter()
        const loading = ref(false)
        const dataReservasi = ref([])

        onMounted(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', 'customers/reservations?status=2&today=true', null, token)
                    if(response.data.data.length > 0){
                        dataReservasi.value = response.data.data
                        // console.log(`wajig kie`,dataReservasi.value)
                    } else {
                        dataReservasi.value = 'Kosong'
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
            loading.value = !loading.value
        }

        return {
            loading,
            dataReservasi
        }
    }
}
</script>