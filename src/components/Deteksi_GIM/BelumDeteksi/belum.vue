<template>
    <div class="bg-white rounded-lg shadow-lg p-4">
        <div class="flex flex-col justify-center">
            <h2 class="font-myFont text-center text-black font-semibold">Kamu belum melakukan deteksi</h2>
            <p class="font-myFont text-center text-gray-500 text-sm mb-4">Ayo lakukan deteksi GIM sekarang juga</p>
            <RouterLink :to="{name: 'user.views.deteksi'}" class="px-2 py-2 w-1/2 lg:w-1/4 self-center text-center rounded-lg bg-secondary font-myFont font-medium text-white hover:opacity-75 hover:shadow-lg">
                Deteksi Sekarang
            </RouterLink>
            <img src="../../../assets/img/no-data-found.png" class="w-96 self-center" alt="No Data Found">
        </div>
    </div>
</template>

<script>
export default {
    name: 'BelumDeteksi',
}
</script>