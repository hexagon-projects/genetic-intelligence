<template>
    <div class="bg-white rounded-lg shadow-lg p-4">
        <div class="flex flex-col lg:flex-row items-center">
            <div class="lg:w-1/2">
                <div class="flex flex-col justify-center">
                    <img src="../../../assets/img/wait-deteksi-crop-2.png" class="w-96 self-center" alt="No Data Found">
                </div>
            </div>
            <div class="lg:w-1/2">
                <div class="flex flex-col">
                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Tunggu ya...</h1>
                    <h1 class="font-myFont lg:text-3xl text-2xl text-start text-dark font-semibold">Deteksi GIM kamu sedang dalam proses!</h1>
                    <p class="font-myFont text-start text-dark-500 text-sm mb-4">Deteksi GIM kamu sedang di-proses oleh Konsultan, kami akan hubungi ketika selesai.</p>
                    <RouterLink :to="{name: 'views.dashboard'}" class="lg:mb-4 my-4 px-2 py-2 w-1/2 lg:w-1/2 self-start text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                        Kembali ke Beranda
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DalamProsesDeteksi'
}
</script>