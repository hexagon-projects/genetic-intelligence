<!-- <script setup>
import TabIcon from './TabIcon.vue';

const props = defineProps({
    userData: Object,
    activeTab: String
});

console.log(props.userData)

const emit = defineEmits(['update:activeTab']);

const setActiveTab = (tabName) => {
    emit('update:activeTab', tabName);
};
</script> -->

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    userData: Object,
    activeTab: String
})

const imageUrl = ref('')

watch(() => props.userData, (newUserData) => {
    if (newUserData && newUserData.image) {
        imageUrl.value = 'https://api.jatidiri.app/api/open/customers/' + newUserData.image;
    } else {
        imageUrl.value = 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png';
    }
}, { immediate: true, deep: true });

const emit = defineEmits(['update:activeTab', 'imageUpload'])

const handleFileSelect = (event) => {
    emit('imageUpload', event);
};

const setActiveTab = (tabName) => {
    emit('update:activeTab', tabName);
};
</script>

<template>
    <div class="w-full md:w-[25%] p-3 md:p-6 rounded-3xl bg-white space-y-3 md:space-y-8 shadow-md shadow-black/5">
        <div class="w-full flex items-center relative">
            <img :src="imageUrl || 'https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png'" alt=""
                class="w-36 h-36 rounded-full mx-auto border border-[#CBCBFD]">

            <label for="profile-upload"
                class="absolute -bottom-4 right-1/2 transform translate-x-1/2 bg-primary p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <input id="profile-upload" type="file" accept="image/*" class="hidden" @change="handleFileSelect">
            </label>
        </div>

        <div class="space-y-2 text-center pt-4 md:pt-0">
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
                :class="activeTab === 'report' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'" @click="setActiveTab('report')">
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

            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'check-report' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="setActiveTab('check-report')">
                <TabIcon type="check-report" :active="activeTab === 'check-report'" />
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'check-report' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Catatan Pemeriksaan
                </p>
            </div>
        </div>
    </div>
</template>