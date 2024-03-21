<template>
    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhHandCoins :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Tips berbisnis</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Gaya berbisnis:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Membangun “Penguasaan Bisnis” diberbagai jenis bisnis dan ekspansi wilayah untuk mewadahi pengendaliannya
guna terjadi pelipatgandaan
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Modal utama membangun bisnis:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        KEAHLIAN
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Faktor awal KEGAGALAN yang mendatangkan KEMUNDURAN:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Malas MEMBACA informasi ter-update & Mengkritik diri sendiri
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Kekuatan public speaking:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        ARGUMENTATIF (Fakta & Data)
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Tabiat anda terhadap uang:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Terbiasa akumulatif yaitu kumpul dan simpan
                    </p>
                </div>
                <div>
                    <h1 class="font-semibold text-gray-600 text-base">Irama kerja anda:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Cepat & Tegas
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhUsersThree :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Peran dalam melaksanakan bisnis</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Peran yang Harus dijalankan dengan Maksimal:</h1>
                    <p class="font-myFont text-gray-600 text-sm mb-2">
                        Jadilah seorang yang adil dan selalu mengedepankan efektifitas dalam kerja cerdasnya. Termasuk ketika menjadi
                        penguasa kelak
                    </p>

                     <p class="font-myFont text-gray-600 text-sm">
                        Menjadi seorang pemimpin yang baik dan menjadi tauladan, akan membuka jalan kebaikan bagi anda dan orang-
                        orang terdekat
                     </p>
                </div>

                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Indikator SUKSES:</h1>
                    <p class="font-myFont text-gray-600 text-sm">Rencana nya sistematis sesuai prioritas</p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Pola asuh pada tipe ini:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Berikan Kepercayaan agar muncul karakter Kemandirian
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Cara memotivasi anak tipe ini:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Latih dengan banyak MEMBACA dan MENGERJAKAN SOAL
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhHandCoins, PhUsersThree } from '@phosphor-icons/vue';

export default {
    components: {PhHandCoins, PhUsersThree}
}
</script>