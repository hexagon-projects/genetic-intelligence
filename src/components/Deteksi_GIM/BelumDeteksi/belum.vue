<template>
    <div class="-mt-6 bg-white rounded-lg shadow-lg p-4">
        <div class="hidden lg:flex lg:flex-row items-center">
            <div class="lg:w-1/2">
                <div class="flex flex-col mx-14">
                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum melakukan test <span class="italic">Genetic Intelligence Mapping</span>.</h1>
                    <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Tes sekarang juga!</p>
                    <RouterLink :to="{name: 'user.views.deteksi'}" class="my-4 lg:mb-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-biru font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Deteksi Sekarang
                </RouterLink>
                </div>
            </div>
            <div class="lg:w-1/2">
                <div class="flex flex-col justify-center">
                    <img src="../../../assets/img/no-data-found-2.png" class="w-96 self-center" alt="No Data Found">
                </div>
            </div>
        </div>
        <div class="lg:hidden flex flex-col items-center">
            <div class="lg:w-1/2">
                <div class="flex flex-col justify-center">
                    <img src="../../../assets/img/no-data-found-2.png" class="w-96 self-center" alt="No Data Found">
                </div>
            </div>
            <div class="lg:w-1/2">
                <div class="flex flex-col">
                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Kamu belum melakukan deteksi GIM.</h1>
                    <p class="font-myFont text-start text-dark-500 text-sm mb-4">Ayo lakukan Tes Deteksi GIM sekarang juga!</p>
                    <RouterLink :to="{name: 'user.views.deteksi'}" class="my-4 px-2 py-2 w-full self-start text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                    Deteksi Sekarang
                </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BelumDeteksi',
}
</script>