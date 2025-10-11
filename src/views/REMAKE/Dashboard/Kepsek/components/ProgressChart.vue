<template>
    <div class="w-full p-6 bg-white rounded-lg">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Progress Tes Jatidiri
        </h2>

        <div class="flex flex-col items-center gap-8">
            <div class="relative">
                <svg width="300" height="300" viewBox="0 0 300 300" class="transform -rotate-90"
                    @mouseleave="hoveredSegment = null">
                    <g v-for="(item, ringIndex) in chartData" :key="ringIndex">
                        <circle :cx="150" :cy="150" :r="item.radius" fill="none" stroke="#f3f4f6"
                            :stroke-width="item.strokeWidth" />

                        <circle :cx="150" :cy="150" :r="item.radius" fill="none" :stroke="item.color"
                            :stroke-width="item.strokeWidth"
                            :stroke-dasharray="`${item.progress} ${item.circumference - item.progress}`"
                            :stroke-dashoffset="item.offset" stroke-linecap="round"
                            class="transition-all duration-1000 ease-out cursor-pointer"
                            :class="{ 'opacity-60': hoveredSegment && hoveredSegment !== item.label }"
                            @mouseenter="handleHover(item, $event)" :style="{
                                strokeDasharray: isLoaded ? `${item.progress} ${item.circumference - item.progress}` : '0 1000',
                                transitionDelay: `${ringIndex * 200}ms`
                            }" />
                    </g>
                </svg>

                <div v-if="hoveredSegment && tooltip.show"
                    class="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium pointer-events-none z-10 whitespace-nowrap"
                    :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
                    {{ hoveredSegment }}: {{ hoveredData?.value }}
                </div>
            </div>

            <div class="w-full flex-1 space-y-0">
                <div v-for="(item, index) in chartData" :key="index"
                    class="flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-50"
                    :class="{ 'bg-gray-100': hoveredSegment === item.label }" @mouseenter="hoveredSegment = item.label"
                    @mouseleave="hoveredSegment = null">
                    <div class="flex items-center gap-3">
                        <div class="w-4 h-4 rounded-full" :style="{ backgroundColor: item.color }"></div>
                        <span class="text-gray-600 font-medium">{{ item.label }}</span>
                    </div>
                    <span class="text-gray-900 font-bold text-lg">{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface ChartItem {
    label: string
    value: number
    color: string
    radius: number
    strokeWidth: number
    circumference: number
    progress: number
    offset: number
}

interface Tooltip {
    show: boolean
    x: number
    y: number
}

const isLoaded = ref(false)
const hoveredSegment = ref<string | null>(null)
const hoveredData = ref<ChartItem | null>(null)
const tooltip = ref<Tooltip>({ show: false, x: 0, y: 0 })

const props = defineProps<{
    users: string,
    statistik: []
}>()

const chartData = computed<ChartItem[]>(() => {
    const rawData = [
        { label: 'Mental Maintenance Self-Check', value: props.statistik?.mms, color: '#1FC16B', maxValue: props.users },
        { label: 'Motivation for Academic & Professional', value: props.statistik?.map, color: '#D23D51', maxValue: props.users },
        { label: 'Learning Barriers Check', value: props.statistik?.lbc, color: '#E9CA49', maxValue: props.users },
        { label: 'Burnout & Resilience Index', value: props.statistik?.bri, color: '#D23E52', maxValue: props.users },
        { label: 'Clinical Readiness Scale', value: props.statistik?.crs, color: '#F6A537', maxValue: props.users },
    ]
    
    return rawData.map((item, index) => {
        const radius = 120 - (index * 20)
        const strokeWidth = 16
        const circumference = 2 * Math.PI * radius
        const progressPercentage = (item.value / item.maxValue) * 0.75
        const progress = circumference * progressPercentage
        const offset = circumference * 0.125

        return {
            ...item,
            radius,
            strokeWidth,
            circumference,
            progress,
            offset
        }
    })
})

const handleHover = (item: ChartItem, event: MouseEvent) => {
    hoveredSegment.value = item.label
    hoveredData.value = item

    const rect = (event.target as SVGElement).closest('svg')?.getBoundingClientRect()
    if (rect) {
        tooltip.value = {
            show: true,
            x: event.clientX - rect.left + 10,
            y: event.clientY - rect.top - 10
        }
    }
}

watch(() => [props.statistik, props.users], ([newStatistik, newUsers]) => {
    if (newStatistik && newUsers) {
        isLoaded.value = false
        setTimeout(() => {
            isLoaded.value = true
        }, 1000)
    }
}, { deep: true, immediate: true })
</script>