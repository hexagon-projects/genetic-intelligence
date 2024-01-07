<template>
    <div class="bg-white rounded-2xl shadow-sm p-4 h-full">
        <div class="w-full mb-4">
            <div class="flex justify-center gap-2 mt-2 mb-4 mx-auto">
                <img src="../../../assets/img/minus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                <img src="../../../assets/img/minus-crop.png" class="w-8 h-8" alt="Negatif Icon">
                <img src="../../../assets/img/minus-crop.png" class="w-8 h-8" alt="Negatif Icon">
            </div>
        </div>
        <h2 class="font-myFont font-semibold text-xl text-start mx-12 lg:mx-4 text-dark">
            Hal yang penting untuk kamu ketahui agar kamu bisa mengantisipasinya
        </h2>
        <p class="font-myFont text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-4">Rangkuman sisi negatifmu</p>
        
        <div class="mt-2 mb-2">
            <div class="w-full">
                <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                <p class="text-sm text-gray-600 mx-12 lg:mx-4 text-start">
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