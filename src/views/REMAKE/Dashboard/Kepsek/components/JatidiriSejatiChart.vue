<template>
    <div class="bg-white p-6 rounded-xl h-full flex flex-col justify-between">
        <div>
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                    Statistik Jatidiri Sejati
                </h2>
                <!-- <button
                    class="bg-primary text-white text-xs px-3 py-1 rounded hover:bg-gradient-primary transition flex flex-nowrap gap-2 items-center justify-center mt-4 md:mt-0"
                    @click="downloadChart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-cloud-arrow-down" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                            d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z" />
                        <path
                            d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                    </svg>
                    <small>Unduh Grafik</small>
                </button> -->
            </div>

            <div class="space-y-3">
                <div v-for="(item, index) in chartData" :key="index" class="flex items-center">
                    <div class="flex-1 flex items-center">
                        <div class="flex-1 relative">
                            <div class="bg-gray-100 rounded-full h-8 relative overflow-hidden">
                                <div class="bg-blue-500 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-start pl-3"
                                    :style="{
                                        width: isLoaded ? `${(item.value / maxValue) * 100}%` : '0%',
                                        transitionDelay: `${index * 150}ms`
                                    }">
                                    <span class="text-white text-xs font-medium transition-opacity duration-300" :style="{
                                        opacity: isLoaded ? '1' : '0',
                                        transitionDelay: `${index * 150 + 300}ms`
                                    }">{{ item.label }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="w-12 text-right text-sm text-gray-600 pl-4 transition-opacity duration-300" :style="{
                            opacity: isLoaded ? '1' : '0',
                            transitionDelay: `${index * 150 + 200}ms`
                        }">
                            {{ item.value }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-8 bg-gray-50 rounded-lg p-4 flex items-center justify-between">
            <div class="flex items-center space-x-4">
                <div class="text-4xl font-bold text-gray-800 transition-all duration-700 ease-out" :style="{
                    opacity: isLoaded ? '1' : '0',
                    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: '800ms'
                }">
                    {{ totalValue }}
                </div>
                <div class="text-sm text-gray-600 transition-all duration-700 ease-out" :style="{
                    opacity: isLoaded ? '1' : '0',
                    transform: isLoaded ? 'translateX(0)' : 'translateX(-20px)',
                    transitionDelay: '900ms'
                }">
                    <div class="flex items-center space-x-1">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0L10.4 5.6L16 8L10.4 10.4L8 16L5.6 10.4L0 8L5.6 5.6L8 0Z" fill="#6B7280" />
                        </svg>
                        <span>Total Pengguna Mengikuti Test Jatidiri Sejati</span>
                    </div>
                </div>
            </div>
            <div class="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 transition-all duration-700 ease-out"
                :style="{
                    opacity: isLoaded ? '1' : '0',
                    transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
                    transitionDelay: '1000ms'
                }">
                <span>75%</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6L5 8L9 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface ChartDataItem {
    label: string
    value: number
}

const props = defineProps<{
    data?: number[]
}>()

const isLoaded = ref(false)

const chartLabels = [
    'Limbik Kanan Ekstrovert',
    'Neokorteks Kiri Ekstrovert',
    'Limbik Kanan Introvert',
    'Neokorteks Kiri Introvert',
    'Limbik Kiri Introvert',
    'Limbik Kiri Ekstrovert',
    'Neokorteks Kanan Ekstrovert',
    'Neokorteks Kanan Introvert',
    'Otak Tengah'
]

const chartData = ref<ChartDataItem[]>(chartLabels.map((label, index) => ({
    label,
    value: 0
})))

watch(() => props.data, (newData) => {
    if (newData && newData.length === 9) {
        chartData.value = chartData.value.map((item, index) => ({
            ...item,
            value: newData[index]
        }))
    }
}, { immediate: true })

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
    }, 50)
})

const maxValue = computed(() => Math.max(...chartData.value.map(item => item.value)))
const totalValue = computed(() => chartData.value.reduce((sum, item) => sum + item.value, 0))

const downloadChart = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = 800
    canvas.height = 600

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#0c141c'
    ctx.font = 'bold 24px Arial'
    ctx.fillText('Statistik Jatidiri Sejati', 40, 50)

    const barHeight = 35
    const barSpacing = 45
    const startY = 100
    const maxBarWidth = 500

    chartData.value.forEach((item, index) => {
        const y = startY + (index * barSpacing)
        const barWidth = (item.value / maxValue.value) * maxBarWidth

        ctx.fillStyle = '#f3f4f6'
        ctx.fillRect(200, y, maxBarWidth, barHeight)

        ctx.fillStyle = '#3b82f6'
        ctx.fillRect(200, y, barWidth, barHeight)

        ctx.fillStyle = '#374151'
        ctx.font = '14px Arial'
        ctx.textAlign = 'right'
        ctx.fillText(item.label, 190, y + 22)

        ctx.textAlign = 'left'
        ctx.fillText(item.value.toString(), 720, y + 22)
    })

    const link = document.createElement('a')
    link.download = 'Statistik-Jatidiri-Sejati.png'
    link.href = canvas.toDataURL()
    link.click()
}
</script>