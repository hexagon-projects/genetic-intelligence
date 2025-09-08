<script setup lang="ts">
import Vector from '../../../../../assets/icons/karir-hasil.webp'
import { ref, onMounted } from 'vue';
import NewButton from '../../../../../components/customer/NewButton.vue';
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter()
const apiData = ref<any>(null);
const loading = ref(true);
const error = ref<any>(null);
const downloading = ref(false);

const activeDropdown = ref<number | null>(null);

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index;
};

const fetchCareerData = async () => {
    try {
        loading.value = true;
        const token = Cookies.get('token')
        const userData = JSON.parse(localStorage.getItem('userData'))
        const response = await initAPI(
            'GET',
            `customers/karier?customer_id=${userData.id}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            apiData.value = response.data.data;
        } else {
            apiData.value = null;
        }
    } catch (err) {
        error.value = err;
        apiData.value = null;
    } finally {
        loading.value = false;
    }
};

const handleDownload = async () => {
    if (!apiData.value || !apiData.value.id) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data karir tidak tersedia untuk diunduh',
            confirmButtonColor: '#3b82f6',
        });
        return;
    }

    try {
        downloading.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/result-bmw/${apiData.value.karier_id}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Gagal mengunduh file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `hasil-karir-${apiData.value.id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil karir berhasil diunduh',
            confirmButtonColor: '#3b82f6',
        });

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal mengunduh file. Silakan coba lagi.',
            confirmButtonColor: '#3b82f6',
        });
    } finally {
        downloading.value = false;
    }
};

const extractMainDescription = (html: string) => {
    if (!html) return 'Data tidak tersedia';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const saranIndex = html.indexOf('Saran Jalur Karier:');
    if (saranIndex !== -1) {
        return html.substring(0, saranIndex);
    }

    return html;
};

const extractCareerSuggestions = (html: string) => {
    if (!html) return 'Data tidak tersedia';
    
    const saranIndex = html.indexOf('Saran Jalur Karier:');
    if (saranIndex !== -1) {
        const startIndex = saranIndex + 'Saran Jalur Karier:'.length;
        return html.substring(startIndex).trim();
    }
    
    return 'Data tidak tersedia';
};

const navigateToHome = () => {
    router.push('/')
}

onMounted(() => {
    fetchCareerData();
});
</script>

<template>
    <div class="w-full bg-[#F8FBFE] font-sora">
        <div
            class="min-h-screen p-4 flex flex-col justify-between gap-6 md:max-w-[50%] lg:max-w-[30%] xl:max-w-[25%] mx-auto relative">
            <div class="w-full text-center flex justify-center items-center gap-2">
                <div class="py-1 px-3 rounded-md bg-primary/20">
                    <p class="text-sm">Hasil</p>
                </div>
                <h1 class="text-sm font-bold">Jatidiri Karir</h1>
            </div>

            <section class="space-y-6">
                <div v-if="loading" class="text-center py-10">
                    <p>Memuat data...</p>
                </div>

                <div v-else-if="apiData">
                    <Transition name="fade-slide" mode="out-in">
                        <div class="w-full max-w-[80%] h-[40vh] md:h-[30vh] mx-auto">
                            <img :src="Vector" alt="Ilustrasi Karir" class="w-full h-[40vh] md:h-[30vh] object-contain">
                        </div>
                    </Transition>

                    <Transition name="fade-slide" mode="out-in">
                        <div class="space-y-2 text-center">
                            <h6 class="text-xl font-bold">{{ apiData.karier?.name || 'Data tidak tersedia' }}</h6>
                            <p class="text-base text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                v-html="extractMainDescription(apiData.karier?.description)"></p>
                        </div>
                    </Transition>

                    <div class="space-y-3 pt-4">
                        <div class="space-y-2">
                            <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(0)">
                                <p class="text-base text-[#A4A4A4]" :class="{ 'text-black': activeDropdown === 0 }">
                                    Rekomendasi Karir
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                    fill="none" :class="{ 'rotate-180': activeDropdown === 0 }"
                                    class="transition-transform duration-300">
                                    <path
                                        d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                        fill="#A4A4A4" />
                                </svg>
                            </div>

                            <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                :class="activeDropdown === 0 ? 'opacity-100' : 'max-h-0 opacity-0'">
                                <p class="text-base font-medium [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                    v-html="extractCareerSuggestions(apiData.karier?.description)">
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- <div class="space-y-2">
                            <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(1)">
                                <p class="text-base text-[#A4A4A4]" :class="{ 'text-black': activeDropdown === 1 }">
                                    Detail Hasil
                                </p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                    fill="none" :class="{ 'rotate-180': activeDropdown === 1 }"
                                    class="transition-transform duration-300">
                                    <path
                                        d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                        fill="#A4A4A4" />
                                </svg>
                            </div>

                            <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                :class="activeDropdown === 1 ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'">
                                <p class="text-base font-medium mb-2">
                                    <span v-if="apiData.sci">SCI: {{ formatData(apiData.sci) }}</span><br>
                                    <span v-if="apiData.eri">ERI: {{ formatData(apiData.eri) }}</span><br>
                                    <span v-if="apiData.wri">WRI: {{ formatData(apiData.wri) }}</span><br>
                                </p>
                                <div
                                    class="py-2 px-3 sm:px-4 rounded-full bg-primary w-fit text-sm md:text-base text-white">
                                    Skor {{ apiData.total }}
                                </div>
                            </div>
                        </div> -->
                </div>

                <div v-else class="text-center py-10">
                    <p>Data tidak tersedia</p>
                </div>
            </section>

            <div class="flex flex-col gap-2">
                <Transition name="fade">
                    <NewButton :text="downloading ? 'Mengunduh...' : 'Download PDF'" class="font-semibold"
                        text-size="text-sm" bg-color="bg-white" text-color="text-primary" border-color="border-primary"
                        :disabled="downloading || !apiData" @click="handleDownload" />
                </Transition>
                <NewButton v-if="apiData" @click="navigateToHome" :text="'Selesai'" class="font-semibold"
                    text-size="text-sm" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.3s ease;
}

.fade-slide-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>