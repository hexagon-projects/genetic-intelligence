<template>
  <Layout>
    <div class="bg-gray-100 p-5 min-h-screen">
      <div class="w-full md:w-4/5 mx-auto">
        <main class="w-full mx-auto px-4">
          <div class="flex mb-5">
            <!-- navigation profile -->
            <NavigateProfile />
          </div>
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
                @click="showAddForm"
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
                Tambah Journal
              </button>
            </div>
          </div>
          <!-- Journal List View -->
          <div v-if="currentView === 'list'" class="space-y-6">
            <!-- Search and Filters -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <!-- Search -->
                <div class="md:col-span-1">
                  <label
                    for="search"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Cari Sesuai Topik</label
                  >
                  <div class="relative">
                    <input
                      id="search"
                      v-model="searchQuery"
                      type="text"
                      placeholder="cari berdasarkan topik ..."
                      class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                    <svg
                      class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
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
                <!-- School Filter -->
                <div class="md:col-span-1">
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

                <!-- Date Filter -->
                <div class="md:col-span-1">
                  <label
                    for="dateFilter"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Filter berdasarkan Tanggal</label
                  >
                  <select
                    id="dateFilter"
                    v-model="selectedDateRange"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option value="">Semua Tanggal</option>
                    <option value="today">Hari Ini</option>
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                    <option value="year">Tahun Ini</option>
                  </select>
                </div>
              </div>

              <!-- Clear Filters -->
              <div class="mt-4 flex items-center justify-between">
                <div class="text-sm text-gray-500">
                  Showing {{ filteredJournals.length }} of
                  {{ journals.length }} entries
                </div>
                <button
                  v-if="
                    searchQuery ||
                    selectedMood ||
                    selectedDateRange ||
                    selectedSchool
                  "
                  @click="clearFilters"
                  class="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        @click="sortBy('date')"
                      >
                        <div class="flex items-center gap-1">
                          Date
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            ></path>
                          </svg>
                        </div>
                      </th>

                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sekolah
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Sasaran Kegiatan
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                        @click="sortBy('title')"
                      >
                        <div class="flex items-center gap-1">
                          Kegiatan Layanan
                          <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            ></path>
                          </svg>
                        </div>
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Hasil Capaian
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr
                      v-for="journal in paginatedJournals"
                      :key="journal.id"
                      class="hover:bg-gray-50 transition-colors"
                    >
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                      >
                        {{ formatDate(journal.tanggal) }} :
                        {{ journal.start_time }} -
                        {{ journal.end_time }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div
                          class="text-sm font-medium text-gray-900 max-w-xs truncate"
                        >
                          {{ journal.institut.name }}
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span
                          class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {{ journal.sasaran }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div
                          class="text-sm font-medium text-gray-900 max-w-xs truncate"
                        >
                          {{ journal.title }} : {{ journal.layanan }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-600 max-w-md space-y-1">
                          <p
                            v-for="(detail, index) in journal.journal_details"
                            :key="detail.id"
                            class="line-clamp-2"
                          >
                            {{ detail.note }}
                          </p>
                        </div>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                      >
                        <div class="flex items-center gap-2">
                          <button
                            @click="editJournal(journal)"
                            class="text-gray-600 hover:text-gray-900 transition-colors"
                            title="Edit"
                          >
                            <svg
                              class="w-4 h-4"
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
                            @click="deleteJournal(journal.id)"
                            class="text-red-600 hover:text-red-900 transition-colors"
                            title="Delete"
                          >
                            <svg
                              class="w-4 h-4"
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
              <div
                v-if="filteredJournals.length === 0"
                class="text-center py-12"
              >
                <div class="text-gray-400 mb-4">
                  <svg
                    class="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 class="text-lg font-medium text-gray-900 mb-2">
                  {{
                    journals.length === 0
                      ? "No journal entries yet"
                      : "No entries match your filters"
                  }}
                </h3>
                <p class="text-gray-500 mb-6">
                  {{
                    journals.length === 0
                      ? "Start writing your first journal entry."
                      : "Try adjusting your search or filter criteria."
                  }}
                </p>
                <button
                  v-if="journals.length === 0"
                  @click="showAddForm"
                  class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Write First Entry
                </button>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="filteredJournals.length > 0"
              class="bg-white rounded-lg shadow-sm border p-4"
            >
              <div class="flex items-center justify-between">
                <div class="text-sm text-gray-700">
                  Showing {{ startIndex + 1 }} to
                  {{ Math.min(endIndex, filteredJournals.length) }} of
                  {{ filteredJournals.length }} results
                </div>

                <div class="flex items-center gap-2">
                  <!-- Items per page -->
                  <div class="flex items-center gap-2 mr-4">
                    <label for="perPage" class="text-sm text-gray-700"
                      >Show:</label
                    >
                    <select
                      id="perPage"
                      v-model="itemsPerPage"
                      @change="currentPage = 1"
                      class="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                    </select>
                  </div>

                  <!-- Pagination buttons -->
                  <button
                    @click="currentPage = 1"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-l-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    First
                  </button>

                  <button
                    @click="currentPage--"
                    :disabled="currentPage === 1"
                    class="px-3 py-1 text-sm border-t border-b border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <!-- Page numbers -->
                  <template v-for="page in visiblePages" :key="page">
                    <button
                      v-if="page !== '...'"
                      @click="currentPage = page"
                      :class="[
                        'px-3 py-1 text-sm border-t border-b border-gray-300 transition-colors',
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:bg-gray-50',
                      ]"
                    >
                      {{ page }}
                    </button>
                    <span
                      v-else
                      class="px-3 py-1 text-sm border-t border-b border-gray-300 text-gray-500"
                    >
                      ...
                    </span>
                  </template>

                  <button
                    @click="currentPage++"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 text-sm border-t border-b border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>

                  <button
                    @click="currentPage = totalPages"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-1 text-sm border border-gray-300 rounded-r-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Journal Detail View -->
          <div v-else-if="currentView === 'detail'" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm border p-8">
              <div class="flex items-start justify-between mb-6">
                <div>
                  <h2 class="text-2xl font-bold text-gray-900 mb-2">
                    {{ selectedJournal.title }}
                  </h2>
                  <div
                    class="flex items-center space-x-4 text-sm text-gray-500"
                  >
                    <span>{{ formatDate(selectedJournal.date) }}</span>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {{ selectedJournal.mood }}
                    </span>
                  </div>
                </div>
                <button
                  @click="editJournal(selectedJournal)"
                  class="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    class="w-5 h-5"
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
              </div>
              <div class="prose max-w-none">
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {{ selectedJournal.content }}
                </p>
              </div>
            </div>
          </div>

          <!-- Add/Edit Journal Form -->
          <div
            v-else-if="currentView === 'add' || currentView === 'edit'"
            class="space-y-6"
          >
            <div class="bg-white rounded-lg shadow-sm border p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">
                {{
                  currentView === "add"
                    ? "Tambah Jurnal Baru"
                    : "Perbaharui Data Jurnal"
                }}
              </h2>

              <form @submit.prevent="saveJournal" class="space-y-6">
                <div>
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Topik Journal</label
                  >
                  <input
                    id="title"
                    v-model="formData.title"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Topik Journal..."
                  />
                </div>

                <div>
                  <label
                    for="kegiatan"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Kegiatan Layanan</label
                  >
                  <input
                    id="kegiatan"
                    v-model="formData.layanan"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Kegiatan Layanan ..."
                  />
                </div>

                <div>
                  <label
                    for="sasaran"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Sasaran Kegiatan</label
                  >
                  <input
                    id="sasaran"
                    v-model="formData.sasaran"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="Sasaran Layanan ..."
                  />
                </div>

                <div>
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

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <!-- Input Tanggal -->
                  <div>
                    <label
                      for="tanggal"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Tanggal Kegiatan
                    </label>
                    <input
                      type="date"
                      id="tanggal"
                      v-model="formData.tanggal"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <!-- Input Jam Mulai -->
                  <div>
                    <label
                      for="start_time"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Jam Mulai
                    </label>
                    <input
                      type="time"
                      id="start_time"
                      v-model="formData.start_time"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>

                  <!-- Input Jam Selesai -->
                  <div>
                    <label
                      for="end_time"
                      class="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Jam Selesai
                    </label>
                    <input
                      type="time"
                      id="end_time"
                      v-model="formData.end_time"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="note"
                    class="block text-sm font-medium text-gray-700 mb-2"
                    >Hasil Capaian</label
                  >
                  <textarea
                    id="note"
                    v-model="formData.note"
                    required
                    rows="12"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                    placeholder="Write your thoughts here..."
                  ></textarea>
                </div>

                <div class="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    @click="showList"
                    class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                  >
                    Kembali
                  </button>
                  <button
                    v-if="isLoading"
                    disabled
                    class="px-4 py-2 bg-biru text-white rounded-md hover:bg-biru/80"
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Menyimpan ...
                  </button>
                  <button
                    v-else
                    type="submit"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    {{
                      currentView === "add"
                        ? "Tambah Jurnal"
                        : "Perbaharui Jurnal"
                    }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
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

          <div class="grid grid-cols-1 gap-4 my-5">
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
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <!-- Date Filter -->
            <div>
              <label
                for="dateFilter"
                class="block text-sm font-medium text-gray-700 mb-2"
                >Filter berdasarkan Tanggal</label
              >
              <select
                id="dateFilter"
                v-model="selectedDateRange"
                @change="handlePeriodChange"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="">Semua Tanggal</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
                <option value="year">Tahun Ini</option>
                <option value="custom">Periode Custom</option>
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
                :disabled="selectedDateRange !== 'custom'"
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
                :disabled="selectedDateRange !== 'custom'"
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
  </Layout>
</template>

<script setup>
import Layout from "@/Layout/Bk/Layout.vue";
import NavigateProfile from "../../../../components/REMAKE/Bk/NavigateProfile.vue";
import { ref, reactive, computed, watch, onMounted } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";
import axios from 'axios';

// Reactive state
const currentView = ref("list");
const selectedJournal = ref(null);
const editingJournal = ref(null);
const showExportModal = ref(false);
const selectedPeriod = ref('');
const priode_awal = ref('');
const priode_akhir = ref('');


const closeExportModal = () => {
  showExportModal.value = false;
};

const formData = reactive({
  title: "",
  layanan: "",
  sasaran: "",
  institut_id: "",
  tanggal: "",
  start_time: "",
  end_time: "",
  note: "",
});

const journals = ref([]);

// Search and filter state
const searchQuery = ref("");
const selectedMood = ref("");
const selectedDateRange = ref("");
const selectedSchool = ref("");

// Pagination state
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Sorting state
const sortField = ref("date");
const sortDirection = ref("desc");

// Computed properties
const filteredJournals = computed(() => {
  let filtered = [...journals.value];

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (journal) =>
        journal.title.toLowerCase().includes(query) ||
        journal.sasaran.toLowerCase().includes(query) ||
        (journal.journal_details &&
          journal.journal_details.some((detail) =>
            detail.note.toLowerCase().includes(query)
          )) ||
        journal.layanan.toLowerCase().includes(query)
    );
  }

  // School filter
  if (selectedSchool.value) {
    filtered = filtered.filter(
      (journal) => journal.institut_id == selectedSchool.value
    );
  }

  // Mood filter (jika masih diperlukan)
  if (selectedMood.value) {
    filtered = filtered.filter(
      (journal) => journal.mood === selectedMood.value
    );
  }

  // Date filter
  if (selectedDateRange.value) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    filtered = filtered.filter((journal) => {
      const journalDate = new Date(journal.tanggal);

      switch (selectedDateRange.value) {
        case "today":
          return journalDate.getTime() === today.getTime();
        case "week":
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          return journalDate >= weekAgo;
        case "month":
          const monthAgo = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate()
          );
          return journalDate >= monthAgo;
        case "year":
          const yearAgo = new Date(
            today.getFullYear() - 1,
            today.getMonth(),
            today.getDate()
          );
          return journalDate >= yearAgo;
        default:
          return true;
      }
    });
  }

  // Sort
  filtered.sort((a, b) => {
    let aValue = a[sortField.value];
    let bValue = b[sortField.value];

    if (sortField.value === "date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (sortDirection.value === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filtered;
});

const totalPages = computed(() => {
  return Math.ceil(filteredJournals.value.length / itemsPerPage.value);
});

const startIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage.value;
});

const endIndex = computed(() => {
  return startIndex.value + itemsPerPage.value;
});

const paginatedJournals = computed(() => {
  return filteredJournals.value.slice(startIndex.value, endIndex.value);
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

// Watchers
watch(filteredJournals, () => {
  // Reset to first page when filters change
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1;
  }
});

// Methods
const showList = () => {
  currentView.value = "list";
  selectedJournal.value = null;
  editingJournal.value = null;
  resetForm();
};

const showAddForm = () => {
  currentView.value = "add";
  resetForm();
};

const viewJournal = (journal) => {
  selectedJournal.value = journal;
  currentView.value = "detail";
};

const editJournal = (journal) => {
  editingJournal.value = journal;
  formData.title = journal.title;
  formData.layanan = journal.layanan;
  formData.sasaran = journal.sasaran;
  formData.institut_id = journal.institut_id;
  formData.tanggal = journal.tanggal;
  formData.start_time = formData.start_time?.substring(0, 5);
  formData.end_time = formData.end_time?.substring(0, 5);

  // Periksa apakah journal.journal_details ada dan tidak kosong
  if (journal.journal_details && journal.journal_details.length > 0) {
    formData.note = journal.journal_details[0].note;
  } else {
    formData.note = ""; // Atau nilai default lainnya
  }

  currentView.value = "edit";
};

const deleteJournal = async (id) => {
  const token = Cookies.get("token");

  const result = await Swal.fire({
    title: "Yakin ingin menghapus?",
    text: "Data jurnal yang dihapus tidak dapat dikembalikan!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
    reverseButtons: true,
  });

  if (result.isConfirmed) {
    try {
      isLoading.value = true;

      const response = await initAPI("delete", `journal/${id}`, null, token);
      console.log("Hapus berhasil:", response.data.message);

      // Hapus dari list lokal
      journals.value = journals.value.filter((j) => j.id !== id);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Jurnal berhasil dihapus.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal hapus jurnal:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menghapus jurnal.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      isLoading.value = false;
    }
  }
};

const isLoading = ref(false);
const journalssaya = ref();
const saveJournal = async () => {
  const token = Cookies.get("token");
  isLoading.value = true; // <-- tambahkan baris ini di awal

  if (currentView.value === "add") {
    try {
      const newJournal = {
        title: formData.title,
        layanan: formData.layanan,
        sasaran: formData.sasaran,
        institut_id: formData.institut_id,
        note: formData.note,
        tanggal: formData.tanggal,
        start_time: formData.start_time?.substring(0, 5),
        end_time: formData.end_time?.substring(0, 5),
      };
      const response = await initAPI("post", "journal", newJournal, token);
      journalssaya.value = response.data.data;
      console.log("journal saya:", journalssaya.value);
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Data berhasil disimpan.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal upload:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan data.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      isLoading.value = false;
      getJournal();
    }
  } else if (currentView.value === "edit") {
    try {
      const newJournal = {
        title: formData.title,
        layanan: formData.layanan,
        sasaran: formData.sasaran,
        institut_id: formData.institut_id,
        note: formData.note,
        tanggal: formData.tanggal,
        start_time: formData.start_time?.substring(0, 5),
        end_time: formData.end_time?.substring(0, 5),
      };
      await initAPI(
        "put",
        `journal/${editingJournal.value.id}`,
        newJournal,
        token
      );
      Swal.fire({
        icon: "success",
        title: "Sukses",
        text: "Data berhasil disimpan.",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Gagal upload:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Terjadi kesalahan saat menyimpan data.",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      isLoading.value = false;
      getJournal();
    }
  }
  showList();
};

const resetForm = () => {
  formData.title = "";
  formData.layanan = "";
  formData.sasaran = "";
  formData.institut_id = "";
  formData.tanggal = "";
  formData.start_time = "";
  formData.end_time = "";
  formData.note = "";
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedMood.value = "";
  selectedDateRange.value = "";
  selectedSchool.value = "";
  currentPage.value = 1;
};

const sortBy = (field) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    weekday: "long", // opsional: "Senin"
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const handlePeriodChange = () => {
  const today = new Date();

  if (selectedDateRange.value === "today") {
    const todayStr = today.toISOString().split("T")[0];
    priode_awal.value = todayStr;
    priode_akhir.value = todayStr;
  } else if (selectedDateRange.value === "week") {
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    priode_awal.value = startOfWeek.toISOString().split("T")[0];
    priode_akhir.value = endOfWeek.toISOString().split("T")[0];
  } else if (selectedDateRange.value === "month") {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    priode_awal.value = startOfMonth.toISOString().split("T")[0];
    priode_akhir.value = endOfMonth.toISOString().split("T")[0];
  } else if (selectedDateRange.value === "") {
    priode_awal.value = "";
    priode_akhir.value = "";
  } else if (selectedPeriod.value === "year") {
  const startOfYear = new Date(today.getFullYear(), 0, 1);
  const endOfYear = new Date(today.getFullYear(), 11, 31);

  priode_awal.value = startOfYear.toISOString().split("T")[0];
  priode_akhir.value = endOfYear.toISOString().split("T")[0];
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

const apiBase = import.meta.env.VITE_API_BASE_URL;
const getJournal = async () => {
  const token = Cookies.get("token");
  try {
    const response = await initAPI("get", "journal", null, token);
    journals.value = response.data.data;
    console.log("journal saya:", journals.value);
  } catch (error) {
    console.error("Gagal ambil data sekolah", error);
  }
};

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
    institution: selectedSchool.value,
    periode: selectedPeriod.value,
    awal: priode_awal.value,
    akhir: priode_akhir.value,
  };

  try {
    const response = await axios.post(
      `${apiBase}export/journal-pdf`,
      payload,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('Response:', response);

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

onMounted(() => {
  getSchool();
  getJournal();
  handlePeriodChange();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
