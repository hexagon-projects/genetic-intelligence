<template>
    <RouterLink :to="{name: 'user.views.deteksi'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.deteksi', 'text-dark bg-white': $route.name !== 'user.views.deteksi'}"
        >
        <PhTarget :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.deteksi','text-biru hover:text-light': $route.name !== 'user.views.deteksi'}" />
        Test GIM
    </RouterLink>
    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
         class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi', 'text-dark bg-white': $route.name !== 'user.views.hasil_deteksi'}"
        >
        <PhFileText :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.hasil_deteksi','text-biru hover:text-light': $route.name !== 'user.views.hasil_deteksi'}" />
        Hasil Test
    </RouterLink>
    <RouterLink :to="{name: 'user.views.reservasi'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.reservasi', 'text-dark bg-white': $route.name !== 'user.views.reservasi'}"
        >
        <PhCalendarCheck :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.reservasi','text-biru hover:text-light': $route.name !== 'user.views.reservasi'}" />
        Reservasi
    </RouterLink>
</template>

<script>
import { PhTarget, PhFileText, PhUser, PhCalendarCheck, PhSignOut } from "@phosphor-icons/vue";
export default {
    name: 'CustomerNav',
    components: {
        PhTarget,
		PhFileText,
		PhUser,
        PhCalendarCheck,
		PhSignOut
    }
}
</script>

<style scoped>
.gradasi {
    background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%); 
}
</style>