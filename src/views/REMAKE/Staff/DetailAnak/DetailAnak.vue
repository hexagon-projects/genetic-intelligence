<script setup>
import { useRoute, useRouter } from 'vue-router';
import Layout from '../../../../Layout/Kepsek/Layout.vue';
import { useStore } from 'vuex/dist/vuex.cjs.js';
import initAPI from '../../../../api/api';
import Cookies from 'js-cookie';
import { ref, computed, onMounted, watch } from 'vue';
import ChildProfile from './components/ChildProfile.vue';
import PersonalInfo from './components/PersonalInfo.vue';
import SchoolReport from './components/SchoolReport.vue';
import HomeReport from './components/HomeReport.vue';
import ChildReport from './components/ChildReport.vue';
import QuizModal from './components/QuizModal.vue';

const route = useRoute();
const router = useRouter();
const token = Cookies.get('token');
const store = useStore();
const idUser = ref(null);
const userData = ref(null);
const apiData = ref([]);
const psychData = ref([]);
const loading = ref(false);
const showQuizModal = ref(false);
const activeTab = ref('informasi');
const tkReports = ref([]);
const tkId = ref(null);

onMounted(() => {
  idUser.value = route.query.id;
  
  if (idUser.value) {
    fetchUserData();
    fetchReportData();
    fetchPsychData();
    fetchTkReport();
  }
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
            tkId.value = response.data.data[0].details[0].tk_report_psikolog_id
        }
    } catch (error) {
        console.error('Error fetching tk Report:', error);
    }
};

const fetchUserData = async () => {
  try {
    const response = await initAPI("get", `customers?id=${idUser.value}`, null, token);
    userData.value = response.data.data[0]
  } catch (error) {
    console.error('Error fetching user data:', error);
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

const fetchPsychData = async () => {
  try {
    loading.value = true;
    const response = await initAPI("get", `staff/teacher/psikolog?customer_id=${idUser.value}`, null, token);
    console.log(response)
    psychData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching psych data:', error);
  } finally {
    loading.value = false;
  }
};

const schoolReports = computed(() => {
  return apiData.value?.filter(item => item?.customer?.type === 'teacher') || [];
});

const homeReports = computed(() => {
  return apiData.value?.filter(item => item?.customer?.type === 'parent') || [];
});

watch(schoolReports, (newVal) => {
  if (newVal.length === 0 && activeTab.value === 'report') {
    showQuizModal.value = true;
  }
});

watch(activeTab, (newTab) => {
  if (newTab === 'report' && schoolReports.value.length === 0) {
    showQuizModal.value = true;
  } else {
    showQuizModal.value = false;
  }
});

const note = ref("Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad iusto deleniti nostrum maiores illo alias placeat voluptate! Repellat, in ut.");
const report = ref(`Laporan`);

const navigateToQuiz = () => {
    router.push({ path: '/staff/detail-anak/kuisioner', query: { id: idUser.value } })
}

const downloadPDF = (reportName) => {
    if (tkId) {
        window.location.href = `https://api-staging.jatidiri.app/api/result-anak/${tkId.value}`;
    } else {
        emit('downloadPDF', reportName);
    }
};

const closeModal = () => {
  showQuizModal.value = false;
};
</script>

<template>
    <Layout>
        <div class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">
      
            <ChildProfile 
                :activeTab="activeTab" 
                :userData="userData"
                @update:activeTab="activeTab = $event" 
            />

            <div class="w-full md:w-[75%]">
                <!-- Personal Information Tab -->
                <PersonalInfo v-if="activeTab === 'informasi'" :userData="userData" />

                <!-- School Report Tab -->
                <SchoolReport 
                    v-if="activeTab === 'report'"
                    :reports="schoolReports"
                    :note="note"
                    :report="report"
                    :loading="loading"
                    @navigate-to-quiz="navigateToQuiz"
                    @download-pdf="downloadPDF"
                />

                <!-- Home Report Tab -->
                <HomeReport 
                    v-if="activeTab === 'report-home'"
                    :reports="homeReports"
                    :note="note"
                    :report="report"
                    :loading="loading"
                    @navigate-to-quiz="navigateToQuiz"
                    @download-pdf="downloadPDF"
                />

                <!-- Child Report Tab - Menggunakan data psikolog -->
                <ChildReport 
                    v-if="activeTab === 'report-child'"
                    :reports="psychData" 
                    :note="note"
                    :report="report"
                    :loading="loading"
                    @navigate-to-quiz="navigateToQuiz"
                    @download-pdf="downloadPDF"
                />
            </div>

            <QuizModal 
                v-if="showQuizModal"
                @navigate-to-quiz="navigateToQuiz"
                @close-modal="closeModal"
            />
        </div>
    </Layout>
</template>