<template>
    <div class="w-full h-full bg-white rounded-3xl p-8 animate-fade-in flex flex-col justify-between">
        <div class="w-full h-full flex justify-center items-center gap-4">
            <div class="flex justify-center items-center bg-white w-full">
                <div class="relative w-full max-w-4xl h-64 xl:h-72">
                    <svg viewBox="0 60 500 200" class="w-full h-full" @mouseleave="resetHover">
                        <!-- bar 1 (Hijau) -->
                        <!-- Track -->
                        <path d="M 50 250 A 200 200 0 0 1 450 250" fill="none" stroke="#d1fae5" stroke-width="20"
                            stroke-linecap="round" />
                        <!-- Progress -->
                        <path ref="greenBar" d="M 50 250 A 200 200 0 0 1 450 250" fill="none"
                            :stroke="hoveredBar === 'green' ? '#16a34a' : '#22c55e'"
                            :stroke-width="hoveredBar === 'green' ? '24' : '20'" stroke-linecap="round"
                            :stroke-dasharray="628" :stroke-dashoffset="greenOffset"
                            class="transition-all duration-300 cursor-pointer"
                            @mouseenter="handleHover('green', 'Tinggi', statisticsData['Tinggi'].value)"
                            @mousemove="updateTooltipPosition" />

                        <!-- bar 2 (Kuning) -->
                        <!-- Track -->
                        <path d="M 90 250 A 160 160 0 0 1 410 250" fill="none" stroke="#fef3c7" stroke-width="20"
                            stroke-linecap="round" />
                        <!-- Progress -->
                        <path ref="yellowBar" d="M 90 250 A 160 160 0 0 1 410 250" fill="none"
                            :stroke="hoveredBar === 'yellow' ? '#d97706' : '#facc15'"
                            :stroke-width="hoveredBar === 'yellow' ? '24' : '20'" stroke-linecap="round"
                            :stroke-dasharray="502" :stroke-dashoffset="yellowOffset"
                            class="transition-all duration-300 cursor-pointer"
                            @mouseenter="handleHover('yellow', 'Sedang', statisticsData['Sedang'].value)"
                            @mousemove="updateTooltipPosition" />

                        <!-- bar 3 (Merah) -->
                        <!-- Track -->
                        <path d="M 130 250 A 120 120 0 0 1 370 250" fill="none" stroke="#fecdd3" stroke-width="20"
                            stroke-linecap="round" />
                        <!-- Progress -->
                        <path ref="redBar" d="M 130 250 A 120 120 0 0 1 370 250" fill="none"
                            :stroke="hoveredBar === 'red' ? '#dc2626' : '#ef4444'"
                            :stroke-width="hoveredBar === 'red' ? '24' : '20'" stroke-linecap="round"
                            :stroke-dasharray="377" :stroke-dashoffset="redOffset"
                            class="transition-all duration-300 cursor-pointer"
                            @mouseenter="handleHover('red', 'Rendah', statisticsData['Rendah'].value)"
                            @mousemove="updateTooltipPosition" />
                    </svg>

                    <!-- Loading Spinner -->
                    <div v-if="isLoading" class="absolute inset-0 flex justify-center items-center">
                        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                    </div>

                    <!-- Persentase -->
                    <div v-if="!isLoading"
                        class="absolute bottom-12 lg:bottom-12 xl:bottom-6 right-1/2 translate-x-1/2 flex justify-center items-center">
                        <span class="text-4xl lg:text-4xl xl:text-5xl font-bold transition-all duration-500"
                            :class="hoveredBar ? 'text-blue-600' : 'text-gray-900'">
                            {{ hoveredBar ? hoveredValue : overallPercentage }}%
                        </span>
                    </div>

                    <!-- Tooltip -->
                    <div v-if="showTooltip && !isLoading" :style="{ left: tooltipX + 'px', top: tooltipY + 'px' }"
                        class="absolute z-10 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none transform -translate-x-1/2 -translate-y-full"
                        :class="tooltipClass">
                        <div class="font-semibold">{{ tooltipLabel }}</div>
                        <div>{{ tooltipValue }} responden ({{ Math.round((tooltipValue / totalResponses) * 100) }}%)
                        </div>
                        <div
                            class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900">
                        </div>
                    </div>
                </div>
            </div>

            <!-- Statistics List -->
            <div>
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    Burnout & Resilience Index
                </h2>
                <div class="space-y-0 animate-slide-up">
                    <div v-for="(item, key, index) in statisticsData" :key="key"
                        class="flex justify-between items-center py-2 stat-item cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-all duration-200"
                        :style="{ animationDelay: `${index * 0.1 + 0.5}s` }"
                        :class="{ 'bg-gray-100 scale-105': hoveredItem === key }" @mouseenter="hoveredItem = key"
                        @mouseleave="hoveredItem = null">
                        <div class="flex items-center space-x-3">
                            <div class="w-4 h-4 rounded-full flex-shrink-0 transition-transform duration-200"
                                :style="{ backgroundColor: item.color }" :class="{ 'scale-125': hoveredItem === key }">
                            </div>
                            <span class="text-gray-600 font-medium text-sm md:text-base">{{ key }}</span>
                        </div>
                        <span class="text-gray-900 font-semibold text-lg transition-all duration-200"
                            :class="{ 'text-xl': hoveredItem === key }">
                            {{ item.value }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
    data: []
}>()

interface StatisticItem {
    value: number
    color: string
}

interface StatisticsData {
    [key: string]: StatisticItem
}

// Reactive data
const isLoading = ref(true)
const hoveredBar = ref<string | null>(null)
const hoveredItem = ref<string | null>(null)
const showTooltip = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipLabel = ref('')
const tooltipValue = ref(0)
const tooltipClass = ref('')
const hoveredValue = ref(0)

// Animation values
const greenOffset = ref(628)
const yellowOffset = ref(502)
const redOffset = ref(377)

// Data from API
const statisticsData: StatisticsData = {
    'Tinggi': { value: props.data?.[0]?.total_customer, color: '#10B981' },
    'Sedang': { value: props.data?.[1]?.total_customer, color: '#F59E0B' },
    'Rendah': { value: props.data?.[2]?.total_customer, color: '#EF4444' }
}

// Computed values
const totalResponses = computed(() => {
    return Object.values(statisticsData).reduce((sum, item) => sum + item.value, 0)
})

const overallPercentage = computed(() => {
    const happyPercentage = Math.round((statisticsData['Tinggi'].value / totalResponses.value) * 100)
    return happyPercentage
})

// Methods
const handleHover = (bar: string, label: string, value: number) => {
    hoveredBar.value = bar
    tooltipLabel.value = label
    tooltipValue.value = value
    hoveredValue.value = Math.round((value / totalResponses.value) * 100)
    showTooltip.value = true

    // Set tooltip color class based on bar
    switch (bar) {
        case 'green':
            tooltipClass.value = 'animate-fade-in'
            break
        case 'yellow':
            tooltipClass.value = 'animate-fade-in'
            break
        case 'red':
            tooltipClass.value = 'animate-fade-in'
            break
    }
}

const resetHover = () => {
    hoveredBar.value = null
    showTooltip.value = false
    tooltipClass.value = ''
}

const updateTooltipPosition = (event: MouseEvent) => {
    const svg = event.currentTarget as SVGElement
    const rect = svg.getBoundingClientRect()
    tooltipX.value = event.clientX - rect.left
    tooltipY.value = event.clientY - rect.top - 10
}

const animateBars = () => {
    // Calculate actual offset values based on data percentages
    const happyPercent = statisticsData['Tinggi'].value / totalResponses.value
    const neutralPercent = statisticsData['Sedang'].value / totalResponses.value
    const sadPercent = statisticsData['Rendah'].value / totalResponses.value

    // Animate from full offset to calculated offset
    const greenTarget = 628 - (628 * happyPercent)
    const yellowTarget = 502 - (502 * neutralPercent)
    const redTarget = 377 - (377 * sadPercent)

    // Animate green bar
    const animateGreen = () => {
        let start = 628
        const duration = 2000
        const startTime = Date.now()

        const animate = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)

            greenOffset.value = start - (start - greenTarget) * easeOut

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }
        animate()
    }

    // Animate yellow bar with delay
    const animateYellow = () => {
        setTimeout(() => {
            let start = 502
            const duration = 2000
            const startTime = Date.now()

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easeOut = 1 - Math.pow(1 - progress, 3)

                yellowOffset.value = start - (start - yellowTarget) * easeOut

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            animate()
        }, 300)
    }

    // Animate red bar with delay
    const animateRed = () => {
        setTimeout(() => {
            let start = 377
            const duration = 2000
            const startTime = Date.now()

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / duration, 1)
                const easeOut = 1 - Math.pow(1 - progress, 3)

                redOffset.value = start - (start - redTarget) * easeOut

                if (progress < 1) {
                    requestAnimationFrame(animate)
                }
            }
            animate()
        }, 600)
    }

    animateGreen()
    animateYellow()
    animateRed()
}

const simulateDataLoading = () => {
    // Simulate API call delay
    setTimeout(() => {
        isLoading.value = false
        // Start animations after loading
        setTimeout(() => {
            animateBars()
        }, 100)
    }, 1500)
}

onMounted(() => {
    simulateDataLoading()
})
</script>

<style scoped>
@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slide-up {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fade-in 0.8s ease-out forwards;
}

.animate-slide-up {
    animation: slide-up 0.6s ease-out forwards;
}

.stat-item {
    opacity: 0;
    animation: fade-in 0.6s ease-out forwards;
}

.stat-item:hover {
    transform: translateX(4px);
}
</style>