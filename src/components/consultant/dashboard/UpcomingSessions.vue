<template>
  <div
    class="bg-white rounded-3xl shadow-lg p-6 md:p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group animate-fade-in-up"
    :class="sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
    <!-- Header with consistent styling -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
          <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
          Sesi Mendatang
        </h2>
      </div>
      <!-- Decorative elements -->
      <div class="relative">
        <div
          class="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
        </div>
        <div
          class="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-primary/30 to-primary/20 rounded-full">
        </div>
      </div>
    </div>
    <!-- Sessions List -->
    <div v-if="upcomingSessions?.length > 0" class="space-y-4">
      <div v-for="(session, index) in upcomingSessions" :key="session.id"
        class="bg-gray-50 rounded-2xl p-4 hover:bg-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group/item animate-fade-in-up"
        :style="{ animationDelay: `${index * 150}ms` }">
        <!-- Session Header -->
        <div class="flex justify-between items-start mb-4">
          <div class="flex items-center space-x-3">
            <!-- Avatar with gradient -->
            <div class="relative">
              <div
                class="w-12 h-12 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                {{ session?.user?.customers?.first_name?.charAt(0) }}
              </div>
              <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white">
              </div>
            </div>
            <div>
              <h3 class="font-bold text-gray-800 group-hover/item:text-primary transition-colors duration-300">
                {{ session?.user?.customers?.first_name }}
              </h3>
              <p class="text-sm text-gray-600 flex items-center gap-1">
                <svg class="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                  </path>
                </svg>
                {{ formatDate(session?.slot?.start_time) }}
              </p>
            </div>
          </div>
          <!-- Status Badge -->
          <span :class="{
            'bg-green-100 text-green-700 border-green-200': session?.status === 'confirmed',
            'bg-yellow-100 text-yellow-700 border-yellow-200': session?.status === 'booked',
            'bg-blue-100 text-blue-700 border-blue-200': session?.status === 'pending',
            'bg-gray-100 text-gray-700 border-gray-200': !['confirmed', 'booked', 'pending'].includes(session?.status)
          }" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border-2 shadow-sm">
            <div :class="{
              'bg-green-500': session?.status === 'confirmed',
              'bg-yellow-500': session?.status === 'booked',
              'bg-blue-500': session?.status === 'pending',
              'bg-gray-500': !['confirmed', 'booked', 'pending'].includes(session?.status)
            }" class="w-2 h-2 rounded-full mr-2"></div>
            {{ getStatusText(session?.status) }}
          </span>
        </div>
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
          <button @click="$emit('show-session-details', session)"
            class="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-600 rounded-full hover:from-blue-500/20 hover:to-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm font-medium group/btn">
            <svg class="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
              </path>
            </svg>
            Detail
          </button>
          <button v-if="session?.status === 'booked'" @click="$emit('update-session-status', session?.id, 'confirmed')"
            class="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-500/10 to-green-600/10 text-green-600 rounded-full hover:from-green-500/20 hover:to-green-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm font-medium group/btn">
            <svg class="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Konfirmasi
          </button>
          <button v-if="session?.status === 'confirmed'" @click="$emit('update-session-status', session?.id, 'completed')"
            class="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/20 text-primary rounded-full hover:from-primary/20 hover:to-primary/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm font-medium group/btn">
            <svg class="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Selesai
          </button>
          <button @click="$emit('update-session-status', session?.id, 'cancelled')"
            class="inline-flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-600 rounded-full hover:from-red-500/20 hover:to-red-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md text-sm font-medium group/btn">
            <svg class="w-3 h-3 group-hover/btn:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
              </path>
            </svg>
            Batal
          </button>
        </div>
      </div>
    </div>
    <!-- Empty State -->
    <div v-else class="text-center py-16 space-y-6">
      <div
        class="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
        <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <div class="space-y-2">
        <h3 class="text-xl font-semibold text-gray-800">Tidak ada sesi mendatang</h3>
        <p class="text-gray-500 max-w-md mx-auto">
          Sesi konsultasi Anda akan muncul di sini ketika ada jadwal yang terkonfirmasi.
        </p>
      </div>
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
