<script setup>
import Layout from '@/Layout/Admin/Layout.vue';
import { ref } from 'vue';

// Data pengguna sesuai dengan gambar
const users = [
    { id: 1, initials: 'DC', name: 'Dulce Culhane', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'dulce.culhane@kemenag.go.id', phone: '0812-3456-7890' },
    { id: 2, initials: 'LM', name: 'Livia Mango', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'livia.mango@kemenag.go.id', phone: '0812-3456-7891' },
    { id: 3, initials: 'LD', name: 'Livia Dias', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'livia.dias@kemenag.go.id', phone: '0812-3456-7892' },
    { id: 4, initials: 'RK', name: 'Roy Krajcik', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'roy.krajcik@kemenag.go.id', phone: '0812-3456-7893' },
    { id: 5, initials: 'LN', name: 'Linda Nicolas', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'linda.nicolas@kemenag.go.id', phone: '0812-3456-7894' },
    { id: 6, initials: 'KT', name: 'Krista Turcotte', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'krista.turcotte@kemenag.go.id', phone: '0812-3456-7895' },
    { id: 7, initials: 'AB', name: 'Andrew Bosco', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'andrew.bosco@kemenag.go.id', phone: '0812-3456-7896' },
    { id: 8, initials: 'TK', name: 'Terence Kihn', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'terence.kihn@kemenag.go.id', phone: '0812-3456-7897' },
    { id: 9, initials: 'C', name: 'Courtney', instance: 'Kementrian Agama', division: 'Staff', test: '15.08.2025 21:01', email: 'courtney@kemenag.go.id', phone: '0812-3456-7898' }
];

// Modal state
const showDetailModal = ref(false);
const selectedUser = ref(null);

// Functions
const openDetailModal = (user) => {
    selectedUser.value = user;
    showDetailModal.value = true;
};

const closeDetailModal = () => {
    showDetailModal.value = false;
    selectedUser.value = null;
};
</script>

<template>
    <Layout>
        <div class="p-4 space-y-4 md:space-y-6">
            <!-- Header Section -->
            <div class="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div class="flex gap-3 items-center">
                    <div class="w-2 h-8 rounded-sm bg-primary"></div>
                    <h1 class="text-xl font-semibold text-gray-900">Data Pengguna</h1>
                </div>

                <div class="py-3 px-6 rounded-3xl bg-primary cursor-pointer flex items-center gap-3 hover:bg-primary/90 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_3571_1286)">
                            <mask id="mask0_3571_1286" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0"
                                y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_3571_1286)">
                                <path opacity="0.4"
                                    d="M20.5 10.19H17.61C15.24 10.19 13.31 8.26 13.31 5.89V3C13.31 2.45 12.86 2 12.31 2H8.07C4.99 2 2.5 4 2.5 7.57V16.43C2.5 20 4.99 22 8.07 22H15.93C19.01 22 21.5 20 21.5 16.43V11.19C21.5 10.64 21.05 10.19 20.5 10.19Z"
                                    fill="white" />
                                <path
                                    d="M15.8002 2.21048C15.3902 1.80048 14.6802 2.08048 14.6802 2.65048V6.14048C14.6802 7.60048 15.9202 8.81048 17.4302 8.81048C18.3802 8.82048 19.7002 8.82048 20.8302 8.82048C21.4002 8.82048 21.7002 8.15048 21.3002 7.75048C19.8602 6.30048 17.2802 3.69048 15.8002 2.21048Z"
                                    fill="white" />
                                <path
                                    d="M12.2799 14.72C11.9899 14.43 11.5099 14.43 11.2199 14.72L10.4999 15.44V11.25C10.4999 10.84 10.1599 10.5 9.74994 10.5C9.33994 10.5 8.99994 10.84 8.99994 11.25V15.44L8.27994 14.72C7.98994 14.43 7.50994 14.43 7.21994 14.72C6.92994 15.01 6.92994 15.49 7.21994 15.78L9.21994 17.78C9.22994 17.79 9.23994 17.79 9.23994 17.8C9.29994 17.86 9.37994 17.91 9.45994 17.95C9.55994 17.98 9.64994 18 9.74994 18C9.84994 18 9.93994 17.98 10.0299 17.94C10.1199 17.9 10.1999 17.85 10.2799 17.78L12.2799 15.78C12.5699 15.49 12.5699 15.01 12.2799 14.72Z"
                                    fill="white" />
                            </g>
                        </g>
                        <defs>
                            <clipPath id="clip0_3571_1286">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <p class="text-sm font-medium text-white">Export CSV</p>
                </div>
            </div>

            <!-- Table Section -->
            <section class="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <!-- Mobile responsive wrapper -->
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[800px]">
                        <!-- Table Header -->
                        <thead class="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600 w-12">
                                    <!-- Checkbox column -->
                                </th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Nama
                                    <svg class="inline-block ml-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                </th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">Instansi</th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">Divisi</th>
                                <th class="text-left px-6 py-4 text-sm font-medium text-gray-600">
                                    Test
                                    <svg class="inline-block ml-2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path>
                                    </svg>
                                </th>
                                <th class="text-center px-6 py-4 text-sm font-medium text-gray-600">Aksi</th>
                            </tr>
                        </thead>

                        <!-- Table Body -->
                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="user in users" :key="user.id" 
                                class="hover:bg-gray-50/30 transition-colors">
                                <!-- Checkbox -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center">
                                        <input type="checkbox" 
                                               class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2">
                                    </div>
                                </td>
                                
                                <!-- Name with Avatar -->
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span class="text-sm font-semibold text-blue-600">{{ user.initials }}</span>
                                        </div>
                                        <span class="text-sm font-medium text-gray-900">{{ user.name }}</span>
                                    </div>
                                </td>
                                
                                <!-- Instance -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.instance }}</span>
                                </td>
                                
                                <!-- Division -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.division }}</span>
                                </td>
                                
                                <!-- Test Date -->
                                <td class="px-6 py-4">
                                    <span class="text-sm text-gray-700">{{ user.test }}</span>
                                </td>
                                
                                <!-- Action -->
                                <td class="px-6 py-4 text-center">
                                    <button @click="openDetailModal(user)" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                                        Details
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div class="px-6 py-4 bg-gray-50/30 border-t border-gray-100">
                    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div class="flex items-center gap-2">
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                «
                            </button>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                ‹
                            </button>
                            <button class="px-3 py-2 bg-blue-600 text-white text-sm rounded-md font-medium">
                                1
                            </button>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                2
                            </button>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                3
                            </button>
                            <span class="px-2 text-sm text-gray-500">...</span>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                                10
                            </button>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                ›
                            </button>
                            <button class="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors">
                                »
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Detail Modal -->
            <div v-if="showDetailModal" class="fixed inset-0 z-50 overflow-y-auto" @click="closeDetailModal">
                <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 transition-opacity">
                        <div class="absolute inset-0 bg-gray-900 opacity-75"></div>
                    </div>

                    <!-- Modal content -->
                    <div @click.stop class="inline-block w-full max-w-md mx-auto my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <!-- Modal Header -->
                        <div class="px-6 py-4 border-b border-gray-100">
                            <div class="flex items-center justify-between">
                                <div class="flex gap-3 items-center">
                                    <div class="w-2 h-6 rounded-sm bg-primary"></div>
                                    <h3 class="text-lg font-semibold text-gray-900">Detail Pengguna</h3>
                                </div>
                                <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Modal Body -->
                        <div class="px-6 py-6 space-y-6" v-if="selectedUser">
                            <!-- User Avatar & Name -->
                            <div class="flex items-center gap-4">
                                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                    <span class="text-xl font-bold text-blue-600">{{ selectedUser.initials }}</span>
                                </div>
                                <div>
                                    <h4 class="text-lg font-semibold text-gray-900">{{ selectedUser.name }}</h4>
                                    <p class="text-sm text-gray-500">{{ selectedUser.division }}</p>
                                </div>
                            </div>

                            <!-- User Details -->
                            <div class="space-y-4">
                                <div class="grid grid-cols-1 gap-4">
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <label class="block text-sm font-medium text-gray-600 mb-1">Instansi</label>
                                        <p class="text-sm text-gray-900">{{ selectedUser.instance }}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <label class="block text-sm font-medium text-gray-600 mb-1">Divisi</label>
                                        <p class="text-sm text-gray-900">{{ selectedUser.division }}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
                                        <p class="text-sm text-gray-900">{{ selectedUser.email }}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <label class="block text-sm font-medium text-gray-600 mb-1">No. Telepon</label>
                                        <p class="text-sm text-gray-900">{{ selectedUser.phone }}</p>
                                    </div>
                                    
                                    <div class="bg-gray-50 p-4 rounded-lg">
                                        <label class="block text-sm font-medium text-gray-600 mb-1">Waktu Test</label>
                                        <p class="text-sm text-gray-900">{{ selectedUser.test }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Modal Footer -->
                        <div class="px-6 py-4 bg-gray-50/50 border-t border-gray-100">
                            <div class="flex justify-end gap-3">
                                <button @click="closeDetailModal" class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1 transition-colors">
                                    Tutup
                                </button>
                                <button class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors">
                                    Buat Laporan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
input[type="checkbox"]:checked {
    background-color: #10b981;
    border-color: #10b981;
}

.transition-colors {
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
}
</style>