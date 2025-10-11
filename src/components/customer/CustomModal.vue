<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
    show: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    showCancel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    confirmText: 'OK',
    cancelText: 'Batal',
    showCancel: false
});

const emit = defineEmits<{
    confirm: [];
    cancel: [];
    close: [];
}>();

const isVisible = ref(false);
const isAnimating = ref(false);

const handleConfirm = () => {
    closeModal();
    emit('confirm');
};

const handleCancel = () => {
    closeModal();
    emit('cancel');
};

const closeModal = () => {
    isAnimating.value = true;
    setTimeout(() => {
        isVisible.value = false;
        isAnimating.value = false;
        emit('close');
    }, 200);
};

const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
        closeModal();
    }
};

watch(() => props.show, (newValue) => {
    if (newValue) {
        isVisible.value = true;
        isAnimating.value = false;
    } else {
        closeModal();
    }
});
</script>

<template>
    <Teleport to="body">
        <Transition name="modal" appear>
            <div
                v-if="isVisible"
                class="fixed inset-0 z-50 flex items-center justify-center p-4"
                @click="handleBackdropClick"
            >
                <div class="fixed inset-0 bg-black/50 transition-opacity" 
                     :class="{ 'opacity-0': isAnimating, 'opacity-100': !isAnimating }"></div>
                
                <div class="relative bg-white rounded-2xl shadow-xl max-w-sm w-full mx-4 p-6 transform transition-all"
                     :class="{ 'scale-95 opacity-0': isAnimating, 'scale-100 opacity-100': !isAnimating }">
                    
                    <div class="text-center">
                        <div class="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        
                        <h3 class="text-lg font-bold text-gray-900 mb-2">
                            {{ title }}
                        </h3>
                        
                        <p class="text-sm text-gray-600 mb-6">
                            {{ message }}
                        </p>
                        
                        <div class="flex gap-3 justify-center">
                            <button
                                v-if="showCancel"
                                @click="handleCancel"
                                class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                {{ cancelText }}
                            </button>
                            
                            <button
                                @click="handleConfirm"
                                class="px-6 py-2 text-sm font-medium text-white bg-[#6464FA] border border-[#8383FB] rounded-full hover:bg-[#5555E5] focus:outline-none focus:ring-2 focus:ring-[#6464FA] focus:ring-offset-2 transition-colors shadow-[inset_0_-4px_6px_-1px_rgba(0,0,0,0.2),inset_0_4px_6px_-1px_rgba(255,255,255,0.5)]"
                            >
                                {{ confirmText }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
    opacity: 0;
}
</style>