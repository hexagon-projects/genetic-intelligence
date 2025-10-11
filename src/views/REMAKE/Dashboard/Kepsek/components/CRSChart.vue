<template>
    <div
        class="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col lg:flex-row lg:items-end items-start gap-6 md:gap-8 h-full">
        <!-- Header Section -->
        <div class="w-fit mb-8">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Clinical
                Readiness Scale (CRS)
            </h2>

            <div class="flex flex-col items-start gap-4 mb-2">
                <div class="px-4 py-2 rounded-full bg-green-500 text-white flex items-center gap-2">
                    <span class="text-sm md:text-base font-medium transition-all duration-1000"
                        :class="{ 'animate-pulse': isLoading }">
                        {{ isLoading ? '--' : highestPercentage }}%
                    </span>
                    <!-- <div class="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <div class="w-3 h-3 rounded-full bg-purple-400"></div>
                    </div> -->
                </div>
                <div class="flex items-end gap-4">
                    <span class="text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-1000"
                        :class="{ 'animate-pulse': isLoading }">
                        {{ isLoading ? '--' : highestValue }}
                    </span>
                    <p class="text-gray-500 text-sm md:text-base transition-opacity duration-1000"
                        :class="{ 'opacity-50': isLoading }">
                        {{ dominantCategory }}
                    </p>
                </div>
            </div>

        </div>

        <div class="w-full relative">
            <div class="flex items-end justify-between gap-2 md:gap-4 h-64 md:h-80 mb-4">
                <div v-for="(value, index) in chartData" :key="index"
                    class="h-full flex flex-col items-end flex-1 cursor-pointer transition-transform duration-300 hover:scale-105"
                    @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null">

                    <div v-if="index === highestIndex"
                        class="absolute left-1/2 transform -translate-x-1/2 transition-all duration-500"
                        :style="{ left: `${(index + 0.5) * (100 / chartData.length)}%` }">
                        <div class="text-white px-2 py-1 rounded text-xs font-medium"
                            :class="getBarColor(index, value)">
                            {{ Math.round(getPercentage(value)) }}%
                        </div>
                        <div class="w-3 h-3 rounded-full mx-auto mt-1" :class="getBarColor(index, value)"></div>
                    </div>

                    <div v-if="hoveredIndex === index"
                        class="absolute -top-10 left-1/2 transform -translate-x-1/2 transition-all duration-300 z-10"
                        :style="{ left: `${(index + 0.5) * (100 / chartData.length)}%` }">
                        <div class="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                            {{ value }} pengguna
                        </div>
                        <div class="w-2 h-2 bg-gray-800 rotate-45 mx-auto -mt-1"></div>
                    </div>

                    <div class="w-full rounded-t-lg relative mt-auto overflow-hidden transition-all duration-1000 ease-out"
                        :class="getBarColor(index, value)" :style="{
                            height: isLoading ? '20%' : `${getBarHeight(value)}%`,
                            transform: isLoading ? 'scaleY(0)' : 'scaleY(1)',
                            transformOrigin: 'bottom'
                        }">
                        <div v-if="isLoading"
                            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse">
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between gap-2 md:gap-4 text-xs md:text-sm text-gray-500">
                <div v-for="(category, index) in categories" :key="index"
                    class="flex-1 text-center transition-all duration-300"
                    :class="{ 'font-semibold': index === highestIndex || hoveredIndex === index }"
                    :style="{ color: index === highestIndex || hoveredIndex === index ? getColorCode(index) : '' }">
                    <div v-if="category.includes('&')" class="font-medium text-[9px] md:text-sm lg:text-base">
                        <div>{{ category.split(' & ')[0] }} &</div>
                        <div>{{ category.split(' & ')[1] }}</div>
                    </div>
                    <div v-else class="font-medium text-[9px] md:text-sm lg:text-base">{{ category }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface StatistikItem {
    kategori: string
    score_from: number
    score_to: number
    total_customer: number
}

interface Props {
    data?: StatistikItem[]
    loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    loading: false
})

const categories = [
    'Sangat Siap',
    'Cukup Siap',
    'Kurang Siap',
    'Tidak Siap',
]

const hoveredIndex = ref<number | null>(null)
const isLoading = ref(true)

const chartData = computed(() => {
    if (!props.data || props.data.length === 0) {
        return [0, 0, 0, 0]
    }
    return props.data.map(item => item.total_customer)
})

const totalValue = computed(() =>
    chartData.value.reduce((sum, val) => sum + val, 0)
)

const highestValue = computed(() =>
    Math.max(...chartData.value)
)

const highestIndex = computed(() =>
    chartData.value.findIndex(val => val === highestValue.value)
)

const highestPercentage = computed(() =>
    totalValue.value > 0 ? Math.round((highestValue.value / totalValue.value) * 100) : 0
)

const dominantCategory = computed(() => {
    const category = categories[highestIndex.value]
    return category?.replace(' & ', '<br />& ') || ''
})

const getBarHeight = (value: number): number => {
    if (totalValue.value === 0) return 0
    const percentage = (value / highestValue.value) * 100
    return Math.max(percentage * 0.8, 10)
}

const getPercentage = (value: number): number => {
    return totalValue.value > 0 ? (value / totalValue.value) * 100 : 0
}

const getColorCode = (index: number): string => {
    const colorCodes = ['#1FC16B', '#F6A537', '#DD6E7D', '#FB3748']
    return colorCodes[index]
}

const getBarColor = (index: number, value: number): string => {
    const isHighest = value === highestValue.value
    const isHovered = hoveredIndex.value === index

    const colorClasses = [
        'bg-[#1FC16B]',
        'bg-[#F6A537]',
        'bg-[#DD6E7D]',
        'bg-[#FB3748]'
    ]

    if (isHighest) {
        return colorClasses[index]
    } else if (isHovered) {
        return colorClasses[index]
    } else {
        return colorClasses[index]
    }
}

const animateOnLoad = () => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
}

onMounted(() => {
    animateOnLoad()
})

watch(() => props.data, () => {
    if (!props.loading) {
        isLoading.value = true
        animateOnLoad()
    }
})

watch(() => props.loading, (newLoading) => {
    isLoading.value = newLoading
    if (!newLoading) {
        animateOnLoad()
    }
})
</script>

<style scoped>
@keyframes slideUp {
    from {
        transform: scaleY(0);
    }

    to {
        transform: scaleY(1);
    }
}

.bar-enter-active {
    animation: slideUp 0.8s ease-out;
    transform-origin: bottom;
}

.cursor-pointer:hover {
    z-index: 10;
}

@media (max-width: 768px) {
    .flex-1 {
        min-width: 0;
    }
}
</style>