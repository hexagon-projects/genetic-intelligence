<script setup>
import TabIcon from './TabIcon.vue';

const props = defineProps({
    userData: Object,
    activeTab: String
});

const emit = defineEmits(['update:activeTab']);

const setActiveTab = (tabName) => {
    emit('update:activeTab', tabName);
};
</script>

<template>
    <div class="w-full md:w-[25%] p-3 md:p-6 rounded-3xl bg-white space-y-3 md:space-y-8 shadow-md shadow-black/5">
        <div class="w-full flex items-center">
            <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt="" class="w-24 h-24 md:w-36 md:h-36 rounded-full mx-auto border border-[#CBCBFD]">
        </div>

        <div class="space-y-2 text-center">
            <h2 class="font-bold text-base md:text-2xl">{{ userData?.name }}</h2>
            <p class="text-sm md:text-base">{{ userData?.gender || 'Jenis Kelamin' }}</p>
        </div>

        <!-- List Tab -->
        <div class="space-y-2">
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'informasi' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="setActiveTab('informasi')">
                <TabIcon type="user" :active="activeTab === 'informasi'" />
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'informasi' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Informasi Pribadi
                </p>
            </div>

            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="setActiveTab('report')">
                <TabIcon type="report" :active="activeTab === 'report'" />
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak di Sekolah
                </p>
            </div>

            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report-home' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="setActiveTab('report-home')">
                <TabIcon type="report" :active="activeTab === 'report-home'" />
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report-home' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak di Rumah
                </p>
            </div>

            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report-child' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="setActiveTab('report-child')">
                <TabIcon type="report" :active="activeTab === 'report-child'" />
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report-child' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak
                </p>
            </div>
        </div>
    </div>
</template>