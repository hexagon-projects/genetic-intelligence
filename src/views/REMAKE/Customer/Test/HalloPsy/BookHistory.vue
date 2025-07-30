<template>
    <Layout>
        <div class="p-4 lg:px-20 lg:py-10 space-y-6 bg-[#F0F7FD] w-full min-h-screen font-sora pb-20">
            <div class="flex justify-between items-center">
                <button @click="$router.go(-1)" class="flex items-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                            clip-rule="evenodd" />
                    </svg>
                    Back
                </button>
                <h1 class="text-xl md:text-2xl font-bold text-center">All Booking History</h1>
                <div class="w-10"></div>
            </div>

            <!-- Filter Section -->
            <div class="bg-white rounded-3xl shadow-lg p-6 space-y-4">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-800 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"></path>
                        </svg>
                        Filter & Search
                    </h2>
                    <button 
                        @click="clearAllFilters"
                        v-if="hasActiveFilters"
                        class="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                        Clear All
                    </button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <!-- Search Input -->
                    <div class="relative">
                        <input
                            v-model="filters.search"
                            type="text"
                            placeholder="Search consultant..."
                            class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                        >
                        <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>

                    <!-- Status Filter -->
                    <div class="relative">
                        <select
                            v-model="filters.status"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <!-- Payment Status Filter -->
                    <div class="relative">
                        <select
                            v-model="filters.paymentStatus"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                        >
                            <option value="">All Payments</option>
                            <option value="paid">Paid</option>
                            <option value="pending">Payment Pending</option>
                            <option value="failed">Payment Failed</option>
                        </select>
                        <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    <!-- Date Range Filter -->
                    <div class="relative">
                        <select
                            v-model="filters.dateRange"
                            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none cursor-pointer"
                        >
                            <option value="">All Time</option>
                            <option value="today">Today</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="3months">Last 3 Months</option>
                        </select>
                        <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                <!-- Active Filters Display -->
                <div v-if="activeFiltersCount > 0" class="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    <span class="text-sm text-gray-600 font-medium">Active filters:</span>
                    <span v-if="filters.search" class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        Search: "{{ filters.search }}"
                        <button @click="filters.search = ''" class="ml-2 hover:text-primary/80">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </span>
                    <span v-if="filters.status" class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        Status: {{ filters.status }}
                        <button @click="filters.status = ''" class="ml-2 hover:text-primary/80">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </span>
                    <span v-if="filters.paymentStatus" class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        Payment: {{ filters.paymentStatus }}
                        <button @click="filters.paymentStatus = ''" class="ml-2 hover:text-primary/80">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </span>
                    <span v-if="filters.dateRange" class="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                        Date: {{ getDateRangeLabel(filters.dateRange) }}
                        <button @click="filters.dateRange = ''" class="ml-2 hover:text-primary/80">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </span>
                </div>

                <!-- Results Count -->
                <div v-if="!isLoading" class="text-sm text-gray-600 pt-2 border-t border-gray-100">
                    Showing {{ filteredBookings.length }} of {{ allBookings.length }} bookings
                </div>
            </div>

            <div v-if="isLoading" class="flex justify-center items-center py-10">
                <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
            <div v-else-if="error" class="text-center py-6 text-red-500">
                {{ error }}
                <button @click="fetchBookingHistory" class="mt-2 px-4 py-2 bg-primary text-white rounded-md">
                    Retry
                </button>
            </div>
            <div v-else-if="filteredBookings.length > 0"
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                <HistoryCard v-for="(item, index) in filteredBookings" :key="item.id" :id="item.id" :image="item.image"
                    :name="item.name" :role="item.role" :date="item.date" :time="item.time" :status="item.status" :consultants_id="item.consultants_id" />
            </div>
            <div v-else-if="allBookings.length > 0" class="text-center py-12 space-y-4">
                <div class="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">No results found</h3>
                    <p class="text-gray-500 mt-1">Try adjusting your filters to see more results</p>
                </div>
                <button @click="clearAllFilters" class="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-200">
                    Clear Filters
                </button>
            </div>
            <div v-else class="text-center py-6 text-gray-500">
                No booking history found
            </div>
        </div>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import { ref, onMounted, computed, watch } from 'vue';
import initAPI from '@/api/api.js';
import Cookies from 'js-cookie';
import Doc from '@/assets/img/doc.png';
import HistoryCard from './components/HistoryCard.vue';

const allBookings = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Filter state
const filters = ref({
    search: '',
    status: '',
    paymentStatus: '',
    dateRange: ''
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        timeZone: 'Asia/Jakarta'
    };
    return date.toLocaleDateString('id-ID', options);
};

const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
        hour12: false
    }) + ' WIB';
};

const filteredBookings = computed(() => {
    let filtered = [...allBookings.value];

    if (filters.value.search) {
        const searchTerm = filters.value.search.toLowerCase();
        filtered = filtered.filter(booking => 
            booking.name?.toLowerCase().includes(searchTerm) ||
            booking.role?.toLowerCase().includes(searchTerm)
        );
    }

    if (filters.value.status) {
        filtered = filtered.filter(booking => booking.status === filters.value.status);
    }

    if (filters.value.paymentStatus) {
        filtered = filtered.filter(booking => booking.payment_status === filters.value.paymentStatus);
    }

    if (filters.value.dateRange) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        
        filtered = filtered.filter(booking => {
            const bookingDate = new Date(booking.originalDate);
            
            switch (filters.value.dateRange) {
                case 'today':
                    return bookingDate >= today && bookingDate < new Date(today.getTime() + 24 * 60 * 60 * 1000);
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return bookingDate >= weekAgo;
                case 'month':
                    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                    return bookingDate >= monthAgo;
                case '3months':
                    const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
                    return bookingDate >= threeMonthsAgo;
                default:
                    return true;
            }
        });
    }

    return filtered;
});

const hasActiveFilters = computed(() => {
    return filters.value.search || filters.value.status || filters.value.paymentStatus || filters.value.dateRange;
});

const activeFiltersCount = computed(() => {
    let count = 0;
    if (filters.value.search) count++;
    if (filters.value.status) count++;
    if (filters.value.paymentStatus) count++;
    if (filters.value.dateRange) count++;
    return count;
});

const getDateRangeLabel = (range) => {
    const labels = {
        'today': 'Today',
        'week': 'This Week',
        'month': 'This Month',
        '3months': 'Last 3 Months'
    };
    return labels[range] || range;
};

const clearAllFilters = () => {
    filters.value = {
        search: '',
        status: '',
        paymentStatus: '',
        dateRange: ''
    };
};

const fetchBookingHistory = async () => {
    try {
        isLoading.value = true;
        error.value = null;
        const token = await Cookies.get('token');
        const response = await initAPI('get', 'user/bookings', null, token);
        
        if (response.data.success) {
            allBookings.value = response.data.data.map(booking => ({
                id: booking.id,
                image: Doc,
                consultants_id: booking.consultants_id,
                name: booking.consultant?.name || 'Consultant',
                role: booking.consultant?.type || 'Consultant',
                date: formatDate(booking.slot?.start_time || booking.created_at),
                time: booking.slot ?
                    `${formatTime(booking.slot.start_time)} - ${formatTime(booking.slot.end_time)}` :
                    '--:-- - --:--',
                status: booking.status,
                payment_status: booking.payment_status,
                originalDate: booking.slot?.start_time || booking.created_at
            }));
        }
    } catch (err) {
        console.error('Error fetching booking history:', err);
        error.value = err.response?.data?.message || err.message || 'Failed to load booking history';
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    fetchBookingHistory();
});
</script>