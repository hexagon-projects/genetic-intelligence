<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <button 
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.dashboard'}"
        >
        <div class="self-center">
            <img :class="{'grayscale': $route.name !== 'user.views.deteksi'
                   || $route.name !== 'user.views.assesment'
                   || $route.name !== 'user.views.cpm'
                   || $route.name !== 'user.views.psikotest'
                   || $route.name !== 'user.views.test_gadget'
                   || $route.name !== 'user.views.iq', 
                'grayscale-0': $route.name == 'user.views.deteksi'
                   || $route.name == 'user.views.cpm'
                   || $route.name == 'user.views.assesment'
                   || $route.name == 'user.views.psikotest'
                   || $route.name == 'user.views.test_gadget'
                   || $route.name == 'user.views.iq'
                }" 
                src="@/assets/icons/lakukan-tes.svg" alt="icon">
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.cpm'
                   || $route.name !== 'user.views.assesment'
                   || $route.name !== 'user.views.psikotest'
                   || $route.name !== 'user.views.test_gadget'
                   || $route.name !== 'user.views.iq', 
                   'text-black':
                    $route.name == 'user.views.deteksi'
                   || $route.name == 'user.views.cpm'
                   || $route.name == 'user.views.assesment'
                   || $route.name == 'user.views.psikotest'
                   || $route.name == 'user.views.test_gadget'
                   || $route.name == 'user.views.iq'
                }" 
                class="font-roboto block text-xs">Lakukan Tes</span>
    </button>

    <button 
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.dashboard'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.hasil_deteksi'
                    || $route.name !== 'user.views.hasil_cpm'
                    || $route.name !== 'user.views.hasil_assessment'
                    || $route.name !== 'user.views.hasil_iq', 'grayscale-0': $route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_iq'
                    }" 
                src="@/assets/icons/hasil-tes.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.hasil_deteksi'
                    || $route.name !== 'user.views.hasil_cpm'
                    || $route.name !== 'user.views.hasil_assessment'
                    || $route.name !== 'user.views.hasil_iq', 
                   'text-black':
                   $route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_iq'
                }" 
                class="font-roboto block text-xs">Hasil Tes</span>
    </button>

    <RouterLink :to="{name: 'user.views.reservasi'}" 
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.reservasi'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.reservasi', 'grayscale-0': $route.name == 'user.views.reservasi'}" 
                src="@/assets/icons/reservasi.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.reservasi', 'text-black': $route.name == 'user.views.reservasi'}" 
        class="font-roboto block text-xs">Reservasi</span>
    </RouterLink>

    <button 
        class="w-full flex flex-col gap-2 justify-center text-center pt-2 pb-1"
        :class="{'font-medium' : $route.name === 'user.views.reservasi'}"
        >
        <div class="self-center">
            <img class="transition-all duration-100" 
                :class="{'grayscale': $route.name !== 'user.views.reservasi', 'grayscale-0': $route.name == 'user.views.reservasi'}" 
                src="@/assets/icons/nav-lainya.svg" alt="icon"/>
        </div>
        <span :class="{'text-[#667085]': $route.name !== 'user.views.reservasi', 'text-black': $route.name == 'user.views.reservasi'}" 
        class="font-roboto block text-xs">Lainya</span>
    </button>
</template>