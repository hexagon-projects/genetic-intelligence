<template>
    <footer id="footer" class="bg-white pt-4 pb-4">
         <div class="mx-[68px]">
             <div class="flex justify-between items-center">
                <img class="w-[121px] h-[48px]" src="@/assets/img/logo-new.png">

                <p class="font-normal font-roboto text-xs lg:text-sm text-[#6D758F] text-center">
                   Copyright © {{ currentYear }} Jatidiri. All Rights Reserved.
                </p>
                
                <div class="group cursor-pointer flex justify-center items-center gap-2">
                    <a class="p-1 border border-[#3030f8] rounded-[50%] text-[#3030f8] group-hover:bg-[#3030f8] group-hover:text-white">
                        <PhInstagramLogo :size="18"/>
                    </a>

                    <span class="font-normal text-[#6c748f] text-sm font-roboto">Jatidiri.app</span>
                </div>
             </div>
         </div>
     </footer>
</template>

<script setup>
import { PhInstagramLogo } from '@phosphor-icons/vue';
</script>

<!-- src="@/assets/img/logo-new.png" -->