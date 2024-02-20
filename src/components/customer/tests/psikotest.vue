<template>
    <section class="bg-gray-100 pb-8">
         <div class="mx-4 pt-4 mb-2">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-gray-400 text-base">/</span>
                <a class="text-gray-400 text-base">
                    Test
                </a>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'user.views.psikotest'}" class="text-base text-dark hover:text-dark/70">
                    Test Psikotest
                </RouterLink>
            </ol>
        </div>
        
        <div class="flex flex-col justify-center mx-7 py-8 gap-4">
            <div class="-mt-6 bg-white rounded-lg shadow-lg p-4">
            <div class="hidden lg:flex lg:flex-row items-center">
                <div class="lg:w-1/2">
                    <div class="flex flex-col mx-14">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Untuk saat ini Test Psikotest belum tersedia.</h1>
                        <p class="font-myFont text-start text-dark-500 text-sm mb-4">Cek terus secara berkala ya!</p>
                        <button class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru bg-opacity-60 font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Coming Soon
                        </button>
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/sad.png" class="w-1/2 lg:w-2/5 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="Belum Test Image">
                    </div>
                </div>
            </div>
            <div class="lg:hidden flex flex-col items-center">
                <div class="lg:w-1/2">
                    <div class="flex flex-col justify-center">
                        <img src="../../../assets/img/sad.png" class="w-1/2 self-center animate-[wiggle_4s_ease-in-out_infinite]" alt="No Data Found">
                    </div>
                </div>
                <div class="lg:w-1/2">
                    <div class="flex flex-col">
                        <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Halo! Untuk saat ini Test Psikotest belum tersedia.</h1>
                        <p class="font-myFont text-start text-dark-500 text-sm mb-4">Cek terus secara berkala ya!</p>
                        <button class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-biru bg-opacity-60 font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                            Coming Soon
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>