<script setup>
import Search from '../../../../../assets/img/search2.png'

const emit = defineEmits(['navigateToQuiz', 'closeModal']);

const handleNavigateToQuiz = () => {
    emit('navigateToQuiz');
};

const handleCloseModal = () => {
    emit('closeModal');
};
</script>

<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="w-full max-w-[90%] md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] bg-white shadow-md shadow-black/5 rounded-2xl flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6">
            <div>
                <img :src="Search" alt="Icon Search" class="w-40 mx-auto object-contain">
            </div>
            <div class="text-center">
                <h5 class="text-[18px] font-semibold">Bantu Kami Kenali Anak Lebih Baik</h5>
                <p class="text-sm text-[#535862]">Orang tua punya peran penting dalam perjalanan anak. Yuk, isi kuesioner singkat ini supaya kami bisa memberikan rekomendasi yang tepat dan personal untuk anak Anda.</p>
            </div>

            <div class="w-full flex justify-between items-center gap-4">
                <button @click="handleCloseModal" class="py-3 px-6 rounded-full w-full bg-[#B1B1FC] text-white cursor-pointer transition-all duration-300">
                    <p class="text-base">Batal</p>
                </button>
                <button @click="handleNavigateToQuiz" class="py-3 px-6 rounded-full w-full bg-primary text-white cursor-pointer transition-all duration-300">
                    <p class="text-base">Selanjutnya</p>
                </button>
            </div>
        </div>
    </div>
</template>