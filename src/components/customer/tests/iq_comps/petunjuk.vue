<template>
    <div v-if="isModalOpen" class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <modal @init="toggleModal" />
    </div>

    <div class="hidden lg:flex lg:flex-row items-center">
        <div class="lg:w-1/2">
            <div class="flex flex-col items-center gap-2 mx-14">
                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold mb-2">Halo! Sebelum melakukan test perhatikan petunjuk dibawah.</h1>
                <div class="flex items-center gap-6 h-[116px]">
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
                            <button @click="toggleModal" class="bg-biru shadow-sm px-4 py-2 text-white text-sm rounded-md hover:bg-opacity-75">
                                Lihat Soal
                            </button>
                        </div>
                    </transition>
                    <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 2}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                        <PhCaretRight/>
                    </button>
                </div>
                <div class="flex items-center gap-2">
                    <span :class="{'bg-dark': indexInstruksi == 0, 'bg-neutral-400': indexInstruksi !== 0}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    <span :class="{'bg-dark': indexInstruksi == 1, 'bg-neutral-400': indexInstruksi !== 1}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    <span :class="{'bg-dark': indexInstruksi == 2, 'bg-neutral-400': indexInstruksi !== 2}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex flex-col justify-center">
                <img src="../../../../assets/img/petunjuk-iq.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Petunjuk Image">
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';
import { useStore } from 'vuex'
import modal from './modal.vue';

export default {
    name: 'IQCompsInstruksi',
    components: {PhCaretLeft, PhCaretRight, modal},
    setup(){
        const isModalOpen = ref(false)
        const indexInstruksi = ref(0)

        const toggleModal = () => {
            isModalOpen.value = !isModalOpen.value
        }

        const btnInstruksi = (params) => {
            if (params === 'next' && indexInstruksi.value < 2) {
                indexInstruksi.value += 1
            } else if (params === 'prev' && indexInstruksi.value > 0) {
                indexInstruksi.value -= 1
            }
        }

        return {
            isModalOpen,
            indexInstruksi,
            btnInstruksi,
            toggleModal,
        }
    }
}
</script>