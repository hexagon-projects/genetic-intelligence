<script setup lang="ts">
import Vector from '../../../../../../assets/icons/crs.webp'
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

const data = localStorage.getItem('crs_id')

const toggleDropdown = (index: number) => {
    activeDropdown.value = activeDropdown.value === index ? null : index;
};

const fetchCRSData = async () => {
    try {
        loading.value = true;
        const token = Cookies.get('token')
        const response = await initAPI(
            'GET',
            `customers/crs?customerCrsId=${data}`,
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
    if (!apiData.value || !apiData.value.crs?.id) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data CRS tidak tersedia untuk diunduh',
            confirmButtonColor: '#3b82f6',
        });
        return;
    }

    try {
        downloading.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/result-crs/${data}`,
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

    const survivalIndex = html.indexOf('Survival');
    if (survivalIndex !== -1) {
        return html.substring(0, survivalIndex);
    }

    return html;
};

const extractDropdownDescription = (html: string) => {
    if (!html) return 'Data tidak tersedia';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

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

const navigateToHome = () => {
    router.push('/')
    localStorage.removeItem('crs_id')
}

onMounted(() => {
    fetchCRSData();
});
</script>

<template>
    <div class="w-full bg-[#F8FBFE] font-sora">
        <div
            class="min-h-screen p-4 flex flex-col justify-between gap-6 md:max-w-[50%] lg:max-w-[30%] xl:max-w-[30%] mx-auto relative">
            <div class="w-full text-center flex justify-center items-center gap-2">
                <div class="py-1 px-3 rounded-md bg-primary/20">
                    <p class="text-sm">Hasil</p>
                </div>
                <h1 class="text-sm font-bold">Jatidiri Tangguh - CRS</h1>
            </div>

            <section class="space-y-6">
                <div v-if="loading" class="text-center py-10">
                    <p>Memuat data...</p>
                </div>

                <div v-else-if="apiData" class="space-y-6">
                    <Transition name="fade-slide" mode="out-in">
                        <div class="w-full max-w-[80%] h-[40vh] md:h-[30vh] mx-auto">
                            <img :src="Vector" alt="Ilustrasi CRS" class="w-full h-[40vh] md:h-[30vh] object-contain">
                        </div>
                    </Transition>

                    <div class="w-full space-y-6">
                        <Transition name="fade-slide" mode="out-in">
                            <div class="space-y-2 text-center">
                                <h6 class="text-xl font-bold">{{ apiData.crs?.name || 'Data tidak tersedia' }}</h6>

                                <p class="text-base text-center [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                    v-html="extractMainDescription(apiData.crs?.description)"></p>

                                <p class="text-base text-center">
                                    <b>Survival:</b> {{ extractSurvivalSuggestions(apiData.crs?.description) }}
                                </p>


                                <p class="text-base text-center "
                                    v-html="`<b>HalloPsy:</b> ${extractHallopsyInfo(apiData.crs?.description)}`"></p>
                            </div>
                        </Transition>

                        <div class="w-full grid grid-cols-3 gap-2">
                            <div class="space-y-2 p-3 rounded-2xl bg-[#C2C2FD]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                    fill="none">
                                    <path
                                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                        stroke="#0B0BF7" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M7 8C7.21 8.583 7.775 9 8.44 9C9.105 9 9.669 8.583 9.878 8M14.122 8C14.332 8.583 14.896 9 15.561 9C16.225 9 16.791 8.583 17 8M12 13.5C13.673 13.5 15.11 14.456 15.73 15.82C15.98 16.372 16.105 16.648 15.889 16.875C15.672 17.102 15.291 16.991 14.527 16.77C13.804 16.56 12.902 16.37 12 16.37C11.098 16.37 10.196 16.56 9.473 16.77C8.709 16.991 8.328 17.102 8.111 16.875C7.895 16.648 8.02 16.372 8.271 15.82C8.891 14.456 10.327 13.5 12 13.5Z"
                                        stroke="#0B0BF7" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                                <div class="">
                                    <h4 class="text-2xl md:text-2xl font-bold">{{ apiData.emosional?.percent || '0' }}
                                    </h4>
                                    <p class="text-[10px] md:text-sm font-normal text-[#606060]">Emosional</p>
                                </div>
                            </div>
                            <div class="space-y-2 p-3 rounded-2xl bg-[#C7EFDA]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                    fill="none">
                                    <g clip-path="url(#clip0_4609_24918)">
                                        <mask id="mask0_4609_24918" style="mask-type:luminance"
                                            maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
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
                                    <h4 class="text-2xl md:text-2xl font-bold">{{ apiData.kognitif?.percent ||
                                        '0' }}</h4>
                                    <p class="text-[10px] md:text-sm font-normal text-[#606060]">Kognitif</p>
                                </div>
                            </div>
                            <div class="space-y-2 p-3 rounded-2xl bg-[#F7ECBF]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                    fill="none">
                                    <g clip-path="url(#clip0_4609_24931)">
                                        <path
                                            d="M12.7426 0.96582H9.70956M11.2266 0.96582V3.56582M5.40456 2.74882L4.33156 3.82182M4.33156 3.82182L3.25956 4.89382M4.33156 3.82182L6.17056 5.65982M1.47656 9.19982V12.2328M1.47656 10.7158H4.07656M3.25956 16.5378L4.33156 17.6108M4.33156 17.6108L5.40456 18.6828M4.33156 17.6108L6.17056 15.7718M19.1926 4.89382L18.1206 3.82182M18.1206 3.82182L17.0476 2.74882M18.1206 3.82182L16.2816 5.65982M9.70956 10.0668C10.1119 10.0668 10.4978 9.90699 10.7822 9.6225C11.0667 9.33801 11.2266 8.95215 11.2266 8.54982C11.2266 8.14749 11.0667 7.76163 10.7822 7.47714C10.4978 7.19265 10.1119 7.03282 9.70956 7.03282C9.30723 7.03282 8.92137 7.19265 8.63688 7.47714C8.35239 7.76163 8.19256 8.14749 8.19256 8.54982C8.19256 8.95215 8.35239 9.33801 8.63688 9.6225C8.92137 9.90699 9.30723 10.0668 9.70956 10.0668Z"
                                            stroke="#DFB400" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path
                                            d="M18.0841 8.68307C17.7324 7.4949 17.0779 6.41853 16.1849 5.55951C15.2918 4.70048 14.1909 4.08829 12.9899 3.78296C11.789 3.47763 10.5294 3.48964 9.33447 3.81782C8.13959 4.146 7.05051 4.77908 6.17402 5.65498C5.29753 6.53088 4.66371 7.61953 4.33473 8.81419C4.00574 10.0089 3.99288 11.2685 4.2974 12.4696C4.60192 13.6708 5.21337 14.7721 6.07179 15.6657C6.93021 16.5594 8.00613 17.2146 9.19406 17.5671M12.1941 23.0341H20.6521C21.3237 23.0365 21.9688 22.772 22.4455 22.2989C22.9221 21.8258 23.1914 21.1827 23.1941 20.5111V13.9051C23.2039 13.3676 23.0158 12.8452 22.6654 12.4375C22.315 12.0298 21.8269 11.7652 21.2941 11.6941C20.8046 11.6433 20.3129 11.766 19.9047 12.0408C19.4965 12.3155 19.1978 12.7249 19.0606 13.1975C18.9235 13.6701 18.9566 14.1758 19.1542 14.6264C19.3519 15.077 19.7015 15.4439 20.1421 15.6631C19.5775 17.0851 19.5775 18.6691 20.1421 20.0911C19.81 19.451 19.3344 18.8963 18.7524 18.4706C18.1703 18.0449 17.4977 17.7597 16.7871 17.6371C16.0764 17.5146 15.3471 17.5582 14.6561 17.7645C13.9651 17.9707 13.3313 18.3341 12.8041 18.8261"
                                            stroke="#DFB400" stroke-width="1.5" stroke-linecap="round"
                                            stroke-linejoin="round" />
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
                                    <h4 class="text-2xl md:text-2xl font-bold">{{ apiData.sosial_Komunikasi?.percent ||
                                        '0' }}
                                    </h4>
                                    <p class="text-[10px] md:text-sm font-normal text-[#606060]">Sosial-Komunikasi</p>
                                </div>
                            </div>
                        </div>

                        <div class="space-y-3">
                            <div class="space-y-2">
                                <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(0)">
                                    <p class="text-base text-black font-medium"
                                        :class="{ 'text-black': activeDropdown === 0 }">
                                        {{ apiData.dimensi_emosional?.type || '' }}
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"
                                        fill="none" :class="{ 'rotate-180': activeDropdown === 0 }"
                                        class="transition-transform duration-300">
                                        <path
                                            d="M10.2652 4.76517C10.4116 4.61872 10.4116 4.38128 10.2652 4.23484C10.1187 4.08839 9.88128 4.08839 9.73484 4.23483L7.14904 6.82062C6.51444 7.45522 5.48555 7.45522 4.85095 6.82062L2.26517 4.23484C2.11872 4.08839 1.88128 4.08839 1.73484 4.23483C1.58839 4.38128 1.58839 4.61872 1.73484 4.76516L4.32062 7.35095C5.24811 8.27845 6.75188 8.27845 7.67937 7.35095L10.2652 4.76517Z"
                                            fill="black" />
                                    </svg>
                                </div>

                                <div class="border-l border-primary p-2 transition-all duration-300 overflow-hidden"
                                    :class="activeDropdown === 0 ? 'opacity-100' : 'max-h-0 opacity-0'">
                                    <p class="text-base font-medium [&_h3]:font-bold [&_h3]:pt-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:my-4 [&_li]:my-2"
                                        v-html="extractDropdownDescription(apiData.dimensi_emosional?.description)">
                                    </p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(1)">
                                    <p class="text-base text-black font-medium"
                                        :class="{ 'text-black': activeDropdown === 1 }">
                                        {{ apiData.dimensi_kognitif?.type || '' }}
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
                                        v-html="extractDropdownDescription(apiData.dimensi_kognitif?.description)">
                                    </p>
                                </div>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-4 cursor-pointer" @click="toggleDropdown(2)">
                                    <p class="text-base text-black font-medium"
                                        :class="{ 'text-black': activeDropdown === 2 }">
                                        {{ apiData.dimensi_sosial_komunikasi?.type || '' }}
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
                                        v-html="extractDropdownDescription(apiData.dimensi_sosial_komunikasi?.description)">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-10">
                    <p>Data tidak tersedia</p>
                </div>
            </section>

            <div class="flex items-center gap-2">
                <NewButton v-if="apiData" 
                    @click="navigateToHome" 
                    :text="(downloading ? 'Mengunduh...' : 'Selesai')"
                    class="w-[86%] font-semibold" text-size="text-sm" />
                <Transition name="fade">
                    <div @click="handleDownload" :disabled="downloading || !apiData"
                        class="w-[16%] xl:w-[12%] rounded-full bg-primary text-white border-[#8383FB] text-xl py-3 border-4 cursor-pointer flex justify-center items-center text-center font-sora shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32" fill="none">
                            <path
                                d="M12 23.666C11.8667 23.666 11.7467 23.6393 11.6133 23.586C11.24 23.4393 11 23.066 11 22.666V14.666C11 14.1193 11.4533 13.666 12 13.666C12.5467 13.666 13 14.1193 13 14.666V20.2527L13.96 19.2927C14.3467 18.906 14.9867 18.906 15.3733 19.2927C15.76 19.6793 15.76 20.3193 15.3733 20.706L12.7067 23.3727C12.52 23.5593 12.2533 23.666 12 23.666Z"
                                fill="white" />
                            <path
                                d="M11.9993 23.6672C11.7459 23.6672 11.4926 23.5739 11.2926 23.3739L8.62594 20.7072C8.23927 20.3206 8.23927 19.6806 8.62594 19.2939C9.0126 18.9072 9.6526 18.9072 10.0393 19.2939L12.7059 21.9606C13.0926 22.3472 13.0926 22.9872 12.7059 23.3739C12.5059 23.5739 12.2526 23.6672 11.9993 23.6672Z"
                                fill="white" />
                            <path
                                d="M20.0013 30.3327H12.0013C4.7613 30.3327 1.66797 27.2393 1.66797 19.9993V11.9993C1.66797 4.75935 4.7613 1.66602 12.0013 1.66602H18.668C19.2146 1.66602 19.668 2.11935 19.668 2.66602C19.668 3.21268 19.2146 3.66602 18.668 3.66602H12.0013C5.85464 3.66602 3.66797 5.85268 3.66797 11.9993V19.9993C3.66797 26.146 5.85464 28.3327 12.0013 28.3327H20.0013C26.148 28.3327 28.3346 26.146 28.3346 19.9993V13.3327C28.3346 12.786 28.788 12.3327 29.3346 12.3327C29.8813 12.3327 30.3346 12.786 30.3346 13.3327V19.9993C30.3346 27.2393 27.2413 30.3327 20.0013 30.3327Z"
                                fill="white" />
                            <path
                                d="M29.3346 14.3327H24.0013C19.4413 14.3327 17.668 12.5593 17.668 7.99933V2.666C17.668 2.266 17.908 1.89267 18.2813 1.746C18.6546 1.586 19.0813 1.67933 19.3746 1.95933L30.0413 12.626C30.3213 12.906 30.4146 13.346 30.2546 13.7193C30.0946 14.0927 29.7346 14.3327 29.3346 14.3327ZM19.668 5.07933V7.99933C19.668 11.4393 20.5613 12.3327 24.0013 12.3327H26.9213L19.668 5.07933Z"
                                fill="white" />
                        </svg>
                    </div>
                </Transition>
            </div>
            <!-- <div class="flex flex-col gap-2">
                <Transition name="fade">
                    <NewButton :text="downloading ? 'Mengunduh...' : 'Download PDF'" class="font-semibold"
                        text-size="text-sm" bg-color="bg-white" text-color="text-primary" border-color="border-primary"
                        :disabled="downloading || !apiData" @click="handleDownload" />
                </Transition>
                <div class="flex items-center gap-2">
                    <NewButton v-if="apiData" @click="navigateToHome()" :text="'Selesai'" class="w-[86%] font-semibold"
                        text-size="text-sm" />
                </div>
            </div> -->
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