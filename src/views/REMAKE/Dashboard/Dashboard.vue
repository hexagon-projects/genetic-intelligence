<template>
    <div class="m-6">
  <div class="w-[800px] h-[408px] relative bg-[#3030f8] rounded-3xl flex flex-col justify-between">
      <!-- Logo JD -->
      <div class="absolute right-0 bottom-0 opacity-50">
        <img src="https://placehold.co/278x340">
      </div>
      <!-- End Logo JD -->

      <div class="mx-[24px] my-[32px] flex flex-col h-full">
        <div class="flex flex-col gap-[8px]">
          <span class="text-white text-sm">Selamat Datang!</span>
          <h1 class="text-2xl text-white">
            Aditya Darussalam
          </h1>
        </div>

        <div class="relative self-end mt-auto bg-white w-[750px] rounded-b-3xl rounded-tr-3xl">
          <!-- temukan potensi -->
          <div class="absolute pt-[21px] -top-16 pb-[18px] rounded-t-3xl w-[578px] bg-white">
            <h1 class="mx-[33px] text-2xl font-bold">
              Temukan Potensimu:
            </h1>
          </div>

          <div class="absolute rounded-bl-2xl -right-4 -top-[80px] p-4">
            <!-- Inverted Radius -->
            <div class="absolute bg-transparent pemisah bottom-0 -left-[2px]"></div>
            <!-- End Inverted Radius -->

            <div class="bg-white w-[154px] rounded-3xl p-2 flex justify-center items-center">
              <a class="flex items-center gap-[12px]">
              Lihat Hasil
                <div class="w-[32px] h-[32px] bg-[#3030f8] rounded-[50%]">

                </div>
              </a>
            </div>
          </div>

          <!-- type dan otak dominan -->
          <div class="w-[684px] h-[96px] mx-[33px] mb-[21px] flex items-center">
            <div class="w-[296px] flex items-center border-r-2">
              <div class="flex items-center gap-[24px] p-[24px]">
                <img src="https://placehold.co/32x32" class="rounded-[50%]">
              <div class="flex flex-col">
                <span class="text-base">Siapakah Dirimu?</span>
                <span class="text-sm">Sang pelaksana (Cermat)</span>
              </div>
              </div>
            </div>

            <div class="w-[388px] h-[96px] flex items-center">
              <div class="pl-11 flex items-center gap-[24px] p-[24px]">
                <img src="https://placehold.co/32x32" class="rounded-[50%]">
                <div class="flex flex-col">
                  <span class="text-base">Sistem Operasi Kecerdasan Dominan:</span>
                  <span class="text-sm">Sang pelaksana (Cermat)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>