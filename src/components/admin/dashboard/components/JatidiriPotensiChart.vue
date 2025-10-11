<template>
    <div class="w-full p-6 bg-white rounded-lg flex flex-col justify-between gap-6">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Statistik Jatidiri Potensi
        </h2>

        <div class="w-full flex items-end justify-center space-x-4 mb-8 h-80">
            <div v-for="(item, index) in chartData" :key="item.label" class="w-full relative group cursor-pointer"
                @mouseenter="showTooltip(item, $event)" @mouseleave="hideTooltip">
                <div class="bg-green-500 rounded-t-lg transition-all duration-700 ease-out hover:bg-green-600 w-full relative"
                    :style="{
                        height: isLoaded ? `${(item.value / maxValue) * 280}px` : '0px',
                        transitionDelay: `${index * 150}ms`
                    }"></div>

                <div class="text-center mt-2 text-sm font-medium text-gray-600">
                    {{ item.label }}
                </div>
            </div>
        </div>

        <div class="w-full flex flex-col gap-4 md:gap-6 bg-gray-200 p-4 rounded-lg">
            <div class="w-full flex justify-between items-start space-x-4">
                <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                        </path>
                    </svg>
                </div>

                <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {{ highestPercentage }}%
                </div>
            </div>

            <div class="w-full flex items-end gap-4 ">
                <div class="text-4xl font-bold text-gray-900">{{ animatedTotal }}</div>
                <p class="text-sm text-gray-600">
                    Distribusi skor IQ Potensi dari seluruh peserta dengan variasi kemampuan kognitif yang berbeda.
                </p>
            </div>
        </div>

        <div v-if="tooltip.show"
            class="fixed bg-gray-900 text-white px-3 py-2 rounded-lg text-sm z-50 pointer-events-none"
            :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }">
            <div class="font-medium">{{ tooltip.data?.label }}</div>
            <div class="text-gray-300">Jumlah: {{ tooltip.data?.value }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue'

interface ChartItem {
    label: string
    value: number
}

interface IQPotensiData {
    [key: string]: number
}

const props = defineProps({
    iqpotensi: {
        type: Object as () => IQPotensiData,
        required: true
    }
})

const isLoaded = ref(false)
const animatedTotal = ref(0)
const tooltip = ref({
    show: false,
    x: 0,
    y: 0,
    data: null as ChartItem | null
})

const chartData = computed(() => {
    if (!props.iqpotensi) return []
    
    return Object.entries(props.iqpotensi)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .map(([score, count]) => ({
            label: score,
            value: count
        }))
})

const maxValue = computed(() => Math.max(...chartData.value.map(item => item.value)))
const totalValue = computed(() => chartData.value.reduce((sum, item) => sum + item.value, 0))

const highestPercentage = computed(() => {
    if (totalValue.value === 0) return 0
    const highestValue = Math.max(...chartData.value.map(item => item.value))
    return Math.round((highestValue / totalValue.value) * 100)
})

const showTooltip = (item: ChartItem, event: MouseEvent) => {
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

const animateNumber = (target: number, duration: number = 2000) => {
    const start = 0
    const startTime = Date.now()

    const updateNumber = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const easeOut = 1 - Math.pow(1 - progress, 3)

        animatedTotal.value = Math.floor(start + (target - start) * easeOut)

        if (progress < 1) {
            requestAnimationFrame(updateNumber)
        }
    }

    requestAnimationFrame(updateNumber)
}

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
        animateNumber(totalValue.value)
    }, 100)
})
</script>