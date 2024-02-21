<template>
    <div class="hidden lg:block relative w-1/2 top-4 mx-auto shadow-xl rounded-md bg-white">
        <!-- Modal body -->
        <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Contoh Soal</h1>
        <hr class="mt-4">
        <div class="w-full p-4 mx-auto max-h-[460px] overflow-y-scroll">
            <div>
                <div class="flex flex-col">
                    <h1 class="text-dark text-md font-myFont font-medium mb-2">Perhatikan satu contoh pertanyaan yang terisi dengan benar:</h1>
                    <div class="mb-4 flex flex-col">
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
                    </div>
                    
                </div>
            </div>
        </div>
        <hr class="pt-4">
        <!-- Modal footer -->
        <div class="px-4 py-2 flex justify-end items-center space-x-4">
            <button @click="mengerti"
            :disabled="buttonDisabled"
            :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
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

export default {
    name: 'ModalIQPetunjuk',
    setup(_, { emit }){
        const store = useStore()

        const soal1 = ref('')
        const soal2 = ref('')
        const soal3 = ref('')

        const initModal = () => {
            emit('init');
        };

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
            soal1,
            soal2,
            soal3,
            buttonDisabled,
            mengerti,
            initModal
        }
    }
}
</script>