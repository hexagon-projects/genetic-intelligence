<script setup lang="ts">
import Vector from '../../../../../../assets/icons/karir-hasil.webp'
import lbc from '../../../../../../assets/icons/lbc.webp'
import { ref, onMounted, computed } from 'vue';
import NewButton from '../../../../../../components/customer/NewButton.vue';
import Cookies from 'js-cookie'
import initAPI from '../../../../../../api/api';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter()
const apiData = ref<any>(null);
const loading = ref(true);
const error = ref<any>(null);
const downloading = ref(false);

const activeDropdown = ref<number | null>(null);
const currentStep = ref(1)

const data = localStorage.getItem('mms_id')

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index;
};

const fetchMMSData = async () => {
    try {
        loading.value = true;
        const token = Cookies.get('token')
        const response = await initAPI(
            'GET',
            `customers/mms?customerMmsId=${data}`,
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
    if (!apiData.value || !apiData.value.mms?.id) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data MMS tidak tersedia untuk diunduh',
            confirmButtonColor: '#3b82f6',
        });
        return;
    }

    try {
        downloading.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/result-mms/${data}`,
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
        a.download = `hasil-mms.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil MMS berhasil diunduh',
            timer: 3000,
            showConfirmButton: false
        });

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal mengunduh file. Silakan coba lagi.',
            timer: 3000,
            showConfirmButton: false
        });
    } finally {
        downloading.value = false;
    }
};

const extractMainDescription = (html: string) => {
    if (!html) return 'Data tidak tersedia';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const survivalIndex = html.indexOf('Survival Konkret:');
    if (survivalIndex !== -1) {
        return html.substring(0, survivalIndex);
    }

    return html;
};

const extractSurvivalSuggestions = (html: string) => {
    if (!html) return 'Data tidak tersedia';

    const survivalIndex = html.indexOf('Survival Konkret:');
    const hallopsyIndex = html.indexOf('HalloPsy:');

    if (survivalIndex !== -1 && hallopsyIndex !== -1) {
        const startIndex = survivalIndex + 'Survival Konkret:'.length;
        return html.substring(startIndex, hallopsyIndex).trim();
    } else if (survivalIndex !== -1) {
        const startIndex = survivalIndex + 'Survival Konkret:'.length;
        return html.substring(startIndex).trim();
    }

    return 'Data tidak tersedia';
};

const extractHallopsyInfo = (html: string) => {
    if (!html) return 'Data tidak tersedia';

    const hallopsyIndex = html.indexOf('HalloPsy:');
    if (hallopsyIndex !== -1) {
        const startIndex = hallopsyIndex + 'HalloPsy:'.length;
        return html.substring(startIndex).trim();
    }

    return 'Data tidak tersedia';
};

const nextStep = () => {
    if (currentStep.value < 3) {
        currentStep.value++;
    }
};

const prevStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const navigateToHome = () => {
    router.push('/')
    localStorage.removeItem('mms_id')
}

onMounted(() => {
    fetchMMSData();
});
</script>

<template>
    <div class="w-full bg-[#F8FBFE] font-sora">
        <div
            class="min-h-screen p-4 flex flex-col justify-between gap-6 md:max-w-[50%] lg:max-w-[30%] xl:max-w-[30%] mx-auto relative">
            <div class="space-y-4">
                <div class="w-full text-center flex justify-center items-center gap-2">
                    <div class="py-1 px-3 rounded-md bg-primary/20">
                        <p class="text-sm">Hasil</p>
                    </div>
                    <h1 class="text-sm font-bold">Jatidiri Tangguh - MMS</h1>
                </div>

                <div class="">
                    <p class="text-left text-[10px] text-[#9A9A9A]">{{ currentStep }}/3</p>
                    <div class="w-full grid grid-cols-3 gap-4 transition-all duration-700 ease-in-out">
                        <div class="relative" v-for="(step, index) in 3" :key="index">
                            <div class="w-full h-2 rounded-lg bg-[#EFEFEF] transition-all duration-300"></div>
                            <div class="absolute inset-0 h-2 rounded-lg bg-primary transition-all duration-700 ease-in-out transform origin-left"
                                :class="{ 'w-full scale-x-100': currentStep > index + 1, 'w-full scale-x-100': currentStep === index + 1, 'w-0 scale-x-0': currentStep < index + 1 }">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section class="space-y-6">
                <div v-if="loading" class="text-center py-10">
                    <p>Memuat data...</p>
                </div>

                <div v-else-if="apiData" class="space-y-6">
                    <Transition name="fade-slide" mode="out-in" v-if="currentStep === 1">
                        <div class="w-full max-w-[80%] h-[40vh] md:h-[30vh] mx-auto">
                            <img :src="lbc" alt="Ilustrasi MMS" class="w-full h-[40vh] md:h-[30vh] object-contain">
                        </div>
                    </Transition>

                    <div v-if="currentStep === 1">
                        <Transition name="fade-slide" mode="out-in">
                            <div class="space-y-2 text-center">
                                <h6 class="text-xl font-bold">{{ apiData.mms?.name || 'Data tidak tersedia'
                                }}</h6>
                                <p class="text-base text-justify [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                    v-html="extractMainDescription(apiData.mms?.description)"></p>
                            </div>
                        </Transition>
                    </div>

                    <Transition name="fade-slide" mode="out-in" v-if="currentStep === 2">
                        <div class="w-full h-[40vh] md:h-[30vh] mx-auto bg-white rounded-4xl">
                            <img :src="Vector" alt="Ilustrasi MMS"
                                class="w-full mx-auto max-w-[80%] h-[40vh] md:h-[30vh] object-contain  py-3 md:py-6">
                        </div>
                    </Transition>

                    <div class="space-y-0" v-if="currentStep === 2">
                        <Transition name="fade-slide" mode="out-in">
                            <div class="w-full rounded-4xl p-4 space-y-6">
                                <div class="space-y-2 text-center">
                                    <h6 class="text-xl font-bold">Saran Survival Konkret</h6>
                                    <p class="text-base text-center [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                        v-html="extractSurvivalSuggestions(apiData.mms?.description)"></p>
                                </div>
                            </div>
                        </Transition>

                        <Transition name="fade-slide" mode="out-in">
                            <div class="w-full rounded-4xl p-4 space-y-6">
                                <div class="space-y-2 text-center">
                                    <h6 class="text-xl font-bold">Saran Hallopsy</h6>
                                    <p class="text-base text-center [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                        v-html="extractHallopsyInfo(apiData.mms?.description)"></p>
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <Transition name="fade-slide" mode="out-in" v-if="currentStep === 3">
                        <div class="w-full min-h-[70vh] h-full rounded-4xl p-4 space-y-6">
                            <div class="space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(1)">
                                        <p class="text-base text-[#A4A4A4] font-medium"
                                            :class="{ 'text-black': activeDropdown === 1 }">
                                            {{ apiData.dimensi_diri?.type || 'Level Burnout' }}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            viewBox="0 0 12 12" fill="none"
                                            :class="{ 'rotate-180': activeDropdown === 1 }"
                                            class="transition-transform duration-300">
                                            <path
                                                d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                                fill="black" />
                                        </svg>
                                    </div>

                                    <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                        :class="activeDropdown === 1 ? 'opacity-100' : 'max-h-0 opacity-0'">
                                        <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                            v-html="apiData.dimensi_diri?.description">
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(2)">
                                        <p class="text-base text-[#A4A4A4] font-medium"
                                            :class="{ 'text-black': activeDropdown === 2 }">
                                            {{ apiData.dimensi_hidup?.type || 'Level Burnout' }}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            viewBox="0 0 12 12" fill="none"
                                            :class="{ 'rotate-180': activeDropdown === 2 }"
                                            class="transition-transform duration-300">
                                            <path
                                                d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                                fill="black" />
                                        </svg>
                                    </div>

                                    <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                        :class="activeDropdown === 2 ? 'opacity-100' : 'max-h-0 opacity-0'">
                                        <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                            v-html="apiData.dimensi_hidup?.description">
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-3">
                                <div class="space-y-2">
                                    <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(3)">
                                        <p class="text-base text-[#A4A4A4] font-medium"
                                            :class="{ 'text-black': activeDropdown === 3 }">
                                            {{ apiData.dimensi_positif?.type || 'Level Burnout' }}
                                        </p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12"
                                            viewBox="0 0 12 12" fill="none"
                                            :class="{ 'rotate-180': activeDropdown === 3 }"
                                            class="transition-transform duration-300">
                                            <path
                                                d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                                fill="black" />
                                        </svg>
                                    </div>

                                    <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                        :class="activeDropdown === 3 ? 'opacity-100' : 'max-h-0 opacity-0'">
                                        <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                            v-html="apiData.dimensi_positif?.description">
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
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
                <div class="flex items-center gap-2">
                    <Transition name="fade">
                        <div @click="prevStep" :disabled="currentStep === 1 || !apiData"
                            :class="{ 'opacity-50 cursor-not-allowed': currentStep === 1 }"
                            class="w-[16%] xl:w-[12%] rounded-full bg-primary text-white border-[#8383FB] text-xl py-3 border-4 cursor-pointer flex justify-center items-center text-center font-sora shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24"
                                fill="none">
                                <path
                                    d="M10.9991 23.56C10.7457 23.56 10.4924 23.4667 10.2924 23.2667L1.59906 14.5734C0.185729 13.16 0.185729 10.84 1.59906 9.42669L10.2924 0.733359C10.6791 0.346693 11.3191 0.346693 11.7057 0.733359C12.0924 1.12003 12.0924 1.76003 11.7057 2.14669L3.0124 10.84C2.3724 11.48 2.3724 12.52 3.0124 13.16L11.7057 21.8534C12.0924 22.24 12.0924 22.88 11.7057 23.2667C11.5057 23.4534 11.2524 23.56 10.9991 23.56Z"
                                    fill="white" />
                            </svg>
                        </div>
                    </Transition>
                    <NewButton v-if="apiData" @click="currentStep < 3 ? nextStep() : navigateToHome()"
                        :text="currentStep < 3 ? 'Selanjutnya' : 'Selesai'" class="w-[86%] font-semibold"
                        text-size="text-sm" />
                </div>
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