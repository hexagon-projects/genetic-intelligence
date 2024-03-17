<template>
    <section class="bg-white min-h-screen -mb-12">
        <div class="container mx-auto">
            <div class="flex flex-col justify-center pt-12 -mb-16 lg:pb-0">
                <h1 class="font-myFont font-bold text-center text-black text-xl lg:text-3xl">Halaman yang kamu cari tidak ditemukan...</h1>
                <img class="max-w-sm lg:max-w-md self-center mb-6" src="../../assets/img/notfound-crop.png" alt="404 Not Found">
                <router-link class="w-1/2 lg:w-1/5 self-center text-center bg-biru p-2 font-myFont text-white rounded-lg hover:opacity-75 hover:shadow-lg" :to="{name: 'views.dashboard'}">Kembali ke Beranda</router-link>
            </div>
        </div>
    </section>
</template>