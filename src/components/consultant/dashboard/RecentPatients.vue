<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-slate-800 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
          </path>
        </svg>
        Pasien Terbaru
      </h2>
      <button @click="$emit('navigate-to-book-list')"
        class="text-blue-600 hover:text-blue-700 font-medium text-sm hover:underline transition-all duration-200">
        Lihat Semua
      </button>
    </div>
    <div class="bg-white rounded-xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead class="bg-slate-50">
            <tr>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pasien
              </th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Sesi
                Terakhir</th>
              <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="patient in recentPatients" :key="patient?.id"
              class="hover:bg-slate-50 transition-colors duration-200">
              <td class="px-6 py-4">
                <div class="flex items-center">
                  <div
                    class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {{ patient?.user?.customers?.first_name?.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-medium text-slate-800">{{ patient?.user?.customers?.first_name }}</div>
                    <div class="text-sm text-slate-500">{{ patient?.user?.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-slate-600">
                {{ formatDate(patient?.start_time) }}
              </td>
              <td class="px-6 py-4">
                <span :class="`px-3 py-1 text-xs font-medium rounded-full ${patient?.status === 'completed' ? 'bg-emerald-100 text-emerald-700' :
                  patient?.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    'bg-amber-100 text-amber-700'
                  }`">
                  {{ getStatusText(patient?.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentPatients',
  props: {
    recentPatients: {
      type: Array,
      required: true
    },
    formatDate: {
      type: Function,
      required: true
    },
    getStatusText: {
      type: Function,
      required: true
    }
  },
  emits: ['navigate-to-book-list']
}
</script>
