<template>
        <button @click="toggleMenu('test')" ref="dropdownTestRef"
            class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
            :class="{'font-bold' : showTest || $route.name === 'user.views.deteksi' || $route.name === 'user.views.assesment'}"
            >
            <div class="self-center">
                <PhTarget :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Test</span>
        </button>
        <div v-if="showTest" class="absolute bg-white flex justify-center items-center w-full py-2 px-4 bottom-14 border">
            <RouterLink :to="{name: 'user.views.deteksi'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhTarget :size="20" />
                    Test GIM
                </span>
            </RouterLink>
            <RouterLink v-if="userData.is_student !== 0" :to="{name: 'user.views.assesment'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-center flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhTextAa :size="20" />
                    Test Assessment
                </span>
            </RouterLink>
            <RouterLink v-if="userData.institutions && (userData.institutions.type !== 'SD' && userData.institutions.type !== 'TK')" :to="{name: 'user.views.iq'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhBrain :size="20" />
                    Test IQ
                </span>
            </RouterLink>
            <RouterLink v-if="userData.is_student !== 0 && (userData.institutions.type == 'SD' || userData.institutions.type == 'TK')" :to="{name: 'user.views.cpm'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhBrain :size="20" />
                    Test CPM
                </span>
            </RouterLink>
        </div>


        <button @click="toggleMenu('hasil')" ref="dropdownHasilRef"
            class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
            :class="{'font-bold' : showHasil || $route.name === 'user.views.hasil_deteksi' || $route.name === 'user.views.hasil_assessment'}"
            >
            <div class="self-center">
                <PhFileText :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Hasil</span>
        </button>
        <div v-if="showHasil" class="absolute bg-white flex justify-center items-center w-full py-2 px-4 bottom-14 border">
            <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
                class="items-center w-full flex flex-col text-center justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhFileText :size="20" />
                    Hasil GIM
                </span>
            </RouterLink>
            <RouterLink v-if="userData.is_student !== 0" :to="{name: 'user.views.hasil_assessment'}" 
                class="items-center w-full flex flex-col text-center justify-center pt-2 pb-1"
                >
                <span class="text-center flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhExam :size="20" />
                    Hasil Assessment
                </span>
            </RouterLink>
            <RouterLink v-if="userData.institutions && (userData.institutions.type !== 'SD' && userData.institutions.type !== 'TK')" :to="{name: 'user.views.hasil_iq'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhBrain :size="20" />
                    Hasil IQ
                </span>
            </RouterLink>
            <RouterLink v-if="userData.is_student !== 0 && (userData.institutions.type == 'SD' || userData.institutions.type == 'TK')" :to="{name: 'user.views.hasil_cpm'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhBrain :size="20" />
                    Hasil CPM
                </span>
            </RouterLink>
        </div>

        <button @click="toggleMenu('reservasi')" ref="dropdownReservasiRef"
            class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
            :class="{'font-bold' : showReservasi || $route.name === 'user.views.reservasi'}"
            >
            <div class="self-center">
                <PhCalendar :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Reservasi</span>
        </button>
        <div v-if="showReservasi" class="absolute bg-white flex justify-center items-center w-full py-2 px-4 bottom-14 border">
            <RouterLink :to="{name: 'user.views.reservasi'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                    <PhCalendar :size="20" />
                    Reservasi GIM
                </span>
            </RouterLink>
            <!-- <RouterLink :to="{name: 'user.views.hasil_assessment'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex gap-1 items-center font-myFont text-sm">
                    <PhUserFocus :size="20" />
                    Reservasi Psikotest
                </span>
            </RouterLink> -->
        </div>
        
        <button @click="toggleMenu('lainya')" ref="dropdownLainyaRef"
            class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
            :class="{'font-bold': showLainya || $route.name == 'user.views.profile'}"
            >
            <div class="self-center">
                <PhDotsThree :size="28" />
            </div>
            <span class="tab tab-home block text-xs">Lainya</span>
        </button>
        <div v-if="showLainya" class="absolute bg-white flex justify-center items-center w-full py-2 px-4 bottom-14 border">
            <RouterLink :to="{name: 'user.views.profile'}" 
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex gap-1 items-center font-myFont text-sm">
                    <PhUser :size="20" />
                    Profile
                </span>
            </RouterLink>
            <button @click="Logout"
                class="items-center w-full flex flex-col justify-center pt-2 pb-1"
                >
                <span class="text-start flex gap-1 items-center font-myFont text-sm">
                    <PhSignOut :size="20" />
                    Keluar
                </span>
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
import {  
    PhTarget, PhFileText, PhCalendar, 
    PhDotsThree, PhTextAa, PhExam,
    PhUserFocus, PhUser, PhSignOut,
    PhBrain
 } from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: 'customerBotNav',
    components: {
        PhTarget,
        PhBrain,
        PhFileText,
        PhCalendar,
        PhDotsThree,
        PhTextAa,
        PhExam,
        PhUserFocus,
        PhUser,
        PhSignOut
    },
    setup(){
        const store = useStore()
        // const userData = computed(() => store.getters.getUserData);
        const userData = JSON.parse(localStorage.getItem('userData'));

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
            userData,
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