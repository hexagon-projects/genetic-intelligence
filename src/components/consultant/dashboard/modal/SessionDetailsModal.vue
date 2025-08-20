<template>
  <div v-if="selectedSession" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" aria-hidden="true"
        @click="$emit('close')"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-6 pt-6 pb-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Detail Sesi</h3>
            <button @click="$emit('close')"
              class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Nama Pasien</p>
              <p class="font-semibold text-slate-800">{{ selectedSession.user.customers.first_name }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Email</p>
              <p class="font-semibold text-slate-800">{{ selectedSession.user.email }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Tanggal & Waktu</p>
              <p class="font-semibold text-slate-800">{{ formatDate(selectedSession.slot.start_time) }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Status</p>
              <span :class="`px-3 py-1 text-xs font-medium rounded-full ${selectedSession.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' :
                selectedSession.status === 'booked' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-600'
                }`">
                {{ getStatusText(selectedSession.status) }}
              </span>
            </div>
            <div v-if="selectedSession.package" class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Paket</p>
              <p class="font-semibold text-slate-800">{{ selectedSession.package.name }}</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Durasi</p>
              <p class="font-semibold text-slate-800">{{ selectedSession.slot.duration }} menit</p>
            </div>
            <div class="bg-slate-50 rounded-xl p-4">
              <p class="text-sm font-medium text-slate-600 mb-1">Link Meet</p>
              <a :href="selectedSession.meet_link" class="font-semibold text-blue-500">Join</a>
            </div>
          </div>
          <div v-if="selectedSession.notes" class="bg-slate-50 rounded-xl p-4">
            <p class="text-sm font-medium text-slate-600 mb-2">Catatan</p>
            <p class="text-slate-800">{{ selectedSession.notes }}</p>
          </div>
        </div>
        <div class="bg-slate-50 px-6 py-4 flex justify-end">
          <button type="button" @click="$emit('close')"
            class="px-6 py-2 bg-white border border-slate-300 rounded-xl text-slate-700 font-medium hover:bg-slate-50 transition-all duration-200 shadow-sm">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SessionDetailsModal',
  props: {
    selectedSession: {
      type: Object,
      default: null
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
  emits: ['close']
}
</script>
