<template>
  <div class="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
    <!-- Calendar Header -->
    <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-100">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold text-slate-800">Kalender Jadwal</h2>
            <p class="text-sm text-slate-600">Kelola ketersediaan dan janji temu Anda</p>
          </div>
        </div>
        <div class="flex space-x-2">
          <button @click="$emit('show-add-slot-modal')"
            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
              </path>
            </svg>
            Tambah Slot
          </button>
          <button @click="$emit('show-bulk-add-slot-modal')"
            class="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10">
              </path>
            </svg>
            Bulk Slot
          </button>
          <!-- <button @click="$emit('show-recurring-slot-modal')"
            class="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
              </path>
            </svg>
            Recurring
          </button> -->
        </div>
      </div>
    </div>

    <!-- Calendar Legend -->
    <!-- <div class="px-6 py-4 bg-slate-50/50 border-b border-slate-100">
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <span class="text-slate-600 font-medium mr-2">Keterangan:</span>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span class="text-slate-700">Tersedia</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-amber-500 rounded-full"></div>
          <span class="text-slate-700">Dipesan</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span class="text-slate-700">Dikonfirmasi</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span class="text-slate-700">Selesai</span>
        </div>
        <div class="flex items-center space-x-2">
          <div class="w-3 h-3 bg-red-500 rounded-full"></div>
          <span class="text-slate-700">Dibatalkan</span>
        </div>
      </div>
    </div> -->
    
    <!-- Calendar Container -->
    <div class="p-6">
      <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <FullCalendar :options="calendarOptions" class="w-full calendar-container" />
      </div>
    </div>
  </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue3'

export default {
  name: 'CalendarSection',
  components: {
    FullCalendar
  },
  props: {
    calendarOptions: {
      type: Object,
      required: true
    }
  },
  emits: ['show-add-slot-modal', 'show-bulk-add-slot-modal', 'show-recurring-slot-modal']
}
</script>

<style>
.calendar-container .fc-event[data-status="available"] {
  background-color: #10B981 !important;
  border-color: #059669 !important;
}

.calendar-container .fc-event[data-status="booked"] {
  background-color: #F59E0B !important;
  border-color: #D97706 !important;
}

.calendar-container .fc-event[data-status="confirmed"] {
  background-color: #3B82F6 !important;
  border-color: #2563EB !important;
}

.calendar-container .fc-event[data-status="completed"] {
  background-color: #8B5CF6 !important;
  border-color: #7C3AED !important;
}

.calendar-container .fc-event[data-status="cancelled"] {
  background-color: #EF4444 !important;
  border-color: #DC2626 !important;
}
</style>