<template>
    <section ref="containerRef" class="relative w-full bg-white rounded-lg shadow-sm">
        <header class="px-6 pt-6">
            <h2 class="text-xl md:text-2xl font-semibold text-slate-900">
                Statistik Sistem Operasi Kecerdasan Buatan
            </h2>
        </header>

        <div class="">
            <svg :viewBox="`0 0 ${width} ${height}`" class="w-[70%] h-auto" role="img" aria-labelledby="chartTitle chartXLabel">
                <title id="chartTitle">Statistik Sistem Operasi Kecerdasan Buatan</title>

                <g :transform="`translate(${m.left},${m.top})`">
                    <g aria-hidden="true">
                        <template v-for="t in ticks" :key="`grid-${t}`">
                            <line :x1="x(t)" :x2="x(t)" y1="0" :y2="innerH" class="stroke-slate-200" stroke-width="1" />
                            <text v-if="showTickLabels" :x="x(t)" :y="-10" text-anchor="middle" class="fill-slate-400 text-[12px]">
                                {{ t }}
                            </text>
                        </template>
                    </g>

                    <g aria-hidden="false">
                        <template v-for="(d, i) in data" :key="`label-${i}`">
                            <text :x="-12" :y="y(i) + barHeight / 2" text-anchor="end" dominant-baseline="middle" class="fill-slate-700 text-[12px] md:text-[13px]">
                                {{ d.label }}
                            </text>
                        </template>
                    </g>

                    <g>
                        <template v-for="(d, i) in data" :key="`bar-${i}`">
                            <rect
                                :x="0"
                                :y="y(i)"
                                :width="entered ? Math.max(x(d.value), 0) : 0"
                                :height="barHeight"
                                :fill="barFill(i)"
                                :rx="4"
                                :ry="4"
                                :style="{ transition: 'width 600ms cubic-bezier(0.22, 1, 0.36, 1) 100ms' }"
                                @mouseenter="hovered = i"
                                @mouseleave="hovered = null"
                            />
                            <text :x="Math.max(x(d.value) - 8, 0)" :y="y(i) + barHeight / 2" text-anchor="end" dominant-baseline="middle" class="fill-white text-[12px]">
                                {{ d.value }}
                            </text>
                        </template>
                    </g>

                    <g v-if="hovered !== null" style="pointer-events: none;">
                        <rect
                            :x="tooltipRectX"
                            :y="tooltipRectY"
                            :width="tooltipRectW"
                            :height="tooltipRectH"
                            rx="4"
                            ry="4"
                            fill="hsl(230 20% 10% / 0.9)"
                        />
                        <text
                            :x="tooltipX"
                            :y="tooltipRectY + tooltipRectH / 2"
                            text-anchor="middle"
                            dominant-baseline="middle"
                            class="fill-white text-[12px]"
                        >
                            {{ tooltipText }}
                        </text>
                    </g>
                </g>
            </svg>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

type Row = { label: string; value: number }

const props = defineProps<{
    options: any
    series: any
}>()

const data = computed<Row[]>(() => {
    const categories = props.options.xaxis?.categories || []
    const values = props.series[0]?.data || []
    return categories.map((label: string, i: number) => ({
        label,
        value: values[i] || 0
    }))
})

const m = { top: 56, right: 18, bottom: 48, left: 240 }
const barHeight = 28
const barGap = 18
const showTickLabels = false

const width = 940
const innerH = computed(() => data.value.length * (barHeight + barGap) - barGap)
const height = computed(() => m.top + innerH.value + m.bottom)
const innerW = computed(() => width - m.left - m.right)
const maxX = computed(() => Math.max(...data.value.map(d => d.value), 1))

const x = (v: number) => (v / maxX.value) * innerW.value
const y = (i: number) => i * (barHeight + barGap)
const ticks = computed(() => Array.from({ length: Math.floor(maxX.value / 50) + 1 }, (_, i) => i * 50))

const barFill = (i: number) => {
    const lightness = 26 + i * 4
    return `hsl(230 100% ${Math.min(lightness, 80)}%)`
}

const containerRef = ref<HTMLElement | null>(null)
const entered = ref(false)

onMounted(() => {
    entered.value = true
})

const hovered = ref<number | null>(null)

const tooltipText = computed(() => {
    if (hovered.value === null) return ''
    const d = data.value[hovered.value]
    return `${d.label}: ${d.value}`
})

const tooltipX = computed(() => {
    if (hovered.value === null) return 0
    return x(data.value[hovered.value].value) / 2
})

const tooltipRectH = 24
const tooltipPaddingX = 8
const approxCharW = 7

const tooltipRectW = computed(() => {
    return Math.max(tooltipText.value.length * approxCharW + tooltipPaddingX * 2, 32)
})

const tooltipRectX = computed(() => {
    const cx = tooltipX.value - tooltipRectW.value / 2
    if (cx < 0) return 0
    if (cx + tooltipRectW.value > innerW.value) return innerW.value - tooltipRectW.value
    return cx
})

const tooltipRectY = computed(() => {
    if (hovered.value === null) return 0
    return y(hovered.value) - 8 - tooltipRectH
})
</script>

<style scoped>
.stroke-slate-200 {
    stroke: #e5e7eb;
}
</style>
