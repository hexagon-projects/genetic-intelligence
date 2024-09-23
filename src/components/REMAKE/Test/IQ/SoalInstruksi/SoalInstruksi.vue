<template>
    <div class="hidden lg:block relative w-[70%] top-10 mx-auto shadow-xl rounded-3xl bg-white p-[36px]">
        <div class="flex flex-col gap-[24px]">
            <span class="mx-auto text-black text-2xl font-medium font-['Roboto'] leading-loose">Perhatikan satu contoh pertanyaan yang terisi dengan benar</span>

            <div class="flex flex-col">
                <div v-if="indexSoal == 1" class="flex flex-col">
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        MENUAI adalah lawan kata dari...
                    </span>
    
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        1. Mendapat
                    </span>
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        2. Bersorak
                    </span>
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        3. Melanjutkan
                    </span>
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        4. Berada
                    </span>
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        5. Menabur
                    </span>
                </div>

                <div v-if="indexSoal == 2" class="flex flex-col">
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        Harga setiap kotak paper clip adalah 23 rupiah. Berapa harga 4 kotak?...
                    </span>
                </div>

                <div v-if="indexSoal == 3" class="flex flex-col">
                    <span class="text-black text-base font-normal font-['Roboto'] leading-normal">
                        Setelah mengisi soal tadi kami harap anda sudah mengerti bagaimana caranya menjalankan test IQ, sekarang klik tombol Mengerti di pojok kanan bawah.
                    </span>
                </div>
            </div>

            <textarea v-if="indexSoal == 1" v-model="soal1" rows="2" class="p-3 border rounded-lg border-[#667084] text-[#667084] outline-none" placeholder="Masukan jawaban disini..."></textarea>
            <textarea v-if="indexSoal == 2" v-model="soal2" rows="2" class="p-3 border rounded-lg border-[#667084] text-[#667084] outline-none" placeholder="Masukan jawaban disini..."></textarea>

            <div class="flex items-center gap-1">
                <span v-if="indexSoal !== 3" class="text-[#f04437] text-xl font-normal font-['Roboto'] leading-normal"><PhWarningCircle/></span>
                <span v-if="indexSoal == 1" class="text-[#f04437] text-base font-normal font-['Roboto'] leading-normal">
                    Jawaban yang benar adalah “menabur”. Maka, isi angka 5 pada form jawaban diatas
                </span>
                <span v-if="indexSoal == 2" class="text-[#f04437] text-base font-normal font-['Roboto'] leading-normal">
                    Jawabannya adalah Rp.92. Isi lah angka ’Rp. 92’ pada form jawaban diatas.
                </span>
            </div>

            <div class="flex justify-between items-center">
                <button @click="btnAction('back')" class="hover:shadow-2xl hover:-translate-x-1 transition-all h-11 pl-4 pr-6 py-1.5 rounded-full border border-[#3030f8] justify-center items-center gap-3 inline-flex">
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_left.svg" alt="icon">
                    </div>
                    <div class="text-[#3030f8] text-base font-normal font-['Roboto'] leading-normal">Kembali</div>
                </button>

                <button @click="btnAction('next')" class="hover:shadow-2xl hover:translate-x-1 transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full justify-center items-center gap-3 inline-flex">
                    <div class="text-white text-base font-normal font-['Roboto'] leading-normal">
                        {{ indexSoal !== 3 ? 'Selanjutnya' : 'Mengerti' }}
                    </div>
                    <div class="w-6 h-6 relative">
                        <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                    </div>
                </button>
            </div>  
        </div>
    </div>
</template>

<script setup>
import { PhWarningCircle } from '@phosphor-icons/vue';
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore()

const indexSoal = ref(1)

const soal1 = ref('')
const soal2 = ref('')

const btnAction = (param) => {
    switch (param) {
        case 'next':
            if(indexSoal.value < 3){
                indexSoal.value++
            } else if(indexSoal.value == 3){
                store.commit('setContohSoalIQ', false)
                localStorage.setItem('isInstruksi', false)
            }
            break;
    
        case 'back':
            if(indexSoal.value > 1) indexSoal.value--
            break;
    }
}
</script>