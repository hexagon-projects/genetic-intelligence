<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
        <section class="bg-gray-100 pb-16">
            <div class="mx-4 pt-4">
                <ol class="flex text-gray-500 font-semibold">
                    <li class="before:px-1.5">
                        <a class="text-dark text-base cursor-default">
                            Beranda
                        </a>
                    </li>
                </ol>
            </div>
            <div class="flex flex-col lg:flex-row md:flex-row justify-center mx-4 mb-1 pt-4 gap-4">
                <div class="flex lg:flex-row justify-center lg:w-2/6 md:w-1/2 text-neutral-400">
                    <div class="w-full bg-white rounded-lg shadow-sm panel h-full overflow-hidden border-0 p-0">
                        <!-- <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div> -->
                        <!-- <div class="min-h-[190px] bg-gradient-to-r from-[#4361ee] to-[#160f6b] p-6"> -->
                        <div class="min-h-[190px] bg-gradient-primary p-6">
                            <div class="mb-6 flex items-center justify-between">
                                <div class="flex items-center rounded-lg bg-[#1fabee] bg-opacity-40 backdrop-blur-3xl p-2 font-myFont font-medium text-white">
                                    Profit
                                </div>
                                <button type="button" class="flex h-9 w-9 items-center justify-center rounded-md bg-[#1fabee] bg-opacity-40 backdrop-blur-3xl text-white hover:bg-opacity-60 ml-auto">
                                    <PhArrowRight/>
                                </button>
                            </div>
                            <div class="flex items-center justify-between text-white">
                                <p class="text-2xl font-myFont">Total</p>
                                <h5 class="text-2xl ltr:ml-auto rtl:mr-auto">Rp. <span class="font-semibold">50.000.000,00</span></h5>
                            </div>
                        </div>
                        <div class="-mt-12 grid grid-cols-2 gap-2 px-8">
                            <div class="rounded-md bg-white px-4 py-2.5 shadow">
                                <span class="font-myFont mb-4 flex items-center justify-between">Registrasi
                                    <svg class="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 15L12 9L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <div class="btn w-full border-0 rounded-md bg-slate-200 py-1 text-base text-[#515365] shadow-none text-center">
                                    Rp. 13.000.000
                                </div>
                            </div>
                            <div class="rounded-md bg-white px-4 py-2.5 shadow">
                                <span class="font-myFont mb-4 flex items-center justify-between">Konsultasi
                                    <svg class="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 15L12 9L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <div class="btn w-full border-0 rounded-md bg-slate-200 py-1 text-base text-[#515365] shadow-none text-center">
                                    Rp. 37.000.000
                                </div>
                            </div>
                        </div>
                        <div class="p-5">
                            <div class="mb-5">
                                <span class="font-myFont rounded-full bg-slate-200 px-4 py-1.5 text-sm text-dark mr-2">Detail</span>
                            </div>
                            <div class="mb-5 space-y-1">
                                <div class="flex items-center justify-between">
                                    <p>Profit bulan ini</p>
                                    <p class="text-base"><span>Rp. </span> <span class="font-medium">7.000.000</span></p>
                                </div>
                                <div class="flex items-center justify-between">
                                    <p>Profit terbesar: Maret</p>
                                    <p class="text-base"><span>Rp. </span> <span class="font-medium">12.000.000</span></p>
                                </div>
                            </div>
                            <div class="flex justify-around px-2 mt-7 text-center">
                                <button type="button" class="flex items-center justify-center gap-1 font-myFont bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full lg:w-1/2">Lihat Detail <PhArrowRight/></button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="flex flex-col gap-4 lg:w-4/6 md:w-1/2">
                    <div class="flex lg:flex-row flex-col justify-center gap-4">
                        <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                            <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                                <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                            </div>
        
                            <div v-if="countDashboard && !loadingData" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                                <div class="self-stretch justify-between items-center inline-flex">
                                    <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                        <PhUsers :size="28"/>
                                    </span>
                                    <RouterLink :to="{name: 'admin.views.konsultan'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                        Lihat Detail
                                        <PhArrowRight/>
                                    </RouterLink>
                                </div>
                                <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                        <div class="text-neutral-400 text-sm font-normal font-myFont">Jumlah Konsultan</div>
                                        <div class="justify-center items-center gap-[7px] inline-flex">
                                            <div class="text-biru text-xl font-medium font-myFont">
                                                {{ countDashboard.totalKonsultan }} Konsultan
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                            <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                                <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                            </div>
        
                            <div v-if="countDashboard && !loadingData" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                                <div class="self-stretch justify-between items-center inline-flex">
                                    <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                        <PhUserList size="28"/>
                                    </span>
                                    <RouterLink :to="{name: 'admin.views.customers'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                        Lihat Detail
                                        <PhArrowRight/>
                                    </RouterLink>
                                </div>
                                <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                        <div class="text-neutral-400 text-sm font-normal font-myFont">Jumlah Customer</div>
                                        <div class="justify-center items-center gap-[7px] inline-flex">
                                            <div class="text-biru text-xl font-medium font-myFont">
                                                {{ countDashboard.totalCustomer }} Customer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    
                        <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                            <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                                <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                            </div>
        
                            <div v-if="countDashboard && !loadingData" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                                <div class="self-stretch justify-between items-center inline-flex">
                                    <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                        <PhFiles :size="28"/>
                                    </span>
                                    <RouterLink :to="{name: 'admin.views.reservasi'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                        Lihat Detail
                                        <PhArrowRight/>
                                    </RouterLink>
                                </div>
                                <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                    <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                        <div class="text-neutral-400 text-sm font-normal font-myFont">
                                            Jumlah Reservasi
                                        </div>
                                        <div class="justify-center items-center gap-[7px] inline-flex">
                                            <div class="text-biru text-xl font-medium font-myFont">
                                                {{ countDashboard.totalReservasiSelesai }} Reservasi
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="md:hidden lg:flex flex-col justify-center gap-4">
                        <div class="w-full h-[292px] px-[15px] py-[15px] bg-white rounded-lg shadow-sm">
                            <h1 class="text-lg text-dark font-myFont">Statistik Customer</h1>
                            <div class="h-[242px]">
                                <Line :data="data" :options="options" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hidden lg:hidden md:flex flex-col justify-center mx-4 mb-1 pt-3 gap-4">
                <div class="w-full h-[280px] px-[15px] py-[15px] bg-white rounded-lg shadow-sm">
                    <h1 class="text-lg text-dark font-myFont">Statistik Customer</h1>
                    <Line :data="data" :options="options" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { PhArrowRight, PhUsers, PhUserList, PhFiles } from "@phosphor-icons/vue";
import initAPI from '../../../api/api'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default {
    name: 'AdminDashboard',
    components: {PhArrowRight, PhUsers, PhUserList, PhFiles, Line},
    setup(){
        const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Data Registrasi',
      backgroundColor: '#0b40f4',
      data: [40, 39, 10, 40, 39, 80, 40]
    },
    {
      label: 'Data Reservasi',
      backgroundColor: '#00ab55',
      data: [21, 30, 24, 32, 41, 64, 54]
    },
    {
      label: 'Data Test',
      backgroundColor: '#e7515a',
      data: [37, 28, 16, 62, 29, 50, 43]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

        const loading = ref(false)
        const loadingData = ref(false)
        const countDashboard = ref(null)

        onMounted(async() => {
            loadingData.value = !loadingData.value
            const token = JSON.parse(localStorage.getItem('token'))

            const totalKonsultan = await initAPI('get', 'consultants', null, token)
            const totalCustomer = await initAPI('get', 'customers', null, token)
            const totalReservasiSelesai = await initAPI('get', 'customers/reservations?status=4', null, token)

            Promise.all([totalKonsultan, totalCustomer, totalReservasiSelesai])
            .then(results => {
                const datatotalKonsultan = results[0].data.total;
                const datatotalCustomer = results[1].data.total;
                const dataTotalReservasiSelesai = results[2].data.total;

                const dataDashboardValue = {
                    totalKonsultan: datatotalKonsultan,
                    totalCustomer: datatotalCustomer,
                    totalReservasiSelesai: dataTotalReservasiSelesai
                };

                countDashboard.value = dataDashboardValue;
                console.log(`didie`,countDashboard.value)
            })
            loadingData.value = !loadingData.value
        })

        return {
            data,
            options,
            loading,
            loadingData,
            countDashboard
        }
    }
}
</script>