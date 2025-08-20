<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-slate-800 flex items-center">
        <svg class="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
          </path>
        </svg>
        Spesialisasi Anda
      </h2>
      <button @click="$emit('show-add-specialization-modal')"
        class="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center">
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6">
          </path>
        </svg>
        Tambah Spesialisasi
      </button>
    </div>
    <div v-if="specializations?.length > 0" class="flex flex-wrap gap-3">
      <span v-for="spec in specializations" :key="spec.id"
        class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200">
        {{ spec.name }}
        <button @click="$emit('remove-specialization', spec.id)"
          class="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-blue-500 hover:bg-blue-200 hover:text-blue-700 transition-all duration-200">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </span>
    </div>
    <div v-else class="text-center py-8">
      <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z">
        </path>
      </svg>
      <p class="text-slate-500">Belum ada spesialisasi yang ditambahkan</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Specializations',
  props: {
    specializations: {
      type: Array,
      required: true
    }
  },
  emits: ['show-add-specialization-modal', 'remove-specialization']
}
</script>
