<template>
    <div class="w-fit mx-auto p-6 bg-white rounded-xl">
        <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">Analisis Perkembangan Anak</h2>
            <p class="text-gray-600">Perbandingan penilaian dari perspektif orang tua dan guru</p>
        </div>

        <div class="w-full flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8">
            <div>
                <div class="relative h-96 mb-8">
                    <svg ref="chartSvg" class="w-full h-full" viewBox="0 0 800 400" @mouseleave="hideTooltip">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" stroke-width="1" />
                            </pattern>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="2" dy="2" stdDeviation="2" flood-opacity="0.1" />
                            </filter>
                        </defs>
                        <rect width="800" height="400" fill="url(#grid)" opacity="0.5" />

                        <g v-for="(tick, index) in yTicks" :key="`grid-${index}`">
                            <line x1="80" :y1="350 - (tick * 20)" x2="750" :y2="350 - (tick * 20)" stroke="#f3f4f6"
                                stroke-width="1" opacity="0.7" />
                        </g>

                        <line x1="80" y1="50" x2="80" y2="350" stroke="#e5e7eb" stroke-width="2" />

                        <line x1="80" y1="350" x2="750" y2="350" stroke="#e5e7eb" stroke-width="2" />

                        <text v-for="(tick, index) in yTicks" :key="index" :x="70" :y="350 - (tick * 20) + 4"
                            text-anchor="end" class="text-sm fill-gray-600 font-medium">
                            {{ tick }}
                        </text>

                        <text x="25" y="200" text-anchor="middle" class="text-sm fill-gray-700 font-semibold"
                            transform="rotate(-90, 25, 200)">
                            Jumlah Anak
                        </text>

                        <g v-for="(category, index) in chartData" :key="index">
                            <rect :x="100 + index * barGroupWidth + 10" :y="350 - (category.parent * 20)"
                                :width="barWidth" :height="category.parent * 20" :fill="parentColor"
                                class="animated-bar transition-all duration-500 ease-out cursor-pointer hover:opacity-80"
                                :style="{ animationDelay: `${index * 150}ms` }"
                                @mouseenter="showTooltip($event, category, 'parent')" @mousemove="updateTooltip($event)"
                                filter="url(#shadow)" />

                            <rect :x="100 + index * barGroupWidth + barWidth + 20" :y="350 - (category.teacher * 20)"
                                :width="barWidth" :height="category.teacher * 20" :fill="teacherColor"
                                class="animated-bar transition-all duration-500 ease-out cursor-pointer hover:opacity-80"
                                :style="{ animationDelay: `${index * 150 + 75}ms` }"
                                @mouseenter="showTooltip($event, category, 'teacher')"
                                @mousemove="updateTooltip($event)" filter="url(#shadow)" />

                            <text :x="100 + index * barGroupWidth + barGroupWidth / 2" y="375" text-anchor="middle"
                                class="text-xs fill-gray-700 font-medium opacity-0 animated-label"
                                :style="{ animationDelay: `${index * 150 + 200}ms` }">
                                {{ category.shortLabel.split(' ')[0] }}
                            </text>

                            <text v-if="category.shortLabel.split(' ').length > 1"
                                :x="100 + index * barGroupWidth + barGroupWidth / 2" y="388" text-anchor="middle"
                                class="text-xs fill-gray-700 font-medium opacity-0 animated-label"
                                :style="{ animationDelay: `${index * 150 + 250}ms` }">
                                {{ category.shortLabel.split(' ').slice(1).join(' ') }}
                            </text>
                        </g>

                        <g v-for="(category, index) in chartData" :key="`label-${index}`">
                            <text v-if="category.parent > 0" :x="100 + index * barGroupWidth + barWidth / 2 + 10"
                                :y="350 - (category.parent * 20) - 8" text-anchor="middle"
                                class="text-sm fill-gray-800 font-bold opacity-0 animated-value"
                                :style="{ animationDelay: `${index * 150 + 300}ms` }">
                                {{ category.parent }}
                            </text>

                            <text v-if="category.teacher > 0"
                                :x="100 + index * barGroupWidth + barWidth + barWidth / 2 + 20"
                                :y="350 - (category.teacher * 20) - 8" text-anchor="middle"
                                class="text-sm fill-gray-800 font-bold opacity-0 animated-value"
                                :style="{ animationDelay: `${index * 150 + 350}ms` }">
                                {{ category.teacher }}
                            </text>
                        </g>
                    </svg>

                    <div v-if="tooltip.show" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
                        class="absolute z-10 bg-gray-900 text-white p-3 rounded-lg shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full">
                        <div class="text-sm font-semibold mb-1">{{ tooltip.title }}</div>
                        <div class="text-xs opacity-90">{{ tooltip.type === 'parent' ? 'Penilaian Orang Tua' :
                            'Penilaian Guru' }}</div>
                        <div class="text-lg font-bold mt-1">{{ tooltip.value }} anak</div>
                        <div class="text-xs mt-2 max-w-xs">{{ tooltip.description }}</div>
                    </div>
                </div>

                <div class="flex justify-center space-x-8">
                    <div class="flex items-center space-x-2">
                        <div :style="{ backgroundColor: parentColor }" class="w-4 h-4 rounded"></div>
                        <span class="text-sm font-medium text-gray-700">Penilaian Orang Tua</span>
                    </div>
                    <div class="flex items-center space-x-2">
                        <div :style="{ backgroundColor: teacherColor }" class="w-4 h-4 rounded"></div>
                        <span class="text-sm font-medium text-gray-700">Penilaian Guru</span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-1 gap-6 mt-8">
                <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h3 class="text-lg font-semibold text-blue-800 mb-2">Total Penilaian Orang Tua</h3>
                    <div class="text-3xl font-bold text-blue-600">{{ totalParent }}</div>
                    <p class="text-sm text-blue-700 mt-1">anak dinilai</p>
                </div>
                <div class="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <h3 class="text-lg font-semibold text-green-800 mb-2">Total Penilaian Guru</h3>
                    <div class="text-3xl font-bold text-green-600">{{ totalTeacher }}</div>
                    <p class="text-sm text-green-700 mt-1">anak dinilai</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineProps } from 'vue'

interface CategoryData {
    category: string
    shortLabel: string
    desc: string
    parent: number
    teacher: number
}

interface TooltipData {
    show: boolean
    x: number
    y: number
    title: string
    value: number
    type: 'parent' | 'teacher'
    description: string
}

const props = defineProps({
    parentData: {
        type: Array,
        default: () => []
    },
    teacherData: {
        type: Array,
        default: () => []
    }
})

const parentColor = '#3b82f6'
const teacherColor = '#10b981'

const tooltip = ref<TooltipData>({
    show: false,
    x: 0,
    y: 0,
    title: '',
    value: 0,
    type: 'parent',
    description: ''
})

const chartData = computed<CategoryData[]>(() => {
    return props.parentData.map((parentItem: any, index: number) => ({
        category: parentItem.category,
        shortLabel: getShortLabel(parentItem.category),
        desc: parentItem.desc,
        parent: parentItem.jumlah,
        teacher: props.teacherData[index]?.jumlah || 0
    }))
})

// Calculate bar dimensions based on available space and number of categories
const barGroupWidth = computed(() => {
    const availableWidth = 650 // 750 - 100 (start position)
    return Math.floor(availableWidth / chartData.value.length)
})

const barWidth = computed(() => {
    return Math.floor((barGroupWidth.value - 30) / 2) // Subtract spacing, divide by 2 bars per group
})

const totalParent = computed(() =>
    props.parentData.reduce((sum: number, item: any) => sum + item.jumlah, 0)
)

const totalTeacher = computed(() =>
    props.teacherData.reduce((sum: number, item: any) => sum + item.jumlah, 0)
)

const maxValue = computed(() =>
    Math.max(...chartData.value.flatMap(item => [item.parent, item.teacher]))
)

const yTicks = computed(() => {
    const max = Math.max(maxValue.value, 5)
    const step = Math.ceil(max / 5)
    return Array.from({ length: 6 }, (_, i) => i * step)
})

function getShortLabel(category: string): string {
    const labels: Record<string, string> = {
        'Perlu Bantuan/Dukungan Ekstra': 'Perlu Bantuan',
        'Cukup/Berkembang': 'Cukup',
        'Baik/Mendukung': 'Baik',
        'Sangat Baik/Mahir': 'Sangat Baik'
    }
    return labels[category] || category
}

function showTooltip(event: MouseEvent, category: CategoryData, type: 'parent' | 'teacher') {
    const rect = (event.target as SVGElement).getBoundingClientRect()
    const container = (event.target as SVGElement).closest('.relative')?.getBoundingClientRect()

    if (container) {
        tooltip.value = {
            show: true,
            x: rect.left - container.left + rect.width / 2,
            y: rect.top - container.top,
            title: category.category,
            value: type === 'parent' ? category.parent : category.teacher,
            type,
            description: category.desc
        }
    }
}

function updateTooltip(event: MouseEvent) {
    if (tooltip.value.show) {
        const rect = (event.target as SVGElement).getBoundingClientRect()
        const container = (event.target as SVGElement).closest('.relative')?.getBoundingClientRect()

        if (container) {
            tooltip.value.x = rect.left - container.left + rect.width / 2
            tooltip.value.y = rect.top - container.top
        }
    }
}

function hideTooltip() {
    tooltip.value.show = false
}

onMounted(() => {
    // Trigger animations after component is mounted
    setTimeout(() => {
        const bars = document.querySelectorAll('.animated-bar')
        const labels = document.querySelectorAll('.animated-label')
        const values = document.querySelectorAll('.animated-value')

        bars.forEach((bar) => {
            bar.classList.add('animate-slide-up')
        })

        labels.forEach((label) => {
            label.classList.add('animate-fade-in')
        })

        values.forEach((value) => {
            value.classList.add('animate-fade-in')
        })
    }, 100)
})
</script>

<style scoped>
@keyframes slideUp {
    from {
        transform: scaleY(0);
        opacity: 0.7;
    }

    to {
        transform: scaleY(1);
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animated-bar {
    transform-origin: bottom;
    animation: slideUp 0.8s ease-out both;
}

.animated-label {
    animation: fadeIn 0.6s ease-out both;
}

.animated-value {
    animation: fadeIn 0.6s ease-out both;
}

.animate-slide-up {
    animation: slideUp 0.8s ease-out both;
}

.animate-fade-in {
    animation: fadeIn 0.6s ease-out both;
}
</style>