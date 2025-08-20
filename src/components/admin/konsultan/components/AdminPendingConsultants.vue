<template>
    <section class="min-h-screen bg-gray-100 pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{ name: 'views.dashboard' }" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Users
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{ name: 'admin.views.konsultan.pending' }"
                    class="text-base text-dark hover:text-dark/70">
                    Konsultan Pending
                </RouterLink>
            </ol>
        </div>

        <!-- Approval Modal -->
        <div v-if="showApprovalModal"
            class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4">
            <div class="relative top-20 mx-auto shadow-xl rounded-md bg-white max-w-md">
                <div class="p-6">
                    <h3 class="text-lg font-medium text-gray-900">Konfirmasi Persetujuan</h3>
                    <div class="mt-2">
                        <p class="text-sm text-gray-500">Apakah Anda yakin ingin menyetujui konsultan ini?</p>
                    </div>
                    <div class="mt-4 flex justify-end space-x-3">
                        <button @click="showApprovalModal = false" type="button"
                            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                            Batal
                        </button>
                        <button @click="approveConsultant" type="button"
                            class="px-4 py-2 bg-biru text-white rounded-md hover:bg-blue-700">
                            Setujui
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">Registrasi Konsultan Pending</h1>

                    <div class="flex justify-between items-center mb-4">
                        <input v-model="cari" @input="debouncedGetSearchData" type="text" name="cari"
                            class="font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>

                    <div class="flex justify-center w-full" v-if="loading">
                        <span
                            class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                    </div>

                    <div v-else-if="pendingConsultants.length > 0 && !loading" class="overflow-x-auto">
                        <table class="w-full text-sm text-left text-gray-500">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama</th>
                                    <th scope="col" class="py-3 px-6">Email</th>
                                    <th scope="col" class="py-3 px-6">No Telp</th>
                                    <th scope="col" class="py-3 px-6">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(consultant, index) in pendingConsultants" :key="index"
                                    class="bg-white border-b">
                                    <td class="py-4 px-6">{{ index + 1 }}</td>
                                    <td class="py-4 px-6">{{ consultant.name }}</td>
                                    <td class="py-4 px-6">{{ consultant.user.email }}</td>
                                    <td class="py-4 px-6">{{ consultant.number }}</td>
                                    <td class="py-4 px-6 flex gap-2">
                                        <!-- <button @click="clickDetail(consultant.id)"
                                            class="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200">
                                            <PhFileSearch :size="18" />
                                            Detail
                                        </button> -->
                                        <button v-if="consultant.cv_path" @click="downloadCV(consultant.cv_path)"
                                            class="flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-600 rounded-md hover:bg-purple-200">
                                            <PhDownload :size="18" />
                                            CV
                                        </button>
                                        <button @click="openApprovalModal(consultant.id)"
                                            class="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200">
                                            <PhCheck :size="18" />
                                            Approve
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <span v-else-if="pendingConsultants.length == 0 && !loading"
                        class="font-myFont text-center text-dark text-lg">
                        Tidak ada konsultan pending
                    </span>

                    <div class="flex justify-between items-center mt-4">
                        <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                            Menampilkan {{ pendingConsultants.length }} dari {{ totalPending }} data.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { PhFileSearch, PhCheck, PhDownload } from '@phosphor-icons/vue';
import { onMounted, ref } from 'vue'
import initAPI from '../../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2';

export default {
    name: 'AdminPendingConsultants',
    components: { PhFileSearch, PhCheck },
    setup() {
        const router = useRouter();
        const loading = ref(false);
        const pendingConsultants = ref([]);
        const totalPending = ref(0);
        const cari = ref('');
        const isModalOpen = ref(false);
        const detailCustomers = ref(null);
        const showApprovalModal = ref(false);
        const selectedConsultantId = ref(null);

        const downloadCV = async (cvPath) => {
            try {
                const token = Cookies.get('token');
                window.open(
                    `${import.meta.env.VITE_API_BASE_URL}consultants/download-cv?path=${encodeURIComponent(cvPath)}&token=${token}`,
                    '_blank'
                );
            } catch (error) {
                console.error('Error downloading CV:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Gagal mengunduh CV',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        };

        const fetchPendingConsultants = async () => {
            loading.value = true;
            try {
                const token = Cookies.get('token');
                const response = await initAPI('get', 'consultants?status=2', null, token);
                pendingConsultants.value = response.data.data;
                totalPending.value = response.data.total;
            } catch (error) {
                console.error('Error fetching pending consultants:', error);
                if (error.response && error.response.status === 401) {
                    router.push('/login');
                    localStorage.clear();
                }
            } finally {
                loading.value = false;
            }
        };

        const openApprovalModal = (consultantId) => {
            selectedConsultantId.value = consultantId;
            showApprovalModal.value = true;
        };

        const approveConsultant = async () => {
            try {
                const token = Cookies.get('token');
                await initAPI('put', `consultants/${selectedConsultantId.value}/approve`, null, token);

                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil',
                    text: 'Konsultan telah disetujui',
                    showConfirmButton: false,
                    timer: 1500
                });

                // Refresh the list
                fetchPendingConsultants();
            } catch (error) {
                console.error('Error approving consultant:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal',
                    text: 'Gagal menyetujui konsultan',
                    showConfirmButton: false,
                    timer: 1500
                });
            } finally {
                showApprovalModal.value = false;
            }
        };

        const clickDetail = (id) => {
            const consultant = pendingConsultants.value.find(item => item.id === id);
            detailCustomers.value = consultant;
            isModalOpen.value = true;
        };

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value;
        };

        const debouncedGetSearchData = _debounce(async () => {
            if (cari.value.length >= 2) {
                loading.value = true;
                try {
                    const token = Cookies.get('token');
                    const response = await initAPI('get', `consultants?status=2&search=${cari.value}`, null, token);
                    pendingConsultants.value = response.data.data;
                } catch (error) {
                    console.error('Error searching:', error);
                } finally {
                    loading.value = false;
                }
            } else {
                fetchPendingConsultants();
            }
        }, 500);

        onMounted(() => {
            fetchPendingConsultants();
        });

        return {
            loading,
            pendingConsultants,
            totalPending,
            cari,
            isModalOpen,
            detailCustomers,
            showApprovalModal,
            selectedConsultantId,
            clickDetail,
            toggleModal,
            openApprovalModal,
            approveConsultant,
            debouncedGetSearchData,
            downloadCV
        };
    }
};
</script>