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
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test CPM</div>
        </div>
    
        <SelesaiTest v-if="statusTest == 'Selesai Terdeteksi'" routeUrl="user.views.hasil_deteksi" message="Test GIM Selesai!"
        :subMessage="subMessage"/>

        <DiProses v-if="statusTest == 'Sudah Disubmit'" message="Test Kamu Sedang Diproses!" 
        subMessage="Terima kasih telah menyelesaikan Tes GIM! Saat ini, hasil tes kamu sedang diproses oleh tim konsultan kami. Kami akan menghubungi kamu segera setelah analisis selesai untuk memberikan laporan lengkapnya."/>
    
        <section class="bg-white py-[46px]">
            <ReservasiFooter/>
        </section>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import ReservasiFooter from '@/components/REMAKE/ReservasiFooter/Reservasi.vue';
import DiProses from '@/components/REMAKE/HasilTest/DiProses/DiProses.vue';
import SelesaiTest from '@/components/REMAKE/HasilTest/SelesaiTest/SelesaiTest.vue';
import { onMounted, ref } from 'vue';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';

const subMessage = `Kerja yang bagus! Kamu telah menyelesaikan Tes <span class="font-bold">Genetic Intelligence Mapping</span>. Mari lihat hasilnya dan temukan lebih banyak tentang potensi diri Kamu!`

const loading = ref(true)
const statusTest = ref('Belum')

const getUserData = async() => {
    try {
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const userData = await initAPI('post', 'login', formData, token)
        console.log(`data hasil`, userData.data)

        statusTest.value = userData.data.customer.is_detected

        // isTested.value = userData.data.customer.is_detected == 'Selesai Terdeteksi' ? true 
        // : userData.data.customer.is_detected == 'Sudah Disubmit' ? true
        // : false
        
        // if(userData.data.customer.customers_results !== null && userData.data.customer.customers_results.gim !== null){
        //     GIMDatas.value = userData.data.customer.customers_results
        // }
    } catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getUserData()
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