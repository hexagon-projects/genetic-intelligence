<template>
  <div v-if="show" class="fixed inset-0 overflow-y-auto z-50">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity bg-black/50 backdrop-blur-sm" aria-hidden="true"
        @click="$emit('close')"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
        class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-6 pt-6 pb-4">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-xl font-bold text-slate-800">Tambah Slot Waktu Tersedia</h3>
            <button @click="$emit('close')"
              class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="$emit('add-slot')">
            <div class="space-y-4">
              <div>
                <label for="start_time" class="block text-sm font-semibold text-slate-700 mb-2">Waktu Mulai</label>
                <input :value="displayStartTime" @input="handleStartTimeChange($event.target.value)" type="datetime-local" id="start_time"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
              <div>
                <label for="duration" class="block text-sm font-semibold text-slate-700 mb-2">Durasi (menit)</label>
                <input :value="newSlot.duration" @input="updateNewSlot('duration', $event.target.value)" type="number" id="duration" min="30"
                  class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
              </div>
            </div>
            <div class="mt-6 flex space-x-3">
              <button type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Tambah Slot
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
  name: 'AddSlotModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    newSlot: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'add-slot', 'update:new-slot'],
  computed: {
    displayStartTime() {
      if (!this.newSlot.start_time) return '';
      return moment(this.newSlot.start_time).tz('Asia/Jakarta').format('YYYY-MM-DDTHH:mm');
    }
  },
  methods: {
    updateNewSlot(field, value) {
      const updatedSlot = { ...this.newSlot, [field]: value };
      this.$emit('update:new-slot', updatedSlot);
    },
    
    handleStartTimeChange(wibTime) {
      if (!wibTime) {
        this.updateNewSlot('start_time', '');
        return;
      }
      
      const utcTime = moment.tz(wibTime, 'Asia/Jakarta').utc().toISOString();
      this.updateNewSlot('start_time', utcTime);
    }
  }
}
</script>