<template>
    <div class="w-full flex justify-center items-center gap-4 md:gap-6 lg:gap-8">
        <!-- Progress Indicator -->
        <div class="flex flex-col justify-center items-center gap-3">
            <div class="w-full h-4 rounded-xl relative bg-[#CBCBFD40]"></div>
            <p class="text-base font-medium">1/12</p>
            <p class="text-base">Progres Kuesioner</p>
        </div>

        <!-- Monthly Progress List -->
        <div class="flex flex-wrap gap-4 items-center">
            <!-- January - Completed -->
            <div class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <rect y="0.5" width="24" height="24" rx="12" fill="#6464FA" />
                    <path d="M6 13.4091L10.2857 17.5L18 8.5" stroke="#E6E6E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="text-base">Jan</p>
            </div>
            
            <!-- February to December - Pending -->
            <div v-for="month in ['Feb', 'Mar', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']" :key="month" class="space-y-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                    <rect x="1" y="1.5" width="22" height="22" rx="11" stroke="#6464FA" stroke-opacity="0.35" stroke-width="2" />
                    <path d="M6 12.5H12M12 12.5H18M12 12.5V6.5M12 12.5V18.5" stroke="#6464FA" stroke-opacity="0.35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p class="text-base">{{ month }}</p>
            </div>
        </div>
    </div>
</template>