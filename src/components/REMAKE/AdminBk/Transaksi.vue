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
                    d="M12 10v6m0 0l-4-4m4 4l4-4m-6 5h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
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
                    <svg
                      class="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    CSV
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
                    d="M12 10v6m0 0l-4-4m4 4l4-4m-6 5h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Export</span>
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
                    d="M19 9l-7 7-7-7"
                  />
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
                    <svg
                      class="w-4 h-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Di dalam div Transaction List, setelah filter dan sebelum tabel -->
    <div class="bg-white p-4 mb-4 rounded-lg mt-5">
      <h3 class="text-sm font-medium text-gray-500 mb-2">
        Transaction Summary
      </h3>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div class="bg-white p-3 rounded-lg shadow-xs border">
          <p class="text-xs text-gray-500">Total SUCCESS</p>
          <p class="text-lg font-semibold text-green-600">
            {{ formatCurrency(totalAmountByStatus("SUCCESS")) }}
          </p>
          <p class="text-xs text-gray-500">
            {{ countByStatus("SUCCESS") }} transactions
          </p>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-xs border">
          <p class="text-xs text-gray-500">Total Pending</p>
          <p class="text-lg font-semibold text-yellow-600">
            ${{ totalAmountByStatus("pending").toLocaleString() }}
          </p>
          <p class="text-xs text-gray-500">
            {{ countByStatus("pending") }} transactions
          </p>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-xs border">
          <p class="text-xs text-gray-500">Total Failed</p>
          <p class="text-lg font-semibold text-red-600">
            ${{ totalAmountByStatus("failed").toLocaleString() }}
          </p>
          <p class="text-xs text-gray-500">
            {{ countByStatus("failed") }} transactions
          </p>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-xs border">
          <p class="text-xs text-gray-500">Total EXPIRED</p>
          <p class="text-lg font-semibold text-red-600">
            ${{ totalAmountByStatus("EXPIRED").toLocaleString() }}
          </p>
          <p class="text-xs text-gray-500">
            {{ countByStatus("EXPIRED") }} transactions
          </p>
        </div>
      </div>
    </div>

    <!-- Di dalam header, setelah judul -->
    <div class="lg:hidden flex items-center space-x-2">
      <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
        SUCCESS: ${{ totalSuccessAmount.toLocaleString() }}
      </span>
      <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
        Pending: ${{ totalPendingAmount.toLocaleString() }}
      </span>
    </div>

    <div class="w-full mx-auto py-4">
      <!-- Mobile Toggle Buttons -->
      <div class="lg:hidden mb-4">
        <div class="flex bg-gray-100 rounded-xl p-1">
          <button
            @click="mobileView = 'list'"
            :class="[
              'flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors',
              mobileView === 'list'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-700',
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
                : 'text-gray-500 hover:text-gray-700',
            ]"
            :disabled="!selectedTransaction"
          >
            Details
            <span v-if="!selectedTransaction" class="text-xs block"
              >Select a transaction</span
            >
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <!-- Transaction List -->
        <div
          :class="[
            'lg:col-span-2',
            mobileView === 'detail' ? 'hidden lg:block' : 'block',
          ]"
        >
          <div class="bg-white rounded-lg shadow">
            <div class="p-4 sm:p-6 border-b">
              <h2 class="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
                Transaction List
              </h2>

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
                    <option value="SUCCESS">SUCCESS</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                    <option value="expired">expired</option>
                  </select>
                  <select
                    v-model="typeFilter"
                    class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="">All Types</option>
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
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="expired">expired</option>
                </select>
                <select
                  v-model="typeFilter"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Types</option>
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
                  :class="{
                    'bg-blue-50':
                      selectedTransaction?.marchant_id ===
                      transaction.marchant_id,
                  }"
                >
                  <div class="flex items-center justify-between mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="text-sm font-medium text-gray-900"
                        >#{{ transaction.marchant_id }}</span
                      >
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800':
                            transaction.status === 'SUCCESS',
                          'bg-yellow-100 text-yellow-800':
                            transaction.status === 'pending',
                          'bg-red-100 text-red-800':
                            transaction.status === 'failed',
                          'bg-red-100 text-red-800':
                            transaction.status === 'expired',
                        }"
                      >
                        {{ transaction.status }}
                      </span>
                    </div>
                    <span
                      class="text-sm font-semibold"
                      :class="{
                        'text-green-600': transaction.type === 'income',
                        'text-red-600': transaction.type === 'expense',
                        'text-blue-600': transaction.type === 'transfer',
                      }"
                    >
                      {{ transaction.type === "expense" ? "-" : "+" }}${{
                        transaction.amount.toLocaleString()
                      }}
                    </span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium text-gray-900">
                        {{ transaction.name }}
                      </p>
                      <p class="text-xs text-gray-500">
                        {{ transaction.created_at }}
                      </p>
                    </div>
                    <span
                      class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800':
                          transaction.type === 'income',
                        'bg-red-100 text-red-800':
                          transaction.type === 'expense',
                        'bg-blue-100 text-blue-800':
                          transaction.type === 'transfer',
                      }"
                    >
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
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Transaction ID
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Keterangan
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Amount
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      class="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
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
                    :class="{
                      'bg-blue-50': selectedTransaction?.id === transaction.id,
                    }"
                  >
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                    >
                      #{{ transaction.marchant_id }}
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ transaction?.guru_bk?.first_name }}
                      {{ transaction?.guru_bk?.last_name }}
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      {{ transaction.description }}
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800':
                            transaction.paymant_type_id === 'KTA',
                          'bg-red-100 text-red-800':
                            transaction.paymant_type_id === 'expense',
                          'bg-blue-100 text-blue-800':
                            transaction.paymant_type_id === 'transfer',
                        }"
                      >
                        {{ transaction?.paymant_type_bks?.name ?? "-" }}
                      </span>
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span
                        :class="{
                          'text-green-600': transaction.type === 'SUCCESS',
                          'text-red-600': transaction.type === 'EXPIRED',
                          'text-blue-600': transaction.type === 'PADING',
                        }"
                      >
                        {{ transaction.status === "SUCCESS" ? "+" : "-" }}${{
                          transaction.amount.toLocaleString()
                        }}
                      </span>
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span
                        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                        :class="{
                          'bg-green-100 text-green-800':
                            transaction.status === 'SUCCESS',
                          'bg-yellow-100 text-yellow-800':
                            transaction.status === 'pending',
                          'bg-red-100 text-red-800':
                            transaction.status === 'failed',
                          'bg-red-100 text-red-800':
                            transaction.status === 'EXPIRED',
                        }"
                      >
                        {{ transaction.status }}
                      </span>
                    </td>
                    <td
                      class="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ transaction.created_at }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div
              v-if="filteredTransactions.length > 0"
              class="bg-white px-4 py-3 border-t border-gray-200"
            >
              <!-- Mobile Pagination -->
              <div class="sm:hidden">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm text-gray-700">
                    {{ paginationInfo.start }}-{{ paginationInfo.end }} of
                    {{ paginationInfo.total }}
                  </p>
                  <select
                    :value="itemsPerPage"
                    @change="changeItemsPerPage(parseInt($event.target.value))"
                    class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option
                      v-for="option in itemsPerPageOptions"
                      :key="option"
                      :value="option"
                    >
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
                    Showing {{ paginationInfo.start }} to
                    {{ paginationInfo.end }} of
                    {{ paginationInfo.total }} results
                  </p>
                  <div class="ml-4 flex items-center">
                    <label class="text-sm text-gray-700 mr-2">Show:</label>
                    <select
                      :value="itemsPerPage"
                      @change="
                        changeItemsPerPage(parseInt($event.target.value))
                      "
                      class="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option
                        v-for="option in itemsPerPageOptions"
                        :key="option"
                        :value="option"
                      >
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
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>

                  <!-- Page Numbers -->
                  <template v-for="page in totalPages" :key="page">
                    <button
                      v-if="
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                      "
                      @click="goToPage(page)"
                      class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                      :class="{
                        'z-10 bg-blue-50 border-blue-500 text-blue-600':
                          page === currentPage,
                        'bg-white border-gray-300 text-gray-500 hover:bg-gray-50':
                          page !== currentPage,
                      }"
                    >
                      {{ page }}
                    </button>
                    <span
                      v-else-if="
                        (page === currentPage - 3 && currentPage > 4) ||
                        (page === currentPage + 3 &&
                          currentPage < totalPages - 3)
                      "
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
                    <svg
                      class="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div
              v-if="
                paginatedTransactions.length === 0 &&
                filteredTransactions.length === 0
              "
              class="text-center py-8 sm:py-12"
            >
              <div class="text-gray-500">
                <svg
                  class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">
                  No transactions found
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria.
                </p>
                <button
                  @click="resetFiltersAndPagination"
                  class="mt-4 text-blue-600 hover:text-blue-500 text-sm font-medium"
                >
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
            mobileView === 'list' ? 'hidden lg:block' : 'block',
          ]"
        >
          <div class="bg-white rounded-lg shadow lg:sticky lg:top-8">
            <div class="p-4 sm:p-6">
              <div class="flex items-center justify-between mb-4 sm:mb-6">
                <h2 class="text-lg sm:text-xl font-semibold text-gray-900">
                  Transaction Details
                </h2>
                <!-- Mobile Back Button -->
                <button
                  @click="mobileView = 'list'"
                  class="lg:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div v-if="selectedTransaction" class="space-y-4 sm:space-y-6">
                <!-- Transaction Header -->
                <div class="text-center pb-4 sm:pb-6 border-b">
                  <div
                    class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center"
                    :class="{
                      'bg-green-100': selectedTransaction.status === 'SUCCESS',
                      'bg-red-100': selectedTransaction.status === 'expired',
                      'bg-blue-100': selectedTransaction.status === 'pending',
                    }"
                  >
                    <svg
                      class="w-6 h-6 sm:w-8 sm:h-8"
                      :class="{
                        'text-green-600':
                          selectedTransaction.status === 'SUCCESS',
                        'text-red-600':
                          selectedTransaction.status === 'expired',
                        'text-blue-600':
                          selectedTransaction.status === 'pending',
                      }"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        v-if="selectedTransaction.status === 'SUCCESS'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                      <path
                        v-else-if="selectedTransaction.status === 'pending'"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 12H4"
                      />
                      <path
                        v-else
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <h3 class="text-base sm:text-lg font-medium text-gray-900">
                    {{ selectedTransaction.name }}
                  </h3>
                  <p
                    class="text-xl sm:text-2xl font-bold mt-2"
                    :class="{
                      'text-green-600':
                        selectedTransaction.status === 'SUCCESS',
                      'text-red-600': selectedTransaction.status === 'expired',
                      'text-blue-600': selectedTransaction.status === 'pending',
                    }"
                  >
                    {{
                      selectedTransaction.status === "pending" ? "-" : "+"
                    }}${{ selectedTransaction.amount.toLocaleString() }}
                  </p>
                </div>

                <!-- Transaction Info -->
                <div class="space-y-3 sm:space-y-4">
                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500"
                      >Transaction ID</span
                    >
                    <span class="text-sm text-gray-900"
                      >#{{ selectedTransaction.marchant_id }}</span
                    >
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500"
                      >Transaction Number</span
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedTransaction.transaction_code
                    }}</span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Type</span>
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800':
                          selectedTransaction.type === 'income',
                        'bg-red-100 text-red-800':
                          selectedTransaction.type === 'expense',
                        'bg-blue-100 text-blue-800':
                          selectedTransaction.type === 'transfer',
                      }"
                    >
                      {{ selectedTransaction?.paymant_type_bks?.name ?? "-" }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500"
                      >Status</span
                    >
                    <span
                      class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-800':
                          selectedTransaction.status === 'SUCCESS',
                        'bg-yellow-100 text-yellow-800':
                          selectedTransaction.status === 'pending',
                        'bg-red-100 text-red-800':
                          selectedTransaction.status === 'failed',
                        'bg-red-100 text-red-800':
                          selectedTransaction.status === 'expired',
                      }"
                    >
                      {{ selectedTransaction.status }}
                    </span>
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500">Date</span>
                    <span class="text-sm text-gray-900">{{
                      selectedTransaction.created_at
                    }}</span>
                  </div>

                  <div class="flex justify-between items-start">
                    <span class="text-sm font-medium text-gray-500"
                      >Description</span
                    >
                    <span
                      class="text-sm text-gray-900 text-right max-w-32 sm:max-w-48"
                      >{{ selectedTransaction.description }}</span
                    >
                  </div>

                  <div class="flex justify-between items-center">
                    <span class="text-sm font-medium text-gray-500"
                      >Reference</span
                    >
                    <span class="text-sm text-gray-900">{{
                      selectedTransaction.reference
                    }}</span>
                  </div>
                </div>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center py-8 sm:py-12">
                <svg
                  class="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">
                  No transaction selected
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Select a transaction from the list to view details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";

// Reactive data
const searchQuery = ref("");
const statusFilter = ref("");
const typeFilter = ref("");
const selectedTransaction = ref(null);
const showAddTransaction = ref(false);

// Mobile responsiveness
const mobileView = ref("list"); // 'list' or 'detail'

// Export functionality
const showExportMenu = ref(false);
const isExporting = ref(false);
const exportDropdown = ref(null);

// Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);
const itemsPerPageOptions = [5, 10, 25, 50, 100];

const transactions = ref([]);

const statuses = ["pending", "expired", "success"];

for (let i = 1; i <= 50; i++) {
  transactions.value.push({
    id: i, // id transaksi, jika kamu simulasikan dari DB, biasanya berupa integer
    guru_bk_id: Math.floor(Math.random() * 10) + 1,
    bank_id: Math.floor(Math.random() * 5) + 1,
    marchant_id: `MRC-${1000 + i}`,
    transaction_code: `TX-${Date.now()}-${i}`,
    paymant_type_id: Math.floor(Math.random() * 3) + 1,
    reference: `REF-${i.toString().padStart(4, "0")}`,
    description: `Transaksi simulasi nomor ${i}`,
    amount: Math.floor(Math.random() * 100000) + 5000,
    fee_admin: 2500,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  });
}

const filteredTransactions = computed(() => {
  return transactions.value.filter((transaction) => {
    const query = searchQuery.value.toLowerCase();

    const matchesSearch =
      transaction.description.toLowerCase().includes(query) ||
      transaction.guru_bk.first_name.toLowerCase().includes(query) ||
      transaction.reference.toLowerCase().includes(query) ||
      transaction.status.toLowerCase().includes(query) ||
      transaction.marchant_id.toLowerCase().includes(query);

    const matchesStatus =
      !statusFilter.value || transaction.status === statusFilter.value;

    return matchesSearch && matchesStatus;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredTransactions.value.length / itemsPerPage.value);
});

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

const paginationInfo = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value + 1;
  const end = Math.min(
    start + itemsPerPage.value - 1,
    filteredTransactions.value.length
  );
  return {
    start,
    end,
    total: filteredTransactions.value.length,
  };
});

// Methods
const selectTransaction = (transaction) => {
  selectedTransaction.value = transaction;
};

const selectTransactionMobile = (transaction) => {
  selectedTransaction.value = transaction;
  mobileView.value = "detail";
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const changeItemsPerPage = (newItemsPerPage) => {
  itemsPerPage.value = newItemsPerPage;
  currentPage.value = 1; // Reset to first page
};

const resetFiltersAndPagination = () => {
  searchQuery.value = "";
  statusFilter.value = "";
  typeFilter.value = "";
  currentPage.value = 1;
};

// Export Methods
const exportToCSV = () => {
  showExportMenu.value = false;

  // Prepare CSV headers
  const headers = [
    "Marchant ID",
    "Transaction Number",
    "Nama Depan",
    "Nama Belakang",
    "Keterangan",
    "Type",
    "Amount",
    "Fee Admin",
    "Status",
    "Date",
  ];

  // Prepare CSV data
  const csvData = filteredTransactions.value.map((transaction) => [
    transaction.marchant_id,
    transaction.transaction_code,
    transaction.guru_bk.first_name,
    transaction.guru_bk.last_name,
    transaction.description,
    transaction?.paymant_type_bks?.name ?? "-",
    transaction.amount,
    transaction.status,
    transaction.created_at,
    `"${transaction.description}"`, // Wrap in quotes to handle commas
    transaction.reference,
  ]);

  // Combine headers and data
  const csvContent = [headers, ...csvData]
    .map((row) => row.join(","))
    .join("\n");

  // Create and download file
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `transactions_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const formatDateForExport = (date) => {
  return (
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(date) + " WIB"
  );
};

// Close export menu when clicking outside
const handleClickOutside = (event) => {
  if (exportDropdown.value && !exportDropdown.value.contains(event.target)) {
    showExportMenu.value = false;
  }
};

const transactionHistory = ref();
const getPaymantHistorys = async () => {
  const token = Cookies.get("token");
  try {
    const respon = await initAPI("get", "paymant/history", null, token);
    transactions.value = respon.data.data;
    console.log("History", transactions.value);
  } catch (error) {
    console.log(error);
  }
};
// Computed properties untuk summary
const totalAmountByStatus = (status) => {
  return filteredTransactions.value
    .filter((t) => t.status === status)
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0); // Pastikan convert ke Number
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(value)
    .replace("Rp", "Rp "); // Format mata uang Indonesia
};

const countByStatus = (status) => {
  return filteredTransactions.value.filter((t) => t.status === status).length;
};

const totalSuccessAmount = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.status === "SUCCESS")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const totalPendingAmount = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.status === "pending")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const totalFailedAmount = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.status === "failed")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const totalExpiredAmount = computed(() => {
  return filteredTransactions.value
    .filter((t) => t.status === "EXPIRED")
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});
// Lifecycle
onMounted(async () => {
  await getPaymantHistorys();
  // Select first transaction from current page by default
  if (paginatedTransactions.value.length > 0) {
    selectedTransaction.value = paginatedTransactions.value[0];
  }

  // Add click outside listener for export menu
  document.addEventListener("click", handleClickOutside);
});

// Add cleanup in onUnmounted
onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
