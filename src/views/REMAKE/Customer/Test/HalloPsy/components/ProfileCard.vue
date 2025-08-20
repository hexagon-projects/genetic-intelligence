<script setup>
defineProps({
    image: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: String
    },
    rating: {
        type: Number
    },
    reviews: {
        type: Number
    }
})
</script>

<template>
    <div
        class="w-full h-full flex gap-4 items-center bg-white rounded-3xl p-2 md:p-3 cursor-pointer ">
        <div class="w-[40%] h-[124px] md:h-[120px] lg:h-[120px] xl:h-[120px] bg-primary rounded-2xl">
            <img :src="image" alt="" class="w-full h-full object-cover object-top">
        </div>
        <div class="w-[60%] h-full flex flex-col justify-center items-start gap-1">
            <h3 class="text-base md:text-xl font-medium">{{ name }}</h3>
            <p class="text-xs md:text-base font-light">{{ role }}</p>
            <div class="flex items-center gap-2 font-light">
                <div class="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 13"
                        class="w-[0.8em] h-[1em] md:w-[1em] md:h-[1em]">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M5.5146 2.51156C5.74166 2.16281 6.25834 2.16281 6.4854 2.51156L7.64858 4.29816C7.72671 4.41816 7.84764 4.50484 7.98746 4.54106L10.0692 5.08035C10.4756 5.18562 10.6353 5.6704 10.3692 5.9912L9.00634 7.63467C8.91481 7.74505 8.86861 7.88531 8.8769 8.02769L9.00032 10.1476C9.02441 10.5614 8.60641 10.861 8.21493 10.7105L6.20944 9.93965C6.07474 9.88787 5.92526 9.88787 5.79056 9.93965L3.78507 10.7105C3.39359 10.861 2.97559 10.5614 2.99968 10.1476L3.1231 8.02769C3.13139 7.88531 3.08519 7.74505 2.99366 7.63467L1.63077 5.9912C1.36474 5.6704 1.5244 5.18562 1.93077 5.08035L4.01254 4.54106C4.15236 4.50484 4.27329 4.41816 4.35142 4.29816L5.5146 2.51156ZM4.97994 4.70737L6 3.14061L7.02006 4.70737C7.2013 4.98575 7.48011 5.18439 7.79938 5.2671L9.60705 5.73537L8.42902 7.15592C8.21703 7.41156 8.10878 7.73822 8.12817 8.07128L8.23551 9.91494L6.47853 9.23958C6.17062 9.12123 5.82938 9.12123 5.52147 9.23958L3.76449 9.91494L3.87183 8.07128C3.89122 7.73822 3.78297 7.41156 3.57098 7.15592L2.39296 5.73537L4.20062 5.2671C4.51989 5.18439 4.7987 4.98575 4.97994 4.70737Z"
                            fill="#835EFF" />
                    </svg>
                    <p class="text-[10px] md:text-xs leading-none">{{ rating }}</p>
                </div>
                |
                <p class="text-[10px] md:text-xs">{{ reviews }} Reviews</p>
            </div>
        </div>
    </div>
</template>