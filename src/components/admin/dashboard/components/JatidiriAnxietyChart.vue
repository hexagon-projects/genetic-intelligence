<template>
    <div class="p-8 rounded-lg bg-white font-sora">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Statistik Jatidiri Anxiety</h2>

        <div class="space-y-3 mb-8">
            <div v-for="(item, index) in anxietyData" :key="item.label" class="relative group cursor-pointer"
                @mouseenter="hoveredBar = item.label" @mouseleave="hoveredBar = null">
                <div class="flex items-center space-x-3">
                    <div class="flex-1">
                        <div class="relative bg-gray-200 rounded-full h-12 overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-1000 ease-out flex items-center px-4" :class="[
                                'transform origin-left',
                                isLoaded ? 'scale-x-100' : 'scale-x-0'
                            ]" :style="{
                                backgroundColor: item.color,
                                width: `${item.percentage}%`,
                                transitionDelay: `${index * 200}ms`
                            }">
                                <p class="font-medium text-sm text-white">{{ item.label }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-show="hoveredBar === item.label"
                    class="absolute left-0 -top-12 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap z-10 shadow-lg">
                    <div class="font-semibold">{{ item.label }}</div>
                    <div>{{ item.value }} orang ({{ item.percentage }}%)</div>
                    <div
                        class="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800">
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-200 rounded-xl p-6">
            <div class="flex items-center gap-6 md:gap-8">
                <div class="bg-white p-2 rounded-lg space-y-2">
                    <div class="flex justify-between items-center gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                            <g clip-path="url(#clip0_4414_19745)">
                                <mask id="mask0_4414_19745" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                    y="0" width="24" height="25">
                                    <path d="M24 0.75H0V24.75H24V0.75Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_4414_19745)">
                                    <path
                                        d="M18.0001 7.91C17.9401 7.9 17.8701 7.9 17.8101 7.91C16.4301 7.86 15.3301 6.73 15.3301 5.33C15.3301 3.9 16.4801 2.75 17.9101 2.75C19.3401 2.75 20.4901 3.91 20.4901 5.33C20.4801 6.73 19.3801 7.86 18.0001 7.91Z"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M16.9699 15.1902C18.3399 15.4202 19.8499 15.1802 20.9099 14.4702C22.3199 13.5302 22.3199 11.9902 20.9099 11.0502C19.8399 10.3402 18.3099 10.1002 16.9399 10.3402"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M5.96998 7.91C6.02998 7.9 6.09998 7.9 6.15998 7.91C7.53998 7.86 8.63998 6.73 8.63998 5.33C8.63998 3.9 7.48998 2.75 6.05998 2.75C4.62998 2.75 3.47998 3.91 3.47998 5.33C3.48998 6.73 4.58998 7.86 5.96998 7.91Z"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M6.99994 15.1902C5.62994 15.4202 4.11994 15.1802 3.05994 14.4702C1.64994 13.5302 1.64994 11.9902 3.05994 11.0502C4.12994 10.3402 5.65994 10.1002 7.02994 10.3402"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M12.0001 15.3797C11.9401 15.3697 11.8701 15.3697 11.8101 15.3797C10.4301 15.3297 9.33008 14.1997 9.33008 12.7997C9.33008 11.3697 10.4801 10.2197 11.9101 10.2197C13.3401 10.2197 14.4901 11.3797 14.4901 12.7997C14.4801 14.1997 13.3801 15.3397 12.0001 15.3797Z"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path
                                        d="M9.09021 18.5294C7.68021 19.4694 7.68021 21.0094 9.09021 21.9494C10.6902 23.0194 13.3102 23.0194 14.9102 21.9494C16.3202 21.0094 16.3202 19.4694 14.9102 18.5294C13.3202 17.4694 10.6902 17.4694 9.09021 18.5294Z"
                                        stroke="#E26F64" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </g>
                            </g>
                            <defs>
                                <clipPath id="clip0_4414_19745">
                                    <rect width="24" height="24" fill="white" transform="translate(0 0.75)" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {{ extremePercentage }}%
                        </div>
                    </div>

                    <div class="flex items-center gap-4">
                        <div class="text-4xl font-bold text-gray-800">
                            <span ref="extremeCountRef">0</span>
                        </div>
                        <div>
                            <div class="text-gray-600 text-sm">
                                Orang Mengalami<br>Kecemasan Ekstrem
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-left">
                    <div class="flex gap-4 items-end">
                        <div class="text-4xl font-bold text-gray-800">
                            <span ref="minimalCountRef">0</span>
                        </div>
                        <div class="bg-white text-green-500 px-3 py-1 rounded-full text-sm font-medium">
                            <span ref="minimalPercentRef">0</span>%
                        </div>
                    </div>
                    <div class="text-gray-600 text-sm mt-1">
                        Orang Mengalami<br>
                        Kecemasan Minimal (relatif bebas dari kecemasan)
                    </div>
                </div>
            </div>
        </div>

        <div class="w-fit flex items-center justify-between agp-6 md:gap-8 mt-6">
            <span class="text-sm text-gray-500">Rendah</span>
            <div class="flex space-x-1">
                <div v-for="(color, index) in gradientColors" :key="index" class="w-4 h-4 rounded-sm"
                    :style="{ backgroundColor: color }"></div>
            </div>
            <span class="text-sm text-gray-500">Tinggi</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, watch } from 'vue'

interface AnxietyLevel {
    label: string
    value: number
    percentage: number
    color: string
}

interface AnxietyStatistic {
    id: number
    name: string
    score_from: string
    score_to: string
    count: number
    percent: number
}

interface AnxietyData {
    total: number
    statistics: AnxietyStatistic[]
}

const props = defineProps<{
    anxietyData: AnxietyData
}>()

const isLoaded = ref(false)
const hoveredBar = ref<string | null>(null)
const extremeCountRef = ref<HTMLElement>()
const minimalCountRef = ref<HTMLElement>()
const minimalPercentRef = ref<HTMLElement>()

const anxietyData = computed<AnxietyLevel[]>(() => {
    if (!props.anxietyData?.statistics) return []
    
    const colors = ['#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c']
    
    return props.anxietyData.statistics.map((stat, index) => ({
        label: stat.name,
        value: stat.count,
        percentage: stat.percent,
        color: colors[index] || '#ea580c'
    }))
})

const extremeAnxiety = computed(() => {
    return props.anxietyData?.statistics?.find(stat => 
        stat.name.toLowerCase().includes('ekstrem')
    ) || { count: 0, percent: 0 }
})

const minimalAnxiety = computed(() => {
    return props.anxietyData?.statistics?.find(stat => 
        stat.name.toLowerCase().includes('minimal')
    ) || { count: 0, percent: 0 }
})

const extremePercentage = computed(() => {
    return Math.round(extremeAnxiety.value.percent)
})

const gradientColors = ['#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c']

const animateNumber = (element: HTMLElement | undefined, target: number, duration: number = 2000) => {
    if (!element) return

    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
        start += increment
        if (start >= target) {
            element.textContent = target.toString()
            clearInterval(timer)
        } else {
            element.textContent = Math.floor(start).toString()
        }
    }, 16)
}

watch(() => props.anxietyData, () => {
    if (props.anxietyData) {
        setTimeout(() => {
            animateNumber(extremeCountRef.value, extremeAnxiety.value.count)
            animateNumber(minimalCountRef.value, minimalAnxiety.value.count)
            animateNumber(minimalPercentRef.value, Math.round(minimalAnxiety.value.percent))
        }, 800)
    }
}, { immediate: true })

onMounted(async () => {
    await nextTick()

    setTimeout(() => {
        isLoaded.value = true
    }, 300)
})
</script>