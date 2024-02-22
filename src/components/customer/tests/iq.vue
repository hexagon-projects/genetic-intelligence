<template>
    <section class="bg-gray-100 pb-20">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.iq'}" class="text-base text-dark hover:text-dark/70">
                    Test IQ
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-3 gap-4">
            <div :class="{'h-[420px]': loading}" class="flex flex-col bg-white w-full lg:w-full rounded-lg shadow-lg p-7">
                <div v-if="isUnderstand == false">
                    <InstruksiIQ/>
                </div>

                <div v-if="isUnderstand == true">
                    <QuestionsIQ/>
                </div>

                <div v-if="sudahDeteksi">
                    <h1>Sudah Deteksi</h1>
                </div>
            </div>
        </div>
        
        <!-- <div class="flex flex-col justify-center items-center mx-7 py-8 gap-4"> -->
            <!-- <div class="-mt-6 w-1/2 bg-white rounded-lg shadow-lg p-4">
                <div class="flex flex-col items-center p-4">
                    <h1 class="font-myFont text-2xl text-dark font-semibold mb-4">Petunjuk Test IQ</h1>
                    <img src="../../../assets/img/petunjuk-iq.png" class="w-1/4 mb-4">
                    
                    <div class="flex items-center gap-8">
                        <button @click="btnInstruksi('prev')" :class="{'opacity-50': indexInstruksi == 0}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <transition name="fade" mode="out-in">
                            <p v-if="indexInstruksi == 0" class="overflow-hidden font-myFont text-neutral-500 text-sm mb-2">
                                Tes ini berisi 50 pertanyaan yang secara bertahap menjadi semakin sulit. Anda <span class="text-dark font-semibold">tidak mungkin</span> dapat menyelesaikan semua pertanyaan, tetapi selesaikan <span class="text-dark font-semibold">semampu</span> Anda.
                            </p>
                            <p v-else-if="indexInstruksi == 1" class="overflow-hidden font-myFont text-neutral-500 text-sm mb-2">
                                Anda memiliki waktu 12 menit untuk memberi jawaban yang benar sebanyak mungkin. Kerjakan dengan <span class="text-dark font-semibold">teliti</span>, namun jangan <span class="text-dark font-semibold">menghabiskan waktu</span> lama pada setiap pertanyaan atau lewati pertanyaan itu. 
                            </p>
                            <div v-else-if="indexInstruksi == 2" class="w-full overflow-hidden flex flex-col items-center gap-2">
                                <p class="font-myFont text-neutral-500 text-sm">
                                    Sebelum Anda memulai tes ini, jawablah Contoh Pertanyaan dibawah ini. 
                                </p>
                                <button class="bg-biru shadow-sm px-4 py-2 text-white text-sm rounded-md hover:bg-opacity-75">
                                    Lihat Soal
                                </button>
                            </div>
                        </transition>
                        <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 2}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
            </div> -->
        <!-- </div> -->
</section>
</template>

<script>
import { ref, computed, onMounted, watch, watchEffect } from 'vue';
import { useStore } from 'vuex'
import InstruksiIQ from './iq_comps/petunjuk.vue'
import QuestionsIQ from './iq_comps/questions.vue';

export default {
    name: 'TestIQ',
    components: {InstruksiIQ, QuestionsIQ},
    setup(){
        const store = useStore()
        const isUnderstand = computed(() => store.getters.getIsUnderstand)

        return {
            isUnderstand,
        }
    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>