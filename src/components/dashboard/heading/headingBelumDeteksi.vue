<template>
    <div class="lg:w-3/4">
        <div class="gradasi h-full shadow-sm flex flex-col md:flex-row lg:flex-row lg:justify-between items-center rounded-2xl gap-4 px-12 py-12">
            <div class="w-full h-full mt-6 flex flex-col gap-2">
                <img src="../../../assets/img/welcome-bro(1).png" class="mt-4 mx-auto lg:ml-4 lg:place-self-start w-2/3">
                <div class="block lg:hidden">
                    <h1 class="font-myFont font-normal text-center text-clip text-lg lg:text-3xl text-white">Selamat Datang Kembali!</h1>
                    <h1 class="font-myFont font-normal text-center text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
            </div>
            <hr class="">
            <div class="w-full flex flex-col gap-4 lg:border-l lg:pl-6 lg:-ml-8">
                <div class="hidden lg:block">
                    <h1 class="font-myFont font-normal text-start text-clip text-lg lg:text-sm text-white">Selamat Datang !</h1>
                    <h1 class="font-myFont font-semibold text-start text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
                <div class="w-full">
                    <h1 v-if="userData.is_detected == 'Belum'" class="mb-3 font-myFont font-normal text-xl lg:text-base text-white">
                        Saatnya sekarang kamu untuk melakukan test <span class="italic">Genetic Intelligence Mapping</span> agar kamu mengetahui dan mengenal potensi terbaik yang ada pada diri kamu.
                    </h1>
                    <div v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'">
                        <h1 class="mb-2 flex flex-col font-myFont font-normal text-xl lg:text-sm text-white">
                            Kamu baru saja melakukan test 
                            <span class="italic text-2xl">Genetic Intelligence Mapping</span>
                        </h1>
                    </div>
                    <p v-if="userData.is_detected == 'Belum'" class="mb-2 font-myFont font-bold text-wrap text-sm lg:text-lg text-light">
                        Ayo lakukan test sekarang juga!
                    </p>
                    <p v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="mb-2 font-myFont font-light text-wrap text-sm lg:text-md text-light">
                        Test kamu saat ini sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.
                    </p>
                    <RouterLink :to="{name: 'user.views.deteksi'}" v-if="userData.is_detected == 'Belum'" class="w-3/4 lg:w-1/2 flex justiy-center items-center gap-2 px-4 py-2 bg-[#1fabee] bg-opacity-80 backdrop-blur-3xl rounded-lg font-myFont text-light hover:text-light hover:bg-[#1fabee]">
                        Deteksi Sekarang
                        <PhArrowRight/>
                    </RouterLink>
                    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" v-else-if="userData.is_detected == 'Sudah Disubmit' || userData.is_detected == 'Dalam Review'" class="w-1/2 lg:w-1/3 flex justiy-center items-center gap-2 px-4 py-2 bg-[#1fabee] bg-opacity-80 backdrop-blur-3xl rounded-lg font-myFont text-light hover:text-light hover:bg-[#1fabee]">
                        Cek Status
                        <PhArrowRight/>
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { PhArrowRight } from '@phosphor-icons/vue';
import { useStore } from 'vuex';
import { computed } from 'vue'

export default {
    name: 'HeadingBelumDeteksi',
    components: {PhArrowRight},
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData)
        const userResultDetect = computed(() => store.getters.getUserResultDetect);

        return {
            userData,
            userResultDetect
        }
    }
}
</script>

<style scoped>
.gradasi-old {
    background: rgb(107,222,180);
background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);  
}

.gradasi {
    background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%);
}
</style>