<template>
    <section class="bg-gray-100 pb-[340px] lg:pb-28">
        <div class="mx-4 pt-4">
            <ol class="mx-4 flex justify-start items-center text-gray-500 font-semibold">
                <RouterLink :to="{name: 'views.dashboard'}" class="text-gray-400 hover:text-dark text-base">
                    Beranda
                </RouterLink>
                <span class="mx-2 text-base text-gray-400">/</span>
                <span class="text-gray-400 text-base">
                    Reservasi
                </span>
                <span class="mx-2 text-base">/</span>
                <RouterLink :to="{name: 'admin.views.reservasi_psikotest'}" class="text-base text-dark hover:text-dark/70">
                    Reservasi Psikotest
                </RouterLink>
            </ol>
        </div>

        <div class="flex flex-col lg:flex-row justify-center mx-4 mb-4 pt-4 pb-10 gap-4">
            <div class="w-full mt-0 lg:mt-36 px-7 mx-auto">
                <div class="flex flex-col bg-white w-full p-6 rounded-lg shadow-lg">
                    <span class="font-myFont text-center text-dark text-lg">
                        Fitur Belum Tersedia
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>