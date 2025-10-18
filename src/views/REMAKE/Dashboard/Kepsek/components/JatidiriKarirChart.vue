<template>
    <div class="w-full h-full p-6 bg-white rounded-lg font-sora">
        <div class="w-full flex justify-between items-center gap-4">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Statistik Jatidiri Karir
            </h2>
            <NewButton v-if="sekolahId && hasValidKarierData" @click="handleDownload" class="px-6" textSize="text-sm md:text-base"
                :text="downloading ? 'Mengunduh...' : 'Download PDF'" />
        </div>
        <div class="relative flex flex-col lg:flex-row">
            <div class="relative mb-8 lg:mb-0 w-full md:w-fit">
                <svg ref="svgElement" width="600" height="500" viewBox="100 100 400 400" class="w-full"
                    @mousemove="updateTooltipPosition">
                    <g v-for="(segment, index) in segments" :key="segment.id">
                        <path :d="segment.path" :fill="segment.color" :class="[
                            'transition-all duration-300 cursor-pointer',
                            hoveredSegment === segment.id ? 'opacity-90 transform scale-105' : 'opacity-100'
                        ]" :style="{
                            transformOrigin: '300px 300px',
                            strokeDasharray: isLoaded ? 'none' : segment.circumference,
                            strokeDashoffset: isLoaded ? '0' : segment.circumference,
                            transition: `stroke-dashoffset ${1 + index * 0.2}s ease-out`
                        }" @mouseenter="hoveredSegment = segment.id" @mouseleave="hoveredSegment = null" />
                    </g>

                    <circle cx="300" cy="300" r="60" fill="white" :class="[
                        'transition-all duration-500',
                        isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                    ]" style="filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1))" />
                </svg>

                <div v-if="hoveredSegment && tooltipPosition" :style="{
                    position: 'absolute',
                    left: tooltipPosition.x + 'px',
                    top: tooltipPosition.y + 'px',
                    transform: 'translate(-50%, -100%)'
                }"
                    class="bg-white px-3 py-2 rounded-lg shadow-lg border text-sm font-medium text-gray-800 z-10 pointer-events-none">
                    {{ getSegmentById(hoveredSegment)?.label }}: {{ getSegmentById(hoveredSegment)?.value }}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-1 gap-6 w-fit">
                <div v-for="option in options" :key="option.id" :class="[
                    'transition-all duration-300 cursor-pointer p-4 rounded-lg',
                    hoveredSegment === option.id ? 'bg-white shadow-md transform scale-105' : 'bg-transparent'
                ]" @mouseenter="handleLabelHover(option.id, $event)"
                    @mouseleave="hoveredSegment = null; tooltipPosition = null">
                    <div class="flex items-center mb-2">
                        <div :class="[
                            'w-4 h-4 rounded-full mr-3 transition-all duration-300',
                            hoveredSegment === option.id ? 'scale-125' : 'scale-100'
                        ]" :style="{ backgroundColor: option.color }"></div>
                        <h3 class="font-semibold text-gray-800">{{ option.label }} ({{ option.value }})</h3>
                    </div>
                    <p class="text-sm text-gray-600 leading-relaxed">{{ option.description }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import NewButton from '../../../../../components/customer/NewButton.vue'
import Swal from 'sweetalert2';
import Cookies from 'js-cookie'
import initAPI from '../../../../../api/api';

const downloading = ref(false);

interface Option {
    id: string
    label: string
    description: string
    color: string
    value: number
}

interface Segment {
    id: string
    path: string
    color: string
    circumference: number
}

const props = defineProps({
    sekolahId: { type: Number },
    karierData: {
        type: Object,
        default: () => ({
            sci: { name: "SCI - Study Continuation", count: 0, percent: 0 },
            eri: { name: "ERI - Entrepreneurship Readiness", count: 0, percent: 0 },
            wri: { name: "WRI - Work Readiness", count: 0, percent: 0 }
        })
    }
})

const isLoaded = ref(false)
const hoveredSegment = ref<string | null>(null)
const tooltipPosition = ref<{ x: number; y: number } | null>(null)
const svgElement = ref<SVGElement | null>(null)

const hasValidKarierData = computed(() => {
    if (!props.karierData) return false;
    
    const { sci, eri, wri } = props.karierData;
    const totalCount = (sci?.count || 0) + (eri?.count || 0) + (wri?.count || 0);
    
    return totalCount > 0;
});

const options = computed<Option[]>(() => {
    const { sci, eri, wri } = props.karierData

    return [
        {
            id: 'sci',
            label: sci?.name,
            description: 'Siswa dengan kecenderungan untuk melanjutkan studi ke jenjang yang lebih tinggi',
            color: '#E91E63',
            value: sci?.count
        },
        {
            id: 'eri',
            label: eri?.name,
            description: 'Siswa dengan kecenderungan untuk berwirausaha dan mengembangkan bisnis',
            color: '#1A237E',
            value: eri?.count
        },
        {
            id: 'wri',
            label: wri?.name,
            description: 'Siswa dengan kecenderungan untuk langsung memasuki dunia kerja',
            color: '#1976D2',
            value: wri?.count
        }
    ]
})

const segments = computed<Segment[]>(() => {
    const total = options.value.reduce((sum, option) => sum + option.value, 0)
    let currentAngle = 0
    const centerX = 300
    const centerY = 300
    const radius = 180

    return options.value.map(option => {
        const percentage = option.value / total
        const angle = percentage * Math.PI * 2 // Full circle (2π radians)

        const startAngle = currentAngle
        const endAngle = currentAngle + angle

        const x1 = centerX + radius * Math.cos(startAngle - Math.PI / 2)
        const y1 = centerY + radius * Math.sin(startAngle - Math.PI / 2)
        const x2 = centerX + radius * Math.cos(endAngle - Math.PI / 2)
        const y2 = centerY + radius * Math.sin(endAngle - Math.PI / 2)

        const largeArcFlag = angle > Math.PI ? 1 : 0

        const path = [
            `M ${centerX} ${centerY}`,
            `L ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            'Z'
        ].join(' ')

        currentAngle += angle

        return {
            id: option.id,
            path,
            color: option.color,
            circumference: angle * radius
        }
    })
})

const getSegmentById = (id: string) => {
    return options.value.find(option => option.id === id)
}

const handleLabelHover = (id: string, event: MouseEvent) => {
    hoveredSegment.value = id
    const rect = svgElement.value?.getBoundingClientRect()
    if (rect) {
        tooltipPosition.value = {
            x: rect.width / 2,
            y: rect.height / 2 - 50
        }
    }
}

const updateTooltipPosition = (event: MouseEvent) => {
    if (hoveredSegment.value && svgElement.value) {
        const rect = svgElement.value.getBoundingClientRect()
        tooltipPosition.value = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        }
    }
}

const handleDownload = async () => {
    if (!props.sekolahId) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Data karir tidak tersedia untuk diunduh',
            confirmButtonColor: '#3b82f6',
        });
        return;
    }

    try {
        downloading.value = true;
        const token = Cookies.get('token');
        const response = await fetch(
            `https://api.jatidiri.app/api/institutions-bmw/${props.sekolahId}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Gagal mengunduh file');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `hasil-karir.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        Swal.fire({
            icon: 'success',
            title: 'Berhasil',
            text: 'File hasil karir berhasil diunduh',
            confirmButtonColor: '#3b82f6',
        });

    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal',
            text: 'Gagal mengunduh file. Silakan coba lagi.',
            confirmButtonColor: '#3b82f6',
        });
        console.error(err)
    } finally {
        downloading.value = false;
    }
};

onMounted(async () => {
    await nextTick()
    setTimeout(() => {
        isLoaded.value = true
    }, 100)
})
</script>

<style>
.swal2-confirm {
    background-color: #0b40f4 !important;
    color: white !important;
}

.swal2-cancel {
    background-color: #3b3f5c !important;
    color: white !important;
}

.swal2-styled:focus {
    box-shadow: none !important;
}
</style>