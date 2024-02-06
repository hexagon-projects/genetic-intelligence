<template>
    <section class="bg-gray-100 pb-[340px] lg:pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <h1 class="font-myFont text-dark text-lg mb-4">Riwayat Pembayaran</h1>
                    <div class="flex flex-col md:flex-row md:items-center md:justify-between lg:flex-row lg:items-center lg:justify-between">
                        <span class="font-myFont text-xs md:text-sm lg:text-sm text-start lg:text-center text-dark">
                            1 sampai 10 dari 10 data.
                        </span>
                        <input type="text" name="cari" class=" mb-2 font-myFont rounded-md border border-gray-300 py-2 px-3" placeholder="Cari Data">
                    </div>
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" class="py-3 px-6">No</th>
                            <th scope="col" class="py-3 px-6">Nama</th>
                            <th scope="col" class="py-3 px-6">No Telp</th>
                            <th scope="col" class="py-3 px-6">Jam</th>
                            <th scope="col" class="py-3 px-6">Tanggal</th>
                            <th scope="col" class="py-3 px-6">Type</th>
                            <th scope="col" class="py-3 px-6">Detail</th>
                        </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b">
                                <td class="py-4 px-6">
                                    1
                                </td>
                                <td class="py-4 px-6">Jhon Doe</td>
                                <td class="py-4 px-6">0812345321</td>
                                <td class="py-4 px-6">19.00</td>
                                <td class="py-4 px-6">12-04-2024</td>
                                <td class="py-4 px-6">Registrasi</td>
                                <td class="py-4 px-6">
                                    <button class="flex items-center gap-1 px-4 py-2 bg-biru font-myFont text-sm text-white rounded-lg hover:bg-opacity-75 hover:shadow-lg">
                                        <PhEye :size="22"/>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { PhEye } from '@phosphor-icons/vue'

export default {
    name: 'RiwayatPembarayan',
    components: {PhEye}
}
</script>