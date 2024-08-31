<template>
   <ul class="flex space-x-8">
        <li class="relative">
            <div class="flex items-center gap-[6px]">
                <img src="@/assets/icons/beranda.svg"/>
                <a href="#" class="text-black font-roboto">Beranda</a>
            </div>
            
            <div class="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#3030f8]"></div>
        </li>
        <li class="relative" @mouseenter="openSubmenu(2)" @mouseleave="scheduleCloseSubmenu(2)">
            <div class="flex items-center gap-[6px]">
                <img class="transition-all duration-100" :class="{'grayscale': activeMenu !== 2, 'grayscale-0': activeMenu === 2}" 
                src="@/assets/icons/lakukan-tes.svg"/>
                <a href="#" class="text-black font-roboto">Lakukan Tes</a>
            </div>

            <div v-if="activeMenu === 2" class="absolute bottom-[-22px] left-0 right-0 h-[2px] bg-[#3030f8]"></div>
            
            <ul v-show="activeMenu === 2" class="p-2 transition-all duration-500 absolute top-12 left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-xl">
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-gim.svg"/>
                    <a href="#" class="font-roboto">Test GIM</a>
                </div>
            </li>
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0"
                    src="@/assets/icons/tes-assesment.svg"/>
                    <a href="#" class="font-roboto">Test Assesment</a>
                </div>
            </li>
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
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
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-cpm.svg"/>
                    <a href="#" class="font-roboto">Test CPM</a>
                </div>
            </li>
            </ul>
        </li>
        <li class="relative" @mouseenter="openSubmenu(3)" @mouseleave="scheduleCloseSubmenu(3)">
            <div class="flex items-center gap-[6px]">
                <img class="transition-all duration-100" :class="{'grayscale': activeMenu !== 3, 'grayscale-0': activeMenu === 3}" 
                src="@/assets/icons/hasil-tes.svg"/>
                <a href="#" class="text-black font-roboto">Hasil Tes</a>
            </div>
            <ul v-show="activeMenu === 3" class="p-2 transition-all duration-500 absolute top-12 left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-xl">
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-gim.svg"/>
                    <a href="#" class="font-roboto">Test GIM</a>
                </div>
            </li>
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0"
                    src="@/assets/icons/tes-assesment.svg"/>
                    <a href="#" class="font-roboto">Test Assesment</a>
                </div>
            </li>
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
                <div class="pl-3 flex items-center gap-3">
                    <img class="transition-all duration-100 grayscale group-hover:grayscale-0" 
                    src="@/assets/icons/tes-iq.svg"/>
                    <a href="#" class="font-roboto">Test IQ</a>
                </div>
            </li>
            <li class="group text-sm text-[#667085] px-[10px] py-[12px] rounded-lg hover:bg-[#F0F7FD] hover:text-black">
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
                <img class="transition-all duration-100" :class="{'grayscale': activeMenu !== 3, 'grayscale-0': activeMenu === 3}" 
                src="@/assets/icons/reservasi.svg"/>
                <a href="#" class="text-black font-roboto">Reservasi</a>
            </div>
        </li>
    </ul>
</template>

<script setup>
import { ref } from 'vue';

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
