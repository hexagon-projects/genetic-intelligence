<template>
    <div class="relative">
        <button class="
                flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
                hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
                "
                :class="{
                    'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'user.views.deteksi',
                    'text-dark bg-white': $route.name !== 'user.views.deteksi'
                }"
                @click="toggleFilter('test')"
                ref="dropdownTestRef"
            >
                <PhTarget :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.deteksi','text-biru hover:text-light': $route.name !== 'user.views.deteksi'}" />
            Lakukan Test
            <PhCaretDown :size="16"/>
        </button>
        <div v-if="dropdownTest"
            class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <RouterLink :to="{name: 'user.views.deteksi'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Test GIM
            </RouterLink>
            <RouterLink :to="{name: 'user.views.assesment'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Test Assesment
            </RouterLink>
            <RouterLink :to="{name: 'user.views.psikotest'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Test Psikotest
            </RouterLink>
            </div>
        </div>
    </div>

    <div class="relative">
        <button class="
                flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
                hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
                "
                :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.hasil_deteksi', 'text-dark bg-white': $route.name !== 'user.views.hasil_deteksi'}"
                @click="toggleFilter('hasil')"
                ref="dropdownHasilRef"
            >
                <PhFileText :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.hasil_deteksi','text-biru hover:text-light': $route.name !== 'user.views.hasil_deteksi'}" />
            Hasil Test
            <PhCaretDown :size="16"/>
        </button>
        <div v-if="dropdownHasil"
            class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Hasil GIM
            </RouterLink>
            <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Hasil Assessment
            </RouterLink>
            <a class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Hasil Psikotest
            </a>
            </div>
        </div>
    </div>

    <div class="relative">
        <button class="
                flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
                hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
                "
                :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.reservasi', 'text-dark bg-white': $route.name !== 'user.views.reservasi'}"
                @click="toggleFilter('reservasi')"
                ref="dropdownReservasiRef"
            >
                <PhCalendarCheck :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.reservasi','text-biru hover:text-light': $route.name !== 'user.views.reservasi'}" />
            Reservasi
            <PhCaretDown :size="16"/>
        </button>
        <div v-if="dropdownReservasi"
            class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
            <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
            <RouterLink :to="{name: 'user.views.reservasi'}" class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Reservasi GIM
            </RouterLink>
            <a class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Reservasi Assessment
            </a>
            <!-- <a class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
                Reservasi Psikotest
            </a> -->
            </div>
        </div>
    </div>
    
    <!-- <RouterLink :to="{name: 'user.views.deteksi'}" 
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
    <RouterLink v-if="userData.is_detected == 'Selesai Terdeteksi'" :to="{name: 'user.views.reservasi'}" 
        class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
            :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'user.views.reservasi', 'text-dark bg-white': $route.name !== 'user.views.reservasi'}"
        >
        <PhCalendarCheck :size="24" weight="duotone" :class="{'text-light': $route.name == 'user.views.reservasi','text-biru hover:text-light': $route.name !== 'user.views.reservasi'}" />
        Reservasi
    </RouterLink> -->
</template>

<script>
import { PhTarget, PhFileText, PhUser, PhCalendarCheck, PhCaretDown, PhSignOut } from "@phosphor-icons/vue";
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'CustomerNav',
    components: {
        PhTarget,
		PhFileText,
		PhUser,
        PhCalendarCheck,
        PhCaretDown,
		PhSignOut
    },
    setup(){
        const store = useStore()
        const userData = computed(() => store.getters.getUserData);

        const dropdownTest = ref(false)
        const dropdownTestRef = ref(null)

        const dropdownHasil = ref(false)
        const dropdownHasilRef = ref(false)

        const dropdownReservasi = ref(false)
        const dropdownReservasiRef = ref(false)

        const closeDropdown = (e) => {
            if (dropdownTestRef.value && !dropdownTestRef.value.contains(e.target)) {
                dropdownTest.value = false;
            }

            if (dropdownHasilRef.value && !dropdownHasilRef.value.contains(e.target)) {
                dropdownHasil.value = false;
            }

            if (dropdownReservasiRef.value && !dropdownReservasiRef.value.contains(e.target)) {
                dropdownReservasi.value = false;
            }
        };

        onMounted(() => {
            document.body.addEventListener('click', closeDropdown);
        });

        onBeforeUnmount(() => {
            document.body.removeEventListener('click', closeDropdown);
        });

        const toggleFilter = (params) => {
            if(params == 'test'){
                dropdownTest.value = !dropdownTest.value
            } else if (params == 'hasil') {
                dropdownHasil.value = !dropdownHasil.value
            } else if (params == 'reservasi') {
                dropdownReservasi.value = !dropdownReservasi.value
            }
        } 
            

        return {
            userData,
            dropdownTest,
            dropdownTestRef,
            dropdownHasil,
            dropdownHasilRef,
            dropdownReservasi,
            dropdownReservasiRef,
            toggleFilter
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