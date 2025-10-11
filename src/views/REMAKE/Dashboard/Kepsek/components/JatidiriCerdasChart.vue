<template>
    <div class="bg-white p-4 flex flex-col rounded-xl">
        <div class="grid grid-cols-1 md:flex md:items-center md:justify-between">
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                Statistik Jatidiri Cerdas
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

        <div class="px-4 sm:px-8 py-6 flex flex-col items-center relative">
            <div class="w-full">
                <!-- Custom Pentagon Radar Chart -->
                <div class="relative" ref="chartContainer">
                    <svg :width="svgSize" :height="svgSize" :viewBox="`0 0 ${svgSize} ${svgSize}`"
                        class="w-full h-auto max-w-sm mx-auto overflow-visible" ref="svgChart">

                        <!-- Grid Lines (Pentagon shapes) -->
                        <g v-for="(scale, index) in gridScales" :key="`grid-${index}`">
                            <polygon :points="generatePentagonPoints(centerX, centerY, scale * maxRadius)" fill="none"
                                :stroke="index === gridScales.length - 1 ? '#3b82f6' : '#e2e8f0'"
                                :stroke-width="index === gridScales.length - 1 ? 2 : 1"
                                class="transition-all duration-300" />
                        </g>

                        <!-- Grid Labels -->
                        <g v-for="(scale, index) in gridScales" :key="`label-${index}`">
                            <text :x="centerX" :y="centerY - (scale * maxRadius) + 5" text-anchor="middle"
                                class="text-xs fill-gray-600 font-medium" v-if="scale > 0">
                                {{ Math.round(scale * maxValue) }}
                            </text>
                        </g>

                        <!-- Axis Lines -->
                        <g v-for="(point, index) in pentagonPoints" :key="`axis-${index}`">
                            <line :x1="centerX" :y1="centerY" :x2="point.x" :y2="point.y" stroke="#e2e8f0"
                                stroke-width="1" />
                        </g>

                        <!-- Data Polygon -->
                        <polygon :points="dataPolygonPoints" fill="#3b82f6" fill-opacity="0.3" stroke="#3b82f6"
                            stroke-width="2" class="transition-all duration-500 hover:fill-opacity-50" />

                        <!-- Data Points -->
                        <g v-for="(point, index) in dataPoints" :key="`point-${index}`">
                            <circle :cx="point.x" :cy="point.y" r="4" fill="#3b82f6"
                                class="transition-all duration-300 hover:r-6 cursor-pointer"
                                @mouseenter="showTooltip($event, index)" @mouseleave="hideTooltip" />
                        </g>

                        <!-- Category Labels -->
                        <g v-for="(label, index) in categoryLabels" :key="`category-${index}`">
                            <text :x="label.x" :y="label.y" :text-anchor="label.anchor"
                                class="text-sm font-medium transition-colors duration-300"
                                :class="hoveredCategory === index ? 'fill-blue-600' : 'fill-gray-700'"
                                @mouseenter="hoveredCategory = index" @mouseleave="hoveredCategory = null">
                                {{ label.text }}
                            </text>
                        </g>
                    </svg>
                </div>

                <!-- Legend -->
                <div class="w-full mt-2 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-3">
                    <div v-for="(category, index) in categories" :key="index"
                        class="flex items-center gap-2 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
                        :class="hoveredCategory === index ? 'bg-blue-50' : 'hover:bg-gray-50'"
                        @mouseenter="hoveredCategory = index" @mouseleave="hoveredCategory = null">
                        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span class="text-xs sm:text-sm font-medium text-gray-700">
                            {{ category }}
                        </span>
                        <span class="text-xs text-gray-500 ml-auto">
                            {{ data[index] }} siswa
                        </span>
                    </div>
                </div>
            </div>

            <!-- Tooltip -->
            <div v-if="tooltip.show" :style="{ left: tooltip.x + 'px', top: tooltip.y + 'px' }"
                class="absolute bg-gray-800 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg z-10 pointer-events-none transition-opacity duration-200"
                :class="tooltip.show ? 'opacity-100' : 'opacity-0'">
                {{ tooltip.text }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Props
const props = defineProps({
    data: {
        type: Array,
        default: () => [0, 0, 0, 0, 0]
    },
    loading: {
        type: Boolean,
        default: false
    }
});

// Reactive data
const svgSize = ref(400);
const centerX = computed(() => svgSize.value / 2);
const centerY = computed(() => svgSize.value / 2);
const maxRadius = computed(() => Math.min(svgSize.value * 0.35, 140));
const hoveredCategory = ref(null);

// Categories (in clockwise order starting from top)
const categories = [
    '> 119',
    '111 - 119',
    '91 - 110',
    '80 - 90',
    '< 80'
];

// Chart data
const maxValue = computed(() => Math.max(...props.data, 10));
const gridScales = [0.2, 0.4, 0.6, 0.8, 1.0];

// Pentagon points calculation (starting from top, clockwise)
const pentagonPoints = computed(() => {
    const points = [];
    for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * (Math.PI / 180); // Start from top (-90°)
        const x = centerX.value + maxRadius.value * Math.cos(angle);
        const y = centerY.value + maxRadius.value * Math.sin(angle);
        points.push({ x, y });
    }
    return points;
});

// Generate pentagon points for grid
const generatePentagonPoints = (cx, cy, radius) => {
    const points = [];
    for (let i = 0; i < 5; i++) {
        const angle = (i * 72 - 90) * (Math.PI / 180);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        points.push(`${x},${y}`);
    }
    return points.join(' ');
};

// Data points calculation
const dataPoints = computed(() => {
    return props.data.map((value, index) => {
        const normalizedValue = maxValue.value > 0 ? value / maxValue.value : 0;
        const angle = (index * 72 - 90) * (Math.PI / 180);
        const radius = normalizedValue * maxRadius.value;
        const x = centerX.value + radius * Math.cos(angle);
        const y = centerY.value + radius * Math.sin(angle);
        return { x, y };
    });
});

// Data polygon points for fill
const dataPolygonPoints = computed(() => {
    return dataPoints.value.map(point => `${point.x},${point.y}`).join(' ');
});

// Category labels positioning
const categoryLabels = computed(() => {
    const labelOffset = 25;
    return categories.map((category, index) => {
        const angle = (index * 72 - 90) * (Math.PI / 180);
        const x = centerX.value + (maxRadius.value + labelOffset) * Math.cos(angle);
        const y = centerY.value + (maxRadius.value + labelOffset) * Math.sin(angle);

        // Adjust text anchor based on position
        let anchor = 'middle';
        if (x > centerX.value + 5) anchor = 'start';
        else if (x < centerX.value - 5) anchor = 'end';

        return {
            x,
            y: y + 5, // Slight vertical adjustment for better readability
            text: category,
            anchor
        };
    });
});

// Tooltip
const tooltip = ref({
    show: false,
    x: 0,
    y: 0,
    text: ''
});

const showTooltip = (event, index) => {
    const rect = event.target.getBoundingClientRect();
    const containerRect = event.target.closest('.relative').getBoundingClientRect();

    tooltip.value = {
        show: true,
        x: event.clientX - containerRect.left,
        y: event.clientY - containerRect.top - 40,
        text: `${categories[index]}: ${props.data[index]} siswa`
    };
};

const hideTooltip = () => {
    tooltip.value.show = false;
};

// Chart download functionality
const svgChart = ref(null);

const downloadChart = async () => {
    if (!svgChart.value) return;

    try {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = svgSize.value;
        canvas.height = svgSize.value;

        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(svgChart.value);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        // Create image from SVG
        const img = new Image();
        img.onload = () => {
            // Fill white background
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw the SVG image
            ctx.drawImage(img, 0, 0);

            // Download the canvas as PNG
            const link = document.createElement('a');
            link.download = 'Jatidiri-Cerdas-Chart.png';
            link.href = canvas.toDataURL('image/png');
            link.click();

            // Cleanup
            URL.revokeObjectURL(url);
        };
        img.src = url;

    } catch (error) {
        console.error('Error downloading chart:', error);
    }
};

const handleResize = () => {
    if (window.innerWidth < 640) {
        svgSize.value = 300;
    } else if (window.innerWidth < 768) {
        svgSize.value = 350;
    } else {
        svgSize.value = 400;
    }
};

onMounted(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.hover\:fill-opacity-50:hover {
    fill-opacity: 0.5;
}

circle {
    transition: all 0.3s ease;
}

polygon {
    transition: all 0.5s ease;
}

text {
    transition: all 0.3s ease;
}
</style>