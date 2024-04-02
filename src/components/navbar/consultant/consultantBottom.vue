<template>
    <button @click="toggleReservasi('test')" ref="showTestRef"
        class="w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showTest || $route.name === 'consultant.views.review'}"
        >
        <div class="self-center">
            <PhTarget :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Test</span>
    </button>
    <div v-if="showTest" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'consultant.views.review'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFileSearch :size="20"/>
                Review Test GIM
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'consultant.views.hasil'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFileArchive :size="20"/>
                List Test GIM
            </span>
        </RouterLink>
    </div>

    <button @click="toggleReservasi('reservasi')" ref="dropdownRef"
        class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showReservasi || $route.name === 'consultant.views.permintaan' || $route.name === 'consultant.views.jadwal'}"
        >
        <div class="self-center">
            <PhCalendar :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Reservasi</span>
    </button>
    <div v-if="showReservasi" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'consultant.views.jadwal'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhCalendarCheck :size="20"/>
                Jadwal Reservasi GIM
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'consultant.views.permintaan'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhCalendarPlus :size="20"/>
                Permintaan Reservasi GIM
            </span>
        </RouterLink>
    </div>

    <RouterLink :to="{name: 'consultant.views.assessments'}"
        class="relative w-full flex flex-col justify-center text-center pt-2 pb-1"
        :class="{'font-bold' : $route.name === 'consultant.views.assessments'}"
        >
        <div class="self-center">
            <PhExam :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Assessment</span>
    </RouterLink>

    <button @click="toggleReservasi('lainya')" ref="showLainyaRef"
        class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showLainya || $route.name == 'user.views.profile'}"
        >
        <div class="self-center">
            <PhDotsThree :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Lainya</span>
    </button>
    <div v-if="showLainya" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'user.views.profile'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhUser :size="20"/>
                Profile
            </span>
        </RouterLink>
        <button @click="Logout"
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhSignOut :size="20"/>
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
    PhTarget, PhCalendar, PhExam, 
    PhDotsThree, PhFileSearch, PhFileArchive,
    PhCalendarCheck, PhCalendarPlus, PhUser,
    PhSignOut
} from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api'
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookies from 'js-cookie'

export default {
    name: 'consultantBotNav',
    components: {
    PhTarget,
    PhCalendar,
    PhExam,
    PhDotsThree,
    PhFileSearch,
    PhFileArchive,
    PhCalendarCheck,
    PhCalendarPlus,
    PhUser,
    PhSignOut
},
    setup(){
        const store = useStore()
        const router = useRouter()

        const loading = ref(false)
        const showReservasi = ref(false)
        const dropdownRef = ref(null);
        const showTest = ref(false)
        const showTestRef = ref(false)
        const showLainya = ref(false)
        const showLainyaRef = ref(false)

        const toggleReservasi = (params) => {
            switch(params) {
                case 'test':
                    showTest.value = !showTest.value
                    break;
                case 'reservasi':
                    showReservasi.value = !showReservasi.value
                    break;
                case 'lainya':
                    showLainya.value = !showLainya.value
                    break;
            }
            // showReservasi.value = !showReservasi.value
        }

		const closeDropdown = (e) => {
			if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
				showReservasi.value = false;
			}

			if (showTestRef.value && !showTestRef.value.contains(e.target)) {
				showTest.value = false;
			}

			if (showLainyaRef.value && !showLainyaRef.value.contains(e.target)) {
				showLainya.value = false;
			}
    	};

        onMounted(() => {
			document.body.addEventListener('click', closeDropdown);
		});

		onBeforeUnmount(() => {
			document.body.removeEventListener('click', closeDropdown);
		});

        const Logout = async() => {
			try {
				loading.value = !loading.value
				const token = Cookies.get('token')
				if(token){
					const response = await initAPI('post', 'logout', null ,token)
					localStorage.clear()
                    Cookies.remove('token')
					// localStorage.removeItem('userData')
					// localStorage.removeItem('userRole')
					store.commit('user', null);
					store.commit('userRole', null);
				} else {
					localStorage.clear()
					// localStorage.removeItem('userData')
					// localStorage.removeItem('userRole')
					store.commit('user', null);
					store.commit('userRole', null);
				}
				loading.value = !loading.value
				router.push('/login')
			} catch (error) {
				console.log(error)
			}
			
		}

        return {
            showReservasi,
            dropdownRef,
            showTest,
            showTestRef,
            showLainya,
            showLainyaRef,
            toggleReservasi,
            Logout
        }
    }
}
</script>