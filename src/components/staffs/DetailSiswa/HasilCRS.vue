<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Cookies from "js-cookie";
import initAPI from '../../../api/api'
import NewButton from '../../customer/NewButton.vue';
import Swal from 'sweetalert2';

const props = defineProps<{
    data: []
}>()

const crsData = ref(null);
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

    const survivalIndex = html.indexOf('Survival');
    if (survivalIndex !== -1) {
        return html.substring(0, survivalIndex);
    }

    return html;
};

const extractSurvivalSuggestions = (html: string) => {
    if (!html) return 'Data tidak tersedia';

    const survivalIndex = html.indexOf('Survival:');
    if (survivalIndex === -1) return 'Data tidak tersedia';

    const hallopsyIndex = html.indexOf('HalloPsy:');
    const startIndex = survivalIndex + 'Survival:'.length;
    const raw = hallopsyIndex !== -1
        ? html.substring(startIndex, hallopsyIndex)
        : html.substring(startIndex);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = raw;

    const items = Array.from(tempDiv.querySelectorAll('li')).map(li =>
        li.textContent?.trim() || ''
    );

    return items.length > 0 ? items.join(' ') : raw.trim();
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
    getCRSTangguh(props.data[index]?.id);
};

const handleDownload = async (id) => {
    if (props.id) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data CRS tidak tersedia untuk diunduh',
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
            `https://api.jatidiri.app/api/result-crs/${id}`,
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
        a.download = `hasil-crs.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil CRS berhasil diunduh',
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

const getCRSTangguh = async (id) => {
    try {
        const token = Cookies.get("token");
        const response = await initAPI(
            "get",
            `customers/crs?customerCrsId=${id}`,
            null,
            token
        );

        console.log(response.data.data)
        crsData.value = response.data.data;
    } catch (error) {
        crsData.value = null
    }
};

onMounted(() => {
    if (props.data && props.data.length > 0) {
        getCRSTangguh(props.data[0]?.id);
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
                        <h2 class="text-base font-bold">Burnout & Resilience Index</h2>
                        <p class="text-sm">Test {{ index + 1 }} <span class="text-[8px] md:text-xs pl-2">{{
                            formatDate(item.crs.created_at) }}</span></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Detail Hasil Test yang Aktif -->
        <h2 class="text-[#0c141c] text-xl font-bold leading-7 pb-4 pt-8 md:pt-12">Detail Hasil Test</h2>
        <div class="space-y-6">
            <div class="w-full grid grid-cols-3 gap-4">
                <div class="space-y-2 p-3 rounded-2xl bg-[#C2C2FD]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                            stroke="#0B0BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path
                            d="M7 8C7.21 8.583 7.775 9 8.44 9C9.105 9 9.669 8.583 9.878 8M14.122 8C14.332 8.583 14.896 9 15.561 9C16.225 9 16.791 8.583 17 8M12 13.5C13.673 13.5 15.11 14.456 15.73 15.82C15.98 16.372 16.105 16.648 15.889 16.875C15.672 17.102 15.291 16.991 14.527 16.77C13.804 16.56 12.902 16.37 12 16.37C11.098 16.37 10.196 16.56 9.473 16.77C8.709 16.991 8.328 17.102 8.111 16.875C7.895 16.648 8.02 16.372 8.271 15.82C8.891 14.456 10.327 13.5 12 13.5Z"
                            stroke="#0B0BF7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div class="">
                        <h4 class="text-2xl md:text-2xl font-bold">{{ crsData?.emosional?.percent || '0' }}
                        </h4>
                        <p class="text-[10px] md:text-sm font-normal text-[#606060]">Emosional</p>
                    </div>
                </div>
                <div class="space-y-2 p-3 rounded-2xl bg-[#C7EFDA]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <g clip-path="url(#clip0_4609_24918)">
                            <mask id="mask0_4609_24918" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="25" height="24">
                                <path d="M24.668 0H0.667969V24H24.668V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_4609_24918)">
                                <path
                                    d="M20.4162 16.7696L19.3362 17.0196C18.5662 17.1996 17.9563 17.7996 17.7763 18.5696L17.5263 19.6496C17.5063 19.7596 17.3362 19.7596 17.3062 19.6496L17.0562 18.5696C16.8762 17.7996 16.2762 17.1896 15.5062 17.0096L14.4262 16.7596C14.3162 16.7396 14.3162 16.5696 14.4262 16.5396L15.5062 16.2896C16.2762 16.1096 16.8862 15.5096 17.0662 14.7396L17.3162 13.6596C17.3362 13.5496 17.5063 13.5496 17.5363 13.6596L17.7863 14.7396C17.9663 15.5096 18.5662 16.1196 19.3362 16.2996L20.4162 16.5496C20.5262 16.5696 20.5262 16.7396 20.4162 16.7696Z"
                                    stroke="#1FC16B" stroke-width="1.5" stroke-miterlimit="10" />
                                <path
                                    d="M12.668 2C15.428 2 17.668 4.24 17.668 7C17.668 9.76 15.428 12 12.668 12C9.90797 12 7.66797 9.76 7.66797 7"
                                    stroke="#1FC16B" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path d="M12.6682 15C7.92812 15 4.07812 18.13 4.07812 22" stroke="#1FC16B"
                                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M21.2563 21.9997C21.2563 21.0897 21.0462 20.2297 20.6562 19.4297"
                                    stroke="#1FC16B" stroke-width="1.5" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_4609_24918">
                                <rect width="24" height="24" fill="white" transform="translate(0.667969)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="">
                        <h4 class="text-2xl md:text-2xl font-bold">{{ crsData?.kognitif?.percent ||
                            '0' }}</h4>
                        <p class="text-[10px] md:text-sm font-normal text-[#606060]">Kognitif</p>
                    </div>
                </div>
                <div class="space-y-2 p-3 rounded-2xl bg-[#F7ECBF]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <g clip-path="url(#clip0_4609_24931)">
                            <path
                                d="M12.7426 0.96582H9.70956M11.2266 0.96582V3.56582M5.40456 2.74882L4.33156 3.82182M4.33156 3.82182L3.25956 4.89382M4.33156 3.82182L6.17056 5.65982M1.47656 9.19982V12.2328M1.47656 10.7158H4.07656M3.25956 16.5378L4.33156 17.6108M4.33156 17.6108L5.40456 18.6828M4.33156 17.6108L6.17056 15.7718M19.1926 4.89382L18.1206 3.82182M18.1206 3.82182L17.0476 2.74882M18.1206 3.82182L16.2816 5.65982M9.70956 10.0668C10.1119 10.0668 10.4978 9.90699 10.7822 9.6225C11.0667 9.33801 11.2266 8.95215 11.2266 8.54982C11.2266 8.14749 11.0667 7.76163 10.7822 7.47714C10.4978 7.19265 10.1119 7.03282 9.70956 7.03282C9.30723 7.03282 8.92137 7.19265 8.63688 7.47714C8.35239 7.76163 8.19256 8.14749 8.19256 8.54982C8.19256 8.95215 8.35239 9.33801 8.63688 9.6225C8.92137 9.90699 9.30723 10.0668 9.70956 10.0668Z"
                                stroke="#DFB400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M18.0841 8.68307C17.7324 7.4949 17.0779 6.41853 16.1849 5.55951C15.2918 4.70048 14.1909 4.08829 12.9899 3.78296C11.789 3.47763 10.5294 3.48964 9.33447 3.81782C8.13959 4.146 7.05051 4.77908 6.17402 5.65498C5.29753 6.53088 4.66371 7.61953 4.33473 8.81419C4.00574 10.0089 3.99288 11.2685 4.2974 12.4696C4.60192 13.6708 5.21337 14.7721 6.07179 15.6657C6.93021 16.5594 8.00613 17.2146 9.19406 17.5671M12.1941 23.0341H20.6521C21.3237 23.0365 21.9688 22.772 22.4455 22.2989C22.9221 21.8258 23.1914 21.1827 23.1941 20.5111V13.9051C23.2039 13.3676 23.0158 12.8452 22.6654 12.4375C22.315 12.0298 21.8269 11.7652 21.2941 11.6941C20.8046 11.6433 20.3129 11.766 19.9047 12.0408C19.4965 12.3155 19.1978 12.7249 19.0606 13.1975C18.9235 13.6701 18.9566 14.1758 19.1542 14.6264C19.3519 15.077 19.7015 15.4439 20.1421 15.6631C19.5775 17.0851 19.5775 18.6691 20.1421 20.0911C19.81 19.451 19.3344 18.8963 18.7524 18.4706C18.1703 18.0449 17.4977 17.7597 16.7871 17.6371C16.0764 17.5146 15.3471 17.5582 14.6561 17.7645C13.9651 17.9707 13.3313 18.3341 12.8041 18.8261"
                                stroke="#DFB400" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path
                                d="M11.9688 13.625C11.8693 13.625 11.7739 13.5855 11.7036 13.5152C11.6333 13.4448 11.5938 13.3495 11.5938 13.25C11.5938 13.1505 11.6333 13.0552 11.7036 12.9848C11.7739 12.9145 11.8693 12.875 11.9688 12.875M11.9688 13.625C12.0682 13.625 12.1636 13.5855 12.2339 13.5152C12.3042 13.4448 12.3438 13.3495 12.3438 13.25C12.3438 13.1505 12.3042 13.0552 12.2339 12.9848C12.1636 12.9145 12.0682 12.875 11.9688 12.875"
                                stroke="#DFB400" stroke-width="1.5" />
                        </g>
                        <defs>
                            <clipPath id="clip0_4609_24931">
                                <rect width="24" height="24" fill="white" transform="translate(0.332031)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div class="">
                        <h4 class="text-2xl md:text-2xl font-bold">{{ crsData?.sosial_Komunikasi?.percent || '0' }}
                        </h4>
                        <p class="text-[10px] md:text-sm font-normal text-[#606060]">Sosial Komunikasi</p>
                    </div>
                </div>
            </div>


            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    {{ crsData?.crs?.name }}
                </h3>
                <p class="" v-html="extractMainDescription(crsData?.crs?.description)"></p>
            </div>

            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    Saran Survival Konkret
                </h3>
                <p class="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                    v-html="extractSurvivalSuggestions(crsData?.crs?.description)"></p>
            </div>

            <div class="space-y-2">
                <h3 class="text-[#111416] text-lg font-bold text-center">
                    Saran Hallopsy
                </h3>
                <p class="" v-html="extractHallopsyInfo(crsData?.crs?.description)"></p>
            </div>

            <div class="w-full h-full rounded-4xl space-y-6 pt-6">
                <div class="space-y-3">
                    <div class="space-y-2">
                        <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(1)">
                            <p class="text-base text-black font-medium" :class="{ 'text-black': activeDropdown === 1 }">
                                {{ crsData?.dimensi_emosional?.type || 'Level Burnout' }}
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
                                v-html="crsData?.dimensi_emosional?.description">
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="space-y-2">
                        <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(2)">
                            <p class="text-base text-black font-medium" :class="{ 'text-black': activeDropdown === 2 }">
                                {{ crsData?.dimensi_kognitif?.type || 'Level Burnout' }}
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
                                v-html="crsData?.dimensi_kognitif?.description">
                            </p>
                        </div>
                    </div>
                </div>

                <div class="space-y-3">
                    <div class="space-y-2">
                        <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(3)">
                            <p class="text-base text-black font-medium" :class="{ 'text-black': activeDropdown === 3 }">
                                {{ crsData?.dimensi_sosial_komunikasi?.type || 'Level Burnout' }}
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
                            :class="activeDropdown === 3 ? 'opacity-100' : 'max-h-0 opacity-0'">
                            <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                v-html="crsData?.dimensi_sosial_komunikasi?.description">
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