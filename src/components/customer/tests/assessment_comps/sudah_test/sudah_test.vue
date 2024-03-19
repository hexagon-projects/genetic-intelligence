<template>
    <div class="hidden lg:flex lg:flex-row items-center">
        <div class="lg:w-1/2">
            <div class="flex flex-col mx-14">
                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Yeayy! Kamu sudah selesai melakukan Test Assessment.</h1>
                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lihat hasil test kamu sekarang juga!</p>
                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Lihat Hasil
                </RouterLink>
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex flex-col justify-center">
                <img src="../../../../../assets/img/test-assessment.png" class="w-1/2 lg:w-[238px] self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Selesai Test Image">
            </div>
        </div>
    </div>
    <div class="lg:hidden flex flex-col items-center">
        <div class="lg:w-1/2">
            <div class="flex flex-col justify-center">
                <img src="../../../../../assets/img/test-assessment.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Selesai Test Image">
            </div>
        </div>
        <div class="lg:w-1/2">
            <div class="flex flex-col">
                <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Yeayy! Kamu sudah selesai melakukan Test Assessment.</h1>
                <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lihat hasil test kamu sekarang juga!</p>
                <RouterLink :to="{name: 'user.views.hasil_assessment'}" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Lihat Hasil
                </RouterLink>
            </div>
        </div>
    </div>
</template>