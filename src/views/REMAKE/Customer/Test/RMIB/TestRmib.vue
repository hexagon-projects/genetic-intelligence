<template>

    <Layout>
        <div class="mx-0 lg:mx-[40px] mb-3 h-5 p-7 justify-center items-center gap-2 inline-flex">
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Beranda</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="text-[#3030f8] text-sm font-normal font-roboto leading-tight">Lakukan Tes</div>
            <div class="w-4 h-4 relative opacity-75">
                <img src="@/assets/img/chevron_forward.svg">
            </div>
            <div class="opacity-75 text-black text-sm font-normal font-roboto leading-tight">Test RMIB</div>
        </div>

        <section class="pb-[34px] w-full bg-white">
            <transition name="fade" mode="out-in">
                <div class="fixed z-[999] inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 modal">
                    <KebijakanPrivasi/>
                </div>
            </transition>

            <div  class="mb-[48px] w-full flex justify-center items-center">
                <!-- <SoalTest/> -->
                <!-- <SoalTestEs/> -->

            </div>
        </section>
    </Layout>
</template>

<script setup>
import Layout from '@/Layout/Customer/Layout.vue';
import 'sweetalert2/dist/sweetalert2.css';
import KebijakanPrivasi from '@/components/REMAKE/Modal/KebijakanPrivasi/KebijakanPrivasi.vue';
// import SoalTest from './SoalRmib.vue'
// import SoalTestEs from './SoalEssayRmib.vue'

</script>

<style scoped>
.preloader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease, height 0.5s ease;
}
.preloader-overlay.hidden {
    opacity: 0;
    height: 0;
    overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>