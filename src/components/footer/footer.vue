<template>
    <footer id="footer" class="bg-secondary opacity-90 pt-10 lg:pt-16 pb-10">
         <div class="container mx-auto">
             <div class="flex justify-center mb-8">
                 <h2 class="text-center font-myFont font-bold text-white text-2xl lg:text-4xl">Genetic Intelligence Mapping</h2>
             </div>
 
             <div class="flex justify-center container mx-auto w-full pt-10 border-t border-white">
                <p class="font-medium font-myFont text-xs lg:text-sm text-white text-center">
                    © {{ currentYear }} Copyrights by Hexagon Inc. All Rights Reserved.
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