<template>
    <div v-if="loading" class="preloader-overlay">
        <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
    </div>

    <div v-if="!loading">
        <div class="mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
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
    
        <modalCekProfile v-if="dataProfileInclomplete"/>
    
        <div v-if="!dataProfileInclomplete">
            <div v-if="!isTestedCPM">
                <SebelumTest v-if="!isSoalReady" @siapTest="siapTest"/>
        
                <section v-if="isSoalReady" class="bg-white pb-20">
                    <Soal @refreshUser="getUserData"/>
                </section>
            </div>
        
            <div v-if="isTestedCPM">
                <SelesaiTest/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from "vue"
import SebelumTest from "@/components/customer/CPM/SebelumTest/SebelumTest.vue"
import SelesaiTest from "@/components/customer/CPM/SelesaiTest/SelesaiTest.vue"
import Soal from "@/components/customer/CPM/Soal/Soal.vue"
import initAPI from '@/api/api'
import Cookies from "js-cookie"
import modalCekProfile from "@/components/modalCekProfile/modalCekProfile.vue"
import cekDataProfile from "@/components/cekProfile"

const loading = ref(false)

const dataProfileInclomplete = ref(false)
const isTestedCPM = ref(false)
const isSoalReady = ref(
    localStorage.getItem('isSoalReady') === 'true' || false
)

const getUserData = async() => {
    try {
        loading.value = true
        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
        console.log(`cpm`,response.data)
    
        isTestedCPM.value = response.data.customer.customers_cpm !== null ? true : false
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error Terjadi',
            text: 'Terjadi error saat mengambil data pengguna',
            showConfirmButton: true,
            confirmButtonColor: "#3030f8",
            confirmButtonText: "OK",
        })
    } finally {
        loading.value = false
    }

}

onMounted(() => {
    getUserData()
})

onBeforeMount(() => {
    const cekDataKosong = cekDataProfile()
    
    if(cekDataKosong){
        dataProfileInclomplete.value = true
    } else {
        dataProfileInclomplete.value = false
    }
})

watch(isSoalReady, (newValue) => {
    if(newValue === true){
        localStorage.setItem('isSoalReady', 'true')
    } else {
        localStorage.setItem('isSoalReady', 'false')
    }
})

const siapTest = () => {
    isSoalReady.value = true
}
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