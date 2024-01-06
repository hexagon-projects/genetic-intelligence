<template>
    <div v-if="userResultDetect" class="lg:w-2/3">
        <div class="flex flex-col gap-4">
            <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                <div class="flex flex-col justify-center">
                    <h2 class="font-myFont text-center text-black font-semibold">Halo! Berikut adalah hasil deteksi GIM kamu</h2>
                    <p class="font-myFont text-center text-gray-500 text-sm mb-6">Fahami diri kamu lewat hasil deteki GIM ini</p>

                    <div class="flex flex-col md:flex-row lg:flex-row justify-center items-center gap-2">
                        <iframe class="w-11/12 lg:w-3/4 mb-6" width="560" height="315" :src="userResultDetect.gim.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'

export default {
    name: 'VideoHasilDeteksi',
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userResultDetect,
        }
    }
}
</script>