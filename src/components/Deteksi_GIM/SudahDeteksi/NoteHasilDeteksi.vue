<template>
    <div v-if="userResultDetect" class="flex flex-col lg:flex-row justify-center gap-4 mx-4">
        <div class="w-full lg:w-1/2">
            <div class="w-full bg-white rounded-lg shadow-xl p-4">
                <div class="flex justify-between items-center">
                    <div class="flex flex-col">
                        <h2 class="pl-8 font-myFont font-semibold text-xl text-start text-black">Catatan hasil deteksi GIM kamu</h2>
                        <p class="pl-8 font-myFont text-start text-gray-500 text-sm mb-4">Catatan tentang diri kamu</p>
                    </div>
                    <img class="w-22 h-20 pr-8" src="../../../assets/img/note-crop.png">
                </div>
                
                <div class="p-3 flex justify-start">
                    <!-- <div class="pt-12">
                        <div class="overflow-hidden w-24 h-24 -mt-16 mx-auto">
                            <img src="../../assets/img/note-crop.png" alt="Note">
                        </div>
                    </div> -->
                    <div class="w-full">
                        <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                        <p class="text-sm text-gray-600 text-wrap text-start px-5">{{ userResultDetect.note }}</p>
                        <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
                    </div>
                </div>

                <!-- <div class="flex flex-col -mt-6">
                    <p class="mt-4 font-myFont text-center text-gray-500 text-sm mb-2">Ingin konsultasi lebih lanjut? klik tombol dibawah</p>
                    <button class="px-2 py-2 w-1/2 lg:w-1/4 self-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">Konsultasi</button>
                </div> -->
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="bg-white rounded-lg shadow-xl p-4 h-full">
                <h2 class="font-myFont font-semibold text-xl text-center text-black">Konsultasi lebih lanjut</h2>
                <p class="font-myFont text-center text-gray-500 text-sm mb-4">Konsultasi secara mendalam dengan konsultan</p>
                
                <div class="mt-8 flex justify-center mb-4">
                    <img class="w-1/2" src="../../../assets/img/consul.png" alt="">
                </div>

                <div class="flex flex-col">
                    <!-- <p class="mt-4 font-myFont text-center text-gray-500 text-sm mb-2">Ingin konsultasi lebih lanjut? klik tombol dibawah</p> -->
                    <button class="px-2 py-2 w-1/2 lg:w-1/4 self-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">Konsultasi</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex'

export default {
    name: 'NoteHasilDeteksi',
    setup(){
        const store = useStore()
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userResultDetect,
        }
    }
}
</script>