<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-7 mb-4 pt-4 gap-4">
           <PilihHari/>
           <!-- {{ userData }} -->
        </div>

        <div v-if="userData && dataReservasi" class="mx-7 bg-white rounded-lg shadow-lg p-4">
            <div class="flex justify-center w-full" v-if="loading" >
                <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
            </div>

            <div v-if="userData.is_advance == 'Tidak' && !reservasiData" class="flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2">
                    <div class="lg:mx-10 lg:ml-20 flex flex-col">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum menentukan jadwal</h1>
                        <p class="font-myFont text-start text-gray-500 text-sm mb-4">review reservasi kamu akan tampil disini</p>
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/belum-reservasi.png" class="w-1/4 self-center" alt="Belum Reservasi">
                    </div>
                </div>
            </div>

            <div v-if="userData.is_advance == 'Tidak' && reservasiData" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-gray-500 text-base mb-4">Berikut adalah detail jadwal reservasi kamu</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500">
                        <thead class="text-xs text-dark uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6 text-start">Nama</th>
                                <th scope="col" class="py-3 px-6 text-start">Jam</th>
                                <th scope="col" class="py-3 px-6 text-start">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class=" bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhTimer/> {{ reservasiData.time }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhCalendar/> {{ reservasiData.date }}
                                    </span>
                                </td>
                            </tr>
                            <tr class=" bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        Total: {{ reservasiData.formatted_fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="konfirReservasi" class="lg:ml-12 lg:mt-3 px-2 py-2 w-1/3 self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                        Konfirmasi
                    </button>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/2 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>
            </div>

            <div v-if="userData.is_advance == 'Ya' && dataReservasi" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="w-full md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-sm text-gray-500 lg:text-base mb-4 lg:mb-0">Reservasi kamu sudah terjadwal</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500">
                        <tbody>
                            <tr class="hidden md:block lg:block bg-white border-b">
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhTimer/> {{ dataReservasi.time }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-base items-center">
                                        <PhCalendar/> {{ dataReservasi.date }}
                                    </span>
                                </td>
                            </tr>

                            <div class="md:hidden lg:hidden flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhUser/>
                                        Nama
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhTimer/>
                                        Jam
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ dataReservasi.time }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhCalendar/>
                                        Tanggal
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                            </div>

                            <tr class="hidden md:block lg:block bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 text-base items-center">
                                        <span class="font-myFont text-dark font-semibold">Total:</span> {{ dataReservasi.fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button v-if="dataReservasi.status == 'Requested'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Menunggu Approval
                    </button>
                    <button @click="toggleModalBayar" v-else-if="dataReservasi.status == 'Approved'" class="mt-4 lg:ml-12 px-4 py-2 bg-biru text-light rounded-lg hover:opacity-75 hover:shadow-lg"
                    >
                        Bayar
                    </button>
                    <button v-else-if="dataReservasi.status == 'Scheduled'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Menunggu Konsultasi Dimulai
                    </button>
                    <button v-else-if="dataReservasi.status == 'On Progress'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Konsultasi Sedang Berlangsung
                    </button>
                </div>

                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/4 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>

                <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
                    :class="{'hidden': !isModalOpen, 'block': isModalOpen}"
                >
                    <div class="relative w-full lg:w-1/2 top-24 mx-auto shadow-xl rounded-md bg-white">
                        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Pilih Metode Pembayaran</h1>
                        <hr class="mt-4">
                        
                        <div v-if="!modalLoading">
                            <div class="hidden md:flex lg:flex flex-col gap-2 max-h-56">
                                <span class="mt-1 px-2 text-xs font-myFont">*Pembayaran akan dikenakan biaya admin</span>
                                <div class="flex flex-row px-2 gap-4 my-4">
                                    <div class="w-1/2">
                                        <label for="payment_method" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                        <input v-model="feePaymentMethod" type="text" name="payment_method" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                    <div class="w-1/2">
                                        <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                        <input v-model="feePaymentCode" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                </div>
                                <div class="py-2 px-2 grid grid-cols-4 gap-2 overflow-y-scroll w-full">
                                    <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                        <img :src="payment.paymentImage" :alt="payment.paymentName">
                                    </a>
                                </div>
                            </div>
    
                            <div class="lg:hidden md:hidden flex flex-col max-h-56 max-w-full">
                                <span class="mt-1 px-2 text-xs font-myFont">*Pembayaran akan dikenakan biaya admin</span>
                                <div class="flex flex-row px-2 gap-4 my-4">
                                    <div class="w-1/2">
                                        <label for="payment_method" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                        <input v-model="feePaymentMethod" type="text" name="payment_method" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                    <div class="w-1/2">
                                        <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                        <input v-model="feePaymentCode" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                </div>
                                <div class="py-2 px-2 grid grid-cols-2 gap-2 overflow-y-scroll w-full">
                                    <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                        <img :src="payment.paymentImage" :alt="payment.paymentName">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-else class="py-4">
                            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
                        </div>

                        <hr class="pt-4">
                        <div class="px-4 py-2 flex justify-between items-center space-x-4">
                            <button class="font-myFont bg-light border text-dark px-4 py-2 rounded-md hover:bg-biru hover:text-white transition" @click="toggleModalBayar">Tutup</button>
                            <button class="bg-biru text-white px-4 py-2 rounded-md hover:opacity-75 hover:shadow-lg transition" @click="konfirPembayaran">Submit</button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- <div v-if="userData.is_advance == 'Tidak' && reservasiData && !dataReservasi && !loading" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-gray-500 text-base mb-4">Berikut adalah detail jadwal reservasi kamu</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-dark uppercase bg-gray-50">
                            <tr>
                                <th scope="col" class="py-3 px-6 text-start">Nama</th>
                                <th scope="col" class="py-3 px-6 text-start">Jam</th>
                                <th scope="col" class="py-3 px-6 text-start">Tanggal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class=" bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhTimer/> {{ reservasiData.time }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 items-center">
                                        <PhCalendar/> {{ reservasiData.date }}
                                    </span>
                                </td>
                            </tr>
                            <tr class=" bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 items-center">
                                        Total: {{ reservasiData.formatted_fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button @click="konfirReservasi" class="lg:ml-12 lg:mt-3 px-2 py-2 w-1/3 self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                        Konfirmasi
                    </button>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/2 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>
            </div> -->

            <!-- <div v-if="dataReservasi && userData.is_advance == 'Ya' && !loading" class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="w-full md:w-full lg:w-1/2 mb-2">
                    <h1 class="lg:ml-12 mb-1 font-myFont text-base lg:text-xl text-start text-dark font-semibold">Detail reservasi</h1>
                    <p class="lg:ml-12 font-myFont text-start text-sm text-gray-500 lg:text-base mb-4 lg:mb-0">Reservasi kamu sudah terjadwal</p>
                    <table class="lg:ml-12 w-full text-sm text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr class="hidden md:block lg:block bg-white border-b">
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhUser/> {{ userData.name }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-sm lg:text-base items-center">
                                        <PhTimer/> {{ dataReservasi.time }}
                                    </span>
                                </td>
                                <td class="font-myFont py-4 px-6">
                                    <span class="flex gap-1 text-base items-center">
                                        <PhCalendar/> {{ dataReservasi.date }}
                                    </span>
                                </td>
                            </tr>

                            <div class="md:hidden lg:hidden flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhUser/>
                                        Nama
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhTimer/>
                                        Jam
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ dataReservasi.time }}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <h1 class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        <PhCalendar/>
                                        Tanggal
                                    </h1>
                                    <span class="flex items-center gap-1 font-myFont font-medium text-dark text-base">
                                        {{ userData.name }}
                                    </span>
                                </div>
                            </div>

                            <tr class="hidden md:block lg:block bg-white border-b">
                                <td class="py-4 px-6">
                                    <span class="font-myFont flex gap-1 text-base items-center">
                                        <span class="font-myFont text-dark font-semibold">Total:</span> {{ dataReservasi.fee }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <button v-if="dataReservasi.status == 'Requested'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Menunggu Approval
                    </button>
                    <button @click="toggleModalBayar" v-else-if="dataReservasi.status == 'Approved'" class="mt-4 lg:ml-12 px-4 py-2 bg-biru text-light rounded-lg hover:opacity-75 hover:shadow-lg"
                    >
                        Bayar
                    </button>
                    <button v-else-if="dataReservasi.status == 'Scheduled'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Menunggu Konsultasi Dimulai
                    </button>
                    <button v-else-if="dataReservasi.status == 'On Progress'" class="cursor-not-allowed mt-4 lg:ml-12 px-4 py-2 opacity-60 bg-biru text-light rounded-lg"
                    >
                        Konsultasi Sedang Berlangsung
                    </button>
                </div>

                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.png" class="w-1/4 lg:w-1/3 self-end md:self-center lg:self-center" alt="Sudah Reservasi">
                    </div>
                </div>

                <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
                    :class="{'hidden': !isModalOpen, 'block': isModalOpen}"
                >
                    <div class="relative w-full lg:w-1/2 top-24 mx-auto shadow-xl rounded-md bg-white">
                        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Pilih Metode Pembayaran</h1>
                        <hr class="mt-4">
                        
                        <div v-if="!modalLoading">
                            <div class="hidden lg:flex flex-col gap-2 max-h-56">
                                <span class="mt-1 px-2 text-xs font-myFont">*Pembayaran akan dikenakan biaya admin</span>
                                <div class="flex flex-row px-2 gap-4 my-4">
                                    <div class="w-1/2">
                                        <label for="payment_method" class="block text-sm font-myFont font-medium text-gray-600">Metode Pembayaran:</label>
                                        <input v-model="feePaymentMethod" type="text" name="payment_method" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                    <div class="w-1/2">
                                        <label for="payment_code" class="block text-sm font-myFont font-medium text-gray-600">Total Pembayaran:</label>
                                        <input v-model="feePaymentCode" type="text" name="payment_code" class="mt-1 p-2 border rounded-md w-full read-only:bg-gray-200 focus:outline-none focus:ring-biru focus:ring-2 focus:border-biru" readonly />
                                    </div>
                                </div>
                                <div class="py-2 px-2 grid grid-cols-4 gap-2 overflow-y-scroll w-full">
                                    <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                        <img :src="payment.paymentImage" :alt="payment.paymentName">
                                    </a>
                                </div>
                            </div>
    
                            <div class="lg:hidden flex flex-col max-h-32 max-w-full">
                                <div class="py-2 px-2 grid grid-cols-2 gap-2 overflow-y-scroll w-full">
                                    <a @click="pilihPayment(payment.paymentMethod, payment.paymentName, payment.totalFee)" v-for="(payment, index) in paymentMethod" :key="index" class="cursor-pointer hover:animate-wiggle bg-white border rounded-lg shadow-sm px-2 py-2">
                                        <img :src="payment.paymentImage" :alt="payment.paymentName">
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div v-else class="py-4">
                            <span class="flex justify-center animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14 m-auto"></span>
                        </div>

                        <hr class="pt-4">
                        <div class="px-4 py-2 flex justify-between items-center space-x-4">
                            <button class="font-myFont bg-light border text-dark px-4 py-2 rounded-md hover:bg-biru hover:text-white transition" @click="toggleModalBayar">Tutup</button>
                            <button class="bg-biru text-white px-4 py-2 rounded-md hover:opacity-75 hover:shadow-lg transition" @click="konfirPembayaran">Submit</button>
                        </div>
                    </div>
                </div>
            </div> -->

            <!-- <div v-else-if="!reservasiData && userData.is_advance == 'Tidak' && !loading" class="flex flex-col lg:flex-row items-center">
                <div class="lg:w-1/2">
                    <div class="lg:mx-10 lg:ml-20 flex flex-col">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum menentukan jadwal</h1>
                        <p class="font-myFont text-start text-gray-500 text-sm mb-4">review reservasi kamu akan tampil disini</p>
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/belum-reservasi.png" class="w-1/4 self-center" alt="Belum Reservasi">
                    </div>
                </div>
            </div> -->
        </div>
    </section>
</template>

<script>
import initAPI from '../../../api/api';
import { ref, computed, onMounted, onBeforeMount, watch } from 'vue'
import { PhUser, PhTimer, PhCalendar } from '@phosphor-icons/vue';
import PilihHari from './PilihHari/hari.vue'
import { useStore } from 'vuex'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useRouter } from 'vue-router';

export default {
    name: 'Reservasi',
    components: {PhUser, PhTimer, PhCalendar, PilihHari},
    setup(){
        const router = useRouter()

        const loading = ref(false)
        const modalLoading = ref(false)
        const isModalOpen = ref(false)
        const store = useStore()
        const dataReservasi = ref(null)
        const statusReservasi = ref(null)
        const paymentMethod = ref(null)

        const feePaymentMethod = ref(null)
        const feePaymentCode = ref(null)
        const paymentForm = ref(null)        

        const userData = computed(() => store.getters.getUserData)
        // const reservasiData = JSON.parse(localStorage.getItem('bookReservasi'))
        const reservasiData = computed(() => store.getters.getReservasi)
        // const bookingReservasi = ref(JSON.parse(localStorage.getItem('setReservasi')))
        // const reservasiData = computed(() => bookingReservasi.value)

        // console.log(`reservasi data`,reservasiData.value)
        // console.log(`dataReservasi length`,dataReservasi.value)

        const getDataReservasi = async() => {
            loading.value = !loading.value
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const response = await initAPI('get', `customers/reservations?customer_id=${userData.value.id}&only_one=true&is_active=true`, null, token)
                console.log(`cek weh reservasina`,response.data)
                dataReservasi.value = response.data
                statusReservasi.value = response.data.status
                // console.log(`status reservasi`, statusReservasi.value)
                console.log(`ini data reservasi`, dataReservasi.value)
            } catch (error) {
                console.log(`error`, error)
            }
            loading.value = !loading.value
        }

        const getDataCustomer = async() => {
            loading.value = !loading.value
            try {
                const token = JSON.parse(localStorage.getItem('token'))
                const updatedCustomer = await initAPI('get', 'customers?id='+userData.value.id, null, token)
                dataReservasi.value = updatedCustomer.data.data[0]
                store.commit('user', updatedCustomer.data.data[0])
                localStorage.setItem('userData', JSON.stringify(updatedCustomer.data.data[0]))
            } catch (error) {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Error Terjadi',
                    text: 'Terjadi error sistem',
                    showConfirmButton: false,
                    timer: 3500
                });
            }
            loading.value = !loading.value
        }

        onBeforeMount(() => {
            getDataReservasi()
            getDataCustomer()
        })

        onMounted(() => {
            if(dataReservasi.value == null){
                getDataReservasi()
            }
            // const isReservasi = JSON.parse(localStorage.getItem('userData'))
           
            //     console.log(`cek weh reservasina`,response.data)
            // if(isReservasi.is_advance == 'Ya'){
            //     const token = JSON.parse(localStorage.getItem('token'))
            //     const response = await initAPI('get', `customers/reservations?customer_id=${userData.value.id}&only_one=true`, null, token)
            //     console.log(`cek weh reservasina`,response.data)
            //     const data = {
            //       date: response.data.date,
            //       day: response.data.day,
            //       time: response.data.time,
            //       fee: response.data.fee,
            //       status: response.data.status 
            //     }
            //     dataReservasi.value = data
            //     console.log(`ajg`,dataReservasi.value)
            // }else{
            //     console.log('acan nyien reservasi')
            // }
        })

        const konfirReservasi = async() => {
            loading.value = !loading.value
            const token = JSON.parse(localStorage.getItem('token'))
            const response = await initAPI('post', 'customers/reservations', reservasiData.value, token)
            console.log(`konfir`,response.data)
            if(response.data.success == true){
                Swal.fire({
                    icon: 'success',
                    title: 'Reservasi Berhasil',
                    text: response.data.message,
                    confirmButtonColor: "#0b40f4",
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.go()
                    }
                });
                store.commit('setReservasi', null)
                localStorage.removeItem('setReservasi')

                // getDataReservasi()
                // getDataCustomer()
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Reservasi Gagal',
                    text: response.data.message,
                    showConfirmButton: false,
                    timer: 3500
                });
                store.commit('setReservasi', null)
            }
            loading.value = !loading.value
        }

        const toggleModalBayar = async() => {
            modalLoading.value = !modalLoading.value
            // console.log('siap bayar', dataReservasi.value)
            isModalOpen.value = !isModalOpen.value
            const response = await initAPI('get', 'payment/methods', null, null)
            paymentMethod.value = response.data.paymentFee
            modalLoading.value = !modalLoading.value
        }

        const pilihPayment = (method, name, feePayment) => {
            feePaymentMethod.value = name
            feePaymentCode.value = parseInt(dataReservasi.value.consultant.fee) + parseInt(feePayment)
            const datas = {
                customer_id: userData.value.id,
                payment_method_code: method,
                fee: parseInt(feePayment),
                is_register: 'false',
                first_name: userData.value.first_name,
                last_name: userData.value.last_name,
                email: JSON.parse(localStorage.getItem('userEmail')),
                number: userData.value.number
            }
            console.log(`datas`,datas)
            paymentForm.value = datas
        }

        const konfirPembayaran = async() => {
            console.log(`payment form`, paymentForm.value)
            const token = JSON.parse(localStorage.getItem('token'))
            try {
                modalLoading.value = !modalLoading.value
                const response = await initAPI('post', 'customers/reservations/payment', paymentForm.value, token)
                console.log(`konfir pembayaran`,response.data)
                console.log(`merchant reservasi`,response.data.payment_data.merchant_order_id)
                localStorage.setItem('merchantId', JSON.stringify(response.data.payment_data.merchant_order_id))
                localStorage.setItem('bayarReservasi', true)
                const url = response.data.data.paymentUrl
                let fixedUrl = ''
                let refValue = ''
                if(url.includes('ref=')){
                    fixedUrl = 'https://sandbox.duitku.com/TopUp/v2/TopUpVAPage.aspx?ref='
                    refValue = url.split('ref=')[1]
                }else if(url.includes('reference=')){
                    console.log('reference', url)
                    fixedUrl = 'https://sandbox.duitku.com/topup/v2/TopUpCreditCardPayment.aspx?reference='
                    refValue = url.split('reference=')[1]
                }
                window.location.href = url
                window.location.href = fixedUrl+refValue
                modalLoading.value = !modalLoading.value

                await getDataReservasi()
            } catch (error) {
                console.log(error)
            }

        }

        return {
            loading,
            userData,
            reservasiData,
            dataReservasi,
            isModalOpen,
            paymentMethod,
            modalLoading,
            feePaymentCode,
            feePaymentMethod,
            konfirReservasi,
            toggleModalBayar,
            pilihPayment,
            konfirPembayaran
        }
    }
}
</script>