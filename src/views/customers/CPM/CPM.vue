<template>
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
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue"
import SebelumTest from "@/components/customer/CPM/SebelumTest/SebelumTest.vue"
import SelesaiTest from "@/components/customer/CPM/SelesaiTest/SelesaiTest.vue"
import Soal from "@/components/customer/CPM/Soal/Soal.vue"
import initAPI from '@/api/api'
import Cookies from "js-cookie"
import modalCekProfile from "@/components/modalCekProfile/modalCekProfile.vue"
import cekDataProfile from "@/components/cekProfile"

const dataProfileInclomplete = ref(false)
const isTestedCPM = ref(false)
const isSoalReady = ref(false)

const getUserData = async() => {
    try {
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

const siapTest = () => {
    isSoalReady.value = true
}
</script>