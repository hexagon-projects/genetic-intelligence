<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-1/2 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">
               {{ method == 'update' ? 'Ubah Data Sekolah / Perguruan Tinggi' : 'Tambah Data Sekolah / Perguruan Tinggi' }} 
            </h1>
            <hr class="mt-4">
            
            <div :class="{'h-[240px]': loadingAdd}" class="w-full p-3">
                <div v-if="loadingAdd" class="h-full flex flex-col items-center justify-center w-full">
                    <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                </div>

                <div v-else-if="!loadingAdd" class="w-full flex flex-col gap-4">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="nama_sekolah" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Nama Sekolah / Perguruan Tinggi
                        </label>
                        <input v-model="name" id="nama_sekolah" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Sekolah / Perguruan Tinggi">
                    </div>
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="type" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Type
                        </label>
                        <input v-model="type" id="type" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="SD/SMP/SMA/SMK/Perguruan Tinggi">
                    </div>
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="region" class="block tracking-wide font-myFont text-dark font-sm mb-2">
                            Region
                        </label>
                        <input v-model="region" id="region" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Kota Bandung">
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="register"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Submit
                </button>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <h1 class="font-myFont text-dark text-lg mx-4 pt-4">Tambah Sekolah / Perguruan Tinggi</h1>
            <hr class="mt-4">
            
            <div class="w-full p-4">
                <div v-if="loadingAdd" class="h-full flex flex-col items-center justify-center w-full">
                    <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                </div>

                <div v-else-if="!loadingAdd" class="w-full flex flex-col">
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="nama_sekolah" class="block tracking-wide font-myFont text-sm lg:text-base text-dark font-sm mb-2">
                            Nama Sekolah / Perguruan Tinggi
                        </label>
                        <input v-model="name" id="nama_sekolah" class="appearance-none block w-full bg-gray-200 text-sm lg:text-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Nama Sekolah / Perguruan Tinggi">
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                    <div class="w-full px-3 mb-6 md:mb-0">
                        <label for="type" class="block tracking-wide font-myFont text-sm lg:text-base text-dark font-sm mb-2">
                            Type
                        </label>
                        <input v-model="type" id="type" class="appearance-none block w-full bg-gray-200 text-sm lg:text-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="SD/SMP/SMA/SMK/Perguruan Tinggi">
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                    <div class="w-full px-3 md:mb-0">
                        <label for="region" class="block tracking-wide font-myFont text-sm lg:text-base text-dark font-sm mb-2">
                            Region
                        </label>
                        <input v-model="region" id="region" class="appearance-none block w-full bg-gray-200 text-sm lg:text-base text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-biru" type="text" placeholder="Kota Bandung">
                        <!-- <p class="text-red-500 text-xs italic">Please fill out this field.</p> -->
                    </div>
                </div>
            </div>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">Tutup</button>
                <button @click="register"
                    :disabled="buttonDisabled" 
                    :class="{'bg-gray-600 opacity-80 cursor-not-allowed': buttonDisabled}"
                    class="rounded-lg px-4 py-2 bg-biru text-light font-myFont hover:bg-opacity-75 hover:shadow-md">
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['detailSiswa'],
    setup(props, { emit }){
        console.log(`props siswa`, props)

        const closeModal = () => {
            emit('toggleModal')
        }

        return {
            closeModal
        }
    }
}
</script>