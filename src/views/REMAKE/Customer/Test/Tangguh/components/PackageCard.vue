<script setup lang="ts">
defineProps({
    image: String,
    title: String,
    description: String
})
</script>

<template>
    <div class="flex gap-4 items-center">
        <div class="w-24 h-24 rounded-3xl bg-primary overflow-hidden">
            <img :src="image" :alt="title">
        </div>
        <div>
            <h3 class="text-xl font-medium">{{ title }}</h3>
            <p class="text-sm font-light">{{ description }}</p>
        </div>
    </div>
</template>