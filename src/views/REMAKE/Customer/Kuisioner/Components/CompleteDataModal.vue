<template>
    <div class="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
        <div class="bg-white rounded-3xl p-6 w-11/12 md:w-1/2 lg:w-1/3 max-w-md">
            <div class="text-center">
                <h2 class="text-xl font-bold mb-4">Lengkapi Data Profil</h2>
                <p class="text-gray-600 mb-6">
                    Silakan lengkapi data profil Anda terlebih dahulu untuk melanjutkan.
                </p>
                <div class="flex justify-center space-x-4">
                    <button @click="$emit('closeModal')"
                        class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Nanti
                    </button>
                    <button @click="navigateToProfile"
                        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Lengkapi Sekarang
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const navigateToProfile = () => {
    router.push('/tk');
    emit('closeModal');
};

defineEmits(['closeModal']);
</script>