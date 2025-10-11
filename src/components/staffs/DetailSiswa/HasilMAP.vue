<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Cookies from "js-cookie";
import initAPI from '../../../api/api'
import NewButton from '../../customer/NewButton.vue';
import Swal from 'sweetalert2';

const props = defineProps<{
    data: []
}>()

const mapData = ref(null);
const activeTestIndex = ref(0);
const downloading = ref(false);
const activeDropdown = ref<number | null>(null);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

const extractMainDescription = (html: string) => {
    if (!html) return 'Data tidak tersedia';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const survivalIndex = html.indexOf('Saran Survival:');
    if (survivalIndex !== -1) {
        return html.substring(0, survivalIndex);
    }

    return html;
};

const extractSurvivalSuggestions = (html: string) => {
    if (!html) return 'Data tidak tersedia';

    const survivalIndex = html.indexOf('Saran Survival:');
    const hallopsyIndex = html.indexOf('HalloPsy:');

    if (survivalIndex !== -1 && hallopsyIndex !== -1) {
        const startIndex = survivalIndex + 'Saran Survival:'.length;
        return html.substring(startIndex, hallopsyIndex).trim();
    } else if (survivalIndex !== -1) {
        const startIndex = survivalIndex + 'Saran Survival:'.length;
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

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index;
};

const setActiveTest = (index: number) => {
    activeTestIndex.value = index;
    getMapTangguh(props.data[index]?.id);
};

const handleDownload = async (id) => {
    if (props.id) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data MAP tidak tersedia untuk diunduh',
            confirmButtonColor: '#3b82f6',
            timer: 3000,
            showConfirmButton: false
        });
        return;
    }

    try {
        downloading.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/result-map/${id}`,
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
        a.download = `hasil-bri.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil MAP berhasil diunduh',
            confirmButtonColor: '#3b82f6',
            timer: 3000,
            showConfirmButton: false
        });

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal mengunduh file. Silakan coba lagi.',
            confirmButtonColor: '#3b82f6',
            timer: 3000,
            showConfirmButton: false
        });
    } finally {
        downloading.value = false;
    }
};

const getMapTangguh = async (id) => {
    try {
        const token = Cookies.get("token");
        const response = await initAPI(
            "get",
            `customers/map?customerMapId=${id}`,
            null,
            token
        );

        mapData.value = response.data.data;
    } catch (error) {
        mapData.value = null
    }
};

onMounted(() => {
    if (props.data && props.data.length > 0) {
        getMapTangguh(props.data[0]?.id);
    }
})
</script>

<template>
    <section class="font-sora px-8 pb-8">
        <!-- List Hasil Test -->
        <h2 class="text-[#0c141c] text-xl font-bold leading-7 pb-4">List Hasil Test</h2>
        <div class="grid grid-cols-3 gap-8">
            <div v-for="(item, index) in data" :key="index" class="w-full h-20 md:h-24" @click="setActiveTest(index)">
                <div class="w-full h-full flex items-center relative border border-black/10 rounded-3xl pr-4 cursor-pointer"
                    :class="{ 'border-primary bg-primary/20': activeTestIndex === index }">
                    <div
                        class="absolute w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                            <g clip-path="url(#clip0_4638_38591)">
                                <mask id="mask0_4638_38591" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="48" height="48">
                                    <path d="M48 0H0V48H48V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_4638_38591)">
                                    <path
                                        d="M34 26.8V32.8C34 40.8 30.8 44 22.8 44H15.2C7.2 44 4 40.8 4 32.8V25.2C4 17.2 7.2 14 15.2 14H21.2"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M33.9992 26.8H27.5992C22.7992 26.8 21.1992 25.2 21.1992 20.4V14L33.9992 26.8Z"
                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path d="M23.1992 4H31.1992" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14 10C14 6.68 16.68 4 20 4H25.24" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M43.9989 16V28.38C43.9989 31.48 41.4789 34 38.3789 34" stroke="white"
                                        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M44 16H38C33.5 16 32 14.5 32 10V4L44 16Z" stroke="white" stroke-width="1.5"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_4638_38591">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </div>

                    <div class="w-full pl-24 md:pl-28 py-4">
                        <h2 class="text-base font-bold">Motivation for Academic & Professional</h2>
                        <p class="text-sm">Test {{ index + 1 }} <span class="text-[8px] md:text-xs pl-2">{{
                            formatDate(item.created_at) }}</span></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Hasil Test yang Aktif -->
        <h2 class="text-[#0c141c] text-xl font-bold leading-7 pb-4 pt-8 md:pt-12">Detail Hasil Test</h2>
        <div class="space-y-4">
            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    Motivasi {{ mapData?.map?.name }}
                </h3>
                <p class="" v-html="extractMainDescription(mapData?.map?.description)"></p>
            </div>

            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    Saran Survival Konkret
                </h3>
                <p class="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                    v-html="extractSurvivalSuggestions(mapData?.map?.description)"></p>
            </div>

            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    Saran Hallopsy
                </h3>
                <p class="" v-html="extractHallopsyInfo(mapData?.map?.description)"></p>
            </div>

            <div class="w-full h-full rounded-4xl space-y-6 pt-6">
                <div class="space-y-3">
                    <div class="space-y-2">
                        <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(1)">
                            <p class="text-base text-black font-medium" :class="{ 'text-black': activeDropdown === 1 }">
                                Hambatan {{ mapData?.dimensi_ekstrinsik?.type || 'Level Burnout' }}
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                fill="none" :class="{ 'rotate-180': activeDropdown === 1 }"
                                class="transition-transform duration-300">
                                <path
                                    d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                    fill="black" />
                            </svg>
                        </div>

                        <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                            :class="activeDropdown === 1 ? 'opacity-100' : 'max-h-0 opacity-0'">
                            <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                v-html="mapData?.dimensi_ekstrinsik?.description">
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="space-y-2">
                        <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(2)">
                            <p class="text-base text-black font-medium" :class="{ 'text-black': activeDropdown === 2 }">
                                Hambatan {{ mapData?.dimensi_intrinsik?.type || 'Level Burnout' }}
                            </p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                fill="none" :class="{ 'rotate-180': activeDropdown === 2 }"
                                class="transition-transform duration-300">
                                <path
                                    d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                    fill="black" />
                            </svg>
                        </div>

                        <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                            :class="activeDropdown === 2 ? 'opacity-100' : 'max-h-0 opacity-0'">
                            <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                v-html="mapData?.dimensi_intrinsik?.description">
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <NewButton :text="downloading ? 'Mengunduh...' : 'Download PDF'" class="font-semibold w-fit px-10"
                text-size="text-sm" bg-color="bg-white" text-color="text-primary" border-color="border-primary"
                :disabled="downloading" @click="handleDownload(data?.[activeTestIndex]?.id)" />
        </div>
    </section>
</template>