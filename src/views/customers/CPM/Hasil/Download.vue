<template>
    <div class="bg-white h-[100vh]" id="toPDF">
        <section class="py-12">
            <div class="flex flex-col items-center">
                <img class="mb-3 w-[200px] h-[158.54px]" src="@/assets/img/logo-jatidiri-hasi-cpm.png" alt="logo" />
                <div class="self-stretch text-center text-[#0b0b79] text-3xl font-semibold font-sora leading-7">
                    Hasil Pemeriksaan Tes Kecerdasan
                </div>
            </div>
        </section>
        <section class="py-12">
            <div class="w-full flex flex-col items-center">
                <div class="w-full max-w-2xl flex justify-between items-start">
                    <h1 class="text-[#0b0b79] text-xl font-semibold font-sora leading-7">Identitas</h1>
                    <div class="flex flex-col">
                        <div class="bg-[#3030f8] px-4 py-2 rounded-lg flex flex-col items-center">
                            <span class="uppercase font-sora text-sm text-white">
                                rahasia
                            </span>
                            <span class="italic font-sora text-sm text-white">
                                Conventional
                            </span>
                        </div>

                        <div class="bg-[#3030f8] px-4 py-2 rounded-lg flex flex-col items-center">
                            <span class="uppercase font-sora text-sm text-white">
                                JD-{{ formattedDate }}-818-{{  }}
                            </span>
                            <span class="italic font-sora text-sm text-white">
                                Conventional
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(false)
const userId = ref(null)

function formatDateToCustomFormat(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() memberikan bulan dari 0-11, jadi tambahkan 1
  const monthFormatted = month < 10 ? `0${month}` : month; // Pastikan bulan selalu 2 digit
  return `${year}${monthFormatted}`;
}

const today = new Date();
const formattedDate = formatDateToCustomFormat(today);

const getUserInfo = async() => {
    try {
        loading.value = true

        const token = Cookies.get('token')
        const formData = new FormData()
        formData.append('refresh_user', 'true')
        const response = await initAPI('post', 'login', formData, token)
        console.log(`user info`,response.data)
    
        
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