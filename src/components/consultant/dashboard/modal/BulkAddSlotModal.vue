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
            <h3 class="text-xl font-bold text-slate-800">Tambah Slot Secara Massal</h3>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="$emit('add-bulk-slots')">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Mulai</label>
                <input :value="bulkSlot.start_date" @input="updateBulkSlot('start_date', $event.target.value)"
                  type="date" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal Selesai</label>
                <input :value="bulkSlot.end_date" @input="updateBulkSlot('end_date', $event.target.value)" type="date"
                  required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Jam Mulai</label>
                <input :value="displayTimes.start_time" @input="updateBulkSlot('start_time', $event.target.value)"
                  type="time" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Jam Selesai</label>
                <input :value="displayTimes.end_time" @input="updateBulkSlot('end_time', $event.target.value)"
                  type="time" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Durasi (menit)</label>
                <input :value="bulkSlot.duration" @input="updateBulkSlot('duration', $event.target.value)" type="number"
                  min="30" required
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Hari</label>
                <div class="grid grid-cols-3 gap-2">
                  <label v-for="day in days" :key="day.value" class="flex items-center">
                    <input type="checkbox" :checked="bulkSlot.days.includes(day.value)" @change="toggleDay(day.value)"
                      class="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                    <span class="ml-2 text-sm text-slate-700">{{ day.label }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="mt-6 flex space-x-3">
              <button type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Buat Slot Massal
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
import moment from 'moment-timezone';

export default {
  name: 'BulkAddSlotModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    bulkSlot: {
      type: Object,
      required: true
    },
    days: {
      type: Array,
      required: true
    }
  },
  emits: ['close', 'add-bulk-slots', 'update:bulk-slot'],
  methods: {
    updateBulkSlot(field, value) {
      // Konversi waktu dari WIB ke UTC sebelum mengupdate
      let updatedValue = value;

      if (field === 'start_time' || field === 'end_time') {
        if (value && this.bulkSlot.start_date) {
          const date = this.bulkSlot.start_date;
          const datetimeString = `${date}T${value}`;
          const utcTime = moment.tz(datetimeString, 'Asia/Jakarta').utc().format('HH:mm');
          updatedValue = utcTime;
        }
      }

      const updatedSlot = { ...this.bulkSlot, [field]: updatedValue }
      this.$emit('update:bulk-slot', updatedSlot)
    },

    toggleDay(dayValue) {
      const currentDays = [...this.bulkSlot.days]
      const index = currentDays.indexOf(dayValue)

      if (index > -1) {
        currentDays.splice(index, 1)
      } else {
        currentDays.push(dayValue)
      }

      this.updateBulkSlot('days', currentDays)
    },

    // Format waktu UTC ke WIB untuk ditampilkan
    formatTimeToWIB(utcTime) {
      if (!utcTime) return '';
      return moment.tz(`1970-01-01T${utcTime}Z`, 'UTC').tz('Asia/Jakarta').format('HH:mm');
    }
  },

  computed: {
    // Buat computed property untuk menampilkan waktu dalam WIB
    displayTimes() {
      return {
        start_time: this.formatTimeToWIB(this.bulkSlot.start_time),
        end_time: this.formatTimeToWIB(this.bulkSlot.end_time)
      }
    }
  }
}
</script>
