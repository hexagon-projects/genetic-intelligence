<template>
    <!-- Breadcrumb -->
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

    <section class="bg-white pb-20">
        <div class="flex flex-col items-center">
            <div class="mb-[24px] h-[194.54px] flex-col justify-start items-center gap-2 inline-flex">
                <img class="w-[200px] h-[158.54px]" src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="logo" />
                <div class="self-stretch text-center text-[#0b0b79] text-lg font-semibold font-sora leading-7">Hasil Pemeriksaan Tes Kecerdasan</div>
            </div>

            <!-- Identitas & Rangkuman -->
            <div class="flex flex-col lg:flex-row gap-6 pb-[36px]">
                <Identitas :userInfo="identitas" :isLoading="loading"/>

                <Rangkuman/>
            </div>

            <!-- Hasil Test -->
            <div class="w-full flex flex-col items-center bg-[#f0f7fd] px-9 py-14">
                <DokumenTest/>

                <!-- button download -->
                <button class="self-stretch h-[62px] px-[90px] py-[18px] bg-[#3030f8] rounded-2xl border-l border-r border-t border-b-4 border-black justify-center items-center gap-2.5 inline-flex">
                    <div class="text-white text-base font-medium font-roboto leading-normal">Unduh Hasil Tes</div>
                    <div class="w-4 h-4 relative">
                        <img src="@/assets/img/cpm/download.svg" alt="download">
                    </div>
                </button>
             </div>
        </div>
    </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import DokumenTest from '@/components/customer/CPM/HasilTest/Dokumen.vue';
import Identitas from '@/components/customer/CPM/HasilTest/Identitas.vue';
import Rangkuman from '@/components/customer/CPM/HasilTest/Rangkuman.vue';
import initAPI from '@/api/api';
import Cookies from "js-cookie"

const loading = ref(false)

const identitas = ref({
    nama: '',
    jenis_kelamin: '',
    tanggal_lahir: '',
    tanggal_tes: '',
    usia: ''
})

const showSaran = ref(false)
const showGambaranUmum = ref(false)

const getUserInfo = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
        console.log(`user info`,response.data)
    
        identitas.value.nama = response.data.customer.name
        identitas.value.jenis_kelamin = response.data.customer.gender
        identitas.value.tanggal_lahir = response.data.customer.birth_date
    } catch (error) {
        console.log(`error`, error)
    } finally {
        loading.value = false
    }

}

onMounted(() => {
    getUserInfo()
})
</script>