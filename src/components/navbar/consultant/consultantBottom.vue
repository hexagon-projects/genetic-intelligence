<template>
    <RouterLink :to="{name: 'consultant.views.review'}" 
        class="w-full flex flex-col justify-center text-center pt-2 pb-1"
        :class="{'font-bold' : $route.name === 'consultant.views.review'}"
        >
        <div class="self-center">
            <PhTarget :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Review</span>
    </RouterLink>

    <button @click="toggleReservasi" ref="dropdownRef"
        class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
        :class="{'font-bold' : $route.name === 'consultant.views.permintaan' || $route.name === 'consultant.views.jadwal'}"
        >
        <div class="self-center">
            <PhCalendar :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Reservasi</span>
    </button>
    <div v-if="showReservasi" class="absolute animate-pulse bg-white px-4 left-56 bottom-14 rounded-lg border shadow-lg">
        <RouterLink :to="{name: 'consultant.views.jadwal'}" 
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            >
            <span class="text-start font-myFont block text-sm">Jadwal</span>
        </RouterLink>
        <RouterLink :to="{name: 'consultant.views.permintaan'}" 
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            >
            <span class="text-start font-myFont block text-sm">Permintaan</span>
        </RouterLink>
    </div>

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
import {  PhTarget, PhCalendar, PhUser } from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
    name: 'consultantBotNav',
    components: {
        PhTarget,
        PhCalendar,
        PhUser
    },
    setup(){
        const showReservasi = ref(false)

        const toggleReservasi = () => {
            showReservasi.value = !showReservasi.value
        }

        const dropdownRef = ref(null);

		const closeDropdown = (e) => {
			if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
				showReservasi.value = false;
			}
    	};

        onMounted(() => {
			document.body.addEventListener('click', closeDropdown);
		});

		onBeforeUnmount(() => {
			document.body.removeEventListener('click', closeDropdown);
		});

        return {
            showReservasi,
            dropdownRef,
            toggleReservasi
        }
    }
}
</script>