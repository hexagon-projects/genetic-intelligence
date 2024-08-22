<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-3/4 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="w-full p-4">
                <div class="mb-6 flex w-full flex-wrap">
                    <div class="mx-auto flex flex-col items-center justify-center bg-white">
                    <a class="bg-red-500 mx-auto mt-8 mb-4 rounded-full px-6 py-6"><PhWarning size="38" fill="white" /></a>
                    <div class="text-center">
                        <h3 class="text-center text-base font-semibold text-gray-900 md:text-2xl lg:text-2xl">Perhatian!</h3>
                        <p class="my-2 text-gray-600">Test tidak bisa dilakukan apabila data informasi pribadi belum lengkap, silahkan lengkapi data anda.</p>

                        <div class="gap-2 flex justify-center items-center pb-4 pt-6 text-center">
                        <button @click="editProfile" class="font-myFont bg-biru rounded-lg px-12 py-3 font-medium text-white hover:bg-opacity-75 hover:shadow-lg">
                            Lengkapi Data
                        </button>
                        <button @click="tidakSetuju" class="font-myFont bg-gray-300 rounded-lg px-12 py-3 font-medium text-black hover:bg-opacity-75 hover:shadow-lg">
                            Kembali
                        </button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="w-full p-4">
                <div class="w-full text-xs flex flex-col gap-4 mx-1 mb-6">
                    <a class="bg-red-500 mx-auto mt-8 mb-4 rounded-full px-6 py-6"><PhWarning size="38" fill="white" /></a>
                    <div class="text-center">
                        <h3 class="text-center text-base font-semibold text-gray-900 md:text-2xl lg:text-2xl">Perhatian!</h3>
                        <p class="my-2 text-gray-600">Test tidak bisa dilakukan apabila data informasi pribadi belum lengkap, silahkan lengkapi data anda.</p>

                        <div class="w-3/4 mx-auto flex flex-col gap-2 pb-4 pt-6 text-center">
                        <button @click="editProfile" class="font-myFont bg-biru rounded-lg px-12 py-3 font-medium text-white hover:bg-opacity-75 hover:shadow-lg">
                            Lengkapi Data
                        </button>
                        <button @click="tidakSetuju" class="font-myFont bg-gray-300 rounded-lg px-12 py-3 font-medium text-black hover:bg-opacity-75 hover:shadow-lg">
                            Kembali ke Beranda
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhWarning } from '@phosphor-icons/vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const editProfile = () => {
    router.push({name: 'user.views.profile'})
}

const tidakSetuju = () => {
    router.push('/')
}
</script>