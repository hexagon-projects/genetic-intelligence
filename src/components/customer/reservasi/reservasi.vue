<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold dark:text-white-dark">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-7 mb-4 pt-4 gap-4">
           <PilihHari/>
           <!-- {{ userData }} -->
        </div>

        <div class="mx-7 bg-white rounded-lg shadow-lg p-4">
            <div v-if="userData.is_advance == 'Tidak' && reservasiData" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-gray-500 text-base mb-4">Berikut adalah detail jadwal reservasi kamu</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-dark uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6 text-start">Nama</th>
                                <th scope="col" class="py-3 px-6 text-start">Jam</th>
                                <th scope="col" class="py-3 px-6 text-start">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhTimer/> {{ reservasiData.time }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhCalendar/> {{ reservasiData.date }}
                                    </span>
                                </td>
                            </tr>
                            <tr class=" bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        Total: {{ reservasiData.formatted_fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="konfirReservasi" class="lg:ml-12 lg:mt-3 px-2 py-2 w-1/3 self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                        Konfirmasi
                    </button>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/2 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>
            </div>

            <div v-else-if="dataReservasi && userData.is_advance == 'Ya'" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="w-full md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-sm text-gray-500 lg:text-base mb-4 lg:mb-0">Reservasi kamu sudah terjadwal</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500 dark:text-gray-400">
                        <tbody>
                            <!-- Ukuran md - lg -->
                            <tr class="hidden md:block lg:block bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhTimer/> {{ dataReservasi.time !== undefined ? dataReservasi.time : '' }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-base items-center">
                                        <PhCalendar/> {{ dataReservasi.date }}
                                    </span>
                                </td>
                            </tr>

                            <!-- Ukuran small -->
                            <div class="md:hidden lg:hidden flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhUser/>
                                        Nama
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhTimer/>
                                        Jam
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ dataReservasi.time }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhCalendar/>
                                        Tanggal
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                            </div>

                            <tr class="hidden md:block lg:block bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 text-base items-center">
                                        <span class="font-myFont text-dark font-semibold">Total:</span> {{ dataReservasi.fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button v-if="dataReservasi.status == 'Requested'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Menunggu Approval
                    </button>
                    <button @click="Bayar" v-else-if="dataReservasi.status == 'Approved'" class="mt-4 lg:ml-12 px-4 py-2 bg-biru text-light rounded-lg hover:opacity-75 hover:shadow-lg"
                    >
                        Bayar
                    </button>
                </div>

                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/4 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>
            </div>

            <div v-else-if="!reservasiData && userData.is_advance == 'Tidak'" class="flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2">
                    <div class="lg:mx-10 lg:ml-20 flex flex-col">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum menentukan jadwal</h1>
                        <p class="font-myFont text-start text-gray-500 text-sm mb-4">review reservasi kamu akan tampil disini</p>
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/belum-reservasi.png" class="w-1/4 self-center" alt="Belum Reservasi">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import initAPI from '../../../api/api';
import { ref, computed, onMounted, watch } from 'vue'
import { PhUser, PhTimer, PhCalendar } from '@phosphor-icons/vue';
import PilihHari from './PilihHari/hari.vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export default {
    name: 'Reservasi',
    components: {PhUser, PhTimer, PhCalendar, PilihHari},
    setup(){
        const store = useStore()
        const dataReservasi = ref([])
        const statusReservasi = ref(null)

        const userData = computed(() => store.getters.getUserData)
        // const reservasiData = JSON.parse(localStorage.getItem('bookReservasi'))
        const reservasiData = computed(() => store.getters.getReservasi)
        // const bookingReservasi = ref(JSON.parse(localStorage.getItem('setReservasi')))
        // const reservasiData = computed(() => bookingReservasi.value)

        console.log(`reservasi data`,reservasiData.value)
        console.log(`dataReservasi length`,dataReservasi.length)

        const getDataReservasi = async() => {
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', `customers/reservations?customer_id=${userData.value.id}&only_one=true`, null, token)
                console.log(`cek weh reservasina`,response.data)
                dataReservasi.value = response.data
                statusReservasi.value = response.data.status
                // console.log(`status reservasi`, statusReservasi.value)
                console.log(`ini data reservasi`, dataReservasi.value)
            } catch (error) {
                console.log(`error`, error)
            }

        }

        onMounted(() => {
            getDataReservasi()
            // const isReservasi = JSON.parse(localStorage.getItem('userData'))
           
            //     console.log(`cek weh reservasina`,response.data)
            // if(isReservasi.is_advance == 'Ya'){
            //     const token = JSON.parse(localStorage.getItem('token'))
            //     const response = await initAPI('get', `customers/reservations?customer_id=${userData.value.id}&only_one=true`, null, token)
            //     console.log(`cek weh reservasina`,response.data)
            //     const data = {
            //       date: response.data.date,
            //       day: response.data.day,
            //       time: response.data.time,
            //       fee: response.data.fee,
            //       status: response.data.status 
            //     }
            //     dataReservasi.value = data
            //     console.log(`ajg`,dataReservasi.value)
            // }else{
            //     console.log('acan nyien reservasi')
            // }
        })

        const konfirReservasi = async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('post', 'customers/reservations', reservasiData.value, token)
            console.log(`konfir`,response.data)
            if(response.data.success == true){
                Swal.fire({
                    icon: 'success',
                    title: 'Reservasi Berhasil',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2500
                });
                store.commit('setReservasi', null)
                localStorage.removeItem('setReservasi')

                const updatedCustomer = await initAPI('get', 'customers?id='+userData.value.id, null, token)
                store.commit('user', updatedCustomer.data.data[0])
                localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Reservasi Gagal',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 3500
                });
                store.commit('setReservasi', null)
            }
        }

        const Bayar = () => {
            console.log('siap bayar', dataReservasi.value)
        }

        return {
            userData,
            reservasiData,
            dataReservasi,
            konfirReservasi,
            Bayar
        }
    }
}
</script>