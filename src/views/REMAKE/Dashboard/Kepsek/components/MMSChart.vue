<template>
    <div class="w-full bg-white rounded-2xl p-6">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Mental Maintenance Self-Check
        </h2>

        <div class="flex flex-col lg:flex-row items-center gap-8">
            <div class="relative">
                <div class="relative w-80 h-80">
                    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
                        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
                    </div>

                    <svg v-else class="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#f3f4f6" stroke-width="20" />

                        <!-- Chart Segments -->
                        <circle v-for="(segment, index) in chartSegments" :key="index" cx="100" cy="100" r="70"
                            fill="none" :stroke="segment.color" stroke-width="25"
                            :stroke-dasharray="`${segment.length} ${circumference - segment.length}`"
                            :stroke-dashoffset="segment.offset" 
                            :class="[
                                'transition-all duration-500 ease-in-out cursor-pointer segment-animation',
                                hoveredSegment === index ? 'stroke-[30]' : 'stroke-[25]',
                                `segment-${index}`
                            ]" 
                            :style="{
                                '--segment-length': segment.length,
                                '--animation-delay': `${index * 300}ms`
                            }" 
                            @mouseenter="hoveredSegment = index" 
                            @mouseleave="hoveredSegment = null" />
                    </svg>

                    <!-- Center Text -->
                    <div v-if="!isLoading" class="absolute inset-0 flex flex-col items-center justify-center center-text-animation">
                        <div class="text-4xl font-bold text-gray-800 transition-all duration-300"
                            :class="hoveredSegment !== null ? 'scale-110' : ''">
                            {{ totalPercentage }}%
                        </div>
                        <div class="text-gray-500 text-sm">{{ centerLabel }}</div>
                    </div>
                </div>

                <!-- Tooltip -->
                <div v-if="hoveredSegment !== null && !isLoading"
                    class="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10">
                    <div class="text-sm font-medium text-gray-800">{{ stressData[hoveredSegment].label }}</div>
                    <div class="text-xs text-gray-600">{{ stressData[hoveredSegment].value }} Orang</div>
                    <div class="text-xs text-gray-500">{{ stressData[hoveredSegment].percentage }}%</div>
                </div>
            </div>

            <!-- Legend -->
            <div class="flex-1 space-y-4">
                <div v-for="(item, index) in stressData" :key="index"
                    class="flex items-center justify-between p-3 rounded-lg transition-all duration-200 cursor-pointer legend-item-animation"
                    :class="[
                        hoveredSegment === index ? 'bg-gray-50 shadow-sm scale-105' : 'hover:bg-gray-50'
                    ]" 
                    :style="{ '--legend-delay': `${index * 150 + 800}ms` }"
                    @mouseenter="hoveredSegment = index" 
                    @mouseleave="hoveredSegment = null">
                    <div class="flex items-center gap-3">
                        <div class="w-4 h-4 rounded-full transition-all duration-200"
                            :style="{ backgroundColor: item.color }"
                            :class="hoveredSegment === index ? 'scale-125' : ''"></div>
                        <span class="font-medium" :class="hoveredSegment === index ? 'text-black' : 'text-gray-600'">{{ item.label }}</span>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold" :class="hoveredSegment === index ? 'text-black' : 'text-gray-400'">{{ item.value }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface StressDataItem {
    label: string
    value: number
    color: string
    percentage: number
}

const isLoading = ref(true)
const hoveredSegment = ref<number | null>(null)

const props = defineProps<{
    data: []
}>()

const mmsStatistik = [
    {kategori: 'Sangat Baik (Strategi coping matang & stabil)', score_from: 73, score_to: 90, total_customer: 0},
    {kategori: 'Cukup Baik (Ada coping, tapi belum konsisten)', score_from: 55, score_to: 72, total_customer: 0},
    {kategori: 'Rentan (Berisiko stres tinggi & kehilangan fokus)', score_from: 37, score_to: 54, total_customer: 2},
    {kategori: 'Buruk (Rawan burnout, butuh intervensi segera)', score_from: 0, score_to: 36, total_customer: 0}
]

const stressData: StressDataItem[] = [
    { label: 'Sangat Baik', value: props.data[0].total_customer, color: '#dc2626', percentage: 0 },
    { label: 'Cukup Baik', value: props.data[1].total_customer, color: '#f87171', percentage: 0 },
    { label: 'Rentan', value: props.data[2].total_customer, color: '#fca5a5', percentage: 0 },
    { label: 'Buruk', value: props.data[3].total_customer, color: '#b91c1c', percentage: 0 }
]

const totalValue = computed(() =>
    stressData.reduce((sum, item) => sum + item.value, 0)
)

const totalPercentage = computed(() => {
    const totalAtRisk = mmsStatistik[2].total_customer + mmsStatistik[3].total_customer
    const totalAll = totalValue.value
    return totalAll > 0 ? Math.round((totalAtRisk / totalAll) * 100) : 0
})

const centerLabel = computed(() => {
    const totalAtRisk = mmsStatistik[2].total_customer + mmsStatistik[3].total_customer
    return totalAtRisk > 0 ? 'Rentan & Buruk' : 'Total'
})

const circumference = 2 * Math.PI * 70

const chartSegments = computed(() => {
    let currentOffset = 0

    return stressData.map((item) => {
        const percentage = totalValue.value > 0 ? item.value / totalValue.value : 0
        const length = circumference * percentage
        const offset = -currentOffset

        currentOffset += length

        item.percentage = totalValue.value > 0 ? Math.round((item.value / totalValue.value) * 100) : 0

        return {
            length,
            offset,
            color: item.color
        }
    })
})

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1000)
})
</script>

<style scoped>
@keyframes drawSegment {
    from {
        stroke-dasharray: 0 440;
        opacity: 0;
    }
    to {
        stroke-dasharray: var(--segment-length) 440;
        opacity: 1;
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.segment-animation {
    opacity: 0;
    animation: drawSegment 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    animation-delay: var(--animation-delay);
}

.center-text-animation {
    opacity: 0;
    animation: fadeInScale 0.8s ease-out 1.2s forwards;
}

.legend-item-animation {
    opacity: 0;
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: var(--legend-delay);
}

.transition-all {
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>