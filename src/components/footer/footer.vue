<template>
    <footer id="footer" class="bg-white pt-4 pb-4 lg:mb-0 mb-14">
         <div class="container mx-auto">
             <div class="flex justify-center container mx-auto w-full">
                <p class="font-medium font-myFont text-xs lg:text-sm text-dark text-center">
                    © {{ currentYear }} Genetic Intelligence Mapping. All Rights Reserved.
                </p>
                <!-- <p class="font-bold text-sm text-black text-center">
                    Made By <span><a href="https://www.instagram.com/fauzanmi18/" class="hover:text-white">Fauzan Muhammad Iqbal</a></span>, Bandung 2023
                </p> -->
             </div>
         </div>
     </footer>
 </template>
 
 <script>
 import { ref } from 'vue';
 
 export default {
     name: 'FooterComp',
     setup(){
         const currentYear = ref(new Date().getFullYear())
         return {currentYear}
     }
 }
 </script>