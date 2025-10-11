<template>
  <div class="font-sora">
    <div class="">
      <div class="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div class="mb-6">
          <h3 class="text-xl font-semibold text-slate-800 mb-2">Distribusi Pengguna per Institusi</h3>
          <p class="text-slate-500 text-sm">Jumlah pengguna terdaftar di setiap institusi pendidikan</p>
        </div>
        <div class="relative h-96">
          <canvas ref="institutionChart" class="w-full h-full"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch, defineProps } from 'vue'
import Chart from 'chart.js/auto'

interface InstitutionData {
  school_name: string
  total_users: number
}

const props = defineProps<{
  institutionData: InstitutionData[]
}>()

const institutionChart = ref<HTMLCanvasElement>()

const sortedInstitutionData = computed(() => {
  return [...props.institutionData].sort((a, b) => b.total_users - a.total_users)
})

const totalInstitutionUsers = computed(() => {
  return props.institutionData.reduce((sum, item) => sum + item.total_users, 0)
})

const activeInstitutions = computed(() => {
  return props.institutionData.filter(item => item.total_users > 0).length
})

const topInstitution = computed(() => {
  return props.institutionData.reduce((max, item) => 
    item.total_users > max.total_users ? item : max
  , {school_name: '', total_users: 0})
})

let chartInstance: Chart | null = null
let activeElementIndex = ref<number | null>(null)

const createInstitutionChart = () => {
  if (!institutionChart.value) return

  const ctx = institutionChart.value.getContext('2d')
  if (!ctx) return

  if (chartInstance) {
    chartInstance.destroy()
  }

  const gradient = ctx.createLinearGradient(0, 0, 400, 0)
  gradient.addColorStop(0, 'rgba(249, 115, 22, 0.8)')
  gradient.addColorStop(1, 'rgba(239, 68, 68, 0.2)')

  const filteredData = props.institutionData
    .filter(item => item.total_users > 0)
    .sort((a, b) => b.total_users - a.total_users)

  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: filteredData.map(item => {
        return item.school_name.length > 25 
          ? item.school_name.substring(0, 25) + '...' 
          : item.school_name
      }),
      datasets: [{
        label: 'Jumlah Pengguna',
        data: filteredData.map(item => item.total_users),
        backgroundColor: gradient,
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      onClick: (event, activeElements) => {
        if (activeElements.length > 0) {
          const clickedIndex = activeElements[0].index
          
          // Toggle tooltip: jika sama dengan yang aktif, hide. Jika beda, show yang baru
          if (activeElementIndex.value === clickedIndex) {
            // Hide tooltip
            chartInstance!.setActiveElements([])
            chartInstance!.tooltip!.setActiveElements([], {x: 0, y: 0})
            activeElementIndex.value = null
          } else {
            // Show tooltip untuk bar yang diklik
            chartInstance!.setActiveElements([{
              datasetIndex: 0,
              index: clickedIndex
            }])
            chartInstance!.tooltip!.setActiveElements([{
              datasetIndex: 0,
              index: clickedIndex
            }], {
              x: event.x || 0,
              y: event.y || 0
            })
            activeElementIndex.value = clickedIndex
          }
          chartInstance!.update('none')
        } else {
          // Klik di area kosong, hide tooltip
          chartInstance!.setActiveElements([])
          chartInstance!.tooltip!.setActiveElements([], {x: 0, y: 0})
          activeElementIndex.value = null
          chartInstance!.update('none')
        }
      },
      onHover: (event, activeElements) => {
        // Hanya show hover tooltip jika tidak ada yang di-pin
        if (activeElementIndex.value === null && activeElements.length > 0) {
          chartInstance!.canvas.style.cursor = 'pointer'
        } else if (activeElementIndex.value === null && activeElements.length === 0) {
          chartInstance!.canvas.style.cursor = 'default'
        } else {
          // Ada yang di-pin, tetap pointer cursor
          chartInstance!.canvas.style.cursor = 'pointer'
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            title: function(context) {
              const index = context[0].dataIndex
              return filteredData[index].school_name
            },
            label: function(context) {
              const total = filteredData.reduce((sum, item) => sum + item.total_users, 0)
              const percentage = ((context.parsed.x / total) * 100).toFixed(1)
              return `${context.parsed.x.toLocaleString()} pengguna (${percentage}%)`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          },
          ticks: {
            color: '#64748B',
            callback: function(value) {
              return value.toLocaleString()
            }
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748B',
            font: {
              size: 11
            }
          }
        }
      },
      animation: {
        duration: 2000,
        easing: 'easeOutQuart'
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  })
}

onMounted(() => {
  createInstitutionChart()
})

watch(() => props.institutionData, () => {
  activeElementIndex.value = null // Reset active element saat data berubah
  createInstitutionChart()
}, { deep: true })
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  height: 6px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>