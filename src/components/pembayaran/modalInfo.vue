<template>
    <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal"
    >
        <div class="hidden lg:block relative w-3/4 top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="w-full my-4 p-4 flex flex-col">
                <a class="my-4 mx-auto bg-warning px-6 py-6 rounded-full"><PhWarning size="38" fill="white"/></a>
                <div class="text-center">
                    <h3 class="uppercase md:text-2xl text-base text-gray-900 font-semibold text-center">Perhatian</h3>
                    <p class="text-gray-600 my-2">
                        Untuk melakukan Test {{ payment_type }}, Harap melakukan pembayaran terlebih dahulu.
                    </p>

                    <div class="pb-4 pt-6 text-center">
                        <button @click="mengerti" class="rounded-lg font-myFont px-12 bg-biru hover:bg-opacity-75 hover:shadow-lg text-white font-medium py-3">
                        Mengerti
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="block lg:hidden relative w-full top-10 mx-auto shadow-xl rounded-md bg-white">
            <!-- Modal body -->
            <div class="w-full p-4 flex flex-col">
                <a class="my-4 mx-auto bg-warning px-6 py-6 rounded-full"><PhWarning size="38" fill="white"/></a>
                <div class="text-center">
                    <h3 class="uppercase text-lg text-gray-900 font-semibold text-center">Perhatian</h3>
                    <p class="text-gray-600 my-2 text-sm">
                        Untuk melakukan Test {{ payment_type }}, Harap melakukan pembayaran terlebih dahulu.
                    </p>

                    <div class="pb-4 pt-6 text-center">
                        <button @click="mengerti" class="rounded-lg font-myFont px-4 bg-biru hover:bg-opacity-75 hover:shadow-lg text-sm text-white font-medium py-2">
                        Mengerti
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { PhWarning } from '@phosphor-icons/vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

// const props = defineProps({
//   payment_type: String,
// })
const payment_type = ref(route.params.tipePembayaran == 'test-iq' 
    ? 'IQ' 
    : route.params.tipePembayaran == 'test-gim' 
    ? 'Genetic Intelligence Mapping' : 'Assessment')

const emit = defineEmits(['understand'])

const mengerti = () => {
    emit('understand')
}

onMounted(() => {
    
})
</script>