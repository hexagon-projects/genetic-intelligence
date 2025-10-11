<template>
  <div class=" font-sora">
    <div class="bg-white rounded-lg p-6">
      <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        Statistik Jatidiri Cerdas Dewasa
      </h2>

      <div class="relative h-96">
        <canvas ref="chartCanvas"></canvas>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-center">
        <div class="bg-blue-50 p-3 rounded">
          <div class="text-lg font-semibold text-blue-600">{{ totalSamples }}</div>
          <div class="text-sm text-gray-600">Total Data</div>
        </div>
        <div class="bg-green-50 p-3 rounded">
          <div class="text-lg font-semibold text-green-600">{{ averageIQ }}</div>
          <div class="text-sm text-gray-600">Rata-rata IQ</div>
        </div>
        <div class="bg-purple-50 p-3 rounded">
          <div class="text-lg font-semibold text-purple-600">{{ minIQ }}</div>
          <div class="text-sm text-gray-600">IQ Terendah</div>
        </div>
        <div class="bg-orange-50 p-3 rounded">
          <div class="text-lg font-semibold text-orange-600">{{ maxIQ }}</div>
          <div class="text-sm text-gray-600">IQ Tertinggi</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, type Ref } from 'vue'
import type { Chart } from 'chart.js'

const props = defineProps<{
  iqData: Record<string, number>
}>()

const chartCanvas: Ref<HTMLCanvasElement | null> = ref(null)
let chart: Chart | null = null

const sortedData = computed((): { iq: number; frequency: number }[] => {
  return Object.entries(props.iqData)
    .map(([iq, frequency]) => ({ iq: parseInt(iq), frequency }))
    .sort((a, b) => a.iq - b.iq)
})

const totalSamples = computed((): number => {
  return Object.values(props.iqData).reduce((sum, freq) => sum + freq, 0)
})

const averageIQ = computed((): number => {
  const weightedSum = Object.entries(props.iqData).reduce((sum, [iq, freq]) => {
    return sum + (parseInt(iq) * freq)
  }, 0)
  return Math.round(weightedSum / totalSamples.value)
})

const minIQ = computed((): number => {
  return Math.min(...Object.keys(props.iqData).map(Number))
})

const maxIQ = computed((): number => {
  return Math.max(...Object.keys(props.iqData).map(Number))
})

const initChart = async () => {
  const { Chart, registerables } = await import('https://cdn.skypack.dev/chart.js')
  Chart.register(...registerables)

  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  if (chart) {
    chart.destroy()
  }

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sortedData.value.map(item => item.iq.toString()),
      datasets: [{
        label: 'Frekuensi',
        data: sortedData.value.map(item => item.frequency),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            font: {
              size: 14,
              weight: 'bold'
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: 'white',
          bodyColor: 'white',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
          callbacks: {
            label: function (context) {
              return `Frekuensi ${context.parsed.y} orang`
            },
            title: function (context) {
              return `IQ ${context[0].label}`
            }
          }
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Skor IQ',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Frekuensi (Jumlah Orang)',
            font: {
              size: 14,
              weight: 'bold'
            }
          },
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })
}

onMounted(() => {
  initChart()
})

watch(() => props.iqData, () => {
  initChart()
}, { deep: true })
</script>

<style scoped>
.bg-blue-50 {
  background-color: #eff6ff;
}

.bg-green-50 {
  background-color: #f0fdf4;
}

.bg-purple-50 {
  background-color: #faf5ff;
}

.bg-orange-50 {
  background-color: #fff7ed;
}
</style>