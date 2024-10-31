<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <Layout v-if="!loading">
        <!-- Breadcrumb -->
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Reservasi</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Detail Consultant</div>
        </div>
        
        <section class="bg-white py-[52px]">
            <div class="mx-[30px] md:mx-[120px] flex justify-center">
                <div class="flex items-start gap-4 w-full">
                    <!-- Profile Card -->
                    <div class="max-w-[244px] p-4 bg-white rounded-2xl border border-[#667084] flex flex-col">
                        <img class="rounded-lg" src="https://placehold.co/244x244" alt="profile">

                        <span class="mx-auto mt-[24px] mb-[12px] text-xs text-[#3030f8] font-medium font-['Roboto']">
                            Kepala Psikologi Jatidiri
                        </span>

                        <h3 class="text-center text-xl text-[#0b0b79] font-medium font-['Roboto']">
                            Miryam A. Sigarlaki, M.Psi.Psikolog
                        </h3>
                    </div>

                    <!-- Card Waktu -->
                     <div class="flex flex-col w-full">
                        <h1 class="mb-[24px] font-semibold font-['Sora'] text-2xl text-[#000000]">
                            Jadwal dan Layanan yang Tersedia
                        </h1>

                        <div class="flex flex-col mb-[32px]">
                            <div class="px-7 py-3 bg-[#5959f9] rounded-t-2xl">
                                <h3 class="text-white text-xl font-medium font-['Roboto']">
                                    Pilih Jadwal
                                </h3>
                            </div>
    
                            <div class="bg-white border border-[#667084] rounded-b-2xl">
                                <div class="px-[36px] py-[24px] flex flex-col">
                                    <!-- Bulan & Tahun -->
                                    <!-- <div class="flex justify-center items-center gap-2">
                                        <div class="group relative">
                                            <button @click="showDropdown('bulan')" class="px-4 py-2 rounded-2xl text-[#667084] font-roboto font-normal flex items-center gap-2">
                                                {{ dropdowns.bulan == '' ? 'Bulan' : dropdowns.bulan }}
                                                <PhCaretDown/>
                                            </button>
    
                                            <div v-if="showDropdowns.bulan" class="no-scrollbar absolute p-3 max-h-[179px] overflow-y-auto bg-white rounded-2xl border flex flex-col gap-2">
                                                <span @click="dropdowns.bulan = bulan.value, showDropdown('bulan')" class="p-2 rounded-lg font-roboto text-[#667084] cursor-pointer hover:bg-[#f0f7fd]"
                                                v-for="(bulan, index) in months" :key="index">
                                                    {{ bulan.name }}
                                                </span>
                                                
                                            </div>
                                        </div>
    
                                        <div class="group relative">
                                            <button @click="showDropdown('tahun')" class="px-4 py-2 rounded-2xl text-[#667084] font-roboto font-normal flex items-center gap-2">
                                                {{ dropdowns.tahun == '' ? 'Tahun' : dropdowns.tahun }}
                                                <PhCaretDown/>
                                            </button>
    
                                            <div v-if="showDropdowns.tahun" class="no-scrollbar absolute p-3 max-h-[179px] overflow-y-auto bg-white rounded-2xl border flex flex-col gap-2">
                                                <span @click="dropdowns.tahun = tahun, showDropdown('tahun')" class="p-2 rounded-lg font-roboto text-[#667084] cursor-pointer hover:bg-[#f0f7fd]"
                                                v-for="(tahun, index) in years" :key="index">
                                                    {{ tahun }}
                                                </span>
                                                
                                            </div>
                                        </div>
                                    </div> -->
    
                                    <!-- <div class="my-[12px] w-full border-t border-[#667084]"></div> -->
                                    
                                    <!-- Hari -->
                                    <div class="flex justify-center items-center gap-4">
                                        <button @click="setActiveDay(index)" 
                                        :class="{ 'bg-[#f0f7fd] text-[#3030f8]': activeDay === index, 'text-[#667084]':  activeDay !== index}" class="rounded-lg font-robot px-4 py-2"
                                        v-for="(hari, index) in days" :key="index">
                                            {{ hari.name }}
                                        </button>
                                    </div>
    
                                    <span v-if="activeDay == null" class="mx-auto my-4 text-base text-[#3030f8] font-roboto">
                                        Pilih hari terlebih dahulu untuk melihat tanggal
                                    </span>
    
                                    <div v-else class="flex justify-center items-center gap-4 mt-6">
                                        <button @click="setActive(index), selectTanggal(tanggal.tanggal)" :class="{'bg-[#e4e6eb] text-[#667084] border-[#667084]': !tanggal.is_active && activeIndex !== index, 
                                        'bg-[#f0f7fd] text-[#3030f8] border-[#3030f8]': tanggal.is_active && activeIndex !== index,
                                        'bg-[#3030f8] text-white border-[#3030f8]': activeIndex === index
                                        }"
                                        v-for="(tanggal, index) in dataTanggal" :key="index" class="p-4 size-[80px] rounded-lg text-2xl font-sora font-medium border">
                                            {{ tanggal.tanggal.split('-')[0] }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div v-if="availableJams.length > 0" class="flex flex-col">
                            <div class="px-7 py-3 bg-[#5959f9] rounded-t-2xl">
                                <h3 class="text-white text-xl font-medium font-['Roboto']">
                                    Waktu yang tersedia
                                </h3>
                            </div>

                            <div class="bg-white border border-[#667084] rounded-b-2xl">
                                <div class="px-[36px] py-[24px] flex flex-col">
                                    <div class="flex justify-center items-center gap-4">
                                        <button @click="setActiveDay(index)" 
                                        class="bg-white text-[#667084] rounded-3xl border border-[#667084] font-roboto px-4 py-2"
                                        v-for="(jam, index) in availableJams" :key="index">
                                            {{ jam }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                     </div>

                </div>
            </div>
        </section>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { onMounted, ref, computed, onBeforeMount, watch } from 'vue';
import initAPI from '@/api/api'
import Cookies from 'js-cookie'
import Swal from "sweetalert2";
import { PhCaretDown } from '@phosphor-icons/vue';
import { useRoute, useRouter } from 'vue-router';

const baseUrl = import.meta.env.VITE_API_BASE_URL

const loading = ref(false)
const route = useRoute()
const router = useRouter()

const consultantId = ref('')

const availableJams = ref('')

// const showDropdowns = ref({
//     bulan: false,
//     tahun: false
// })

// const showDropdown = (type) => {
//     if(showDropdowns.value[type] == false) {
//         showDropdowns.value[type] = true
//     } else {
//         showDropdowns.value[type] = false
//     }
// }

// const dropdowns = ref({
//     bulan: '',
//     tahun: ''
// })

// const months = ref([ 
//     {name: 'Januari', value: 'January'}, 
//     {name: 'Februari', value: 'February'}, 
//     {name: 'Maret', value: "March"}, 
//     {name: 'April', value: "April"}, 
//     {name: 'Mei', value: "May"}, 
//     {name: 'Juni', value: "June"},
//     {name: 'Juli', value: 'July'},
//     {name: 'Agustus', value: "August"}, 
//     {name: 'September', value: "September"}, 
//     {name: 'Oktober', value: "October"}, 
//     {name: 'November', value: "November"}, 
//     {name: 'Desember', value: "December"} 
// ])

const currentYear = new Date().getFullYear()
const years = ref(Array.from({ length: 6 }, (_, index) => currentYear + index))

const dataTanggal = ref([])
const selectedTanggal = ref('')

const activeIndex = ref(null);

function setActive(index) {
  activeIndex.value = index;
}

const selectTanggal = (tanggal) => {
    selectedTanggal.value = tanggal
}

watch(dataTanggal, () => {
  activeIndex.value = null  
})

watch(selectedTanggal, () => {
    getJam()
})

const selectedDay = ref('')
const days = ref([
    { name: "Senin", value: "Monday" },
    { name: "Selasa", value: "Tuesday" },
    { name: "Rabu", value: "Wednesday" },
    { name: "Kamis", value: "Thursday" },
    { name: "Jumat", value: "Friday" },
    { name: "Sabtu", value: "Saturday" },
    { name: "Minggu", value: "Sunday" }
])

const getJadwal = async(day) => {
    try {
        const response = await initAPI('get', `consultants/available-schedule/${consultantId.value}?day=${day.value}`, null, Cookies.get('token'))
        console.log(`response`, response.data)

        if(dataTanggal.value.length > 0) dataTanggal.value = []

        if(response.data.length > 0){
            response.data.map((item) => {
                const datas = {
                    bulan: item.month,
                    tanggal: item.date,
                    is_active: item.available
                } 
                dataTanggal.value.push(datas)
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getJam = async() => {
    try {
        const response = await initAPI(
            'get', 
            `consultants/available-schedule/${consultantId.value}/${selectedDay.value}?date=${selectedTanggal.value}`, 
            null, 
            Cookies.get('token')
        )

        availableJams.value = response.data.time
    } catch (error) {
        
    }
}

const activeDay = ref(null);

const setActiveDay = (index) => {
    activeDay.value = index;
    selectedDay.value = days.value[index].value

    getJadwal(days.value[index])
}

const isValidConsultantId = (id) => {
    return !isNaN(id) && Number.isInteger(+id) && +id > 0
}

onBeforeMount(() => {
    const encodedConsultantId = route.query.consultant
    if (!encodedConsultantId) {
        router.push({name: 'user.views.reservasi'})
        return;
    }

    try {
        const decodedId = atob(encodedConsultantId)

        if (!isValidConsultantId(decodedId)) {
            router.push({name: 'user.views.reservasi'})
            return
        }

        consultantId.value = decodedId

    } catch (error) {
        Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi error data consultant tidak valid.",
        showConfirmButton: false,
        timer: 2000,
        });

        router.push({name: 'user.views.reservasi'})
    }
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
}
</style>