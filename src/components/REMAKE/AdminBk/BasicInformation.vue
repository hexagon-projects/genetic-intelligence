<template>
  <div class="w-full">
    <div class="w-full mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header Profile (Hero Section) -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden mb-6 sm:mb-8">
        <div
          class="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-6 sm:py-8"
        >
          <div class="flex flex-col sm:flex-row items-center">
            <!-- Profile Picture -->
            <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
              <div
                class="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-white flex items-center justify-center shadow-lg"
              >
                <span class="text-2xl sm:text-3xl font-bold text-blue-600">{{
                  getInitials(
                    userData?.basic?.first_name,
                    userData?.basic?.last_name
                  )
                }}</span>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="text-center sm:text-left">
              <h1 class="text-2xl sm:text-3xl font-bold text-white">
                {{ userData?.basic?.first_name }}
                {{ userData?.basic?.last_name }}
              </h1>
              <p class="text-blue-100 text-base sm:text-lg mt-1">
                Guru Bimbingan Konseling
              </p>
              <div
                class="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mt-3"
              >
                <span
                  class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-blue-100 text-blue-800"
                >
                  <svg
                    class="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {{ getStatusText(userData?.licence?.status) }}
                </span>
                <span
                  class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-white text-blue-800"
                >
                  ID: {{ userId }}
                </span>
                <span
                  v-if="userData"
                  class="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800"
                >
                  No. Anggota: {{ userData?.licence?.unix_number || "-" }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        <!-- Left Column - Tabbed Content -->
        <div class="xl:col-span-2">
          <!-- Tabs Navigation -->
          <div class="bg-white rounded-t-lg shadow-lg overflow-hidden">
            <div class="border-b border-gray-200">
              <!-- Mobile Tab Navigation (Dropdown) -->
              <div class="sm:hidden px-4 py-3">
                <select
                  v-model="activeTab"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option v-for="tab in tabs" :key="tab.id" :value="tab.id">
                    {{ tab.name }}
                  </option>
                </select>
              </div>

              <!-- Desktop Tab Navigation -->
              <nav
                class="hidden sm:flex overflow-x-auto px-4 sm:px-6"
                aria-label="Tabs"
              >
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  :class="[
                    'py-3 sm:py-4 px-2 sm:px-4 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                  ]"
                >
                  <div class="flex items-center">
                    <component
                      :is="getTabIcon(tab.id)"
                      class="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2"
                    />
                    {{ tab.name }}
                  </div>
                </button>
              </nav>
            </div>

            <!-- Tab Content -->
            <div class="p-4 sm:p-6">
              <!-- Personal Information Tab -->
              <div
                v-if="activeTab === 'personal'"
                class="space-y-4 sm:space-y-6"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Nama Depan</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.basic?.first_name || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Nama Belakang</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.basic?.last_name || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Tanggal Lahir</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ formatDate(userData?.basic?.birth_date) || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Jenis Kelamin</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.basic?.gender || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >NIK</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.basic?.nik || "-" }}
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Nomor Anggota</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.licence?.unix_number || "-" }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Address Information Tab -->
              <div
                v-if="activeTab === 'address'"
                class="space-y-4 sm:space-y-6"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Alamat Lengkap</label
                    >
                    <p
                      class="text-gray-900 bg-gray-50 px-3 py-2 rounded-md text-sm sm:text-base"
                    >
                      {{ userData?.basic?.address || "-" }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Contact Information Tab -->
              <div
                v-if="activeTab === 'contact'"
                class="space-y-4 sm:space-y-6"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Email</label
                    >
                    <div
                      class="flex items-center bg-gray-50 px-3 py-2 rounded-md"
                    >
                      <svg
                        class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <p class="text-gray-900 text-sm sm:text-base truncate">
                        {{ userData?.user?.email || "-" }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Telepon</label
                    >
                    <div
                      class="flex items-center bg-gray-50 px-3 py-2 rounded-md"
                    >
                      <svg
                        class="w-4 h-4 text-gray-400 mr-2 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <p class="text-gray-900 text-sm sm:text-base">
                        {{ userData?.basic?.phone || "-" }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Organization History Tab -->
              <div v-if="activeTab === 'organization'">
                <div v-if="userData?.organisasis?.length > 0" class="space-y-2">
                  <div
                    v-for="org in userData.organisasis"
                    :key="org.id"
                    class="flex flex-col sm:flex-row sm:items-center sm:justify-between border border-gray-200 bg-white rounded-xl px-4 py-3 hover:shadow-sm transition-all"
                  >
                    <div>
                      <h3
                        class="text-sm sm:text-base font-semibold text-gray-800"
                      >
                        {{ org.nama_organisasi }}
                      </h3>
                      <p class="text-xs sm:text-sm text-blue-600 font-medium">
                        Posisi Di Organisasi : {{ org.jabatan }}
                      </p>
                    </div>
                    <span
                      :class="[
                        'mt-2 sm:mt-0 px-2 py-0.5 text-xs font-medium rounded-full',
                        org.status
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600',
                      ]"
                    >
                      {{ org.status ? "Aktif" : "Tidak Aktif" }}
                    </span>
                  </div>
                </div>

                <div v-else class="text-center py-8 text-gray-500">
                  <svg
                    class="w-10 h-10 mx-auto mb-2 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <p class="text-sm">Belum ada histori organisasi</p>
                </div>
              </div>

              <!-- Work Placement Tab -->
              <div v-if="activeTab === 'placement'">
                <div
                  v-if="userData?.placments?.length > 0"
                  class="space-y-3 sm:space-y-4"
                >
                  <div
                    v-for="placement in userData?.placments"
                    :key="placement.id"
                    class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                    >
                      <h3
                        class="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-0"
                      >
                        {{ placement.institution.name }}
                      </h3>
                      <span
                        :class="[
                          'px-2 py-1 text-xs font-medium rounded-full self-start',
                          placement.status
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800',
                        ]"
                      >
                        {{ placement.status ? "Aktif" : "Tidak Aktif" }}
                      </span>
                    </div>
                    <p
                      class="text-blue-600 font-medium mb-2 text-sm sm:text-base"
                    >
                      {{ placement.position || "Guru BK" }}
                    </p>
                    <div
                      class="space-y-1 text-xs sm:text-sm text-gray-600 flex gap-5 items-center"
                    >
                      <p class="flex items-start bg-gray-50 p-3 rounded-sm font-semibold">
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 mr-2 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {{ placement.institution.region }}
                      </p>
                      <p class="flex items-center bg-gray-50 p-3 rounded-sm font-semibold">
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 mr-2 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ formatDate(placement.verifikasi) }} (Verifikasi)
                      </p>
                      <p class="flex items-center bg-gray-50 p-3 rounded-sm font-semibold">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          class="bi bi-file-earmark-pdf w-3"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z"
                          />
                          <path
                            d="M4.603 14.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.188-.012.396-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.066.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.7 11.7 0 0 0-1.997.406 11.3 11.3 0 0 1-1.02 1.51c-.292.35-.609.656-.927.787a.8.8 0 0 1-.58.029m1.379-1.901q-.25.115-.459.238c-.328.194-.541.383-.647.547-.094.145-.096.25-.04.361q.016.032.026.044l.035-.012c.137-.056.355-.235.635-.572a8 8 0 0 0 .45-.606m1.64-1.33a13 13 0 0 1 1.01-.193 12 12 0 0 1-.51-.858 21 21 0 0 1-.5 1.05zm2.446.45q.226.245.435.41c.24.19.407.253.498.256a.1.1 0 0 0 .07-.015.3.3 0 0 0 .094-.125.44.44 0 0 0 .059-.2.1.1 0 0 0-.026-.063c-.052-.062-.2-.152-.518-.209a4 4 0 0 0-.612-.053zM8.078 7.8a7 7 0 0 0 .2-.828q.046-.282.038-.465a.6.6 0 0 0-.032-.198.5.5 0 0 0-.145.04c-.087.035-.158.106-.196.283-.04.192-.03.469.046.822q.036.167.09.346z"
                          />
                        </svg>
                        <a
                          :href="`${baseURL}/storage/${placement.file}`"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="text-blue-500 underline text-sm"
                        >
                          Lihat Dokument
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <svg
                    class="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <p class="text-gray-500 text-sm sm:text-base">
                    Belum ada penempatan kerja
                  </p>
                </div>
              </div>

              <!-- Transaction History Tab -->
              <div v-if="activeTab === 'transaction'">
                <div
                  v-if="userData?.paymants.length > 0"
                  class="space-y-3 sm:space-y-4"
                >
                  <div
                    v-for="transaction in userData?.paymants"
                    :key="transaction.id"
                    class="border border-gray-200 rounded-lg p-3 sm:p-4 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <div
                      class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2"
                    >
                      <div class="flex-1">
                        <h3
                          class="text-base sm:text-lg font-semibold text-gray-900"
                        >
                          {{ transaction.description }}
                        </h3>
                        <p class="text-xs sm:text-sm text-gray-500 mt-1">
                          {{ transaction.marchant_id }} | {{ transaction.transaction_code }}
                        </p>
                      </div>
                      <div
                        class="flex flex-col items-start sm:items-end mt-2 sm:mt-0"
                      >
                        <span
                          :class="[
                            'px-2 py-1 text-xs font-medium rounded-full mb-1',
                            getTransactionStatusClass(transaction.status),
                          ]"
                        >
                          {{ getTransactionStatusText(transaction.status) }}
                        </span>
                        <span
                          :class="[
                            'text-base sm:text-lg font-bold',
                            transaction.status === 'SUCCESS'
                              ? 'text-green-600'
                              : 'text-red-600',
                          ]"
                        >
                          {{ transaction.status === "SUCCESS" ? "+" : "" }}Rp
                          {{ formatCurrency(transaction.amount) }}
                        </span>
                      </div>
                    </div>
                    <div
                      class="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 mt-2"
                    >
                      <span class="flex items-center">
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {{ formatDate(transaction.created_at) }}
                      </span>
                      <span class="flex items-center">
                        <svg
                          class="w-3 h-3 sm:w-4 sm:h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                        Fee Admin Rp.{{ formatCurrency(transaction.fee_admin) }}
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-8">
                  <svg
                    class="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  <p class="text-gray-500 text-sm sm:text-base">
                    Belum ada riwayat transaksi
                  </p>
                </div>
              </div>

              <!-- Membership Verification Tab -->
              <div v-if="activeTab === 'verification'">
                <div class="space-y-4 sm:space-y-6">
                  <!-- Current Status -->
                  <div class="bg-gray-50 rounded-lg p-4">
                    <h3 class="text-lg font-semibold text-gray-900 mb-3">
                      Status Verifikasi Keanggotaan
                    </h3>
                    <div
                      class="flex flex-col sm:flex-row sm:items-center gap-3"
                    >
                      <span
                        :class="[
                          'inline-flex px-3 py-2 text-sm font-semibold rounded-full',
                          getMembershipStatusClass(
                            userData?.licence?.status
                          ),
                        ]"
                      >
                        {{
                          getMembershipStatusText(userData?.licence?.status)
                        }}
                      </span>
                      <span
                        v-if="userData?.licence?.unix_number"
                        class="text-sm text-gray-600"
                      >
                        Nomor Anggota:
                        <span class="font-medium">{{
                          userData?.licence?.unix_number
                        }}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Verification Form (Admin Only) -->
                  <div
                    v-if="
                      isAdmin && userData?.licence?.status === 'not verified'
                    "
                    class="border border-gray-200 rounded-lg p-4"
                  >
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">
                      Verifikasi Keanggotaan
                    </h4>

                    <!-- Member Number Input -->
                    <div class="mb-4">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Nomor Anggota</label
                      >
                      <input
                        :value="userData?.licence?.unix_number"
                        type="text"
                        placeholder="Masukkan nomor anggota"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        readonly
                      />
                    </div>

                    <!-- Verification Notes -->
                    <div class="mb-4">
                      <label
                        class="block text-sm font-medium text-gray-700 mb-2"
                        >Catatan Verifikasi</label
                      >
                      <textarea
                        v-model="verificationForm.notes"
                        rows="3"
                        placeholder="Tambahkan catatan verifikasi (opsional)"
                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex flex-col sm:flex-row gap-3">
                      <button
                        @click="approveMembership"
                        class="bg-biru hover:bg-biru/80 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          v-if="isProcessing"
                          class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <svg
                          v-else
                          class="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {{
                          isProcessing ? "Memproses..." : "Setujui Keanggotaan"
                        }}
                      </button>

                      <button
                        @click="rejectMembership"
                        :disabled="isProcessing"
                        class="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        Tolak Keanggotaan
                      </button>
                    </div>
                  </div>

                  <!-- Documents Section -->
                  <div class="border border-gray-200 rounded-lg p-4">
                    <h4 class="text-lg font-semibold text-gray-900 mb-4">
                      Dokumen Pendukung
                    </h4>

                    <div
                      v-if="userData?.placments?.length > 0"
                      class="grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div
                        v-for="doc in userData?.placments"
                        :key="doc.id"
                        class="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <div class="flex items-start">
                          <svg
                            class="w-8 h-8 text-blue-600 mr-3 flex-shrink-0"
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
                          <div class="flex-1">
                            <h5 class="text-sm font-medium text-gray-900">
                              SK Guru Bk {{ doc.institution.name }}
                            </h5>
                            <p class="text-xs text-gray-500 mt-1">
                              Home Base : {{ doc.home_base }}
                            </p>
                            <p class="text-xs text-gray-500">
                              {{ formatDate(doc.created_at) }}
                            </p>
                          </div>
                        </div>
                        <div class="mt-2 flex gap-2">
                          <a
                            :href="`${baseURL}/storage/${doc.file}`"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors duration-150"
                          >
                            Lihat Dokument
                          </a>
                        </div>
                      </div>
                    </div>

                    <div v-else class="text-center py-4">
                      <svg
                        class="w-12 h-12 text-gray-400 mx-auto mb-2"
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
                      <p class="text-gray-500 text-sm">
                        Belum ada dokumen yang diunggah
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - License Information & Stats -->
        <div class="space-y-6 lg:space-y-8">
          <!-- License Information -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              class="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200"
            >
              <h2
                class="text-lg sm:text-xl font-semibold text-gray-900 flex items-center"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
                Informasi Lisensi
              </h2>
            </div>
            <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div>
                <p class="text-sm text-gray-500 mb-1">Status Verifikasi</p>
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(userData?.licence?.status),
                  ]"
                >
                  {{ getStatusText(userData?.licence?.status) }}
                </span>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Tanggal Mulai</p>
                <p class="text-gray-900 text-sm sm:text-base">
                  {{ formatDate(userData?.licence?.start_date) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 mb-1">Tanggal Berakhir</p>
                <p class="text-gray-900 text-sm sm:text-base">
                  {{ formatDate(userData?.licence?.end_date) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              class="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200"
            >
              <h2
                class="text-lg sm:text-xl font-semibold text-gray-900 flex items-center"
              >
                <svg
                  class="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Statistik
              </h2>
            </div>
            <div class="p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Organisasi</span>
                <span class="text-lg font-semibold text-blue-600">{{
                  userData?.organisasis?.length
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Penempatan</span>
                <span class="text-lg font-semibold text-blue-600">{{
                  userData?.placments?.length
                }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Status Keanggotaan</span>
                <span
                  :class="[
                    'text-sm font-semibold',
                    userData?.licence?.status === 'verified'
                      ? 'text-green-600'
                      : userData?.licence?.status === 'not verified'
                      ? 'text-red-600'
                      : 'text-yellow-600',
                  ]"
                >
                  {{ getMembershipStatusText(userData?.licence?.status) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
import initAPI from "@/api/api";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const baseURL =
  import.meta.env.VITE_API_BASE_URL_STORAGE || "http://127.0.0.1:8000";

const props = defineProps({
  userId: {
    type: String,
  },
});

// Reactive data
const activeTab = ref("personal");
const isAdmin = ref(true); // Set based on user role
const isProcessing = ref(false);

// Tabs configuration
const tabs = ref([
  { id: "personal", name: "Personal" },
  { id: "address", name: "Alamat" },
  { id: "contact", name: "Kontak" },
  { id: "organization", name: "Organisasi" },
  { id: "placement", name: "Penempatan" },
  { id: "transaction", name: "Transaksi" },
  { id: "verification", name: "Verifikasi" },
]);

// Verification form
const verificationForm = ref({
  member_number: "",
  notes: "",
});


// Methods
const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ""}${
    lastName?.charAt(0) || ""
  }`.toUpperCase();
};

const getTabIcon = (tabId) => {
  return "svg";
};

const getStatusClass = (status) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800";
    case "not verified":
      return "bg-yellow-100 text-yellow-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status) => {
  switch (status) {
    case "verified":
      return "Terverifikasi";
    case "not verified":
      return "Menunggu Verifikasi";
    case "rejected":
      return "Ditolak";
    default:
      return status || "-";
  }
};

const getMembershipStatusClass = (status) => {
  switch (status) {
    case "verified":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    case "not verified":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getMembershipStatusText = (status) => {
  switch (status) {
    case "approved":
      return "Disetujui";
    case "rejected":
      return "Ditolak";
    case "pending":
      return "Menunggu Verifikasi";
    default:
      return status || "-";
  }
};

const getTransactionStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "failed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getTransactionStatusText = (status) => {
  switch (status) {
    case "completed":
      return "Selesai";
    case "pending":
      return "Menunggu";
    case "failed":
      return "Gagal";
    default:
      return status || "-";
  }
};

const formatDate = (dateString) => {
  if (!dateString || dateString === "-") return "-";

  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("id-ID", options);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID").format(amount);
};

const approveMembership = async () => {
  const token = Cookies.get("token");

  const confirmation = await Swal.fire({
    title: 'Verifikasi Anggota?',
    text: 'Apakah kamu yakin ingin memverifikasi anggota ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, verifikasi!',
    cancelButtonText: 'Batal'
  });

  if (confirmation.isConfirmed) {
    try {
      const formData = new FormData();
      formData.append("status", "verified");

      const respon = await initAPI(
        "post",
        `anggota/status/${props.userId}`,
        formData,
        token
      );

      await getUser();

      // Jika sukses
      await Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Anggota berhasil diverifikasi.',
        timer: 2000,
        showConfirmButton: false,
      });

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat memverifikasi anggota.',
      });
    }
  }
};

const rejectMembership = async () => {
  const token = Cookies.get("token");

  const confirmation = await Swal.fire({
    title: 'Tolak Anggota?',
    text: 'Apakah kamu yakin ingin menolak keanggotaan ini? Data akan dihapus permanen.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Ya, tolak!',
    cancelButtonText: 'Batal'
  });

  if (confirmation.isConfirmed) {
    try {
      const formData = new FormData();
      formData.append("status", "rejected");

      const respon = await initAPI(
        "post",
        `anggota/status/${props.userId}`,
        formData,
        token
      );

      await Swal.fire({
        icon: 'success',
        title: 'Ditolak!',
        text: 'Keanggotaan berhasil ditolak dan data telah dihapus.',
        timer: 2000,
        showConfirmButton: false,
      });

      await getUser();

    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menolak keanggotaan.',
      });
    }
  }
};

const isLoading = ref(false);
const userData = ref(null);

const getUser = async () => {
  isLoading.value = true;
  try {
    const response = await initAPI(
      "get",
      `anggota/${props.userId}`,
      null,
      token
    );
    userData.value = response.data;
    console.log("User Data:", userData.value);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Gagal",
      text: "Tidak dapat mengambil data user",
    });
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getUser();
});
</script>
