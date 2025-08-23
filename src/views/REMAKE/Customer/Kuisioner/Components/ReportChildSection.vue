<script setup>
const props = defineProps({
    note: String,
    report: String,
    status: String,
    showImages: {
        type: Boolean,
        default: false
    },
    psikologData: {
        type: Array,
        default: () => []
    },
    tkId: String
});

const emit = defineEmits(['downloadPDF']);

const getImageUrl = (filePath) => {
    if (!filePath) return '';
    return `https://api.jatidiri.app/storage/${filePath}`;
};

const handleDownload = (reportName) => {
    if (props.tkId) {
        window.location.href = `https://api.jatidiri.app/api/result-anak/${props.tkId}`;
    } else {
        emit('downloadPDF', reportName);
    }
};
</script>

<template>
    <div class="space-y-4 mt-4">
        <!-- Menampilkan rekomendasi dari data psikolog -->
        <div v-if="psikologData && psikologData.length > 0">
            <div v-for="report in psikologData" :key="report.id" class="space-y-4">
                <div v-if="report.rekomendasi" class="space-y-2">
                    <p class="text-xs text-[#8E8E8E] font-semibold">Rekomendasi</p>
                    <div class="w-full bg-[#F5F5F5] p-4 rounded-xl">
                        <p class="text-xs">{{ report.rekomendasi }}</p>
                    </div>
                </div>

                <!-- Menampilkan dokumentasi dari data psikolog -->
                <div v-if="report.documentations && report.documentations.length > 0" class="space-y-2">
                    <p class="text-xs text-[#8E8E8E] font-semibold">Dokumentasi Observasi</p>
                    <div class="flex flex-wrap items-center gap-4">
                        <div v-for="doc in report.documentations" :key="doc.id">
                            <img :src="getImageUrl(doc.file)" :alt="doc.title || 'Dokumentasi'"
                                class="w-32 h-32 rounded-xl object-cover border">
                        </div>
                    </div>
                </div>

                <!-- Menampilkan detail asesmen psikolog -->
                <!-- <div v-if="report.details && report.details.length > 0" class="space-y-4">
                    <div v-for="detail in report.details" :key="detail.id" class="space-y-2">
                        <p class="text-xs text-[#8E8E8E] font-semibold">{{ detail.kategori }}</p>
                        <div class="w-full bg-[#F5F5F5] p-4 rounded-xl">
                            <p class="text-xs font-medium">Skor: {{ detail.skor }}</p>
                            <p class="text-xs mt-2">Keterangan: {{ detail.keterangan }}</p>
                            <p class="text-xs mt-1">Catatan: {{ detail.catatan }}</p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>

        <!-- Tampilan default jika tidak ada data psikolog -->
        <div v-else class="space-y-2" :class="[status || '']">
            <p class="text-xs text-[#8E8E8E] font-semibold">Catatan</p>
            <div class="w-full bg-[#F5F5F5] p-4 rounded-xl">
                <p class="text-xs">{{ note }}</p>
            </div>
        </div>

        <div v-if="tkId" class="space-y-2">
            <p class="text-xs text-[#8E8E8E] font-semibold">Laporan</p>
            <div class="w-full bg-[#F5F5F5] p-4 rounded-xl flex justify-between items-center">
                <a class="text-xs text-primary">{{ report }}</a>
                <button @click="handleDownload(report)" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                        <!-- SVG icon code tetap sama -->
                        <g clip-path="url(#clip0_3700_13584)">
                            <mask id="mask0_3700_13584" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="25" height="24">
                                <path d="M24.5 0H0.5V24H24.5V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_3700_13584)">
                                <path
                                    d="M21 10.19H18.11C15.74 10.19 13.81 8.26 13.81 5.89V3C13.81 2.45 13.36 2 12.81 2H8.57C5.49 2 3 4 3 7.57V16.43C3 20 5.49 22 8.57 22H16.43C19.51 22 22 20 22 16.43V11.19C22 10.64 21.55 10.19 21 10.19ZM12.78 15.78L10.78 17.78C10.71 17.85 10.62 17.91 10.53 17.94C10.44 17.98 10.35 18 10.25 18C10.15 18 10.06 17.98 9.97 17.94C9.89 17.91 9.81 17.85 9.75 17.79C9.74 17.78 9.73 17.78 9.73 17.77L7.73 15.77C7.44 15.48 7.44 15 7.73 14.71C8.02 14.42 8.5 14.42 8.79 14.71L9.5 15.44V11.25C9.5 10.84 9.84 10.5 10.25 10.5C10.66 10.5 11 10.84 11 11.25V15.44L11.72 14.72C12.01 14.43 12.49 14.43 12.78 14.72C13.07 15.01 13.07 15.49 12.78 15.78Z"
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
    </div>
</template>