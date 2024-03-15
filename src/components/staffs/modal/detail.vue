<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-3/4 top-6 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
           
            <modalLg :detailSiswa="props.detailSiswa"/>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                    Tutup
                </button>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-1 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            
            <modalSm :detailSiswa="props.detailSiswa"/>

            <hr class="pt-4">
            <!-- Modal footer -->
            <div class="px-4 py-4 flex justify-between items-center space-x-4">
                <button @click="closeModal" class="bg-gray-300 font-myFont text-black p-2 rounded-md hover:shadow-lg hover:opacity-80 transition duration-300 ease-in-out">
                    Tutup
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import modalLg from './modal_lg/modalLg.vue'
import modalSm from './modal_sm/modalSm.vue'

export default {
    components: {modalLg, modalSm},
    props: ['detailSiswa'],
    setup(props, { emit }){
        console.log(`props siswa`, props)

        const closeModal = () => {
            emit('toggleModal')
        }

        return {
            props,
            closeModal
        }
    }
}
</script>