<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-if="!loading">
        <Layout>
            <!-- Breadcrumb -->
            <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Hasil Tes</div>
                <div class="w-4 h-4 relative opacity-75">
                    <img src="@/assets/img/chevron_forward.svg">
                </div>
                <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test CPM</div>
            </div>
        
            <section class="bg-white pb-20">
                <BelumTest v-if="!sudahTest"/>
        
                <div v-if="sudahTest" class="mx-4 flex flex-col items-center">
                    <div class="mb-[24px] h-[194.54px] flex-col justify-start items-center gap-2 inline-flex">
                        <img class="w-[200px] h-[158.54px]" src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="logo" />
                        <div class="self-stretch text-center text-[#0b0b79] text-lg font-semibold font-sora leading-7">Hasil Pemeriksaan Tes Kecerdasan</div>
                    </div>
        
                    <!-- Identitas & Rangkuman -->
                    <div class="w-full mx-auto pb-[36px]">
                        <div class="flex flex-col justify-center items-start lg:flex-row gap-6">
                            <Identitas :userInfo="identitas" :cpmInfo="cpmInfo" :isLoading="loading"/>
            
                            <Rangkuman :cpmInfo="cpmInfo"/>
                        </div>
                    </div>
                </div>
            </section>
    
            <section class="bg-[#f0f7fd] px-4 py-14">
                <!-- Hasil Test -->
                <div v-if="sudahTest" class="w-full flex flex-col items-center pb-8">
                        <DokumenTest :cpmInfo="cpmInfo"/>
        
                        <!-- button download -->
                        <button @click="downloadHasil" class="self-stretch h-[62px] px-[78px] md:px-[90px] py-[18px] bg-[#3030f8] rounded-2xl border-l border-r border-t border-b border-black justify-center items-center gap-2.5 inline-flex">
                            <div class="text-white text-sm md:text-base font-medium font-roboto leading-normal">Unduh Hasil Tes</div>
                            <div class="w-4 h-4 relative">
                                <img src="@/assets/img/cpm/download.svg" alt="download">
                            </div>
                        </button>
                     </div>
            </section>
        </Layout>
    </div>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { onMounted, ref } from 'vue'
import DokumenTest from '@/components/customer/CPM/HasilTest/Dokumen.vue';
import Identitas from '@/components/customer/CPM/HasilTest/Identitas.vue';
import Rangkuman from '@/components/customer/CPM/HasilTest/Rangkuman.vue';
import initAPI from '@/api/api';
import Cookies from "js-cookie"
import BelumTest from './BelumTest.vue';
import { useRouter } from 'vue-router';

const loading = ref(false)

const sudahTest = ref(false)

const userId = ref(null)

const router = useRouter()
const downloadHasil = () => {
    router.push({name: 'user.views.download_hasil_cpm'})
}

const identitas = ref({
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tanggal_tes: '',
    usia: '',
    durasi_tes: ''
})

const cpmInfo = ref({
    set_a: '',
    set_ab: '',
    set_b: '',
    grade: '',
    type: '',
    grade_icon: '',
    penjelasan: '',
    saran: '',
    pemahaman_empati: ''
})

const showSaran = ref(false)
const showGambaranUmum = ref(false)

const getCPMInfo = async(userId) => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('get', 'customers/cpm/'+userId, null, token)
    
        identitas.value.tanggal_tes = response.data[0].test_date
        identitas.value.usia = response.data[0].age
        identitas.value.durasi_tes = response.data[0].time
        cpmInfo.value.set_a = response.data[0].cpm_scores.a
        cpmInfo.value.set_ab = response.data[0].cpm_scores.ab
        cpmInfo.value.set_b = response.data[0].cpm_scores.b
        cpmInfo.value.grade = response.data[0].cpm.grade
        cpmInfo.value.type = response.data[0].cpm.name
        cpmInfo.value.grade_icon = response.data[0].cpm.icon
        cpmInfo.value.penjelasan = response.data[0].cpm.desc
        cpmInfo.value.saran = response.data[0].cpm.suggestion
        cpmInfo.value.pemahaman_empati = response.data[0].cpm.warning
    } catch (error) {
        console.log(`err`, error)
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data test CPM',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        })
    } finally {
        loading.value = false
    }
}

const getUserInfo = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
    
        userId.value = response.data.customer.id
        identitas.value.nama = response.data.customer.name
        identitas.value.jenis_kelamin = response.data.customer.gender
        identitas.value.tanggal_lahir = response.data.customer.birth_date

        if (response.data.customer.customers_cpm) {
            sudahTest.value = true
            await getCPMInfo(userId.value);
        } else {
            sudahTest.value = false
            loading.value = false
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data pengguna',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        })
    } 
}

onMounted(() => {
    getUserInfo()
})
</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}
</style>