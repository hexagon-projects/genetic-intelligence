<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold dark:text-white-dark">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.reservasi'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-7 mb-4 pt-4 gap-4">
           <PilihHari/>
        </div>

        <!-- <div class="mx-7 bg-white rounded-lg shadow-lg p-4">
            <div class="flex flex-col md:flex-row lg:flex-row items-center">
                <div class="md:w-full lg:w-1/2 mb-2">
                    <div class="flex flex-col mx-1 lg:mx-9">
                        <h1 class="mb-2 font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Berikut adalah detail reservasi kamu</h1>
                        <hr class="mb-2 lg:hidden">
                        <span class="flex items-center gap-1 font-myFont text-dark text-sm md:text-lg lg:text-lg">
                            <PhUser/> Badrol Sipahutar
                        </span>
                        <span class="flex items-center gap-1 font-myFont text-dark text-sm md:text-lg lg:text-lg">
                            <PhTimer/> 90 Menit
                        </span>
                        <span class="flex items-center gap-1 font-myFont text-dark text-sm md:text-lg lg:text-lg">
                            <PhCalendar/> 01 {{ month }} {{ year }}
                        </span>
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/reservasi.gif" class="w-1/2 lg:w-96 self-end md:self-center lg:self-center" alt="No Data Found">
                    </div>
                </div>
            </div>
        </div> -->
    </section>
</template>

<script>
import initAPI from '../../../api/api';
import { ref, computed, onMounted } from 'vue'
import { PhUser, PhTimer, PhCalendar } from '@phosphor-icons/vue';
import PilihHari from './PilihHari/hari.vue'

export default {
    name: 'Reservasi',
    components: {PhUser, PhTimer, PhCalendar, PilihHari},
    setup(){
    }
}
</script>