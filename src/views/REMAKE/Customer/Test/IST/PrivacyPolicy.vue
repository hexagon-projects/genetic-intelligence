<script setup>
import { useRouter } from 'vue-router'
import Logo from '../../../../../assets/icons/logo-icon.png'
import { ref, onMounted } from 'vue'
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api';
import VectorDone from '../../../../../assets/icons/ist.png'
import NewButton from '../../../../../components/customer/NewButton.vue';
import Swal from 'sweetalert2'

const isChecked = ref(false)
const router = useRouter()

const hasTestResult = ref(false);

const validateAge = () => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}')

    if (!userData.birth_date) {
        router.push('/')
        return false
    }

    const birthDate = new Date(userData.birth_date.split('-').reverse().join('-'))
    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ? age - 1
        : age

    if (actualAge < 14 || actualAge > 60) {
        Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Umur anda tidak mencukupi untuk mengikuti tes Jatidiri Cerdas dewasa',
            confirmButtonText: 'OK'
        })
        router.push('/')
        return false
    }

    return true
}

const checkTestResult = async () => {
    try {
        const token = Cookies.get('token')
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')

        if (!token || !userData.id) {
            router.push('/login')
            return false;
        }

        const response = await initAPI('GET', `customers/ist?customer_id=${userData.id}`, null, token);

        if (response.data && response.data.data) {
            hasTestResult.value = true;
        }
    } catch (error) {
        // console.error('Error checking karier status:', error)
        hasTestResult.value = false;
    }
}

const navigateToIst = () => {
    router.push('/ist/soal');
};

const navigateToResult = () => {
    router.push('/ist/hasil');
};

onMounted(() => {
    if (!validateAge()) return
    checkTestResult()
})
</script>

<template>
    <div class="w-full p-4 min-h-screen bg-[#F1F7FD] font-sora">
        <div
            class="w-full h-full md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto space-y-4 md:space-y-6 lg:space-y-8 relative pb-20 pt-10">
            <div v-if="hasTestResult" class="min-h-screen flex flex-col justify-center items-center">
                <div class="text-center mb-8">
                    <h1 class="text-xl font-bold text-[#6464FA] mb-4">Tes Jatidiri Cerdas dewasa Telah Selesai!</h1>
                    <p class="text-sm text-gray-600">Kamu telah menyelesaikan tes Jatidiri Cerdas dewasa. Sekarang kamu
                        bisa
                        melihat hasil dari tes Jatidiri Cerdas dewasa kamu.</p>
                </div>

                <div class="w-full max-w-xs p-6">
                    <div class="mb-6">
                        <img :src="VectorDone" alt="Jatidiri Cerdas dewasa Selesai">
                    </div>

                    <NewButton @click="navigateToResult" text="Lihat Hasil Tes" class="w-full font-semibold mb-4"
                        text-size="text-sm" />

                    <p class="text-xs text-center text-gray-500">
                        Hasil tes akan memberikan wawasan tentang karir yang sesuai dengan kepribadianmu
                    </p>
                </div>
            </div>

            <div v-else class="space-y-4 md:space-y-6 lg:space-y-8">
                <div class="space-y-2">
                    <div>
                        <img :src="Logo" alt="Logo Jatidiri" class="w-8 h-8 object-contain">
                    </div>
                    <h1 class="text-2xl font-medium">Kebijakan Privasi</h1>
                </div>
                <div class="space-y-6">
                    <div class="space-y-2">
                        <h6 class="text-base font-medium">Data Anda Aman</h6>
                        <p class="text-sm">Data Anda tersimpan di perangkat dan hanya digunakan untuk kebutuhan asesmen
                            psikologis. Kami
                            tidak akan menjual atau membagikan data Anda tanpa izin. Untuk keperluan pengembangan
                            layanan,
                            kami mungkin mengumpulkan informasi penggunaan aplikasi yang tidak dapat diidentifikasi.</p>
                    </div>
                    <div class="space-y-2">
                        <h6 class="text-base font-medium">Tes Ini Hanya Gambaran Awal</h6>
                        <p class="text-sm">Tes ini memberikan gambaran umum mengenai kondisi psikologis, tetapi tidak
                            dapat menggantikan diagnosis klinis. Untuk penegakan diagnosis dan intervensi, tetap
                            diperlukan evaluasi lebih lanjut oleh psikolog atau psikiater.</p>
                    </div>
                </div>

                <p class="text-[12px]">Dengan melanjutkan, Anda menyatakan bahwa Anda telah membaca, memahami, dan
                    menyetujui informasi di atas serta bersedia mengikuti asesmen ini secara sadar, sungguh sungguh dan
                    mengerjakan secara mandiri karena system akan memantau setiap pengerjaan.</p>

                <div class="flex items-start justify-start gap-4">
                    <input type="checkbox" v-model="isChecked" class="w-12 h-12 cursor-pointer">
                    <p class="text-[12px]">
                        Saya telah membaca dan memahami Syarat & Ketentuan yang berlaku, dan saya setuju untuk
                        terikat
                        pada
                        ketentuan penggunaan aplikasi ini.
                    </p>
                </div>

                <div class="md:max-w-[50%] lg:max-w-[35%] xl:max-w-[30%] mx-auto fixed bottom-4 left-4 right-4">
                    <button @click="navigateToIst" :disabled="!isChecked"
                        :class="{ 'opacity-50 cursor-not-allowed': !isChecked }" class="w-full bg-primary text-white border-[#7474FB] text-base rounded-full py-3 border-4 text-center font-sora 
                                   shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]
                                   transition-all duration-500 transform active:scale-95 relative overflow-hidden">
                        <transition name="button-text" mode="out-in">
                            <span class="relative z-10">Mulai Tes</span>
                        </transition>
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000">
                        </div>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>