<template>
    <!-- <RouterLink :to="{name: 'consultant.views.dashboard'}" 
        class="
        flex justify-center items-end px-4 py-2 gap-1 font-myFont
        hover:text-biru border border-transparent hover:border-biru rounded-lg hover:shadow-sm transition
        "
        :class="{'bg-biru px-4 py-2 rounded-lg shadow-sm text-light' : $route.name === 'views.dashboard', 'text-dark bg-white': $route.name !== 'views.dashboard'}"
        >
        <PhHouse :size="24" :class="{'text-light': $route.name == 'views.dashboard','text-biru': $route.name !== 'views.dashboard'}" />
        Beranda
    </RouterLink> -->
    <RouterLink :to="{ name: 'consultant.views.bookings' }" class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
        :class="{ 'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'consultant.views.bookings', 'text-dark bg-white': $route.name !== 'consultant.views.bookings' }">
        <PhFileSearch :size="24" weight="duotone"
            :class="{ 'text-light': $route.name == 'consultant.views.bookings', 'text-biru hover:text-light': $route.name !== 'consultant.views.bookings' }" />
        List Booking
    </RouterLink>

    <div class="relative">
        <button class="
                flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
                hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
                " :class="{
                    'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'consultant.views.review' || $route.name == 'consultant.views.hasil',
                    'text-dark bg-white': $route.name !== 'consultant.views.review' && $route.name !== 'consultant.views.hasil'
                }" @click="toggleFilter('test-gim')" ref="dropdownTestRef">
            <PhFileSearch :size="24" weight="duotone"
                :class="{ 'text-light': $route.name == 'consultant.views.review' || $route.name == 'consultant.views.hasil', 'text-biru hover:text-light': $route.name !== 'consultant.views.review' && $route.name !== 'consultant.views.hasil' }" />
            Test GIM
            <PhCaretDown :size="16" />
        </button>
        <div v-if="dropdownTest"
            class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <RouterLink :to="{ name: 'consultant.views.review' }"
                    class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem" tabindex="-1">
                    Review Test GIM
                </RouterLink>
                <RouterLink :to="{ name: 'consultant.views.hasil' }"
                    class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem" tabindex="-1">
                    List Hasil GIM
                </RouterLink>
            </div>
        </div>
    </div>

    <div class="relative">
        <button class="
                flex justify-center items-center px-4 py-2 gap-1 font-myFont text-dark
                hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
                " :class="{
                    'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'consultant.views.permintaan' || $route.name === 'consultant.views.jadwal',
                    'text-dark bg-white': $route.name !== 'consultant.views.permintaan' && $route.name !== 'consultant.views.jadwal'
                }" @click="toggleFilter('reservasi-gim')" ref="dropdownReservasiRef">
            <PhCalendar :size="24" weight="duotone"
                :class="{ 'text-light': $route.name == 'consultant.views.permintaan' || $route.name == 'consultant.views.jadwal', 'text-biru hover:text-light': $route.name !== 'consultant.views.permintaan' && $route.name !== 'consultant.views.jadwal' }" />
            Reservasi GIM
            <PhCaretDown :size="16" />
        </button>
        <div v-if="dropdownReservasi"
            class="transition duration-150 ease-in-out absolute left-22 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
            <div class="py-1" role="none">
                <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                <RouterLink :to="{ name: 'consultant.views.permintaan' }"
                    class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem" tabindex="-1">
                    Permintaan Reservasi
                </RouterLink>
                <RouterLink :to="{ name: 'consultant.views.jadwal' }"
                    class="cursor-pointer font-myFont hover:bg-neutral-200 text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem" tabindex="-1">
                    Jadwal Reservasi
                </RouterLink>
            </div>
        </div>
    </div>

    <RouterLink :to="{ name: 'consultant.views.assessments' }" class="
            flex justify-center items-end px-4 py-2 gap-1 font-myFont
            hover:bg-biru hover:text-light hover:rounded-lg hover:shadow-sm
            "
        :class="{ 'bg-biru px-4 py-2 rounded-lg shadow-sm text-light': $route.name === 'consultant.views.assessments', 'text-dark bg-white': $route.name !== 'consultant.views.assessments' }">
        <PhExam :size="24" weight="regular"
            :class="{ 'text-light': $route.name == 'consultant.views.assessments', 'text-biru hover:text-light': $route.name !== 'consultant.views.assessments' }" />
        List Assessment
    </RouterLink>

    <!-- <RouterLink :to="{name: 'consultant.views.review'}" 
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
    </RouterLink> -->
</template>

<script>
import { PhHouse, PhFileSearch, PhCalendar, PhCalendarPlus, PhCaretDown, PhExam } from "@phosphor-icons/vue";
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'ConsultantNav',
    components: {
        PhHouse,
        PhFileSearch,
        PhCalendar,
        PhCalendarPlus,
        PhCaretDown,
        PhExam
    },
    setup() {
        const store = useStore()
        const userData = computed(() => store.getters.getUserData);

        const dropdownTest = ref(false)
        const dropdownTestRef = ref(null)

        const dropdownReservasi = ref(false)
        const dropdownReservasiRef = ref(false)

        const closeDropdown = (e) => {
            if (dropdownTestRef.value && !dropdownTestRef.value.contains(e.target)) {
                dropdownTest.value = false;
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
            if (params == 'test-gim') {
                dropdownTest.value = !dropdownTest.value
            } else if (params == 'reservasi-gim') {
                dropdownReservasi.value = !dropdownReservasi.value
            }
        }

        return {
            userData,
            dropdownTest,
            dropdownTestRef,
            dropdownReservasi,
            dropdownReservasiRef,
            toggleFilter
        }
    }
}
</script>

<style scoped>
.gradasi {
    background: rgb(11, 64, 244);
    background: linear-gradient(162deg, rgba(11, 64, 244, 1) 26%, rgba(2, 178, 255, 1) 82%);
}
</style>