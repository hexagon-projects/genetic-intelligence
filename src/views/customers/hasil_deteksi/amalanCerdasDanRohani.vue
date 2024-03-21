<template>
    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhChecks :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Amalan cerdas</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Amalan CERDAS yang harus dijalankan:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Menggunakan nalar atau berpikir logis dalam bacaan dengan membuat struktur dan skema yang
mudah.
                    </p>
                </div>
                <div>
                    <h1 class="font-semibold text-gray-600 text-base">Sifat paradoks anda:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Logis dan Objektif tapi Raja Tega
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-1/2">
        <div class="bg-white rounded-lg shadow-sm p-2 lg:p-0 lg:py-4 w-full h-full overflow-hidden">
            <div class="mx-4 self-stretch justify-between items-center inline-flex">
                <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                    <PhHandsPraying :size="28"/>
                </span>
            </div>
            <h1 class="mx-4 font-myFont text-dark text-lg font-semibold mb-4">Obat rohani</h1>
            <div class="mx-4 flex flex-col">
                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Obat hati untuk anda:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Perbanyaklah DZIKIR malam (Mengingat Tuhan), agar fikiran & perasaan lebih tenang bahagia
                    </p>
                </div>

                <div class="mb-4">
                    <h1 class="font-semibold text-gray-600 text-base">Peringatan dosa untuk menjaga hati:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Hati-hati sifat SOMBONG (takabbur) jangan merendahkan kemampuan orang lain atau menyepelekan sesuatu
                    </p>
                </div>
                <div>
                    <h1 class="font-semibold text-gray-600 text-base">Penyakit kesehatan mental yang sering muncul dalam diri anda:</h1>
                    <p class="font-myFont text-gray-600 text-sm">
                        Kebanyakan Mikir, maka Stabilkan melalui Dzikir (Mengingat Tuhan)
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhHandsPraying, PhChecks } from '@phosphor-icons/vue';

export default {
    components: {PhHandsPraying, PhChecks}
}
</script>