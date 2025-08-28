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
import CheckReport from '../../Consultant/JatidiriTk/DetailAnak/components/CheckReport.vue';

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
const isParentDataReady = ref(false);
const ageUser = ref('')

const showImageModal = ref(false);
const activeImage = ref(null);

const parentData = ref({
  ayah: {
    type: 'Ayah',
    name: '',
    birth_date: '',
    kewarganegaraan: '',
    religion: '',
    anak_ke: '',
    jumlah_sodara: '',
    pernikahan_ke: '',
    umur_saat_menikah: '',
    pendidikan: '',
    pekerjaan: ''
  },
  ibu: {
    type: 'Ibu',
    name: '',
    birth_date: '',
    kewarganegaraan: '',
    religion: '',
    anak_ke: '',
    jumlah_sodara: '',
    pernikahan_ke: '',
    umur_saat_menikah: '',
    pendidikan: '',
    pekerjaan: ''
  }
});

const getImageUrl = (filePath) => {
  if (!filePath) return '';
  return `https://api.jatidiri.app/storage/${filePath}`;
};

const calculateAge = (birthDate) => {
  if (!birthDate) return null

  const convertDate = (dateStr) => {
    const [day, month, year] = dateStr.split('-')
    return `${year}-${month}-${day}`
  }

  const today = new Date()
  const convertedDate = convertDate(birthDate)
  const birth = new Date(convertedDate)

  if (isNaN(birth.getTime())) {
    return null
  }

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
}

onMounted(async () => {
  idUser.value = route.query.id;

  if (idUser.value) {
    await fetchUserData();
    await fetchParentData()
    await fetchReportData();
    await fetchPsychData();
    await fetchTkReport();
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

const fetchParentData = async () => {
  const token = Cookies.get('token');

  if (!token) return;

  try {
    const response = await initAPI(
      'get',
      `customers/parents?customer_id=${idUser.value}`,
      null,
      token
    );

    if (response.data && response.data.data) {
      parentData.value.ayah = {
        type: 'Ayah',
        name: '',
        birth_date: '',
        kewarganegaraan: '',
        religion: '',
        anak_ke: '',
        jumlah_sodara: '',
        pernikahan_ke: '',
        umur_saat_menikah: '',
        pendidikan: '',
        pekerjaan: ''
      };

      parentData.value.ibu = {
        type: 'Ibu',
        name: '',
        birth_date: '',
        kewarganegaraan: '',
        religion: '',
        anak_ke: '',
        jumlah_sodara: '',
        pernikahan_ke: '',
        umur_saat_menikah: '',
        pendidikan: '',
        pekerjaan: ''
      };

      response.data.data.forEach(parent => {
        if (parent.type === 'Ayah') {
          parentData.value.ayah = { ...parent };
        } else if (parent.type === 'Ibu') {
          parentData.value.ibu = { ...parent };
        }
      });
    }

    isParentDataReady.value = true;
  } catch (error) {
    console.error('Error fetching parent data:', error);
  }
};

const fetchReportData = async () => {
  const age = calculateAge(userData?.value?.birth_date)
  ageUser.value = age

  try {
    if (age !== null && age <= 3) {
      loading.value = true;
      const response = await initAPI("get", `customers/kid?customer_id=${idUser.value}`, null, token);
      apiData.value = response.data.data;
    } else {
      loading.value = true;
      const response = await initAPI("get", `staff/teacher?customer_id=${idUser.value}`, null, token);
      apiData.value = response.data.data
    }
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
    psychData.value = response.data.data;
  } catch (error) {
    console.error('Error fetching psych data:', error);
  } finally {
    loading.value = false;
  }
};

const schoolReports = computed(() => {
  const age = calculateAge(userData?.value?.birth_date)

  if (age !== null && age <= 3) {
    return apiData.value?.filter(item => item.customer?.type === 'teacher') || []
  } else {
    return apiData.value?.filter(item => item.customer?.type === 'teacher') || []
  }
});


const homeReports = computed(() => {
  const age = calculateAge(userData?.value?.birth_date)

  if (age !== null && age <= 3) {
    return apiData.value?.filter(item => item.customer?.type === 'parent') || []
  } else {
    return apiData.value?.filter(item => item.customer?.type === 'parent') || []
  }
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
  localStorage.setItem('ageUser', ageUser.value)
  router.push({ path: '/staff/detail-anak/kuisioner', query: { id: idUser.value } })
}

const downloadPDF = (reportName) => {
  if (tkId) {
    window.location.href = `https://api.jatidiri.app/api/result-anak/${tkId.value}`;
  } else {
    emit('downloadPDF', reportName);
  }
};

const closeModal = () => {
  showQuizModal.value = false;
};

const teacherReportConclusion = computed(() => {
  const age = calculateAge(userData?.value?.birth_date);

  if (!apiData.value || apiData.value.length === 0) return null;

  let teacherReport = null;

  if (age !== null && age <= 3) {
    teacherReport = apiData.value.find(item => item.customer?.type === 'teacher');
  } else {
    teacherReport = apiData.value.find(item => item.customer?.type === 'teacher');
  }

  if (!teacherReport || !teacherReport.customer) return null;

  if (age !== null && age <= 3) {
    return teacherReport.customer.kid ? {
      content: teacherReport.customer.kid.description,
      score: teacherReport.customer.kid.score_to,
    } : null;
  } else {
    return teacherReport.customer.tk ? {
      content: teacherReport.customer.tk.desc,
      score: teacherReport.customer.tk.score_to,
    } : null;
  }
});

const openImageModal = (doc) => {
  activeImage.value = doc;
  showImageModal.value = true;
};

const closeImageModal = () => {
  showImageModal.value = false;
  activeImage.value = null;
};
</script>

<template>
  <Layout>
    <div
      class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">

      <ChildProfile :activeTab="activeTab" :userData="userData" @update:activeTab="activeTab = $event" />

      <div class="w-full md:w-[75%]">
        <!-- Personal Information Tab -->
        <PersonalInfo v-if="activeTab === 'informasi' && isParentDataReady" :userData="userData"
          :ayah-data="parentData.ayah" :ibu-data="parentData.ibu" />

        <!-- School Report Tab -->
        <SchoolReport v-if="activeTab === 'report'" :reports="schoolReports" :note="note" :report="report"
          :age-user="ageUser" :loading="loading" :tk-id="tkId" @navigate-to-quiz="navigateToQuiz"
          @download-pdf="downloadPDF" />

        <!-- Home Report Tab -->
        <HomeReport v-if="activeTab === 'report-home'" :reports="homeReports" :note="note" :report="report"
          :age-user="ageUser" :loading="loading" :tk-id="tkId" @navigate-to-quiz="navigateToQuiz"
          @download-pdf="downloadPDF" />

        <!-- Child Report Tab - Menggunakan data psikolog -->
        <ChildReport v-if="activeTab === 'report-child'" :reports="psychData" :note="note" :report="report"
          :loading="loading" :tk-id="tkId" :teacher-conclusion="teacherReportConclusion"
          :openImageModal="openImageModal" @navigate-to-quiz="navigateToQuiz" @download-pdf="downloadPDF" />

        <!-- Konten Cek Pemeriksaan -->
        <CheckReport v-if="activeTab === 'check-report' && userData" :anak-data="userData" :ayahData="parentData.ayah"
          :ibuData="parentData.ibu" />
      </div>

      <QuizModal v-if="showQuizModal" @navigate-to-quiz="navigateToQuiz" @close-modal="closeModal" />

      <div v-if="showImageModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4"
        @click="closeImageModal">
        <div class="relative max-w-4xl max-h-screen overflow-auto" @click.stop>
          <button class="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
            @click="closeImageModal">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img :src="getImageUrl(activeImage.file)" :alt="activeImage.title || 'Dokumentasi'"
            class="max-w-full max-h-screen object-contain">
        </div>
      </div>
    </div>
  </Layout>
</template>