<template>
  <div class="w-full p-6 md:p-8 bg-white rounded-lg font-sora h-full flex flex-col justify-center" @click="">
    <div class="w-full h-fit flex flex-col lg:flex-row items-center justify-between gap-8">
      <div class="flex-1 space-y-4">
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
            Statistik Jatidiri Kendali
        </h2>
        
        <div class="flex items-center gap-4">
          <div class="text-6xl font-bold text-gray-800">{{ animatedMainNumber }}</div>
          <div class="bg-teal-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            {{ animatedPercentage }}%
          </div>
        </div>
        
        <div class="text-gray-600 space-y-1">
          <div class="font-medium">Orang Cenderung</div>
          <div class="font-medium">Kecanduan Gadget</div>
        </div>
      </div>

      <div class="relative">
        <svg width="300" height="300" viewBox="0 0 300 300" class="transform -rotate-90">
          <g v-for="(ring, ringIndex) in rings" :key="ringIndex">
            <circle
              v-for="(segment, segmentIndex) in ring.segments"
              :key="`${ringIndex}-${segmentIndex}`"
              :cx="150"
              :cy="150"
              :r="ring.radius"
              fill="none"
              :stroke="segment.color"
              :stroke-width="ring.strokeWidth"
              :stroke-dasharray="`${segment.length} ${circumference - segment.length}`"
              :stroke-dashoffset="segment.offset"
              :opacity="isLoaded ? 1 : 0"
              :style="{
                transition: `all 0.8s ease-in-out ${(ringIndex * 0.2 + segmentIndex * 0.1)}s`,
                cursor: 'pointer'
              }"
              stroke-linecap="round"
            />
          </g>
        </svg>

        <div class="absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="text-4xl font-bold text-teal-500">{{ animatedCenterPercentage }}%</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex flex-wrap gap-4 justify-center lg:justify-center">
      <div v-for="(item, index) in legendItems" :key="index" class="flex items-center gap-2">
        <div class="w-4 h-4 rounded" :style="{ backgroundColor: item.color }"></div>
        <span class="text-sm text-gray-700">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface Segment {
  label: string
  value: number
  color: string
  percentage: number
  length: number
  offset: number
}

interface Ring {
  radius: number
  strokeWidth: number
  segments: Segment[]
}

const props = defineProps<{
    kendaliData: any
}>()

console.log(props.kendaliData)

const isLoaded = ref(false)
const animatedMainNumber = ref(0)
const animatedPercentage = ref(0)
const animatedCenterPercentage = ref(0)

const circumference = 2 * Math.PI * 80

const rings = computed<Ring[]>(() => {
    if (!props.kendaliData || !props.kendaliData.statistics) return []

    const data = props.kendaliData.statistics
    const maxValue = Math.max(...data.map((item: any) => item.count))
    
    return data.map((item: any, ringIndex: number) => {
        const radius = 120 - (ringIndex * 25)
        const strokeWidth = 25
        
        const percentage = (item.count / maxValue) * 100
        const length = (percentage / 100) * circumference
        
        return {
            radius,
            strokeWidth,
            segments: [{
                label: item.name,
                value: item.count,
                color: ringIndex === 0 ? '#10b981' : ringIndex === 1 ? '#f59e0b' : '#ef4444',
                percentage: Math.round(percentage),
                length,
                offset: 0
            }]
        }
    })
})

const legendItems = computed(() => {
    if (!props.kendaliData || !props.kendaliData.statistics) return []
    
    return props.kendaliData.statistics.map((item: any, index: number) => ({
        label: item.name,
        color: index === 0 ? '#10b981' : index === 1 ? '#f59e0b' : '#ef4444'
    }))
})

const animateNumbers = () => {
    if (!props.kendaliData || !props.kendaliData.statistics) return

    const data = props.kendaliData.statistics
    const cenderungKecanduan = data.find((item: any) => item.id === 2)
    const total = props.kendaliData.total

    const mainTarget = cenderungKecanduan ? cenderungKecanduan.count : 0
    const percentageTarget = cenderungKecanduan ? Math.round(cenderungKecanduan.percent) : 0
    const centerTarget = percentageTarget

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    
    let currentStep = 0
    
    const animate = () => {
        currentStep++
        const progress = currentStep / steps
        const easeProgress = 1 - Math.pow(1 - progress, 3)
        
        animatedMainNumber.value = Math.round(mainTarget * easeProgress)
        animatedPercentage.value = Math.round(percentageTarget * easeProgress)
        animatedCenterPercentage.value = Math.round(centerTarget * easeProgress)
        
        if (currentStep < steps) {
            setTimeout(animate, stepDuration)
        }
    }
    
    animate()
}

watch(() => props.kendaliData, () => {
    isLoaded.value = true
    animateNumbers()
})

onMounted(() => {
    setTimeout(() => {
        isLoaded.value = true
        animateNumbers()
    }, 100)
})
</script>