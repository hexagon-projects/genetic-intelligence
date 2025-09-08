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
import CheckReport from './Components/CheckReport.vue';
import CompleteDataModal from './Components/CompleteDataModal.vue';

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
const showCompleteDataModal = ref(false);

const isLoading = ref(true);
const isLoadingParents = ref(false);
const note = ref("Data tidak tersedia");
const report = ref("laporan.pdf");


const assessmentResults = ref({
    kesimpulan: {
        title: "Kesimpulan",
        content: "Data tidak tersedia",
        score: 0
    },
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
    } catch (error) {
        console.error('Error fetching parent data:', error);
    }
};

const fetchReportData = async () => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    const age = calculateAge(userData.value.birth_date)

    try {
        if (age !== null && age <= 3) {
            isLoading.value = true;
            const response = await initAPI(
                'get',
                `customers/kid?customer_id=${userData.value.id}`,
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
        } else {
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
            tkId.value = response.data.data[0]?.details[0]?.tk_report_psikolog_id
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
            psikologReports.value = response.data.data.filter(report => report.status === 'approve');
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

    const age = calculateAge(userData.value.birth_date)

    if (age !== null && age <= 3) {
        assessmentResults.value = {
            kesimpulan: {
                title: "Kesimpulan",
                content: reportData.customer?.kid?.description ? `${reportData.customer?.kid?.description}` : "Data tidak tersedia",
                score: reportData.customer?.kid?.score_to ? parseFloat(reportData.customer?.kid?.score_to) || 0 : 0
            },
            psikomotor: {
                title: "Psikomotor",
                content: reportData.psikomotorik ? `${reportData.psikomotorik.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.psikomotorik) || 0 : 0
            },
            kognisi: {
                title: "Kognisi",
                content: reportData.kognisi ? `${reportData.kognisi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.kognisi) || 0 : 0
            },
            emosi: {
                title: "Emosi",
                content: reportData.emosi ? `${reportData.emosi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.emosi) || 0 : 0
            },
            relasiSosial: {
                title: "Relasi Sosial",
                content: reportData.relasi ? `${reportData.relasi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.relasi) || 0 : 0
            },
            kemandirian: {
                title: "Kemandirian",
                content: reportData.mandiri ? `${reportData.mandiri.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.mandiri) || 0 : 0
            }
        };
    } else {
        assessmentResults.value = {
            kesimpulan: {
                title: "Kesimpulan",
                content: reportData.customer?.tk?.desc ? `${reportData.customer?.tk?.desc}` : "Data tidak tersedia",
                score: reportData.customer?.tk?.score_to ? parseFloat(reportData.customer?.tk?.score_to) || 0 : 0
            },
            psikomotor: {
                title: "Psikomotor",
                content: reportData.psikomotorik ? `${reportData.psikomotorik.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.psikomotorik) || 0 : 0
            },
            kognisi: {
                title: "Kognisi",
                content: reportData.kognisi ? `${reportData.kognisi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.kognisi) || 0 : 0
            },
            emosi: {
                title: "Emosi",
                content: reportData.emosi ? `${reportData.emosi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.emosi) || 0 : 0
            },
            relasiSosial: {
                title: "Relasi Sosial",
                content: reportData.relasi ? `${reportData.relasi.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.relasi) || 0 : 0
            },
            kemandirian: {
                title: "Kemandirian",
                content: reportData.mandiri ? `${reportData.mandiri.desc}` : "Data tidak tersedia",
                score: reportData.customer ? parseFloat(reportData.customer.mandiri) || 0 : 0
            }
        };
    }

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

    if (!userData.value || Object.keys(userData.value).length === 0) {
        showCompleteDataModal.value = true;
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
    const age = calculateAge(userData.value.birth_date)

    if (!userData.value || Object.keys(userData.value).length === 0) {
        showCompleteDataModal.value = true;
        return;
    }

    if (age !== null && age <= 3) {
        if (tab === 'report') {
            if (teacherReports.value) {
                updateAssessmentResults(teacherReports.value[0], 'teacher');
            }
        } else if (tab === 'report-home') {
            if (parentReports.value) {
                updateAssessmentResults(parentReports.value[0], 'parent');
            } else {
                showQuizModal.value = true;
            }
        } else if (tab === 'report-child') {
        }
    } else {
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
    }
};

watch([teacherReports, parentReports, psikologReports, isLoading], () => {
    // Hanya tampilkan modal quiz jika userData tidak kosong
    if (!isLoading.value && activeTab.value === 'report-home' && parentReports.value.length === 0 && userData.value) {
        showQuizModal.value = true;
    }
});

watch(userData, (newVal) => {
    if (!newVal || Object.keys(newVal).length === 0) {
        showCompleteDataModal.value = true;
    } else {
        showCompleteDataModal.value = false;
        namaDepan.value = newVal.first_name || '';
        namaBelakang.value = newVal.last_name || '';
        tempatLahir.value = newVal.birth_place || '';
        tanggalLahir.value = convertToInputDate(newVal.birth_date);
        jenisKelamin.value = newVal.gender || '';
        golonganDarah.value = newVal.blood_group || '';
        alamatRumah.value = newVal.address || '';
        suku.value = newVal.ethnic || '';
        anak.value = newVal.child_number || '';
        jumlahSaudara.value = newVal.from_child_number || '';
    }
}, { immediate: true, deep: true });

const closeQuizModal = () => {
    showQuizModal.value = false;
};

const closeCompleteDataModal = () => {
    showCompleteDataModal.value = false;
};

const handleSubmit = async () => {
    const token = Cookies.get('token')
    const customerId = userData.value.id

    const genderValue = jenisKelamin.value === 'Laki-laki' ? 1 :
        jenisKelamin.value === 'Perempuan' ? 2 :
            jenisKelamin.value;

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('first_name', DOMPurify.sanitize(namaDepan.value));
    formData.append('last_name', DOMPurify.sanitize(namaBelakang.value));
    formData.append('birth_place', DOMPurify.sanitize(tempatLahir.value));
    formData.append('birth_date', DOMPurify.sanitize(tanggalLahir.value));
    formData.append('gender', genderValue);
    formData.append('blood_group', DOMPurify.sanitize(golonganDarah.value));
    formData.append('address', DOMPurify.sanitize(alamatRumah.value));
    formData.append('ethnic', DOMPurify.sanitize(suku.value));
    formData.append('child_number', DOMPurify.sanitize(anak.value));
    formData.append('from_child_number', DOMPurify.sanitize(jumlahSaudara.value));

    formData.append('religion', userData.value.religion || 1);
    formData.append('village_id', userData.value.village_id || '');
    formData.append('nationality', userData.value.nationality || 'Indonesia');
    formData.append('number', userData.value.number || '');

    if (token) {
        try {
            const response = await initAPI(
                'post', 'customers/' + customerId, formData, token
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

                showCompleteDataModal.value = false;
                showQuizModal.value = true;
            }
        } catch (err) {
            console.error('Error details:', err.response?.data || err.message);
            Swal.fire({
                icon: 'error',
                title: 'Failed',
                text: err.response?.data?.message || 'Gagal mengubah data.',
                showConfirmButton: false,
                timer: 2000
            });
        }
    } else {
        router.push('/login')
        localStorage.clear()
    }
}

const saveParentData = async (type) => {
    const token = Cookies.get('token');
    if (!token || !userData.value) return;

    isLoadingParents.value = true;

    try {
        const dataToSave = parentData.value[type];

        const response = await initAPI(
            'post',
            'customers/parents',
            {
                customer_id: userData.value.id,
                type: DOMPurify.sanitize(dataToSave.type),
                name: DOMPurify.sanitize(dataToSave.name),
                birth_date: DOMPurify.sanitize(dataToSave.birth_date),
                kewarganegaraan: DOMPurify.sanitize(dataToSave.kewarganegaraan),
                religion: DOMPurify.sanitize(dataToSave.religion),
                anak_ke: DOMPurify.sanitize(dataToSave.anak_ke),
                jumlah_sodara: DOMPurify.sanitize(dataToSave.jumlah_sodara),
                pernikahan_ke: DOMPurify.sanitize(dataToSave.pernikahan_ke),
                umur_saat_menikah: DOMPurify.sanitize(dataToSave.umur_saat_menikah),
                pendidikan: DOMPurify.sanitize(dataToSave.pendidikan),
                pekerjaan: DOMPurify.sanitize(dataToSave.pekerjaan)
            },
            token
        );

        if (response.status === 200 || response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: `Data ${type} berhasil disimpan`,
                showConfirmButton: false,
                timer: 2000
            });

            await fetchParentData();
        }
    } catch (error) {
        console.error(`Error saving ${type} data:`, error);
        Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: `Gagal menyimpan data ${type}.`,
            showConfirmButton: false,
            timer: 2000
        });
    } finally {
        isLoadingParents.value = false;
    }
};

const navigateToQuiz = () => {
    const age = calculateAge(userData.value?.birth_date)

    if (age !== null && age <= 3) {
        router.push('/tk/kuisioner-kids')
    } else {
        router.push('/tk/kuisioner')
    }
}
</script>

<template>
    <Layout>
        <div
            class="w-full mb-16 md:mb-0 p-4 md:px-12 md:py-6 lg:px-16 lg:py-8 xl:px-20 xl:py-10 flex flex-col md:flex-row md:items-start gap-4 md:gap-6 font-sora bg-[#F6F6F6] min-h-screen relative">
            <ProfileSidebar :userData="userData" :activeTab="activeTab" @update:activeTab="handleTabChange" />

            <!-- Result Tab -->
            <div class="w-full md:w-[75%]">
                <PersonalTabInfo v-if="activeTab === 'informasi' && userData" :customerId="userData.id"
                    :namaDepan="namaDepan" :namaBelakang="namaBelakang" :tempatLahir="tempatLahir"
                    :tanggalLahir="tanggalLahir" :jenisKelamin="jenisKelamin" :golonganDarah="golonganDarah"
                    :suku="suku" :anak="anak" :jumlahSaudara="jumlahSaudara" :alamatRumah="alamatRumah"
                    @update:namaDepan="val => namaDepan = val" @update:namaBelakang="val => namaBelakang = val"
                    @update:tempatLahir="val => tempatLahir = val" @update:tanggalLahir="val => tanggalLahir = val"
                    @update:golonganDarah="val => golonganDarah = val" @update:alamatRumah="val => alamatRumah = val"
                    @update:suku="val => suku = val" @update:anak="val => anak = val"
                    @update:jumlahSaudara="val => jumlahSaudara = val" @update:jenisKelamin="val => jenisKelamin = val"
                    @submit="handleSubmit" :ayahData="parentData.ayah" :ibuData="parentData.ibu"
                    @update:ayahData="val => parentData.ayah = val" @update:ibuData="val => parentData.ibu = val"
                    @saveAyahData="saveParentData('ayah')" @saveIbuData="saveParentData('ibu')" />

                <ReportTab v-if="activeTab === 'report' && teacherReports.length > 0"
                    :assessmentResults="assessmentResults" :note="note" :report="report" :tk-id="tkId"
                    :showImages="false" :status="'hidden'" @downloadPDF="" @navigateToQuiz="navigateToQuiz" />

                <ReportTab v-if="activeTab === 'report-home' && parentReports.length > 0" :assessmentResults="assessmentResults"
                    :note="note" :report="report" :tk-id="tkId" :showImages="false" :status="'hidden'" @downloadPDF=""
                    @navigateToQuiz="navigateToQuiz" />

                <ReportChild v-if="activeTab === 'report-child' && psikologReports.length > 0"
                    :assessmentResults="assessmentResults" :note="note" :report="report" :tk-id="tkId"
                    :showImages="true" :status="'hidden'" :psikologData="psikologReports" :details="detailsData"
                    @downloadPDF="" @navigateToQuiz="navigateToQuiz" />

                <CheckReport v-if="activeTab === 'check-report' && userData" :anak-data="userData"
                    :ayahData="parentData.ayah" :ibuData="parentData.ibu" />

                <div v-if="activeTab === 'report' && teacherReports.length === 0"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5 flex items-center justify-center">
                    <p class="text-sm md:text-base text-gray-500">Data laporan anak di sekolah belum tersedia</p>
                </div>

                <div v-if="activeTab === 'report-home' && parentReports.length === 0"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5 flex items-center justify-center">
                    <p class="text-sm md:text-base text-gray-500">Data laporan anak di rumah belum tersedia</p>
                </div>

                <div v-if="activeTab === 'report-child' && psikologReports.length === 0"
                    class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5 flex items-center justify-center">
                    <p class="text-sm md:text-base text-gray-500">Data laporan anak belum tersedia</p>
                </div>
            </div>

            <div v-if="showCompleteDataModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <CompleteDataModal @closeModal="closeCompleteDataModal" />
            </div>

            <div v-if="showQuizModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <QuizModal @navigateToQuiz="navigateToQuiz" @closeModal="closeQuizModal" />
            </div>
        </div>
    </Layout>
</template>