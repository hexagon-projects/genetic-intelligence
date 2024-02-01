<template>
     <section class="bg-gray-100 pb-8">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.hasil_deteksi'}" class="text-base text-dark hover:text-dark/70">
                    Hasil Test
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col justify-center mx-7 py-8 gap-4">
            <div class="lg:w-2/5 w-full">
                <div class="bg-white rounded-lg shadow-xl p-4 mb-4">
                    <h1 class="font-myFont font-semibold text-dark text-base mb-2">Tipe Pembelajaran Kamu</h1>
                    <img src="../../../../../assets/img/visual.webp" class="mx-auto w-1/3">
                    <h1 class="font-myFont font-medium text-center text-dark text-lg">Visual</h1>
                </div>
                <!-- <div class="bg-white rounded-lg shadow-xl p-4 lg:h-[689px]">
                    <div class="flex flex-col">
                       
                        <hr class="my-3">

                    </div>
                </div> -->
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'HasilAssessment'
}
</script>
