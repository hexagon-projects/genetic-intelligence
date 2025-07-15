<template>
  <div class="min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b rounded-xl">
      <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14 sm:h-16">
          <h1 class="text-lg sm:text-2xl font-bold text-gray-900">
            <span class="hidden sm:inline">Transaction Management</span>
            <span class="sm:hidden">Transactions</span>
          </h1>
          <div class="flex items-center space-x-2 sm:space-x-4">
            <!-- Mobile Export Button -->
            <div class="relative sm:hidden" ref="exportDropdown">
              <button
                @click="showExportMenu = !showExportMenu"
                class="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 5h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </button>
              
              <!-- Mobile Export Menu -->
              <div
                v-if="showExportMenu"
                class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    @click="exportToCSV"
                    class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    CSV
                  </button>
                  <button
                    @click="exportToPDF"
                    :disabled="isExporting"
                    class="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {{ isExporting ? 'PDF...' : 'PDF' }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Desktop Export Dropdown -->
            <div class="relative hidden sm:block" ref="exportDropdown">
              <button
                @click="showExportMenu = !showExportMenu"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-6 5h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Export</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <!-- Desktop Export Menu -->
              <div
                v-if="showExportMenu"
                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200"
              >
                <div class="py-1">
                  <button
                    @click="exportToCSV"
                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Export as CSV
                  </button>
                  <button
                    @click="exportToPDF"
                    :disabled="isExporting"
                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {{ isExporting ? 'Generating PDF...' : 'Export as PDF' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="w-full mx-auto py-4 sm:py-8">
      <!-- Mobile Toggle Buttons -->
      <div class="lg:hidden mb-4">
        <div class="flex bg-gray-100 rounded-xl p-1">
          <button
            @click="mobileView = 'list'"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
              mobileView === 'list' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
          >
            Transaction List
          </button>
          <button
            @click="mobileView = 'detail'"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
              mobileView === 'detail' 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            ]"
            :disabled="!selectedTransaction"
          >
            Details
            <span v-if="!selectedTransaction" class="text-xs block">Select a transaction</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Transaction List -->
        <div 
          :class="[
            'lg:col-span-2',
            mobileView === 'detail' ? 'hidden lg:block' : 'block'
          ]"
        >
          <div class="bg-white rounded-lg shadow">
            <div class="p-4 sm:p-6 border-b">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Transaction List</h2>
              
              <!-- Mobile Filters -->
              <div class="space-y-3 sm:hidden">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search transactions..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <div class="grid grid-cols-2 gap-3">
                  <select
                    v-model="statusFilter"
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  <select
                    v-model="typeFilter"
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="transfer">Transfer</option>
                  </select>
                </div>
              </div>

              <!-- Desktop Filters -->
              <div class="hidden sm:flex flex-col sm:flex-row gap-4">
                <div class="flex-1">
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search transactions..."
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <select
                  v-model="statusFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                <select
                  v-model="typeFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
            </div>

            <!-- Mobile Card View -->
            <div class="sm:hidden">
              <div class="divide-y divide-gray-200">
                <div
                  v-for="transaction in paginatedTransactions"
                  :key="transaction.id"
                  @click="selectTransactionMobile(transaction)"
                  class="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  :class="{ 'bg-blue-50': selectedTransaction?.id === transaction.id }"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm font-medium text-gray-900">#{{ transaction.id }}</span>
                      <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800': transaction.status === 'completed',
                          'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                          'bg-red-100 text-red-800': transaction.status === 'failed'
                        }">
                        {{ transaction.status }}
                      </span>
                    </div>
                    <span class="text-sm font-semibold" :class="{
                      'text-green-600': transaction.type === 'income',
                      'text-red-600': transaction.type === 'expense',
                      'text-blue-600': transaction.type === 'transfer'
                    }">
                      {{ transaction.type === 'expense' ? '-' : '+' }}${{ transaction.amount.toLocaleString() }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">{{ transaction.name }}</p>
                      <p class="text-xs text-gray-500">{{ formatDate(transaction.date) }}</p>
                    </div>
                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': transaction.type === 'income',
                        'bg-red-100 text-red-800': transaction.type === 'expense',
                        'bg-blue-100 text-blue-800': transaction.type === 'transfer'
                      }">
                      {{ transaction.type }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Table View -->
            <div class="hidden sm:block overflow-x-auto">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction ID
                    </th>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr
                    v-for="transaction in paginatedTransactions"
                    :key="transaction.id"
                    @click="selectTransaction(transaction)"
                    class="hover:bg-gray-50 cursor-pointer transition-colors"
                    :class="{ 'bg-blue-50': selectedTransaction?.id === transaction.id }"
                  >
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{{ transaction.id }}
                    </td>
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ transaction.name }}
                    </td>
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800': transaction.type === 'income',
                          'bg-red-100 text-red-800': transaction.type === 'expense',
                          'bg-blue-100 text-blue-800': transaction.type === 'transfer'
                        }">
                        {{ transaction.type }}
                      </span>
                    </td>
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span :class="{
                        'text-green-600': transaction.type === 'income',
                        'text-red-600': transaction.type === 'expense',
                        'text-blue-600': transaction.type === 'transfer'
                      }">
                        {{ transaction.type === 'expense' ? '-' : '+' }}${{ transaction.amount.toLocaleString() }}
                      </span>
                    </td>
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800': transaction.status === 'completed',
                          'bg-yellow-100 text-yellow-800': transaction.status === 'pending',
                          'bg-red-100 text-red-800': transaction.status === 'failed'
                        }">
                        {{ transaction.status }}
                      </span>
                    </td>
                    <td class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(transaction.date) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div v-if="filteredTransactions.length > 0" class="bg-white px-4 py-3 border-t border-gray-200">
              <!-- Mobile Pagination -->
              <div class="sm:hidden">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm text-gray-700">
                    {{ paginationInfo.start }}-{{ paginationInfo.end }} of {{ paginationInfo.total }}
                  </p>
                  <select
                    :value="itemsPerPage"
                    @change="changeItemsPerPage(parseInt($event.target.value))"
                    class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                      {{ option }}
                    </option>
                  </select>
                </div>
                <div class="flex items-center justify-center space-x-2">
                  <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <span class="px-3 py-2 text-sm text-gray-700">
                    {{ currentPage }} / {{ totalPages }}
                  </span>
                  <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>

              <!-- Desktop Pagination -->
              <div class="hidden sm:flex items-center justify-between">
                <div class="flex items-center">
                  <p class="text-sm text-gray-700">
                    Showing {{ paginationInfo.start }} to {{ paginationInfo.end }} of {{ paginationInfo.total }} results
                  </p>
                  <div class="ml-4 flex items-center">
                    <label class="text-sm text-gray-700 mr-2">Show:</label>
                    <select
                      :value="itemsPerPage"
                      @change="changeItemsPerPage(parseInt($event.target.value))"
                      class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                        {{ option }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <!-- Previous Button -->
                  <button
                    @click="goToPage(currentPage - 1)"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>

                  <!-- Page Numbers -->
                  <template v-for="page in totalPages" :key="page">
                    <button
                      v-if="page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2)"
                      @click="goToPage(page)"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      :class="{
                        'z-10 bg-blue-50 border-blue-500 text-blue-600': page === currentPage,
                        'bg-white border-gray-300 text-gray-500 hover:bg-gray-50': page !== currentPage
                      }"
                    >
                      {{ page }}
                    </button>
                    <span
                      v-else-if="(page === currentPage - 3 && currentPage > 4) || (page === currentPage + 3 && currentPage < totalPages - 3)"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                    >
                      ...
                    </span>
                  </template>

                  <!-- Next Button -->
                  <button
                    @click="goToPage(currentPage + 1)"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="paginatedTransactions.length === 0 && filteredTransactions.length === 0" class="text-center py-8 sm:py-12">
              <div class="text-gray-500">
                <svg class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
                <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                <button @click="resetFiltersAndPagination" class="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium">
                  Clear all filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Transaction Detail -->
        <div 
          :class="[
            'lg:col-span-1',
            mobileView === 'list' ? 'hidden lg:block' : 'block'
          ]"
        >
          <div class="bg-white rounded-lg shadow lg:sticky lg:top-8">
            <div class="p-4 sm:p-6">
              <div class="flex items-center justify-between mb-4 sm:mb-6">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-900">Transaction Details</h2>
                <!-- Mobile Back Button -->
                <button
                  @click="mobileView = 'list'"
                  class="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div v-if="selectedTransaction" class="space-y-4 sm:space-y-6">
                <!-- Transaction Header -->
                <div class="text-center pb-4 sm:pb-6 border-b">
                  <div class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                    :class="{
                      'bg-green-100': selectedTransaction.type === 'income',
                      'bg-red-100': selectedTransaction.type === 'expense',
                      'bg-blue-100': selectedTransaction.type === 'transfer'
                    }">
                    <svg class="w-6 h-6 sm:w-8 sm:h-8" :class="{
                      'text-green-600': selectedTransaction.type === 'income',
                      'text-red-600': selectedTransaction.type === 'expense',
                      'text-blue-600': selectedTransaction.type === 'transfer'
                    }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path v-if="selectedTransaction.type === 'income'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      <path v-else-if="selectedTransaction.type === 'expense'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <h3 class="text-base sm:text-lg font-medium text-gray-900">{{ selectedTransaction.name }}</h3>
                  <p class="text-xl sm:text-2xl font-bold mt-2" :class="{
                    'text-green-600': selectedTransaction.type === 'income',
                    'text-red-600': selectedTransaction.type === 'expense',
                    'text-blue-600': selectedTransaction.type === 'transfer'
                  }">
                    {{ selectedTransaction.type === 'expense' ? '-' : '+' }}${{ selectedTransaction.amount.toLocaleString() }}
                  </p>
                </div>

                <!-- Transaction Info -->
                <div class="space-y-3 sm:space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Transaction ID</span>
                    <span class="text-sm text-gray-900">#{{ selectedTransaction.id }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Transaction Number</span>
                    <span class="text-sm text-gray-900">{{ selectedTransaction.transactionNumber }}</span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Type</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': selectedTransaction.type === 'income',
                        'bg-red-100 text-red-800': selectedTransaction.type === 'expense',
                        'bg-blue-100 text-blue-800': selectedTransaction.type === 'transfer'
                      }">
                      {{ selectedTransaction.type }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Status</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800': selectedTransaction.status === 'completed',
                        'bg-yellow-100 text-yellow-800': selectedTransaction.status === 'pending',
                        'bg-red-100 text-red-800': selectedTransaction.status === 'failed'
                      }">
                      {{ selectedTransaction.status }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Date</span>
                    <span class="text-sm text-gray-900">{{ formatDate(selectedTransaction.date) }}</span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Category</span>
                    <span class="text-sm text-gray-900">{{ selectedTransaction.category }}</span>
                  </div>

                  <div class="flex justify-between items-start">
                    <span class="text-sm font-medium text-gray-500">Description</span>
                    <span class="text-sm text-gray-900 text-right max-w-32 sm:max-w-48">{{ selectedTransaction.description }}</span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Reference</span>
                    <span class="text-sm text-gray-900">{{ selectedTransaction.reference }}</span>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="pt-4 sm:pt-6 border-t space-y-3">
                  <button class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
                    Edit Transaction
                  </button>
                  <button class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
                    Download Receipt
                  </button>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-8 sm:py-12">
                <svg class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No transaction selected</h3>
                <p class="mt-1 text-sm text-gray-500">Select a transaction from the list to view details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Reactive data
const searchQuery = ref('')
const statusFilter = ref('')
const typeFilter = ref('')
const selectedTransaction = ref(null)
const showAddTransaction = ref(false)

// Mobile responsiveness
const mobileView = ref('list') // 'list' or 'detail'

// Export functionality
const showExportMenu = ref(false)
const isExporting = ref(false)
const exportDropdown = ref(null)

// Pagination
const currentPage = ref(1)
const itemsPerPage = ref(10)
const itemsPerPageOptions = [5, 10, 25, 50, 100]

// Sample transaction data
const transactions = ref([
  {
    id: 'TXN001',
    transactionNumber: 'TN-2024-001',
    name: 'Salary Payment',
    type: 'income',
    amount: 5000,
    status: 'completed',
    date: new Date('2024-01-15'),
    category: 'Salary',
    description: 'Monthly salary payment from ABC Company',
    reference: 'SAL-JAN-2024'
  },
  {
    id: 'TXN002',
    transactionNumber: 'TN-2024-002',
    name: 'Grocery Shopping',
    type: 'expense',
    amount: 150,
    status: 'completed',
    date: new Date('2024-01-14'),
    category: 'Food & Dining',
    description: 'Weekly grocery shopping at SuperMart',
    reference: 'GRC-001'
  },
  {
    id: 'TXN003',
    transactionNumber: 'TN-2024-003',
    name: 'Bank Transfer',
    type: 'transfer',
    amount: 1000,
    status: 'pending',
    date: new Date('2024-01-13'),
    category: 'Transfer',
    description: 'Transfer to savings account',
    reference: 'TRF-SAV-001'
  },
  {
    id: 'TXN004',
    transactionNumber: 'TN-2024-004',
    name: 'Freelance Project',
    type: 'income',
    amount: 800,
    status: 'completed',
    date: new Date('2024-01-12'),
    category: 'Freelance',
    description: 'Payment for web development project',
    reference: 'FRL-WEB-001'
  },
  {
    id: 'TXN005',
    transactionNumber: 'TN-2024-005',
    name: 'Utility Bill',
    type: 'expense',
    amount: 120,
    status: 'failed',
    date: new Date('2024-01-11'),
    category: 'Utilities',
    description: 'Monthly electricity bill payment',
    reference: 'UTL-ELC-001'
  },
  {
    id: 'TXN006',
    transactionNumber: 'TN-2024-006',
    name: 'Investment Dividend',
    type: 'income',
    amount: 250,
    status: 'completed',
    date: new Date('2024-01-10'),
    category: 'Investment',
    description: 'Quarterly dividend from stock portfolio',
    reference: 'INV-DIV-Q1'
  }
])

// Add more sample transactions for pagination demo
for (let i = 7; i <= 50; i++) {
  const types = ['income', 'expense', 'transfer']
  const statuses = ['completed', 'pending', 'failed']
  const categories = ['Salary', 'Food & Dining', 'Transfer', 'Freelance', 'Utilities', 'Investment', 'Shopping', 'Entertainment', 'Healthcare', 'Transportation']
  
  transactions.value.push({
    id: `TXN${i.toString().padStart(3, '0')}`,
    transactionNumber: `TN-2024-${i.toString().padStart(3, '0')}`,
    name: `Transaction ${i}`,
    type: types[Math.floor(Math.random() * types.length)],
    amount: Math.floor(Math.random() * 5000) + 50,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    date: new Date(2024, 0, Math.floor(Math.random() * 30) + 1),
    category: categories[Math.floor(Math.random() * categories.length)],
    description: `Sample transaction description for transaction ${i}`,
    reference: `REF-${i.toString().padStart(3, '0')}`
  })
}

// Computed properties
const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         transaction.transactionNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = !statusFilter.value || transaction.status === statusFilter.value
    const matchesType = !typeFilter.value || transaction.type === typeFilter.value
    
    return matchesSearch && matchesStatus && matchesType
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage.value)
})

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTransactions.value.slice(start, end)
})

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1
  const end = Math.min(start + itemsPerPage.value - 1, filteredTransactions.value.length)
  return {
    start,
    end,
    total: filteredTransactions.value.length
  }
})

// Methods
const selectTransaction = (transaction) => {
  selectedTransaction.value = transaction
}

const selectTransactionMobile = (transaction) => {
  selectedTransaction.value = transaction
  mobileView.value = 'detail'
}

const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage
  currentPage.value = 1 // Reset to first page
}

const resetFiltersAndPagination = () => {
  searchQuery.value = ''
  statusFilter.value = ''
  typeFilter.value = ''
  currentPage.value = 1
}

// Export Methods
const exportToCSV = () => {
  showExportMenu.value = false
  
  // Prepare CSV headers
  const headers = [
    'Transaction ID',
    'Transaction Number', 
    'Name',
    'Type',
    'Amount',
    'Status',
    'Date',
    'Category',
    'Description',
    'Reference'
  ]
  
  // Prepare CSV data
  const csvData = filteredTransactions.value.map(transaction => [
    transaction.id,
    transaction.transactionNumber,
    transaction.name,
    transaction.type,
    transaction.amount,
    transaction.status,
    formatDateForExport(transaction.date),
    transaction.category,
    `"${transaction.description}"`, // Wrap in quotes to handle commas
    transaction.reference
  ])
  
  // Combine headers and data
  const csvContent = [headers, ...csvData]
    .map(row => row.join(','))
    .join('\n')
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', `transactions_${new Date().toISOString().split('T')[0]}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const exportToPDF = async () => {
  showExportMenu.value = false
  isExporting.value = true
  
  try {
    // Create PDF content
    const { jsPDF } = await import('jspdf')
    
    const doc = new jsPDF()
    
    // Add title
    doc.setFontSize(20)
    doc.setTextColor(40, 40, 40)
    doc.text('Transaction Report', 20, 20)
    
    // Add export info
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30)
    doc.text(`Total Transactions: ${filteredTransactions.value.length}`, 20, 35)
    
    // Add filters info if any are applied
    let yPosition = 45
    if (searchQuery.value || statusFilter.value || typeFilter.value) {
      doc.setFontSize(12)
      doc.setTextColor(40, 40, 40)
      doc.text('Applied Filters:', 20, yPosition)
      doc.setFontSize(10)
      doc.setTextColor(100, 100, 100)
      yPosition += 8
      if (searchQuery.value) {
        doc.text(`• Search: "${searchQuery.value}"`, 25, yPosition)
        yPosition += 6
      }
      if (statusFilter.value) {
        doc.text(`• Status: ${statusFilter.value}`, 25, yPosition)
        yPosition += 6
      }
      if (typeFilter.value) {
        doc.text(`• Type: ${typeFilter.value}`, 25, yPosition)
        yPosition += 6
      }
      yPosition += 5
    }
    
    // Create custom table
    const startY = yPosition + 10
    const rowHeight = 8
    const colWidths = [25, 45, 20, 25, 20, 35, 30] // Column widths
    const headers = ['ID', 'Name', 'Type', 'Amount', 'Status', 'Date', 'Category']
    
    // Draw table headers
    doc.setFillColor(59, 130, 246) // Blue background
    doc.rect(20, startY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F')
    
    doc.setTextColor(255, 255, 255) // White text
    doc.setFontSize(9)
    doc.setFont(undefined, 'bold')
    
    let xPos = 20
    headers.forEach((header, index) => {
      doc.text(header, xPos + 2, startY + 6)
      xPos += colWidths[index]
    })
    
    // Draw table rows
    doc.setFont(undefined, 'normal')
    doc.setTextColor(40, 40, 40)
    
    const maxRowsPerPage = Math.floor((doc.internal.pageSize.height - startY - 60) / rowHeight)
    let currentY = startY + rowHeight
    let rowCount = 0
    
    filteredTransactions.value.forEach((transaction, index) => {
      // Check if we need a new page
      if (rowCount >= maxRowsPerPage) {
        doc.addPage()
        currentY = 20
        rowCount = 0
        
        // Redraw headers on new page
        doc.setFillColor(59, 130, 246)
        doc.rect(20, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F')
        doc.setTextColor(255, 255, 255)
        doc.setFont(undefined, 'bold')
        
        let headerXPos = 20
        headers.forEach((header, headerIndex) => {
          doc.text(header, headerXPos + 2, currentY + 6)
          headerXPos += colWidths[headerIndex]
        })
        
        doc.setFont(undefined, 'normal')
        doc.setTextColor(40, 40, 40)
        currentY += rowHeight
      }
      
      // Alternate row colors
      if (index % 2 === 0) {
        doc.setFillColor(249, 250, 251) // Light gray
        doc.rect(20, currentY, colWidths.reduce((a, b) => a + b, 0), rowHeight, 'F')
      }
      
      // Draw row data
      const rowData = [
        transaction.id,
        transaction.name.length > 20 ? transaction.name.substring(0, 17) + '...' : transaction.name,
        transaction.type,
        `$${transaction.amount.toLocaleString()}`,
        transaction.status,
        formatDateForExport(transaction.date).split(' ')[0], // Date only
        transaction.category.length > 12 ? transaction.category.substring(0, 9) + '...' : transaction.category
      ]
      
      let dataXPos = 20
      rowData.forEach((data, dataIndex) => {
        const textAlign = dataIndex === 3 ? 'right' : 'left' // Right align amount
        const textX = textAlign === 'right' ? dataXPos + colWidths[dataIndex] - 2 : dataXPos + 2
        doc.text(data.toString(), textX, currentY + 6, { align: textAlign })
        dataXPos += colWidths[dataIndex]
      })
      
      currentY += rowHeight
      rowCount++
    })
    
    // Add summary at the bottom
    const summaryY = currentY + 20
    
    // Check if we need a new page for summary
    if (summaryY > doc.internal.pageSize.height - 40) {
      doc.addPage()
      currentY = 20
    } else {
      currentY = summaryY
    }
    
    doc.setFontSize(12)
    doc.setTextColor(40, 40, 40)
    doc.setFont(undefined, 'bold')
    doc.text('Summary:', 20, currentY)
    
    // Calculate totals
    const totalIncome = filteredTransactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalExpenses = filteredTransactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)
    
    const totalTransfers = filteredTransactions.value
      .filter(t => t.type === 'transfer')
      .reduce((sum, t) => sum + t.amount, 0)
    
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.setFont(undefined, 'normal')
    doc.text(`Total Income: $${totalIncome.toLocaleString()}`, 20, currentY + 12)
    doc.text(`Total Expenses: $${totalExpenses.toLocaleString()}`, 20, currentY + 18)
    doc.text(`Total Transfers: $${totalTransfers.toLocaleString()}`, 20, currentY + 24)
    
    doc.setFont(undefined, 'bold')
    doc.setTextColor(40, 40, 40)
    doc.text(`Net Amount: $${(totalIncome - totalExpenses).toLocaleString()}`, 20, currentY + 32)
    
    // Save the PDF
    doc.save(`transactions_${new Date().toISOString().split('T')[0]}.pdf`)
    
  } catch (error) {
    console.error('Error generating PDF:', error)
    alert('Error generating PDF. Please try again.')
  } finally {
    isExporting.value = false
  }
}

const formatDateForExport = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

// Close export menu when clicking outside
const handleClickOutside = (event) => {
  if (exportDropdown.value && !exportDropdown.value.contains(event.target)) {
    showExportMenu.value = false
  }
}

// Lifecycle
onMounted(() => {
  // Select first transaction from current page by default
  if (paginatedTransactions.value.length > 0) {
    selectedTransaction.value = paginatedTransactions.value[0]
  }
  
  // Add click outside listener for export menu
  document.addEventListener('click', handleClickOutside)
})

// Add cleanup in onUnmounted
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>