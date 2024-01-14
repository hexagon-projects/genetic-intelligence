<template>
    <RouterLink :to="{name: 'consultant.views.review'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'consultant.views.review', 'text-dark bg-white': $route.name !== 'consultant.views.review'}"
        >
        <PhFileSearch :size="24" weight="duotone" :class="{'text-light': $route.name == 'consultant.views.review','text-biru hover:text-light': $route.name !== 'consultant.views.review'}" />
        Review Test
    </RouterLink>
    <RouterLink :to="{name: 'consultant.views.review'}" 
         class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi', 'text-dark bg-white': $route.name !== 'user.views.hasil_deteksi'}"
        >
        <PhCalendar :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.hasil_deteksi','text-biru hover:text-light': $route.name !== 'user.views.hasil_deteksi'}" />
        Jadwal Reservasi
    </RouterLink>
    <RouterLink v-if="userData.is_detected == 'Selesai Terdeteksi'" :to="{name: 'user.views.reservasi'}" 
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
import { PhFileSearch, PhCalendar } from "@phosphor-icons/vue";
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'ConsultantNav',
    components: {
        PhFileSearch,
		PhCalendar
    },
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData);

        return {
            userData
        }
    }
}
</script>

<style scoped>
.gradasi {
    background: rgb(11,64,244);
background: linear-gradient(162deg, rgba(11,64,244,1) 26%, rgba(2,178,255,1) 82%); 
}
</style>