<template>
    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex pb-4">
                <h1 class="text-2xl text-start font-myFont text-dark">{{ month }} - {{ year }}</h1>
            </div>
            <div class="overflow-x-scroll lg:overflow-x-hidden flex justify-between font-medium uppercase text-xs pt-4 pb-2 border-t">
                <div
                @click="toggleActive(index)"
                v-for="(hari, index) in dataHari"
                :key="index"
                class="cursor-pointer px-3 border rounded-sm w-full mx-1 h-5 flex items-center justify-center border-biru text-biru hover:bg-biru hover:text-light shadow-md"
                :class="activeClass(index)"
                >
                {{ hari }}
                </div>
            </div>
    
            <div class="mx-1 flex gap-2 justify-center mt-2 font-medium text-sm">
                <!-- {{ dataTgl }} -->
                <div @click="clickTgl(tgl.tglFull)" v-if="computedTgl.length > 0 && !loadingHari" v-for="(tgl, index) in computedTgl" :key="index" class="cursor-pointer w-16 h-16 sm:w-[100px] sm:h-[100px] shadow-[1px_2px_12px_0_rgba(31,45,61,0.10)] rounded border border-[#e0e6ed] dark:border-[#1b2e4b] flex justify-center flex-col">
                    <h1 class="flex flex-col text-primary sm:text-3xl text-xl text-center">
                        <span class="-mt-3 mb-1 text-sm">
                            {{ splitMonth }}
                        </span>
                        {{ tgl.tglSplit }}
                    </h1>
                </div>
                <h1 v-else-if="computedTgl.length == 0 && !loadingHari" class="font-myFont text-center text-dark text-lg">
                    Pilih hari terlebih dahulu untuk melihat tanggal
                </h1>
                <span v-if="loadingHari" class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
            </div>
        </div>
    </div>
    <div class="lg:w-1/2">
        <div class="bg-white rounded-lg shadow-lg p-4">
            <div class="flex pb-4">
                <h1 class="text-2xl text-start font-myFont text-dark">Jam yang tersedia</h1>
            </div>
            <div v-if="mockTgl.length == 0 && !loading" class="flex justify-center font-medium text-xs pt-4 pb-2 border-t">
                <p class="font-myFont mt-4 text-center text-dark text-lg">Silahkan pilih tanggal terlebih dahulu</p>
            </div>
            <div v-else-if="mockTgl.length > 0 && !loading" class="flex flex-wrap justify-start gap-4 pt-4 pb-2 border-t">
                <div v-for="(jam, index) in mockTgl" class="font-medium text-xs mt-2 mb-2">
                    <span class="px-4 py-2 rounded-full bg-biru text-light">{{ jam.substring(0, 5) }}</span>
                </div>
            </div>
            <span v-if="loading" class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import initAPI from '../../../../api/api'

export default {
    name: 'PilihHari',
    setup(){
        const loading = ref(false)
        const loadingHari = ref(false)
        const mockTgl = ref([])
        const activeIndex = ref(null);
        const dataHari = ref([])
        const dataTgl = ref([])
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const splitMonth = month.slice(0, 3);
        const year = date.getFullYear();

        const computedTgl = computed(() => dataTgl.value)

        onMounted(async() => {
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1', null, token)
            const uniqueDays = Array.from(new Set(response.data.map(item => item.day)));
            dataHari.value = uniqueDays
        })
        const toggleActive = async(index) => {
            loadingHari.value = !loadingHari.value
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
            })
            activeIndex.value = index;
            dataTgl.value = filterTgl
            loadingHari.value = !loadingHari.value
        };

        const activeClass = (index) => {
            return {
                'border-opacity-50 text-opacity-40': activeIndex.value !== index,
                'border bg-biru text-light text-opacity-100 font-semibold': activeIndex.value === index,
            };
        };

        const clickTgl = async(tgl) => {
            loading.value = !loading.value
            console.log(`di klik`,tgl)
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('get', 'consultants/available-schedule/1/Monday?date='+tgl, null, token)
            console.log(response.data.time)
            mockTgl.value = response.data.time
            loading.value = !loading.value
            // dataHari.value = response.data
            // console.log('hari',dataHari.value)
        }

        return {
            loading,
            loadingHari,
            splitMonth,
            month,
            year,
            computedTgl,
            dataHari,
            dataTgl,
            mockTgl,
            clickTgl,
            toggleActive,
            activeClass
        }
    }
}
</script>