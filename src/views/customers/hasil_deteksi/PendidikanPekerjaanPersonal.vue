<template>
     <!-- Pekerjaan & Kelebihan -->
    <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="flex flex-row justify-center gap-4 h-auto">
        <div class="hidden lg:block w-4/12">
            <div class="hidden lg:block">
                <div v-if="userResultDetect" class="bg-white rounded-lg shadow-sm p-4 h-[280px]">
                    <div class="self-stretch justify-between items-center inline-flex">
                        <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                            <PhBriefcase :size="28"/>
                        </span>
                    </div>
                    <!-- <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/pekerjaan.png" alt=""> -->
                    <!-- <p class="font-myFont font-semibold text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-2">List pendidikan :</p> -->
                    <div class="mt-2 mb-2">
                        <div class="w-full flex flex-col">
                            <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Pekerjaan yang optimal untukmu</h1>
                            <div class="flex flex-wrap justify-start gap-2">
                                <span
                                v-for="(item, index) in userResultDetect.gim.gim_details.jobs.data"
                                :key="index"
                                class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                                >
                                {{ item }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="hidden lg:block w-8/12">
            <div class="hidden lg:block h-full">
                <div class="bg-white rounded-lg shadow-sm p-4 h-full">
                    <div class="self-stretch justify-between items-center inline-flex">
                        <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                            <PhArrowLineUpRight :size="28"/>
                        </span>
                    </div>
                    <!-- <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kelebihan.png" alt=""> -->
                    <div class="mt-2 mb-2">
                        <div class="w-full flex flex-col">
                            <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Hal yang perlu kamu optimalkan</h1>
                            <p class="text-sm text-gray-600 text-start">
                                {{ userResultDetect.gim.gim_details.excess }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Pendidikan & Kekurangan -->
    <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="flex flex-row justify-center gap-4 h-auto">
        <div class="hidden lg:block w-8/12">
            <div class="hidden lg:block h-full">
                <div class="bg-white rounded-lg shadow-sm p-4 h-full">
                    <div class="self-stretch justify-between items-center inline-flex">
                        <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                            <PhFlag :size="28"/>
                        </span>
                    </div>
                    <!-- <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kekurangan.png" alt=""> -->
                    <div class="mt-2 mb-2">
                        <div class="w-full flex flex-col">
                            <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Hal yang perlu kamu antisipasi</h1>
                            <!-- <div class="text-3xl font-myFont text-secondary text-left leading-tight h-3">“</div> -->
                            <p class="text-sm text-gray-600 text-start">
                                {{ userResultDetect.gim.gim_details.lack }}
                            </p>
                            <!-- <div class="text-3xl font-myFont text-secondary text-right leading-tight h-3 -mt-3">”</div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="hidden lg:block w-4/12">
            <div class="hidden lg:block">
                <div v-if="userResultDetect" class="bg-white rounded-lg shadow-sm p-4 h-full">
                    <div class="self-stretch justify-between items-center inline-flex">
                        <span class="text-biru bg-indigo-500 bg-opacity-10 rounded-lg p-4 mr-2">
                            <PhBank :size="28"/>
                        </span>
                    </div>
                    <!-- <img class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/pendidikan.png" alt=""> -->
                    <!-- <p class="font-myFont font-semibold text-start mx-12 lg:mx-4 text-gray-500 text-sm mb-2">List pendidikan :</p> -->
                    <div class="mt-2 mb-2">
                        <div class="w-full flex flex-col">
                            <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Pendidikan yang optimal untukmu</h1>
                            <div class="flex flex-wrap justify-start gap-2">
                                <span
                                v-for="(item, index) in userResultDetect.gim.gim_details.education.data"
                                :key="index"
                                class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                                >
                                {{ item }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div v-if="userData.is_detected == 'Selesai Terdeteksi'" class="flex lg:hidden flex-col gap-4 -mt-8">
        <!-- Pendidikan & Pekerjaan -->
        <div class="block lg:hidden w-full">
            <div class="bg-white rounded-lg shadow-sm p-4 h-[370px]">
                <div class="flex justify-between">
                    <transition name="fade" mode="out-in">
                        <img v-if="indexSlidePertama == 0" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kelebihan.png" alt="">
                        <img v-else-if="indexSlidePertama == 1" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/kekurangan.png" alt="">
                    </transition>
                    <div class="flex items-center gap-2 -mt-12">
                        <button @click="btnSlide('pertama','prev')" :class="{'opacity-50': indexSlidePertama == 0}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <button @click="btnSlide('pertama','next')" :class="{'opacity-50': indexSlidePertama == 1}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
                
                <transition name="fade" mode="out-in">
                    <div v-if="indexSlidePertama == 0">
                        <div class="block lg:hidden h-full">
                            <div class="mt-2 mb-2">
                                <div class="w-full flex flex-col">
                                    <h1 class="font-myFont text-dark text-lg font-semibold">Hal yang perlu kamu optimalkan</h1>
                                    <p class="text-xs text-gray-600 text-start">
                                        {{ userResultDetect.gim.gim_details.excess }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div v-else-if="indexSlidePertama == 1">
                        <div class="block lg:hidden h-full">
                            <div class="mt-2 mb-2">
                                <div class="w-full flex flex-col">
                                    <h1 class="font-myFont text-dark text-lg font-semibold">Hal yang perlu kamu antisipasi</h1>
                                    <p class="text-xs text-gray-600 text-start">
                                        {{ userResultDetect.gim.gim_details.lack }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <div class="block lg:hidden w-full">
            <div class="bg-white rounded-lg shadow-sm p-4 h-[370px]">
                <div class="flex justify-between">
                    <transition name="fade" mode="out-in">
                        <img v-if="indexSlideKedua == 0" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/pendidikan.png" alt="">
                        <img v-else-if="indexSlideKedua == 1" class="w-24 drop-shadow-2xl shadow-dark -mt-3 mb-2 animate-wiggle" src="../../../assets/img/pekerjaan.png" alt="">
                    </transition>
                    <div class="flex items-center gap-2 -mt-12">
                        <button @click="btnSlide('kedua','prev')" :class="{'opacity-50': indexSlideKedua == 0}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                            <PhCaretLeft/>
                        </button>
                        <button @click="btnSlide('kedua','next')" :class="{'opacity-50': indexSlideKedua == 1}" class="bg-biru shadow-sm p-2 text-white text-sm rounded-full hover:bg-opacity-75">
                            <PhCaretRight/>
                        </button>
                    </div>
                </div>
                
                <transition name="fade" mode="out-in">
                    <div v-if="indexSlideKedua == 0">
                        <div class="block lg:hidden h-full">
                            <div class="mt-2 mb-2">
                                <div class="w-full flex flex-col">
                                    <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Pendidikan yang optimal untukmu</h1>
                                    <div class="flex flex-wrap justify-start gap-2">
                                        <span
                                        v-for="(item, index) in userResultDetect.gim.gim_details.education.data"
                                        :key="index"
                                        class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                                        >
                                        {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        
                    <div v-else-if="indexSlideKedua == 1">
                        <div class="block lg:hidden h-full">
                            <div class="mt-2 mb-2">
                                <div class="w-full flex flex-col">
                                    <h1 class="font-myFont text-dark text-lg font-semibold mb-4">Pekerjaan yang optimal untukmu</h1>
                                    <div class="flex flex-wrap justify-start gap-2">
                                        <span
                                        v-for="(item, index) in userResultDetect.gim.gim_details.jobs.data"
                                        :key="index"
                                        class="px-4 py-2 text-xs text-biru border rounded-full border-biru font-myFont"
                                        >
                                        {{ item }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { PhArrowLineUpRight, PhBank, PhBriefcase, PhCaretLeft, PhCaretRight, PhFlag } from "@phosphor-icons/vue";
import { ref } from 'vue'

export default {
    name: 'accordion',
    components: {PhBank, PhFlag, PhArrowLineUpRight, PhBriefcase, PhCaretLeft, PhCaretRight},
    setup(){
        const userResultDetect = JSON.parse(localStorage.getItem('userResult'))
        const userData = JSON.parse(localStorage.getItem('userData'))

        const indexSlidePertama = ref(0)
        const indexSlideKedua = ref(0)

        const btnSlide = (type, params) => {
            if(type == 'pertama'){
                if (params === 'next' && indexSlidePertama.value < 1) {
                    indexSlidePertama.value += 1
                } else if (params === 'prev' && indexSlidePertama.value > 0) {
                    indexSlidePertama.value -= 1
                }
            } else {
                if (params === 'next' && indexSlideKedua.value < 1) {
                    indexSlideKedua.value += 1
                } else if (params === 'prev' && indexSlideKedua.value > 0) {
                    indexSlideKedua.value -= 1
                }
            }
        }
        return{
            userResultDetect,
            userData,
            indexSlidePertama,
            indexSlideKedua,
            btnSlide
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>