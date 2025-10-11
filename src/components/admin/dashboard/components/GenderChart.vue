<template>
  <div class="font-sora">
    <div class="">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DataCard bgColor="bg-[#10b981]" :image="Users" :number="totalUsers.toLocaleString()"
          :title="'Total Pengguna'" />
        <DataCard bgColor="bg-[#06b6d4]" :image="Users" :number="largestAgeGroup" :title="'Kelompok Terbesar'" />
        <DataCard bgColor="bg-[#ec4899]" :image="Karir" :number="totalInstitutions" :title="'Total Institusi'" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-slate-800 mb-2">Distribusi Gender</h3>
            <p class="text-slate-500 text-sm">Perbandingan pengguna berdasarkan jenis kelamin</p>
          </div>
          <div class="relative h-80">
            <canvas ref="genderChart" class="w-full h-full"></canvas>
          </div>
          <div class="mt-4 flex justify-center space-x-6">
            <div class="flex items-center">
              <div class="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span class="text-sm text-slate-600">Laki-laki ({{ genderData[0]?.total.toLocaleString() }})</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
              <span class="text-sm text-slate-600">Perempuan ({{ genderData[1]?.total.toLocaleString() }})</span>
            </div>
            <div class="flex items-center">
              <div class="w-3 h-3 bg-slate-400 rounded-full mr-2"></div>
              <span class="text-sm text-slate-600">Data Kosong ({{ genderData[2]?.total.toLocaleString() }})</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div class="mb-6">
            <h3 class="text-xl font-semibold text-slate-800 mb-2">Distribusi Kelompok Umur</h3>
            <p class="text-slate-500 text-sm">Sebaran pengguna berdasarkan rentang usia</p>
          </div>
          <div class="relative h-80">
            <canvas ref="ageChart" class="w-full h-full"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue'
import Chart from 'chart.js/auto'
import DataCard from '../../../../views/REMAKE/Dashboard/Kepsek/components/DataCard.vue'
import Users from '../../../../assets/icons/users.png'
import Karir from '../../../../assets/icons/karir.png'

interface GenderData {
  gender: number | null
  total: number
}

interface AgeData {
  age_group: number
  total: number
  range: string
}

const props = defineProps({
  genderData: {
    type: Array as () => GenderData[],
    required: true
  },
  ageData: {
    type: Array as () => AgeData[],
    required: true
  },
  totalInstitutions: {
    type: Array,
    required: true
  }
})

const genderChart = ref<HTMLCanvasElement>()
const ageChart = ref<HTMLCanvasElement>()

const totalUsers = computed(() => {
  return props.genderData.reduce((sum, item) => sum + item.total, 0)
})

const largestAgeGroup = computed(() => {
  if (!props.ageData.length) return ''
  const largest = props.ageData.reduce((prev, current) =>
    (prev.total > current.total) ? prev : current
  )
  return largest.range.replace(' Tahun', '')
})

const genderRatio = computed(() => {
  const male = props.genderData.find(item => item.gender === 1)?.total || 0
  const female = props.genderData.find(item => item.gender === 2)?.total || 0

  if (male === 0 || female === 0) return '0:0'

  const ratio = (female / male).toFixed(1)
  return `${ratio}:1`
})

onMounted(() => {
  createGenderChart()
  createAgeChart()
})

const createGenderChart = () => {
  if (!genderChart.value) return

  const ctx = genderChart.value.getContext('2d')
  if (!ctx) return

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Laki-laki', 'Perempuan', 'Tidak Diketahui'],
      datasets: [{
        data: props.genderData.map(item => item.total),
        backgroundColor: [
          '#3B82F6',
          '#EC4899',
          '#94A3B8'
        ],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
            label: function (context) {
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = ((context.parsed / total) * 100).toFixed(1)
              return `${context.label}: ${context.parsed.toLocaleString()} (${percentage}%)`
            }
          }
        }
      },
      animation: {
        animateRotate: true,
        duration: 2000,
        easing: 'easeOutQuart'
      }
    }
  })
}

const createAgeChart = () => {
  if (!ageChart.value) return

  const ctx = ageChart.value.getContext('2d')
  if (!ctx) return

  const gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)')
  gradient.addColorStop(1, 'rgba(147, 51, 234, 0.2)')

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: props.ageData.map(item => item.range.replace(' Tahun', '')),
      datasets: [{
        label: 'Jumlah Pengguna',
        data: props.ageData.map(item => item.total),
        backgroundColor: gradient,
        borderColor: '#3B82F6',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
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
            label: function (context) {
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = ((context.parsed.y / total) * 100).toFixed(1)
              return `${context.parsed.y.toLocaleString()} pengguna (${percentage}%)`
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#64748B',
            font: {
              size: 11
            },
            maxRotation: 45
          }
        },
        y: {
          grid: {
            color: 'rgba(148, 163, 184, 0.1)'
          },
          ticks: {
            color: '#64748B',
            callback: function (value) {
              return value.toLocaleString()
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