<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-3/4 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="flex items-center mx-4 pt-4 gap-1">
                <a class="text-2xl text-dark"><PhInfo/></a>
                <h1 class="font-myFont text-dark text-lg">Kebijakan Privasi</h1>
            </div>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div class="w-full flex flex-wrap -mx-3 mb-6">
                    <div class="w-full text-sm flex flex-col gap-4 px-3 mb-6 md:mb-0">
                        <p class="font-myFont text-neutral-500">
                            Sebelum Anda melanjutkan untuk menggunakan layanan kami, kami meminta Anda untuk membaca dan menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami. 
                        </p>

                        <p class="font-myFont text-neutral-500">
                            Dengan menggunakan aplikasi kami, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan yang berlaku serta memberikan persetujuan atas pengumpulan dan penggunaan data Anda sesuai dengan Kebijakan Privasi kami. 
                        </p>

                        <p class="font-myFont text-neutral-500 mb-6">
                            Kami akan melindungi privasi dan keamanan informasi Anda dengan sungguh-sungguh. 
                        </p>
                    </div>

                    <div class="w-full text-sm flex items-center gap-1 px-3 md:mb-0">
                        <label class="block font-myFont text-neutral-500 text-xs md:text-sm lg:text-sm font-medium">
                            <input v-model="checkSetuju" class="h-4 w-4 text-black" type="checkbox" name="jawabanAssessment">
                            Jika anda menyetujui persyaratan diatas silahkan centang tombol berikut.
                        </label>
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="tidakSetuju" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="setuju"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Setuju
                </button>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="flex items-center mx-4 pt-4 gap-1">
                <a class="text-2xl text-dark"><PhInfo/></a>
                <h1 class="font-myFont text-dark text-lg">Kebijakan Privasi</h1>
            </div>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div class="w-full text-xs flex flex-col gap-4 mx-1 mb-6">
                    <p class="font-myFont text-neutral-500">
                        Sebelum Anda melanjutkan untuk menggunakan layanan kami, kami meminta Anda untuk membaca dan menyetujui Syarat dan Ketentuan serta Kebijakan Privasi kami. 
                    </p>

                    <p class="font-myFont text-neutral-500">
                        Dengan menggunakan aplikasi kami, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan yang berlaku serta memberikan persetujuan atas pengumpulan dan penggunaan data Anda sesuai dengan Kebijakan Privasi kami. 
                    </p>

                    <p class="font-myFont text-neutral-500">
                        Kami akan melindungi privasi dan keamanan informasi Anda dengan sungguh-sungguh. 
                    </p>
                </div>

                <div class="w-full text-sm flex items-center gap-1 px-1 md:mb-0">
                    <label class="block font-myFont text-neutral-500 text-xs md:text-sm lg:text-sm font-medium">
                        <input v-model="checkSetuju" type="checkbox" name="jawabanAssessment">
                        Jika anda menyetujui persyaratan diatas silahkan centang tombol berikut.
                    </label>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="tidakSetuju" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="setuju"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Setuju
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { PhInfo } from '@phosphor-icons/vue';

export default {
    name: 'ModalConsent',
    components: {PhInfo},
    setup(_, { emit }){
        const router = useRouter()

        const checkSetuju = ref('')

        const setuju = () => {
            console.log(`setuju`)
            emit('isSetuju')
        }

        const tidakSetuju = () => {
            router.push('/')
        }

        const buttonDisabled = computed(() => {
            if(!checkSetuju.value){
                return true
            } else {
                return false
            }
        })

        return {
            checkSetuju,
            setuju,
            tidakSetuju,
            buttonDisabled
        }
    }
}
</script>