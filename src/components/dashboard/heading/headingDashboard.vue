<template>
    <div class="lg:w-3/4">
        <div class="min-h-full gradasi shadow-sm flex flex-col md:flex-row lg:flex-row lg:justify-between items-center rounded-2xl gap-4 px-12 py-12">
            <div class="w-full flex flex-col gap-2">
                <img src="../../../assets/img/blogging-bro-crop.png" class="-mt-4 mx-auto lg:items-start w-9/12" alt="">
                <div class="hidden lg:block">
                    <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-xl text-white">Selamat Datang</h1>
                    <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-xl text-white">Kembali !</h1>
                    <h1 class="font-poppins font-normal text-start text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
                <div class="block lg:hidden">
                    <h1 class="font-poppins font-normal text-center text-clip text-lg lg:text-3xl text-white">Selamat Datang Kembali!</h1>
                    <h1 class="font-poppins font-normal text-center text-clip text-lg lg:text-3xl text-white">{{ userData.name }}</h1>
                </div>
            </div>
            <div class="w-full z-5 flex flex-col bg-white bg-opacity-50 backdrop-blur-3xl rounded-2xl p-4 lg:-mr-6 gap-8">
                <div class="w-full">
                    <h1 class="mb-2 font-poppins font-semibold text-xl lg:text-2xl text-dark">Siapa Dirimu?</h1>
                    <p class="font-poppins font-light text-sm lg:text-md text-dark">{{ userResultDetect.gim.type }}</p>
                </div>
                <div class="w-full">
                    <h1 class="mb-2 font-poppins font-semibold text-xl lg:text-2xl text-dark">Sistem Otak Dominan</h1>
                    <p class="font-poppins font-light text-sm lg:text-md text-dark">{{ userResultDetect.gim.dominance_op_system }}</p>
                </div>
            </div>
            <hr class="">
            <div class="w-full flex flex-col gap-4 lg:border-l lg:pl-6 ml-4">
                <div class="w-full">
                    <h1 class="mb-2 font-myFont font-semibold text-xl lg:text-2xl text-white">Kata Kunci</h1>
                    <p class="mb-2 font-myFont font-light text-wrap text-sm lg:text-md text-light">{{ userResultDetect.gim.keyword }}</p>
                    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="w-1/2 md:w-3/5 lg:w-3/5 flex justiy-between items-center gap-2 px-4 py-2 bg-white bg-opacity-50 backdrop-blur-3xl rounded-lg font-myFont text-dark hover:text-light hover:bg-[#1fabee]">
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
.gradasi {
    background: rgb(107,222,180);
background: linear-gradient(90deg, rgba(107,222,180,1) 19%, rgba(78,221,209,1) 66%, rgba(31,171,238,1) 97%);  
}
</style>