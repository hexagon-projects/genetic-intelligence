<template>
    <div class="max-w-2xl max-h-[296px] overflow-y-scroll">
        <!-- <img src="https://placehold.co/900x1500"> -->
        <img :src="filePreviewUrl(reviewImage[0])" alt="file">
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed } from 'vue';

const store = useStore()

const reviewImage = computed(() => store.getters.getReviewImage)

const filePreviewUrl = (file) => {
    return file ? URL.createObjectURL(file) : null;
};
</script>