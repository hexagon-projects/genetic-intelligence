<template>
    <section class="bg-gray-100 pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Users
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.customers'}" class="text-base text-dark hover:text-dark/70">
                    Customer
                </RouterLink>
            </ol>
        </div>

            <div v-if="isModalOpen && detailCustomers" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
            >
                <div class="hidden lg:block relative w-3/4 top-4 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
                    <hr class="mt-4">
                    <div class="flex flex-row">
                        <img v-if="detailCustomers.image !== null" class="w-[400px] h-[400px] p-4" :src="baseUrl+'open/customers/'+detailCustomers.image" alt="">
                        <img v-if="detailCustomers.image == null" class="w-1/2 h-3/4 p-4" src="https://placehold.co/400x400" alt="">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-col gap-1 h-[400px] overflow-y-scroll">
                                <div class="w-full">
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.name }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.number }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Email
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.user.email }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Tempat Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.birth_place }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Tanggal Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.birth_date }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.gender }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Golongan Darah
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.blood_group }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Agama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.religion }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Status
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.status }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Suku
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.ethnic != null ? detailCustomers.ethnic : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Kebangsaan
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.nationality != null ? detailCustomers.nationality : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Anak ke
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.child_number != null ? detailCustomers.child_number : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Dari jumlah saudara
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.from_child_number != null ? detailCustomers.from_child_number : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.address }}
                                                </p>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.region }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Status Pelajar
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.is_student == 1 ? 'Pelajar' : 'Non Pelajar' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 class="font-myFont font-medium text-dark text-lg">
                                                    Status Daftar
                                                </h1>
                                                <p v-if="detailCustomers.is_payment_gim == 'Belum Bayar'" class="font-myFont font-medium text-light text-sm bg-dark rounded-md -py-1 px-1 w-fit">
                                                    {{ detailCustomers.is_payment_gim }}
                                                </p>
                                                <p v-if="detailCustomers.is_payment_gim == 'Sudah Bayar'" class="font-myFont font-medium text-light text-sm bg-success rounded-md -py-1 px-1 w-fit">
                                                    {{ detailCustomers.is_payment_gim }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="detailCustomers.is_student == 1" class="w-full border-t border-b border-l-neutral-500 pt-3">
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col">
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type !== 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Nama Sekolah</h1>
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type == 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Nama Perguruan Tinggi</h1>
                                                <p v-if="detailCustomers.institutions" class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.institutions.name }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type !== 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Jurusan</h1>
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type == 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Program Didik</h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.majoring !== null ? detailCustomers.majoring : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-1/2">
                                            <div class="flex flex-col">
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type !== 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Kelas</h1>
                                                <h1 v-if="detailCustomers.institutions && detailCustomers.institutions.type == 'Perguruan Tinggi'" class="font-myFont font-medium text-dark text-lg">Semester</h1>
                                                <p class="font-myFont font-medium text-dark text-sm">
                                                    {{ detailCustomers.grade !== null ? detailCustomers.grade : '-' }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="flex flex-row gap-5 px-4">
                        <div class="flex flex-row w-full justify-between items-center shadow-md mb-5 p-3 rounded-md">
                            <div class="flex flex-col">
                                <h1 class="font-myFont font-medium text-dark text-xs">Test GIM</h1>
                                <h1 class="font-myFont font-medium text-lg" :class="{'text-danger': detailCustomers.is_detected == 'Belum', 'text-success' : detailCustomers.is_detected == 'Selesai Terdeteksi', 'text-info' : detailCustomers.is_detected !== 'Selesai Terdeteksi' && detailCustomers.is_detected !== 'Belum'}">{{ detailCustomers.is_detected }}</h1>
                            </div>
                            <div class="flex items-center px-1 h-8 rounded-sm" :class="{'text-danger': detailCustomers.is_detected == 'Belum', 'text-success' : detailCustomers.is_detected == 'Selesai Terdeteksi', 'text-info' : detailCustomers.is_detected !== 'Selesai Terdeteksi' && detailCustomers.is_detected !== 'Belum'}">
                                <PhXCircle v-if="detailCustomers.is_detected == 'Belum'" :size="26" weight="bold"/>
                                <PhCheckFat v-if="detailCustomers.is_detected == 'Selesai Terdeteksi'" :size="26" weight="bold"/>
                                <PhCheckFat v-if="detailCustomers.is_detected !== 'Belum' && detailCustomers.is_detected !== 'Selesai Terdeteksi'" :size="26" weight="bold"/>
                            </div>
                        </div>
                        <div class="flex flex-row w-full justify-between items-center shadow-md mb-5 p-3 rounded-md">
                            <div class="flex flex-col">
                                <h1 class="font-myFont font-medium text-dark text-xs">Test Assessment</h1>
                                <h1 class="font-myFont font-medium text-lg" :class="{'text-success' : detailCustomers.customer_assessment !== null, 'text-danger' : detailCustomers.customer_assessment == null}">{{ detailCustomers.customer_assessment !== null ? 'Sudah Dilakukan' : 'Belum Dilakukan' }}</h1>
                            </div>
                            <div class="flex items-center px-1 h-8 rounded-sm" :class="{'text-success' : detailCustomers.customer_assessment !== null, 'text-danger' : detailCustomers.customer_assessment == null}">
                                <PhCheckFat v-if="detailCustomers.customer_assessment !== null" :size="26" weight="bold"/>
                                <PhXCircle v-if="detailCustomers.customer_assessment == null" :size="26" weight="bold"/>
                            </div>
                        </div>
                        <div class="flex flex-row w-full justify-between items-center shadow-md mb-5 p-3 rounded-md">
                            <div class="flex flex-col">
                                <h1 class="font-myFont font-medium text-dark text-xs">Test Iq</h1>
                                <h1 class="font-myFont font-medium text-lg" :class="{'text-success' : detailCustomers.customer_iq !== null, 'text-danger' : detailCustomers.customer_iq == null}">{{ detailCustomers.customer_iq !== null ? 'Sudah Dilakukan' : 'Belum Dilakukan' }}</h1>    
                            </div>
                            <div class="flex items-center px-1 h-8 rounded-sm" :class="{'text-success' : detailCustomers.customer_iq !== null, 'text-danger' : detailCustomers.customer_iq == null}">
                                <PhCheckFat v-if="detailCustomers.customer_iq !== null" :size="26" weight="bold"/>
                                <PhXCircle v-if="detailCustomers.customer_iq == null" :size="26" weight="bold"/>
                            </div>
                        </div>
                        <div class="flex flex-row w-full justify-between items-center shadow-md mb-5 p-3 rounded-md">
                            <div class="flex flex-col">
                                <h1 class="font-myFont font-medium text-dark text-xs">Konsultasi lebih lanjut</h1>
                                <h1 class="font-myFont font-medium text-lg" :class="{'text-success' : detailCustomers.is_advance == 'Ya', 'text-danger' : detailCustomers.is_advance == 'Tidak'}">{{ detailCustomers.is_advance }}</h1>    
                            </div>
                            <div class="flex items-center px-1 h-8 rounded-sm" :class="{'text-success' : detailCustomers.is_advance == 'Ya', 'text-danger' : detailCustomers.is_advance == 'Tidak'}">
                                <PhCheckFat v-if="detailCustomers.is_advance !== null" :size="26" weight="bold"/>
                                <PhXCircle v-if="detailCustomers.is_advance == null" :size="26" weight="bold"/>
                            </div>
                        </div>
                    </div>

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>

                <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
                    <!-- Modal body -->
                    <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Detail Customers</h1>
                    <hr class="mt-4">
                    <div class="flex flex-col justify-center items-center overflow-x-scroll">
                        <img v-if="detailCustomers.image !== null" class="w-[180px] h-[180px] p-4" :src="baseUrl+'open/customers/'+detailCustomers.image" alt="">
                        <img v-if="detailCustomers.image == null" class="w-[180px] h-[180px] p-4" src="https://placehold.co/400x400" alt="">
                        <div v-if="detailCustomers" class="w-full p-4">
                            <div class="flex flex-row gap-2">
                                <div class="w-full">
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Nama
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.name }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Jenis Kelamin
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.gender }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    No Telp
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.number }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Email
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.user.email }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center mb-4">
                                        <div class="w-3/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tempat Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.birth_place }}
                                                </p>
                                            </div>
                                        </div>
                                        <div class="w-2/5">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Tanggal Lahir
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.birth_date }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Status
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.status }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="flex flex-row items-center gap-2 mb-4">
                                        <div class="w-full">
                                            <div class="flex flex-col items-start">
                                                <h1 class="font-myFont font-medium text-dark text-sm">
                                                    Alamat
                                                </h1>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.address }}
                                                </p>
                                                <p class="font-myFont font-medium text-dark text-xs">
                                                    {{ detailCustomers.region }}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr class="pt-4">
                    <!-- Modal footer -->
                    <div class="px-4 py-2 flex justify-end items-center space-x-4">
                        <button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition" @click="toggleModal">Tutup</button>
                    </div>
                </div>
            </div>

            <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
                <div class="w-full px-7 mx-auto">
                    <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                        <h1 class="font-myFont text-dark text-lg mb-4">List Customers</h1>
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between mb-3">
                            <div class="flex flex-wrap lg:flex-nowrap items-center gap-4">
                                <div class="relative inline-block text-left w-38 lg:w-38">
                                    <small class="text-dark font-myFont">Golongan Darah</small>
                                    <div class="flex items-center gap-1 mt-1">
                                        <button @click="toggleFilter('goldar')" ref="dropdownRefGoldar" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.blood_group }}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                        </button>
                                        <button v-if="isFilterGoldar" @click="resetFilter('goldar')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                    </div>
                                    <div v-if="showFilter == 'goldar'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                        <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <a @click="filterGoldar('A')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">A</a>
                                            <a @click="filterGoldar('B')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">B</a>
                                            <a @click="filterGoldar('AB')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">AB</a>
                                            <a @click="filterGoldar('O')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">O</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative inline-block text-left w-48 lg:w-38">
                                    <small class="text-dark font-myFont">Jenis Kelamin</small>
                                    <div class="flex items-center gap-1 mt-1">
                                        <button @click="toggleFilter('gender')" ref="dropdownRefGender" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.gender != 'All' ? queryParams.gender == 1 ? 'Laki-Laki' : 'Perempuan' : queryParams.gender}}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                        </button>
                                        <button v-if="isFilterGender" @click="resetFilter('gender')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                    </div>
                                    <div v-if="showFilter == 'gender'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                        <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <a @click="filterGender('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Laki-laki</a>
                                            <a @click="filterGender('2')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Perempuan</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative inline-block text-left lg:w-28">
                                    <small class="text-dark font-myFont">Pelajar</small>
                                    <div class="flex items-center gap-1 mt-1">
                                        <button @click="toggleFilter('is_student')" ref="dropdownRefStudent" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.is_student != 'All' ? queryParams.is_student == 1 ? 'Ya' : 'Tidak' : queryParams.is_student}}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                        </button>
                                        <button v-if="isFilterStudent" @click="resetFilter('is_student')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                    </div>
                                    <div v-if="showFilter == 'is_student'" class="absolute left-22 z-10 mt-2 w-28 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                        <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <a @click="filterStudent('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Ya</a>
                                            <a @click="filterStudent('0')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Tidak</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="relative inline-block text-left w-62 lg:w-42">
                                    <small class="text-dark font-myFont">Status Bayar</small>
                                    <div class="flex items-center gap-1 mt-1">
                                        <button @click="toggleFilter('is_payment_gim')" ref="dropdownRefPaymentGim" type="button" class="mb-2 md:mb-0 lg:mb-0 font-myFont inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-dark shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                        {{ queryParams.is_payment_gim != 'All' ? queryParams.is_payment_gim == 1 ? 'Sudah Bayar' : 'Belum Bayar' : queryParams.is_payment_gim}}
                                        <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                                        </svg>
                                        </button>
                                        <button v-if="isFilterPaymentGim" @click="resetFilter('is_payment_gim')" class="text-light p-[2px] bg-danger rounded-md"><PhX/></button>
                                    </div>
                                    <div v-if="showFilter == 'is_payment_gim'" class="absolute left-22 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                                        <div class="py-1" role="none">
                                            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                                            <a @click="filterPaymentGim('1')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Sudah Bayar</a>
                                            <a @click="filterPaymentGim('0')" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">Belum Bayar</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <input v-model="cari" @input="() => debouncedGetSearchData()" type="text" name="cari" class="font-myFont rounded-md border border-gray-300 py-2 px-3 mb-1 md:-mb-5 lg:-mb-6" placeholder="Cari Data">
                        </div>

                        <div class="flex justify-center w-full" v-if="loading" >
                            <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                        </div>

                        <div v-else-if="dataCustomer.length > 0 && !loading" class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="py-3 px-6">No</th>
                                    <th scope="col" class="py-3 px-6">Nama</th>
                                    <th scope="col" class="py-3 px-6">Jenis Kelamin</th>
                                    <th scope="col" class="py-3 px-6">Gol. Darah</th>
                                    <th scope="col" class="py-3 px-6">No Telp</th>
                                    <th scope="col" class="py-3 px-6">Status Pelajar</th>
                                    <th scope="col" class="py-3 px-6">Status Daftar</th> 
                                    <th scope="col" class="py-3 px-6">Detail</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, index) in dataCustomer" :key="index" class="bg-white border-b">
                                        <td class="py-4 px-6">
                                            {{ (currPage - 1) * itemsPerPage + index + 1 }}
                                        </td>
                                        <td class="py-4 px-6">{{ data.name }}</td>
                                        <td class="py-4 px-6">{{ data.gender }}</td>
                                        <td class="py-4 px-6">{{ data.blood_group }}</td>
                                        <td class="py-4 px-6">{{ data.number }}</td>
                                        <td class="py-4 px-6">{{ data.is_student == 1 ? 'Pelajar' : 'Non Pelajar' }}</td>
                                        <td class="py-4 px-6">{{ data.is_payment_gim }}</td>
                                        <td class="py-4 px-6">
                                            <button @click="clickDetail(data.id)" class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                                <PhFileSearch :size="22"/>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <span v-else-if="dataCustomer.length == 0 && !loading" class="font-myFont text-center text-dark text-lg">Data kosong</span>
                        <div class="flex justify-between items-center mt-4">
                            <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                                {{ totalDari == null ? 0 : totalDari }} sampai {{ totalKe == null ? 0 : totalKe }} dari {{ totalData }} data.
                            </span>
                            <a class="flex items-center font-myFont text-dark text-xs lg:text-base">
                                Halaman
                                <div class="mx-2 flex items-center gap-1">
                                    <a @click="prevPages(prevPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                        <PhCaretLeft/>
                                    </a>
                                    <span class="px-2 py-1 border rounded-lg">
                                        {{ currPage }}
                                    </span>
                                    <a @click="nextPages(nextPage)" class="cursor-pointer text-sm md:text-base lg:text-xl text-dark text-opacity-70 hover:text-opacity-100 hover:shadow-sm">
                                        <PhCaretRight/>
                                    </a>
                                </div> 
                                Dari {{ totalHalaman }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
</template>

<script>
import { PhCaretLeft, PhCaretRight, PhFileSearch, PhX, PhXCircle, PhCheckFat } from '@phosphor-icons/vue';
import { onMounted, ref, onBeforeMount, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api';
import _debounce from 'lodash/debounce';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import Cookies from 'js-cookie'

export default {
    name: 'AdminCustomers',
    components: {PhCaretLeft, PhCaretRight, PhFileSearch, PhX, PhXCircle, PhCheckFat},
    setup(){
        const router = useRouter()
        const baseUrl = import.meta.env.VITE_API_BASE_URL

        const loading = ref(false)
        const dataCustomer = ref([])
        const detailCustomers = ref(null)
        const totalHalaman = ref('')
        const itemsPerPage = ref(null)
        const currPage = ref(null)
        const nextPage = ref(null)
        const prevPage = ref(null)
        const totalDari = ref(null)
        const totalKe = ref(null)
        const totalData = ref(null)
        const cari = ref(null)

        const isModalOpen = ref(false)

        const showFilter = ref(null)
        const isFilterGoldar = ref(false)
        const isFilterGender = ref(false)
        const isFilterStudent = ref(false)
        const isFilterPaymentGim = ref(false)

        const queryParams = {
            'search': '',
            'blood_group': 'All',
            'gender': 'All',
            'is_student': 'All',
            'is_payment_gim': 'All',
            'is_advance': 'All',
            'page': '',
        }

        const resetFilter = (filter) => {
            switch(filter){
                case 'goldar':
                isFilterGoldar.value = false
                case 'gender':
                isFilterGender.value = false
                case 'is_student':
                isFilterStudent.value = false
                case 'is_payment_gim':
                isFilterPaymentGim.value = false
            }

            for (const [key, value] of Object.entries(queryParams)) {
                queryParams[key] = 'All'
            }
            getAllData()
        }

        const toggleFilter = (filter) => {
            showFilter.value = filter
        }

        const dropdownRefGoldar = ref(null);
        const dropdownRefGender = ref(null);
        const dropdownRefStudent = ref(null);
        const dropdownRefPaymentGim = ref(null);

        const closeDropdown = (e) => {
            if(dropdownRefGoldar.value && dropdownRefGoldar.value.contains(e.target)){
                showFilter.value = 'goldar';
            }else if(dropdownRefGender.value && dropdownRefGender.value.contains(e.target)){
                showFilter.value = 'gender';
            }else if(dropdownRefStudent.value && dropdownRefStudent.value.contains(e.target)){
                showFilter.value = 'is_student';
            }else if(dropdownRefPaymentGim.value && dropdownRefPaymentGim.value.contains(e.target)){
                showFilter.value = 'is_payment_gim';
            }else{
                showFilter.value = null;
            }
        };

        const clickDetail = (id) => {
            toggleModal()
            console.log(id)
            const unik = dataCustomer.value.find(item => item.id === id);
            console.log(`unik`,unik)
            detailCustomers.value = unik
        }

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        onMounted(() => {
            document.body.addEventListener('click', closeDropdown);
        });

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });
        
        onBeforeMount(async() => {
            getAllData()
        })

        const getAllData = async() => {
            loading.value = !loading.value
            let allParams = ''
            console.log(queryParams)
            for (const [key, value] of Object.entries(queryParams)) {
                allParams = value != '' && value != 'All' ? allParams+='&'+key+'='+value : allParams
            }
            const token = Cookies.get('token')
            if(token){
                try {
                    const response = await initAPI('get', 'customers?'+allParams, null, token)
                    console.log(`customers`,response.data)
                    dataCustomer.value = response.data.data
                    totalHalaman.value = response.data.last_page
                    itemsPerPage.value = response.data.per_page
                    currPage.value = response.data.current_page
                    nextPage.value = response.data.next_page_url
                    prevPage.value = response.data.prev_page_url
                    totalDari.value = response.data.from
                    totalKe.value = response.data.to
                    totalData.value = response.data.total
                    loading.value = !loading.value
                    console.log(`data`,dataCustomer.value)
                } catch(error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Terjadi kesalahan saat mengambil data customers',
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            } else {
                router.push('login')
                localStorage.clear()
            }
            // const token = JSON.parse(localStorage.getItem('token'))
        }

        const debouncedGetSearchData = _debounce(() => {
            queryParams.search = cari.value !== '' ? cari.value : ''
            getAllData()
        }, 500)

        const filterGoldar = async (params) => {
            isFilterGoldar.value = true
            queryParams.blood_group = params
            getAllData()
        }

        const filterGender = async (params) => {
            isFilterGender.value = true
            queryParams.gender = params
            getAllData()
        }

        const filterStudent = async (params) => {
            isFilterStudent.value = true
            queryParams.is_student = params
            getAllData()
        }

        const filterPaymentGim = async (params) => {
            isFilterPaymentGim.value = true
            queryParams.is_payment_gim = params
            getAllData()
        }

        const nextPages = async(url) => {
            queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
            getAllData()
        }

        const prevPages = async(url) => {
            queryParams.page = url.split('?page=')[1] == '1' ? '' : url.split('?page=')[1]
            getAllData()
        }

        return {
            baseUrl,
            loading,
            dataCustomer,
            detailCustomers,
            totalHalaman,
            itemsPerPage,
            currPage,
            nextPage,
            prevPage,
            totalDari,
            totalKe,
            totalData,
            showFilter,
            isFilterGoldar,
            isFilterGender,
            isFilterStudent,
            isFilterPaymentGim,
            dropdownRefGoldar,
            dropdownRefGender,
            dropdownRefStudent,
            dropdownRefPaymentGim,
            cari,
            queryParams,
            debouncedGetSearchData,
            filterGoldar,
            filterGender,
            filterStudent,
            filterPaymentGim,
            isModalOpen,
            nextPages,
            prevPages,
            toggleFilter,
            resetFilter,
            clickDetail,
            toggleModal
        }
    }
}
</script>