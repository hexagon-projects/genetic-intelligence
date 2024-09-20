<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <Layout v-if="!loading">
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test Assessment</div>
        </div>

        <SelesaiTest v-if="isTested" message="Test Assessment Selesai!"
        :subMessage="subMessage"/>

        <section v-if="!isTested" class="bg-white pb-[34px]">
            <SoalAssessment :customerId="customerId" @refreshData="getUserData"/>
        </section>
    
        <section class="bg-white py-[46px]">
            <ReservasiFooter/>
        </section>
    </Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import initAPI from '@/api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import Cookies from 'js-cookie'
import Layout from '@/Layout/Customer/Layout.vue';
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import SoalAssessment from '@/components/REMAKE/Test/Assessment/SoalAssessment.vue';

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Assesment</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const loading = ref(true)
const customerId = ref('')
const isTested = ref(null)

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)

        customerId.value = userData.data.customer.id
        isTested.value = userData.data.customer.customers_assessments == null ? false : true
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onMounted(async() => {
   await getUserData()
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