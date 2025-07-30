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
            <h3 class="text-xl font-bold text-slate-800">Tambah Spesialisasi</h3>
            <button @click="$emit('close')"
              class="text-slate-400 hover:text-slate-600 transition-colors duration-200">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                </path>
              </svg>
            </button>
          </div>
          <form @submit.prevent="$emit('add-specialization')">
            <div>
              <label for="specialization"
                class="block text-sm font-semibold text-slate-700 mb-2">Spesialisasi</label>
              <select :value="newSpecialization" @change="$emit('update:new-specialization', $event.target.value)" id="specialization"
                class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                <option value="">Pilih spesialisasi</option>
                <option v-for="spec in availableSpecializations" :key="spec.id" :value="spec.id">{{ spec.name }}
                </option>
              </select>
            </div>
            <div class="mt-6 flex space-x-3">
              <button type="submit"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                Tambah
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
  name: 'AddSpecializationModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    availableSpecializations: {
      type: Array,
      required: true
    },
    newSpecialization: {
      type: String,
      default: ''
    }
  },
  emits: ['close', 'add-specialization', 'update:new-specialization']
}
</script>
