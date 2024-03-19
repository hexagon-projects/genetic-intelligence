<template>
    <div class="hidden lg:flex lg:flex-row items-center">
        <transition name="fade" mode="out-in">
            <ModalConsent v-if="visited" @isSetuju="setuju"/>
        </transition>
        <div class="lg:w-1/2">
            <div class="flex flex-col mx-14">
                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Apakah kamu siap untuk melakukan test?</h1>
                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                <button @click="siaptest" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Test Sekarang
                </button>
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex flex-col justify-center">
                <img src="../../../assets/img/test-assessment.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Siap Test Image">
            </div>
        </div>
    </div>
    <div class="lg:hidden flex flex-col items-center">
        <div class="lg:w-1/2">
            <div class="flex flex-col justify-center">
                <img src="../../../assets/img/test-assessment.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="No Data Found">
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex flex-col">
                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Apakah kamu siap untuk melakukan test?</h1>
                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Test sekarang juga!</p>
                <button @click="siaptest" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Test Sekarang
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'BelumTestAssessment',
    setup(){
        const visited = ref(false)

        const setuju = () => {
            visited.value = false
        }

        onMounted(() => {
            visited.value = true
        })

        return {
            visited,
            setuju
        }
    }
}
</script>