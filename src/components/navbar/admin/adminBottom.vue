<template>
    <button @click="toggleDropdown('data')" ref="showDataRef"
        class="w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showData 
        || $route.name === 'admin.views.customers'
        || $route.name === 'admin.views.konsultan'
        }"
        >
        <div class="self-center">
            <PhFileText :size="28" />
        </div>
        <span class="tab tab-home text-center block text-xs">Data</span>
    </button>
    <div v-if="showData" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'admin.views.customers'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Data Customer
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.konsultan'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Data Konsultan
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.guru'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Data Guru
            </span>
        </RouterLink>
    </div>

    <button @click="toggleDropdown('reservasi')" ref="showReservasiRef"
        class="w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showReservasi 
        || $route.name === 'admin.views.reservasi'
        || $route.name === 'admin.views.reservasi_psikotest'
        }"
        >
        <div class="self-center">
            <PhFileText :size="28" />
        </div>
        <span class="tab tab-home text-center block text-xs">Reservasi</span>
    </button>
    <div v-if="showReservasi" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'admin.views.reservasi'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Reservasi GIM
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.reservasi_psikotest'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Reservasi Psikotest
            </span>
        </RouterLink>
    </div>

    <button @click="toggleDropdown('pengaturan')" ref="showPengaturanRef"
        class="w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showPengaturan 
        || $route.name === 'admin.views.pengaturan_soal_assessment'
        || $route.name === 'admin.views.pengaturan_hasil_assessment'
        || $route.name === 'admin.views.pengaturan_harga'
        }"
        >
        <div class="self-center">
            <PhGear :size="28" />
        </div>
        <span class="tab tab-home text-center block text-xs">Pengaturan</span>
    </button>
    <div v-if="showPengaturan" class="absolute gap-1 bg-white flex justify-center items-center w-full py-4 px-2 bottom-14 border">
        <RouterLink :to="{name: 'admin.views.pengaturan_harga'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-[2px] items-center font-myFont text-sm">
                <PhCurrencyCircleDollar :size="18"/>
                Pengaturan Harga
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.pengaturan_soal_assessment'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-[2px] items-center font-myFont text-sm">
                <PhTextAa :size="18"/>
                Soal Assessment
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.pengaturan_hasil_assessment'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex flex-col gap-[2px] items-center font-myFont text-sm">
                <PhExam :size="18"/>
                Hasil Assessment
            </span>
        </RouterLink>
    </div>

    <button @click="toggleDropdown('lainya')" ref="showLainyaRef"
        class="relative w-full flex flex-col justify-center items-center text-center pt-2 pb-1"
        :class="{'font-bold' : showLainya || $route.name == 'user.views.profile' || $route.name == 'admin.views.riwayat_pembayaran'}"
        >
        <div class="self-center">
            <PhDotsThree :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Lainya</span>
    </button>
    <div v-if="showLainya" class="absolute bg-white flex justify-center items-center w-full py-4 px-4 bottom-14 border">
        <RouterLink :to="{name: 'admin.views.riwayat_pembayaran'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhMoney :size="20"/>
                Pembayaran
            </span>
        </RouterLink>
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

    <!-- <RouterLink :to="{name: 'admin.views.riwayat_pembayaran'}" 
        class="w-full flex flex-col justify-center text-center pt-2 pb-1"
        :class="{'font-bold' : $route.name === 'admin.views.riwayat_pembayaran'}"
        >
        <div class="self-center">
            <PhMoney :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Pembayaran</span>
    </RouterLink> -->

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
    PhTarget, PhFileText, PhFolders, 
    PhFolderUser, PhMoney, PhGear,
    PhCurrencyCircleDollar, PhTextAa, PhExam,
    PhUser, PhDotsThree, PhSignOut
} from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from 'vue'
import initAPI from '../../../api/api'
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
    name: 'customerBotNav',
    components: {
        PhTarget,
        PhFileText,
        PhFolders,
        PhFolderUser,
        PhMoney,
        PhGear,
        PhCurrencyCircleDollar,
        PhTextAa,
        PhExam,
        PhUser,
        PhDotsThree,
        PhSignOut
    },
    setup(){
        const store = useStore()
        const router = useRouter()
        
        const loading = ref(false)
        const showData = ref(false)
        const showDataRef = ref(false)
        const showReservasi = ref(false)
        const showReservasiRef = ref(false)
        const showPengaturan = ref(false)
        const showPengaturanRef = ref(false)
        const showLainya = ref(false)
        const showLainyaRef = ref(false)

        const toggleDropdown = (params) => {
            switch(params) {
                case 'data':
                    showData.value = !showData.value
                    break;
                case 'reservasi':
                    showReservasi.value = !showReservasi.value
                    break;
                case 'pengaturan':
                    showPengaturan.value = !showPengaturan.value
                    break;
                case 'lainya':
                    showLainya.value = !showLainya.value
                    break;
            }
            // showReservasi.value = !showReservasi.value
        }

		const closeDropdown = (e) => {
			if (showDataRef.value && !showDataRef.value.contains(e.target)) {
				showData.value = false;
			}

			if (showReservasiRef.value && !showReservasiRef.value.contains(e.target)) {
				showReservasi.value = false;
			}

			if (showPengaturanRef.value && !showPengaturanRef.value.contains(e.target)) {
				showPengaturan.value = false;
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
				const token = JSON.parse(localStorage.getItem('token'))
				if(token){
					const response = await initAPI('post', 'logout', null ,token)
					localStorage.clear()
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
            loading,
            showData,
            showDataRef,
            showReservasi,
            showReservasiRef,
            showPengaturan,
            showPengaturanRef,
            showLainya,
            showLainyaRef,
            toggleDropdown,
            Logout
        }
    }
}
</script>