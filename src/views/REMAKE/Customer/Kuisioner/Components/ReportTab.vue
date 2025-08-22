<script setup>
import { ref } from 'vue';
import AssesmentTab from './AssesmentTab.vue';
import ReportSection from './ReportSection.vue';

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

const changeTab = (tabName) => {
    activeResultTab.value = tabName;
};
</script>

<template>
    <div class="w-full bg-white p-6 rounded-3xl space-y-4 md:space-y-6 shadow-md shadow-black/5">
        <AssesmentTab 
            :assessmentResults="assessmentResults"
            :activeResultTab="activeResultTab"
            @changeTab="changeTab"
        />

        <ReportSection 
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