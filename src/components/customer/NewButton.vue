<script setup lang="ts">
defineProps({
    bgColor: String,
    borderColor: String,
    text: String,
    textColor: String,
    textSize: String,
})
</script>

<template>
    <div class="rounded-full py-3 border-4 cursor-pointer text-center font-sora shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.6)]"
        :class="[
            bgColor || 'bg-primary',
            textColor || 'text-white',
            borderColor || 'border-[#8383FB]',
            textSize || 'text-xl'
        ]">
        {{ text }}
    </div>
</template>