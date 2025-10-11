<script setup lang="ts">
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const router = useRouter()
const downloadingReport = ref(false);
const downloading = ref(false);

const props = defineProps<{
    id: number,
    name: string,
    total: string,
    dataSiswa: []
}>()

const detailSiswa = (id) => {
    try {
        const encodedId = btoa(id)

        router.push({
            name: 'staff.views.detail_siswa',
            query: { student_id: encodedId }
        })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Terjadi error saat navigasi ke detail siswa.",
            showConfirmButton: false,
            timer: 2000,
        });
    }
}

const handleDownload = async (id, name) => {
    console.log(id, name)
    try {
        downloadingReport.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/result-tangguh-institution/${id}`,
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
        a.download = `Report-Jatidiri Tangguh-${name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil berhasil diunduh',
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
        downloadingReport.value = false;
    }
};

const handleDownloadDataPengguna = async (id, first_name, last_name) => {
    if (!id, !first_name, !last_name) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data tidak tersedia untuk diunduh',
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
            `https://api.jatidiri.app/api/result-tangguh/${id}`,
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
        a.download = `Report-Jatidiri Tangguh-${first_name} ${last_name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil berhasil diunduh',
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
</script>

<template>
    <section class="bg-white p-4 flex flex-col rounded-xl mt-10">
        <div class="flex flex-col justify-start lg:flex-row lg:justify-between items-start lg:items-center mb-5 px-4">
            <div class="text-[#0c141c] leading-loose">
                <div class="text-xl md:text-3xl font-semibold">
                    Overview Data Pengguna
                </div>
                <span class="text-gray-500 text-sm">{{ total }} entries found</span>
            </div>

            <button @click="handleDownload(id, name)"
                class="bg-primary text-white px-4 py-2 rounded border-2 border-transparent hover:bg-white hover:border-primary hover:text-primary transition-all duration-500 flex items-center gap-2">
                {{ downloadingReport ? 'Mengunduh...' : 'Download' }}
            </button>
            <!-- <RouterLink :to="{ name: 'staff.views.list_siswa' }"
                class="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-3">
                Lihat Selengkapnya
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.25L7.75 8L1 14.75" stroke="#008AFF" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </RouterLink> -->
        </div>

        <div class="overflow-auto w-full">
            <table class="w-full border-separate border-spacing-0 text-left text-[#0c141c] text-sm leading-normal">
                <thead class="text-[#344053]">
                    <tr>
                        <th class="py-3 px-4">#</th>
                        <th class="py-3 px-4">PROFIL</th>
                        <th class="py-3 px-4">MMS</th>
                        <th class="py-3 px-4">MAP</th>
                        <th class="py-3 px-4">LBC</th>
                        <th class="py-3 px-4">BRI</th>
                        <th class="py-3 px-4">CRS</th>
                        <th class="py-3 px-4">Aksi</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in dataSiswa" :key="index" class="border-b">
                        <td class="py-3 px-4">{{ index + 1 }}</td>
                        <td class="py-3 px-4 flex items-center gap-2">
                            <img src="@/assets/img/profile-mock.png" alt="user" class="w-8 h-8 rounded-full mr-2" />
                            {{ item.first_name }} {{ item.last_name }}
                        </td>
                        <td class="py-3 px-4">{{ item.mmsStatistik.kategori }}</td>
                        <td class="py-3 px-4">{{ item.mapStatistik.kategori }}</td>
                        <td class="py-3 px-4">{{ item.lbcStatistik.kategori }}</td>
                        <td class="py-3 px-4">{{ item.briStatistik.kategori }}</td>
                        <td class="py-3 px-4">{{ item.crsStatistik.kategori }}</td>
                        <td class="py-3 px-4 flex items-center gap-2">
                            <button @click="detailSiswa(item.id)"
                                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2">
                                Lihat Detail
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.66669 8.33335L8.33335 1.66669M8.33335 1.66669H1.66669M8.33335 1.66669V8.33335"
                                        stroke="white" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
                            </button>
                            <button @click="handleDownloadDataPengguna(item.id, item.first_name, item.last_name)"
                                class="bg-white text-primary px-4 py-2 rounded border-2 border-primary hover:bg-primary hover:text-white transition-all duration-500 flex items-center gap-2">
                                {{ downloading ? 'Mengunduh...' : 'Download' }}
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>