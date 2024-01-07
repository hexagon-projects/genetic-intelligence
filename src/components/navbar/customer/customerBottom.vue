<template>
        <RouterLink :to="{name: 'user.views.deteksi'}" 
            class="w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.deteksi'}"
            >
            <div class="self-center">
                <PhTarget :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Deteksi</span>
        </RouterLink>
        <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
            class="w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.hasil_deteksi'}"
            >
            <div class="self-center">
                <PhFileText :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Hasil</span>
        </RouterLink>
        <RouterLink :to="{name: 'user.views.profile'}" 
            class="w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.profile'}"
            >
            <div class="self-center">
                <PhUser :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Profil</span>
        </RouterLink>
</template>

<script>
import {  PhTarget, PhFileText, PhUser } from "@phosphor-icons/vue";

export default {
    name: 'customerBotNav',
    components: {
        PhTarget,
        PhFileText,
        PhUser
    }
}
</script>