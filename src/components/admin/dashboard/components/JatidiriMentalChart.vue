<template>
    <div class="bg-white rounded-2xl p-6 md:p-8 font-sora">
        <div class="w-full flex flex-col lg:flex-row gap-6">
            <div class="space-y-6">
                <div>
                    <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        Statistik Jatidiri Kesehatan Mental
                    </h2>
                </div>

                <div class="space-y-1">
                    <div class="flex items-center gap-3">
                        <div class="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium transition-all duration-500"
                            :class="{ 'opacity-0 translate-x-[-20px]': !isLoaded }">
                            {{ animatedPercentage }}%
                        </div>
                    </div>

                    <div class="space-y-1">
                        <div class="text-4xl md:text-6xl font-bold text-gray-900 transition-all duration-1000"
                            :class="{ 'opacity-0 translate-y-4': !isLoaded }">
                            {{ animatedMainNumber }}
                        </div>
                        <p class="text-gray-600 text-lg">
                            Orang Cenderung Sehat
                        </p>
                    </div>
                </div>

                <div class="space-y-0">
                    <div v-for="(item, index) in chartData" :key="item.label"
                        class="flex items-center gap-3 cursor-pointer transition-all duration-300 p-2 rounded-lg"
                        :class="{
                            'opacity-0 translate-x-[-20px]': !isLoaded,
                            'bg-gray-50 scale-105': hoveredCategory === item.label,
                            'opacity-50': hoveredCategory && hoveredCategory !== item.label,
                            'bg-blue-50 ring-2 ring-blue-200': activeCategory === item.label
                        }" :style="{ transitionDelay: `${index * 100 + 800}ms` }"
                        @mouseenter="hoveredCategory = item.label" 
                        @mouseleave="hoveredCategory = null"
                        @click="toggleCategory(item.label)">
                        <div class="w-4 h-4 rounded-sm transition-transform duration-300"
                            :class="{ 'scale-125': hoveredCategory === item.label || activeCategory === item.label }"
                            :style="{ backgroundColor: item.color }"></div>
                        <span class="text-gray-700 font-medium">{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div class="w-full flex items-end justify-center gap-4 md:gap-6 relative">
                <div v-for="(item, index) in chartData" :key="item.label" class="relative group cursor-pointer"
                    @mouseenter="hoveredBar = item.label" @mouseleave="hoveredBar = null">
                    <div class="w-16 md:w-12 lg:w-16 rounded-t-lg transition-all duration-300 ease-out relative overflow-visible"
                        :style="{
                            backgroundColor: item.color,
                            height: isLoaded ? `${item.height}px` : '0px',
                            transitionDelay: `${index * 200 + 100}ms`,
                            transform: hoveredBar === item.label || activeCategory === item.label ? 'scale(1.05)' : 'scale(1)',
                            filter: getBarFilter(item.label),
                            opacity: activeCategory && activeCategory !== item.label ? 0.3 : 1
                        }">
                        <div v-if="!isLoaded"
                            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse">
                        </div>

                        <div 
                            v-show="hoveredBar === item.label"
                            class="absolute -top-12 left-1/2 z-50 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded text-sm font-medium transition-all duration-300 whitespace-nowrap">
                            {{ item.label }}: {{ item.value }} orang
                            <div
                                class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="absolute inset-0 pointer-events-none opacity-10">
                    <div v-for="i in 5" :key="i"
                        class="absolute w-full border-t border-gray-300 transition-opacity duration-1000" :style="{
                            bottom: `${i * 20}%`,
                            opacity: isLoaded ? 1 : 0,
                            transitionDelay: `${i * 100}ms`
                        }"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'

interface ChartItem {
    label: string
    value: number
    height: number
    color: string
}

const props = defineProps<{
    mentalData: any
}>()

const chartData = ref<ChartItem[]>([])
const isLoaded = ref(false)
const hoveredCategory = ref<string | null>(null)
const hoveredBar = ref<string | null>(null)
const activeCategory = ref<string | null>(null)
const animatedMainNumber = ref(0)
const animatedPercentage = ref(0)

const toggleCategory = (label: string) => {
    activeCategory.value = activeCategory.value === label ? null : label
}

const getBarFilter = (label: string) => {
    if (activeCategory.value && activeCategory.value !== label) {
        return 'brightness(0.5)'
    }
    if (hoveredBar.value && hoveredBar.value !== label && !activeCategory.value) {
        return 'brightness(0.7)'
    }
    return 'brightness(1)'
}

const startAnimations = () => {
    const sehatData = chartData.value.find(item => item.label.includes('Sehat'))
    const sehatValue = sehatData ? sehatData.value : 0
    const total = chartData.value.reduce((sum, item) => sum + item.value, 0)
    const sehatPercentage = total > 0 ? Math.round((sehatValue / total) * 100) : 0

    const mainDuration = 2000
    const mainStartTime = Date.now()

    const animateMainNumber = () => {
        const elapsed = Date.now() - mainStartTime
        const progress = Math.min(elapsed / mainDuration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        animatedMainNumber.value = Math.floor(sehatValue * easeOutQuart)

        if (progress < 1) {
            requestAnimationFrame(animateMainNumber)
        }
    }

    const percentageDuration = 1500
    const percentageStartTime = Date.now() + 300

    const animatePercentage = () => {
        const elapsed = Date.now() - percentageStartTime
        if (elapsed < 0) {
            requestAnimationFrame(animatePercentage)
            return
        }

        const progress = Math.min(elapsed / percentageDuration, 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)

        animatedPercentage.value = Math.floor(sehatPercentage * easeOutQuart)

        if (progress < 1) {
            requestAnimationFrame(animatePercentage)
        }
    }

    requestAnimationFrame(animateMainNumber)
    requestAnimationFrame(animatePercentage)
}

const processData = () => {
    if (!props.mentalData || !props.mentalData.statistics) return

    const data = props.mentalData.statistics
    const colors = ['#10b981', '#f59e0b', '#ec4899', '#ef4444']
    const maxValue = Math.max(...data.map((item: any) => item.count))
    
    chartData.value = data.map((item: any, index: number) => ({
        label: item.name,
        value: item.count,
        height: (item.count / maxValue) * 280,
        color: colors[index] || '#10b981'
    }))

    isLoaded.value = true
    startAnimations()
}

watch(() => props.mentalData, () => {
    processData()
})

onMounted(() => {
    processData()
})
</script>

<style scoped>
@keyframes shimmer {
    0% {
        transform: translateX(-100%)
    }

    100% {
        transform: translateX(100%)
    }
}

.animate-shimmer {
    animation: shimmer 2s infinite;
}
</style>