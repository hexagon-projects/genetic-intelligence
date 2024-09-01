<template>
    <header class="h-[68px] hidden lg:flex lg:gap-4 bg-white sticky top-0 z-50 px-4 py-4">
        <nav class="w-full mx-[50px] flex justify-between items-center gap-4">
            <img class="w-[121.28px] h-12" src="@/assets/img/logo-new.png" alt="Logo">

            <NavCustomer/>

            <div class="h-9 justify-end items-center gap-2 inline-flex">
                <img class="w-9 h-9 rounded-full" src="https://via.placeholder.com/36x36" />
                <img class="w-3 h-3" src="@/assets/icons/chevron-down.svg"/>
            </div>
        </nav>
    </header>
</template>

<script setup>
import NavCustomer from './Customer/NavCustomer.vue'

</script>