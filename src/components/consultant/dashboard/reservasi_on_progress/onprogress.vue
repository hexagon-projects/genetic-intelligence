<template>
    <div class="bg-white h-[136px] rounded-lg p-4">
        <h1 class="font-myFont text-dark text-lg mb-4">Konsultasi Sedang berlangsung</h1>
        <div v-if="loading" class="flex justify-center">
            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
        </div>
        <div v-else-if="dataReservasi == null && !loading" class="flex justify-center">
            <span class="font-myFont text-center text-dark text-sm lg:text-lg mt-4">Tidak ada jadwal untuk hari ini</span>
        </div>
        <div v-else-if="dataReservasi !== null && !loading" class="flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="p-2.5 relative bg-biru rounded-full">
                    <a class="w-11 h-11 text-light text-2xl rounded-full relative z-[1] mx-auto">
                        <PhHourglassHigh/>
                    </a>
                </div>
                <div class="flex flex-col">
                    <p class="text-dark text-base font-semibold">09:00</p>
                    <p class="text-dark text-xs font-bold self-center mt-0">
                        Proses Konsultasi Sedang Berlangsung
                    </p>
                </div>
                <!-- <p class="text-[#3b3f5c] dark:text-white-light font-semibold text-[13px] p-2.5">Conference call with Marketing Manager.</p> -->
            </div>
            <button class="font-myFont bg-white hover:bg-biru hover:text-light text-biru border border-biru px-4 py-1 rounded-md">Selesai</button>
        </div>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import initAPI from '../../../../api/api'
import Cookies from 'js-cookie'

export default {
    name: 'ReservasiOnProgressDashboard',
    setup(){
        const loading = ref(false)
        const dataReservasi = ref(null)

        onMounted(() => {
            getData()
        })

        const getData = async() => {
            loading.value = !loading.value
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', 'customers/reservations?status=3&sort_by_date=oldest&sort_by_time=oldest', null, token)
                    console.log(`hihi`,response.data)
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
        }

        return {
            loading,
            dataReservasi
        }
    }
}
</script>