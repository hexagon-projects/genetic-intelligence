<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import MonthProgress from './MonthProgress.vue';
import AssessmentTabs from './AssessmentTabs.vue';
import ReportDownload from './ReportDownload.vue';

const props = defineProps({
    reports: {
        type: Array,
        default: () => []
    },
    note: {
        type: String,
        required: true
    },
    report: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    tkId: {
        type: String,
        required: true
    },
    ageUser: {
        type: Number,
        required: true
    },
});

const emit = defineEmits(['navigate-to-quiz', 'download-pdf']);
const activeReportIndex = ref(0);

const handleDownloadPDF = (filename) => {
    emit('download-pdf', filename);
};

const assessmentResults = (report) => {
    if (props.ageUser !== null && props.ageUser <= 3) {
        return {
            kesimpulan: {
                title: "Kesimpulan",
                content: report.customer?.kid?.description || "Tidak ada data",
                score: parseFloat(report.customer?.kid?.score_to) || 0
            },
            psikomotor: {
                title: "Psikomotor",
                content: report.psikomotorik?.desc || "Tidak ada data",
                score: parseFloat(report.customer.psikomotorik) || 0
            },
            kognisi: {
                title: "Kognisi",
                content: report.kognisi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.kognisi) || 0
            },
            emosi: {
                title: "Emosi",
                content: report.emosi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.emosi) || 0
            },
            relasiSosial: {
                title: "Relasi Sosial",
                content: report.relasi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.relasi) || 0
            },
            kemandirian: {
                title: "Kemandirian",
                content: report.mandiri?.desc || "Tidak ada data",
                score: parseFloat(report.customer.mandiri) || 0
            }
        }
    } else {
        return {
            kesimpulan: {
                title: "Kesimpulan",
                content: report.customer?.tk?.desc || "Tidak ada data",
                score: parseFloat(report.customer?.tk?.score_to) || 0
            },
            psikomotor: {
                title: "Psikomotor",
                content: report.psikomotorik?.desc || "Tidak ada data",
                score: parseFloat(report.customer.psikomotorik) || 0
            },
            kognisi: {
                title: "Kognisi",
                content: report.kognisi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.kognisi) || 0
            },
            emosi: {
                title: "Emosi",
                content: report.emosi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.emosi) || 0
            },
            relasiSosial: {
                title: "Relasi Sosial",
                content: report.relasi?.desc || "Tidak ada data",
                score: parseFloat(report.customer.relasi) || 0
            },
            kemandirian: {
                title: "Kemandirian",
                content: report.mandiri?.desc || "Tidak ada data",
                score: parseFloat(report.customer.mandiri) || 0
            }
        }
    }
}
</script>

<template>
    <div class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
        <!-- Loading State -->
        <div v-if="loading" class="text-center py-8">
            <p>Memuat data laporan...</p>
        </div>

        <!-- Empty State -->
        <div v-else-if="reports.length === 0" class="text-center py-8">
            <p>Belum ada data laporan anak di sekolah</p>
        </div>

        <!-- Data Available -->
        <div v-else>
            <!-- Report Selection -->
            <div v-if="reports.length > 1" class="flex gap-2 mb-4">
                <!-- <button 
                    v-for="(report, index) in reports" 
                    :key="index"
                    @click="activeReportIndex = index"
                    class="px-4 py-2 rounded-full text-sm"
                    :class="activeReportIndex === index 
                        ? 'bg-[#6464FA] text-white' 
                        : 'bg-gray-200 text-gray-700'"
                >
                    Laporan {{ index + 1 }}
                </button> -->
            </div>

            <!-- Month Progress -->
            <!-- <MonthProgress /> -->

            <!-- Assessment Tabs -->
            <AssessmentTabs :assessmentResults="assessmentResults(reports[activeReportIndex])" />

            <!-- Report Download -->
            <ReportDownload :report="report" :tk-id="tkId" @download-pdf="handleDownloadPDF" :status="'hidden'" />
        </div>
    </div>
</template>