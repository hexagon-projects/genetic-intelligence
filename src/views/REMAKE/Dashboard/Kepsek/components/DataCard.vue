<script setup>
defineProps({
    bgColor: String,
    image: String,
    number: String,
    title: String
})
</script>

<template>
    <div class="p-4 md:p-6 rounded-2xl space-y-6 text-white font-sora" :class="[bgColor || 'bg-[#F6A537]']">
        <div class="w-6 h-6 md:w-8 md:h-8">
            <img :src="image" :alt="title" class="w-6 h-6 md:w-8 md:h-8 object-contain">
        </div>
        <div class="">
            <h3 class="text-[32px] font-semibold">{{ number }}</h3>
            <p class="text-sm font-semibold">{{ title }}</p>
        </div>
    </div>
</template>