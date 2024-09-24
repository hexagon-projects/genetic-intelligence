<template>
   <ul class="flex space-x-8">
        <li @click="goTo('views.dashboard')" class="relative cursor-pointer">
            <div class="flex items-center gap-[6px]">
                <img :class="{'grayscale': $route.name !== 'views.dashboard', 'grayscale-0': $route.name == 'views.dashboard'}" 
                src="@/assets/icons/beranda.svg"/>
                <span class="text-black font-roboto">Beranda</span>
            </div>
            
            <div v-if="$route.name == 'views.dashboard'" class="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#3030f8]"></div>
        </li>

        <!-- Test Menu -->
        <li class="relative cursor-pointer" @mouseenter="openSubmenu(2)" @mouseleave="scheduleCloseSubmenu(2)">
            <div class="flex items-center gap-[6px]">
                <img class="transition-all duration-100" 
                :class="{'grayscale': activeMenu !== 2 || $route.name !== 'user.views.deteksi'
                   || $route.name !== 'user.views.assesment'
                   || $route.name !== 'user.views.cpm'
                   || $route.name !== 'user.views.psikotest'
                   || $route.name !== 'user.views.iq', 
                'grayscale-0': activeMenu === 2 || $route.name == 'user.views.deteksi'
                   || $route.name == 'user.views.cpm'
                   || $route.name == 'user.views.assesment'
                   || $route.name == 'user.views.psikotest'
                   || $route.name == 'user.views.iq'
                }" 
                src="@/assets/icons/lakukan-tes.svg"/>
                <span class="text-black font-roboto">Lakukan Tes</span>
            </div>

            <div v-if="$route.name == 'user.views.deteksi'
                    || $route.name == 'user.views.cpm'
                    || $route.name == 'user.views.assesment'
                    || $route.name == 'user.views.psikotest'
                    || $route.name == 'user.views.iq'" 
                class="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#3030f8]">
            </div>
            
            <ul v-show="activeMenu === 2" class="p-2 transition-all duration-500 absolute top-12 left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-xl">
            <li @click="goTo('user.views.deteksi')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-gim.svg"/>
                    <span class="font-roboto">Test GIM</span>
                </div>
            </li>
            <li @click="goTo('user.views.assesment')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0"
                    src="@/assets/icons/tes-assesment.svg"/>
                    <span class="font-roboto">Test Assesment</span>
                </div>
            </li>
            <li v-if="cekTypeSekolah.institutions && (cekTypeSekolah.institutions.type !== 'SD' && cekTypeSekolah.institutions.type !== 'TK')" @click="goTo('user.views.iq')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-iq.svg"/>
                    <a href="#" class="font-roboto">Test IQ</a>
                </div>
            </li>
            <!-- <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-iq.svg"/>
                    <a href="#" class="font-roboto">Test Psikotest</a>
                </div>
            </li> -->
            <li v-if="cekTypeSekolah.institutions && (cekTypeSekolah.institutions.type == 'SD' || cekTypeSekolah.institutions.type == 'TK')" @click="goTo('user.views.cpm')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-cpm.svg"/>
                    <a href="#" class="font-roboto">Test CPM</a>
                </div>
            </li>
            </ul>
        </li>

        <!-- Hasil Test Menu -->
        <li class="relative cursor-pointer" @mouseenter="openSubmenu(3)" @mouseleave="scheduleCloseSubmenu(3)">
            <div class="flex items-center gap-[6px]">
                <img class="transition-all duration-100" 
                :class="{'grayscale': activeMenu !== 3 || $route.name !== 'user.views.hasil_deteksi'
                    || $route.name !== 'user.views.hasil_cpm'
                    || $route.name !== 'user.views.hasil_assessment'
                    || $route.name !== 'user.views.hasil_iq', 'grayscale-0': activeMenu === 3 || $route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_iq'
                    }" 
                src="@/assets/icons/hasil-tes.svg"/>
                <span class="text-black font-roboto">Hasil Tes</span>
            </div>

            <div v-if="$route.name == 'user.views.hasil_deteksi'
                    || $route.name == 'user.views.hasil_cpm'
                    || $route.name == 'user.views.hasil_assessment'
                    || $route.name == 'user.views.hasil_iq'" 
                class="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#3030f8]">
            </div>

            <ul v-show="activeMenu === 3" class="p-2 transition-all duration-500 absolute top-12 left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-xl">
            <li @click="goTo('user.views.hasil_deteksi')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-gim.svg"/>
                    <a href="#" class="font-roboto">Test GIM</a>
                </div>
            </li>
            <li @click="goTo('user.views.hasil_assessment')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0"
                    src="@/assets/icons/tes-assesment.svg"/>
                    <a href="#" class="font-roboto">Test Assesment</a>
                </div>
            </li>
            <li v-if="cekTypeSekolah.institutions && (cekTypeSekolah.institutions.type !== 'SD' && cekTypeSekolah.institutions.type !== 'TK')" @click="goTo('user.views.hasil_iq')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-iq.svg"/>
                    <a href="#" class="font-roboto">Test IQ</a>
                </div>
            </li>
            <li v-if="cekTypeSekolah.institutions && (cekTypeSekolah.institutions.type == 'SD' || cekTypeSekolah.institutions.type == 'TK')" @click="goTo('user.views.hasil_cpm')" class="hover:cursor-pointer group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-cpm.svg"/>
                    <a href="#" class="font-roboto">Test CPM</a>
                </div>
            </li>
            </ul>
        </li>
        <li class="relative">
            <div class="flex items-center gap-[6px]">
                <img class="transition-all duration-100" :class="{'grayscale': activeMenu !== 4, 'grayscale-0': activeMenu === 4}" 
                src="@/assets/icons/reservasi.svg"/>
                <a href="#" class="text-black font-roboto">Reservasi</a>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const cekTypeSekolah = ref(JSON.parse(localStorage.getItem('userData')))

const router = useRouter()

const goTo = (route) => {
    router.push({name: route})
}

const activeMenu = ref(null);
let closeMenuTimeout = null;

function openSubmenu(menuId) {
  if (closeMenuTimeout) {
    clearTimeout(closeMenuTimeout);
  }
  activeMenu.value = menuId;
}

function scheduleCloseSubmenu(menuId) {
  closeMenuTimeout = setTimeout(() => {
    if (activeMenu.value === menuId) {
      activeMenu.value = null;
    }
  }, 170); // Delay untuk menghindari hilangnya submenu saat pindah ke submenu
}
</script>
