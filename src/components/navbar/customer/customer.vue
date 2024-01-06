<template>
    <RouterLink :to="{name: 'user.views.deteksi'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont text-dark
            hover:bg-secondary hover:text-light hover:rounded-lg hover:shadow-sm
            "
        :class="{'bg-secondary px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.deteksi'}"
        >
        <PhTarget :size="24" weight="duotone" />
        Deteksi GIM
    </RouterLink>
    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
         class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont text-dark
            hover:bg-secondary hover:text-light hover:rounded-lg hover:shadow-sm
            "
        :class="{'bg-secondary px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi'}"
        >
        <PhFileText :size="24" weight="duotone" />
        Hasil Deteksi
    </RouterLink>
    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont text-dark
            hover:bg-secondary hover:text-light hover:rounded-lg hover:shadow-sm
            "
        :class="{'bg-secondary px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi'}"
        >
        <PhCalendarCheck :size="24" weight="duotone" />
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