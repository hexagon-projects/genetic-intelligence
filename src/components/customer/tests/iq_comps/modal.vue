<template>
    <div class="hidden lg:block relative w-full top-4 mx-auto shadow-xl rounded-md bg-white">
        <!-- Modal body -->
        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Contoh Soal</h1>
        <hr class="mt-4">
        <div class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
            <div>
                <div class="flex flex-col">
                    <h1 class="text-dark text-center text-md font-myFont font-medium mb-4">Perhatikan satu contoh pertanyaan yang terisi dengan benar:</h1>
                    <!-- <div class="mb-4 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-sm">1. MENUAI adalah lawan kata dari...</span>
                        <span class="font-myFont text-xs text-dark font-medium mb-1">
                            1. mendapat    2.  bersorak       3. melanjutkan     4. berada       5. menabur
                        </span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal1" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">Jawaban yang benar adalah “menabur”. Maka, isi angka 5 pada form jawaban diatas</span>
                    </div>
                    <div class="mb-4 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-sm">2. Harga setiap kotak paper clip adalah 23 rupiah. Berapa harga 4 kotak?...</span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal2" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">Jawabannya adalah Rp.92. Isi lah angka ’Rp. 92’ pada form jawaban diatas.</span>
                    </div>
                    <div class="mb-4 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-sm">3. MINER MINOR   -  Apakah kata-kata ini...</span>
                        <span class="font-myFont text-xs text-dark font-medium mb-1">
                            1. memiliki arti sama   2. memiliki arti berlawanan      3. tidak memiliki arti sama atau berlawanan
                        </span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal3" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">
                            Jawaban yang benar adalah ‘tidak memiliki arti sama atau berlawanan (Nomor 3). Maka isi lah 3 pada form jawaban diatas.
                        </span>
                    </div> -->
                    <div class="mt-4 flex justify-center items-center gap-12 h-[116px] w-full">
                        <button @click="btnInstruksi('prev')" :class="{'opacity-50': indexInstruksi == 0}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <transition name="fade" mode="out-in">
                            <div v-if="indexInstruksi == 0" class="mb-4 flex flex-col">
                                <span class="font-myFont font-medium text-dark text-md">MENUAI adalah lawan kata dari...</span>
                                <span class="font-myFont text-md text-dark font-medium mb-1">
                                    1. mendapat    2.  bersorak       3. melanjutkan     4. berada       5. menabur
                                </span>
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="font-myFont text-md text-dark font-medium">Jawaban: </span>
                                    <input v-model="soal1" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                                </div>
                                <span class="font-myFont font-medium text-dark text-xs">*Jawaban yang benar adalah “menabur”. Maka, isi angka 5 pada form jawaban diatas</span>
                            </div>

                            <div v-else-if="indexInstruksi == 1" class="mb-4 flex flex-col">
                                <span class="font-myFont font-medium text-dark text-md">Harga setiap kotak paper clip adalah 23 rupiah. Berapa harga 4 kotak?...</span>
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="font-myFont text-md text-dark font-medium">Jawaban: </span>
                                    <input v-model="soal2" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                                </div>
                                <span class="font-myFont font-medium text-dark text-xs">*Jawabannya adalah Rp.92. Isi lah angka ’Rp. 92’ pada form jawaban diatas.</span>
                            </div>
                            
                            <div v-else-if="indexInstruksi == 2" class="mb-4 flex flex-col">
                                <span class="font-myFont font-medium text-dark text-md">MINER MINOR   -  Apakah kata-kata ini...</span>
                                <span class="font-myFont text-md text-dark font-medium mb-1">
                                    1. memiliki arti sama   2. memiliki arti berlawanan      3. tidak memiliki arti sama atau berlawanan
                                </span>
                                <div class="flex items-center gap-1 mb-2">
                                    <span class="font-myFont text-md text-dark font-medium">Jawaban: </span>
                                    <input v-model="soal3" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                                </div>
                                <span class="font-myFont font-medium text-dark text-xs">
                                    *Jawaban yang benar adalah ‘tidak memiliki arti sama atau berlawanan (Nomor 3). Maka isi lah 3 pada form jawaban diatas.
                                </span>
                            </div>
                        </transition>
                        <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 2}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <hr class="pt-4">
        <!-- Modal footer -->
        <div class="px-4 py-2 flex justify-end items-center space-x-4">
            <button @click="mengerti"
            :disabled="buttonDisabled"
            :class="{'bg-gray-600 opacity-80 cursor-not-allowed hover:shadow-md hover:bg-neutral-400': buttonDisabled}" class="bg-biru text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
                Mengerti
            </button>
        </div>
    </div>

    <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
        <!-- Modal body -->
        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Contoh Soal</h1>
        <hr class="mt-4">
        <div class="flex flex-col justify-center items-center overflow-x-scroll">
            <h1 class="text-dark text-center text-sm font-myFont font-medium my-4">Perhatikan satu contoh pertanyaan yang terisi dengan benar:</h1>
            <div class="mt-4 flex justify-center items-center gap-12 h-[116px] w-full">
                <transition name="fade" mode="out-in">
                    <div v-if="indexInstruksi == 0" class="mb-4 mx-2 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-xs">MENUAI adalah lawan kata dari...</span>
                        <span class="font-myFont text-xs text-dark font-medium mb-1">
                            1. mendapat    2.  bersorak       3. melanjutkan     4. berada       5. menabur
                        </span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal1" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">*Jawaban yang benar adalah “menabur”. Maka, isi angka 5 pada form jawaban diatas</span>
                    </div>

                    <div v-else-if="indexInstruksi == 1" class="mb-4 mx-2 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-xs">Harga setiap kotak paper clip adalah 23 rupiah. Berapa harga 4 kotak?...</span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal2" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">*Jawabannya adalah Rp.92. Isi lah angka ’Rp. 92’ pada form jawaban diatas.</span>
                    </div>
                    
                    <div v-else-if="indexInstruksi == 2" class="mb-4 mx-2 flex flex-col">
                        <span class="font-myFont font-medium text-dark text-xs">MINER MINOR   -  Apakah kata-kata ini...</span>
                        <span class="font-myFont text-xs text-dark font-medium mb-1">
                            1. memiliki arti sama   2. memiliki arti berlawanan      3. tidak memiliki arti sama atau berlawanan
                        </span>
                        <div class="flex items-center gap-1 mb-2">
                            <span class="font-myFont text-xs text-dark font-medium">Jawaban: </span>
                            <input v-model="soal3" type="text" class="text-sm appearance-none block bg-white text-gray-700 border border-gray-200 rounded py-[1px] px-2 leading-tight focus:outline-none focus:border-biru">
                        </div>
                        <span class="font-myFont font-medium text-dark text-xs">
                            *Jawaban yang benar adalah ‘tidak memiliki arti sama atau berlawanan (Nomor 3). Maka isi lah 3 pada form jawaban diatas.
                        </span>
                    </div>
                </transition>
            </div>
            <div class="w-3/4 flex justify-between items-center my-4">
                <button @click="btnInstruksi('prev')" :class="{'opacity-50': indexInstruksi == 0}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                    <PhCaretLeft/>
                </button>
                <div class="mx-4 flex items-center gap-2">
                    <span :class="{'bg-dark': indexInstruksi == 0, 'bg-neutral-400': indexInstruksi !== 0}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    <span :class="{'bg-dark': indexInstruksi == 1, 'bg-neutral-400': indexInstruksi !== 1}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                    <span :class="{'bg-dark': indexInstruksi == 2, 'bg-neutral-400': indexInstruksi !== 2}" class="text-start w-2.5 h-2.5 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <button @click="btnInstruksi('next')" :class="{'opacity-50': indexInstruksi == 2}" class="bg-biru shadow-sm p-2 text-white text-lg rounded-full hover:bg-opacity-75">
                    <PhCaretRight/>
                </button>
            </div>
        </div>
        <hr class="pt-4">
        <!-- Modal footer -->
        <div class="px-4 py-2 flex justify-between items-center space-x-4">
            <button class="bg-biru text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition" @click="toggleModal">Tutup</button>
            <button @click="mengerti"
            :disabled="buttonDisabled"
            :class="{'bg-gray-600 opacity-80 cursor-not-allowed hover:shadow-md hover:bg-neutral-400': buttonDisabled}" class="bg-biru text-white px-4 py-2 rounded-md hover:bg-opacity-75 transition">
                Mengerti
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { ref, computed } from 'vue';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { PhCaretLeft, PhCaretRight } from '@phosphor-icons/vue';

export default {
    name: 'ModalIQPetunjuk',
    components: {PhCaretLeft, PhCaretRight},
    setup(_, { emit }){
        const indexInstruksi = ref(0)

        const store = useStore()

        const soal1 = ref('')
        const soal2 = ref('')
        const soal3 = ref('')

        const initModal = () => {
            emit('init');
        };

        const btnInstruksi = (params) => {
            if (params === 'next' && indexInstruksi.value < 2) {
                indexInstruksi.value += 1
            } else if (params === 'prev' && indexInstruksi.value > 0) {
                indexInstruksi.value -= 1
            }
        }

        const mengerti = () => {
            Swal.fire({
              icon: 'question',
              title: 'Sudah mengerti?',
              text: 'Jika sudah mengerti klik tombol OK.',
              showConfirmButton: true,
              showCancelButton: true,
              confirmButtonColor: "#0b40f4",
              confirmButtonText: "OK",
              cancelButtonColor: "#3b3f5c",
              cancelButtonText: "Batal",
            }).then((result) => {
                if (result.isConfirmed) {
                    store.commit('setIsUnderstand', true);
                    initModal()
                }
            })
        }

        const buttonDisabled = computed(() => {
            if(
                !soal1.value ||
                !soal2.value ||
                !soal3.value
            ){
                return true
            } else {
                return false
            }
        })

        return {
            indexInstruksi,
            soal1,
            soal2,
            soal3,
            buttonDisabled,
            mengerti,
            initModal,
            btnInstruksi
        }
    }
}
</script>