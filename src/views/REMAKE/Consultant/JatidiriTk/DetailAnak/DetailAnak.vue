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
import QuizResults from './components/QuizResults.vue';

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
const saving = ref(false);

const showImageModal = ref(false);
const activeImage = ref(null);

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
        saving.value = true;
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
            for (const image of uploadedImages.value) {
                const formData = new FormData();
                formData.append('tk_report_psikolog_id', reportId);
                formData.append('title', 'Dokumentasi Observasi');
                formData.append('file', image.file);

                await initAPI("post", "consultant/report/documentation", formData, token, {
                    'Content-Type': 'multipart/form-data'
                });
            }
        }

        await checkQuizResult();
    } catch (error) {
        console.error('Error saving report:', error);
        alert('Terjadi kesalahan saat menyimpan data. Silakan coba lagi.');
    } finally {
        saving.value = false;
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
    return apiData?.value?.filter(item => item.customer?.type === 'teacher') || [];
});

const homeReports = computed(() => {
    return apiData?.value?.filter(item => item.customer?.type === 'parent') || [];
});

const fetchTkReport = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `consultant/report/?customer_id=${userData.value.id}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            tkReports.value = response.data.data;
            tkId.value = response.data.data[0]?.details[0]?.tk_report_psikolog_id
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
    window.location.href = `https://api.jatidiri.app/api/result-anak/${tkId.value}`;
};

const getImageUrl = (filePath) => {
    if (!filePath) return '';
    return `https://api.jatidiri.app/storage/${filePath}`;
};

const openImageModal = (doc) => {
    activeImage.value = doc;
    showImageModal.value = true;
};

const closeImageModal = () => {
    showImageModal.value = false;
    activeImage.value = null;
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
            class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-4 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">

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
                        <p class="text-gray-500">Tidak ada data laporan anak di sekolah</p>
                    </div>
                </div>

                <!-- Konten Tab Report Rumah -->
                <div v-if="activeTab === 'report-home'"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
                    <div v-if=homeReports.length>
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
                        <p class="text-gray-500">Tidak ada data laporan anak di rumah</p>
                    </div>
                </div>

                <!-- Konten Quiz Tab Report Anak -->
                <div v-if="activeTab === 'report-child'" class="space-y-6">
                    <!-- Tampilkan hasil quiz jika ada -->
                    <QuizResults v-if="hasQuizResult && latestQuizResult" :activeResultTab="activeResultTab"
                        :latestQuizResult="latestQuizResult" :getQuizDataByCategory="getQuizDataByCategory"
                        :getQuizDocumentations="getQuizDocumentations" :getImageUrl="getImageUrl"
                        :openImageModal="openImageModal" :downloadPDF="downloadPDF" @changeTab="changeTab" />

                    <div v-else>
                        <StepProgress :activeStep="activeStep" :completedSteps="completedSteps" />

                        <AssessmentForm :activeStep="activeStep" :scores="scores" :notes="notes"
                            :observations="observations" :uploadedImages="uploadedImages"
                            :completedSteps="completedSteps" @update:scores="scores = $event"
                            @update:notes="notes = $event" @update:observations="observations = $event"
                            @update:uploadedImages="uploadedImages = $event" @nextStep="nextStep" @prevStep="prevStep"
                            @finish="handleFinish" :saving="saving" />
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

        <!-- Pop-up untuk menampilkan gambar dalam ukuran penuh -->
        <div v-if="showImageModal"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
            @click="closeImageModal">
            <div class="relative max-w-4xl max-h-screen overflow-auto" @click.stop>
                <button class="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
                    @click="closeImageModal">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <img :src="getImageUrl(activeImage.file)" :alt="activeImage.title || 'Dokumentasi'"
                    class="max-w-full max-h-screen object-contain">
            </div>
        </div>
    </Layout>
</template>