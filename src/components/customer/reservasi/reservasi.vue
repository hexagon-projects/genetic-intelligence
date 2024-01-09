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
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="lg:w-1/2">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex pb-4">
                        <span class="uppercase text-sm text-start font-myFont font-semibold text-dark">january - 2022</span>
                    </div>
                    <div class="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                        <div
                        @click="toggleActive(index)"
                        v-for="(hari, index) in dataHari"
                        :key="index"
                        class="cursor-pointer px-3 border rounded-sm w-full mx-1 h-5 flex items-center justify-center border-biru text-biru shadow-md"
                        :class="activeClass(index)"
                        >
                        {{ hari }}
                        </div>
                        <!-- <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            mon
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            tue
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            wed
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            thu
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            fri
                        </span>
                        <span class="px-3 border rounded-sm w-14 h-5 flex items-center justify-center border-green-500 text-green-500 shadow-md">
                            sat
                        </span> -->
                    </div>

                    <div class="mx-1 flex gap-2 justify-center mt-2 font-medium text-sm">
                        <!-- {{ dataTgl }} -->
                        <div v-if="computedTgl.length > 0" v-for="(tgl, index) in computedTgl" :key="index" class="w-16 h-16 sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] flex justify-center flex-col">
                            <h1 class="flex flex-col text-primary sm:text-3xl text-xl text-center">
                                <span class="-mt-3 mb-1 text-sm">
                                    {{ splitMonth }}
                                </span>
                                {{ tgl.tglSplit }}
                            </h1>
                        </div>
                        <h1 v-else class="font-myFont text-center text-dark text-lg">
                            Pilih hari terlebih dahulu untuk melihat tanggal
                        </h1>
                        <!-- <button v-for="(tgl, index) in dataTgl" :key="index" class="rounded-full bg-biru text-light hover:opacity-80 hover:shadow-sm px-3 py-1">
                            {{ tgl }}
                        </button> -->
                        <!-- <button v-for="(tgl, index) in dataTgl" :key="index" @click="clickTgl" class="px-1 w-14 flex justify-center flex-wrap items-center border hover:border-biru hover:text-biru cursor-pointer">
                            {{ tgl }}
                        </button> -->
                        <!-- <span class="px-1 text-gray-400 w-14 flex justify-center items-center">
                            31
                        </span>
                        <span class="px-1 w-14 flex justify-center items-center border hover:border-green-500 hover:text-green-500 cursor-pointer">
                            01
                        </span> -->
                    </div>
                </div>
            </div>
            <div class="lg:w-1/2">
                <div class="bg-white rounded-lg shadow-lg p-4">
                    <div class="flex justify-center pb-4">
                        <span class="uppercase text-sm font-myFont font-semibold text-dark">Jam yang tersedia</span>
                    </div>
                    <div class="flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                        <p>Silahkan pilih tanggal terlebih dahulu</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import initAPI from '../../../api/api';
import { ref, computed, onMounted } from 'vue'

export default {
    name: 'Reservasi',
    setup(){
        // const activeHari = ref(false)
        const activeIndex = ref(null);
        const dataHari = ref([])
        const dataTgl = ref([])
        const computedTgl = computed(() => dataTgl.value)


        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const splitMonth = month.slice(0, 3);

        onMounted(async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1', null, token)
            
            // const filterTgl = []
            // const bulans = []
            // const arrTgl = response.data.filter(item => {
            //     const data = {
            //         tglSplit: item.date.split('-')[0],
            //         tglFull: item.date,
            //         available: item.available
            //     }
            //     filterTgl.push(data)
            //     // if(item.available){
            //     //     const split = item.date.split('-')
            //     //     const bulan = split[0]
            //     //     bulans.push(bulan)
            //     // }
            // })
            // dataTgl.value = filterTgl
            // console.log(`filter`,filterTgl)
            // const availableData = response.data.filter(item => item.available);
            // const tgl = availableData[0].date
            // console.log(`heh`,tgl)
            // dataTgl.value = availableData
            // console.log('avail',dataTgl.value)

            const uniqueDays = Array.from(new Set(response.data.map(item => item.day)));
            dataHari.value = uniqueDays
        })

        // const computedDataHari = computed(() => dataHari.value);

        const toggleActive = async(index) => {
            let indexHari = ''
            switch (index) {
                case 0:
                    indexHari = 'Monday';
                    break;
                case 1:
                    indexHari = 'Tuesday';
                    break;
                case 2:
                    indexHari = 'Wednesday';
                    break;
                case 3:
                    indexHari = 'Thursday';
                    break;
                case 4:
                    indexHari = 'Friday';
                    break;
                case 5:
                    indexHari = 'Saturday';
                    break;
                case 6:
                    indexHari = 'Sunday';
                    break;
            }
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1?day='+indexHari, null, token)
            console.log(`index hari`,response)
            const filterTgl = []
            const arrTgl = response.data.filter(item => {
                const data = {
                    tglSplit: item.date.split('-')[0],
                    tglFull: item.date,
                    available: item.available
                }
                filterTgl.push(data)
                // if(item.available){
                //     const split = item.date.split('-')
                //     const bulan = split[0]
                //     bulans.push(bulan)
                // }
            })
            activeIndex.value = index;
            dataTgl.value = filterTgl
        };

        const activeClass = (index) => {
        return {
            'border-opacity-50 text-opacity-40': activeIndex.value !== index,
            'border bg-biru text-light text-opacity-100 font-semibold': activeIndex.value === index,
        };
        };

        const clickTgl = async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1', null, token)
            // console.log(response)
            // dataHari.value = response.data
            // console.log('hari',dataHari.value)
        }


        return {
            dataTgl,
            dataHari,
            computedTgl,
            splitMonth,
            clickTgl,
            toggleActive,
            activeClass
        }
    }
}
</script>