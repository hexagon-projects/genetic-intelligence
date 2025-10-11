<script setup lang="ts">
import Swal from 'sweetalert2';
import { RouterLink, useRouter } from 'vue-router';
import NewButton from '../../../../../components/customer/NewButton.vue'

const router = useRouter()

defineProps<{
    idSekolah: number
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

const showReportPopup = () => {
    Swal.fire({
        title: 'Pilih Laporan',
        html: `
            <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
                <a href="https://docs.google.com/spreadsheets/d/1wd9eHTutZwvOuAOXOgKhplrvKQxzhVNH/edit?usp=drive_link&ouid=100922320326256309769&rtpof=true&sd=true" 
                   target="_blank" 
                   style="display: block; padding: 24px; border: 2px solid #e5e7eb; border-radius: 12px; text-decoration: none; color: #0c141c; width: 200px; transition: all 0.3s;"
                   onmouseover="this.style.borderColor='#3b82f6'; this.style.backgroundColor='#eff6ff';"
                   onmouseout="this.style.borderColor='#e5e7eb'; this.style.backgroundColor='white';">
                    <div style="font-size: 40px; margin-bottom: 12px;">📊</div>
                    <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">Spreadsheet</div>
                    <div style="font-size: 14px; color: #6b7280;">Lihat data dalam spreadsheet</div>
                </a>
                
                <a href="https://drive.google.com/drive/folders/18RFqXQtu03kINxCs5FkMHQeS6Ak788tR?usp=drive_link" 
                   target="_blank" 
                   style="display: block; padding: 24px; border: 2px solid #e5e7eb; border-radius: 12px; text-decoration: none; color: #0c141c; width: 200px; transition: all 0.3s;"
                   onmouseover="this.style.borderColor='#3b82f6'; this.style.backgroundColor='#eff6ff';"
                   onmouseout="this.style.borderColor='#e5e7eb'; this.style.backgroundColor='white';">
                    <div style="font-size: 40px; margin-bottom: 12px;">📁</div>
                    <div style="font-weight: 600; font-size: 16px; margin-bottom: 8px;">Drive Folder</div>
                    <div style="font-size: 14px; color: #6b7280;">Akses folder dokumen</div>
                </a>
            </div>
        `,
        showConfirmButton: false,
        showCloseButton: true,
        width: '600px',
        customClass: {
            popup: 'swal-popup-custom'
        }
    });
}
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

            <div v-if="idSekolah === 215400">
                <NewButton @click="showReportPopup" class="px-4" text-size="text-sm md:text-base" text="Lihat Semua Laporan"/>
            </div>

            <div v-else>
                <RouterLink :to="{ name: 'staff.views.list_siswa' }"
                    class="text-blue-500 hover:text-blue-700 font-medium flex items-center gap-3">
                    Lihat Selengkapnya
                    <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1.25L7.75 8L1 14.75" stroke="#008AFF" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </RouterLink>
            </div>
        </div>

        <div class="overflow-auto w-full">
            <table class="w-full border-separate border-spacing-0 text-left text-[#0c141c] text-sm leading-normal">
                <thead class="text-[#344053]">
                    <tr>
                        <th class="py-3 px-4">#</th>
                        <th class="py-3 px-4">PROFIL</th>
                        <th class="py-3 px-4">GRADE</th>
                        <th class="py-3 px-4">DIVISION</th>
                        <th class="py-3 px-4">INSTITUTION</th>
                        <th class="py-3 px-4">TERAKHIR TES</th>
                        <th class="py-3 px-4">AKSI</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item, index) in dataSiswa" :key="index" class="border-b">
                        <td class="py-3 px-4">{{ index + 1 }}</td>
                        <td class="py-3 px-4 flex items-center gap-2">
                            <img src="@/assets/img/profile-mock.png" alt="user" class="w-8 h-8 rounded-full mr-2" />
                            {{ item.name }}
                        </td>
                        <td class="py-3 px-4">{{ item.grade }}</td>
                        <td class="py-3 px-4">{{ item.majoring }}</td>
                        <td class="py-3 px-4">{{ item.institutions.name }}</td>
                        <td class="py-3 px-4">{{ item.updated_at }}</td>
                        <td class="py-3 px-4">
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
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>