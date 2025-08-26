<script setup>
import { useRouter } from 'vue-router';
import Layout from '@/Layout/Customer/Layout.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { jwtDecode } from "jwt-decode"
import Cookies from 'js-cookie'
import { useStore } from 'vuex'
import initAPI from '../../../../api/api';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import DOMPurify from 'dompurify'

import ProfileSidebar from './components/ProfileSidebar.vue';
import PersonalTabInfo from './components/PersonalTabInfo.vue';
import ReportTab from './components/ReportTab.vue';
import QuizModal from './components/QuizModal.vue';
import ReportChild from './Components/ReportChild.vue';

const router = useRouter();
const store = useStore()
const userData = computed(() => store.getters.getUserData)

const namaDepan = ref('')
const namaBelakang = ref('')
const tempatLahir = ref('')
const tanggalLahir = ref('')
const jenisKelamin = ref('')
const golonganDarah = ref('')
const alamatRumah = ref('')
const suku = ref('')
const anak = ref('')
const jumlahSaudara = ref('')

const activeTab = ref('informasi');
const apiData = ref([]);
const teacherReports = ref([]);
const parentReports = ref([]);
const psikologReports = ref([]);
const tkReports = ref([]);
const tkId = ref(null);
const showQuizModal = ref(false);
const isLoading = ref(true);
const assessmentResults = ref({
    psikomotor: {
        title: "Psikomotor",
        content: "Data tidak tersedia",
        score: 0
    },
    kognisi: {
        title: "Kognisi",
        content: "Data tidak tersedia",
        score: 0
    },
    emosi: {
        title: "Emosi",
        content: "Data tidak tersedia",
        score: 0
    },
    relasiSosial: {
        title: "Relasi Sosial",
        content: "Data tidak tersedia",
        score: 0
    },
    kemandirian: {
        title: "Kemandirian",
        content: "Data tidak tersedia",
        score: 0
    }
});

const parentData = ref({
    type: '',
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
});

const note = ref("Data tidak tersedia");
const report = ref("laporan.pdf");

const fetchParentData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `customers/parents?customer_id=${userData.value.id}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            parentData.value = response.data.data[0];
        }
    } catch (error) {
        console.error('Error fetching parent data:', error);
    }
};


const fetchReportData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        isLoading.value = true;
        const response = await initAPI(
            'get',
            `customers/parent?customer_id=${userData.value.id}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            apiData.value = response.data.data;

            teacherReports.value = apiData.value.filter(item => item.customer.type === 'teacher');
            parentReports.value = apiData.value.filter(item => item.customer.type === 'parent');

            if (teacherReports.value.length > 0) {
                updateAssessmentResults(teacherReports.value[0], 'teacher');
            }

            if (parentReports.value.length > 0) {
                updateAssessmentResults(parentReports.value[0], 'parent');
            }
        }
    } catch (error) {
        console.error('Error fetching report data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Gagal Memuat Data',
            text: 'Tidak dapat mengambil data laporan dari server.',
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        isLoading.value = false;
    }
};

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

const fetchPsikologData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'get',
            `customers/parent/psikolog?customer_id=${userData.value.id}`,
            null,
            token
        );

        if (response.data && response.data.data) {
            psikologReports.value = response.data.data;
        }
    } catch (error) {
        console.error('Error fetching psikolog data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Gagal Memuat Data Psikolog',
            text: 'Tidak dapat mengambil data laporan psikolog dari server.',
            showConfirmButton: false,
            timer: 2000
        });
    }
};

const updateAssessmentResults = (reportData, type) => {
    if (!reportData) return;

    const prefix = type === 'teacher' ? 'Guru: ' : 'Orang Tua: ';

    assessmentResults.value = {
        psikomotor: {
            title: "Psikomotor",
            content: reportData.psikomotorik ? `${prefix}${reportData.psikomotorik.desc}` : "Data tidak tersedia",
            score: reportData.customer ? parseFloat(reportData.customer.psikomotorik) || 0 : 0
        },
        kognisi: {
            title: "Kognisi",
            content: reportData.kognisi ? `${prefix}${reportData.kognisi.desc}` : "Data tidak tersedia",
            score: reportData.customer ? parseFloat(reportData.customer.kognisi) || 0 : 0
        },
        emosi: {
            title: "Emosi",
            content: reportData.emosi ? `${prefix}${reportData.emosi.desc}` : "Data tidak tersedia",
            score: reportData.customer ? parseFloat(reportData.customer.emosi) || 0 : 0
        },
        relasiSosial: {
            title: "Relasi Sosial",
            content: reportData.relasi ? `${prefix}${reportData.relasi.desc}` : "Data tidak tersedia",
            score: reportData.customer ? parseFloat(reportData.customer.relasi) || 0 : 0
        },
        kemandirian: {
            title: "Kemandirian",
            content: reportData.mandiri ? `${prefix}${reportData.mandiri.desc}` : "Data tidak tersedia",
            score: reportData.customer ? parseFloat(reportData.customer.mandiri) || 0 : 0
        }
    };

    note.value = reportData.customer && reportData.customer.tk
        ? reportData.customer.tk.desc
        : "Data tidak tersedia";
};

const convertToInputDate = (tanggal) => {
    if (tanggal) {
        const [day, month, year] = tanggal.split("-");
        return `${year}-${month}-${day}`;
    }
    return '';
};

onMounted(() => {
    const token = Cookies.get('token')
    if (token) {
        try {
            const decodedToken = jwtDecode(token)
        } catch (error) {
            console.log('invalid token')
            router.push('/login')
            Cookies.remove('token')
        }
    }

    if (!userData.value) {
        const localStorageUserData = localStorage.getItem('userData');
        if (localStorageUserData) {
            const parsedUserData = JSON.parse(localStorageUserData);
            store.commit('user', parsedUserData);
        }
    }

    namaDepan.value = userData.value ? userData.value.first_name : '';
    namaBelakang.value = userData.value ? userData.value.last_name : '';
    tempatLahir.value = userData.value ? userData.value.birth_place : '';
    tanggalLahir.value = convertToInputDate(userData.value.birth_date);
    jenisKelamin.value = userData.value ? userData.value.gender : '';
    golonganDarah.value = userData.value ? userData.value.blood_group : '';
    alamatRumah.value = userData.value ? userData.value.address : '';
    suku.value = userData.value ? userData.value.ethnic : '';
    anak.value = userData.value ? userData.value.child_number : '';
    jumlahSaudara.value = userData.value ? userData.value.from_child_number : '';

    fetchReportData();
    fetchPsikologData();
    fetchTkReport();
    fetchParentData();
})

const handleTabChange = (tab) => {
    activeTab.value = tab;

    if (tab === 'report') {
        if (teacherReports.value.length > 0) {
            updateAssessmentResults(teacherReports.value[0], 'teacher');
        }
    } else if (tab === 'report-home') {
        if (parentReports.value.length > 0) {
            updateAssessmentResults(parentReports.value[0], 'parent');
        } else {
            showQuizModal.value = true;
        }
    } else if (tab === 'report-child') {
    }
};

watch([teacherReports, parentReports, psikologReports, isLoading], () => {
    if (!isLoading.value && activeTab.value !== 'report-home' && parentReports.value.length === 0) {
        showQuizModal.value = true;
    }
});

const closeQuizModal = () => {
    showQuizModal.value = false;
};

const handleSubmit = async () => {
    const token = Cookies.get('token')
    const customerId = userData.value.id

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('first_name', DOMPurify.sanitize(namaDepan.value));
    formData.append('last_name', DOMPurify.sanitize(namaBelakang.value));
    formData.append('birth_place', DOMPurify.sanitize(tempatLahir.value));
    formData.append('birth_date', DOMPurify.sanitize(tanggalLahir.value));
    formData.append('gender', DOMPurify.sanitize(jenisKelamin.value));
    formData.append('blood_group', DOMPurify.sanitize(golonganDarah.value));
    formData.append('address', DOMPurify.sanitize(alamatRumah.value));
    formData.append('ethnic', DOMPurify.sanitize(suku.value));
    formData.append('child_number', DOMPurify.sanitize(anak.value));
    formData.append('from_child_number', DOMPurify.sanitize(jumlahSaudara.value));

    if (token) {
        try {
            const response = await initAPI(
                'put', 'customers/' + customerId, formData, token
            );

            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });

                const refreshFormData = new FormData()
                refreshFormData.append('refresh_user', 'true')
                const updatedCustomer = await initAPI('post', 'login', refreshFormData, token)
                store.commit('user', updatedCustomer.data.customer)
                localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.customer))
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: 'Gagal mengubah data.',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } else {
        router.push('/login')
        localStorage.clear()
    }
}

const saveParentData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    try {
        const response = await initAPI(
            'post',
            'customers/parents',
            {
                customer_id: userData.value.id,
                type: DOMPurify.sanitize(parentData.value.type),
                name: DOMPurify.sanitize(parentData.value.name),
                birth_date: DOMPurify.sanitize(parentData.value.birth_date),
                kewarganegaraan: DOMPurify.sanitize(parentData.value.kewarganegaraan),
                religion: DOMPurify.sanitize(parentData.value.religion),
                anak_ke: DOMPurify.sanitize(parentData.value.anak_ke),
                jumlah_sodara: DOMPurify.sanitize(parentData.value.jumlah_sodara),
                pernikahan_ke: DOMPurify.sanitize(parentData.value.pernikahan_ke),
                umur_saat_menikah: DOMPurify.sanitize(parentData.value.umur_saat_menikah),
                pendidikan: DOMPurify.sanitize(parentData.value.pendidikan),
                pekerjaan: DOMPurify.sanitize(parentData.value.pekerjaan)
            },
            token
        );

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data orang tua berhasil disimpan',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } catch (error) {
        console.error('Error saving parent data:', error);
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Gagal menyimpan data orang tua.',
            showConfirmButton: false,
            timer: 2000
        });
    }
};


const navigateToQuiz = () => {
    router.push('/tk/kuisioner')
}
</script>

<template>
    <Layout>
        <div
            class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">
            <!-- Menggunakan ProfileSidebar component -->
            <ProfileSidebar :userData="userData" :activeTab="activeTab" @update:activeTab="handleTabChange" />

            <!-- Result Tab -->
            <div class="w-full md:w-[75%]">
                <!-- Menggunakan PersonalTabInfo component -->
                <PersonalTabInfo v-if="activeTab === 'informasi'" :customerId="userData?.value?.id" :namaDepan="namaDepan" :namaBelakang="namaBelakang"
                    :tempatLahir="tempatLahir" :tanggalLahir="tanggalLahir" :jenisKelamin="jenisKelamin"
                    :golonganDarah="golonganDarah" :suku="suku" :anak="anak" :jumlahSaudara="jumlahSaudara"
                    :alamatRumah="alamatRumah" @update:namaDepan="namaDepan = $event"
                    @update:namaBelakang="namaBelakang = $event" @update:tempatLahir="tempatLahir = $event"
                    @update:tanggalLahir="tanggalLahir = $event" @update:golonganDarah="golonganDarah = $event"
                    @update:alamatRumah="alamatRumah = $event" @update:suku="suku = $event" @update:anak="anak = $event"
                    @update:jumlahSaudara="jumlahSaudara = $event" @update:jenisKelamin="jenisKelamin = $event"
                    @submit="handleSubmit"
                    
                    :parentType="parentData.type" :parentName="parentData.name"
                    :parentBirthDate="parentData.birth_date" :parentKewarganegaraan="parentData.kewarganegaraan"
                    :parentReligion="parentData.religion" :parentAnakKe="parentData.anak_ke"
                    :parentJumlahSodara="parentData.jumlah_sodara" :parentPernikahanKe="parentData.pernikahan_ke"
                    :parentUmurMenikah="parentData.umur_saat_menikah" :parentPendidikan="parentData.pendidikan"
                    :parentPekerjaan="parentData.pekerjaan" @update:parentType="parentData.type = $event"
                    @update:parentName="parentData.name = $event"
                    @update:parentBirthDate="parentData.birth_date = $event"
                    @update:parentKewarganegaraan="parentData.kewarganegaraan = $event"
                    @update:parentReligion="parentData.religion = $event"
                    @update:parentAnakKe="parentData.anak_ke = $event"
                    @update:parentJumlahSodara="parentData.jumlah_sodara = $event"
                    @update:parentPernikahanKe="parentData.pernikahan_ke = $event"
                    @update:parentUmurMenikah="parentData.umur_saat_menikah = $event"
                    @update:parentPendidikan="parentData.pendidikan = $event"
                    @update:parentPekerjaan="parentData.pekerjaan = $event" @saveParentData="saveParentData" />

                <!-- Menggunakan ReportTab component untuk semua jenis report -->
                <ReportTab v-if="activeTab === 'report' && teacherReports.length > 0"
                    :assessmentResults="assessmentResults" :note="note" :report="report" :tk-id="tkId"
                    :showImages="false" :status="'hidden'" @downloadPDF="" @navigateToQuiz="navigateToQuiz" />

                <ReportTab v-if="activeTab === 'report-home' && parentReports.length > 0"
                    :assessmentResults="assessmentResults" :note="note" :report="report" :tk-id="tkId"
                    :showImages="false" :status="'hidden'" @downloadPDF="" @navigateToQuiz="navigateToQuiz" />

                <ReportChild v-if="activeTab === 'report-child' && psikologReports.length > 0"
                    :assessmentResults="assessmentResults" :note="note" :report="report" :tk-id="tkId"
                    :showImages="true" :status="'hidden'" :psikologData="psikologReports" @downloadPDF=""
                    @navigateToQuiz="navigateToQuiz" />

                <div v-if="activeTab === 'report' && teacherReports.length === 0"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5 flex items-center justify-center">
                    <p class="text-sm md:text-base text-gray-500">Data laporan sekolah belum tersedia</p>
                </div>

                <div v-if="activeTab === 'report-child' && psikologReports.length === 0"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5 flex items-center justify-center">
                    <p class="text-sm md:text-base text-gray-500">Data laporan anak belum tersedia</p>
                </div>
            </div>

            <!-- Quiz Modal -->
            <div v-if="showQuizModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <QuizModal @navigateToQuiz="navigateToQuiz" @closeModal="closeQuizModal" />
            </div>
        </div>
    </Layout>
</template>