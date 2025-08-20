<template>
  <div v-if="show" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" aria-hidden="true"
        @click="$emit('close')"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
        <div class="bg-white px-6 pt-6 pb-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Tambah Slot Berulang</h3>
            <button @click="$emit('close')"
              class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="$emit('add-recurring-slots', recurringSlot)">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Mulai</label>
                <input v-model="recurringSlot.start_date" type="date" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Selesai</label>
                <input v-model="recurringSlot.end_date" type="date" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Jam Mulai</label>
                <input v-model="recurringSlot.start_time" type="time" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Jam Selesai</label>
                <input v-model="recurringSlot.end_time" type="time" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Durasi (menit)</label>
                <input v-model="recurringSlot.duration" type="number" min="30" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Pola Pengulangan</label>
                <div class="flex space-x-2">
                  <select v-model="recurringSlot.repeat_every"
                    class="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                    <option value="day">Harian</option>
                    <option value="week">Mingguan</option>
                    <option value="month">Bulanan</option>
                  </select>
                  <input v-model="recurringSlot.repeat_interval" type="number" min="1" placeholder="Interval"
                    class="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                </div>
              </div>
              <div v-if="recurringSlot.repeat_every === 'week'">
                <label class="block text-sm font-semibold text-slate-700 mb-2">Hari</label>
                <div class="grid grid-cols-3 gap-2">
                  <label v-for="day in days" :key="day.value" class="flex items-center">
                    <input type="checkbox" v-model="recurringSlot.days" :value="day.value"
                      class="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <span class="ml-2 text-sm text-slate-700">{{ day.label }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-6 flex space-x-3">
              <button type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Buat Slot Berulang
              </button>
              <button type="button" @click="$emit('close')"
                class="flex-1 px-6 py-3 bg-white border border-slate-300 rounded-xl text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200">
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    recurringSlot: Object,
    days: Array
  },
  emits: ['close', 'add-recurring-slots']
}
</script>