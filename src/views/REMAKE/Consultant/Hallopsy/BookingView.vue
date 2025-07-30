<template>
  <div class="min-h-screen bg-slate-50">
    <newNavbar />
    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Manajemen Booking</h1>
        <p class="text-slate-600">Kelola dan pantau semua booking konsultasi</p>
      </div>

      <div class="bg-white rounded-xl shadow-sm border border-slate-200 mb-6">
        <div class="p-6 border-b border-slate-200">
          <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative">
                <select v-model="bookingFilter" @change="handleFilterChange"
                  class="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="all">Semua Status</option>
                  <option value="pending">Menunggu</option>
                  <option value="confirmed">Dikonfirmasi</option>
                  <option value="ongoing">Berlangsung</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <div class="relative">
                <select v-model="paymentFilter" @change="handleFilterChange"
                  class="appearance-none bg-white border border-slate-300 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors">
                  <option value="">Semua Pembayaran</option>
                  <option value="paid">Lunas</option>
                  <option value="pending">Menunggu Bayar</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </div>
              </div>

              <div class="relative">
                <input v-model="searchQuery" @input="handleSearchInput" type="text" placeholder="Cari nama pasien..."
                  class="bg-white border border-slate-300 rounded-lg px-4 py-2.5 pl-10 text-sm text-slate-700 placeholder-slate-400 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors w-full sm:w-64">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <button @click="clearFilters"
                class="inline-flex items-center px-4 py-2.5 bg-slate-600 text-white text-sm font-medium rounded-lg hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                Reset Filter
              </button>
              <button @click="fetchBookings"
                class="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                  </path>
                </svg>
                Refresh
              </button>
            </div>
          </div>

          <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
            <span v-if="bookingFilter !== 'all'"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Status: {{ translateStatus(bookingFilter) }}
              <button @click="bookingFilter = 'all'; handleFilterChange()"
                class="ml-2 text-blue-600 hover:text-blue-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </span>
            <span v-if="paymentFilter"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Pembayaran: {{ translatePaymentStatus(paymentFilter) }}
              <button @click="paymentFilter = ''; handleFilterChange()"
                class="ml-2 text-green-600 hover:text-green-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </span>
            <span v-if="searchQuery"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Pencarian: "{{ searchQuery }}"
              <button @click="searchQuery = ''; handleFilterChange()"
                class="ml-2 text-purple-600 hover:text-purple-800">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </span>
          </div>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-slate-600">Memuat data...</span>
        </div>

        <div v-else-if="bookings.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2">
            </path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-slate-900">Tidak ada booking</h3>
          <p class="mt-1 text-sm text-slate-500">Belum ada booking yang sesuai dengan filter yang dipilih.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-50 border-b border-slate-200">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pasien
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Jadwal
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Paket</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Pembayaran
                </th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              <tr v-for="booking in filteredBookings" :key="booking.id" class="hover:bg-slate-50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div
                      class="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span class="text-white font-medium text-sm">{{ booking.user?.name?.charAt(0) || '?' }}</span>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-slate-900">{{ booking.user?.name || 'Tidak ada' }}</div>
                      <div class="text-sm text-slate-500">{{ booking.user?.email || '' }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-slate-900">{{ formatDate(booking.slot?.start_time) }}</div>
                  <div class="text-sm text-slate-500">{{ booking.slot?.duration || 'Tidak ada' }} menit</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-slate-900 font-medium">{{ booking.package?.name || 'Tidak ada' }}</div>
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusBadgeClass(booking.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ translateStatus(booking.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <span :class="getPaymentBadgeClass(booking.payment_status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {{ translatePaymentStatus(booking.payment_status || 'pending') }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center space-x-2">
                    <button v-if="booking.status === 'completed' && !booking.results"
                      @click.stop="showResultModal(booking)"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-100 rounded-md hover:bg-purple-200 transition-colors">
                      Input Hasil
                    </button>
                    <button v-if="booking.status === 'completed' && booking.results" @click.stop="showResults(booking)"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors">
                      Lihat Hasil
                    </button>
                    <button v-if="booking.status === 'pending'" @click="updateBookingStatus(booking.id, 'confirmed')"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">
                      Konfirmasi
                    </button>
                    <button v-if="booking.status === 'confirmed'" @click="updateBookingStatus(booking.id, 'ongoing')"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 transition-colors">
                      Mulai
                    </button>
                    <button v-if="booking.status === 'ongoing'" @click="updateBookingStatus(booking.id, 'completed')"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-100 rounded-md hover:bg-amber-200 transition-colors">
                      Selesai
                    </button>
                    <button @click="showBookingDetails(booking)"
                      class="inline-flex items-center px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors">
                      Detail
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-if="bookings.length > 0" class="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-slate-600">
              Menampilkan <span class="font-medium text-slate-900">{{ (currentPage - 1) * perPage + 1 }}</span>
              sampai <span class="font-medium text-slate-900">{{ Math.min(currentPage * perPage, totalBookings)
              }}</span>
              dari <span class="font-medium text-slate-900">{{ totalBookings }}</span> hasil
            </div>
            <nav class="flex items-center space-x-1">
              <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-l-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                :class="page === currentPage ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'"
                class="inline-flex items-center px-4 py-2 text-sm font-medium border transition-colors">
                {{ page }}
              </button>
              <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-500 bg-white border border-slate-300 rounded-r-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div v-if="selectedBooking" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-slate-200">
              <h3 class="text-xl font-semibold text-slate-900">Detail Booking</h3>
            </div>
            <div class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-slate-600">Nama Pasien</label>
                    <p class="text-slate-900 font-medium">{{ selectedBooking.user?.name || 'Tidak ada' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-slate-600">Email</label>
                    <p class="text-slate-900">{{ selectedBooking.user?.email || 'Tidak ada' }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-slate-600">Tanggal & Waktu</label>
                    <p class="text-slate-900 font-medium">{{ formatDate(selectedBooking.slot?.start_time) }}</p>
                  </div>
                  <div>
                    <label class="text-sm font-medium text-slate-600">Durasi</label>
                    <p class="text-slate-900">{{ selectedBooking.slot?.duration || 'Tidak ada' }} menit</p>
                  </div>
                </div>
                <div class="space-y-4">
                  <div>
                    <label class="text-sm font-medium text-slate-600">Status</label>
                    <p><span :class="getStatusBadgeClass(selectedBooking.status)"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">{{
                          translateStatus(selectedBooking.status) }}</span></p>
                  </div>
                  <div v-if="selectedBooking.package">
                    <label class="text-sm font-medium text-slate-600">Paket</label>
                    <p class="text-slate-900 font-medium">{{ selectedBooking.package.name }}</p>
                  </div>
                  <div v-if="selectedBooking.payment_status">
                    <label class="text-sm font-medium text-slate-600">Status Pembayaran</label>
                    <p><span :class="getPaymentBadgeClass(selectedBooking.payment_status)"
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">{{
                          translatePaymentStatus(selectedBooking.payment_status) }}</span></p>
                  </div>
                  <div v-if="selectedBooking.meet_link" class="flex flex-col">
                    <label class="text-sm font-medium text-slate-600">Link Meeting</label>
                    <a :href="selectedBooking.meet_link" target="_blank"
                      class="text-blue-600 hover:text-blue-800 font-medium">Gabung Meeting</a>
                  </div>
                </div>
              </div>

              <div v-if="selectedBooking.structured_medical_answers?.length > 0" class="mt-6">
                <h4 class="text-lg font-medium text-slate-900 mb-3">Jawaban Medis</h4>
                <div class="space-y-4">
                  <div v-for="(answer, index) in selectedBooking.structured_medical_answers" :key="index"
                    class="bg-slate-50 p-4 rounded-lg">
                    <p class="font-medium text-slate-800 mb-1">{{ answer.question }}</p>
                    <p class="text-slate-600">
                      {{ selectedBooking.medical_answers[index]?.answer === 'yes' ? 'Ya' : 'Tidak' }}
                    </p>
                  </div>
                </div>
              </div>

              <div v-if="selectedBooking.structured_counseling_answers?.length > 0" class="mt-6">
                <h4 class="text-lg font-medium text-slate-900 mb-3">Jawaban Konseling</h4>
                <div class="space-y-4">
                  <div v-for="(answer, index) in selectedBooking.structured_counseling_answers" :key="index"
                    class="bg-slate-50 p-4 rounded-lg">
                    <p class="font-medium text-slate-800 mb-1">{{ answer.question }}</p>
                    <p class="text-slate-600">
                      {{ selectedBooking.counseling_answers[index]?.answer === 'yes' ? 'Ya' : 'Tidak' }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
              <button v-if="selectedBooking.status === 'confirmed'"
                @click="updateBookingStatus(selectedBooking.id, 'completed')"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Tandai Selesai
              </button>
              <button v-if="selectedBooking.status === 'pending'"
                @click="updateBookingStatus(selectedBooking.id, 'confirmed')"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Konfirmasi Booking
              </button>
              <button v-if="selectedBooking.status !== 'cancelled'"
                @click="updateBookingStatus(selectedBooking.id, 'cancelled')"
                class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Batalkan Booking
              </button>
              <button @click="selectedBooking = null"
                class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showResultInputModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-slate-200">
              <h3 class="text-xl font-semibold text-slate-900">Input Hasil Konseling</h3>
            </div>
            <div class="p-6">
              <div class="mb-6">
                <button @click="showAddCategory = true"
                  class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                  Tambah Kategori
                </button>
              </div>

              <div v-if="showAddCategory"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div class="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                  <h3 class="text-lg font-semibold text-slate-900 mb-4">Pilih Kategori</h3>
                  <select v-model="selectedCategoryId"
                    class="w-full border border-slate-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option v-for="category in availableCategories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <div class="flex justify-end space-x-3">
                    <button @click="showAddCategory = false"
                      class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                      Batal
                    </button>
                    <button @click="addCategory"
                      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div v-for="(result, index) in selectedResults" :key="index" class="bg-slate-50 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-3">
                    <h4 class="font-semibold text-slate-900">{{ getCategoryName(result.category_id) }}</h4>
                    <button @click="removeCategory(index)" class="text-red-600 hover:text-red-800 transition-colors">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                        </path>
                      </svg>
                    </button>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-slate-700 mb-2">Deskripsi</label>
                    <textarea v-model="result.description"
                      class="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="3" placeholder="Masukkan deskripsi hasil konseling..."></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-6 border-t border-slate-200 bg-slate-50 flex justify-end space-x-3">
              <button @click="showResultInputModal = false"
                class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Batal
              </button>
              <button @click="submitResults" :disabled="selectedResults.length === 0"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                Simpan Hasil
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showResultsModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          <div class="relative bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="p-6 border-b border-slate-200">
              <h3 class="text-xl font-semibold text-slate-900">Hasil Konsultasi</h3>
            </div>
            <div class="p-6">
              <div class="space-y-6">
                <div v-for="result in bookingResults" :key="result.id" class="bg-slate-50 rounded-lg p-4">
                  <h4 class="font-semibold text-slate-900 mb-2">{{ result.category?.name || 'Kategori Tidak Diketahui'
                  }}</h4>
                  <p class="text-slate-700 whitespace-pre-line">{{ result.description }}</p>
                </div>
              </div>
            </div>
            <div class="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button @click="showResultsModal = false"
                class="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import newNavbar from '../../../../components/navbar/newNavbar.vue';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
import 'moment/locale/id';
import initAPI from '@/api/api';
import Cookies from 'js-cookie';

export default {
  components: {
    newNavbar
  },
  setup() {
    const router = useRouter();
    const bookings = ref([]);
    const selectedBooking = ref(null);
    const resultBooking = ref(null);
    const bookingFilter = ref('all');
    const paymentFilter = ref('');
    const searchQuery = ref('');
    const currentPage = ref(1);
    const perPage = ref(10);
    const totalBookings = ref(0);
    const totalPages = ref(1);
    const loading = ref(false);
    const showResultInputModal = ref(false);
    const consultingCategories = ref([]);
    const resultInput = ref({});
    const showAddCategory = ref(false);
    const selectedCategoryId = ref(null);
    const selectedResults = ref([]);
    const showResultsModal = ref(false);
    const bookingResults = ref([]);
    const searchTimeout = ref(null);

    moment.locale('id');

    const hasActiveFilters = computed(() => {
      return bookingFilter.value !== 'all' || paymentFilter.value !== '' || searchQuery.value !== '';
    });

    const filteredBookings = computed(() => {
      let filtered = [...bookings.value];

      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(booking =>
          booking.user?.name?.toLowerCase().includes(query) ||
          booking.user?.email?.toLowerCase().includes(query)
        );
      }

      if (paymentFilter.value) {
        filtered = filtered.filter(booking =>
          booking.payment_status === paymentFilter.value
        );
      }

      return filtered;
    });

    const getStatusBadgeClass = (status) => {
      const classes = {
        'pending': 'bg-amber-100 text-amber-800',
        'confirmed': 'bg-blue-100 text-blue-800',
        'ongoing': 'bg-purple-100 text-purple-800',
        'completed': 'bg-green-100 text-green-800',
        'cancelled': 'bg-red-100 text-red-800'
      };
      return classes[status] || 'bg-slate-100 text-slate-800';
    };

    const getPaymentBadgeClass = (status) => {
      const classes = {
        'paid': 'bg-green-100 text-green-800',
        'pending': 'bg-amber-100 text-amber-800'
      };
      return classes[status] || 'bg-slate-100 text-slate-800';
    };

    const handleFilterChange = () => {
      currentPage.value = 1;
      fetchBookings();
    };

    const handleSearchInput = () => {
      if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
      }
      searchTimeout.value = setTimeout(() => {
        currentPage.value = 1;
        fetchBookings();
      }, 500);
    };

    const clearFilters = () => {
      bookingFilter.value = 'all';
      paymentFilter.value = '';
      searchQuery.value = '';
      currentPage.value = 1;
      fetchBookings();
    };

    const showBookingDetails = async (booking) => {
      try {
        const token = await Cookies.get('token');
        const response = await initAPI('get', `consultant-dashboard/bookings/${booking.id}`, null, token);
        selectedBooking.value = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil detail booking:', error);
      }
    };

    const updateBookingStatus = async (id, status) => {
      try {
        const token = await Cookies.get('token');
        await initAPI('put', `consultant-dashboard/bookings/${id}/status`, { status }, token);
        await fetchBookings();
        if (selectedBooking.value && selectedBooking.value.id === id) {
          selectedBooking.value.status = status;
        }
      } catch (error) {
        console.error('Gagal memperbarui status booking:', error);
      }
    };

    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        fetchBookings();
      }
    };

    const formatDate = (date) => {
      return moment(date).format('DD MMMM YYYY, HH:mm');
    };

    const translateStatus = (status) => {
      const translations = {
        'pending': 'Menunggu',
        'confirmed': 'Dikonfirmasi',
        'ongoing': 'Berlangsung',
        'completed': 'Selesai',
        'cancelled': 'Dibatalkan'
      };
      return translations[status] || status;
    };

    const translatePaymentStatus = (status) => {
      const translations = {
        'paid': 'Lunas',
        'pending': 'Menunggu'
      };
      return translations[status] || status;
    };

    const fetchConsultingCategories = async () => {
      try {
        const token = await Cookies.get('token');
        const response = await initAPI('get', 'consultant-dashboard/consulting-category', null, token);
        consultingCategories.value = response.data.data;
      } catch (error) {
        console.error('Gagal mengambil kategori konseling:', error);
      }
    };

    const showResultModal = (booking) => {
      resultBooking.value = booking;
      showResultInputModal.value = true;
    };

    const availableCategories = computed(() => {
      const selectedIds = selectedResults.value.map(r => r.category_id);
      return consultingCategories.value.filter(cat => !selectedIds.includes(cat.id));
    });

    const getCategoryName = (id) => {
      const category = consultingCategories.value.find(cat => cat.id === id);
      return category ? category.name : 'Unknown';
    };

    const addCategory = () => {
      if (selectedCategoryId.value) {
        selectedResults.value.push({
          category_id: selectedCategoryId.value,
          description: ''
        });
        selectedCategoryId.value = null;
        showAddCategory.value = false;
      }
    };

    const removeCategory = (index) => {
      selectedResults.value.splice(index, 1);
    };

    const submitResults = async () => {
      try {
        const token = await Cookies.get('token');
        await initAPI('post', `consultant-dashboard/bookings/${resultBooking.value.id}/results`,
          { results: selectedResults.value }, token);
        showResultInputModal.value = false;
        selectedResults.value = [];
        await fetchBookings();
      } catch (error) {
        console.error('Gagal menyimpan hasil:', error);
      }
    };

    const showResults = async (booking) => {
      try {
        const token = await Cookies.get('token');
        const response = await initAPI('get', `consultant-dashboard/bookings/${booking.id}/results`, null, token);
        bookingResults.value = response.data.data;
        showResultsModal.value = true;
      } catch (error) {
        console.error('Gagal mengambil hasil konsultasi:', error);
      }
    };

    const fetchBookings = async () => {
      loading.value = true;
      try {
        const token = await Cookies.get('token');
        let url = `consultant-dashboard/bookings?page=${currentPage.value}&per_page=${perPage.value}`;

        if (bookingFilter.value !== 'all') {
          url += `&status=${bookingFilter.value}`;
        }

        const response = await initAPI('get', url, null, token);

        const bookingsWithResults = await Promise.all(response.data.data.data.map(async (booking) => {
          if (booking.status === 'completed') {
            try {
              const resultsResponse = await initAPI('get', `consultant-dashboard/bookings/${booking.id}/results`, null, token);
              return { ...booking, results: resultsResponse.data.data.length > 0 };
            } catch (error) {
              return { ...booking, results: false };
            }
          }
          return booking;
        }));

        bookings.value = bookingsWithResults;
        totalBookings.value = response.data.data.total;
        totalPages.value = Math.ceil(totalBookings.value / perPage.value);
      } catch (error) {
        console.error('Gagal mengambil data booking:', error);
        if (error.response && error.response.status === 401) {
          router.push('/login');
        }
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      fetchBookings();
      fetchConsultingCategories();
    });

    return {
      bookings,
      selectedBooking,
      bookingFilter,
      paymentFilter,
      searchQuery,
      currentPage,
      perPage,
      totalBookings,
      totalPages,
      loading,
      hasActiveFilters,
      filteredBookings,
      fetchBookings,
      showBookingDetails,
      updateBookingStatus,
      changePage,
      formatDate,
      translateStatus,
      translatePaymentStatus,
      getStatusBadgeClass,
      getPaymentBadgeClass,
      handleFilterChange,
      handleSearchInput,
      clearFilters,
      showResultInputModal,
      consultingCategories,
      showResultModal,
      showAddCategory,
      selectedCategoryId,
      selectedResults,
      availableCategories,
      getCategoryName,
      addCategory,
      removeCategory,
      submitResults,
      showResultsModal,
      bookingResults,
      showResults
    };
  }
};
</script>