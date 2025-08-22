<script setup>
import { ref, computed } from 'vue';
import ReportChildSection from './ReportChildSection.vue';
import AssesmentChildTab from './AssesmentChildTab.vue';

const props = defineProps({
    assessmentResults: Object,
    note: String,
    report: String,
    status: String,
    tkId: Number,
    showImages: {
        type: Boolean,
        default: false
    },
    psikologData: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['downloadPDF', 'navigateToQuiz']);

const activeResultTab = ref('psikomotor');

const formattedPsikologData = computed(() => {
    if (!props.psikologData.length || !props.psikologData[0].details) return null;
    
    const details = props.psikologData[0].details;
    const result = {};
    
    details.forEach(detail => {
        const kategori = detail.kategori.toLowerCase().replace(' ', '');
        result[kategori] = {
            title: detail.kategori,
            content: detail.catatan || detail.keterangan || "Data tidak tersedia",
            score: parseInt(detail.skor) || 0
        };
    });
    
    return result;
});

const changeTab = (tabName) => {
    activeResultTab.value = tabName;
};
</script>

<template>
    <div class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
        <AssesmentChildTab 
            :assessmentResults="formattedPsikologData || assessmentResults"
            :activeResultTab="activeResultTab"
            @changeTab="changeTab"
        />

        <ReportChildSection 
            :note="note"
            :report="report"
            :showImages="showImages"
            :psikologData="psikologData"
            :status="status"
            :tkId="tkId"
            @downloadPDF="emit('downloadPDF', $event)"
        />
    </div>
</template>