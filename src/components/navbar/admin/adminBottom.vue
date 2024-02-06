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
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Data Customer
            </span>
        </RouterLink>
        <RouterLink :to="{name: 'admin.views.konsultan'}" 
            class="items-center w-full flex flex-col justify-center pt-2 pb-1"
            >
            <span class="text-start flex gap-1 items-center font-myFont text-sm">
                <PhFolderUser :size="20"/>
                Data Konsultan
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

    <RouterLink :to="{name: 'user.views.hasil_deteksi'}" 
        class="w-full flex flex-col justify-center text-center pt-2 pb-1"
        :class="{'font-bold' : $route.name === 'user.views.hasil_deteksi'}"
        >
        <div class="self-center">
            <PhMoney :size="28" />
        </div>
        <span class="tab tab-home block text-xs">Pembayaran</span>
    </RouterLink>

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
import {  PhTarget, PhFileText, PhFolders, PhFolderUser, PhMoney, PhUser } from "@phosphor-icons/vue";
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
    name: 'customerBotNav',
    components: {
        PhTarget,
        PhFileText,
        PhFolders,
        PhFolderUser,
        PhMoney,
        PhUser
    },
    setup(){
        const showData = ref(false)
        const showDataRef = ref(false)
        const showReservasi = ref(false)
        const showReservasiRef = ref(false)

        const toggleDropdown = (params) => {
            switch(params) {
                case 'data':
                    showData.value = !showData.value
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
			if (showDataRef.value && !showDataRef.value.contains(e.target)) {
				showData.value = false;
			}

			if (showReservasiRef.value && !showReservasiRef.value.contains(e.target)) {
				showReservasi.value = false;
			}

			// if (showLainyaRef.value && !showLainyaRef.value.contains(e.target)) {
			// 	showLainya.value = false;
			// }
    	};

        onMounted(() => {
			document.body.addEventListener('click', closeDropdown);
		});

		onBeforeUnmount(() => {
			document.body.removeEventListener('click', closeDropdown);
		});

        return {
            showData,
            showDataRef,
            showReservasi,
            showReservasiRef,
            toggleDropdown
        }
    }
}
</script>