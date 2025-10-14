<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="handleCancel"></div>
        <div class="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div class="flex flex-col items-center gap-4">
                <div v-if="icon === 'error'" class="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <svg class="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>
                <div v-if="icon === 'success'" class="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div v-if="icon === 'question'" class="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                
                <h2 class="text-xl font-medium text-black text-center">{{ title }}</h2>
                <p class="text-base text-[#667084] text-center">{{ text }}</p>
                
                <div class="flex gap-3 w-full mt-4">
                    <button v-if="showCancelButton" @click="handleCancel" :style="{ backgroundColor: cancelButtonColor }" class="flex-1 h-11 rounded-full text-white text-base font-normal">
                        {{ cancelButtonText }}
                    </button>
                    <button v-if="showConfirmButton" @click="handleConfirm" :style="{ backgroundColor: confirmButtonColor }" class="flex-1 h-11 rounded-full text-white text-base font-normal hover:shadow-lg transition-all">
                        {{ confirmButtonText }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    icon: {
        type: String,
        default: 'question'
    },
    title: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    showConfirmButton: {
        type: Boolean,
        default: true
    },
    showCancelButton: {
        type: Boolean,
        default: false
    },
    confirmButtonColor: {
        type: String,
        default: '#0b40f4'
    },
    confirmButtonText: {
        type: String,
        default: 'OK'
    },
    cancelButtonColor: {
        type: String,
        default: '#3b3f5c'
    },
    cancelButtonText: {
        type: String,
        default: 'Batal'
    }
});

const emit = defineEmits(['confirm', 'cancel']);

const isOpen = ref(false);

const open = () => {
    isOpen.value = true;
};

const close = () => {
    isOpen.value = false;
};

const handleConfirm = () => {
    emit('confirm');
    close();
};

const handleCancel = () => {
    emit('cancel');
    close();
};

defineExpose({
    open,
    close
});
</script>