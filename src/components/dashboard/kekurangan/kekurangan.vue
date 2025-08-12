<template>
    <div class="hidden lg:block h-full">
        <div class="bg-white rounded-lg shadow-sm p-4 h-full">
            <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kekurangan.png" alt="">
            <!-- <div class="w-full mb-2">
                <div class="flex justify-center gap-2 mb-4 mx-auto">
                    <img src="../../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                    <img src="../../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                    <img src="../../../assets/img/plus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                </div>
            </div> -->
            <!-- <h2 class="font-myFont font-semibold text-xl text-start mx-12 lg:mx-4 text-dark">
                Sesuatu yang harus kamu optimalkan untuk meraih sukses dan kebahagiaan
            </h2>
            <p class="font-myFont text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-4">Rangkuman sisi positifmu</p> -->
            
            <div class="mt-2 mb-2">
                <div class="w-full flex flex-col">
                    <h1 class="font-myFont text-dark text-lg mx-4 font-semibold">Hal yang perlu kamu antisipasi</h1>
                    <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                    <p class="text-sm text-gray-600 mx-12 lg:mx-4 text-start">
                        {{ userResultDetect.gim.gim_details.lack }}
                    </p>
                    <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
                </div>
            </div>
        </div>
    </div>

    <div class="block lg:hidden">
        <div class="mt-2 mb-2">
            <div class="w-full flex flex-col">
                <h1 class="font-myFont text-dark text-lg font-semibold mb-2">Hal yang perlu kamu antisipasi</h1>
                <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                <p class="text-sm text-gray-600 lg:mx-4 text-start">
                    {{ userResultDetect.gim.gim_details.lack }}
                </p>
                <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'DashboardKekurangan',
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userResultDetect
        }
    }
}
</script>