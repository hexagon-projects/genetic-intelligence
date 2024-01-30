<template>
    <section class="bg-gray-100 pb-8 text-dark">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test Menu
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Test Assesment
                </RouterLink>
            </ol>
        </div>
        <div class="flex flex-col lg:flex-row justify-center mx-7 pt-4 gap-4">
            <div class="bg-white h-[358px] overflow-y-scroll w-full lg:w-full rounded-lg shadow-lg p-7">
                <div v-if="loadingQuestion" class="flex flex-col justify-center h-full">
                    <span class="mx-auto animate-[spin_2s_linear_infinite] border-8 border-[#f1f2f3] border-l-biru border-r-biru rounded-full w-14 h-14"></span>
                </div>

                <div v-else>
                    <h2 class="font-myFont text-2xl font-medium mb-4">Test Assesment</h2>
                    <div class="mb-4">
                        <label class="block font-myFont text-dark text-base font-medium mb-2">1. Apakah anda menyukai jurusan anda?</label>
                        <div class="flex flex-col mx-2">
                            <div class="px-2">
                                <label for="animal-dog" class="block font-myFont text-dark text-sm font-medium mb-2">
                                    <input type="checkbox" name="animal[]" value="dog"
                                        class="mr-2">Sangat Suka
                                </label>
                            </div>
                            <div class="px-2">
                                <label for="animal-dog" class="block font-myFont text-dark text-sm font-medium mb-2">
                                    <input type="checkbox" name="animal[]" value="dog"
                                        class="mr-2">Suka
                                </label>
                            </div>
                            <div class="px-2">
                                <label for="animal-bird" class="block font-myFont text-dark text-sm font-medium mb-2">
                                    <label for="animal-dog" class="block font-myFont text-dark text-sm font-medium mb-2">
                                    <input type="checkbox" name="animal[]" value="dog"
                                        class="mr-2">Sangat Tidak Suka
                                </label>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="flex justify-between items-center">
                        <button type="submit" class="bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Sebelumnya</button>
                        <span type="submit" class="font-myFont text-dark text-base">5 / 30</span>
                        <button type="submit" class="bg-biru text-white text-sm px-[5px] py-[4px] lg:px-4 lg:py-2 rounded-lg hover:bg-blue-600">Selanjutnya</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue'

export default{
    name: 'TestAssessment',
    setup(){
        const loadingQuestion = ref(false)

        return { loadingQuestion }
    }
}
</script>