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
    <RouterLink :to="{name: 'consultant.views.permintaan'}" 
    class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'consultant.views.permintaan', 'text-dark bg-white': $route.name !== 'consultant.views.permintaan'}"
        >
        <PhFileSearch :size="24" weight="duotone" :class="{'text-light': $route.name == 'consultant.views.permintaan','text-biru hover:text-light': $route.name !== 'consultant.views.permintaan'}" />
        Permintaan Reservasi
    </RouterLink>
    <RouterLink :to="{name: 'consultant.views.jadwal'}" 
         class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'consultant.views.jadwal', 'text-dark bg-white': $route.name !== 'consultant.views.jadwal'}"
        >
        <PhCalendar :size="24" weight="duotone" :class="{'text-light': $route.name == 'consultant.views.jadwal','text-biru hover:text-light': $route.name !== 'consultant.views.jadwal'}" />
        Jadwal Reservasi
    </RouterLink>
</template>

<script>
import { PhFileSearch, PhCalendar, PhCalendarPlus } from "@phosphor-icons/vue";
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'ConsultantNav',
    components: {
        PhFileSearch,
		PhCalendar,
        PhCalendarPlus
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