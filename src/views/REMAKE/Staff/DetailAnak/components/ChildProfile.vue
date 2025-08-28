<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    activeTab: {
        type: String,
        required: true
    },
    userData: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['update:activeTab']);

const updateTab = (tabName) => {
    emit('update:activeTab', tabName);
};
</script>

<template>
    <div class="w-full md:w-[25%] p-3 md:p-6 rounded-3xl bg-white space-y-3 md:space-y-8 shadow-md shadow-black/5">
        <div class="w-full flex items-center">
            <img src="https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png" alt=""
                class="w-36 h-36 rounded-full mx-auto border border-[#CBCBFD]">
        </div>

        <div class="space-y-2 text-center">
            <h2 class="font-bold text-base md:text-2xl">{{ userData?.name }}</h2>
            <p class="ttext-sm md:text-base">{{ userData?.gender }}</p>
        </div>

        <!-- Navigation Tabs -->
        <div class="space-y-2">
            <!-- Personal Information Tab -->
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'informasi' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="updateTab('informasi')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_3752_841)">
                        <mask id="mask0_3752_841" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                            width="24" height="24">
                            <path d="M24 0H0V24H24V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_3752_841)">
                            <path
                                d="M12.1596 11.62C12.1296 11.62 12.1096 11.62 12.0796 11.62C12.0296 11.61 11.9596 11.61 11.8996 11.62C8.99957 11.53 6.80957 9.25 6.80957 6.44C6.80957 3.58 9.13957 1.25 11.9996 1.25C14.8596 1.25 17.1896 3.58 17.1896 6.44C17.1796 9.25 14.9796 11.53 12.1896 11.62C12.1796 11.62 12.1696 11.62 12.1596 11.62ZM11.9996 2.75C9.96957 2.75 8.30957 4.41 8.30957 6.44C8.30957 8.44 9.86957 10.05 11.8596 10.12C11.9096 10.11 12.0496 10.11 12.1796 10.12C14.1396 10.03 15.6796 8.42 15.6896 6.44C15.6896 4.41 14.0296 2.75 11.9996 2.75Z"
                                :fill="activeTab === 'informasi' ? '#6464FA' : '#D8D8FE'" />
                            <path
                                d="M12.1696 22.55C10.2096 22.55 8.23961 22.05 6.74961 21.05C5.35961 20.13 4.59961 18.87 4.59961 17.5C4.59961 16.13 5.35961 14.86 6.74961 13.93C9.74961 11.94 14.6096 11.94 17.5896 13.93C18.9696 14.85 19.7396 16.11 19.7396 17.48C19.7396 18.85 18.9796 20.12 17.5896 21.05C16.0896 22.05 14.1296 22.55 12.1696 22.55ZM7.57961 15.19C6.61961 15.83 6.09961 16.65 6.09961 17.51C6.09961 18.36 6.62961 19.18 7.57961 19.81C10.0696 21.48 14.2696 21.48 16.7596 19.81C17.7196 19.17 18.2396 18.35 18.2396 17.49C18.2396 16.64 17.7096 15.82 16.7596 15.19C14.2696 13.53 10.0696 13.53 7.57961 15.19Z"
                                :fill="activeTab === 'informasi' ? '#6464FA' : '#D8D8FE'" />
                        </g>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_3752_841" x1="11.9996" y1="1.25" x2="11.9996" y2="11.62"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_3752_841" x1="12.1696" y1="12.4375" x2="12.1696" y2="22.55"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <clipPath id="clip0_3752_841">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'informasi' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Informasi Pribadi
                </p>
            </div>

            <!-- School Report Tab -->
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'" @click="updateTab('report')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_school)">
                        <path d="M5 13.5H11V15.5H5V13.5ZM5 9.5H19V11.5H5V9.5ZM5 17.5H15V19.5H5V17.5Z" 
                              :fill="activeTab === 'report' ? '#6464FA' : '#D8D8FE'"/>
                        <path d="M19 3.5H17V2.5C17 2.10218 16.842 1.72064 16.5607 1.43934C16.2794 1.15804 15.8978 1 15.5 1H8.5C8.10218 1 7.72064 1.15804 7.43934 1.43934C7.15804 1.72064 7 2.10218 7 2.5V3.5H5C4.60218 3.5 4.22064 3.65804 3.93934 3.93934C3.65804 4.22064 3.5 4.60218 3.5 5V21C3.5 21.3978 3.65804 21.7794 3.93934 22.0607C4.22064 22.342 4.60218 22.5 5 22.5H19C19.3978 22.5 19.7794 22.342 20.0607 22.0607C20.342 21.7794 20.5 21.3978 20.5 21V5C20.5 4.60218 20.342 4.22064 20.0607 3.93934C19.7794 3.65804 19.3978 3.5 19 3.5ZM8.5 2.5H15.5V5.5H8.5V2.5ZM19 21H5V5.5H7V7.5H17V5.5H19V21Z" 
                              :fill="activeTab === 'report' ? '#6464FA' : '#D8D8FE'"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_school" x1="12" y1="9.5" x2="12" y2="19.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_school" x1="12" y1="1" x2="12" y2="22.5" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <clipPath id="clip0_school">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak Di Sekolah
                </p>
            </div>

            <!-- Home Report Tab -->
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report-home' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="updateTab('report-home')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_home)">
                        <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" 
                              :fill="activeTab === 'report-home' ? '#6464FA' : '#D8D8FE'"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_home" x1="12" y1="3" x2="12" y2="20" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <clipPath id="clip0_home">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report-home' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak Di Rumah
                </p>
            </div>

            <!-- Child Report Tab -->
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'report-child' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="updateTab('report-child')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_child)">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V7H9V5.5L3 7V9L10 11V13H8V21H10V14H14V21H16V13H14V11L21 9Z" 
                              :fill="activeTab === 'report-child' ? '#6464FA' : '#D8D8FE'"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_child" x1="12" y1="2" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <clipPath id="clip0_child">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'report-child' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Report Pertumbuhan Anak
                </p>
            </div>

            <!-- Check Report Tab -->
            <div class="p-4 rounded-full cursor-pointer transition-all duration-500 flex items-center gap-2"
                :class="activeTab === 'check-report' ? 'bg-[#D8D8FE]' : 'hover:bg-[#D8D8FE]'"
                @click="updateTab('check-report')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_check)">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" 
                              :fill="activeTab === 'check-report' ? '#6464FA' : '#D8D8FE'"/>
                    </g>
                    <defs>
                        <linearGradient id="paint0_linear_check" x1="12" y1="5.59" x2="12" y2="19" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#6464FA" />
                            <stop offset="1" stop-color="#3B3B94" />
                        </linearGradient>
                        <clipPath id="clip0_check">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="transition-all duration-500 text-sm md:text-base"
                    :class="activeTab === 'check-report' ? 'text-primary' : 'text-[#8E8E8E] group-hover:text-primary'">
                    Catatan Pertumbuhan Anak
                </p>
            </div>
        </div>
    </div>
</template>