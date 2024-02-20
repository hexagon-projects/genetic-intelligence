<template>
    <section class="bg-gray-100 pb-8">
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
        
        <div class="flex flex-col justify-center items-center mx-7 py-8 gap-4">
            <div class="-mt-6 w-1/2 bg-white rounded-lg shadow-lg p-4">
                <div class="flex flex-col items-center p-4">
                    <h1 class="font-myFont text-2xl text-dark font-semibold mb-4">Petunjuk Test IQ</h1>
                    <img src="../../../assets/img/petunjuk-iq.png" class="w-1/4 mb-4">
                    
                    <div class="flex items-center gap-4">
                        <button @click="btnInstruksi('prev')" :class="{'opacity-50': indexInstruksi == 0}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <p v-if="indexInstruksi == 0" class="font-myFont text-neutral-500 text-sm mb-2">
                            Tes ini berisi 50 pertanyaan yang secara bertahap menjadi semakin sulit. Anda <span class="text-dark font-semibold">tidak mungkin</span> dapat menyelesaikan semua pertanyaan, tetapi selesaikan <span class="text-dark font-semibold">semampu</span> Anda.
                        </p>
                        <p v-else-if="indexInstruksi == 1" class="font-myFont text-neutral-500 text-sm">
                            Anda memiliki waktu 12 menit untuk memberi jawaban yang benar sebanyak mungkin. Kerjakan dengan <span class="text-dark font-semibold">teliti</span>, namun jangan <span class="text-dark font-semibold">menghabiskan waktu</span> lama pada setiap pertanyaan atau lewati pertanyaan itu. Sebelum Anda memulai tes ini, jawablah Contoh Pertanyaan dibawah ini. 
                        </p>
                        <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 1}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
</section>
</template>

<script>
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';
import { ref } from 'vue';

export default {
    name: 'TestIQ',
    components: {PhCaretLeft, PhCaretRight},
    setup(){
        const indexInstruksi = ref(0)

        const btnInstruksi = (params) => {
            if (params === 'next' && indexInstruksi.value < 1) {
                indexInstruksi.value += 1
            } else if (params === 'prev' && indexInstruksi.value > 0) {
                indexInstruksi.value -= 1
            }
        }

        return {
            indexInstruksi,
            btnInstruksi
        }
    }
}
</script>