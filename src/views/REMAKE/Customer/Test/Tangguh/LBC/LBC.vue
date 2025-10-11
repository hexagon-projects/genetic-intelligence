<script setup lang="ts">
import Vector from '../../../../../../assets/icons/hero-test.png'
import { useRouter } from 'vue-router';
import NewButton from '../../../../../../components/customer/NewButton.vue';
import { onMounted, ref } from 'vue';
import Cookies from 'js-cookie'
import initAPI from '../../../../../../api/api';

const router = useRouter();
const hasTestResult = ref(false);
const testHistory = ref<any[]>([]);
const canTakeTest = ref(true);
const daysUntilNextTest = ref(0);

const checkTestEligibility = (history: any[]) => {
    if (history.length === 0) {
        canTakeTest.value = true;
        daysUntilNextTest.value = 0;
        return;
    }

    if (history.length >= 3) {
        canTakeTest.value = false;
        daysUntilNextTest.value = 0;
        return;
    }

    const latestTest = history[0];
    const lastTestDate = new Date(latestTest.created_at);
    const oneMonthLater = new Date(lastTestDate);
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const today = new Date();

    if (today < oneMonthLater) {
        canTakeTest.value = false;
        const diffTime = oneMonthLater.getTime() - today.getTime();
        daysUntilNextTest.value = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
        canTakeTest.value = true;
        daysUntilNextTest.value = 0;
    }
};

const checkTestResult = async () => {
    try {
        const token = Cookies.get('token')
        const userData = JSON.parse(localStorage.getItem('userData') || '{}')

        if (!token || !userData.id) {
            router.push('/login')
            return false;
        }

        const response = await initAPI(
            'GET',
            `customers/lbc`,
            null,
            token
        );
        
        if (response.data && response.data.data && response.data.data.length > 0) {
            hasTestResult.value = true;
            testHistory.value = response.data.data;

            testHistory.value.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            checkTestEligibility(testHistory.value);
        } else {
            hasTestResult.value = false;
            testHistory.value = [];
            canTakeTest.value = true;
        }
    } catch (error) {
        hasTestResult.value = false;
        testHistory.value = [];
        canTakeTest.value = true;
    }
}

const navigateToTest = () => {
    if (canTakeTest.value) {
        router.push('/tangguh/lbc/test');
    }
};

const navigateToResult = () => {
    if (testHistory.value.length > 0) {
        const latestResult = testHistory.value[0];
        localStorage.setItem('lbc_id', latestResult.id)
        router.push(`/tangguh/lbc/hasil`);
    } else {
        router.push('/tangguh/lbc/hasil');
    }
};

const viewTestResult = (result: any) => {
    // localStorage.setItem('selectedTestResult', JSON.stringify(result));
    localStorage.setItem('lbc_id', result.id)
    router.push(`/tangguh/lbc/hasil`);
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};

onMounted(() => {
    checkTestResult();
})
</script>

<template>
    <div class="w-full bg-[#F8FBFE] font-sora">
        <div class="w-full min-h-screen p-4 space-y-6 md:max-w-[50%] lg:max-w-[30%] xl:max-w-[25%] mx-auto relative">
            <div v-if="hasTestResult" class="min-h-screen flex flex-col justify-center items-center">
                <div class="text-center mb-8">
                    <h1 class="text-xl font-bold text-[#6464FA] mb-4">Hasil Tes Jatidiri Tangguh - LBC</h1>
                    <p class="text-sm text-gray-600" v-if="testHistory.length > 0">
                        Kamu telah menyelesaikan {{ testHistory.length }} dari 3 tes yang tersedia.
                    </p>
                </div>

                <div class="w-full md:max-w-lg">
                    <div class="mb-6 p-4 bg-white rounded-2xl shadow-sm">
                        <div class="flex justify-between items-center mb-2">
                            <span class="text-sm font-medium">Status Tes:</span>
                            <span :class="[
                                'text-xs font-semibold px-2 py-1 rounded-full',
                                canTakeTest ? 'bg-green-100 text-green-800' :
                                    testHistory.length >= 3 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                            ]">
                                {{ canTakeTest ? 'Bisa Tes Lagi' :
                                    testHistory.length >= 3 ? 'Sudah 3 Tes' : `Tunggu ${daysUntilNextTest} hari`
                                }}
                            </span>
                        </div>
                        <div class="text-xs text-gray-600">
                            <span v-if="testHistory.length < 3">
                                Sisa tes: {{ 3 - testHistory.length }} kali
                            </span>
                            <span v-else>
                                Sudah mencapai batas 3 tes
                            </span>
                        </div>
                    </div>

                    <div class="mb-6">
                        <h3 class="text-sm font-semibold mb-3">Riwayat Tes:</h3>
                        <div class="space-y-6">
                            <div v-for="(result, index) in testHistory" :key="result.lbc.id" class="w-full h-20 md:h-24"
                                @click="viewTestResult(result)">
                                <div class="w-full h-full flex items-center relative">
                                    <div
                                        class="absolute w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-primary flex justify-center items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"
                                            viewBox="0 0 48 48" fill="none">
                                            <g clip-path="url(#clip0_4638_38591)">
                                                <mask id="mask0_4638_38591" style="mask-type:luminance"
                                                    maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
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
                                                    <path d="M14 10C14 6.68 16.68 4 20 4H25.24" stroke="white"
                                                        stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M43.9989 16V28.38C43.9989 31.48 41.4789 34 38.3789 34"
                                                        stroke="white" stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                    <path d="M44 16H38C33.5 16 32 14.5 32 10V4L44 16Z" stroke="white"
                                                        stroke-width="1.5" stroke-linecap="round"
                                                        stroke-linejoin="round" />
                                                </g>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_4638_38591">
                                                    <rect width="48" height="48" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </div>

                                    <div class="w-full bg-white shadow-sm pl-24 md:pl-28 py-4">
                                        <h2 class="text-base font-bold">Learning Barriers Check</h2>
                                        <p class="text-sm">Test {{ testHistory.length - index }} <span class="text-[8px] md:text-xs pl-2">{{ formatDate(result.created_at) }}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="space-y-3">
                        <NewButton @click="navigateToTest"
                            :text="canTakeTest ? 'Ambil Tes Baru' :
                                testHistory.length >= 3 ? 'Sudah Maksimal 3 Tes' : `Tes Lagi dalam ${daysUntilNextTest} hari`"
                            class="w-full font-semibold" text-size="text-sm" :disabled="!canTakeTest"
                            :class="{ 'opacity-50 cursor-not-allowed': !canTakeTest }" />

                        <NewButton @click="navigateToResult" text="Lihat Hasil Terbaru" class="w-full font-semibold"
                            text-size="text-sm" variant="outline" />
                    </div>

                    <p class="text-xs text-center text-gray-500 mt-4">
                        {{ canTakeTest ?
                            'Kamu bisa mengambil tes baru sekarang' :
                            testHistory.length >= 3 ?
                                'Kamu sudah mencapai batas maksimal 3 tes' :
                                `Kamu bisa tes lagi setelah ${daysUntilNextTest} hari`
                        }}
                    </p>
                </div>
            </div>

            <div v-else>
                <div class="w-full text-center pb-6">
                    <h1 class="text-sm font-bold">Siap Menjawab? Ini Petunjuknya</h1>
                </div>
                <div class="space-y-4">
                    <div class="p-4 border-2 border-black/10 rounded-2xl flex gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="none">
                                <g clip-path="url(#clip0_4362_18751)">
                                    <mask id="mask0_4362_18751" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="25" height="24">
                                        <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_4362_18751)">
                                        <path
                                            d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z"
                                            fill="#6464FA" />
                                        <path
                                            d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z"
                                            fill="#6464FA" />
                                    </g>
                                </g>
                                <defs>
                                    <clipPath id="clip0_4362_18751">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p class="text-sm">Bukan Saya Banget</p>
                    </div>
                    <div class="p-4 border-2 border-black/10 rounded-2xl flex gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="none">
                                <g clip-path="url(#clip0_4362_18759)">
                                    <mask id="mask0_4362_18759" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="25" height="24">
                                        <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_4362_18759)">
                                        <path
                                            d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z"
                                            fill="#6464FA" />
                                        <path
                                            d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z"
                                            fill="#6464FA" />
                                    </g>
                                    <path
                                        d="M7.99949 7.99902C0.5 3.99936 3.97 12.9498 3 13.9998H12.5014L12.4995 3.99936C11.2395 3.68936 9.66949 7.99902 7.99949 7.99902Z"
                                        fill="#6464FA" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4362_18759">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p class="text-sm">Bukan Saya</p>
                    </div>
                    <div class="p-4 border-2 border-black/10 rounded-2xl flex gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="none">
                                <g clip-path="url(#clip0_4362_18768)">
                                    <mask id="mask0_4362_18768" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="25" height="24">
                                        <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_4362_18768)">
                                        <path
                                            d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z"
                                            fill="#6464FA" />
                                        <path
                                            d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z"
                                            fill="#6464FA" />
                                    </g>
                                    <path
                                        d="M7.99805 7.99902C0 2.49902 3.96869 18.449 2.99869 19.499L5.99869 19.999L7.99869 18.999L12.498 20.999V3.99936C11.238 3.68936 9.66805 7.99902 7.99805 7.99902Z"
                                        fill="#6464FA" />
                                    <rect x="8" y="6" width="1" height="15" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4362_18768">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p class="text-sm">Kadang - Kadang Saya Lakukan atau Netral</p>
                    </div>
                    <div class="p-4 border-2 border-black/10 rounded-2xl flex gap-4 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                fill="none">
                                <g clip-path="url(#clip0_4362_18778)">
                                    <mask id="mask0_4362_18778" style="mask-type:luminance" maskUnits="userSpaceOnUse"
                                        x="0" y="0" width="25" height="24">
                                        <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_4362_18778)">
                                        <path
                                            d="M16.7794 22.1005H12.9794C12.4194 22.1005 11.1994 21.9305 10.5494 21.2805L7.51938 18.9405L8.43938 17.7505L11.5394 20.1505C11.7894 20.3905 12.4194 20.5905 12.9794 20.5905H16.7794C17.6794 20.5905 18.6494 19.8705 18.8494 19.0605L21.2694 11.7105C21.4294 11.2705 21.3994 10.8705 21.1894 10.5805C20.9694 10.2705 20.5694 10.0905 20.0794 10.0905H16.0794C15.5594 10.0905 15.0794 9.87048 14.7494 9.49048C14.4094 9.10048 14.2594 8.58048 14.3394 8.04048L14.8394 4.83048C14.9594 4.27048 14.5794 3.64048 14.0394 3.46048C13.5494 3.28048 12.9194 3.54048 12.6994 3.86048L8.59938 9.96048L7.35938 9.13048L11.4594 3.03048C12.0894 2.09048 13.4694 1.64048 14.5494 2.05048C15.7994 2.46048 16.5994 3.84048 16.3194 5.12048L15.8294 8.27048C15.8194 8.34048 15.8194 8.44048 15.8894 8.52048C15.9394 8.57048 16.0094 8.60048 16.0894 8.60048H20.0894C21.0694 8.60048 21.9194 9.01048 22.4194 9.72048C22.9094 10.4105 23.0094 11.3205 22.6894 12.2005L20.2994 19.4805C19.9294 20.9305 18.3894 22.1005 16.7794 22.1005Z"
                                            fill="#6464FA" />
                                        <path
                                            d="M5.87891 21.0004H4.87891C3.02891 21.0004 2.12891 20.1304 2.12891 18.3504V8.55039C2.12891 6.77039 3.02891 5.90039 4.87891 5.90039H5.87891C7.72891 5.90039 8.62891 6.77039 8.62891 8.55039V18.3504C8.62891 20.1304 7.72891 21.0004 5.87891 21.0004ZM4.87891 7.40039C3.78891 7.40039 3.62891 7.66039 3.62891 8.55039V18.3504C3.62891 19.2404 3.78891 19.5004 4.87891 19.5004H5.87891C6.96891 19.5004 7.12891 19.2404 7.12891 18.3504V8.55039C7.12891 7.66039 6.96891 7.40039 5.87891 7.40039H4.87891Z"
                                            fill="#6464FA" />
                                    </g>
                                    <path
                                        d="M7.99799 7.99902C-5.67436e-05 2.49902 3.96863 18.449 2.99863 19.499L5.99863 19.999L7.99863 18.999L13 20.999L18.5 20.499L21.5 13.999H12.498V3.99936C11.238 3.68936 9.66799 7.99902 7.99799 7.99902Z"
                                        fill="#6464FA" />
                                    <rect x="7.75" y="6" width="1" height="15" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_4362_18778">
                                        <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>
                        <p class="text-sm">Saya Seperti Ini</p>
                    </div>
                    <div class="p-4 border-2 border-black/10 rounded-2xl flex gap-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                            <g clip-path="url(#clip0_4362_18788)">
                                <mask id="mask0_4362_18788" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="25" height="24">
                                    <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_4362_18788)">
                                    <path
                                        d="M8.89062 18.4907V8.33071C8.89062 7.93071 9.01063 7.54071 9.23063 7.21071L11.9606 3.15071C12.3906 2.50071 13.4606 2.04071 14.3706 2.38071C15.3506 2.71071 16.0006 3.81071 15.7906 4.79071L15.2706 8.06071C15.2306 8.36071 15.3106 8.63071 15.4806 8.84071C15.6506 9.03071 15.9006 9.15071 16.1706 9.15071H20.2806C21.0706 9.15071 21.7506 9.47071 22.1506 10.0307C22.5306 10.5707 22.6006 11.2707 22.3506 11.9807L19.8906 19.4707C19.5806 20.7107 18.2306 21.7207 16.8906 21.7207H12.9906C12.3206 21.7207 11.3806 21.4907 10.9506 21.0607L9.67063 20.0707C9.18063 19.7007 8.89062 19.1107 8.89062 18.4907Z"
                                        fill="#6464FA" />
                                    <path
                                        d="M5.71 6.38086H4.68C3.13 6.38086 2.5 6.98086 2.5 8.46086V18.5209C2.5 20.0009 3.13 20.6009 4.68 20.6009H5.71C7.26 20.6009 7.89 20.0009 7.89 18.5209V8.46086C7.89 6.98086 7.26 6.38086 5.71 6.38086Z"
                                        fill="#6464FA" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_4362_18788">
                                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                </clipPath>
                            </defs>
                        </svg>
                        <p class="text-sm">Saya Seperti Ini Banget</p>
                    </div>
                </div>

                <div class="absolute bottom-4 left-4 right-4">
                    <div class="w-full h-fit relative">
                        <div class="pl-10">
                            <img :src="Vector" alt="" class="w-[30%]">
                        </div>
                        <div class="bg-white rounded-2xl p-4 space-y-2">
                            <p class="text-sm">Pastikan jawaban yang kamu berikan mencerminkan perilaku kamu yang
                                sebenarnya
                                dalam
                                kehidupan sehari-hari, bukan seperti yang kamu inginkan atau harapkan.</p>
                            <NewButton @click="navigateToTest" text="Mulai Tes" class="w-full font-semibold"
                                text-size="text-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>