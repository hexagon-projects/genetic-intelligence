<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-else>
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
            <div class="flex flex-col lg:flex-row md:flex-row justify-center mx-4 mb-1 pt-4 gap-4">
                <div class="flex lg:flex-row justify-center lg:w-2/6 md:w-1/2 text-neutral-400">
                    <div class="w-full bg-white rounded-lg shadow-sm panel h-full overflow-hidden border-0 p-0">
                        <!-- <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div> -->
                        <!-- <div class="min-h-[190px] bg-gradient-to-r from-[#4361ee] to-[#160f6b] p-6"> -->
                        <div class="min-h-[190px] bg-gradient-primary p-6">
                            <div class="mb-6 flex items-center justify-between">
                                <div class="flex items-center rounded-lg bg-dark/50 p-2 font-semibold text-white pr-3">
                                    Profit
                                </div>
                                <button type="button" class="flex h-9 w-9 items-center justify-center rounded-md bg-dark/50 text-white hover:bg-dark/75 ml-auto">
                                    <PhArrowRight/>
                                </button>
                            </div>
                            <div class="flex items-center justify-between text-white">
                                <p class="text-xl">Total</p>
                                <h5 class="text-2xl ltr:ml-auto rtl:mr-auto">Rp. <span class="font-semibold">50.000.000,00</span></h5>
                            </div>
                        </div>
                        <div class="-mt-12 grid grid-cols-2 gap-2 px-8">
                            <div class="rounded-md bg-white px-4 py-2.5 shadow">
                                <span class="mb-4 flex items-center justify-between">Registrasi
                                    <svg class="h-4 w-4 text-success" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M19 15L12 9L5 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </span>
                                <div class="btn w-full border-0 rounded-md bg-slate-200 py-1 text-base text-[#515365] shadow-none text-center">
                                    Rp. 13.000.000
                                </div>
                            </div>
                            <div class="rounded-md bg-white px-4 py-2.5 shadow">
                                <span class="mb-4 flex items-center justify-between">Konsultasi
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
                                <span class="rounded-full bg-[#1b2e4b] px-4 py-1.5 text-xs text-white mr-2">Detail</span>
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
                
                <div class="flex lg:flex-row flex-col justify-center gap-4 lg:w-4/6 md:w-1/2">
                    <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                        <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>
    
                        <div v-if="!loadingData" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                            <div class="self-stretch justify-between items-center inline-flex">
                                <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                    <PhCalendarPlus :size="28"/>
                                </span>
                                <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                    Lihat Detail
                                    <PhArrowRight/>
                                </RouterLink>
                            </div>
                            <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                    <div class="justify-center items-center gap-[7px] inline-flex">
                                        <!-- <div class="text-biru text-xl font-medium font-poppins">{{ countDashboard.totalPermintaan }} Data</div> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                        <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>
    
                        <div v-if="!loadingData && countDashboard" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                            <div class="self-stretch justify-between items-center inline-flex">
                                <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                    <PhCalendarPlus :size="28"/>
                                </span>
                                <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                    Lihat Detail
                                    <PhArrowRight/>
                                </RouterLink>
                            </div>
                            <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                    <div class="justify-center items-center gap-[7px] inline-flex">
                                        <div class="text-biru text-xl font-medium font-poppins">{{ countDashboard.totalPermintaan }} Data</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="w-full h-[145px] px-[15px] py-[15px] bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex shadow-sm">
                        <div class="flex justify-center pt-8 w-full" v-if="loadingData" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>
    
                        <div v-if="!loadingData && countDashboard" class="self-stretch grow shrink basis-0 flex-col justify-between items-start flex">
                            <div class="self-stretch justify-between items-center inline-flex">
                                <span class="text-biru p-2 bg-indigo-500 bg-opacity-10 rounded-lg ">
                                    <PhCalendarPlus :size="28"/>
                                </span>
                                <RouterLink :to="{name: 'consultant.views.review'}" class="text-neutral-400 hover:text-biru text-sm font-normal font-myFont flex items-center gap-1">
                                    Lihat Detail
                                    <PhArrowRight/>
                                </RouterLink>
                            </div>
                            <div class="self-stretch justify-start items-start gap-8 inline-flex">
                                <div class="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
                                    <div class="text-neutral-400 text-sm font-normal font-myFont">Permintaan Reservasi</div>
                                    <div class="justify-center items-center gap-[7px] inline-flex">
                                        <div class="text-biru text-xl font-medium font-poppins">{{ countDashboard.totalPermintaan }} Data</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref } from 'vue'
import { PhArrowRight } from "@phosphor-icons/vue";

export default {
    name: 'AdminDashboard',
    components: {PhArrowRight},
    setup(){
        const loading = ref(false)
        const loadingData = ref(false)

        return {
            loading,
            loadingData
        }
    }
}
</script>