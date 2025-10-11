<template>
    <div class="bg-white rounded-2xl p-6 md:p-8">
        <div class="w-full h-full flex flex-col lg:flex-row gap-8 justify-evenly items-center">
            <div class="w-full">
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    Statistik Jatidiri Q1
                </h2>

                <div class="mb-6">
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-6xl font-bold text-gray-800">{{ animatedTotal }}</span>
                        <div class="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {{ percentage }}%
                        </div>
                    </div>
                    <p class="text-gray-600 text-lg">
                        Dengan Jatidiri<br>
                        Sangat Tinggi
                    </p>
                </div>

                <div class="space-y-3">
                    <div v-for="(item, index) in legendItems" :key="index"
                        class="flex items-center gap-3 cursor-pointer transition-all duration-200 hover:scale-105"
                        @mouseenter="highlightSegment(index)" @mouseleave="highlightSegment(-1)">
                        <div class="w-4 h-4 rounded-full transition-all duration-200" :class="[
                            item.color,
                            hoveredSegment === index ? 'scale-125 shadow-lg' : ''
                        ]"></div>
                        <span class="text-gray-700 text-sm">{{ item.label }}</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-center">
                <div class="relative">
                    <div class="flex flex-col justify-center items-center gap-1">
                        <div v-for="(segment, index) in funnelData" :key="index"
                            class="relative group cursor-pointer transition-all duration-500 ease-out" :class="{
                                'transform scale-105 z-10': hoveredSegment === index,
                                'opacity-50': hoveredSegment !== -1 && hoveredSegment !== index
                            }" @mouseenter="highlightSegment(index)" @mouseleave="highlightSegment(-1)" :style="{
                                animationDelay: `${index * 200}ms`
                            }">
                            <div class="relative overflow-hidden transition-all duration-300" :style="{
                                width: `${segment.width}px`,
                                height: '60px',
                                clipPath: index === funnelData.length - 1
                                    ? `polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)`
                                    : `polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)`,
                                transform: isLoaded ? 'translateX(0)' : 'translateX(-100%)'
                            }" :class="[
                                segment.bgColor,
                                'animate-slide-in'
                            ]">

                                <div class="absolute inset-0 flex items-center justify-center">
                                    <span class="text-white font-bold text-xl">
                                        {{ segment.animatedValue }}
                                    </span>
                                </div>

                                <div
                                    class="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200">
                                </div>
                            </div>

                            <div v-if="hoveredSegment === index"
                                class="absolute left-1/2 transform -translate-x-1/2 -top-12 bg-gray-800 text-white px-3 py-1 rounded text-sm whitespace-nowrap z-20 animate-fade-in">
                                {{ segment.label }}: {{ segment.value }}
                                <div
                                    class="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface FunnelSegment {
    value: number
    animatedValue: number
    label: string
    width: number
    bgColor: string
}

interface LegendItem {
    label: string
    color: string
}

interface StatisticsItem {
    id: number
    name: string
    score_from: string
    score_to: string
    count: number
    percent: number
}

interface PropsData {
    total: number
    statistics: StatisticsItem[]
}

const props = defineProps<{
    data?: PropsData
}>()

const isLoaded = ref(false)
const hoveredSegment = ref(-1)
const animatedTotal = ref(0)

const colorMap: { [key: string]: { bgColor: string; legendColor: string } } = {
    'Jatidiri Sangat Tinggi': { bgColor: 'bg-gradient-to-r from-indigo-500 to-purple-600', legendColor: 'bg-indigo-600' },
    'Jatidiri Tinggi': { bgColor: 'bg-gradient-to-r from-indigo-400 to-purple-500', legendColor: 'bg-indigo-500' },
    'Jatidiri Sedang': { bgColor: 'bg-gradient-to-r from-indigo-300 to-purple-400', legendColor: 'bg-indigo-400' },
    'Jatidiri Rendah': { bgColor: 'bg-gradient-to-r from-indigo-200 to-purple-300', legendColor: 'bg-indigo-300' }
}

const widthMap: { [key: string]: number } = {
    'Jatidiri Sangat Tinggi': 320,
    'Jatidiri Tinggi': 280,
    'Jatidiri Sedang': 240,
    'Jatidiri Rendah': 200
}

const funnelData = computed<FunnelSegment[]>(() => {
    if (!props.data?.statistics) {
        return []
    }

    const ordered = [...props.data.statistics].sort((a, b) => b.id - a.id)

    return ordered.map((stat) => ({
        value: stat.count,
        animatedValue: 0,
        label: stat.name,
        width: widthMap[stat.name] || 320,
        bgColor: colorMap[stat.name]?.bgColor || 'bg-gradient-to-r from-indigo-500 to-purple-600'
    }))
})

const legendItems = computed<LegendItem[]>(() => {
    if (!props.data?.statistics) {
        return []
    }

    const ordered = [...props.data.statistics].sort((a, b) => b.id - a.id)

    return ordered.map((stat) => ({
        label: stat.name,
        color: colorMap[stat.name]?.legendColor || 'bg-indigo-600'
    }))
})

const percentage = computed(() => {
    const total = funnelData.value.reduce((sum, item) => sum + item.value, 0)
    const highest = funnelData.value[0]?.value || 0
    return total > 0 ? Math.round((highest / total) * 100) : 0
})

const highlightSegment = (index: number) => {
    hoveredSegment.value = index
}

const animateNumbers = () => {
    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps

    const totalTarget = funnelData.value[0]?.value || 0
    let currentTotal = 0
    const totalIncrement = totalTarget / steps

    const totalInterval = setInterval(() => {
        currentTotal += totalIncrement
        if (currentTotal >= totalTarget) {
            animatedTotal.value = totalTarget
            clearInterval(totalInterval)
        } else {
            animatedTotal.value = Math.floor(currentTotal)
        }
    }, stepDuration)

    funnelData.value.forEach((segment, index) => {
        let current = 0
        const increment = segment.value / steps

        setTimeout(() => {
            const interval = setInterval(() => {
                current += increment
                if (current >= segment.value) {
                    segment.animatedValue = segment.value
                    clearInterval(interval)
                } else {
                    segment.animatedValue = Math.floor(current)
                }
            }, stepDuration)
        }, index * 300)
    })
}

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
        animateNumbers()
    }, 100)
})
</script>

<style scoped>
@keyframes slide-in {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

.animate-slide-in {
    animation: slide-in 0.8s ease-out forwards;
}

.animate-fade-in {
    animation: fade-in 0.3s ease-out forwards;
}
</style>