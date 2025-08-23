<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
    assessmentResults: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['tab-change']);

const activeResultTab = ref('psikomotor');

const changeTab = (tabName) => {
    activeResultTab.value = tabName;
    emit('tab-change', tabName);
};
</script>

<template>
    <div class="flex-col flex">
        <!-- Tab Navigation - Responsive -->
        <div class="flex flex-wrap sm:flex-nowrap overflow-x-auto scrollbar-hide">
            <!-- Psikomotor Tab -->
            <div class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 cursor-pointer transition-all duration-300 whitespace-nowrap min-w-fit"
                :class="activeResultTab === 'psikomotor' ? 'bg-[#f5f5f5] rounded-xl md:rounded-t-xl md:rounded-b-none' : ''"
                @click="changeTab('psikomotor')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-3 h-3 sm:w-4 sm:h-4 md:w-[17px] md:h-4 flex-shrink-0" 
                     viewBox="0 0 17 16" fill="none">
                    <path d="M14.0415 8.43131L14.3861 7.14331C14.7888 5.63998 14.9908 4.88865 14.8395 4.23798C14.7195 3.72431 14.4499 3.25775 14.0648 2.89731C13.5775 2.44065 12.8255 2.23931 11.3221 1.83665C9.81881 1.43331 9.06681 1.23198 8.41681 1.38331C7.90314 1.50325 7.43658 1.77284 7.07614 2.15798C6.68481 2.57531 6.48081 3.18665 6.17748 4.29731L6.01481 4.90065L5.67014 6.18865C5.26681 7.69198 5.06548 8.44331 5.21681 9.09398C5.33675 9.60765 5.60634 10.0742 5.99148 10.4346C6.47881 10.8913 7.23081 11.0926 8.73414 11.496C10.0888 11.8586 10.8335 12.058 11.4435 11.9826C11.5101 11.9742 11.5755 11.9626 11.6395 11.948C12.153 11.8284 12.6195 11.5593 12.9801 11.1746C13.4368 10.6866 13.6381 9.93465 14.0415 8.43131Z"
                        :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'" />
                    <path d="M11.4433 11.9829C11.304 12.4098 11.0591 12.7946 10.7313 13.1015C10.244 13.5582 9.49198 13.7595 7.98865 14.1622C6.48531 14.5649 5.73331 14.7669 5.08331 14.6149C4.56972 14.4951 4.10317 14.2258 3.74265 13.8409C3.28598 13.3535 3.08398 12.6015 2.68131 11.0982L2.33665 9.81021C1.93331 8.30688 1.73198 7.55488 1.88331 6.90488C2.00325 6.3912 2.27284 5.92464 2.65798 5.56421C3.14531 5.10754 3.89731 4.90621 5.40065 4.50288C5.6842 4.42643 5.94309 4.35776 6.17731 4.29688"
                        :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'" />
                    <path d="M8.3515 6.6665L11.5715 7.52917M7.8335 8.5985L9.7655 9.11584"
                        :stroke="activeResultTab === 'psikomotor' ? '#6464FA' : '#8E8E8E'" stroke-linecap="round" />
                </svg>
                <p class="text-xs sm:text-sm" :class="activeResultTab === 'psikomotor' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">Psikomotor</p>
            </div>

            <!-- Kognisi Tab -->
            <div class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 cursor-pointer transition-all duration-300 whitespace-nowrap min-w-fit"
                :class="activeResultTab === 'kognisi' ? 'bg-[#f5f5f5] rounded-xl md:rounded-t-xl md:rounded-b-none' : ''"
                @click="changeTab('kognisi')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-3 h-3 sm:w-4 sm:h-4 md:w-[13px] md:h-3 flex-shrink-0" 
                     viewBox="0 0 13 12" fill="none">
                    <g clip-path="url(#clip0_3700_13523)">
                        <path d="M6.0035 10.5H5.3025C3.51 10.5 2.614 10.5 2.057 9.9325C1.5 9.365 1.5 8.452 1.5 6.625C1.5 4.7985 1.5 3.885 2.057 3.3175C2.614 2.75 3.51 2.75 5.3025 2.75H7.204C8.9965 2.75 9.893 2.75 10.45 3.3175C10.7285 3.6015 10.868 3.972 10.9375 4.5"
                            :stroke="activeResultTab === 'kognisi' ? '#6464FA' : '#8E8E8E'" stroke-linecap="round" />
                        <path d="M10.079 9.9145C9.99002 10.0925 9.97538 10.2985 10.0383 10.4872C10.1012 10.676 10.2365 10.832 10.4145 10.921C10.5925 11.01 10.7985 11.0246 10.9872 10.9617C11.176 10.8988 11.332 10.7635 11.421 10.5855C11.4651 10.4974 11.4913 10.4015 11.4983 10.3032C11.5053 10.2049 11.4929 10.1062 11.4617 10.0128C11.4305 9.9193 11.3813 9.83289 11.3167 9.75847C11.2522 9.68404 11.1736 9.62306 11.0855 9.579C10.9974 9.53494 10.9015 9.50867 10.8032 9.50169C10.7049 9.4947 10.6062 9.50714 10.5128 9.53830C10.4193 9.56945 10.3329 9.61871 10.2585 9.68326C10.184 9.74781 10.1231 9.82638 10.079 9.9145ZM10.079 9.9145L8.421 9.0855M8.421 9.0855C8.34543 9.2366 8.22105 9.35775 8.06802 9.42934C7.915 9.50093 7.74228 9.51875 7.57786 9.47993C7.41344 9.4411 7.26694 9.3479 7.1621 9.21542C7.05726 9.08294 7.00022 8.91894 7.00022 8.75C7.00022 8.58106 7.05726 8.41706 7.1621 8.28458C7.26694 8.1521 7.41344 8.0589 7.57786 8.02007C7.74228 7.98125 7.915 7.99907 8.06802 8.07066C8.22105 8.14225 8.34543 8.2634 8.421 8.4145M8.421 9.0855C8.4731 8.98133 8.50022 8.86647 8.50022 8.75C8.50022 8.63353 8.4731 8.51867 8.421 8.4145M10.079 7.5855C10.1226 7.67437 10.1833 7.75373 10.2577 7.81901C10.3322 7.88429 10.4187 7.93419 10.5125 7.96585C10.6063 7.9975 10.7054 8.01028 10.8042 8.00344C10.9029 7.9966 10.9993 7.97028 11.0879 7.926C11.1764 7.88172 11.2553 7.82035 11.32 7.74544C11.3847 7.67053 11.4339 7.58355 11.4648 7.48952C11.4958 7.39549 11.5078 7.29627 11.5001 7.19758C11.4925 7.09889 11.4655 7.00268 11.4205 6.9145C11.3306 6.7382 11.1747 6.60458 10.9867 6.54276C10.7987 6.48094 10.5938 6.49593 10.4169 6.58446C10.2399 6.67299 10.105 6.82788 10.0417 7.01539C9.97846 7.2029 9.99185 7.40782 10.079 7.5855ZM10.079 7.5855L8.421 8.4145M8.5 2.75L8.45 2.595C8.2025 1.825 8.079 1.44 7.7845 1.22C7.4895 1 7.0985 1 6.315 1H6.1835C5.401 1 5.0095 1 4.715 1.22C4.42 1.44 4.2965 1.825 4.049 2.595L4 2.75"
                            :stroke="activeResultTab === 'kognisi' ? '#6464FA' : '#8E8E8E'" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3700_13523">
                            <rect width="12" height="12" fill="white" transform="translate(0.5)" />
                        </clipPath>
                    </defs>
                </svg>
                <p class="text-xs sm:text-sm" :class="activeResultTab === 'kognisi' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">Kognisi</p>
            </div>

            <!-- Emosi Tab -->
            <div class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 cursor-pointer transition-all duration-300 whitespace-nowrap min-w-fit"
                :class="activeResultTab === 'emosi' ? 'bg-[#f5f5f5] rounded-xl md:rounded-t-xl md:rounded-b-none' : ''"
                @click="changeTab('emosi')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-3 h-3 sm:w-4 sm:h-4 md:w-[13px] md:h-3 flex-shrink-0" 
                     viewBox="0 0 13 12" fill="none">
                    <path d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                        :stroke="activeResultTab === 'emosi' ? '#6464FA' : '#8E8E8E'" />
                    <path d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                        :stroke="activeResultTab === 'emosi' ? '#6464FA' : '#8E8E8E'" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="text-xs sm:text-sm" :class="activeResultTab === 'emosi' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">Emosi</p>
            </div>

            <!-- Relasi Sosial Tab -->
            <div class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 cursor-pointer transition-all duration-300 whitespace-nowrap min-w-fit"
                :class="activeResultTab === 'relasiSosial' ? 'bg-[#f5f5f5] rounded-xl md:rounded-t-xl md:rounded-b-none' : ''"
                @click="changeTab('relasiSosial')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-3 h-3 sm:w-4 sm:h-4 md:w-[13px] md:h-3 flex-shrink-0" 
                     viewBox="0 0 13 12" fill="none">
                    <path d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                        :stroke="activeResultTab === 'relasiSosial' ? '#6464FA' : '#8E8E8E'" />
                    <path d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                        :stroke="activeResultTab === 'relasiSosial' ? '#6464FA' : '#8E8E8E'" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="text-xs sm:text-sm" :class="activeResultTab === 'relasiSosial' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">Relasi Sosial</p>
            </div>

            <!-- Kemandirian Tab -->
            <div class="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 cursor-pointer transition-all duration-300 whitespace-nowrap min-w-fit"
                :class="activeResultTab === 'kemandirian' ? 'bg-[#f5f5f5] rounded-xl md:rounded-t-xl md:rounded-b-none' : ''"
                @click="changeTab('kemandirian')">
                <svg xmlns="http://www.w3.org/2000/svg" 
                     class="w-3 h-3 sm:w-4 sm:h-4 md:w-[13px] md:h-3 flex-shrink-0" 
                     viewBox="0 0 13 12" fill="none">
                    <path d="M2 1.8C2 1.72044 2.03161 1.64413 2.08787 1.58787C2.14413 1.53161 2.22044 1.5 2.3 1.5H10.7C10.7796 1.5 10.8559 1.53161 10.9121 1.58787C10.9684 1.64413 11 1.72044 11 1.8V8.7C11 8.7394 10.9922 8.77841 10.9772 8.81481C10.9621 8.8512 10.94 8.88427 10.9121 8.91213C10.8843 8.93999 10.8512 8.96209 10.8148 8.97716C10.7784 8.99224 10.7394 9 10.7 9H8.63C8.58897 8.99994 8.54837 9.0083 8.5107 9.02455C8.47304 9.0408 8.4391 9.06461 8.411 9.0945L6.7185 10.893C6.69045 10.9228 6.65659 10.9466 6.61902 10.9628C6.58144 10.9791 6.54094 10.9874 6.5 10.9874C6.45906 10.9874 6.41856 10.9791 6.38098 10.9628C6.34341 10.9466 6.30955 10.9228 6.2815 10.893L4.589 9.0945C4.5609 9.06461 4.52696 9.0408 4.4893 9.02455C4.45163 9.0083 4.41103 8.99994 4.37 9H2.3C2.22044 9 2.14413 8.96839 2.08787 8.91213C2.03161 8.85587 2 8.77956 2 8.7V1.8Z"
                        :stroke="activeResultTab === 'kemandirian' ? '#6464FA' : '#8E8E8E'" />
                    <path d="M6.5 3.5L7.2125 4.7875L8.5 5.5L7.2125 6.2125L6.5 7.5L5.7875 6.2125L4.5 5.5L5.7875 4.7875L6.5 3.5Z"
                        :stroke="activeResultTab === 'kemandirian' ? '#6464FA' : '#8E8E8E'" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="text-xs sm:text-sm" :class="activeResultTab === 'kemandirian' ? 'text-[#6464FA]' : 'text-[#8E8E8E]'">Kemandirian</p>
            </div>
        </div>

        <!-- Tab Content with Animation -->
        <transition name="fade" mode="out-in">
            <div :key="activeResultTab" class="p-3 md:p-4 bg-[#F5F5F5] rounded-xl md:rounded-b-xl md:rounded-tr-xl md:rounded-tl-none space-y-3 md:space-y-4">
                <p class="text-xs sm:text-sm leading-relaxed">{{ assessmentResults[activeResultTab].content }}</p>
                <div class="py-1 sm:py-1.5 px-3 sm:px-4 rounded-full bg-primary w-fit text-xs sm:text-sm text-white">
                    Skor {{ assessmentResults[activeResultTab].score }}
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

/* Hide scrollbar but keep functionality */
.scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;  /* Chrome, Safari and Opera */
}
</style>