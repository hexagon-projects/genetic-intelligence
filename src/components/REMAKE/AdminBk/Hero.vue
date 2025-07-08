<template>
    <div class="w-full flex flex-col items-center justify-center">
        <img src="@/assets/img/login/jatidiri.png" class="object-cover w-full max-h-[400px] rounded-3xl" alt="hero">
        <!-- card -->
         <div class="flex w-[90%] md:w-4/5 bg-[#F0F7FD] bg-opacity-85 shadow-sm outline outline-1 outline-white rounded-3xl p-5 -mt-20">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <div class="flex gap-3 items-center">
                    <img src="@/assets/img/profile-mock.png" class="w-20 h-20 rounded-full outline outline-1 outline-white hidden md:block" alt="profile">
                    <div class="flex flex-col items-stretch">
                        <small class="font-sora">Welcome</small>
                        <h1 class="font-sora text-2xl font-semibold" v-if="userData?.bk">{{ userData.bk.first_name }} {{ userData.bk.last_name }}</h1>
                        <small class="font-sora">Here's a summary of student testing activity</small>
                    </div>
                </div>
                <Card />
            </div>
         </div>
    </div>
</template>

<script setup>
import Card from './Card.vue';

const userData = JSON.parse(localStorage.getItem("userData"));
</script>
