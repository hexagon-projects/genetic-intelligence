<template>
        <button @click="toggleMenu('test')" ref="dropdownTestRef"
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.deteksi' || $route.name === 'user.views.assesment'}"
            >
            <div class="self-center">
                <PhTarget :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Test</span>
        </button>
        <div v-if="showTest" class="absolute animate-pulse bg-white px-4 left-[120px] bottom-14 rounded-lg border shadow-lg">
            <RouterLink :to="{name: 'user.views.deteksi'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">GIM</span>
            </RouterLink>
            <RouterLink :to="{name: 'user.views.assesment'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">Assessment</span>
            </RouterLink>
        </div>


        <button @click="toggleMenu('hasil')" ref="dropdownHasilRef"
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.hasil_deteksi' || $route.name === 'user.views.hasil_assessment'}"
            >
            <div class="self-center">
                <PhFileText :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Hasil</span>
        </button>
        <div v-if="showHasil" class="absolute animate-pulse bg-white px-4 left-[210px] bottom-14 rounded-lg border shadow-lg">
            <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">GIM</span>
            </RouterLink>
            <RouterLink :to="{name: 'user.views.hasil_assessment'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">Assessment</span>
            </RouterLink>
        </div>

        <button @click="toggleMenu('reservasi')" ref="dropdownReservasiRef"
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.reservasi'}"
            >
            <div class="self-center">
                <PhCalendar :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Reservasi</span>
        </button>
        <div v-if="showReservasi" class="absolute animate-pulse bg-white px-4 left-[296px] bottom-14 rounded-lg border shadow-lg">
            <RouterLink :to="{name: 'user.views.reservasi'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">GIM</span>
            </RouterLink>
            <RouterLink :to="{name: 'user.views.hasil_assessment'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">Assessment</span>
            </RouterLink>
        </div>
        
        <button @click="toggleMenu('lainya')" ref="dropdownLainyaRef"
            class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name == 'user.views.profile'}"
            >
            <div class="self-center">
                <PhDotsThree :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Lainya</span>
        </button>
        <div v-if="showLainya" class="absolute animate-pulse bg-white px-4 left-[360px] bottom-14 rounded-lg border shadow-lg">
            <RouterLink :to="{name: 'user.views.profile'}" 
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">Profile</span>
            </RouterLink>
            <button @click="Logout"
                class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
                >
                <span class="text-start font-myFont block text-sm">Keluar</span>
            </button>
        </div>  

        <!-- <RouterLink :to="{name: 'user.views.profile'}" 
            class="w-full flex flex-col justify-center text-center pt-2 pb-1"
            :class="{'font-bold' : $route.name === 'user.views.profile'}"
            >
            <div class="self-center">
                <PhUser :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Profil</span>
        </RouterLink> -->
</template>

<script>
import {  PhTarget, PhFileText, PhCalendar, PhDotsThree } from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: 'customerBotNav',
    components: {
        PhTarget,
        PhFileText,
        PhCalendar,
        PhDotsThree
    },
    setup(){
        const store = useStore()
        const router = useRouter()

        const showTest = ref(false)
        const dropdownTestRef = ref(false)

        const showHasil = ref(false)
        const dropdownHasilRef = ref(false)

        const showReservasi = ref(false)
        const dropdownReservasiRef = ref(false)

        const showLainya = ref(false)
        const dropdownLainyaRef = ref(false)

        const closeDropdown = (e) => {
            if (dropdownTestRef.value && !dropdownTestRef.value.contains(e.target)) {
                showTest.value = false;
            }

            if (dropdownHasilRef.value && !dropdownHasilRef.value.contains(e.target)) {
                showHasil.value = false;
            }

            if (dropdownReservasiRef.value && !dropdownReservasiRef.value.contains(e.target)) {
                showReservasi.value = false;
            }

            if (dropdownLainyaRef.value && !dropdownLainyaRef.value.contains(e.target)) {
                showLainya.value = false;
            }
        };

        onMounted(() => {
            document.body.addEventListener('click', closeDropdown);
        });

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        const toggleMenu = (param) => {
            switch (param) {
                case 'test':
                    showTest.value = !showTest.value
                    break;
                case 'hasil':
                    showHasil.value = !showHasil.value
                    break;
                case 'reservasi':
                    showReservasi.value = !showReservasi.value
                    break;
                case 'lainya':
                    showLainya.value = !showLainya.value
            }
        }

        const Logout = () => {
			localStorage.clear()
			// localStorage.removeItem('userData')
			// localStorage.removeItem('userRole')
			store.commit('user', null);
			store.commit('userRole', null);

			router.push('/login')
		}

        return {
            showTest,
            dropdownTestRef,
            showHasil,
            dropdownHasilRef,
            showReservasi,
            dropdownReservasiRef,
            showLainya,
            dropdownLainyaRef,
            toggleMenu,
            Logout
        }
    }
}
</script>