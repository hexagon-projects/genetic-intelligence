<template>
    <div v-if="userResultDetect" class="lg:w-2/3 w-full">
        <div class="flex flex-col gap-4 lg:gap-4">
            <div class="bg-white rounded-lg shadow-xl p-4 h-full overflow-hidden">
                <div class="flex flex-col justify-center align-middle">
                    <h2 class="font-myFont text-start text-dark font-semibold">Hasil Test Genetic Intelligence Mapping</h2>
                    <hr class="my-5">
                    <!-- <p class="font-myFont text-center text-gray-500 text-sm mb-6">Fahami diri kamu lewat hasil deteki GIM ini</p> -->
                    <div class="flex flex-col items-center gap-2">
                        <div class="w-full mx-auto items-center">
                            <div class="hidden lg:flex lg:flex-row gap-1 items-center align-middle mb-1">
                                <PhWarningCircle :size="24" color="#e81111"/><span class="text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</span>
                            </div>
                            <div class="lg:hidden flex flex-row align-middle mb-1">
                                <PhWarningCircle :size="18" color="#e81111"/><small class="text-danger font-semibold">Video ini eksklusif dan tidak dapat disebarluaskan.</small>
                            </div>
                            <iframe class="w-full hidden lg:block" height="415" :src="userResultDetect.gim.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                            </iframe>
                            <iframe class="w-full lg:hidden" :src="userResultDetect.gim.url" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg shadow-xl lg:p-4 w-full h-full overflow-hidden">
                <div class="flex flex-col lg:flex-row items-center lg:gap-4 lg:mx-auto lg:w-3/4">
                    <div class="lg:block lg:w-1/3 -mb-3 pt-3 lg:-mb-0 lg:pt-0">
                        <img src="../../../assets/img/note.png" alt="icon" class="mx-auto w-36">
                    </div>
                    <div class="lg:w-2/3 lg:p-0 px-4">
                        <div class="flex flex-col align-middle items-center my-7">
                            <h1 class="font-myFont text-dark text-xl lg:mb-2 mb-3">Ingin kanjut konsultasi lebih lanjut? Klik tombol dibawah untuk atur jadwalmu...</h1>
                            <button class="px-2 py-2 w-1/2 self-start rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">Konsultasi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'
import { PhWarningCircle } from "@phosphor-icons/vue";

export default {
    name: 'VideoHasilDeteksi',
    components: {PhWarningCircle},
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userResultDetect,
        }
    }
}
</script>