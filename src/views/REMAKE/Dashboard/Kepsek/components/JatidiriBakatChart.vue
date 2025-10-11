<template>
    <div class="w-full p-6 bg-white rounded-lg flex flex-col justify-between gap-6">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Statistik Jatidiri Bakat
        </h2>

        <div class="space-y-4 mb-8">
            <div v-for="(item, index) in chartData" :key="index" class="flex items-center gap-4 group cursor-pointer"
                @mouseenter="handleBarHover(item, $event)" @mouseleave="hideTooltip">
                <span class="text-gray-500 text-sm w-12">{{ item.label }}</span>
                <div class="flex-1 relative">
                    <div class="bg-purple-400 rounded-md h-8 transition-all duration-500 ease-out hover:bg-purple-500 hover:scale-105 origin-left"
                        :style="{
                            width: isLoaded ? `${item.percentage}%` : '0%',
                            transitionDelay: `${index * 150}ms`
                        }"></div>
                </div>
            </div>
        </div>

        <div class="bg-gray-200 rounded-lg p-6">
            <div class="flex items-start justify-between mb-6">
                <div class="flex items-center gap-4">
                    <div class="text-4xl font-bold text-gray-800">
                        {{ animatedCount }}
                    </div>
                    <div class="text-sm text-gray-600">
                        Jatidiri Sangat Tinggi
                    </div>
                </div>
                <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {{ animatedPercentage }}%
                </div>
            </div>

            <div class="grid grid-cols-2 gap-x-8 gap-y-2">
                <div v-for="(legend, index) in legendData" :key="index"
                    class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
                    @mouseenter="highlightCategory(legend.category)" @mouseleave="clearHighlight">
                    <div class="w-3 h-3 rounded-full transition-transform hover:scale-110" :class="legend.color"></div>
                    <span>{{ legend.label }}</span>
                </div>
            </div>
        </div>

        <div v-if="tooltip.show"
            class="fixed bg-gray-800 text-white px-3 py-2 rounded-lg text-sm pointer-events-none z-50 transition-opacity duration-200"
            :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
            <div class="font-semibold">{{ tooltip.data?.label }}</div>
            <div>Value: {{ tooltip.data?.value }}</div>
            <div>Percentage: {{ tooltip.data?.percentage }}%</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface ChartItem {
    label: string
    value: number
    percentage: number
    category: string
}

interface LegendItem {
    label: string
    color: string
    category: string
}

interface TooltipData {
    show: boolean
    x: number
    y: number
    data: ChartItem | null
}

const isLoaded = ref(false)
const currentCount = ref(0)
const currentPercentage = ref(0)
const highlightedCategory = ref<string | null>(null)

const legendData: LegendItem[] = [
  { label: 'Jatidiri Sangat Tinggi', color: 'bg-purple-600', category: 'sangat-tinggi' },
  { label: 'Jatidiri Tinggi', color: 'bg-purple-400', category: 'tinggi' },
  { label: 'Jatidiri Tinggi', color: 'bg-purple-400', category: 'tinggi' },
  { label: 'Jatidiri Sedang', color: 'bg-purple-300', category: 'sedang' },
  { label: 'Jatidiri Rendah', color: 'bg-purple-200', category: 'rendah' }
]

const chartData: ChartItem[] = [
  { ...legendData[0], value: 85, percentage: 85 },
  { ...legendData[2], value: 65, percentage: 65 },
  { ...legendData[4], value: 45, percentage: 45 },
  { ...legendData[3], value: 25, percentage: 25 },
  { ...legendData[1], value: 75, percentage: 75 }
]

const tooltip = ref<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    data: null
})

const animatedCount = computed(() => Math.floor(currentCount.value))
const animatedPercentage = computed(() => Math.floor(currentPercentage.value))

const animateNumber = (target: number, current: any, duration: number = 2000) => {
    const start = performance.now()
    const startValue = current.value

    const animate = (timestamp: number) => {
        const elapsed = timestamp - start
        const progress = Math.min(elapsed / duration, 1)

        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        current.value = startValue + (target - startValue) * easeOutQuart

        if (progress < 1) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate)
}

const handleBarHover = (item: ChartItem, event: MouseEvent) => {
    tooltip.value = {
        show: true,
        x: event.clientX + 10,
        y: event.clientY - 10,
        data: item
    }
}

const hideTooltip = () => {
    tooltip.value.show = false
}

const highlightCategory = (category: string) => {
    highlightedCategory.value = category
}

const clearHighlight = () => {
    highlightedCategory.value = null
}

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
    }, 300)

    setTimeout(() => {
        animateNumber(110, currentCount)
        animateNumber(79, currentPercentage)
    }, 800)
})
</script>