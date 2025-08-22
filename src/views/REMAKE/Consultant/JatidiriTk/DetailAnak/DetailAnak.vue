<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted } from 'vue';
import Layout from '../../../../../Layout/Consultant/Layout.vue';
import Search from '../../../../../assets/img/search2.png'
import initAPI from '../../../../../api/api';
import Cookies from 'js-cookie';

import ProfileSidebar from './components/ProfileSidebar.vue';
import PersonalInfo from './components/PersonalInfo.vue';
import AssessmentTabs from './components/AssessmentTabs.vue';
import StepProgress from './components/StepProgress.vue';
import AssessmentForm from './components/AssessmentForm.vue';
import ReportDownload from './components/ReportDownload.vue';

const route = useRoute();
const router = useRouter();
const apiData = ref([]);
const loading = ref(false);

const idUser = ref(null);
const userData = ref(null);
const activeTab = ref('informasi');

const scores = ref({
    psikomotor: null,
    kognisi: null,
    emosi: null,
    relasiSosial: null,
    kemandirian: null
});
const notes = ref({
    psikomotor: '',
    kognisi: '',
    emosi: '',
    relasiSosial: '',
    kemandirian: ''
});
const observations = ref({
    psikomotor: '',
    kognisi: '',
    emosi: '',
    relasiSosial: '',
    kemandirian: ''
});
const uploadedImages = ref([]);
const activeStep = ref(1);
const completedSteps = ref([]);
const showRecommendationPopup = ref(false);
const hasQuizResult = ref(null);
const quizReports = ref([]);
const token = Cookies.get('token');
const tkReports = ref([]);
const tkId = ref(null);

const stepMapping = {
    1: { category: 'Psikomotor', key: 'psikomotor' },
    2: { category: 'Kognisi', key: 'kognisi' },
    3: { category: 'Emosi', key: 'emosi' },
    4: { category: 'Relasi Sosial', key: 'relasiSosial' },
    5: { category: 'Kemandirian', key: 'kemandirian' }
};

const checkQuizResult = async () => {
    try {
        const response = await initAPI("get", `consultant/report?customer_id=${idUser.value}`, null, token);
        quizReports.value = response.data.data;
        hasQuizResult.value = response.data.data && response.data.data.length > 0;
    } catch (error) {
        console.error('Error checking quiz result:', error);
        hasQuizResult.value = false;
        quizReports.value = [];
    }
};

const latestQuizResult = computed(() => {
    if (!quizReports.value.length) return null;

    const reportsWithDetails = quizReports.value.filter(report =>
        report.details && report.details.length > 0
    );

    if (!reportsWithDetails.length) return null;

    const sortedReports = [...reportsWithDetails].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
    );

    return sortedReports[0];
});

const getQuizDataByCategory = (category) => {
    if (!latestQuizResult.value) return null;

    return latestQuizResult.value.details.find(detail =>
        detail.kategori === category
    );
};

const getQuizDocumentations = computed(() => {
    if (!latestQuizResult.value) return [];
    return latestQuizResult.value.documentations || [];
});

const getQuizNotes = computed(() => {
    if (!latestQuizResult.value) return 'Tidak ada catatan';

    const notes = latestQuizResult.value.details.map(detail =>
        `${detail.kategori}: ${detail.catatan}`
    ).join('\n');

    return notes || 'Tidak ada catatan';
});

const saveReport = async () => {
    try {
        const storeReportResponse = await initAPI("post", "consultant/report", {
            customer_id: idUser.value
        }, token);

        const reportId = storeReportResponse.data.data.id;

        for (let step = 1; step <= 5; step++) {
            const stepData = stepMapping[step];

            const payload = {
                tk_report_psikolog_id: reportId,
                kategori: stepData.category,
                skor: scores.value[stepData.key],
                keterangan: notes.value[stepData.key],
                catatan: observations.value[stepData.key]
            };

            await initAPI("post", "consultant/report/detail", payload, token);
        }

        if (uploadedImages.value.length > 0) {
            const formData = new FormData();
            formData.append('tk_report_psikolog_id', reportId);
            formData.append('title', 'Dokumentasi Observasi');

            uploadedImages.value.forEach((image, index) => {
                formData.append('file', image.file);
            });

            await initAPI("post", "consultant/report/documentation", formData, token, {
                'Content-Type': 'multipart/form-data'
            });
        }

    } catch (error) {
        console.error('Error saving report:', error);
        alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    }
};

const fetchReportData = async () => {
    try {
        loading.value = true;
        const response = await initAPI("get", `staff/teacher?customer_id=${idUser.value}`, null, token);
        apiData.value = response.data.data;
    } catch (error) {
        console.error('Error fetching report data:', error);
    } finally {
        loading.value = false;
    }
};

async function fetchUserData() {
    try {
        const response = await initAPI("get", `customers?id=${idUser.value}`, null, token);
        userData.value = response.data.data[0]
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

const schoolReports = computed(() => {
    return apiData.value.filter(item => item.customer?.type === 'teacher') || [];
});

const homeReports = computed(() => {
    return apiData.value.filter(item => item.customer?.type === 'parent') || [];
});

const fetchTkReport = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `consultant/report/?customer_id=${userData.value}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            tkReports.value = response.data.data;
            tkId.value = response.data.data[0].details[0].tk_report_psikolog_id
        }
    } catch (error) {
        console.error('Error fetching tk Report:', error);
    }
};

const activeResultTab = ref('psikomotor');

function nextStep() {
    if (!completedSteps.value.includes(activeStep.value)) {
        completedSteps.value.push(activeStep.value);
    }

    if (activeStep.value < 5) {
        activeStep.value++;
    } else {
        saveReport();
    }
}

const handleFinish = () => {
    saveReport();
};

function prevStep() {
    if (activeStep.value > 1) {
        activeStep.value--;
    }
}

function changeTab(tabName) {
    activeResultTab.value = tabName;
}

const downloadPDF = () => {
    if (tkId.value) {
        window.location.href = `https://api-staging.jatidiri.app/api/result-anak/${tkId.value}`;
    } else {
        console.log(`Download Dimulai `)
    }
};

onMounted(async () => {
    idUser.value = route.query.id;

    if (idUser.value) {
        await fetchUserData();
        await fetchReportData();
        await checkQuizResult();
        await fetchTkReport();
    }
});
</script>

<template>
    <Layout>
        <div
            class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">

            <ProfileSidebar :userData="userData" :activeTab="activeTab" @update:activeTab="activeTab = $event" />

            <!-- Konten Tab -->
            <div class="w-full md:w-[75%]">
                <PersonalInfo v-if="activeTab === 'informasi'" :userData="userData" />

                <!-- Konten Tab Report Anak Di Sekolah -->
                <div v-if="activeTab === 'report'"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
                    <div v-if="schoolReports.length > 0">
                        <AssessmentTabs :activeResultTab="activeResultTab" :assessmentResults="{
                            psikomotor: {
                                title: 'Psikomotor',
                                content: schoolReports[0].psikomotorik?.desc || 'Tidak ada data',
                                score: schoolReports[0].customer?.psikomotorik || 0
                            },
                            kognisi: {
                                title: 'Kognisi',
                                content: schoolReports[0].kognisi?.desc || 'Tidak ada data',
                                score: schoolReports[0].customer?.kognisi || 0
                            },
                            emosi: {
                                title: 'Emosi',
                                content: schoolReports[0].emosi?.desc || 'Tidak ada data',
                                score: schoolReports[0].customer?.emosi || 0
                            },
                            relasiSosial: {
                                title: 'Relasi Sosial',
                                content: schoolReports[0].relasi?.desc || 'Tidak ada data',
                                score: schoolReports[0].customer?.relasi || 0
                            },
                            kemandirian: {
                                title: 'Kemandirian',
                                content: schoolReports[0].mandiri?.desc || 'Tidak ada data',
                                score: schoolReports[0].customer?.mandiri || 0
                            }
                        }" @changeTab="changeTab" />

                        <ReportDownload :report="`Laporan.pdf`" :note="schoolReports[0].tk?.desc || 'Tidak ada catatan'"
                            :tk-id="tkId" />
                    </div>
                    <div v-else class="text-center py-8">
                        <p class="text-gray-500">Tidak ada data laporan sekolah</p>
                    </div>
                </div>

                <!-- Konten Tab Report Rumah -->
                <div v-if="activeTab === 'report-home'"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
                    <div v-if="homeReports.length > 0">
                        <AssessmentTabs :activeResultTab="activeResultTab" :assessmentResults="{
                            psikomotor: {
                                title: 'Psikomotor',
                                content: homeReports[0].psikomotorik?.desc || 'Tidak ada data',
                                score: homeReports[0].customer?.psikomotorik || 0
                            },
                            kognisi: {
                                title: 'Kognisi',
                                content: homeReports[0].kognisi?.desc || 'Tidak ada data',
                                score: homeReports[0].customer?.kognisi || 0
                            },
                            emosi: {
                                title: 'Emosi',
                                content: homeReports[0].emosi?.desc || 'Tidak ada data',
                                score: homeReports[0].customer?.emosi || 0
                            },
                            relasiSosial: {
                                title: 'Relasi Sosial',
                                content: homeReports[0].relasi?.desc || 'Tidak ada data',
                                score: homeReports[0].customer?.relasi || 0
                            },
                            kemandirian: {
                                title: 'Kemandirian',
                                content: homeReports[0].mandiri?.desc || 'Tidak ada data',
                                score: homeReports[0].customer?.mandiri || 0
                            }
                        }" @changeTab="changeTab" />

                        <ReportDownload :report="`Laporan.pdf`"
                            :note="homeReports[0].tk?.desc || 'Tidak ada catatan'" />
                    </div>
                    <div v-else class="text-center py-8">
                        <p class="text-gray-500">Tidak ada data laporan rumah</p>
                    </div>
                </div>

                <!-- Konten Quiz Tab Report Anak -->
                <div v-if="activeTab === 'report-child'" class="space-y-6">
                    <!-- Tampilkan hasil quiz jika ada -->
                    <div v-if="hasQuizResult && latestQuizResult"
                        class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
                        <div class="flex-col flex">
                            <div class="flex">
                                <!-- Tab Psikomotor -->
                                <div class="flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300"
                                    :class="activeResultTab === 'psikomotor' ? 'bg-[#f5f5f5] rounded-t-xl' : ''"
                                    @click="changeTab('psikomotor')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16"
                                        fill="none">
                                        <path
                                            d="M14.0415 8.43131L14.3861 7.14331C14.7888 5.63998 14.9908 4.88865 14.8395 4.23798C14.7195 3.72431 14.4499 3.25775 14.0648 2.89731C13.5775 2.44065 12.8255 2.23931 11.3221 1.83665C9.81881 1.43331 9.06681 1.23198 8.41681 1.38331C7.90314 1.50325 7.43658 1.77284 7.07614 2.15798C6.68481 2.57531 6.48081 3.18665 6.17748 4.29731L6.01481 4.90065L5.67014 6.18865C5.26681 7.69198 5.06548 8.44331 5.21681 9.09398C5.33675 9.60765 5.60634 10.0742 5.99148 10.4346C6.47881 10.8913 7.23081 11.0926 8.73414 11.496C10.0888 11.8586 10.8335 12.058 11.4435 11.9826C11.5101 11.9742 11.5755 11.9626 11.6395 11.948C12.153 11.8284 12.6195 11.5593 12.9801 11.1746C13.4368 10.6866 13.6381 9.93465 14.0415 8.43131Z"
                                            :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'" />
                                        <path
                                            d="M11.4433 11.9829C11.304 12.4098 11.0591 12.7946 10.7313 13.1015C10.244 13.5582 9.49198 13.7595 7.98865 14.1622C6.48531 14.5649 5.73331 14.7669 5.08331 14.6149C4.56972 14.4951 4.10317 14.2258 3.74265 13.8409C3.28598 13.3535 3.08398 12.6015 2.68131 11.0982L2.33665 9.81021C1.93331 8.30688 1.73198 7.55488 1.88331 6.90488C2.00325 6.3912 2.27284 5.92464 2.65798 5.56421C3.14531 5.10754 3.89731 4.90621 5.40065 4.50288C5.6842 4.42643 5.94309 4.35776 6.17731 4.29688"
                                            :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'" />
                                        <path d="M8.3515 6.6665L11.5715 7.52917M7.8335 8.5985L9.7655 9.11584"
                                            :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'"
                                            stroke-linecap="round" />
                                    </svg>

                                    <p class="text-xs"
                                        :class="activeResultTab === 'psikomotor' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">
                                        Psikomotor
                                    </p>
                                </div>

                                <!-- Tab Kognisi -->
                                <div class="flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300"
                                    :class="activeResultTab === 'kognisi' ? 'bg-[#f5f5f5] rounded-t-xl' : ''"
                                    @click="changeTab('kognisi')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                        fill="none">
                                        <g clip-path="url(#clip0_3700_13523)">
                                            <path
                                                d="M6.0035 10.5H5.3025C3.51 10.5 2.614 10.5 2.057 9.9325C1.5 9.365 1.5 8.452 1.5 6.625C1.5 4.7985 1.5 3.885 2.057 3.3175C2.614 2.75 3.51 2.75 5.3025 2.75H7.204C8.9965 2.75 9.893 2.75 10.45 3.3175C10.7285 3.6015 10.868 3.972 10.9375 4.5"
                                                :stroke="activeResultTab === 'kognisi' ? '#6464FA' : '#8E8E8E'"
                                                stroke-linecap="round" />
                                            <path
                                                d="M10.079 9.9145C9.99002 10.0925 9.97538 10.2985 10.0383 10.4872C10.1012 10.676 10.2365 10.832 10.4145 10.921C10.5925 11.01 10.7985 11.0246 10.9872 10.9617C11.176 10.8988 11.332 10.7635 11.421 10.5855C11.4651 10.4974 11.4913 10.4015 11.4983 10.3032C11.5053 10.2049 11.4929 10.1062 11.4617 10.0128C11.4305 9.9193 11.3813 9.83289 11.3167 9.75847C11.2522 9.68404 11.1736 9.62306 11.0855 9.579C10.9974 9.53494 10.9015 9.50867 10.8032 9.50169C10.7049 9.4947 10.6062 9.50714 10.5128 9.53830C10.4193 9.56945 10.3329 9.61871 10.2585 9.68326C10.184 9.74781 10.1231 9.82638 10.079 9.9145ZM10.079 9.9145L8.421 9.0855M8.421 9.0855C8.34543 9.2366 8.22105 9.35775 8.06802 9.42934C7.915 9.50093 7.74228 9.51875 7.57786 9.47993C7.41344 9.4411 7.26694 9.3479 7.1621 9.21542C7.05726 9.08294 7.00022 8.91894 7.00022 8.75C7.00022 8.58106 7.05726 8.41706 7.1621 8.28458C7.26694 8.1521 7.41344 8.0589 7.57786 8.02007C7.74228 7.98125 7.915 7.99907 8.06802 8.07066C8.22105 8.14225 8.34543 8.2634 8.421 8.4145M8.421 9.0855C8.4731 8.98133 8.50022 8.86647 8.50022 8.75C8.50022 8.63353 8.4731 8.51867 8.421 8.4145M10.079 7.5855C10.1226 7.67437 10.1833 7.75373 10.2577 7.81901C10.3322 7.88429 10.4187 7.93419 10.5125 7.96585C10.6063 7.9975 10.7054 8.01028 10.8042 8.00344C10.9029 7.9966 10.9993 7.97028 11.0879 7.926C11.1764 7.88172 11.2553 7.82035 11.32 7.74544C11.3847 7.67053 11.4339 7.58355 11.4648 7.48952C11.4958 7.39549 11.5078 7.29627 11.5001 7.19758C11.4925 7.09889 11.4655 7.00268 11.4205 6.9145C11.3306 6.7382 11.1747 6.60458 10.9867 6.54276C10.7987 6.48094 10.5938 6.49593 10.4169 6.58446C10.2399 6.67299 10.105 6.82788 10.0417 7.01539C9.97846 7.2029 9.99185 7.40782 10.079 7.5855ZM10.079 7.5855L8.421 8.4145M8.5 2.75L8.45 2.595C8.2025 1.825 8.079 1.44 7.7845 1.22C7.4895 1 7.0985 1 6.315 1H6.1835C5.401 1 5.0095 1 4.715 1.22C4.42 1.44 4.2965 1.825 4.049 2.595L4 2.75"
                                                :stroke="activeResultTab === 'kognisi' ? '#6464FA' : '#8E8E8E'" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3700_13523">
                                                <rect width="12" height="12" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>

                                    <p class="text-xs"
                                        :class="activeResultTab === 'kognisi' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">
                                        Kognisi
                                    </p>
                                </div>

                                <!-- Tab Emosi -->
                                <div class="flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300"
                                    :class="activeResultTab === 'emosi' ? 'bg-[#f5f5f5] rounded-t-xl' : ''"
                                    @click="changeTab('emosi')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                        fill="none">
                                        <path
                                            d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                                            :stroke="activeResultTab === 'emosi' ? '#6464FA' : '#8E8E8E'" />
                                        <path
                                            d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                                            :stroke="activeResultTab === 'emosi' ? '#6464FA' : '#8E8E8E'"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-xs"
                                        :class="activeResultTab === 'emosi' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">
                                        Emosi</p>
                                </div>

                                <!-- Tab Relasi Sosial -->
                                <div class="flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300"
                                    :class="activeResultTab === 'relasiSosial' ? 'bg-[#f5f5f5] rounded-t-xl' : ''"
                                    @click="changeTab('relasiSosial')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                        fill="none">
                                        <path
                                            d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                                            :stroke="activeResultTab === 'relasiSosial' ? '#6464FA' : '#8E8E8E'" />
                                        <path
                                            d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                                            :stroke="activeResultTab === 'relasiSosial' ? '#6464FA' : '#8E8E8E'"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-xs"
                                        :class="activeResultTab === 'relasiSosial' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">
                                        Relasi
                                        Sosial</p>
                                </div>

                                <!-- Tab Kemandirian -->
                                <div class="flex items-center gap-2 px-4 py-2 cursor-pointer transition-all duration-300"
                                    :class="activeResultTab === 'kemandirian' ? 'bg-[#f5f5f5] rounded-t-xl' : ''"
                                    @click="changeTab('kemandirian')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12"
                                        fill="none">
                                        <path
                                            d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                                            :stroke="activeResultTab === 'kemandirian' ? '#6464FA' : '#8E8E8E'" />
                                        <path
                                            d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                                            :stroke="activeResultTab === 'kemandirian' ? '#6464FA' : '#8E8E8E'"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>

                                    <p class="text-xs"
                                        :class="activeResultTab === 'kemandirian' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">
                                        Kemandirian</p>
                                </div>
                            </div>

                            <transition name="fade" mode="out-in">
                                <div :key="activeResultTab"
                                    class="p-4 bg-[#F5F5F5] rounded-b-xl rounded-tr-xl space-y-4">
                                    <p class="text-xs">{{
                                        getQuizDataByCategory(
                                            activeResultTab === 'psikomotor' ? 'Psikomotor' :
                                                activeResultTab === 'kognisi' ? 'Kognisi' :
                                                    activeResultTab === 'emosi' ? 'Emosi' :
                                                        activeResultTab === 'relasiSosial' ? 'Relasi Sosial' : 'Kemandirian'
                                        )?.keterangan || 'Tidak ada data'
                                    }}</p>

                                    <div class="py-1 px-4 rounded-full bg-primary w-fit text-xs text-white">
                                        Skor {{
                                            getQuizDataByCategory(
                                                activeResultTab === 'psikomotor' ? 'Psikomotor' :
                                                    activeResultTab === 'kognisi' ? 'Kognisi' :
                                                        activeResultTab === 'emosi' ? 'Emosi' :
                                                            activeResultTab === 'relasiSosial' ? 'Relasi Sosial' : 'Kemandirian'
                                            )?.skor || '0'
                                        }}
                                    </div>
                                </div>
                            </transition>
                        </div>

                        <!-- <div class="space-y-2">
                            <p class="text-xs text-[#8E8E8E] font-semibold">Catatan</p>
                            <div class="w-full bg-[#F5F5F5] p-4 rounded-xl">
                                <p class="text-xs">{{ getQuizNotes }}</p>
                            </div>
                        </div> -->

                        <div v-if="getQuizDocumentations.length > 0" class="flex flex-wrap items-center gap-4">
                            <div v-for="(doc, index) in getQuizDocumentations" :key="index">
                                <img :src="'https://api-staging.jatidiri.app/storage/' + doc.file" alt="Dokumentasi"
                                    class="w-32 h-32 rounded-xl object-contain">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <p class="text-xs text-[#8E8E8E] font-semibold">Laporan</p>
                            <div class="w-full bg-[#F5F5F5] p-4 rounded-xl flex justify-between items-center">
                                <a class="text-xs text-primary">Laporan.pdf</a>

                                <button @click="downloadPDF()" class="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24"
                                        fill="none">
                                        <g clip-path="url(#clip0_3700_13584)">
                                            <mask id="mask0_3700_13584" style="mask-type:luminance"
                                                maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
                                                <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                                            </mask>
                                            <g mask="url(#mask0_3700_13584)">
                                                <path
                                                    d="M21 10.19H18.11C15.74 10.19 13.81 8.26 13.81 5.89V3C13.81 2.45 13.36 2 12.81 2H8.57C5.49 2 3 4 3 7.57V16.43C3 20 5.49 22 8.57 22H16.43C19.51 22 22 20 22 16.43V11.19C22 10.64 21.55 10.19 21 10.19ZM12.78 15.78L10.78 17.78C10.71 17.85 10.62 17.91 10.53 17.94C10.44 17.98 10.35 18 10.25 18C10.15 18 10.06 17.98 9.97 17.94C9.89 17.91 9.81 17.85 9.75 17.79C9.74 17.78 9.73 17.78 9.73 17.77L7.73 15.77C7.44 15.48 7.44 15 7.73 14.71C8.02 14.42 8.50 14.42 8.79 14.71L9.5 15.44V11.25C9.5 10.84 9.84 10.5 10.25 10.5C10.66 10.5 11 10.84 11 11.25V15.44L11.72 14.72C12.01 14.43 12.49 14.43 12.78 14.72C13.07 15.01 13.07 15.49 12.78 15.78Z"
                                                    fill="#6464FA" />
                                                <path
                                                    d="M17.9297 8.81048C18.8797 8.82048 20.1997 8.82048 21.3297 8.82048C21.8997 8.82048 22.1997 8.15048 21.7997 7.75048C20.3597 6.30048 17.7797 3.69048 16.2997 2.21048C15.8897 1.80048 15.1797 2.08048 15.1797 2.65048V6.14048C15.1797 7.60048 16.4197 8.81048 17.9297 8.81048Z"
                                                    fill="#6464FA" />
                                            </g>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3700_13584">
                                                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div>
                            <button
                                class="py-3 px-6 rounded-full text-white flex items-center gap-2 ml-auto text-sm md:text-base bg-primary">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                        fill="none">
                                        <path
                                            d="M21 11.9999C20.7348 11.9999 20.4804 12.1053 20.2929 12.2928C20.1054 12.4804 20 12.7347 20 12.9999V18.9999C20 19.2652 19.8946 19.5195 19.7071 19.707C19.5196 19.8946 19.2652 19.9999 19 19.9999H5C4.73478 19.9999 4.48043 19.8946 4.29289 19.707C4.10536 19.5195 4 19.2652 4 18.9999V4.99994C4 4.73472 4.10536 4.48037 4.29289 4.29283C4.48043 4.1053 4.73478 3.99994 5 3.99994H11C11.2652 3.99994 11.5196 3.89458 11.7071 3.70705C11.8946 3.51951 12 3.26516 12 2.99994C12 2.73472 11.8946 2.48037 11.7071 2.29283C11.5196 2.1053 11.2652 1.99994 11 1.99994H5C4.20435 1.99994 3.44129 2.31601 2.87868 2.87862C2.31607 3.44123 2 4.20429 2 4.99994V18.9999C2 19.7956 2.31607 20.5587 2.87868 21.1213C3.44129 21.6839 4.20435 21.9999 5 21.9999H19C19.7956 21.9999 20.5587 21.6839 21.1213 21.1213C21.6839 20.5587 22 19.7956 22 18.9999V12.9999C22 12.7347 21.8946 12.4804 21.7071 12.2928C21.5196 12.1053 21.2652 11.9999 21 11.9999ZM6 12.7599V16.9999C6 17.2652 6.10536 17.5195 6.29289 17.707C6.48043 17.8946 6.73478 17.9999 7 17.9999H11.24C11.3716 18.0007 11.5021 17.9755 11.6239 17.9257C11.7457 17.8759 11.8566 17.8026 11.95 17.7099L18.87 10.7799L21.71 7.99994C21.8037 7.90698 21.8781 7.79637 21.9289 7.67452C21.9797 7.55266 22.0058 7.42195 22.0058 7.28994C22.0058 7.15793 21.9797 7.02722 21.9289 6.90536C21.8781 6.7835 21.8037 6.6729 21.71 6.57994L17.47 2.28994C17.377 2.19621 17.2664 2.12182 17.1446 2.07105C17.0227 2.02028 16.892 1.99414 16.76 1.99414C16.628 1.99414 16.4973 2.02028 16.3754 2.07105C16.2536 2.12182 16.143 2.19621 16.05 2.28994L13.23 5.11994L6.29 12.0499C6.19732 12.1434 6.12399 12.2542 6.07423 12.376C6.02446 12.4979 5.99924 12.6283 6 12.7599ZM16.76 4.40994L19.59 7.23994L18.17 8.65994L15.34 5.82994L16.76 4.40994ZM8 13.1699L13.93 7.23994L16.76 10.0699L10.83 15.9999H8V13.1699Z"
                                            fill="#E6E6E6" />
                                    </svg>
                                </span>
                                Edit Hasil
                            </button>
                        </div>
                    </div>
                    <div v-else>
                        <StepProgress :activeStep="activeStep" :completedSteps="completedSteps" />

                        <AssessmentForm :activeStep="activeStep" :scores="scores" :notes="notes"
                            :observations="observations" :uploadedImages="uploadedImages"
                            :completedSteps="completedSteps" @update:scores="scores = $event"
                            @update:notes="notes = $event" @update:observations="observations = $event"
                            @update:uploadedImages="uploadedImages = $event" @nextStep="nextStep" @prevStep="prevStep"
                            @finish="handleFinish" />
                    </div>
                </div>
            </div>

            <!-- Pop Up Rekomendasi -->
            <div v-if="showRecommendationPopup"
                class="absolute inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
                <div
                    class="w-full max-w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] bg-white shadow-md shadow-black/5 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6">
                    <div>
                        <img :src="Search" alt="Icon Search" class="w-40 mx-auto object-contain">
                    </div>
                    <div class="text-center">
                        <h5 class="text-[18px] font-semibold">Pilihan TK yang Tepat untuk Anak</h5>
                        <p class="text-sm text-[#535862]">Rekomendasikan anak untuk masuk TK A / TK B agar sesuai dengan
                            tahap perkembangannya.</p>
                    </div>

                    <div class="flex justify-center items-center gap-4">
                        <div
                            class="w-16 h-16 rounded-lg border-2 border-transparent hover:border-[#CBCBFD] bg-[#F5F5F5] group hover:bg-[#B1B1FC] transition-all duration-500 flex justify-center items-center text-center cursor-pointer">
                            <p>TK A</p>
                        </div>
                        <div
                            class="w-16 h-16 rounded-lg border-2 border-transparent hover:border-[#CBCBFD] bg-[#F5F5F5] group hover:bg-[#B1B1FC] transition-all duration-500 flex justify-center items-center text-center cursor-pointer">
                            <p>TK B</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>