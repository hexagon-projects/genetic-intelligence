<template>
<div class="w-full h-auto flex justify-center">
    <div class="mx-[30px] md:mx-[60px] w-[872px] h-auto p-9 bg-white rounded-3xl shadow flex-col justify-center items-center gap-6 inline-flex">
        <div class="w-full mx-[30px] md:mx-[60px] flex flex-col justify-start items-center gap-4">
            <span class="w-full text-black text-xl md:text-3xl font-semibold font-['Sora'] leading-9 text-center">
            Tentukan Urutan Prioritas Pekerjaan
            </span>
            <span class="w-full text-black text-sm md:text-base font-normal font-['Roboto'] leading-normal">
            Pilih pekerjaan dari daftar berikut dengan memberikan nomor (1 hingga 12) sesuai minat kamu, 1 untuk yang paling kamu sukai dan 12 untuk yang paling tidak kamu sukai.
            </span>
        </div>

        <!-- untuk Tipe Soal -->
        <div class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center justify-center gap-2 max-w-[900px]">
            <span class="text-sm font-semibold font-['Roboto'] text-center text-[#3030f8]">Tipe Soal: A </span>
        </div>

        <!-- Ini Untuk pertanyaan dan input -->
        <div class="w-full mx-[30px] md:mx-[60px] flex flex-col items-center">
            <div class="w-full flex items-center justify-between max-w-[900px] mb-3">
                <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/3 text-left">Pekerjaan Pertanian</label>
                <input type="text" class="w-[170px] p-1 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
            </div>
            <div class="w-full flex items-center justify-between max-w-[900px] mb-3">
                <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/3 text-left">Pekerjaan Pertanian</label>
                <input type="text" class="w-[170px] p-1 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
            </div>
            <div class="w-full flex items-center justify-between max-w-[900px] mb-3">
                <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/3 text-left">Pekerjaan Pertanian</label>
                <input type="text" class="w-[170px] p-1 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
            </div>
            <div class="w-full flex items-center justify-between max-w-[900px] mb-3">
                <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/3 text-left">Pekerjaan Pertanian</label>
                <input type="text" class="w-[170px] p-1 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
            </div>
            <div class="w-full flex items-center justify-between max-w-[900px] mb-3">
                <label class="text-sm md:text-base font-normal font-['Roboto'] w-1/3 text-left">Pekerjaan Pertanian</label>
                <input type="text" class="w-[170px] p-1 text-sm md:text-base bg-white border border-[#3030f8] text-black rounded-lg focus:outline-none focus:ring focus:ring-blue-500" placeholder="Masukkan Urutan 1-12">
            </div>
        </div>

        <!-- ini button selanjutnya untuk next section -->
        <button class="hover:translate-x-1 hover:shadow-2xl transition-all h-11 pl-6 pr-4 py-1.5 bg-[#3030f8] rounded-full flex justify-center items-center gap-3">
            <div class="text-white text-base font-normal font-['Roboto'] leading-normal">Selanjutnya</div>
                <div class="w-6 h-6 relative">
                    <img src="@/assets/icons/test_gim/chevron_right.svg" alt="icon">
                </div>
        </button>
    </div>

</div>

</template>

<script setup>

</script>
