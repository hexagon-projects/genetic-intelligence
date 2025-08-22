<template>
  <div class="w-full my-5">
    <div class="w-full mx-auto">
      <!-- Header -->
      <div
        class="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h1 class="text-3xl font-bold text-gray-900 mb-2">
            Equivalensi Kegiatan Bimbingan dan Konseling
          </h1>
          <p class="text-gray-600">
            Daftar kegiatan dan equivalent jam guru Bimbingan Konseling
          </p>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- Add New Activity Button -->
          <button
            @click="showExportModal = true"
            class="inline-flex items-center gap-3 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-biru/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-file-earmark-bar-graph"
              viewBox="0 0 16 16"
            >
              <path
                d="M10 13.5a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-6a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5zm-2.5.5a.5.5 0 0 1-.5-.5v-4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5zm-3 0a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5z"
              />
              <path
                d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
              />
            </svg>
            Export Laporan
          </button>
          <button
            @click="showAddModal = true"
            class="inline-flex items-center gap-3 px-4 py-2 bg-biru text-white text-sm font-medium rounded-lg hover:bg-biru/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-folder-plus"
              viewBox="0 0 16 16"
            >
              <path
                d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z"
              />
              <path
                d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5"
              />
            </svg>
            Tambah Kegiatan
          </button>
        </div>
      </div>

      <!-- Filter Section -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
      >
        <!-- First Row - Search and Category -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Cari Kegiatan</label
            >
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Masukkan nama kegiatan..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg
                class="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          <!-- Category Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Kategori</label
            >
            <select
              v-model="selectedCategory"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Kategori</option>
              <option value="individu">individu</option>
              <option value="Conseling Individu">Conseling Individu</option>
              <option value="Conseling Kelompok">Conseling Kelompok</option>
              <option value="Bimbingan Kelompok">Bimbingan Kelompok</option>
              <option value="Bimbingan Kalsikal">Bimbingan Kalsikal</option>
              <option value="Bimbingan Kelas Besar">
                Bimbingan Kelas Besar
              </option>
              <option value="Konsultasi">Konsultasi</option>
              <option value="Kolaborasi">Kolaborasi</option>
              <option value="Alih Tangan Kasus">Alih Tangan Kasus</option>
              <option value="Kunjungan Rumah">Kunjungan Rumah</option>
              <option value="Advokasi">Advokasi</option>
              <option value="Konferensi Kasus">Konferensi Kasus</option>
            </select>
          </div>

          <!-- School Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Nama Sekolah</label
            >
            <select
              v-model="selectedSchool"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">-- Pilih Semua Sekolah --</option>
              <option
                v-for="(item, index) in schoolData"
                :key="index"
                :value="item.institut_id"
              >
                {{ item.institution.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Second Row - Period Filters -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <!-- Quick Period Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Filter Periode</label
            >
            <select
              v-model="selectedPeriod"
              @change="handlePeriodChange"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Periode</option>
              <option value="today">📅 Hari Ini</option>
              <option value="week">📊 Minggu Ini</option>
              <option value="month">📈 Bulan Ini</option>
              <option value="custom">🗓️ Periode Custom</option>
            </select>
          </div>

          <!-- Start Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tanggal Mulai</label
            >
            <input
              v-model="priode_awal"
              type="date"
              :disabled="selectedPeriod !== 'custom'"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <!-- End Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Tanggal Selesai</label
            >
            <input
              v-model="priode_akhir"
              type="date"
              :disabled="selectedPeriod !== 'custom'"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2"
              >Status</label
            >
            <select
              v-model="selectedStatus"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Semua Status</option>
              <option value="Selesai">✅ Selesai</option>
              <option value="Berlangsung">🔄 Berlangsung</option>
              <option value="Direncanakan">📋 Direncanakan</option>
            </select>
          </div>
        </div>

        <!-- Period Info Display -->
        <div
          v-if="periodInfo"
          class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div class="flex items-center">
            <div class="text-blue-600 mr-2">📊</div>
            <span class="text-sm text-blue-800 font-medium">{{
              periodInfo
            }}</span>
          </div>
        </div>

        <!-- Reset Filter Button -->
        <div class="flex justify-end">
          <button
            @click="resetFilters"
            class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors flex items-center"
          >
            <svg
              class="h-4 w-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Reset Semua Filter
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <div
                class="h-6 w-6 text-blue-600 flex items-center justify-center text-lg"
              >
                📖
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Kegiatan</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ filteredActivities.length }}
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <div
                class="h-6 w-6 text-green-600 flex items-center justify-center text-lg"
              >
                ⏰
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Total Jam/JP</p>
              <p class="text-2xl font-bold text-gray-900">{{ totalHours }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="p-2 bg-purple-100 rounded-lg">
              <div
                class="h-6 w-6 text-purple-600 flex items-center justify-center text-lg"
              >
                👥
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Rata-rata per Kegiatan</p>
              <p class="text-2xl font-bold text-gray-900">{{ averageHours }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center">
            <div class="p-2 bg-orange-100 rounded-lg">
              <div
                class="h-6 w-6 text-orange-600 flex items-center justify-center text-lg"
              >
                🎯
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">Kegiatan Selesai</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ activeActivitiesCount }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div
        class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Kegiatan
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Sekolah
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Layanan
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Tanggal
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jumlah
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Equivalent Jam
                </th>
                <th
                  class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(activity, index) in paginatedActivities"
                :key="activity.id"
                class="hover:bg-gray-50 transition-colors"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  <div class="font-medium">{{ activity.title }}</div>
                  <div class="text-gray-500 text-xs mt-1">
                    {{ activity.detail }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ activity.institut.name }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full items-center"
                    :class="getCategoryColor(activity.kegiatan)"
                  >
                    <span class="mr-1">{{
                      getCategoryIcon(activity.kegiatan)
                    }}</span>
                    {{ activity.kegiatan }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(activity.priode_awal) }} s.d
                  {{ formatDate(activity.priode_akhir) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="getStatusColor(activity.status)"
                  >
                    {{ getStatusText(activity.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ activity.waktu }} {{ activity.waktu_detail }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-sm font-semibold text-blue-600">
                    {{ activity.equivalen }} JP
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editActivity(activity)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <svg
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        ></path>
                      </svg>
                    </button>
                    <button
                      @click="deleteActivity(activity.id)"
                      class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                      title="Hapus"
                    >
                      <svg
                        class="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredActivities.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">📄</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            Tidak ada kegiatan ditemukan
          </h3>
          <p class="text-gray-500 mb-4">Coba ubah filter pencarian Anda</p>
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 bg-biru text-white text-sm font-medium rounded-lg hover:bg-biru/90 transition-colors"
          >
            <svg
              class="h-4 w-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Tambah Kegiatan Pertama
          </button>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="bg-gray-50 px-4 sm:px-6 py-4 border-t border-gray-200"
        >
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <!-- Left side - Showing info -->
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <div class="text-sm text-gray-700 text-center sm:text-left">
                Menampilkan {{ startItem }} - {{ endItem }} dari
                {{ filteredActivities.length }} kegiatan
              </div>

              <!-- Items per page selector -->
              <div class="flex items-center gap-2">
                <label class="text-sm text-gray-600">Tampilkan:</label>
                <select
                  v-model="itemsPerPage"
                  class="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="20">20</option>
                  <option :value="50">50</option>
                </select>
                <span class="text-sm text-gray-600">per halaman</span>
              </div>
            </div>

            <!-- Right side - Pagination controls -->
            <div class="flex items-center justify-center sm:justify-end">
              <!-- Mobile pagination info -->
              <div class="flex items-center gap-2 sm:hidden mr-4">
                <span class="text-sm text-gray-600">
                  Hal {{ currentPage }} dari {{ totalPages }}
                </span>
              </div>

              <!-- Pagination buttons -->
              <div class="flex items-center space-x-1 sm:space-x-2">
                <!-- Previous page button -->
                <button
                  @click="currentPage = Math.max(1, currentPage - 1)"
                  :disabled="currentPage === 1"
                  class="px-2 sm:px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  title="Halaman Sebelumnya"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                </button>

                <!-- Page numbers -->
                <div class="hidden sm:flex items-center space-x-1">
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      v-if="page !== '...'"
                      @click="currentPage = page"
                      :class="[
                        'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                        currentPage === page
                          ? 'bg-biru text-white shadow-sm'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50',
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span v-else class="px-3 py-2 text-sm text-gray-500"
                      >...</span
                    >
                  </template>
                </div>

                <!-- Mobile page input -->
                <div class="flex sm:hidden items-center gap-2">
                  <input
                    v-model.number="currentPage"
                    type="number"
                    :min="1"
                    :max="totalPages"
                    class="w-16 px-2 py-1 text-sm text-center border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <!-- Next page button -->
                <button
                  @click="currentPage = Math.min(totalPages, currentPage + 1)"
                  :disabled="currentPage === totalPages"
                  class="px-2 sm:px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  title="Halaman Selanjutnya"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between pb-4 border-b border-gray-200"
          >
            <h3 class="text-lg font-medium text-gray-900">
              {{ isEditing ? "Edit Kegiatan" : "Tambah Kegiatan Baru" }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <form @submit.prevent="saveActivity" class="mt-6 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Nama Kegiatan -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Kegiatan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.title"
                  type="text"
                  required
                  placeholder="Masukkan nama kegiatan..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Deskripsi -->
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  v-model="formData.detail"
                  rows="3"
                  placeholder="Masukkan deskripsi kegiatan..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <!-- institut -->
              <div class="md:col-span-2">
                <label
                  for="sasaran"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Sekolah
                </label>
                <select
                  id="sasaran"
                  v-model="formData.institut_id"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option disabled value="">-- Pilih Sekolah --</option>
                  <option
                    v-for="(item, index) in schoolData"
                    :key="index"
                    :value="item.institut_id"
                  >
                    {{ item.institution.name }}
                  </option>
                </select>
              </div>

              <!-- Kategori -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Layanan <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.kegiatan"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih Kategori</option>
                  <option value="individu">individu</option>
                  <option value="Conseling Individu">Conseling Individu</option>
                  <option value="Conseling Kelompok">Conseling Kelompok</option>
                  <option value="Bimbingan Kelompok">Bimbingan Kelompok</option>
                  <option value="Bimbingan Kalsikal">Bimbingan Kalsikal</option>
                  <option value="Bimbingan Kelas Besar">
                    Bimbingan Kelas Besar
                  </option>
                  <option value="Konsultasi">Konsultasi</option>
                  <option value="Kolaborasi">Kolaborasi</option>
                  <option value="Alih Tangan Kasus">Alih Tangan Kasus</option>
                  <option value="Kunjungan Rumah">Kunjungan Rumah</option>
                  <option value="Advokasi">Advokasi</option>
                  <option value="Konferensi Kasus">Konferensi Kasus</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              <!-- Input Jika "Lainnya" -->
              <div v-if="formData.kegiatan === 'Lainnya'">
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Masukkan Kategori Lainnya
                </label>
                <input
                  type="text"
                  v-model="formData.kegiatan_lainnya"
                  placeholder="Tulis kategori lainnya..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Status -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Status <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="formData.status"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Pilih Status</option>
                  <option value="Perancangan">Perancangan</option>
                  <option value="Berlangsung">Berlangsung</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              <!-- Tanggal -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Mulai Tanggal <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.priode_awal"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Tanggal -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Sampai Tanggal <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.priode_akhir"
                  type="date"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Jumlah -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="formData.jumlah"
                  type="number"
                  min="1"
                  required
                  placeholder="0"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <!-- Perkiraan Waktu -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Perkiraan Waktu <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.waktu"
                  type="text"
                  required
                  placeholder="1,2 .."
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Satuan -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Satuan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.waktu_detail"
                  type="text"
                  required
                  placeholder="Menit, Jam, Bulan, Tahun"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <!-- Equivalent Jam -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Equivalent Jam / JP <span class="text-red-500">*</span>
                </label>
                <input
                  v-model.number="formData.equivalen"
                  type="number"
                  step="any"
                  min="0"
                  required
                  placeholder="0.00"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <!-- Modal Footer -->
            <div
              class="flex items-center justify-end pt-6 border-t border-gray-200 space-x-3"
            >
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="px-4 py-2 text-sm font-medium text-white bg-biru border border-transparent rounded-lg hover:bg-biru/90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span v-if="isSubmitting">Menyimpan...</span>
                <span v-else>{{ isEditing ? "Update" : "Simpan" }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal Export -->
    <div
      v-if="showExportModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <!-- Modal Header -->
          <div
            class="flex items-center justify-between pb-4 border-b border-gray-200"
          >
            <h3 class="text-lg font-medium text-gray-900">Export Data</h3>
            <button
              @click="closeExportModal"
              class="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            <!-- Category Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Kategori</label
              >
              <select
                v-model="selectedCategory"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Kategori</option>
                <option value="individu">individu</option>
                <option value="Conseling Individu">Conseling Individu</option>
                <option value="Conseling Kelompok">Conseling Kelompok</option>
                <option value="Bimbingan Kelompok">Bimbingan Kelompok</option>
                <option value="Bimbingan Kalsikal">Bimbingan Kalsikal</option>
                <option value="Bimbingan Kelas Besar">
                  Bimbingan Kelas Besar
                </option>
                <option value="Konsultasi">Konsultasi</option>
                <option value="Kolaborasi">Kolaborasi</option>
                <option value="Alih Tangan Kasus">Alih Tangan Kasus</option>
                <option value="Kunjungan Rumah">Kunjungan Rumah</option>
                <option value="Advokasi">Advokasi</option>
                <option value="Konferensi Kasus">Konferensi Kasus</option>
              </select>
            </div>

            <!-- School Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nama Sekolah</label
              >
              <select
                v-model="selectedSchool"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">-- Pilih Semua Sekolah --</option>
                <option
                  v-for="(item, index) in schoolData"
                  :key="index"
                  :value="item.institut_id"
                >
                  {{ item.institution.name }}
                </option>
              </select>
            </div>

            <!-- Status Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Status</label
              >
              <select
                v-model="selectedStatus"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Status</option>
                <option value="Selesai">✅ Selesai</option>
                <option value="Berlangsung">🔄 Berlangsung</option>
                <option value="Direncanakan">📋 Direncanakan</option>
              </select>
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <!-- Quick Period Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Filter Periode</label
              >
              <select
                v-model="selectedPeriod"
                @change="handlePeriodChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Semua Periode</option>
                <option value="today">📅 Hari Ini</option>
                <option value="week">📊 Minggu Ini</option>
                <option value="month">📈 Bulan Ini</option>
                <option value="custom">🗓️ Periode Custom</option>
              </select>
            </div>

            <!-- Start Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Mulai</label
              >
              <input
                v-model="priode_awal"
                type="date"
                :disabled="selectedPeriod !== 'custom'"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>

            <!-- End Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tanggal Selesai</label
              >
              <input
                v-model="priode_akhir"
                type="date"
                :disabled="selectedPeriod !== 'custom'"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
        <!-- Modal Footer -->
        <div
          class="flex items-center justify-end pt-6 border-t border-gray-200 space-x-3"
        >
          <button
            @click="exportToPDF()"
            type="button"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-gray-300 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from 'axios';

// Reactive data
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedPeriod = ref("");
const selectedStatus = ref("");
const selectedSchool = ref("");
const priode_awal = ref("");
const priode_akhir = ref("");
const itemsPerPage = ref(10);
const currentPage = ref(1);

// Modal states
const showAddModal = ref(false);
const showExportModal = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);
const editingId = ref(null);

// Toast states
const showToast = ref(false);
const toastMessage = ref("");

// Form data
const formData = ref({
  title: "",
  detail: "",
  kegiatan: "",
  institut_id: "",
  jumlah: "",
  waktu: "",
  waktu_detail: "",
  equivalen: "",
  priode_awal: "",
  priode_akhir: "",
  status: "",
});

const formExport = ref({
  kegiatan: "",
  institut_id: "",
  priode_awal: "",
  priode_akhir: "",
  status: "",
});

// Sample data with dates and status
const activities = ref([]);

// Computed properties
// Di bagian computed filteredActivities
const filteredActivities = computed(() => {
  let filtered = activities.value;

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(
      (activity) =>
        activity.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        activity.detail
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        activity.kegiatan
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(
      (activity) => activity.kegiatan === selectedCategory.value
    );
  }

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(
      (activity) => activity.status === selectedStatus.value
    );
  }

  // Filter by date range - PERBAIKAN UTAMA DISINI
  if (priode_awal.value && priode_akhir.value) {
    const startDate = new Date(priode_awal.value);
    const endDate = new Date(priode_akhir.value);

    // Tambahkan waktu ke akhir hari (23:59:59)
    endDate.setHours(23, 59, 59, 999);

    filtered = filtered.filter((activity) => {
      try {
        // Pastikan format tanggal konsisten
        const activityDate = new Date(activity.priode_awal.split(" ")[0]);

        // Cek apakah tanggal aktivitas berada dalam range
        return activityDate >= startDate && activityDate <= endDate;
      } catch (e) {
        console.error("Error parsing date:", activity.priode_awal, e);
        return false;
      }
    });
  }

  // Filter by school
  if (selectedSchool.value) {
    filtered = filtered.filter(
      (activity) => activity.institut_id == selectedSchool.value
    );
  }

  // Filter lainnya (search, category, date range, dll) tetap seperti sebelumnya
  if (searchQuery.value) {
    filtered = filtered.filter(
      (activity) =>
        activity.title
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        activity.detail
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        activity.kegiatan
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );
  }

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredActivities.value.length / itemsPerPage.value)
);

const paginatedActivities = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredActivities.value.slice(start, end);
});

const startItem = computed(() => {
  if (filteredActivities.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const endItem = computed(() => {
  const end = currentPage.value * itemsPerPage.value;
  return Math.min(end, filteredActivities.value.length);
});

const totalHours = computed(() => {
  return filteredActivities.value
    .reduce((sum, activity) => sum + (parseFloat(activity.equivalen) || 0), 0)
    .toFixed(1);
});

const averageHours = computed(() => {
  if (filteredActivities.value.length === 0) return "0.0";
  const total = filteredActivities.value.reduce(
    (sum, activity) => sum + (parseFloat(activity.equivalen) || 0),
    0
  );
  return (total / filteredActivities.value.length).toFixed(1);
});

const activeActivitiesCount = computed(() => {
  return filteredActivities.value.filter(
    (activity) => activity.status === "Selesai"
  ).length;
});

const periodInfo = computed(() => {
  if (selectedPeriod.value === "today") {
    return "Menampilkan kegiatan hari ini";
  } else if (selectedPeriod.value === "week") {
    return "Menampilkan kegiatan minggu ini";
  } else if (selectedPeriod.value === "month") {
    return "Menampilkan kegiatan bulan ini";
  } else if (
    selectedPeriod.value === "custom" &&
    priode_awal.value &&
    priode_akhir.value
  ) {
    return `Menampilkan kegiatan dari ${formatDate(
      priode_awal.value
    )} sampai ${formatDate(priode_akhir.value)}`;
  }
  return null;
});

const visiblePages = computed(() => {
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push("...");
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(total);
    }
  }

  return pages;
});

// Validate current page
watch(currentPage, (newPage) => {
  if (newPage < 1) {
    currentPage.value = 1;
  } else if (newPage > totalPages.value && totalPages.value > 0) {
    currentPage.value = totalPages.value;
  }
});

// Methods
const getCategoryColor = (category) => {
  const colors = {
    "Konseling Individual": "bg-blue-100 text-blue-800",
    "Konseling Kelompok": "bg-green-100 text-green-800",
    "Bimbingan Klasikal": "bg-purple-100 text-purple-800",
    Administrasi: "bg-orange-100 text-orange-800",
    Pengembangan: "bg-pink-100 text-pink-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

const getCategoryIcon = (category) => {
  const icons = {
    "Konseling Individual": "👤",
    "Konseling Kelompok": "👥",
    "Bimbingan Klasikal": "🏫",
    Administrasi: "📋",
    Pengembangan: "🚀",
  };
  return icons[category] || "📝";
};

const getStatusColor = (status) => {
  const colors = {
    Selesai: "bg-green-100 text-green-800",
    Berlangsung: "bg-yellow-100 text-yellow-800",
    Perancangan: "bg-blue-100 text-blue-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
};

const getStatusText = (status) => {
  const texts = {
    Selesai: "✅ Selesai",
    Berlangsung: "🔄 Berlangsung",
    Perancangan: "📋 Direncanakan",
  };
  return texts[status] || status;
};

const formatDate = (dateString) => {
  if (!dateString) return "-";

  // Ambil bagian tanggal saja
  const [year, month, day] = dateString.split(" ")[0].split("-");

  return `${day}/${month}/${year}`;
};

const handlePeriodChange = () => {
  const today = new Date();

  if (selectedPeriod.value === "today") {
    const todayStr = today.toISOString().split("T")[0];
    priode_awal.value = todayStr;
    priode_akhir.value = todayStr;
  } else if (selectedPeriod.value === "week") {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    priode_awal.value = startOfWeek.toISOString().split("T")[0];
    priode_akhir.value = endOfWeek.toISOString().split("T")[0];
  } else if (selectedPeriod.value === "month") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    priode_awal.value = startOfMonth.toISOString().split("T")[0];
    priode_akhir.value = endOfMonth.toISOString().split("T")[0];
  } else if (selectedPeriod.value === "") {
    priode_awal.value = "";
    priode_akhir.value = "";
  }
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedSchool.value = "";
  selectedCategory.value = "";
  selectedPeriod.value = "";
  selectedStatus.value = "";
  priode_awal.value = "";
  priode_akhir.value = "";
  currentPage.value = 1;
};

const resetForm = () => {
  formData.value = {
    kegiatan: "",
    selectedSchool: "",
    deskripsi: "",
    kategori: "",
    tanggal: "",
    status: "",
    jumlah: 0,
    satuan: "",
    perkiraanWaktu: "",
    equivalentJam: 0,
  };
};

const closeModal = () => {
  showAddModal.value = false;
  isEditing.value = false;
  editingId.value = null;
  resetForm();
};

const closeExportModal = () => {
  showExportModal.value = false;
};

const editActivity = (activity) => {
  console.log("Editing:", activity); // <- Cek isi lengkapnya
  isEditing.value = true;
  editingId.value = activity.id;

  // Supaya input bisa ditrigger reactive
  formData.value = {
    title: activity.title || "",
    detail: activity.detail || "",
    kegiatan: activity.kegiatan || "",
    kegiatan_lainnya: activity.kegiatan_lainnya || "",
    status: activity.status || "",
    priode_awal: activity.priode_awal || "",
    priode_akhir: activity.priode_akhir || "",
    jumlah: activity.jumlah || 1,
    waktu: activity.waktu || "",
    waktu_detail: activity.waktu_detail || "",
    equivalen: activity.equivalen || 0,
    institut_id: activity.institut_id || "",
  };

  showAddModal.value = true;
};

const apiBase = import.meta.env.VITE_API_BASE_URL;
const exportToPDF = async () => {
  const token = Cookies.get("token"); // Ambil token jika pakai autentikasi

  // Validasi institusi harus diisi
  if (!selectedSchool.value) {
    Swal.fire({
      icon: 'warning',
      title: 'sekolah wajib dipilih',
      text: 'Silakan pilih sekolah terlebih dahulu.',
    });
    return;
  }

  const payload = {
    kegiatan: selectedCategory.value,
    institution: selectedSchool.value,
    status: selectedStatus.value,
    periode: selectedPeriod.value,
    awal: priode_awal.value,
    akhir: priode_akhir.value,
  };

  try {
    const response = await axios.post(
      `${apiBase}export/pdf`,
      payload,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Cek apakah response berupa PDF atau JSON error (data kosong)
    const contentType = response.headers['content-type'];

    if (contentType.includes('application/json')) {
      // Baca isi blob dan convert ke JSON
      const text = await response.data.text();
      const errorData = JSON.parse(text);
      Swal.fire({
        icon: 'info',
        title: 'Data tidak ditemukan',
        text: errorData.message || 'Tidak ada data yang cocok dengan filter yang dipilih.',
      });
      return;
    }

    // Jika tidak error, buat link download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf');
    document.body.appendChild(link);
    link.click();
    link.remove();

    closeExportModal();

  } catch (error) {
    console.error('Gagal export PDF:', error);
    Swal.fire({
      icon: 'warning',
      title: 'Gagal export PDF',
      text: 'Data Yang anda cari kosong, silahkan pilih filter kembali!',
    });
  }
};

const saveActivity = async () => {
  isSubmitting.value = true;
  const token = Cookies.get("token");

  try {
    let response;

    const selectedkegiatan =
      formData.value.kegiatan === "Lainnya"
        ? formData.value.kegiatan_lainnya
        : formData.value.kegiatan;

    const payload = {
      title: formData.value.title,
      detail: formData.value.detail,
      institut_id: formData.value.institut_id,
      kegiatan: selectedkegiatan, // <- gunakan hasil seleksi ini
      jumlah: formData.value.jumlah,
      waktu: formData.value.waktu,
      waktu_detail: formData.value.waktu_detail,
      equivalen: formData.value.equivalen,
      priode_awal: formData.value.priode_awal,
      priode_akhir: formData.value.priode_akhir,
      status: formData.value.status,
    };

    if (isEditing.value && editingId.value) {
      response = await initAPI(
        "put",
        `equivalen/${editingId.value}`,
        payload,
        token
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message || "Data berhasil diperbarui",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      response = await initAPI("post", "equivalen", payload, token);
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: response.data.message || "Data berhasil ditambahkan",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    await getEquivalen();
    closeModal();
    resetForm();
  } catch (error) {
    console.error("Gagal menyimpan aktivitas:", error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text:
        error?.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan data",
    });
  } finally {
    isSubmitting.value = false;
  }
};

const deleteActivity = async (id) => {
  const token = Cookies.get("token");

  const result = await Swal.fire({
  title: "Yakin ingin menghapus?",
  text: "Data yang dihapus tidak dapat dikembalikan!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonText: "Ya, hapus!",
  cancelButtonText: "Batal",
  reverseButtons: true,
  customClass: {
    confirmButton: 'bg-red-600 text-white px-4 py-2 rounded',
    cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded mr-3',
  },
  buttonsStyling: false, // <--- penting untuk mengaktifkan customClass
});


  if (result.isConfirmed) {
    try {

      const response = await initAPI("delete", `equivalen/${id}`, null, token);
      console.log("Hapus berhasil:", response.data.message);


      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus.",
        timer: 2000,
        showConfirmButton: false,
      });
      await getEquivalen();
    } catch (error) {
      console.error("Gagal hapus jurnal:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus jurnal.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  }
};

const showToastMessage = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

// Watch for filter changes to reset pagination
watch(
  [
    searchQuery,
    selectedCategory,
    selectedPeriod,
    selectedStatus,
    priode_awal,
    priode_akhir,
    itemsPerPage,
  ],
  () => {
    currentPage.value = 1;
  }
);

const equivalens = ref();
const getEquivalen = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "equivalen", null, token);
    activities.value = response.data.data;
    console.log("Equvalents : ", activities.value);
  } catch (error) {
    console.error("Gagal ambil data", error);
  }
};

const schoolData = ref();
const getSchool = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "journal/schools", null, token);
    schoolData.value = response.data.data;
    console.log("Data Sekolah Ku", schoolData.value);
  } catch (error) {
    console.error("Gagal ambil data sekolah", error);
  }
};

onMounted(async () => {
  await getEquivalen();
  await getSchool();
});
</script>
