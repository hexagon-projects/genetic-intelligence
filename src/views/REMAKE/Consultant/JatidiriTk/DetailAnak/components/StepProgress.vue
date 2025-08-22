<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  activeStep: Number,
  completedSteps: Array
});

const getStepName = (step) => {
    const stepMap = {
        1: 'Psikomotor',
        2: 'Kognisi',
        3: 'Emosi',
        4: 'Relasi Sosial',
        5: 'Kemandirian'
    };
    return stepMap[step];
};

const isStepCompleted = (step) => {
    return props.completedSteps.includes(step);
};

const isStepActive = (step) => {
    return props.activeStep === step;
};
</script>

<template>
    <div class="grid grid-cols-5 gap-14 pb-4 md:pb-6">
        <!-- Step 1 -->
        <div class="py-[10px] px-12 border-t border-b border-l border-[#D6C9FF] relative"
            :class="isStepCompleted(1) ? 'bg-primary text-white' : isStepActive(1) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            <div class="w-full h-full flex items-center gap-2">
                <div v-if="isStepCompleted(1)" class="flex items-center gap-2 py-1">
                    <div class="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path
                                d="M8.93925 15.6977L5.62542 12.3863C5.44686 12.2078 5.20467 12.1076 4.95215 12.1076C4.69962 12.1076 4.45744 12.2078 4.27888 12.3863C4.10032 12.5647 4 12.8067 4 13.0591C4 13.184 4.02463 13.3077 4.07248 13.4232C4.12033 13.5386 4.19046 13.6435 4.27888 13.7318L8.27075 17.7209C8.6432 18.093 9.24484 18.093 9.61729 17.7209L19.7211 7.62426C19.8997 7.44582 20 7.20381 20 6.95147C20 6.69912 19.8997 6.45711 19.7211 6.27868C19.5426 6.10024 19.3004 6 19.0479 6C18.7953 6 18.5531 6.10024 18.3746 6.27868L8.93925 15.6977Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                    <p class="text-sm">Selesai</p>
                </div>
                <div v-else>
                    <h5 class="text-sm font-medium">Step 1</h5>
                    <p class="text-[10px]">{{ getStepName(1) }}</p>
                </div>
            </div>

            <div
                class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -left-5 h-10 bg-[#f5f5f5] border-r border-b border-[#D6C9FF]">
            </div>
            <div class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -right-5 h-10 border-r border-b border-[#D6C9FF]"
                :class="isStepCompleted(1) ? 'bg-primary' : isStepActive(1) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            </div>
        </div>

        <!-- Step 2 -->
        <div class="py-[10px] px-12 border-t border-b border-l border-[#D6C9FF] relative"
            :class="isStepCompleted(2) ? 'bg-primary text-white' : isStepActive(2) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            <div class="w-full h-full flex items-center gap-2">
                <div v-if="isStepCompleted(2)" class="flex items-center gap-2 py-1">
                    <div class="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path
                                d="M8.93925 15.6977L5.62542 12.3863C5.44686 12.2078 5.20467 12.1076 4.95215 12.1076C4.69962 12.1076 4.45744 12.2078 4.27888 12.3863C4.10032 12.5647 4 12.8067 4 13.0591C4 13.184 4.02463 13.3077 4.07248 13.4232C4.12033 13.5386 4.19046 13.6435 4.27888 13.7318L8.27075 17.7209C8.6432 18.093 9.24484 18.093 9.61729 17.7209L19.7211 7.62426C19.8997 7.44582 20 7.20381 20 6.95147C20 6.69912 19.8997 6.45711 19.7211 6.27868C19.5426 6.10024 19.3004 6 19.0479 6C18.7953 6 18.5531 6.10024 18.3746 6.27868L8.93925 15.6977Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                    <p class="text-sm">Selesai</p>
                </div>
                <div v-else>
                    <h5 class="text-sm font-medium">Step 2</h5>
                    <p class="text-[10px]">{{ getStepName(2) }}</p>
                </div>
            </div>

            <div
                class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -left-5 h-10 bg-[#f5f5f5] border-r border-b border-[#D6C9FF]">
            </div>
            <div class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -right-5 h-10 border-r border-b border-[#D6C9FF]"
                :class="isStepCompleted(2) ? 'bg-primary' : isStepActive(2) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            </div>
        </div>

        <!-- Step 3 -->
        <div class="py-[10px] px-12 border-t border-b border-l border-[#D6C9FF] relative"
            :class="isStepCompleted(3) ? 'bg-primary text-white' : isStepActive(3) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            <div class="w-full h-full flex items-center gap-2">
                <div v-if="isStepCompleted(3)" class="flex items-center gap-2 py-1">
                    <div class="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path
                                d="M8.93925 15.6977L5.62542 12.3863C5.44686 12.2078 5.20467 12.1076 4.95215 12.1076C4.69962 12.1076 4.45744 12.2078 4.27888 12.3863C4.10032 12.5647 4 12.8067 4 13.0591C4 13.184 4.02463 13.3077 4.07248 13.4232C4.12033 13.5386 4.19046 13.6435 4.27888 13.7318L8.27075 17.7209C8.6432 18.093 9.24484 18.093 9.61729 17.7209L19.7211 7.62426C19.8997 7.44582 20 7.20381 20 6.95147C20 6.69912 19.8997 6.45711 19.7211 6.27868C19.5426 6.10024 19.3004 6 19.0479 6C18.7953 6 18.5531 6.10024 18.3746 6.27868L8.93925 15.6977Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                    <p class="text-sm">Selesai</p>
                </div>
                <div v-else>
                    <h5 class="text-sm font-medium">Step 3</h5>
                    <p class="text-[10px]">{{ getStepName(3) }}</p>
                </div>
            </div>

            <div
                class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -left-5 h-10 bg-[#f5f5f5] border-r border-b border-[#D6C9FF]">
            </div>
            <div class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -right-5 h-10 border-r border-b border-[#D6C9FF]"
                :class="isStepCompleted(3) ? 'bg-primary' : isStepActive(3) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            </div>
        </div>

        <!-- Step 4 -->
        <div class="py-[10px] px-12 border-t border-b border-l border-[#D6C9FF] relative"
            :class="isStepCompleted(4) ? 'bg-primary text-white' : isStepActive(4) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            <div class="w-full h-full flex items-center gap-2">
                <div v-if="isStepCompleted(4)" class="flex items-center gap-2 py-1">
                    <div class="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path
                                d="M8.93925 15.6977L5.62542 12.3863C5.44686 12.2078 5.20467 12.1076 4.95215 12.1076C4.69962 12.1076 4.45744 12.2078 4.27888 12.3863C4.10032 12.5647 4 12.8067 4 13.0591C4 13.184 4.02463 13.3077 4.07248 13.4232C4.12033 13.5386 4.19046 13.6435 4.27888 13.7318L8.27075 17.7209C8.6432 18.093 9.24484 18.093 9.61729 17.7209L19.7211 7.62426C19.8997 7.44582 20 7.20381 20 6.95147C20 6.69912 19.8997 6.45711 19.7211 6.27868C19.5426 6.10024 19.3004 6 19.0479 6C18.7953 6 18.5531 6.10024 18.3746 6.27868L8.93925 15.6977Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                    <p class="text-sm">Selesai</p>
                </div>
                <div v-else>
                    <h5 class="text-sm font-medium">Step 4</h5>
                    <p class="text-[10px]">{{ getStepName(4) }}</p>
                </div>
            </div>

            <div
                class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -left-5 h-10 bg-[#f5f5f5] border-r border-b border-[#D6C9FF]">
            </div>
            <div class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -right-5 h-10 border-r border-b border-[#D6C9FF]"
                :class="isStepCompleted(4) ? 'bg-primary' : isStepActive(4) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            </div>
        </div>

        <!-- Step 5 -->
        <div class="py-[10px] px-12 border-t border-b border-l border-[#D6C9FF] relative"
            :class="isStepCompleted(5) ? 'bg-primary text-white' : isStepActive(5) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            <div class="w-full h-full flex items-center gap-2">
                <div v-if="isStepCompleted(5)" class="flex items-center gap-2 py-1">
                    <div class="w-6 h-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" fill="none">
                            <rect width="24" height="24" rx="12" fill="white" />
                            <path
                                d="M8.93925 15.6977L5.62542 12.3863C5.44686 12.2078 5.20467 12.1076 4.95215 12.1076C4.69962 12.1076 4.45744 12.2078 4.27888 12.3863C4.10032 12.5647 4 12.8067 4 13.0591C4 13.184 4.02463 13.3077 4.07248 13.4232C4.12033 13.5386 4.19046 13.6435 4.27888 13.7318L8.27075 17.7209C8.6432 18.093 9.24484 18.093 9.61729 17.7209L19.7211 7.62426C19.8997 7.44582 20 7.20381 20 6.95147C20 6.69912 19.8997 6.45711 19.7211 6.27868C19.5426 6.10024 19.3004 6 19.0479 6C18.7953 6 18.5531 6.10024 18.3746 6.27868L8.93925 15.6977Z"
                                fill="#6464FA" />
                        </svg>
                    </div>
                    <p class="text-sm">Selesai</p>
                </div>
                <div v-else>
                    <h5 class="text-sm font-medium">Step 5</h5>
                    <p class="text-[10px]">{{ getStepName(5) }}</p>
                </div>
            </div>

            <div
                class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -left-5 h-10 bg-[#f5f5f5] border-r border-b border-[#D6C9FF]">
            </div>
            <div class="absolute w-10 -rotate-45 top-1/2 -translate-y-1/2 -right-5 h-10 border-r border-b border-[#D6C9FF]"
                :class="isStepCompleted(5) ? 'bg-primary' : isStepActive(5) ? 'bg-[#E6E7F4]' : 'bg-transparent'">
            </div>
        </div>
    </div>
</template>
