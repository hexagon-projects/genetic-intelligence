<template>
  <div class="bg-white rounded-lg shadow-sm border p-6">
     <!-- Header  -->
    <div class="flex items-center gap-3 mb-6">
      <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h2 class="text-lg font-semibold text-gray-900">Sesi Mendatang</h2>
    </div>

     <!-- Sessions List  -->
    <div v-if="upcomingSessions?.length > 0" class="space-y-4">
      <div v-for="session in upcomingSessions" :key="session.id"
        class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        
         <!-- Session Info  -->
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              {{ session?.user?.customers?.first_name?.charAt(0) }}
            </div>
            <div>
              <h3 class="font-medium text-gray-900">
                {{ session?.user?.customers?.first_name }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ formatDate(session?.slot?.start_time) }}
              </p>
            </div>
          </div>
          
           <!-- Status  -->
          <span :class="{
            'bg-green-100 text-green-700': session?.status === 'confirmed',
            'bg-yellow-100 text-yellow-700': session?.status === 'booked',
            'bg-blue-100 text-blue-700': session?.status === 'pending',
            'bg-gray-100 text-gray-700': !['confirmed', 'booked', 'pending'].includes(session?.status)
          }" class="px-2 py-1 rounded-md text-xs font-medium">
            {{ getStatusText(session?.status) }}
          </span>
        </div>

         <!-- Actions  -->
        <div class="flex flex-wrap gap-2">
          <button @click="$emit('show-session-details', session)"
            class="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            Detail
          </button>
          
          <button v-if="session?.status === 'booked'" 
            @click="$emit('update-session-status', session?.id, 'confirmed')"
            class="px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-md transition-colors">
            Konfirmasi
          </button>
          
          <button v-if="session?.status === 'confirmed'" 
            @click="$emit('update-session-status', session?.id, 'completed')"
            class="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
            Selesai
          </button>
          
          <button @click="$emit('update-session-status', session?.id, 'cancelled')"
            class="px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors">
            Batal
          </button>
        </div>
      </div>
    </div>

     <!-- Empty State  -->
    <div v-else class="text-center py-12">
      <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">Tidak ada sesi mendatang</h3>
      <p class="text-gray-500 text-sm">
        Sesi konsultasi akan muncul di sini ketika ada jadwal terkonfirmasi.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UpcomingSessions',
  props: {
    upcomingSessions: {
      type: Array,
      required: true
    },
    sectionVisible: {
      type: Boolean,
      default: false
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
  emits: ['show-session-details', 'update-session-status']
}
</script>