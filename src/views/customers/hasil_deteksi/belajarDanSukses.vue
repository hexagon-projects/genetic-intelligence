
<template>
    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhGear :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Metode belajar</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Pola Belajar:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Menggunakan nalar atau berpikir logis dalam bacaan dengan membuat struktur dan skema yang
mudah.
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Cara meningkatkan minat belajar:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Dibukakan jalur kemenangan untuk mengalahkan lawannya.
                    </p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Kalibrasi diri mengatasi kejenuhan:</h1>
                    <p class="font-myFont text-gray-600 text-sm">Kembali ke Alam atau Wisata Alam</p>
                </div>
                <div>
                    <h1 class="font-semibold text-gray-600 text-base">Tips meningkatkan produktivitas:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Cobalah untuk membuka data-data lama, cek apakah ada proyekan yang dapat dikerjakan ulang
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhChartLineUp :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Langkah menuju sukses</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Petunjuk diri meraih sukses:</h1>
                    <p class="font-myFont text-gray-600 text-sm">aasdasdasdasdasdsad</p>
                </div>

                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Langkah awal sederhana:</h1>
                    <p class="font-myFont text-gray-600 text-sm">aasdasdasdasdasdsad</p>
                </div>
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Langkah perubahan:</h1>
                    <p class="font-myFont text-gray-600 text-sm">aasdasdasdasdasdsad</p>
                </div>
                <div>
                    <h1 class="font-semibold text-gray-600 text-base">Harus lebih sungguh-sungguh dalam hal:</h1>
                    <p class="font-myFont text-gray-600 text-sm">aasdasdasdasdasdsad</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhGear, PhChartLineUp } from '@phosphor-icons/vue';

export default {
    components: {PhGear, PhChartLineUp}
}
</script>