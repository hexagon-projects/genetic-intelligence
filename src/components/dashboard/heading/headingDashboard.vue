<template>
    <div class="lg:w-3/4">
        <div class="min-h-full gradasi shadow-sm flex flex-col md:flex-row lg:flex-row lg:justify-between items-center rounded-2xl gap-4 px-12 py-12">
            <div class="w-full flex flex-col gap-2">
                <img src="../../../assets/img/blogging-bro-crop.png" class="-mt-4 mx-auto lg:items-start w-full" alt="">
                <div class="block lg:hidden">
                    <h1 class="font-myFont font-normal text-center text-clip text-lg lg:text-3xl text-white">Selamat Datang Kembali!</h1>
                    <h1 class="font-myFont font-normal text-center text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
            </div>
            <div class="w-full z-5 flex flex-col gap-1">
                <div class="hidden lg:block">
                    <h1 class="font-myFont font-normal text-start text-clip text-lg lg:text-sm text-white">Selamat datang kembali !</h1>
                    <!-- <h1 class="font-myFont font-normal text-start text-clip text-lg lg:text-xl text-white">Kembali !</h1> -->
                    <h1 class="font-myFont font-semibold text-start text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
                <div class="bg-[#1fabee] bg-opacity-45 rounded-2xl p-4 lg:-mr-6 gap-8">
                    <div class="w-full">
                        <h1 class="font-myFont font-bold text-xl lg:text-base text-white">Siapa Dirimu?</h1>
                        <p class="font-myFont font-light text-sm lg:text-sm text-white">{{ userResultDetect.gim.type }}</p>
                    </div>
                    <hr class="mt-2 mb-1 opacity-50 w-3/4">
                    <div class="w-full">
                        <h1 class="font-myFont font-bold text-xl lg:text-base text-white">Sistem Otak Dominan</h1>
                        <p class="font-myFont font-light text-sm lg:text-sm text-white">{{ userResultDetect.gim.dominance_op_system }}</p>
                    </div>
                </div>
            </div>
            <div class="hidden lg:block border-l mt-[56px] ml-8 -mr-8">
                <br>
                <br>
                <br>
                <br>
                <br>
                <br>
            </div>
            <div class="w-full flex flex-col gap-4 lg:pl-6 ml-4">
                <div class="w-full lg:mt-[56px]">
                    <h1 class="mb-2 font-myFont font-bold text-xl lg:text-base text-white">Kata Kunci</h1>
                    <p class="mb-2 font-myFont font-light text-wrap text-sm lg:text-sm text-light">{{ userResultDetect.gim.keyword }}</p>
                    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="text-sm w-1/2 md:w-3/5 lg:w-3/5 flex justiy-between items-center gap-2 px-4 py-2 bg-[#1fabee] bg-opacity-80 backdrop-blur-3xl rounded-lg font-myFont text-light hover:text-light hover:bg-[#1fabee]">
                        Lihat Detail
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
    name: 'HeadingDashboard',
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
.gradasiwakwaw {
    background: rgb(107,222,180);
background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);  
}

.gradasi {
    background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%); 
}
</style>