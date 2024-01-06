<template>
    <RouterLink :to="{name: 'user.views.deteksi'}" 
        class="flex justify-center items-center gap-1 font-myFont text-black"
        :class="{'text-secondary' : $route.name === 'user.views.deteksi'}"
        >
        <PhTarget :size="24" />
        Deteksi GIM
    </RouterLink>
    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
        class="flex justify-center items-center gap-1 font-myFont text-black"
        :class="{'text-secondary' : $route.name === 'user.views.hasil_deteksi'}"
        >
        <PhFileText :size="24" />
        Hasil Deteksi
    </RouterLink>
</template>

<script>
import { PhTarget, PhFileText, PhUser, PhSignOut } from "@phosphor-icons/vue";
export default {
    name: 'CustomerNav',
    components: {
        PhTarget,
		PhFileText,
		PhUser,
		PhSignOut
    }
}
</script>