<template>
  <Layout>
    <div class="p-4 lg:px-20 lg:py-10 bg-[#F0F7FD] w-full min-h-screen font-sora pb-20">
      <!-- Back Button with Animation -->
      <button @click="$router.go(-1)"
        class="flex items-center gap-2 mb-6 text-primary hover:text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 group"
        :class="backButtonVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'">
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clip-rule="evenodd" />
        </svg>
        <span class="font-medium">Back</span>
      </button>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col justify-center items-center py-20 space-y-4">
        <div class="relative">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
          <div
            class="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent absolute top-0 left-0">
          </div>
        </div>
        <p class="text-gray-500 font-medium">Loading booking details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20 space-y-4">
        <div class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z">
            </path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800">Something went wrong</h3>
        <p class="text-red-600 max-w-md mx-auto">{{ error }}</p>
        <button @click="fetchBookingDetail"
          class="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
            </path>
          </svg>
          Try Again
        </button>
      </div>

      <!-- Main Content -->
      <div v-else-if="booking" class="space-y-6 md:space-y-8">
        <!-- Booking Header Card -->
        <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-1000 ease-out"
          :class="headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div class="relative">
              <div
                class="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full">
              </div>
              <div class="relative z-10">
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">Booking Details</h1>
                <p class="text-gray-600 mt-1 flex items-center gap-2">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"></path>
                  </svg>
                  Booking Number: #{{ booking.booking_number }}
                </p>
              </div>
            </div>
            <div class="mt-4 md:mt-0">
              <span :class="{
                'bg-green-100 text-green-700 border-green-200': booking.status === 'completed',
                'bg-blue-100 text-blue-700 border-blue-200': booking.status === 'confirmed',
                'bg-yellow-100 text-yellow-700 border-yellow-200': booking.status === 'pending',
                'bg-red-100 text-red-700 border-red-200': booking.status === 'cancelled'
              }"
                class="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold capitalize border-2 shadow-sm">
                <div :class="{
                  'bg-green-500': booking.status === 'completed',
                  'bg-blue-500': booking.status === 'confirmed',
                  'bg-yellow-500': booking.status === 'pending',
                  'bg-red-500': booking.status === 'cancelled'
                }" class="w-2 h-2 rounded-full mr-2"></div>
                {{ booking.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Booking Info Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-1000 ease-out delay-200"
          :class="gridVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <!-- Consultant Info -->
          <div
            class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group flex flex-col justify-between gap-6">
            <div class="space-y-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  Consultant Information</h2>
                <div
                  class="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <div class="relative">
                  <img :src="booking.consultant?.image || Doc" alt="Consultant"
                    class="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg">
                  <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white">
                  </div>
                </div>
                <div class="flex-1">
                  <p class="font-bold text-gray-900 text-lg">{{ booking.consultant?.name || 'Consultant' }}</p>
                  <p class="text-primary font-medium">{{ booking.package?.name || 'Consultation' }}</p>
                  <div class="flex items-center gap-1 mt-1">
                    <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                      </path>
                    </svg>
                    <span class="text-sm text-gray-600">{{ booking.testimonial?.rating || 'Belum memiliki rating'
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <a @click="contactViaWhatsApp" target="_blank"
              class="inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-500/80 hover:from-green-500/90 hover:to-green-500/70 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg group w-full">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24"
                fill="currentColor">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Hubungi
            </a>
          </div>

          <!-- Session Details -->
          <div
            class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                Session Details</h2>
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-3">
              <div
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Date</p>
                  <p class="font-semibold text-gray-800">{{ formatDate(booking.slot?.start_time) }}</p>
                </div>
              </div>
              <div
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Time</p>
                  <p class="font-semibold text-gray-800">{{ formatTime(booking.slot?.start_time) }} - {{
                    formatTime(booking.slot?.end_time) }}</p>
                </div>
              </div>
              <div
                class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-gray-600">Duration</p>
                  <p class="font-semibold text-gray-800">{{ booking.slot?.duration || booking.package?.total_duration ||
                    0 }} minutes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Payment Info -->
          <div
            class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                Payment Information</h2>
              <div
                class="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
            </div>
            <div class="space-y-3">
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span class="text-gray-600 font-medium">Status:</span>
                <span :class="{
                  'text-green-600 bg-green-100': booking.payment_status === 'paid',
                  'text-yellow-600 bg-yellow-100': booking.payment_status === 'pending',
                  'text-red-600 bg-red-100': booking.payment_status === 'failed'
                }" class="font-bold capitalize px-3 py-1 rounded-full text-sm">
                  {{ booking.payment_status }}
                </span>
              </div>
              <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                <span class="text-gray-600 font-medium">Method:</span>
                <span class="font-bold text-gray-800">{{ booking.payment_method || 'Not specified' }}</span>
              </div>
              <div
                class="flex justify-between items-center p-3 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <span class="text-gray-600 font-medium">Amount:</span>
                <span class="font-bold text-primary text-lg">Rp {{ formatCurrency(booking.amount) }}</span>
              </div>
            </div>
          </div>

          <!-- Meeting Link -->
          <div
            class="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group flex flex-col justify-between gap-6">
            <div>
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors duration-300">
                  Meeting Information</h2>
                <div
                  class="w-8 h-8 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                    </path>
                  </svg>
                </div>
              </div>
              <p class="text-gray-600">Join your consultation session using the link below:</p>
            </div>
            <div class="space-y-4">
              <a :href="booking.meet_link" target="_blank"
                class="inline-flex justify-center items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg group w-full">
                <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z">
                  </path>
                </svg>
                Join Meeting
              </a>
            </div>
          </div>
        </div>

        <!-- Medical Answers -->
        <div v-if="booking.medical_answers && booking.medical_answers.length > 0"
          class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-1000 ease-out delay-400"
          :class="medicalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Medical Information</h2>
          </div>
          <div class="grid gap-4">
            <div v-for="(answer, index) in booking.medical_answers" :key="index"
              class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }">
              <p class="font-semibold text-gray-800 mb-2">Question {{ index + 1 }}:</p>
              <p class="text-gray-600 mb-3">{{ getMedicalQuestion(answer.question_id) }}</p>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Answer:</span>
                <span :class="answer.answer === 'yes' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
                  class="px-3 py-1 rounded-full text-sm font-bold uppercase">
                  {{ answer.answer }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Counseling Answers -->
        <div v-if="booking.counseling_answers && booking.counseling_answers.length > 0"
          class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-1000 ease-out delay-400"
          :class="medicalVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Counseling Information</h2>
          </div>
          <div class="grid gap-4">
            <div v-for="(answer, index) in booking.counseling_answers" :key="index"
              class="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 animate-fade-in-up"
              :style="{ animationDelay: `${index * 100}ms` }">
              <p class="font-semibold text-gray-800 mb-2">Question {{ index + 1 }}:</p>
              <p class="text-gray-600 mb-3">{{ getCounselingQuestion(answer.question_id) }}</p>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">Answer:</span>
                <span class="px-3 py-1 rounded-full text-sm font-bold uppercase">
                  {{ answer.answer }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Section -->
        <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all duration-1000 ease-out delay-600"
          :class="resultsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <div class="flex items-center gap-3 mb-6">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-gray-800">Consultation Results</h2>
          </div>
          <div class="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div v-if="!hasResults" class="text-center py-8">
              <div class="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-gray-600 font-medium">No results available yet.</p>
              <p class="text-gray-500 text-sm mt-1">Your consultant will provide results after your session.</p>
            </div>
            <div v-else class="text-center py-4">
              <div class="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <p class="text-gray-700 mb-4 font-medium">Your consultation results are ready to view.</p>
              <router-link :to="`/hallopsy/result/${booking.id}`"
                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-full transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-lg group">
                <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none"
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                  </path>
                </svg>
                View Results
              </router-link>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <!-- <div class="flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-800"
          :class="actionsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'">
          <button v-if="booking.status === 'confirmed' || booking.status === 'pending'" @click="cancelBooking"
            class="px-6 py-3 bg-red-100 text-red-700 rounded-full hover:bg-red-200 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            Cancel Booking
          </button>
          <button v-if="booking.status === 'completed'" @click="downloadInvoice"
            class="px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-1 flex items-center justify-center gap-2 group">
            <svg class="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
              </path>
            </svg>
            Download Invoice
          </button>
        </div> -->
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Layout from '@/Layout/Customer/Layout.vue';
import initAPI from '@/api/api.js';
import Cookies from 'js-cookie';
import Doc from '@/assets/img/doc.png';
import moment from 'moment-timezone';

const route = useRoute();
const router = useRouter();
const booking = ref(null);
const isLoading = ref(false);
const error = ref(null);

const backButtonVisible = ref(false);
const headerVisible = ref(false);
const gridVisible = ref(false);
const medicalVisible = ref(false);
const resultsVisible = ref(false);
const actionsVisible = ref(false);
const medicalQuestions = ref([]);
const counselingQuestions = ref([]);

const formatDate = (dateString) => {
  if (!dateString) return 'Not specified';
  return moment(dateString).tz('Asia/Jakarta').format('DD MMMM YYYY');
};

const formatTime = (timeString) => {
  if (!timeString) return '--:--';
  return moment(timeString).tz('Asia/Jakarta').format('HH:mm') + ' WIB';
};

const formatCurrency = (amount) => {
  if (!amount) return '0';
  return parseFloat(amount).toLocaleString('id-ID');
};

const getMedicalQuestion = (id) => {
  const question = medicalQuestions.value.find(q => q.id === id);
  return question ? question.question : `Question ${id}`;
};

const getCounselingQuestion = (id) => {
  const question = counselingQuestions.value.find(q => q.id === id);
  return question ? question.question : `Question ${id}`;
};

const hasResults = computed(() => {
  return booking.value?.status === 'completed';
});

const triggerAnimations = async () => {
  await nextTick();

  setTimeout(() => {
    backButtonVisible.value = true;
  }, 100);

  setTimeout(() => {
    headerVisible.value = true;
  }, 300);

  setTimeout(() => {
    gridVisible.value = true;
  }, 500);

  setTimeout(() => {
    medicalVisible.value = true;
  }, 700);

  setTimeout(() => {
    resultsVisible.value = true;
  }, 900);

  setTimeout(() => {
    actionsVisible.value = true;
  }, 1100);
};

const fetchQuestions = async () => {
  try {
    const token = Cookies.get('token');
    const [medicalRes, counselingRes] = await Promise.all([
      initAPI('get', 'user/hallopsy-questions/medical', null, token),
      initAPI('get', 'user/hallopsy-questions/counseling', null, token)
    ]);

    medicalQuestions.value = medicalRes.data.data.medical;
    counselingQuestions.value = counselingRes.data.data.counseling;
  } catch (err) {
    console.error('Error fetching questions:', err);
  }
};

const fetchBookingDetail = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const token = Cookies.get('token');
    await fetchQuestions()
    const response = await initAPI('get', `user/bookings/${route.params.id}`, null, token);
    console.log(response.data.data)

    if (response.data.success) {
      booking.value = response.data.data;
      triggerAnimations();
    } else {
      error.value = response.data.message || 'Failed to load booking details';
    }
  } catch (err) {
    console.error('Error fetching booking details:', err);
    error.value = err.response?.data?.message || err.message || 'Failed to load booking details';
  } finally {
    isLoading.value = false;
  }
};

// const cancelBooking = async () => {
//   if (confirm('Are you sure you want to cancel this booking?')) {
//     try {
//       isLoading.value = true;
//       const token = Cookies.get('token');
//       const response = await initAPI('put', `user/bookings/${route.params.id}/cancel`, null, token);

//       if (response.data.success) {
//         alert('Booking cancelled successfully');
//         fetchBookingDetail();
//       } else {
//         alert(response.data.message || 'Failed to cancel booking');
//       }
//     } catch (err) {
//       console.error('Error cancelling booking:', err);
//       alert(err.response?.data?.message || err.message || 'Failed to cancel booking');
//     } finally {
//       isLoading.value = false;
//     }
//   }
// };

// const downloadInvoice = () => {
//   alert('Invoice download would be implemented here');
// };

const formatWhatsAppNumber = (number) => {
  if (!number) return null;

  let cleaned = number.replace(/\D/g, '');

  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  }
  else if (!cleaned.startsWith('62')) {
    cleaned = '62' + cleaned;
  }

  return cleaned;
};

const contactViaWhatsApp = () => {
  const rawNumber = booking.value?.consultant?.number;

  if (!rawNumber) {
    alert('Nomor WhatsApp konsultan tidak tersedia');
    return;
  }

  const phoneNumber = formatWhatsAppNumber(rawNumber);

  if (!phoneNumber || phoneNumber.length < 10) {
    alert('Nomor WhatsApp konsultan tidak valid');
    return;
  }

  const message = `Halo, saya ingin berkonsultasi mengenai booking saya (No. Booking: ${booking.value.booking_number})`;
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
};

onMounted(() => {
  fetchBookingDetail();
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s ease-out forwards;
}

* {
  transition-property: transform, opacity, background-color, border-color, color, fill, stroke, box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>